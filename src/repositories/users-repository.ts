import { Prisma, User } from "@prisma/client";

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
    updateUser(name: string, email: string, call: string): Promise<User | null>
    delete(id: string): Promise<User | null>
}