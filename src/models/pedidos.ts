import { DataTypes, IntegerDataType, Model, ModelDefined, Optional } from "sequelize"
import db from "../database/db"
interface PedidosAttributes{
  id?:number | null
  valor_total:number
  produto_id:number
  quantidade:number
  cliente_id:number
  createdAt: Date
  updatedAt: Date
}

class Pedidos extends Model<PedidosAttributes> implements PedidosAttributes{
  public id!: number | null;
  public valor_total!: number;
  public quantidade!: number;
  public produto_id!: number;
  public cliente_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Pedidos.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

 valor_total:{
    type:DataTypes.INTEGER
 },
 quantidade:{
  type:DataTypes.INTEGER

 },
 cliente_id:{
  type:DataTypes.INTEGER
 },
 produto_id:{
  type: DataTypes.INTEGER

 },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, 
{
  tableName: 'pedidos',
  sequelize: db
}
);

export default Pedidos