export class TokenNoExistError extends Error {
    constructor() {
        super('Token não encontrado')
    }
}