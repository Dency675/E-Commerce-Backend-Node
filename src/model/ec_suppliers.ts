import EcSuppliers from '../../types/modelTypes/ec_suppliers.ts'
import {DataTypes, Sequelize} from "sequelize"
import sequelize from '../config/sequelize-config.ts';
import bcrypt from 'bcrypt';

EcSuppliers.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  e_mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_pic: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  registrationid: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:():string=>{
        return Math.floor(100000+Math.random()*900000).toString();
    }
  },
  registration_timestamp: {
    type: DataTypes.DATE, // or DataTypes.DATETIME
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    // 'CURRENT_TIMESTAMP' Data type is not in sequelize. 
    // So using Sequelize.literal('CURRENT_TIMESTAMP') we can use this data type in mysql 
  },
  
//   registration_timestamp: {
//     type: DataTypes.TIME,
//     allowNull: false,
//     defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
//     // 'CURRENT_TIMESTAMP' Data type is not in sequelize. 
//     // So using Sequelize.literal('CURRENT_TIMESTAMP') we can use this data type in mysql 
//   },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
  },
},{
    sequelize,
    modelName :'ec_suppliers',
    tableName:'ec_suppliers',
    hooks:{
        beforeCreate: (user:EcSuppliers)=>{
            //HAsh the password using bcrypt before creating the record
            const hasedPassword = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10))
            user.password = hasedPassword
        }
    }
});

export default EcSuppliers;