import { UserRepository } from "@/repositories/users-repository"

interface updateUserRequest {
    name: string,
    email: string,
    call: string
}

export class updateUsers {
    constructor(private userRepository: UserRepository) { }

    async execute({
        name,
        email,
        call
    }: updateUserRequest) {


        await this.userRepository.updateUser(
            name,
            email,
            call
        )
    }
}