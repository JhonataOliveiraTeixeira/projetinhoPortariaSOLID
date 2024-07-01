import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { RegisterUser } from "@/use-cases/register"
import { PrimsaUserRepositpries } from "@/repositories/prisma/prisma-users-repositories"
import { UserAlreadyExistError } from "@/erros/user-already-exist"
import { PasswordShort } from "@/erros/passarword-is-short"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        call: z.string().min(11),
        tipo: z.boolean(),
        password: z.string().optional(),
        apartamentosId
            : z
                .string()
                .max(4)
                .min(3),
        concierge: z.boolean()
    })

    const { name, email, call, tipo, password, apartamentosId, concierge } = registerBodySchema.parse(request.body)
    let checkoutPassword = password
    if (checkoutPassword && checkoutPassword.length < 6) {
        const err = new PasswordShort
        return reply.status(400).send({ mensage: err.message })
    }
    try {

        const prismaUserRepositories = new PrimsaUserRepositpries()
        const registerUsercase = new RegisterUser(prismaUserRepositories)
        await registerUsercase.execute({
            name,
            email,
            call,
            tipo,
            password: password || "",
            apartamentosId,
            concierge

        })
    } catch (err) {
        if (err instanceof UserAlreadyExistError) {
            reply.status(409).send({ mensage: err.message })
        }

        throw err
    }

    return reply.status(201).send()
}