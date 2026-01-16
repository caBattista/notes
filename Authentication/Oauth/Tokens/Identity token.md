---
created: 1970-01-01T01:00
updated: 2025-12-07T12:25
---

# Description 

The Identity token is a [[Json Web Token]] containing the **identity of the user** (profile info).
#### Usage

Only for **the [[Client|client]] application** to know who is logged in.  
**NOT** for backend [[API]] authorization.
#### Storage

Memory or [[localStorage]], [[sessionStorage]] — ID token is _not_ sensitive.
# Payload (decoded)

```json
{
  "exp": 1765005296,
  "iat": 1765004696,
  "auth_time": 1765004694,
  "jti": "0232ddaa-2a27-eb47-2ab9-6919fdf17acc",
  "iss": "https://localhost:8443/realms/demoRealm",
  "aud": "oauth2-pkce",
  "sub": "d40e8fca-4449-4852-a968-df6c82b29f53",
  "typ": "ID",
  "azp": "oauth2-pkce",
  "sid": "04e706f0-31f5-eaa0-3c39-0c936bbf8b57",
  "at_hash": "CpyIeBNbX94n37LtkGJDDA",
  "acr": "1",
  "email_verified": false,
  "name": "Christopher Battista",
  "preferred_username": "test",
  "given_name": "Christopher",
  "family_name": "Battista",
  "email": "christopherbattista95@gmail.com"
}
```