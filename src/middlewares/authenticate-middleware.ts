import { prisma } from "@/lib/prisma";

export async function middlewareAuthenticate(name: string) {
    const permisionUser = await prisma.user.findMany(
        {
            where: {
                name
            }
        })
    if (!permisionUser) {
        throw new Error("este usuário não está cadastrado ")
    }

    return permisionUser

}
