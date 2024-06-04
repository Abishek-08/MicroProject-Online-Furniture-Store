-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: furniture
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_amount` varchar(255) DEFAULT NULL,
  `order_date_of_delivery` varchar(255) DEFAULT NULL,
  `order_date_of_order` varchar(255) DEFAULT NULL,
  `order_quantity` int NOT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `customer_cus_id` int DEFAULT NULL,
  `furniture_fur_id` int DEFAULT NULL,
  `shipping_ship_id` int DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK9v60e5356qpoa65y48qyujb57` (`customer_cus_id`),
  KEY `FKqoxwxv4vwasfavehoi768nikq` (`furniture_fur_id`),
  KEY `FK77ba758y7499hburpff9tfrd3` (`shipping_ship_id`),
  CONSTRAINT `FK77ba758y7499hburpff9tfrd3` FOREIGN KEY (`shipping_ship_id`) REFERENCES `shipping` (`ship_id`),
  CONSTRAINT `FK9v60e5356qpoa65y48qyujb57` FOREIGN KEY (`customer_cus_id`) REFERENCES `customer` (`cus_id`),
  CONSTRAINT `FKqoxwxv4vwasfavehoi768nikq` FOREIGN KEY (`furniture_fur_id`) REFERENCES `furniture` (`fur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (13,'253578','2024-06-20','Sat Jun 01 2024 01:01:00 GMT+0530 (India Standard Time)',2,'orderConformed',2,2,9),(14,'126789','Delivery in Two Days','Sat Jun 01 2024 01:01:20 GMT+0530 (India Standard Time)',1,'Order Conform',2,2,9),(28,'25796','Delivery Date upating','Sat Jun 01 2024 21:48:57 GMT+0530 (India Standard Time)',2,'Order Conform',5,1,17),(38,'137579','Delivery Date upating','Mon Jun 03 2024 18:05:56 GMT+0530 (India Standard Time)',2,'Order Conform',1,3,2),(39,'137579','Delivery Date upating','Mon Jun 03 2024 18:05:56 GMT+0530 (India Standard Time)',1,'Order Conform',1,2,2),(40,'137579','Delivery Date upating','Mon Jun 03 2024 18:05:56 GMT+0530 (India Standard Time)',1,'Order Conform',1,4,2),(41,'150477','Delivery Date upating','Mon Jun 03 2024 18:28:36 GMT+0530 (India Standard Time)',2,'Order Conform',1,3,2),(42,'150477','Delivery Date upating','Mon Jun 03 2024 18:28:36 GMT+0530 (India Standard Time)',1,'Order Conform',1,2,2),(43,'150477','Delivery Date upating','Mon Jun 03 2024 18:28:36 GMT+0530 (India Standard Time)',1,'Order Conform',1,4,2),(44,'150477','Delivery Date upating','Mon Jun 03 2024 18:28:36 GMT+0530 (India Standard Time)',1,'Order Conform',1,1,2);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-03 19:15:10
