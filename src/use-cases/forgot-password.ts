import { UserNotExist } from "@/erros/cheking-cases/cheking-user-exist";
import { UserNotPermission } from "@/erros/cheking-cases/user-not-concierge";
import { UserRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { randomBytes } from "crypto";
import { createTransport } from "nodemailer"

interface forgotPassword {
    email: string
}


export class ResetPassword {
    constructor(private userRepository: UserRepository) { }
    async execute({ email }: forgotPassword) {

        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new UserNotExist()
        }
        if (!user.concierge) {
            throw new UserNotPermission()
        }

        const transporter = await createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "ff18bd9b536520",
                pass: "********80b4"
            }
        })

        const newPassword = randomBytes(4).toString('hex')

        transporter.sendMail({
            from: 'Adiminstrador <i.e 532c98e41e-73af0a+1@inbox.mailtrap.io>',
            to: email,
            subject: 'Recuperação de senha! ',
            html: `<p>Olá sua nova senha para acessar o GetterHouse é: ${newPassword}</p><br/><a href="http:/localhost:3333/signin">Sistema<a/>`
        })

        const passwordHashed = await hash(newPassword, 2);

        await this.userRepository.updatePassword(email, passwordHashed)

    }
}