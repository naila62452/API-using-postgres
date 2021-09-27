import { MythicalWorldStore, Wolrd } from "../models/mythical-wolrd";
import express, { Application, Request, Response } from 'express';

const store = new MythicalWorldStore()

const index = async (req:Request, res:Response) => {
    const world = store.index();
    res.json(world)
}
const addWorld = async (req:Request, res:Response) => {
    const newRecord: Wolrd = {
        name: req.body.name,
        type: req.body.type,
        weight: req.body.weight
    }
    const world = store.create(newRecord)
    res.json(world)
}

const mythical_routes = (app: express.Application) => {
    app.get('/world', index);
    app.post('/add', addWorld);
}

export default mythical_routes;