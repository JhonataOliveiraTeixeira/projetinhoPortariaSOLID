import { UserAlreadyExistError } from "@/erros/user-already-exist";
import { PrimsaUserRepositpries } from "@/repositories/prisma/prisma-users-repositories";
import { ViewAllUseCase } from "@/use-cases/view-all";
import { FastifyReply, FastifyRequest } from "fastify";

export async function view_all(request: FastifyRequest, reply: FastifyReply) {

    try {

        const prismaUserRepositories = new PrimsaUserRepositpries()
        const viewAll = new ViewAllUseCase(prismaUserRepositories)
        const allUsers = await viewAll.execute()
        reply.send(allUsers)

    } catch (err) {
        if (err instanceof UserAlreadyExistError) {
            reply.status(409).send({ mensage: err.message })
        }

        throw err
    }

    return reply.status(200)
}