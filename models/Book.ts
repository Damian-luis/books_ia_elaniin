import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Book extends Model {
  public id!: number;
  public title!: string;
  public type!: string;
  public summary!: string;
  public content!:string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Book.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  content:{
    type:DataTypes.TEXT,
    allowNull:true
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true
  }

}, {
  sequelize,
  modelName: 'Book',
  tableName: 'books',
  timestamps: true
});

export default Book;
