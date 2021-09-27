import hash, { UserInfoStore, User } from "../models/user";
import express, { Application, Request, Response } from 'express';
import app from "../server";
import jwt from 'jsonwebtoken';
require('dotenv').config()

const store = new UserInfoStore();
const index = async (req: Request, res:Response) => {
    const user = await store.index()
    res.json(user);
}

const addUser = async (req:Request, res:Response) => {
    const user: User = {
        name: req.body.name,
        password: req.body.password
    }
    const newUser = await store.create(user);
    res.json(newUser);
}

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        name: req.body.name,
        password: req.body.password
    }
    const auth = await store.authenticate(user.name, user.password)

    res.send(auth);
 
}
const getUser = async(req: Request, res:Response) => {
    const users = await store.show(req.query.id as string)
    res.json(users)
}

const user_routes = (app: express.Application) => {
    app.post('/adduser', addUser);
    app.get('/user', index);
    app.post('/auth', authenticate);
    app.get('/getuser', getUser);
}

export default user_routes;