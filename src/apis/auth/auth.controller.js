import authService from './auth.service'

class AuthController {
    login(req, res, next) {
        res.render('login.ejs')
    }

    async checkLogin(req, res, next) {
        try {
            const { email, password } = req.body
            console.log(req.body)
            const token = await authService.checkLogin({ email, password })

            if (token) {
                return res.status(200).json({
                    success: true,
                    token: token
                });
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
        try{
            return res.redirect(await authService.getConsentScreenURL()) //url contains client_id + redirect_uri + scope + (and another)
        }catch(error){
            return res.json({
                success: false,
                message: error.message
            })
        }
    }

    async handleGoogleRes(req, res, next) {
        try{
            //code which is authorization code
            const { code } = req.query

            const data = {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: 'http://localhost:3000/auth/google/callback',
                grant_type: 'authorization_code',
            }

            //exchange authorization code for access token & id_token 
            const response = await fetch(process.env.GOOGLE_ACCESS_TOKEN_URL, {
                method: 'POST',
                body: JSON.stringify(data),
            })

            //access_token_data which contains access_token, refresh token, id_token,...
            const access_token_data = await response.json()

            const { id_token } = access_token_data

            //verify and extract the information in the id token
            const token_info_response = await fetch(
                `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
            )

            //use JWT authentication as an alternative to creating a user session when a user logs in
            const token_info_data = await token_info_response.json()
            const { email } = token_info_data
            const { user, token } = await authService.setTokenGoogleLogin(email)

            console.log('token: ' + token)
            return res.status(token_info_response.status).json({
                token: token
            })
        }catch(error){
            return res.json({
                success: false,
                message: error.message
            })
        }
    }
}

export default new AuthController()
