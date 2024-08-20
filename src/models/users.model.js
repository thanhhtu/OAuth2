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
            const query = `SELECT * FROM users WHERE Email = ?`;
            const value = [email];
            const [rows, fields] = await connection.query(query, value);
            connection.release();
            return rows[0];
        }catch(error){
            throw error;
        }
    }

    async createUser(email){
        try{
            const connection = await pool.getConnection();
            const query = `INSERT INTO users (Email) VALUES (?);`;
            const value = [email];
            const result = await connection.query(query, value);
            return result[0]
        }catch(error){
            throw error;
        }
    }
}

export default new UsersModel()
