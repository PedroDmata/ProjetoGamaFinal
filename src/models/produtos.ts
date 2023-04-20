import { DataTypes, Model } from "sequelize";
import db from "../database/db"

interface ProdutosAttributes{
  id?: number | null
  nome_produto: string
  descricao: string
  preco: string
}

class Produtos extends Model<ProdutosAttributes> implements ProdutosAttributes{
  public id!: number | null;
  public nome_produto!: string;
  public descricao!: string;
  public preco!: string;
}


Produtos.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nome_produto: {
    type: DataTypes.STRING,
  },

  descricao: {
    type: DataTypes.STRING,
  },

  preco: {
    type: DataTypes.INTEGER
  },
}, 
{
  tableName: 'produtos',
  sequelize: db
})

export default Produtos