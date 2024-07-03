import { UserRepository } from "@/repositories/users-repository"

export class ViewAllUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(
    ) {
        const userSearch = await this.userRepository.viewAll(
        )

        return userSearch

    }

}