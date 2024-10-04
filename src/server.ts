import express, { Request,Response} from 'express'
import { createApp } from './config/express';
import  { pgPool } from './config/postgres';
import { commentRouter } from './modules/comment/route';

const app = createApp();

const port = 3000;

// Middleware to handle JSON
app.use(express.json())

app.get('/', (req:Request, res:Response) => {
    res.send("hello world!")
})

app.get('/db', async (req, res) => {
    try {
      // const result = await pool.query('SELECT NOW()'); // Consulta para obtener la hora actual del servidor de PostgreSQL
      // const client = await pgClient.connect()
      const result = await pgPool.query('SELECT NOW()')
      console.log({result})
      res.json(result.rows[0]); // Devuelve el resultado de la consulta en formato JSON
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al conectar con la base de datos');
    }
});

app.use('/comment', commentRouter)


app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}`)
})