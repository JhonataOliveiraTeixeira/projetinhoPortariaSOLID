import fastify from "fastify"
import { appRoutes } from "./http/routes"
import { ZodError } from "zod"
import { env } from "./env"
import { fastifyCors } from 'fastify-cors'


export const app = fastify()


app.register(appRoutes)

app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ mensage: 'validation error. ', issues: error.format() })
    }

    if (env.NODE_ENV != 'production') {
        console.error(error)
    } else {
        // TODO: ferramentas externas paar verificar o erro 
    }

    return reply.status(500).send({ message: 'Internal Server Error' })
})
