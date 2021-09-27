import express, { Application, Request, Response } from 'express';
import { Book, BookStore } from '../models/book';
import jwt from 'jsonwebtoken';
require('dotenv').config()

const store = new BookStore()

const index = async (req: Request, res: Response) => {

    console.log(req.query.id);

    const books = await store.index()
    res.json(books)
}

const show = async (req: Request, res: Response) => {

    const books = await store.show(req.query.id as string)
    res.json(books)

}
// const addBook = async (req: Request, res: Response) => {
//     const book: Book = {
//         title: req.body.title,
//         author: req.body.author,
//         total_pages: req.body.total_pages,
//         type: req.body.type,
//         summary: req.body.summary
//     }
//     try {
//         jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
//         const newBook = await store.create(book)
//         res.json(book);
//     } catch(err) {
//         res.status(401)
//     }
   
// }
const addBook = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const book: Book = {
            title: req.body.title,
            author: req.body.author,
            total_pages: req.body.total_pages,
            summary: req.body.summary,
            type: req.body.type
        }

        const newBook = await store.create(book)
        res.json(newBook)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const destroy = async (req: Request, res: Response) => {
    const books = await store.delete(req.query.id as string)
    res.json(books)
}
const books_route = (app: express.Application) => {
    app.get('/books', index)
    app.get('/book', show)
    app.post('/add', addBook)
    app.delete('/delete', destroy);
}

export default books_route