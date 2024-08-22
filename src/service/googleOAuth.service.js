class GoogleOAuthService {
    //consent screen url contains client_id + redirect_uri + scope + (and another)
    async getConsentScreenURL() {
        const GOOGLE_CALLBACK_URL = 'http%3A//localhost:3000/auth/google/callback'
        const GOOGLE_OAUTH_SCOPES = [
            'https%3A//www.googleapis.com/auth/userinfo.email',
            'https%3A//www.googleapis.com/auth/userinfo.profile',
        ]

        const state = 'some_state'
        const scopes = GOOGLE_OAUTH_SCOPES.join(' ')
        const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${process.env.GOOGLE_OAUTH_URL}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`
        console.log('Google consent screen url: ' + GOOGLE_OAUTH_CONSENT_SCREEN_URL)

        return GOOGLE_OAUTH_CONSENT_SCREEN_URL
    }

    //exchange authorization code for access_token_data (access token, refresh token, id token,...)
    async getTokenDataFromAuthCode(code) {
        try {
            const data = {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: 'http://localhost:3000/auth/google/callback',
                grant_type: 'authorization_code',
            }

            const response = await fetch(process.env.GOOGLE_ACCESS_TOKEN_URL, {
                method: 'POST',
                body: JSON.stringify(data),
            })

            const access_token_data = await response.json()

            return access_token_data
        } catch (error) {
            throw error
        }
    }

    //verify and extract the information in the id token
    async getDataFromToken(access_token_data) {
        const { id_token } = access_token_data

        const token_info_response = await fetch(
            `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
        )

        const token_info_data = await token_info_response.json()

        return token_info_data
    }

    //reset access_token (access token, id token,...) from refresh token
    async resetTokenData(refresh_token) {
        try {
            const data = {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                refresh_token: refresh_token,
                grant_type: 'refresh_token',
            }

            const response = await fetch(process.env.GOOGLE_ACCESS_TOKEN_URL, {
                method: 'POST',
                body: JSON.stringify(data),
            })

            const access_token = await response.json()

            return access_token
        } catch (error) {
            throw error
        }
    }
}

export default new GoogleOAuthService()
