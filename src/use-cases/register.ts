import { UserAlreadyExistError } from "@/erros/user-already-exist"
import { UserRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"


interface RegisterUseCaseRequest {
    name: string,
    email: string,
    call: string,
    tipo: boolean
    password: string

}


export class RegisterUser {
    constructor(private userRepository: UserRepository) { }

    async execute({
        name,
        email,
        call,
        tipo,
        password
    }: RegisterUseCaseRequest) {

        const hash_passaword = await hash(password, 2)

        const userWithSameEmail = await this.userRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistError()
        }

        // const prismaUseCaseRepository = new PrimsaUserRepositpries()

        await this.userRepository.create({
            name,
            email,
            call,
            tipo,
            hash_passaword
        })

    }
}