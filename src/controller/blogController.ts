import { Request, Response } from 'express';

import blogs from '../models/blogModel'

export const getBlogs = (req: Request, res:Response) => {
    try {
        blogs.find({}).then(data => {
            res.json(data)
        }).catch(e => {
            res.sendStatus(400);
        })
    } catch (e) {
        res.sendStatus(401)
    }
}

export const getBlog = (req: Request, res: Response) => {
    try {
        const title:string = req.body.title;
        blogs.find({title}).then(data => {
            res.json(data)
        }).catch(e => {
            res.sendStatus(400);
        })
    } catch (e) {
        res.sendStatus(401)
    }
}

export const deleteBlog = (req: Request, res: Response) => {
    try {
        const title: string = req.body.title;
        blogs.findOneAndDelete({ title }).then(data => {
            res.json('data Successfully deleted')
        }).catch(e => {
            res.sendStatus(400);
        })
    } catch (e) {
        res.sendStatus(401)
    }
}

export const updateBlog = (req: Request, res: Response) => {
    try {
        const title: string = req.body.title;
        blogs.find({ title }).then(data => {
            res.send(data)
        }).catch(e => {
            res.sendStatus(400);
        })
    } catch (e) {
        res.sendStatus(401)
    }
}