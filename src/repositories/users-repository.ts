import { Prisma, User } from "@prisma/client";


export interface UserRepository {
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
    updateUser(id: string, name?: string, email?: string, call?: string): Promise<User | null>
    delete(id: string): Promise<User | null>
    exists(id: string): Promise<boolean>
    authenticate(email: string): Promise<User | null>
    updatePassword(email: string, hash_passaword: string): Promise<User | null>
<<<<<<< HEAD
    searchUser(email?:string, name?: string, apartamentosId?: string, call?: string): Promise<{}| null>
=======
>>>>>>> 13f973e6f3ad82ca8b620682aaea153f4deb9faa
}