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