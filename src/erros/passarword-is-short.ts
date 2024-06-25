export class PasswordShort extends Error {
    constructor() {
        super('Senha pequena demais(Mínimo 6)')
    }
}