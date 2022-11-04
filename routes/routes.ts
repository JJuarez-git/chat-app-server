import dotenv from 'dotenv'
import { Router, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import User from '../classes/User';
import { getAllTalks } from '../repositories/TalksRepository';

const router = Router()
dotenv.config()

const authenticateToken = (req: Request, res: Response, next: any) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401)

    jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) return res.sendStatus(403)
        req.body.user = user
        next()
    })
}

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'API - Chat App'
    })
})

router.get('/databases', async (req: Request, res: Response) => {
    const result = await getAllTalks()
    /* console.log(result); */
    res.json({ databases: result })
})

router.post('/auth', (req: Request, res: Response) => {
    const { username, password } = req.body

    const user = { name: username }
    jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, (err, token) => {
        res.json({ accessToken: token })
    })
})

router.get('/posts', authenticateToken, (req: Request, res: Response) => {
    const posts = [
        {
            owner: 'Jose',
            info: 'Lorem ipsum'
        },
        {
            owner: 'Pepe',
            info: 'Lorem ipsum'
        }
    ]
    /* res.json(posts.filter(post => post.owner === req.body.user)) */
    res.json(posts)
})

export default router