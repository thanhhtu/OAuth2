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
*/

export default route