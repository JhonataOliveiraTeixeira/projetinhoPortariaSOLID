import { UserNotExist } from "@/erros/cheking-cases/cheking-user-exist"
import { UserNotPermission } from "@/erros/cheking-cases/user-not-concierge"
import { TokenService } from "@/repositories/middleware- repository"
import { UserRepository } from "@/repositories/users-repository"
import { compare } from "bcryptjs"


interface AuthenticateUserRequest {
    email: string
    password?: string
}


interface AuthenticateUserResponse {
    token: string
}

export class AuthenticateUSer {
    constructor(
        private userRepository: UserRepository,
        private tokenService: TokenService
    ) { }
    async execute({ email, password }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
        const user = await this.userRepository.authenticate(email)
        if (!user) {
            throw new UserNotExist()
        }
        if (!user.concierge) {
            throw new UserNotPermission()
        }

        if (!password) {
            throw new UserNotPermission()
        }
        if (!user.hash_passaword) {
            throw new UserNotPermission()
        }

        const userComparePassword = await compare(password, user.hash_passaword)
        if (!userComparePassword) {
            throw new UserNotPermission()
        }

        const token = this.tokenService.generateToken({
            userId: user.id,
            roles: user.concierge.valueOf()
        })

        return { token }

    }
}