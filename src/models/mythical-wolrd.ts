import app from '../server';
import client from '../database';

export type Wolrd = {
    id?: number;
    name: string;
    type: string;
    weight: number;
}
export class MythicalWorldStore {
    async index(): Promise<Wolrd[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM mythical_worlds'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Something went wrong${err}`);
        }

    }
    async show(id: string): Promise<Wolrd> {
        try{
            const conn = await client.connect()
            const sql = 'SELECT FROM mythicals_worlds WHERE id = 1'
            const result = await conn.query(sql);
            conn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Not found ${err}`)
        }
    }
    async create(w: Wolrd): Promise<Wolrd> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO mythical_world(name, type, weight) VALUES ("Naila", "Female", 48)'
            const result = await conn.query(sql)
            conn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Not added ${err}`)
        }
    }
}