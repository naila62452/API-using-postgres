import bcrypt, { hash } from 'bcrypt';
import client from '../database';
require('dotenv').config()

export type User = {
    id?: number;
    name: string;
    password: string

}

export class UserInfoStore {

    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows
        } catch {
            throw new Error(`Not found`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            let salt = process.env.SALT_ROUNDS as string;
            let pepper = process.env.BCRYPT_PASSWORD as string;
            const conn = await client.connect()
            const sql = 'INSERT INTO users (name, password) VALUES($1, $2) RETURNING *'
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(salt)
            );

            const result = await conn.query(sql, [u.name, hash])
            const user = result.rows[0]

            conn.release()

            return user
        } catch (err) {
            throw new Error(`unable create user (${u.name}): ${err}`)
        }
    }

    async authenticate(name: string, password: string): Promise<User | null> {

        let pepper = process.env.BCRYPT_PASSWORD as string;
        const conn = await client.connect();
        const sql = 'SELECT password FROM users WHERE name = ($1)'
        const result = await conn.query(sql, [name])
        if (result.rows.length) {
            const user = result.rows[0]
            if (bcrypt.compareSync(password + pepper, user.password)) {
                return user;
            }

        }
        return null;
    }
    async show(id: string): Promise<User> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT * FROM users WHERE id = ($1)';
            const result = await connection.query(sql, [id]);
            console.log(result);
            connection.release();
            return result.rows[0]

        }
        catch (err:any) {
            throw new Error(err)
        }
    }
}
export default hash;
