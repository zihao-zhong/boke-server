const moment = require('moment');
const bcrypt = require('bcryptjs');
const { DataTypes, Model } = require('sequelize');

const config = {
  fields: {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      field: 'id',
      comment: '用户ID',
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      field: 'username',
      comment: '用户名',
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password',
      comment: '密码',
      set(val) {
        const salt = bcrypt.genSaltSync(10);
        this.setDataValue('password', bcrypt.hashSync(val, salt));
      }
    },
    createdBy: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      field: 'created_by',
      comment: '创建人',
    },
    updatedBy: {
      type: DataTypes.STRING(255),
      field: 'updated_by',
      defaultValue: null,
      comment: '修改人',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      field: 'created_at',
      comment: '创建时间',
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      set() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      field: 'updated_at',
      comment: '创建时间',
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      set() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  },
  options: {
    tableName: 'users',
    timestamps: true,
    freezeTableName: false,
  },
};

module.exports = class User extends Model {
  static getConfig() {
    return config;
  }
}
