

export interface MiddlewareInterface {
    authenticate(name: string): Promise<boolean>
}