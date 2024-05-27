import { UserAlreadyExistError } from "@/erros/user-already-exist";
import { PrimsaUserRepositpries } from "@/repositories/prisma/prisma-users-repositories";
import { DeleteUser } from "@/use-cases/delete-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        id: z.string()
    })
    const { id } = registerBodySchema.parse(request.body)

    try {

        const prismaUserRepositories = new PrimsaUserRepositpries()
        const registerUsercase = new DeleteUser(prismaUserRepositories)
        await registerUsercase.execute({
            id
        })
    } catch (err) {
        if (err instanceof UserAlreadyExistError) {
            reply.status(409).send({ mensage: err.message })
        }

        throw err
    }

    return reply.status(200).send()

}