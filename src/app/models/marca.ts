export class Marca {

    id!: number;
    nome: string | null = null;

    constructor(id: number, nome:string | null){
        this.id = id;
        this.nome = nome;
    }
}
