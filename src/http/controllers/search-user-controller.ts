import { UserNotExist } from "@/erros/cheking-cases/cheking-user-exist"
import { PrimsaUserRepositpries } from "@/repositories/prisma/prisma-users-repositories"
import { SearchUser } from "@/use-cases/search-user"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


export async function searcherUserController(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        call: z.string().min(11),
        apartamentosId
            : z
                .string()
                .max(4)
                .min(3),
    })
    const { name, email, call, apartamentosId } = registerBodySchema.parse(request.body)
try{
    const prismaUserRepositories = new PrimsaUserRepositpries()
    const registerUsercase = new SearchUser(prismaUserRepositories)
    await registerUsercase.execute({
        name,
        email,
        call,
        apartamentosId,

    })
    return reply.status(200).send()
}catch (err) {
    if (err instanceof UserNotExist) {
        reply.status(409).send({ mensage: err.message })
    }

}
}