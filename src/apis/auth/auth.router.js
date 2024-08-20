import express from 'express'
import authController from './auth.controller'

const route = express.Router()

route.get('/', authController.login)
route.post('/check-login', authController.checkLogin)

route.get('/google', authController.redirectConsentScreen) 
route.get('/google/callback', authController.handleGoogleRes)

/* 
- api ('auth/google'): return redirect to url Google Authorization Server
- api ('/google/callback'): return token login

1. User clicks login ('auth/google')
2. (res of 'auth/google') Redirect to Google Authorization Server (this url contains client id + scope) 
3. Google sends consent prompt (appear confirming screen)
4. User confirms
5. Google redirects to redirect url (/auth/google/callback - is set when registering client with google)
   + url attach Authorization Code (attach in req.query)
6. Client send request (google_access_token_url) (method: post, body: authorization code + client id + client secret) 
    to google -> to get access token and id token
7. Google res access token + id token to client 
8. Client send request to google -> to get user data with Access Token
9. Google res to client
*/

export default route