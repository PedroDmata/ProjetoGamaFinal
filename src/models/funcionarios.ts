import { DataTypes, Model } from "sequelize";
import db from "../database/db";

interface FuncionarioAttributes{
    id?: number | null
    nome: string
    email: string
    senha: string
    createdAt?: Date
    updatedAt?: Date
}

class Funcionarios extends Model<FuncionarioAttributes> implements FuncionarioAttributes{
    public id!: number | null;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Funcionarios.init({
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
   
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, 
{
    tableName: 'funcionarios',
    sequelize: db
})

export default Funcionarios