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
      comment: '文章ID',
    },
    category: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      field: 'category',
      comment: '所属分类',
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'title',
      comment: '文章标题',
    },
    description: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      field: 'description',
      comment: '文章描述',
    },
    image: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      field: 'image',
      comment: '文章配图',
    },
    body: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      field: 'body',
      comment: '文章内容',
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
    tableName: 'articles',
    timestamps: true,
    freezeTableName: false,
  },
};

module.exports = class Articles extends Model {
  static getConfig() {
    return config;
  }
};
