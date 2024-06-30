export class UserNotPermission extends Error {
    constructor() {
        super('Usuário não tem permissão')
    }
}