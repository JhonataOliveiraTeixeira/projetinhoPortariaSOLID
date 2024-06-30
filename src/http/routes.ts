import { FastifyInstance } from "fastify";
import { register } from "./controllers/register-controller";
import { update } from "./controllers/update-user-controller";
import { deleteUser } from "./controllers/delete-user-controller";
import { view_all } from "./controllers/view-all-controller";
import { signIn } from "./controllers/session-controller";
import { middlewareAuthenticate } from "@/middlewares/authenticate-middleware";
import { forgotPasswordController } from "./controllers/forgot-passwprd-controller";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', { preHandler: middlewareAuthenticate(true) }, register);
    app.put('/update-users', { preHandler: middlewareAuthenticate(true) }, update);
    app.delete('/delete-user', { preHandler: middlewareAuthenticate(true) }, deleteUser);
    app.get('/view-all', { preHandler: middlewareAuthenticate(true) }, view_all);
    app.post('/signin', signIn);
    app.put('/forgot-passwordd', { preHandler: middlewareAuthenticate(true) }, forgotPasswordController);
}
