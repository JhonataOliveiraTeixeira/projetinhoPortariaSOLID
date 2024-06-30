export class UserNotExist extends Error {
    constructor() {
        super('Usuário não existe')
    }
}