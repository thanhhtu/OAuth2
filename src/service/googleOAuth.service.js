class GoogleOAuthService {
    async getConsentScreenURL() {
        const GOOGLE_CALLBACK_URL = "http%3A//localhost:3000/auth/google/callback";
        const GOOGLE_OAUTH_SCOPES = [
            "https%3A//www.googleapis.com/auth/userinfo.email",
            "https%3A//www.googleapis.com/auth/userinfo.profile",
        ];

        const state = "some_state"
        const scopes = GOOGLE_OAUTH_SCOPES.join(" ")
        const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${process.env.GOOGLE_OAUTH_URL}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`
        
        console.log('Google consent screen url: ' + GOOGLE_OAUTH_CONSENT_SCREEN_URL)
        return GOOGLE_OAUTH_CONSENT_SCREEN_URL
    }
}

export default new GoogleOAuthService()
