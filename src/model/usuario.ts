export class Usuario {

    private cd_usuario: number;
    private email: string;
    private ds_Nome: string;
    private ds_sobrenome: string;

    public setCdUsuario(cd_usuario: number) {
        this.cd_usuario = cd_usuario;
    }

    public getCdUsuario() {
        return this.cd_usuario;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public getEmail() {
        return this.email;
    }

    public setDsNome(ds_Nome: string) {
        this.ds_Nome = ds_Nome;
    }

    public getDsNome() {
        return this.ds_Nome;
    }

    public setDsSobreNome(ds_sobrenome: string) {
        this.ds_sobrenome = ds_sobrenome;
    }

    public getDsSobreNome() {
        return this.ds_sobrenome;
    }
}