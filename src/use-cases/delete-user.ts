import { UserRepository } from "@/repositories/users-repository"

interface deleteUserRequest {
    id: string
}

export class DeleteUser {
    constructor(private userRepository: UserRepository) { }

    async execute({ id }: deleteUserRequest) {
        await this.userRepository.delete(
            id
        )
    }

}