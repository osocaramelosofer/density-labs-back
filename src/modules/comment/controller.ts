import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR_RESPONSE, validateParams } from '../api/controller'
import { services } from './services'

export async function list (req:Request, res: Response) {
    try {
        const comments = await services.list()
        res.status(200).json({ data: comments })
        
    } catch (error) {
        console.error({error})
        const message = error instanceof Error ? error.message : 'Error trying to list the comments'
        INTERNAL_SERVER_ERROR_RESPONSE(res,message)
    }
}
export async function post(req:Request, res: Response) {
    try {
        const requiredParams = ['email', 'comment']
        validateParams(requiredParams, req.body, res)

        const comment = await services.createComment({...req.body})
        res.status(200).json({ data: comment })
        
    } catch (error) {
        console.error({error})
        const message = error instanceof Error ? error.message : 'Error trying to list the comments'
        INTERNAL_SERVER_ERROR_RESPONSE(res,message)
    }
}
export async function deleteComment(req:Request, res: Response) {
    try {
        const requiredParams = ['id']
        validateParams(requiredParams, req.query, res)
        const { id } = req.query
        const data = await services.delete(id as string)
        res.status(200).json({ data })
        
    } catch (error) {
        console.error({error})
        const message = error instanceof Error ? error.message : 'Error trying to list the comments'
        INTERNAL_SERVER_ERROR_RESPONSE(res,message)
    }
}
export async function putComment(req:Request, res: Response) {
    try {
        const requiredParams = ['id', 'email', 'comment']
        validateParams(requiredParams, req.body, res)

        const data = await services.updateComment({...req.body})
        res.status(200).json({ data })
        
    } catch (error) {
        console.error({error})
        const message = error instanceof Error ? error.message : 'Error trying to list the comments'
        INTERNAL_SERVER_ERROR_RESPONSE(res,message)
    }
}