

import { sign } from "jsonwebtoken";

export class TokenService {
    private secretKey: string;

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    generateToken(payload: object, expiresIn?: string | number): string {
        return sign(payload, this.secretKey, {
            algorithm: "HS256",
            // expiresIn: expiresIn || undefined, // Alterar depois para 24h, deixar sem data para testes
        });
    }
}
