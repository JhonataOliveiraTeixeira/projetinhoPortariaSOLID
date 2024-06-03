import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { UserRepository } from "../users-repository";

export class PrimsaUserRepositpries implements UserRepository {
    async viewAll() {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                call: true,
                tipo: true,
                concierge: true
            }
        });
        return users;
    }

    async delete(id: string) {
        const user = await prisma.user.delete({
            where: {
                id
            }
        })
        return user
    }

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
