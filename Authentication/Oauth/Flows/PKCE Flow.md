---
created: 1970-01-01T01:00
updated: 2026-01-19T09:00
source: https://larskoelpin.de/2022-09-11-oauth-pkce/
---
![[Bildschirmfoto vom 2025-11-16 10-58-31.png]]
## **Overview**

PKCE is an extension to the OAuth 2.0 Authorization Code flow that protects public clients (like single-page apps) from authorization code interception attacks. Key points:

- The client (React app) **cannot keep a secret** safely.
- PKCE adds a dynamically generated secret (the _code verifier_) that is exchanged for the authorization code.
- The server also doesn't have to store a client secret making it stateless
## **Step-by-Step Flow Between React App and Keycloak**

#### **1. React App Generates Code Verifier and Code Challenge**

1. The app creates a **random string** called the **code verifier**. Example:
    `lXr7hP3Q9e6s4y0fR1k2j8vZ`
2. The app generates a **code challenge** by hashing the code verifier (usually SHA-256) and encoding it in Base64 URL-safe format.
    `code_challenge = BASE64URL(SHA256(code_verifier))`
3. The app stores the **code verifier locally** (memory/session storage) for later use.

#### **2. Redirect User to Keycloak Authorization Endpoint**

The app redirects the user to Keycloak’s authorization endpoint with:

- `response_type=code` → requesting an authorization code
- `client_id=<your_client_id>` → the public client registered in Keycloak
- `redirect_uri=<your_app_url>` → where Keycloak sends the code back
- `code_challenge=<hashed_verifier>` → the challenge for PKCE
- `code_challenge_method=S256` → using SHA-256
- `scope=openid` → usually for OpenID Connect

#### **3. User Authenticates on Keycloak**

- Keycloak shows the login page.
- User enters credentials.
- If successful, Keycloak **redirects the user back** to your React app with an **authorization code**:
	+ `https://myapp.com/callback?code=AUTH_CODE_HERE`

#### **4. React App Exchanges Authorization Code for Tokens**

Now the React app sends a **POST request to Keycloak’s token endpoint**:
- URL: `https://keycloak.example.com/realms/myrealm/protocol/openid-connect/token`
- Content-Type: `application/x-www-form-urlencoded`
- Body parameters:
    - `grant_type=authorization_code`
    - `code=AUTH_CODE_HERE`
    - `redirect_uri=https://myapp.com/callback`
    - `client_id=my-react-app`
    - `code_verifier=<original_code_verifier>`

> **Important:** This is the step where PKCE protects the flow.
> [[Keycloak]] verifies that the code verifier matches the code challenge sent earlier.
#### **5. Keycloak Verifies PKCE**

- Keycloak calculates `BASE64URL(SHA256(code_verifier))` from what the client sent.
- Compares it to the original `code_challenge` sent in step 2.
- If it matches, Keycloak issues **tokens** (ID token, access token, optionally [[Refresh token|refresh token]]).
#### **6. React App Receives Tokens**

- React app gets back [[Json|JSON]]:
	- `{   "access_token": "eyJ...abc",   "id_token": "eyJ...xyz",   "expires_in": 300 }`
- The app can now use the [[Access token|access token ]]to call APIs and the [[Identity token|ID token]] to identify the user.
### **Key Security Points**

1. **No client secret is required** because PKCE ensures the code can only be exchanged by the party that generated the code verifier.
2. **Prevents authorization code interception**:
    - If a malicious actor intercepts the authorization code, it won’t have the code verifier, so the token request fails.
3. **Single-page apps ([[React|React]], [[Angular|Angular]], etc.) are safe** using PKCE without storing secrets.