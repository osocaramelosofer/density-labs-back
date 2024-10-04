import { pgPool } from "../../config/postgres"
import { CommentPost, Comment } from "../../types/comment"
import { v4 as uuidv4 } from 'uuid';


export const services = {
    list: async (): Promise<Comment | null> => {
        try {
            const text = `SELECT * FROM comment`            
            const result = await pgPool.query(text)
            const comments = result.rows as unknown as Comment
            return comments
        } catch (error) {
            console.error({error})
            return null           
        }
    },
    createComment: async ({email, comment} : CommentPost): Promise<Comment | null> => {
        try {
            
            const id = uuidv4()

            const text = 'INSERT INTO comment(id, email, comment) VALUES($1, $2, $3) RETURNING *'           
            const values = [id, email, comment]
            const result = await pgPool.query(text, values)         
            const commentCreated = result.rows[0] as unknown as Comment
            return commentCreated
        } catch (error) {
            console.error({error})
            return null           
        }
    },
    delete: async(id: string): Promise<{success: boolean, message: string}> => {
        try {
            const text = `DELETE FROM comment
                            WHERE id = $1`
            const values = [id]
            const result = await pgPool.query(text,values)
           
            return {success: true, message: 'Comment deleted successfully'}
        } catch (error) {
            console.error({error})
            return {success: false, message: 'Error at delete comment service'}
        }
    },
    updateComment: async({id, email, comment}: Comment): Promise<Comment | null> => {
        try {
            const text = `
                    UPDATE comment
                    SET email = $2, comment = $3
                    WHERE id = $1
                    RETURNING *
            `
            const values = [id, email, comment]
            const result = await pgPool.query(text,values)
            console.log(result.rows)
            const commentUpdated: Comment = result.rows[0] || null
            return commentUpdated
        } catch (error) {
            console.error({error})
            return null
        }
    }

}