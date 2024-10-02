-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: smarthomes
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `orderItemId` int NOT NULL AUTO_INCREMENT,
  `orderId` varchar(36) DEFAULT NULL,
  `productId` int NOT NULL,
  `category` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`orderItemId`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  CONSTRAINT `order_items_ibfk_10` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_11` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_12` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_13` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_14` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_15` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_16` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_17` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_18` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_19` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`),
  CONSTRAINT `order_items_ibfk_20` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_21` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_22` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_23` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_24` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_25` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_26` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_27` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_28` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_29` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_3` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_30` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_31` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_32` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_33` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_34` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_35` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_36` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_37` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  CONSTRAINT `order_items_ibfk_38` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`),
  CONSTRAINT `order_items_ibfk_39` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  CONSTRAINT `order_items_ibfk_4` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_40` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`),
  CONSTRAINT `order_items_ibfk_41` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  CONSTRAINT `order_items_ibfk_42` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`),
  CONSTRAINT `order_items_ibfk_43` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  CONSTRAINT `order_items_ibfk_44` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`),
  CONSTRAINT `order_items_ibfk_45` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_46` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`),
  CONSTRAINT `order_items_ibfk_47` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  CONSTRAINT `order_items_ibfk_48` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`),
  CONSTRAINT `order_items_ibfk_49` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  CONSTRAINT `order_items_ibfk_5` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_50` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`),
  CONSTRAINT `order_items_ibfk_51` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  CONSTRAINT `order_items_ibfk_52` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`),
  CONSTRAINT `order_items_ibfk_53` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  CONSTRAINT `order_items_ibfk_54` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`),
  CONSTRAINT `order_items_ibfk_55` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  CONSTRAINT `order_items_ibfk_56` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`),
  CONSTRAINT `order_items_ibfk_57` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_58` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_59` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_6` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_60` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_61` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_62` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_63` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_64` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_65` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_66` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_7` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_8` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_9` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (19,'74d85d0b-855b-49c8-921a-b0a6b7d5d719',24,'Doorbells',1,229.99,0.00),(22,'07492c64-c005-44ed-af0f-3fc41922b7cd',2,'Lightbulbs',2,19.99,0.00),(23,'f471a2ca-0514-42c0-9059-fd4757fcf357',8,'Lightbulbs',1,22.99,0.00),(24,'28888a61-6643-450a-9555-673f8a9b613a',18,'Thermostats',1,229.99,0.00),(25,'eb1bc145-247a-4436-94b0-3d9435c1d612',14,'Doorlocks',1,159.99,0.00),(26,'b9fee937-de95-43e0-90d6-5fe26bf938c9',24,'Doorbells',1,229.99,0.00),(27,'cfa2d0e3-120f-472a-87e5-68c2e0352b45',2,'Lightbulbs',1,19.99,0.00),(28,'223e89cb-30d7-4b0f-87e7-fe1c0f932cad',35,'Doorlocks',1,15.25,0.00),(29,'fd629762-c072-4a37-b124-8e5554cf7908',19,'Thermostats',2,199.99,0.00),(30,'8dc28b33-cf8c-44ab-b7dd-42dfa495d4c2',2,'Lightbulbs',1,19.99,0.00),(31,'8dc28b33-cf8c-44ab-b7dd-42dfa495d4c2',12,'Doorlocks',1,199.99,0.00),(32,'1bec5514-408e-467e-9340-975693108058',7,'Lightbulbs',2,14.99,0.00),(33,'1bec5514-408e-467e-9340-975693108058',11,'Doorlocks',1,249.99,0.00),(34,'c835d2e7-790a-43ae-a330-84f24a08f728',12,'Doorlocks',1,199.99,0.00),(35,'c835d2e7-790a-43ae-a330-84f24a08f728',18,'Thermostats',1,229.99,0.00),(36,'c6b800ad-e605-4253-9fd3-829988020cde',12,'Doorlocks',1,199.99,0.00),(37,'c6b800ad-e605-4253-9fd3-829988020cde',24,'Doorbells',1,229.99,0.00),(38,'c6b800ad-e605-4253-9fd3-829988020cde',29,'Speakers',1,99.99,0.00),(39,'1354fa54-783e-4e3d-9cbc-71c57dc28a11',2,'Lightbulbs',2,19.99,7.00),(40,'1354fa54-783e-4e3d-9cbc-71c57dc28a11',19,'Thermostats',1,199.99,0.00),(41,'552da35e-d48c-4381-b456-029c2ddbbd9e',1,'Lightbulbs',1,16.69,5.00),(42,'552da35e-d48c-4381-b456-029c2ddbbd9e',12,'Doorlocks',1,199.99,10.00),(43,'552da35e-d48c-4381-b456-029c2ddbbd9e',11,'Doorlocks',1,249.99,8.00),(44,'69d136d8-f394-4701-9372-d9ce746bb9c2',7,'Lightbulbs',1,14.99,0.00),(45,'69d136d8-f394-4701-9372-d9ce746bb9c2',2,'Lightbulbs',1,19.99,7.00),(46,'a5088733-ec2b-49eb-9543-723aa2e0c26a',1,'Lightbulbs',1,16.69,5.00),(47,'a5088733-ec2b-49eb-9543-723aa2e0c26a',11,'Doorlocks',1,249.99,8.00),(48,'a5088733-ec2b-49eb-9543-723aa2e0c26a',29,'Speakers',1,99.99,0.00),(49,'57d1b664-81c7-4ff5-a122-84c7689ed929',7,'Lightbulbs',1,14.99,0.00),(50,'57d1b664-81c7-4ff5-a122-84c7689ed929',12,'Doorlocks',1,199.99,10.00),(51,'57d1b664-81c7-4ff5-a122-84c7689ed929',24,'Doorbells',1,229.99,8.00),(52,'096d7e84-3529-4ca3-b6cf-083cc77f865f',11,'Doorlocks',1,249.99,8.00),(53,'096d7e84-3529-4ca3-b6cf-083cc77f865f',18,'Thermostats',1,229.99,8.00),(54,'096d7e84-3529-4ca3-b6cf-083cc77f865f',24,'Doorbells',1,229.99,8.00),(55,'8617ee37-40b6-4a38-979e-c35d8b8bf221',1,'Lightbulbs',2,16.69,5.00),(56,'8617ee37-40b6-4a38-979e-c35d8b8bf221',12,'Doorlocks',1,199.99,10.00),(57,'8617ee37-40b6-4a38-979e-c35d8b8bf221',18,'Thermostats',1,229.99,8.00),(58,'8fb36e6a-469d-4fa0-9437-7e2db5c34611',10,'Lightbulbs',1,18.99,5.00),(59,'8fb36e6a-469d-4fa0-9437-7e2db5c34611',11,'Doorlocks',2,249.99,8.00),(60,'ff260e7f-8cbf-4de9-8faf-92e00d7dadf4',2,'Lightbulbs',1,19.99,7.00),(61,'ff260e7f-8cbf-4de9-8faf-92e00d7dadf4',24,'Doorbells',1,229.99,8.00),(62,'e58d0142-ec24-41bb-9ad4-2a028a461945',11,'Doorlocks',1,249.99,8.00),(63,'e58d0142-ec24-41bb-9ad4-2a028a461945',24,'Doorbells',1,229.99,8.00),(64,'d7ef938e-03c4-46c0-bcb0-19f33057f93f',1,'Lightbulbs',2,16.69,5.00),(65,'d7ef938e-03c4-46c0-bcb0-19f33057f93f',2,'Lightbulbs',1,19.99,7.00),(66,'470d861c-e019-4b2f-aff8-7d6233e718f3',11,'Doorlocks',1,249.99,8.00),(67,'470d861c-e019-4b2f-aff8-7d6233e718f3',18,'Thermostats',1,229.99,8.00),(68,'02b7d9ef-3140-4dd6-91a3-7f00415818ee',1,'Lightbulbs',2,16.69,5.00),(69,'05da2e01-ff26-46a5-bf94-bfe9404ae178',11,'Doorlocks',1,249.99,8.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-29 15:05:45
