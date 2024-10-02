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
-- Table structure for table `customer_addresses`
--

DROP TABLE IF EXISTS `customer_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_addresses` (
  `addressId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zipCode` varchar(255) NOT NULL,
  PRIMARY KEY (`addressId`),
  KEY `userId` (`userId`),
  CONSTRAINT `customer_addresses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `customer_addresses_ibfk_10` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`),
  CONSTRAINT `customer_addresses_ibfk_11` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`),
  CONSTRAINT `customer_addresses_ibfk_12` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`),
  CONSTRAINT `customer_addresses_ibfk_13` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `customer_addresses_ibfk_14` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `customer_addresses_ibfk_15` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `customer_addresses_ibfk_16` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `customer_addresses_ibfk_17` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `customer_addresses_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `customer_addresses_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`),
  CONSTRAINT `customer_addresses_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`),
  CONSTRAINT `customer_addresses_ibfk_5` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`),
  CONSTRAINT `customer_addresses_ibfk_6` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`),
  CONSTRAINT `customer_addresses_ibfk_7` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`),
  CONSTRAINT `customer_addresses_ibfk_8` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`),
  CONSTRAINT `customer_addresses_ibfk_9` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_addresses`
--

LOCK TABLES `customer_addresses` WRITE;
/*!40000 ALTER TABLE `customer_addresses` DISABLE KEYS */;
INSERT INTO `customer_addresses` VALUES (1,2,'','35th st madison av','illinois','chicago','60616'),(2,2,'ava','35th st madison av','illinois','chicago','60616'),(3,7,'Frank','1st','Seattle','WA','98101'),(4,7,'Frank','1st','Seattle','WA','98101'),(5,7,'Frank','1st','Seattle','WA','98101'),(6,8,'Greg','2nd','Dallas','TX','75201'),(7,9,'Hari','3rd st 1st av','Miami','FL','33139'),(8,10,'Ida','4th st 1st av','Boston','MA','02116'),(9,11,'Julie','6th st rockford av','Chicago','IL','60616'),(10,12,'Kiki','13th st ','Dallas','TX','75201'),(11,13,'Lisa','21st ST 11th av','Seattle','WA','98101'),(12,14,'Nico','12th st','Miami','FL','33139'),(13,15,'Oscar','11th st','Boston','MA','02116'),(14,16,'Paige','21st ST','Dallas','TX','75201'),(15,17,'Tia','22nd ST','Seattle','WA','98101'),(16,18,'Uzbek','23rd ST','Miami','FL','33139'),(17,19,'Vicky','12th ST','Denver','CO','80202'),(18,20,'Walt','5th st elm av','Atlanta','GA','30308'),(19,21,'Zane','35th st','Dallas','TX','75201'),(20,9,'Hari','35th ST','Chicago','IL','60616'),(21,13,'Lisa','33rd ST','Chicago','IL','60616');
/*!40000 ALTER TABLE `customer_addresses` ENABLE KEYS */;
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
