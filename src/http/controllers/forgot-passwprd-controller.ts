import { FiledSendResetPassword } from "@/erros/filed-send-reset-password";
import { PrimsaUserRepositpries } from "@/repositories/prisma/prisma-users-repositories";
import { ResetPassword } from "@/use-cases/forgot-password";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function forgotPasswordController(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        email: z.string(),
    })
    const { email } = registerBodySchema.parse(request.body)

    try {


        const prismaUserRepositories = new PrimsaUserRepositpries()
        const registerUsercase = new ResetPassword(prismaUserRepositories)
        await registerUsercase.execute({
            email
        })
    } catch (err) {
        if (err instanceof FiledSendResetPassword) {
            reply.status(400).send({ mensage: err.message })
        }

        throw err
    }

    return reply.status(204).send()

}