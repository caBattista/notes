---
created: 1970-01-01T01:00
updated: 2025-12-06T20:20
---
## 1️⃣ Background: Why refresh tokens need extra care

- Access tokens are short-lived → if stolen, attacker can use them only briefly.
- Refresh tokens are **long-lived** → if stolen, attacker can keep getting new access tokens.
- PKCE secures the **authorization code exchange**, but once the client holds a refresh token, you need additional strategies to keep it safe.

## 2️⃣ Main methods to protect refresh tokens

### **A. HTTP-only secure cookies**

- Store the refresh token in a cookie with flags:
    - `HttpOnly` → JS can’t access it
    - `Secure` → only sent over HTTPS
    - `SameSite=Strict` or `Lax` → mitigates CSRF
- Access tokens may stay in memory (never persisted)
- Typically requires a **backend or BFF (Backend-for-Frontend)** to issue/refresh tokens

✅ Pros:

- Very resistant to XSS
- Integrates nicely with server APIs

❌ Cons:

- CSRF is possible if not mitigated
- Requires a backend to handle refresh flows

### **B. In-memory storage (no persistence)**

- Store refresh tokens in JavaScript memory only, never in `localStorage` or `sessionStorage`
- Access token stays in memory too
- On page reload, the user may need to re-authenticate

✅ Pros:

- Prevents token theft via persistent storage
- Resistant to CSRF (if tokens are sent manually)

❌ Cons:

- Lost on page reload → worse UX for SPAs
- Vulnerable to XSS if malicious JS runs

### **C. Refresh Token Rotation (RTR)**

- Each time a refresh token is used, the authorization server issues a **new refresh token** and invalidates the old one
- Auth0 and other providers support this natively
- If a token leaks, attacker can only use it **once**

✅ Pros:

- Reduces the impact of token theft
- Can combine with HTTP-only cookies or in-memory storage

❌ Cons:

- Requires server/provider support
- If implementation is buggy, tokens can be invalidated prematurely

### **D. Use short-lived refresh tokens**

- Some providers allow refresh tokens that expire quickly (e.g., 1 hour)
- Combine with RTR and rotating access tokens

✅ Pros:

- Limits window of exposure if stolen

❌ Cons:

- Frequent refresh → can impact UX if network is slow

### **E. Encrypted local storage (optional)**

- Encrypt the refresh token before storing in `localStorage` or `sessionStorage`
- The encryption key can be derived per session, stored only in memory
- Rotated periodically

✅ Pros:

- Adds defense-in-depth
- Useful if you have to persist tokens across reloads

❌ Cons:

- If XSS occurs, attacker can get both the encrypted token and the key in memory
- Complex to implement correctly

### **F. BFF (Backend-for-Frontend) pattern**

- SPA never sees the refresh token
- All refreshes happen via backend
- SPA only stores short-lived access tokens in memory
- Backend stores refresh token in secure storage

✅ Pros:

- SPA is completely protected from token theft
- Works well with HTTP-only cookies

❌ Cons:

- Requires a backend layer
- More infrastructure overhead

## 3️⃣ Summary Recommendation

For **SPAs**:

1. Use **Refresh Token Rotation + short-lived access tokens**
2. Store **refresh tokens in HTTP-only secure cookies** via a backend (BFF)
3. Store access tokens **in memory only**, never in localStorage
4. Consider **CSRF protection** for cookie-based flows

For **mobile apps**:

- Store refresh tokens in **secure storage** (iOS Keychain, Android Keystore)
- Rotate tokens and keep access tokens short-lived
- In-memory storage can complement secure storage

---

💡 **Key takeaway:**  
The safest approach combines **token rotation + secure storage + short-lived access tokens**. Per-request encryption or overly complex schemes usually add little value compared to standard patterns.