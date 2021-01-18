create table users (
  id int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自增',
  username varchar(255) NULL COMMENT '用户名',
  password varchar(255) null COMMENT '密码',
  created_by varchar(255) DEFAULT NULL COMMENT '创建人',
  updated_by varchar(255) DEFAULT NULL COMMENT '最后更新人',
  created_at datetime NULL COMMENT '创建时间',
  updated_at datetime NULL COMMENT '修改时间',
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 comment '用户表';


