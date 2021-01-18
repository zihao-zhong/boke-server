const moment = require('moment');
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
      comment: '分类ID',
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      field: 'name',
      comment: '分类名',
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
    tableName: 'category',
    timestamps: true,
    freezeTableName: false,
  },
};

module.exports = class Category extends Model {
  static getConfig() {
    return config;
  }
}
