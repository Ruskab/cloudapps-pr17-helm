import sequelize from '../mysql.js';
import sequelizePkg from 'sequelize';
import DebugLib from "debug";

const debug = new DebugLib('server:mysql');

const { DataTypes, Model } = sequelizePkg;

export class EoloPlant extends Model { }

EoloPlant.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  planning: DataTypes.STRING,
  progress: DataTypes.INTEGER,
  completed: DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'EoloPlant',
  tableName: 'EoloPlants'
});

await sequelize.sync();