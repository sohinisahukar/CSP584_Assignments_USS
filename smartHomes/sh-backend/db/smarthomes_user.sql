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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Customer','StoreManager','Salesman') DEFAULT 'Customer',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'testuser','testuser@example.com','$2a$10$xKi/.K/fz.2dK3K5FlrUhO.Z2SwyRGWd0q85Cl6LBZ2ULqrrKO4/u','Customer'),(2,'ava','ava.th@gmail.com','$2a$10$2..jl55ovQ/ZiuYuM0nyi.71xeJDma3wfKUDXyo4R0eos4VFbU.oy','Customer'),(3,'bob','bob@rediffmail.com','$2a$10$jIOwUwK.7MqxO6UOccgrR.hDtTezGhQc/mP2yoHTm.gd3ZzyiTPvy','Customer'),(4,'charlie','char13@gmail.com','$2a$10$0ydCV5U2eOKNvjFMBweRq.pQgVWy2wSrwbuoHvTzqP2tJMwCsSJm.','Customer'),(5,'dove','dove24@hotmail.com','$2a$10$0JHP8j29FcRTmzVcaaSy7uJnqTTFF2Ss4si.3xE.Ab.I4KlZi4kZi','Customer'),(6,'Emily','em@sun.gmail.com','$2a$10$F8smN0NGcXrxqaz8CL6Oquv.khrhvR6r8RqenXEbyiFxcC95sML12','StoreManager'),(7,'Frank','frank@gmail.com','$2a$10$NFNxalRgMI4AOPxAkiTRMeVPc0UTuNlo1B1IlHInlF2MvA8Up10Qu','Customer'),(8,'Greg','greg@gmail.com','$2a$10$s9GbPozG9tQwH3vb/lhYbuMzt./O5vaf2oRTQ0z5wl9TcB9BRVDce','Customer'),(9,'Hari','hari@gmail.com','$2a$10$5vRhbmRNssfB1DIAM8JJZubdIhmJgExPRBNQeFGUoNqWt8giSqLsK','Customer'),(10,'Ida','ida@gmail.com','$2a$10$e7mVe5YcdSZhkc79IPShPuPNOW9o2sLs1G73dm5uyz/9vCttfkFEK','Customer'),(11,'Julie','julie@gmail.com','$2a$10$5DpkpYpJ2BrIdDeuBzt5VuzPxtBsGLPm8K2z6HflYJDECq9C5J7ve','Customer'),(12,'Kiki','kiki@gmail.com','$2a$10$E6qfAPHHnURQoDmcqPv4iuwHM3MJ4f/2Kb7gy9cWYfiN63B0BMIcO','Customer'),(13,'Lisa','lisa@gmail.com','$2a$10$zwgVtcXnesCYD0/9ZdlY5eom4VgNY7NuAvgE5qIpURFXYlPloIWWS','Customer'),(14,'Nico','nico@gmail.com','$2a$10$x6TNt5h3fdwmGUvTzqiiu.4H19AVa7gGwSREta3GQHPVPavNVDJQ6','Customer'),(15,'Oscar','oscar@gmail.com','$2a$10$VVBRsGZFooC.0SxYTJh99.OMnfkr6IVxS5N61beJSzzm7.ENPUhAm','Customer'),(16,'Paige','paige@gmail.com','$2a$10$UyoTfvBQ.Apk8vqtZkrzI.D9WbX6zobpD5vKyxiZdgyDjW1xGWvKO','Customer'),(17,'Tia','tia@gmail.com','$2a$10$xl3pCJqDh3TogF5qyvbAGeCjh6gfsKgzpPe9hrPX3ImtgaNv7EdI2','Customer'),(18,'Uzbek','uzbek@gmail.com','$2a$10$/ZeafoxBVKuHxbF1Hd9X2eT2xoRNam2USnhVxieXAODGpFv4tjFuK','Customer'),(19,'Vicky','vicky@gmail.com','$2a$10$8cJyQtNjQJ7X5SpohzVIx.4vYFhjWeGK.hwJr.A21v0X6xgmOGXTC','Customer'),(20,'Walt','walt@gmail.com','$2a$10$mVhoPRNMhfArjNNEafEtqu8RULzPLZmx43Zfj2elCQdlzfhJYisE6','Customer'),(21,'Zane','zane@gmail.com','$2a$10$rRwFkxScKXFN1rAL4mKuke/OM8f2kpQaKq46p9sFbI0CaRr0u.p02','Customer');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
