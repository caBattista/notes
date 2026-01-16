---
created: 1970-01-01T01:00
updated: 2025-12-07T12:25
---
# Description 

The Access token is a [[Json Web Token]] that contains the user’s permissions and identity _claims_.
#### Usage

Sent to **your [[Backend|backend]] [[API|APIs]]** as: `Authorization: Bearer <access_token>`
#### Lifetime

Short (30 seconds → 10 minutes), depending on your settings.
#### Storage

**In memory only**, never in [[localStorage]]. or  [[sessionStorage]]  
If it leaks, attackers can call your [[API]] pretending to be the user.

# On Attacks
An attacker cannot modify this token because it was signed by the private key of [[Keycloak]].

# Payload (decoded)

```json
{
  "exp": 1765005296,
  "iat": 1765004696,
  "auth_time": 1765004694,
  "jti": "ofrtac:4521a5ca-3fd7-890c-0d41-63bc6c76e31e",
  "iss": "https://localhost:8443/realms/demoRealm",
  "aud": "account",
  "sub": "d40e8fca-4449-4852-a968-df6c82b29f53",
  "typ": "Bearer",
  "azp": "oauth2-pkce",
  "sid": "04e706f0-31f5-eaa0-3c39-0c936bbf8b57",
  "acr": "1",
  "allowed-origins": [
    "http://localhost:5173"
  ],
  "realm_access": {
    "roles": [
      "offline_access",
      "default-roles-demorealm",
      "uma_authorization"
    ]
  },
  "resource_access": {
    "account": {
      "roles": [
        "manage-account",
        "manage-account-links",
        "view-profile"
      ]
    }
  },
  "scope": "openid offline_access email profile",
  "email_verified": false,
  "name": "Christopher Battista",
  "preferred_username": "test",
  "given_name": "Christopher",
  "family_name": "Battista",
  "email": "christopherbattista95@gmail.com"
}
```