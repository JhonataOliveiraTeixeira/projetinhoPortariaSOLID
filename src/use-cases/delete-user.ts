import { UserNotExist } from "@/erros/cheking-cases/cheking-user-exist"
import { UserRepository } from "@/repositories/users-repository"

interface deleteUserRequest {
    id: string
}

export class DeleteUser {
    constructor(private userRepository: UserRepository) { }

    async execute({ id }: deleteUserRequest) {

        const userExist = this.userRepository.exists(id)
        if (!userExist) {
            throw new UserNotExist()
        }

        await this.userRepository.delete(
            id
        )
    }

}