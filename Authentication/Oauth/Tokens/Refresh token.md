---
created: 1970-01-01T01:00
updated: 2025-12-06T08:33
---
# Description 

The Refresh token is a [[Json Web Token]] is used to get **[[Access token|new access tokens]]** without logging in again.
#### Usage

Sent to **your [[Backend|backend]] [[API|APIs]]** as: `Authorization: Bearer <access_token>`
#### Lifetime

Long (minutes → days → weeks).
#### Storage

**Never store in [[JavaScript|JavaScript]]** ([[localStorage]]/[[sessionStorage]]) .  

✔ Store in **HttpOnly cookie** → JavaScript cannot read it  
✔ Browser sends it automatically on refresh API calls
# Payload (decoded)

```json
{
  "iat": 1765005342,
  "jti": "b765a058-834f-3f9f-1313-ebc429049850",
  "iss": "https://localhost:8443/realms/demoRealm",
  "aud": "https://localhost:8443/realms/demoRealm",
  "sub": "d40e8fca-4449-4852-a968-df6c82b29f53",
  "typ": "Offline",
  "azp": "oauth2-pkce",
  "sid": "04e706f0-31f5-eaa0-3c39-0c936bbf8b57",
  "scope": "openid offline_access web-origins acr basic email roles profile"
}
```