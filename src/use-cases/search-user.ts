import { UserNotExist } from "@/erros/cheking-cases/cheking-user-exist"
import { UserRepository } from "@/repositories/users-repository"

interface sercheUserRequest{
    email: string
    name: string
    call: string
    apartamentosId: string
}


export class SearchUser{
    constructor(private userRepository: UserRepository){}

    async execute({
        email,
        call,
        name,
        apartamentosId}: sercheUserRequest
    ){
        const userExist = await this.userRepository.searchUser(
            email,
            call,
            apartamentosId,
            name
        )
        if (!userExist) {
            throw new UserNotExist()
        }



    }

}