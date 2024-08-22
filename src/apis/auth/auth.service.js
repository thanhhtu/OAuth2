import usersModel from '../../models/users.model'
import googleOAuthService from '../../service/googleOAuth.service'
import userIdentityService from '../../service/authentication.service'

class AuthService {
    async checkLogin(loginInfo) {
        try {
            const user = await usersModel.getUserByEmailAndPwd(loginInfo)
            if (user == null) {
                return false
            }
            
            const token = await userIdentityService.encodeToken(user)
            return token
        } catch (error) {
            throw error
        }
    }

    async getConsentScreenURL() {
        try {
            return googleOAuthService.getConsentScreenURL()
        } catch (error) {
            throw error
        }
    }

    async setTokenGoogleLogin(code) {
        try {
            const access_token_data = await googleOAuthService.getTokenFromAuthCode(code)
            const token_info_data = await googleOAuthService.getDataFromToken(access_token_data)

            const { email } = token_info_data //email in token_info_data

            let user = await usersModel.getUserByEmail(email)
            if (user == null) {
                user = await usersModel.createUser(email)
            }
            let token = await userIdentityService.encodeToken(user)
            
            return token
        } catch (error) {
            throw error
        }
    }
}

export default new AuthService()
