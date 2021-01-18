create table articles (
  id int(11) not null auto_increment comment '自增主键',
  category int(11) not null comment '文章所属分类',
  title varchar(255) null comment '文章标题',
  description varchar(255) null comment '文章描述',
  image varchar(255) null comment '文章配图',
  body varchar(255) null comment '文章内容',
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 comment '文章表';