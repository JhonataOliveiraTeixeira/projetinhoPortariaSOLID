import { UserNotExist } from "@/erros/cheking-cases/cheking-user-exist"
import { UserRepository } from "@/repositories/users-repository"

interface sercheUserRequest {
    email: string | undefined
    name: string | undefined
    call: string | undefined
    apartamentosId: string | undefined
}


export class SearchUser {
    constructor(private userRepository: UserRepository) { }

    async execute({
        email,
        name,
        apartamentosId,
        call }: sercheUserRequest
    ) {
        const userSearch = await this.userRepository.searchUser(
            email,
            name,
            apartamentosId,
            call
        )
        console.log(userSearch)
        if (!userSearch) {
            throw new UserNotExist()
        }

        return userSearch

    }

}