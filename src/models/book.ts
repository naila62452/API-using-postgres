import client from "../database";

export type Book = {
    id?: string;
    title: string;
    author: string;
    total_pages: number;
    type: string;
    summary: string
}

export class BookStore {
    async index(): Promise<Book[]> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT * FROM books';
            const result = await connection.query(sql)
            connection.release()
            return result.rows;
        } catch (err) {
            throw new Error(`No result found ${err}`);
        }
    }
    async show(id: string): Promise<Book> {
        try {
            console.log(id)
            const connection = await client.connect()
            const sql = 'SELECT * FROM books WHERE id = ($1)';
            const result = await connection.query(sql, [id]);
            console.log(result);
            connection.release();
            return result.rows[0]

        }
        catch (err:any) {
            throw new Error(err)
        }
    }
    async create(b: Book): Promise<Book> {
        try {
            const connection = await client.connect();
            const sql = 'INSERT INTO books(title, author, total_pages, type, summary) VALUES \
            (($1), ($2), ($3), ($4), ($5))';
            const result = await connection.query(sql, [b.title, b.author, b.total_pages, b.type, b.summary]);
            connection.release();
            return result.rows[0]
        } catch(err) {
            throw new Error(`Error happend in insertion ${err}`);
        }
      
    }
    async delete(id: string): Promise<Book> {
        try {
            const connection = await client.connect();
            const sql = 'DELETE FROM books WHERE id = ($1)';
            const result = await connection.query(sql , [id]);
            connection.release();
            return result.rows[0]
        } catch(err) {
            throw new Error(`Error, can not delete ${err}`);
        }
      
    }
} 