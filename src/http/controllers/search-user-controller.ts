import { UserNotExist } from "@/erros/cheking-cases/cheking-user-exist"
import { PrimsaUserRepositpries } from "@/repositories/prisma/prisma-users-repositories"
import { SearchUser } from "@/use-cases/search-user"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


export async function searcherUserController(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        call: z.string().min(11).optional(),
        apartamentosId
            : z
                .string()
                .max(4)
                .min(3)
                .optional(),
    })
    const { name, email, call, apartamentosId } = registerBodySchema.parse(request.body)
    try {
        const prismaUserRepositories = new PrimsaUserRepositpries()
        const SearchUseri = new SearchUser(prismaUserRepositories)
        const responseBody = await SearchUseri.execute({
            email,
            name,
            apartamentosId,
            call

        })
        return reply.status(200).send(responseBody)
    } catch (err) {
        if (err instanceof UserNotExist) {
            reply.status(409).send({ mensage: err.message })
        }
        reply.status(404).send()

    }
}