import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { RegisterUser } from "@/use-cases/register"
import { PrimsaUserRepositpries } from "@/repositories/prisma/prisma-users-repositories"
import { UserAlreadyExistError } from "@/erros/user-already-exist"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        call: z.string().min(11),
        tipo: z.boolean(),
        password: z.string().min(6)
    })

    const { name, email, call, tipo, password } = registerBodySchema.parse(request.body)

    try {

        const prismaUserRepositories = new PrimsaUserRepositpries()
        const registerUsercase = new RegisterUser(prismaUserRepositories)
        await registerUsercase.execute({
            name,
            email,
            call,
            tipo,
            password
        })
    } catch (err) {
        if (err instanceof UserAlreadyExistError) {
            reply.status(409).send({ mensage: err.message })
        }

        throw err
    }

    return reply.status(201).send()
}