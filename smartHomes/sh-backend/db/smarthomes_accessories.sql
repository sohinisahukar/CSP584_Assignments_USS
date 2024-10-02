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
-- Table structure for table `accessories`
--

DROP TABLE IF EXISTS `accessories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accessories` (
  `accessory_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  PRIMARY KEY (`accessory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accessories`
--

LOCK TABLES `accessories` WRITE;
/*!40000 ALTER TABLE `accessories` DISABLE KEYS */;
INSERT INTO `accessories` VALUES (1,'Philips Hue Dimmer Switch','Wireless dimmer switch for controlling Philips Hue lights',24.99,'Lightbulbs','/images/lacc1.jpg'),(2,'Smart Bulb Socket Adapter','Socket adapter to make standard bulbs smart with voice control',14.99,'Lightbulbs','/images/lacc2.jpg'),(3,'Lutron Smart Bridge','Smart bridge to control multiple smart bulbs through an app or voice assistant',99.99,'Lightbulbs','/images/lacc3.jpg'),(4,'August Connect Wi-Fi Bridge','Bridge that allows remote access to August Smart Lock',79.99,'Doorlocks','/images/dlacc1.jpg'),(5,'Yale Smart Keypad','Smart keypad for keyless entry with Yale smart locks',59.99,'Doorlocks','/images/dlacc2.jpg'),(6,'Schlage Encode Wi-Fi Adapter','Adapter to enable remote control of Schlage Encode locks',49.99,'Doorlocks','/images/dlacc3.jpg'),(7,'Nest Temperature Sensor','Remote temperature sensor for Nest thermostats',39.99,'Thermostats','/images/thacc1.jpg'),(8,'Ecobee SmartSensor','Smart room sensor for better temperature control with Ecobee thermostats',79.99,'Thermostats','/images/thacc2.jpg'),(9,'Honeywell Home Wall Plate','Wall plate to cover large areas when installing Honeywell thermostats',19.99,'Thermostats','/images/thacc3.jpg'),(10,'Ring Chime','Plug-in chime that connects with Ring video doorbells to alert you of visitors',29.99,'Doorbells','/images/dbacc1.jpg'),(11,'Nest Hello Wall Plate','Decorative wall plate for the Nest Hello video doorbell',14.99,'Doorbells','/images/dbacc2.jpg'),(12,'Arlo Chime','Wireless chime that pairs with Arlo video doorbells to alert of visitors',39.99,'Doorbells','/images/dbacc3.jpg'),(13,'Amazon Echo Wall Mount','Wall mount bracket for Amazon Echo smart speakers',19.99,'Speakers','/images/sacc1.jpg'),(14,'Google Nest Audio Stand','Protective stand for the Google Nest Audio speaker',29.99,'Speakers','/images/sacc2.jpg'),(15,'Bose Speaker Remote','Remote control for Bose smart speakers',49.99,'Speakers','/images/sacc3.jpg');
/*!40000 ALTER TABLE `accessories` ENABLE KEYS */;
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
