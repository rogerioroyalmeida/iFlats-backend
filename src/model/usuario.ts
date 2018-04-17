export class Usuario {

    private codigo: number;
    private email: string;
    private senha: string;

    public setCodigo(codigo: number) {
        this.codigo = codigo;
    }

    public getCodigo() {
        return this.codigo;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public getEmail() {
        return this.email;
    }

    public setSenha(senha: string) {
        this.senha = senha;
    }

    public getSenha() {
        return this.senha;
    }
}