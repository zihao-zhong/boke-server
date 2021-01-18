create table category (
  id int(11) not null auto_increment comment '自增主键',
  name varchar(255) not null comment '分类名称',
  created_by varchar(255) null comment '创建人',
  updated_by varchar(255) null comment '修改人',
  created_at datetime null comment '创建时间',
  updated_at datetime null comment '修改时间',
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 comment '分类表';