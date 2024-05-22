import { FastifyInstance } from "fastify";
import { register } from "./controllers/register-controller";
import { update } from "./controllers/update-user-controller";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/update-users', update)

}
