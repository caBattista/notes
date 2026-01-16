---
created: 1970-01-01T01:00
updated: 2025-12-06T23:55
source: https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/
---
# In [[Keycloak]]

#### Token Replay Detection

Under Realm Settings -> Tokens -> Refresh tokens set: 
+ Revoke Refresh Token: true
+ Refresh Token Max Reuse: 0

I checked that when this is enabled the session is terminated. Wich is Refresh Token Automatic Reuse Detection.
## Keeping Refresh Tokens Secure

A short-lived access token helps improve the security of our applications, but it comes with a cost: when it expires, the user needs to log in again to get a new one. Frequent re-authentication can diminish the perceived user experience of your application. Even if you are doing so to protect their data, users may find your service frustrating or difficult to use.

A refresh token can help you balance security with usability. Since refresh tokens are typically longer-lived, you can use them to request new access tokens after the shorter-lived access tokens expire.

However, since refresh tokens are also bearer tokens, we need to have a strategy in place that limits or curtails their usage if they ever get leaked or become compromised. All those who hold the refresh tokens have the power to get new access tokens whenever they want. "They" could be legitimate users or attackers.

At Auth0, we created a set of features that mitigate the risks associated with using refresh tokens by imposing safeguards and controls on their lifecycle. Our identity platform offers refresh token rotation, which also comes with automatic reuse detection.

Let's dive deeper into this security technique.

## Refresh Token Rotation

Until very recently, a robust strategy to help SPAs maintain the user's session was using the Authorization Code Flow with PKCE in conjunction with silent authentication. Refresh token rotation is a technique for getting new access tokens using refresh tokens that goes beyond [silent authentication](https://auth0.com/docs/authorization/configure-silent-authentication).

Refresh token rotation guarantees that every time an application exchanges a refresh token to get a new access token, a new refresh token is also returned. Therefore, you no longer have a long-lived refresh token that could provide illegitimate access to resources if it ever becomes compromised. The threat of illegitimate access is reduced as refresh tokens are continually exchanged and invalidated.

For example, with refresh token rotation enabled in the Auth0 Dashboard, every time your application exchanges a refresh token to get a new access token, the authorization server also returns a new refresh-access token pair. This safeguard helps your app mitigate [replay attacks](https://auth0.com/docs/security/prevent-common-cybersecurity-threats#replay-attacks) resulting from compromised tokens.