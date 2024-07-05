import { UserAlreadyExistError } from "@/erros/user-already-exist";
import { PrimsaUserRepositpries } from "@/repositories/prisma/prisma-users-repositories";
import { updateUsers } from "@/use-cases/update-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        id: z.string(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        call: z.string().min(11).optional(),
        apartamentosID: z.string().min(3).max(4).optional()
    })
    const { id, name, email, call, apartamentosID } = registerBodySchema.parse(request.body)

    try {

        const prismaUserRepositories = new PrimsaUserRepositpries()
        const registerUsercase = new updateUsers(prismaUserRepositories)
        await registerUsercase.execute({
            id,
            name,
            email,
            call,
            apartamentosID
        })
    } catch (err) {
        if (err instanceof UserAlreadyExistError) {
            reply.status(409).send({ mensage: err.message })
        }

        throw err
    }

    return reply.status(204).send()

}