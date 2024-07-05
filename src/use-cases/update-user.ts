import { UserNotExist } from "@/erros/cheking-cases/cheking-user-exist"
import { UserRepository } from "@/repositories/users-repository"

interface updateUserRequest {
    id: string ,
    name: string| undefined,
    email: string| undefined,
    call: string| undefined,
    apartamentosID: string| undefined,
}

export class updateUsers {
    constructor(private userRepository: UserRepository) { }

    async execute({
        id,
        name,
        email,
        call,
        apartamentosID,
    }: updateUserRequest) {

        const userExist = await this.userRepository.exists(id)
        if (!userExist) {
            throw new UserNotExist()
        }

        await this.userRepository.updateUser(
            id,
            name,
            email,
            call,
            apartamentosID
        )
    }
}