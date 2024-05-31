import { FastifyInstance } from "fastify";
import { register } from "./controllers/register-controller";
import { update } from "./controllers/update-user-controller";
import { deleteUser } from "./controllers/delete-user-controller";
import { view_all } from "./controllers/view-all-controller";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/update-users', update)
    app.delete('/delete-user', deleteUser)
    app.get('/view-all', view_all)
}
