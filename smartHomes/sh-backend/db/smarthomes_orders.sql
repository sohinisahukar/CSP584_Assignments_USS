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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderId` varchar(36) NOT NULL,
  `userId` int NOT NULL,
  `creditCard` varchar(16) NOT NULL,
  `purchaseDate` datetime NOT NULL,
  `shipDate` datetime NOT NULL,
  `totalSales` decimal(10,2) NOT NULL,
  `storeId` int DEFAULT NULL,
  `shippingCost` decimal(10,2) NOT NULL DEFAULT '0.99',
  `addressId` int NOT NULL,
  PRIMARY KEY (`orderId`),
  KEY `userId` (`userId`),
  KEY `storeId` (`storeId`),
  KEY `addressId` (`addressId`),
  CONSTRAINT `fk_address` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_10` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_11` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_12` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_13` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_14` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_15` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_16` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_17` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_18` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_19` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`),
  CONSTRAINT `orders_ibfk_20` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_21` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_22` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_23` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_24` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_25` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_26` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_27` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_28` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_29` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_30` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_31` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_32` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_33` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_34` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_35` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_36` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_37` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_38` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_39` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_40` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`),
  CONSTRAINT `orders_ibfk_41` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_42` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_43` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`),
  CONSTRAINT `orders_ibfk_44` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_45` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_46` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`),
  CONSTRAINT `orders_ibfk_47` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_48` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_49` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`),
  CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_50` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_51` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_52` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`),
  CONSTRAINT `orders_ibfk_53` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`),
  CONSTRAINT `orders_ibfk_54` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_55` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`),
  CONSTRAINT `orders_ibfk_56` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`),
  CONSTRAINT `orders_ibfk_57` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_58` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`),
  CONSTRAINT `orders_ibfk_59` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`),
  CONSTRAINT `orders_ibfk_6` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_60` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_61` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`),
  CONSTRAINT `orders_ibfk_62` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`),
  CONSTRAINT `orders_ibfk_63` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_64` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`),
  CONSTRAINT `orders_ibfk_65` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`),
  CONSTRAINT `orders_ibfk_66` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_67` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`),
  CONSTRAINT `orders_ibfk_68` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_69` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_7` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_70` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_71` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_72` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_73` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_74` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_75` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_76` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_77` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_78` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_79` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_8` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `orders_ibfk_80` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_81` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_82` FOREIGN KEY (`addressId`) REFERENCES `customer_addresses` (`addressId`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_9` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('02b7d9ef-3140-4dd6-91a3-7f00415818ee',9,'4111111111111111','2024-09-29 00:47:43','2024-10-13 00:47:43',13.38,NULL,0.00,20),('05da2e01-ff26-46a5-bf94-bfe9404ae178',13,'4111111111111111','2024-09-29 00:49:02','2024-10-13 00:49:02',240.98,1,0.99,21),('07492c64-c005-44ed-af0f-3fc41922b7cd',2,'4111111111111111','2024-09-27 23:56:03','2024-10-11 23:56:03',41.96,NULL,1.98,2),('096d7e84-3529-4ca3-b6cf-083cc77f865f',16,'4111111111111111','2024-09-29 00:35:30','2024-10-13 00:35:30',678.94,4,2.97,14),('1354fa54-783e-4e3d-9cbc-71c57dc28a11',11,'4111111111111111','2024-09-29 00:15:19','2024-10-13 00:15:19',213.94,1,2.97,9),('1bec5514-408e-467e-9340-975693108058',8,'4111111111111111','2024-09-28 23:57:04','2024-10-12 23:57:04',282.94,4,2.97,6),('223e89cb-30d7-4b0f-87e7-fe1c0f932cad',2,'4111111111111111','2024-09-28 01:08:30','2024-10-12 01:08:30',15.25,NULL,0.00,2),('28888a61-6643-450a-9555-673f8a9b613a',2,'4111111111111111','2024-09-28 00:28:07','2024-10-12 00:28:07',230.98,NULL,0.99,2),('470d861c-e019-4b2f-aff8-7d6233e718f3',7,'4111111111111111','2024-09-29 00:46:34','2024-10-13 00:46:34',463.96,5,1.98,3),('552da35e-d48c-4381-b456-029c2ddbbd9e',12,'4111111111111111','2024-09-29 00:19:42','2024-10-13 00:19:42',421.67,NULL,0.00,10),('57d1b664-81c7-4ff5-a122-84c7689ed929',15,'4111111111111111','2024-09-29 00:24:12','2024-10-13 00:24:12',400.94,7,2.97,13),('69d136d8-f394-4701-9372-d9ce746bb9c2',13,'4111111111111111','2024-09-29 00:21:15','2024-10-13 00:21:15',20.96,5,1.98,11),('74d85d0b-855b-49c8-921a-b0a6b7d5d719',2,'4111111111111111','2024-09-27 22:58:00','2024-10-11 22:58:00',230.98,2,0.99,2),('8617ee37-40b6-4a38-979e-c35d8b8bf221',17,'4111111111111111','2024-09-29 00:37:14','2024-10-13 00:37:14',410.36,NULL,0.00,15),('8dc28b33-cf8c-44ab-b7dd-42dfa495d4c2',7,'4111111111111111','2024-09-28 23:46:12','2024-10-12 23:46:12',219.98,NULL,0.00,5),('8fb36e6a-469d-4fa0-9437-7e2db5c34611',18,'4111111111111111','2024-09-29 00:38:47','2024-10-13 00:38:47',496.94,6,2.97,16),('a5088733-ec2b-49eb-9543-723aa2e0c26a',14,'4111111111111111','2024-09-29 00:22:52','2024-10-13 00:22:52',334.67,NULL,0.00,12),('b9fee937-de95-43e0-90d6-5fe26bf938c9',2,'4111111111111111','2024-09-28 01:01:06','2024-10-12 01:01:06',230.98,NULL,0.99,2),('c6b800ad-e605-4253-9fd3-829988020cde',10,'4111111111111111','2024-09-29 00:02:54','2024-10-13 00:02:54',532.94,7,2.97,8),('c835d2e7-790a-43ae-a330-84f24a08f728',9,'4111111111111111','2024-09-28 23:59:23','2024-10-12 23:59:23',429.98,NULL,0.00,7),('cfa2d0e3-120f-472a-87e5-68c2e0352b45',2,'4111111111111111','2024-09-28 01:05:03','2024-10-12 01:05:03',20.98,NULL,0.99,2),('d7ef938e-03c4-46c0-bcb0-19f33057f93f',21,'4111111111111111','2024-09-29 00:45:08','2024-10-13 00:45:08',26.34,4,2.97,19),('e58d0142-ec24-41bb-9ad4-2a028a461945',20,'4111111111111111','2024-09-29 00:43:24','2024-10-13 00:43:24',455.96,10,1.98,18),('eb1bc145-247a-4436-94b0-3d9435c1d612',2,'4111111111111111','2024-09-28 00:54:43','2024-10-12 00:54:43',160.98,NULL,0.99,2),('f471a2ca-0514-42c0-9059-fd4757fcf357',2,'4111111111111111','2024-09-28 00:25:06','2024-10-12 00:25:06',23.98,NULL,0.99,2),('fd629762-c072-4a37-b124-8e5554cf7908',2,'4111111111111111','2024-09-28 01:09:44','2024-10-12 01:09:44',401.96,7,1.98,2),('ff260e7f-8cbf-4de9-8faf-92e00d7dadf4',19,'4111111111111111','2024-09-29 00:41:51','2024-10-13 00:41:51',223.98,NULL,0.00,17);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-29 15:05:46
