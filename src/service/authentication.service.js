import jwt from 'jsonwebtoken'
import 'dotenv/config'

class UserIdentityService {
    async encodeToken(user) {
        return jwt.sign(
            { 
                id: user.UserID
            }, 
            process.env.JWT_SECRET, 
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
                algorithm: 'HS256',
            }
        )
    }

    async decodeToken(token) {
        return jwt.verify(token, this.JWT_SECRET);
    }
}

export default new UserIdentityService()
