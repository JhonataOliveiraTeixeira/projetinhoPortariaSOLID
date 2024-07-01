import { TokenService } from "@/repositories/middleware- repository"
import { PrimsaUserRepositpries } from "@/repositories/prisma/prisma-users-repositories"
import { AuthenticateUSer } from "@/use-cases/authenticate"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { env } from "@/env"




interface SignInRequestBody {
    email: string
    password: string
}

export async function signIn(req: FastifyRequest<{ Body: SignInRequestBody }>, reply: FastifyReply) {
    const registerBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
    const { email, password } = registerBodySchema.parse(req.body)
    try {
        const prismaUserRepositories = new PrimsaUserRepositpries()
        const tokenService = new TokenService(env.MY_SECRET_KEY)
        const authenticateUser = new AuthenticateUSer(prismaUserRepositories, tokenService)

        const { token } = await authenticateUser.execute({
            email,
            password,
        })

        return reply.status(200).send({ token })
    } catch (error) {
        console.error(error)
        return reply.status(500).send({ message: "Erro na autenticação" })
    }
}
