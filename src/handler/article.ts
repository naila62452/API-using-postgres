import express, { Application, Request, Response } from 'express';
import { ArticleStore, Article } from '../models/article';

const store = new ArticleStore()

const index = async (req: Request, res: Response) => {
    const article = await store.index()
    res.json(article)
}
const showRecord = async (req: Request, res: Response) => {
    const article = await store.show(req.body.id)
    res.json(article)
}

const create = async (req:Request, res: Response) => {
    const article: Article = {
        title: req.body.title,
        content: req.body.content
    }
    const newArticle = await store.create(article)
    res.json(newArticle)
}

const destroy = async (req: Request, res: Response) => {
    const article = await store.delete(req.body.id)
    res.json(article);
}

const articleRoutes = (app: express.Application) => {
    // Express routes here
    app.get('/article', index);
    app.get('/article:/id', showRecord);
    app.post('/article', create);
    app.delete('/article:/id', destroy)

  }
  
export default articleRoutes;