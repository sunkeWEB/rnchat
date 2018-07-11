-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: chating
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `updatetime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '操作时间',
  `fromid` int(11) NOT NULL COMMENT '一个用户的id 数字小',
  `toid` int(11) NOT NULL COMMENT '一个用户的id 数字大',
  `createid` int(11) NOT NULL COMMENT '添加方的id',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '两个好友的状况 0是好友 1是非好友',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES (1,'2018-06-24 14:53:50',1,16,1,0),(2,'2018-06-24 14:46:34',16,18,18,0),(3,'2018-06-24 21:09:48',1,18,18,0);
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createtime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '操作时间',
  `fromid` int(11) NOT NULL COMMENT '一个用户的id',
  `toid` int(11) NOT NULL COMMENT '一个用户的id',
  `formtoid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '两个用户id拼接',
  `isread` int(11) NOT NULL DEFAULT '0' COMMENT '两个好友的状况 0是未阅读',
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '聊天的信息',
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '聊天的類型',
  `xq` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '聊天的類型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'2018-06-24 15:36:44',16,1,'1to16',0,'121','text','{\"type\":\"text\",\"body\":\"121\",\"toname\":\"root\",\"id\":\"1\",\"myid\":16}'),(2,'2018-06-24 15:37:32',16,1,'1to16',0,'121','text','{\"type\":\"text\",\"body\":\"121\",\"toname\":\"root\",\"id\":\"1\",\"myid\":16}'),(3,'2018-06-24 15:37:46',16,1,'1to16',0,'你好','text','{\"type\":\"text\",\"body\":\"你好\",\"toname\":\"root\",\"id\":\"1\",\"myid\":16}'),(4,'2018-06-24 15:38:28',1,16,'1to16',0,'我是孙轲','text','{\"type\":\"text\",\"body\":\"我是孙轲\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(5,'2018-06-24 15:38:55',1,16,'1to16',0,'你在干那样啊','text','{\"type\":\"text\",\"body\":\"你在干那样啊\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(6,'2018-06-24 15:39:37',1,16,'1to16',0,'11','text','{\"type\":\"text\",\"body\":\"11\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(7,'2018-06-24 15:40:06',1,16,'1to16',0,'四十','text','{\"type\":\"text\",\"body\":\"四十\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(8,'2018-06-24 15:40:16',16,1,'1to16',0,'你好啊','text','{\"type\":\"text\",\"body\":\"你好啊\",\"toname\":\"root\",\"id\":\"1\",\"myid\":16}'),(9,'2018-06-24 15:40:22',16,1,'1to16',0,'门口','text','{\"type\":\"text\",\"body\":\"门口\",\"toname\":\"root\",\"id\":\"1\",\"myid\":16}'),(10,'2018-06-24 15:40:51',1,16,'1to16',0,'我我是索隆','text','{\"type\":\"text\",\"body\":\"我我是索隆\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(11,'2018-06-24 15:42:05',1,16,'1to16',0,'我想碎觉了','text','{\"type\":\"text\",\"body\":\"我想碎觉了\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(12,'2018-06-24 15:46:04',16,1,'1to16',0,'121','text','{\"type\":\"text\",\"body\":\"121\",\"toname\":\"root\",\"id\":\"1\",\"myid\":16}'),(13,'2018-06-24 15:46:16',1,16,'1to16',0,'四十','text','{\"type\":\"text\",\"body\":\"四十\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(14,'2018-06-24 16:20:46',1,16,'1to16',0,'我紧张 我想吃饭 你要吃饭嘛','text','{\"type\":\"text\",\"body\":\"我紧张 我想吃饭 你要吃饭嘛\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(15,'2018-06-24 16:21:06',1,16,'1to16',0,'明天下午去不去','text','{\"type\":\"text\",\"body\":\"明天下午去不去\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(16,'2018-06-24 16:21:42',16,1,'1to16',0,'我不去','text','{\"type\":\"text\",\"body\":\"我不去\",\"toname\":\"root\",\"id\":\"1\",\"myid\":16}'),(17,'2018-06-24 16:21:54',1,16,'1to16',0,'哦哦','text','{\"type\":\"text\",\"body\":\"哦哦\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(18,'2018-06-24 16:22:17',1,16,'1to16',0,'你好啊','text','{\"type\":\"text\",\"body\":\"你好啊\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(19,'2018-06-24 16:23:51',16,1,'1to16',0,'121','text','{\"type\":\"text\",\"body\":\"121\",\"toname\":\"root\",\"id\":\"1\",\"myid\":16}'),(20,'2018-06-24 16:24:06',1,16,'1to16',0,'四十','text','{\"type\":\"text\",\"body\":\"四十\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(21,'2018-06-24 16:24:24',1,16,'1to16',0,'火狐','text','{\"type\":\"text\",\"body\":\"火狐\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(22,'2018-06-24 16:25:47',1,16,'1to16',0,'好吧','text','{\"type\":\"text\",\"body\":\"好吧\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(23,'2018-06-24 16:31:19',1,16,'1to16',0,'哈哈哈','text','{\"type\":\"text\",\"body\":\"哈哈哈\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(24,'2018-06-24 16:43:02',1,16,'1to16',0,'1','text','{\"type\":\"text\",\"body\":\"1\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(25,'2018-06-24 16:56:43',16,1,'1to16',0,'000','text','{\"type\":\"text\",\"body\":\"000\",\"toname\":\"root\",\"id\":\"1\",\"myid\":16}'),(26,'2018-06-24 16:57:23',1,16,'1to16',0,'我好崩溃啊','text','{\"type\":\"text\",\"body\":\"我好崩溃啊\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(27,'2018-06-24 16:57:49',1,16,'1to16',0,'你在运送','text','{\"type\":\"text\",\"body\":\"你在运送\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(28,'2018-06-24 17:15:59',1,16,'1to16',0,'火狐','text','{\"type\":\"text\",\"body\":\"火狐\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(29,'2018-06-24 17:16:42',1,16,'1to16',0,'考虑考虑','text','{\"type\":\"text\",\"body\":\"考虑考虑\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(30,'2018-06-24 17:18:58',1,16,'1to16',0,'火狐','text','{\"type\":\"text\",\"body\":\"火狐\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(31,'2018-06-24 17:19:20',1,16,'1to16',0,'你在做破','text','{\"type\":\"text\",\"body\":\"你在做破\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(32,'2018-06-24 17:21:02',1,16,'1to16',0,'锁了','text','{\"type\":\"text\",\"body\":\"锁了\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(33,'2018-06-24 19:02:34',1,16,'1to16',0,'好好','text','{\"type\":\"text\",\"body\":\"好好\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(34,'2018-06-24 19:02:54',1,16,'1to16',0,'火狐','text','{\"type\":\"text\",\"body\":\"火狐\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}'),(35,'2018-06-24 21:11:23',1,18,'1to18',0,'hello','text','{\"type\":\"text\",\"body\":\"hello\",\"toname\":\"sunke\",\"id\":\"18\",\"myid\":1}'),(36,'2018-06-24 21:12:20',1,16,'1to16',0,'eeee','text','{\"type\":\"text\",\"body\":\"eeee\",\"toname\":\"admin\",\"id\":\"16\",\"myid\":1}');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createtime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updatetime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '上一次操作时间',
  `sex` int(11) DEFAULT '3' COMMENT '性别 1男 0 女 3保密',
  `avatar` varchar(200) DEFAULT NULL COMMENT '头像',
  `pname` varchar(250) NOT NULL COMMENT '登录名',
  `pwd` varchar(255) NOT NULL COMMENT '登录密码',
  `tabs` longtext COMMENT '签名',
  `ip` varchar(200) DEFAULT NULL COMMENT '登录ip',
  PRIMARY KEY (`id`),
  UNIQUE KEY `pname` (`pname`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2018-06-23 11:06:56','2018-06-24 17:21:32',3,NULL,'root','51134e928aca119ae06db90d714b9672','志不强者智不达,言不信者行不果','192.168.1.104'),(16,'2018-06-23 18:16:39','2018-06-24 08:52:53',0,NULL,'admin','51134e928aca119ae06db90d714b9672','诚实是人生的命脉,是一切价值的根基','192.168.1.104'),(17,'2018-06-23 18:41:20','2018-06-23 18:41:20',3,NULL,'admin1','8bb7e503085ea0f5a78f85ed6c61a8fa','志不强者智不达,言不信者行不果','192.168.1.104'),(18,'2018-06-24 11:27:04','2018-06-24 11:27:04',3,NULL,'sunke','51134e928aca119ae06db90d714b9672','老老实实最能打动人心','192.168.31.24');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-12  7:39:24
