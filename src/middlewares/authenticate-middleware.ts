import { verify } from "jsonwebtoken";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/lib/prisma";


interface DecodedToken {
    userId: string
}

export function middlewareAuthenticate(permission: boolean) {
    return async (req: FastifyRequest, reply: FastifyReply) => {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return reply.status(401).send({ mensage: "Token não reconhecido" })
        }
        const token = authHeader.substring(7)
        try {
            const MY_SECRET_KEY = process.env.MY_SECRET_KEY

            if (!MY_SECRET_KEY) {
                throw new Error("Token não informado!")
            }

            const decodedToken = verify(token, MY_SECRET_KEY) as DecodedToken

            req.user = { id: decodedToken.userId }

            if (permission) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: decodedToken.userId
                    },
                    select: {
                        concierge: true
                    }
                })

                // const userPermission = user?.concierge?.valueOf()
                // if (!userPermission) {
                //     return reply.status(403).send({ message: "Acesso negado" })
                // }
            }
            return
        } catch (error) {
            return reply.status(401).send({ message: "Token inválido" });
        }

    }

}
