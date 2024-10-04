import { Request, Response } from 'express'
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

// helpers
export function INTERNAL_SERVER_ERROR_RESPONSE (res: Response, message: string) {
    return res.status(500).json({
        error:{
            message,
            code: 'Internal error'
        }
    })
}

export function validateParams(requiredParams:string[], dictionary: Record<string, any>, response:Response ){
    for(const param of requiredParams){
        if(dictionary[param] === undefined){
            return response.status(400).json({
                success:false,
                error:{
                    message: `Missing ${param} in request`
                }
            })
        }
    }
}