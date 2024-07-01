import { prisma } from "@/lib/prisma";
import { Prisma, User } from '@prisma/client'
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
                concierge: true,
                apartamentosId: true
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

    async updateUser(id: string, name?: string, email?: string, call?: string) {

        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                call,

            }
        })
        return user
    }
    async searchUser(email?:string, name?: string, apartamentosId?: string, call?: string): Promise< {} | null> {
        const user = await prisma.user.findMany({
            where:{
                email,
                name,
                apartamentosId,
                call
            },
            select: {
                id: true,
                name: true,
                email: true,
                call: true,
                tipo: true,
                concierge: true,
                apartamentosId: true
            }
            
        })
        return user
    }
    
    async updatePassword(email: string, password: string) {
        const user = await prisma.user.update({
            where: {
                email
            },
            data: {
                hash_passaword: password
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
    async exists(id: string): Promise<boolean> {
        const user = await prisma.user.findUnique(
            {
                where: { id }
            }
        )

        return user !== null
    }
    async authenticate(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })
        return user
    }

}
