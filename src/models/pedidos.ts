import { DataTypes, IntegerDataType, Model, ModelDefined, Optional } from "sequelize"
import db from "../database/db"
interface PedidosAttributes{
  id?:number | null
  descricao: string
  nome_user: string
  valor_total:number
  created_at: Date
  updated_at: Date
}

class Pedidos extends Model<PedidosAttributes> implements PedidosAttributes{
  public id!: number | null;
  public descricao!: string;
  public nome_user!: string;
  public valor_total!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Pedidos.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome_user: {
    type: DataTypes.STRING,
  },
 valor_total:{
    type:DataTypes.DECIMAL
 },
  descricao: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
}, 
{
  tableName: 'pedidos',
  sequelize: db
}
);

export default Pedidos