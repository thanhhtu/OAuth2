import pool from '../config/db.config'

class UsersModel {
    async getUserByEmailAndPwd(user) {
        try {
            const connection = await pool.getConnection()
            const query = `SELECT * FROM users WHERE Email = ? AND Pwd = ?`
            const { email, password } = user
            const value = [email, password]
            const [rows, fields] = await connection.query(query, value)
            connection.release()
            return rows[0]
        } catch (error) {
            throw error
        }
    }

    async getUserByEmail(email) {
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE Email = ?`
            const value = [email]
            const [rows, fields] = await connection.query(query, value)
            connection.release()
            return rows[0]
        }catch(error){
            throw error
        }
    }

    async createUser(email, access_token_data){
        try{
            const connection = await pool.getConnection()
            const query = `INSERT INTO users (Email, ExpireIn, RefreshToken) VALUES (?, ?, ?);`
            const {expires_in, refresh_token} = access_token_data
            const value = [email, new Date(Date.now() + expires_in), refresh_token]
            const result = await connection.query(query, value)
            return result[0]
        }catch(error){
            throw error;
        }
    }

    async updateToken(access_token_data, userID){
        try{
            const connection = await pool.getConnection()
            const query = `UPDATE users SET ExpireIn = ?, RefreshToken = ? WHERE UserID = ?;`
            const {expires_in, refresh_token} = access_token_data
            const value = [new Date(Date.now() + expires_in), refresh_token, userID]
            const result = await connection.query(query, value)
            return result[0].affectedRows
        }catch(error){
            throw error
        }
    }
}

export default new UsersModel()
