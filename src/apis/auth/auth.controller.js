import authService from './auth.service'

class AuthController {
    login(req, res, next) {
        res.render('login.ejs')
    }

    async checkLogin(req, res, next) {
        try {
            const { email, password } = req.body
            console.log(req.body)
            const token = await authService.setTokenBasicLogin({ email, password })

            if (token) {
                return res.status(200).json({
                    success: true,
                    token: token,
                })
            }

            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    async redirectConsentScreen(req, res, next) {
        try {
            return res.redirect(await authService.getConsentScreenURL()) 
        } catch (error) {
            return res.json({
                success: false,
                message: error.message,
            })
        }
    }

    async handleGoogleRes(req, res, next) {
        try {
            const { code } = req.query //authorization code

            //use JWT authentication as an alternative to creating a user session when a user logs in
            const token = await authService.setTokenGoogleLogin(code)
            console.log('token: ' + token)

            return res.status(200).json({
                success: true,
                token: token,
            })
        } catch (error) {
            return res.json({
                success: false,
                message: error.message,
            })
        }
    }
}

export default new AuthController()
