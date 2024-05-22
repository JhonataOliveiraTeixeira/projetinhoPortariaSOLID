import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { UserRepository } from "../users-repository";

export class PrimsaUserRepositpries implements UserRepository {

    async updateUser(name: string, email: string, call: string) {

        const user = await prisma.user.update({
            where: {
                email,
            },
            data: {
                name,
                email,
                call,
            }
        })
        return user
    }
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })
        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })

        return user
    }
}
