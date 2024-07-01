import { UserAlreadyExistError } from "@/erros/user-already-exist"
import { UserRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
    name: string,
    email: string,
    call: string,
    tipo: boolean,
    password?: string,
    apartamentosId: string,
    concierge?: boolean
}

export class RegisterUser {
    constructor(private userRepository: UserRepository) { }

    async execute({
        name,
        email,
        call,
        tipo,
        password,
        apartamentosId,
        concierge
    }: RegisterUseCaseRequest) {

        const userWithSameEmail = await this.userRepository.findByEmail(email)
        if (userWithSameEmail) {
            throw new UserAlreadyExistError()
        }

        let hash_passaword = ""
        if (password) {
            hash_passaword = await hash(password, 2)
        }

        await this.userRepository.create({
            name,
            email,
            call,
            tipo,
            hash_passaword: hash_passaword,
            apartamentosId,
            concierge
        })
    }
}