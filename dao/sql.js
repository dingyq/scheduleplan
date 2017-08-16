CREATE TABLE IF NOT EXISTS `missionnotice`( `id` BIGINT UNSIGNED AUTO_INCREMENT, `state` INT UNSIGNED NOT NULL, `deadlineTime` INT UNSIGNED, `createUserName` VARCHAR(100) NOT NULL, `completeTime` INT UNSIGNED, `type` INT UNSIGNED NOT NULL, `title` VARCHAR(300) NOT NULL, `createTime` INT UNSIGNED NOT NULL, `dutyId` INT UNSIGNED, `dutyName` VARCHAR(100), `createUserId` INT UNSIGNED NOT NULL, `needClock` INT UNSIGNED NOT NULL, `content` VARCHAR(2000) NOT NULL,
PRIMARY KEY ( `id` ))ENGINE=InnoDB DEFAULT CHARSET=utf8;



--------

+----------------+---------------------+------+-----+---------+----------------+
| Field          | Type                | Null | Key | Default | Extra          |
+----------------+---------------------+------+-----+---------+----------------+
| id             | bigint(20) unsigned | NO   | PRI | NULL    | auto_increment |
| state          | int(10) unsigned    | NO   |     | NULL    |                |
| deadlineTime   | int(10) unsigned    | YES  |     | NULL    |                |
| createUserName | varchar(100)        | NO   |     | NULL    |                |
| completeTime   | int(10) unsigned    | YES  |     | NULL    |                |
| type           | int(10) unsigned    | NO   |     | NULL    |                |
| title          | varchar(300)        | NO   |     | NULL    |                |
| createTime     | int(10) unsigned    | NO   |     | NULL    |                |
| dutyId         | int(10) unsigned    | YES  |     | NULL    |                |
| dutyName       | varchar(100)        | YES  |     | NULL    |                |
| createUserId   | int(10) unsigned    | NO   |     | NULL    |                |
| needClock      | int(10) unsigned    | NO   |     | NULL    |                |
| content        | varchar(2000)       | NO   |     | NULL    |                |
+----------------+---------------------+------+-----+---------+----------------+
--------




SHOW DATABASES                                //列出 MySQL Server 数据库。
SHOW TABLES [FROM db_name]                    //列出数据库数据表。
SHOW TABLE STATUS [FROM db_name]              //列出数据表及表状态信息。
SHOW COLUMNS FROM tbl_name [FROM db_name]     //列出资料表字段
SHOW FIELDS FROM tbl_name [FROM db_name]，DESCRIBE tbl_name [col_name]。
SHOW FULL COLUMNS FROM tbl_name [FROM db_name]//列出字段及详情  www.2cto.com  
SHOW FULL FIELDS FROM tbl_name [FROM db_name] //列出字段完整属性
SHOW INDEX FROM tbl_name [FROM db_name]       //列出表索引。
SHOW STATUS                                  //列出 DB Server 状态。
SHOW VARIABLES                               //列出 MySQL 系统环境变量。
SHOW PROCESSLIST                             //列出执行命令。
SHOW GRANTS FOR user                         //列出某用户权限