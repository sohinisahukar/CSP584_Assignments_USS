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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `retailer_discount` decimal(10,2) DEFAULT '0.00',
  `manufacturer_rebate` decimal(10,2) DEFAULT '0.00',
  `image_path` varchar(255) NOT NULL,
  `manufacturer_name` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Philips Hue','Smart LED light with adjustable brightness and color',16.69,'Lightbulbs',5.00,5.00,'/images/light1.jpg','Philips'),(2,'GE Lighting','Smart Wi-Fi LED light bulb with color control',19.99,'Lightbulbs',7.00,3.00,'/images/light2.jpg','GE'),(7,'Wyze Bulb','Smart LED bulb with adjustable white light and app control',14.99,'Lightbulbs',0.00,6.00,'/images/light3.jpg','Wyze'),(8,'Sengled Smart Bulb','Wi-Fi enabled LED bulb with voice assistant compatibility',22.99,'Lightbulbs',2.00,0.00,'/images/light4.jpg','Sengled'),(9,'TP-Link Kasa Smart Bulb','Dimmable multicolor smart bulb with Wi-Fi control',25.99,'Lightbulbs',0.00,4.00,'/images/light5.jpg','TP-Link'),(10,'Nanoleaf Essentials','Energy-efficient smart bulb with rich colors and smart assistant support',18.99,'Lightbulbs',5.00,0.00,'/images/light6.jpg','Nanoleaf'),(11,'August Smart Lock','Keyless entry smart lock with Wi-Fi and voice assistant control',249.99,'Doorlocks',8.00,2.00,'/images/lock2.jpg','August'),(12,'Schlage Encode','Smart Wi-Fi deadbolt with built-in alarm technology',199.99,'Doorlocks',10.00,15.00,'/images/lock3.jpg','Schlage'),(13,'Yale Assure Lock','Smart touchscreen deadbolt with Z-Wave and app control',179.99,'Doorlocks',11.00,0.00,'/images/lock4.jpg','Yale'),(14,'Ultraloq U-Bolt Pro','Keyless entry smart lock with fingerprint and Bluetooth control',159.99,'Doorlocks',0.00,9.00,'/images/lock5.jpg','Ultra'),(15,'Eufy Security Smart Lock','Bluetooth-enabled smart lock with biometric fingerprint sensor',169.99,'Doorlocks',15.00,0.00,'/images/lock6.jpg','Eufy'),(16,'Kwikset Halo','Smart Wi-Fi enabled deadbolt with app and voice assistant control',189.99,'Doorlocks',0.00,20.00,'/images/lock7.jpg','Kwikset'),(17,'Nest Learning Thermostat','Smart thermostat with energy-saving features and auto-scheduling',249.99,'Thermostats',11.00,5.00,'/images/th2.jpg','Nest'),(18,'Ecobee SmartThermostat','Thermostat with built-in Alexa and room sensor for enhanced comfort',229.99,'Thermostats',8.00,0.00,'/images/th3.jpg','Ecobee'),(19,'Honeywell Home T9','Smart thermostat with Wi-Fi and smart room sensors for precise control',199.99,'Thermostats',0.00,9.00,'/images/th4.jpg','Honeywell'),(20,'Sensi Touch Smart Thermostat','Touchscreen smart thermostat with easy setup and smart home compatibility',169.99,'Thermostats',10.00,5.00,'/images/th5.png','Sensi'),(21,'Lux Kono Smart Thermostat','Stylish smart thermostat with interchangeable faceplates and app control',139.99,'Thermostats',10.00,0.00,'/images/th6.jpg','Lux'),(22,'Mysa Smart Thermostat','Wi-Fi enabled thermostat for electric baseboard heating, with energy-saving modes',149.99,'Thermostats',6.00,0.00,'/images/th7.jpg','Mysa'),(23,'Ring Video Doorbell Pro 2','Smart video doorbell with 1536p HD video, 3D motion detection, and Alexa compatibility',249.99,'Doorbells',12.00,3.00,'/images/bell2.jpg','Ring'),(24,'Nest Hello Video Doorbell','HD video doorbell with 24/7 streaming and intelligent alerts',229.99,'Doorbells',8.00,8.00,'/images/bell3.jpg','Nest'),(25,'Arlo Essential Video Doorbell','Wireless video doorbell with HD video, motion detection, and direct-to-mobile calls',179.99,'Doorbells',5.00,0.00,'/images/bell4.jpg','Arlo'),(26,'Eufy Security Video Doorbell','Battery-powered video doorbell with 2K HD video and human detection technology',169.99,'Doorbells',0.00,6.00,'/images/bell5.jpg','Eufy'),(27,'Amcrest Video Doorbell Pro','Smart doorbell with 1080p video, night vision, and two-way audio',149.99,'Doorbells',5.00,5.00,'/images/bell6.png','Amcrest'),(28,'SimpliSafe Doorbell','1080p HD video doorbell with motion alerts and night vision',139.99,'Doorbells',14.00,0.00,'/images/bell7.jpg','SimpliSafe'),(29,'Amazon Echo (4th Gen)','Smart speaker with premium sound, Alexa voice assistant, and smart home hub',99.99,'Speakers',0.00,12.00,'/images/sp2.jpg','Amazon'),(30,'Google Nest Audio','Smart speaker with Google Assistant, rich sound, and seamless smart home integration',89.99,'Speakers',4.00,6.00,'/images/sp3.jpg','Google'),(31,'Apple HomePod Mini','Compact smart speaker with Siri, room-filling sound, and smart home controls',99.99,'Speakers',10.00,0.00,'/images/sp4.jpg','Apple'),(32,'Sonos One (Gen 2)','Smart speaker with built-in Alexa and Google Assistant, excellent sound quality',199.99,'Speakers',0.00,10.00,'/images/sp5.jpg','Sonos'),(33,'Bose Home Speaker 500','Premium smart speaker with voice control, Alexa and Google Assistant built-in, and stereo sound',299.99,'Speakers',15.00,5.00,'/images/sp6.jpg','Bose'),(34,'Harman Kardon Citation One','Elegant smart speaker with Google Assistant and rich sound',149.99,'Speakers',5.00,5.00,'/images/sp7.jpg','Harman'),(35,'digilock pro','finger print or keypad access feature',15.25,'Doorlocks',2.00,0.00,'/images/extraLock.jpg','Ultra');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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
