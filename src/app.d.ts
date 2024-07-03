import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.addHook('onRequest', (request, reply, done) => {
    reply.header('Access-Control-Allow-Origin', '*')
    reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    reply.header('Access-Control-Allow-Credentials', 'true')


    if (request.method === 'OPTIONS') {
        reply
            .code(200)
            .header('Content-Length', '0')
            .send();
        return;
    }

    done();
});

app.register(appRoutes)


app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    } else {
        // TODO: ferramentas externas para verificar o erro 
    }

    return reply.status(500).send({ message: 'Internal Server Error' });
});
