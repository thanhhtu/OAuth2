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

    async setTokenGoogleLogin(email) {
        try {
            let user = await usersModel.getUserByEmail(email)
            if (user == null) {
                user = await usersModel.createUser(email)
            }
            let token = await userIdentityService.encodeToken(user)
            console.log(token)
            return { user, token }
        } catch (error) {
            throw error
        }
    }
}

export default new AuthService()
