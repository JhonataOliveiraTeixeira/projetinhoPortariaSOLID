import { UserRepository } from "@/repositories/users-repository"

interface updateUserRequest {
    id: string,
    name: string,
    email: string,
    call: string
}

export class updateUsers {
    constructor(private userRepository: UserRepository) { }

    async execute({
        id,
        name,
        email,
        call
    }: updateUserRequest) {


        await this.userRepository.updateUser(
            id,
            name,
            email,
            call
        )
    }
}