// bff.js
import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import * as client from 'openid-client';
import { Issuer } from 'openid-client';
import fs from 'fs';
import https from 'https';

dotenv.config();

const app = express();
const caCert = fs.readFileSync('../keycloak.p12');

console.log(caCert.toString())

const agent = new https.Agent({
  ca: caCert,
   rejectUnauthorized: false,
});

// // Session middleware
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'supersecret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { httpOnly: true, secure: true } // secure: true in prod
// }));

Issuer[Symbol.for('openid-client.customHttpOptions')] = () => ({ agent });


config = await client.discovery(
  new URL(process.env.OIDC_ISSUER_URL),
  process.env.CLIENT_ID,
  { agent: agent }
);

console.log(config)

// app.get('/login', (req, res) => {
//   const codeVerifier = generators.codeVerifier();
//   const codeChallenge = generators.codeChallenge(codeVerifier);

//   // Save codeVerifier in session
//   req.session.codeVerifier = codeVerifier;

//   const authUrl = iClient.authorizationUrl({
//     scope: 'openid profile email offline_access',
//     code_challenge: codeChallenge,
//     code_challenge_method: 'S256',
//   });

//   res.redirect(authUrl);
// });

// app.get('/callback', async (req, res) => {
//   const params = iClient.callbackParams(req);
//   const tokenSet = await iClient.callback(process.env.REDIRECT_URI, params, {
//     code_verifier: req.session.codeVerifier
//   });

//   // Store tokens in session
//   req.session.accessToken = tokenSet.access_token;
//   req.session.refreshToken = tokenSet.refresh_token;
//   req.session.idToken = tokenSet.id_token;
//   req.session.expiresAt = Date.now() + tokenSet.expires_in * 1000;

//   res.redirect('/'); // or frontend URL
// });

// async function ensureAuthenticated(req, res, next) {
//   if (!req.session.accessToken) {
//     return res.status(401).send('Not authenticated');
//   }

//   const now = Date.now();
//   if (req.session.expiresAt && now > req.session.expiresAt - 60000) { // refresh 1 min early
//     try {
//       const tokenSet = await iClient.refresh(req.session.refreshToken);
//       req.session.accessToken = tokenSet.access_token;
//       req.session.refreshToken = tokenSet.refresh_token || req.session.refreshToken; // may rotate
//       req.session.expiresAt = now + tokenSet.expires_in * 1000;
//     } catch (err) {
//       return res.status(401).send('Refresh failed');
//     }
//   }
//   next();
// }

// app.get('/api/profile', ensureAuthenticated, async (req, res) => {
//   // Use access token to call resource server
//   const response = await fetch('https://api.example.com/me', {
//     headers: { Authorization: `Bearer ${req.session.accessToken}` }
//   });

//   const data = await response.json();
//   res.json(data);
// });

// app.get('/logout', (req, res) => {
//   req.session.destroy();
//   res.send('Logged out');
// });
