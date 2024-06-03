import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { sign } from "jsonwebtoken";

interface SignInRequestBody {
    email: string;
    password: string;
}

export const signIn = async (req: FastifyRequest<{ Body: SignInRequestBody }>, reply: FastifyReply) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return reply.status(400).send({ message: "Usuário não encontrado" });
        }
        if (!user.concierge) {
            return reply.status(401).send({ message: "Acesso negado 1" });
        }

        const isPasswordValid = await compare(password, user.hash_passaword)
        if (!isPasswordValid) {
            return reply.status(400).send({ message: "Acesso negado 2" });
        }

        const MY_SECRET_KEY = process.env.MY_SECRET_KEY

        if (!MY_SECRET_KEY) {
            throw new Error("Token não informado!")
        }

        const token = sign({
            userId: user.id, roles: user.concierge.valueOf()
        }, MY_SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: "24h",
        })

        return reply.status(200).send({ token })
    } catch (error) {
        return reply.status(500).send({ message: "Erro na autenticação" });
    }
};
