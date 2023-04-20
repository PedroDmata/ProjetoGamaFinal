import { DataTypes, Model } from "sequelize";
import db from "../database/db";

interface ClientesAttributes{
    id?: number | null
    nome: string
    email: string
    senha: string
    endereco: string
    telefone : number
}

class Clientes extends Model<ClientesAttributes> implements ClientesAttributes{
    public id!: number | null;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public endereco!: string;
    public telefone!: number;
}

Clientes.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nome:{
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING,
        unique: true
    },

    senha: {
        type: DataTypes.STRING
    },
    endereco :{
        type: DataTypes.STRING
    },
    telefone:{
        type: DataTypes.NUMBER
    }   
}, 
{
    tableName: 'clientes',
    sequelize: db
})

export default Clientes