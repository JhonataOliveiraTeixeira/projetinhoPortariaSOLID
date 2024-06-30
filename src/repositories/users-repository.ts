import { Prisma, User } from "@prisma/client";


export interface UserRepository {
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
    updateUser(id: string, name?: string, email?: string, call?: string): Promise<User | null>
    delete(id: string): Promise<User | null>
    exists(id: string): Promise<boolean>
    authenticate(email: string): Promise<User | null>
    updatePassword(email: string, hash_passaword: string): Promise<User | null>
}