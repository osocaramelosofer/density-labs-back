import { Router } from "express";

import {list, post, deleteComment, putComment  } from './controller'

export const commentRouter = Router()

commentRouter.get('/list', list)
commentRouter.post('/post', post)
commentRouter.delete('/delete', deleteComment)
commentRouter.put('/put', putComment)