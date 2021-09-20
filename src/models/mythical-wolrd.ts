import Client from '../database';
import app from '../server';

export type Wolrd = {
    id: Number;
    name: string;
    type: string;
    weight: number;
}
export class MythicalWorldStore {
    async index(): Promise<Wolrd[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM mythical_worlds'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Something went wrong${err}`);
        }

    }
}

app.get('/users', (req, res) => {
    res.send(MythicalWorldStore);
})