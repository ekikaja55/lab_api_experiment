CREATE DATABASE `minggu3anime`;

USE `minggu3anime`;

/*Table structure for table `anime` */

DROP TABLE IF EXISTS `anime`;

CREATE TABLE `anime` (
  `anime_id` int NOT NULL AUTO_INCREMENT,
  `anime_judul` varchar(255) NOT NULL,
  `anime_tahun_rilis` int NOT NULL,
  `anime_rating` float DEFAULT NULL,
  `anime_sinopsis` text,
  `kategori_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`anime_id`)
);

/*Data for the table `anime` */

insert  into `anime`(`anime_id`,`anime_judul`,`anime_tahun_rilis`,`anime_rating`,`anime_sinopsis`,`kategori_id`,`createdAt`,`updatedAt`,`deletedAt`) values 
(1,'henshin',3000,4.5,'wawatesting',1,NULL,'2025-03-06 08:15:19',NULL),
(2,'Sword Art Online',2012,7.8,'Seorang gamer terjebak dalam dunia game virtual.',2,NULL,NULL,NULL),
(3,'Your Lie in April',2014,8.9,'Seorang pianis bertemu dengan seorang pemain biola yang mengubah hidupnya.',3,NULL,NULL,NULL),
(4,'Death Note',2004,10,'buku catatan',1,NULL,NULL,NULL),
(5,'wawa',3000,4.5,'wawatesting',1,'2025-03-06 08:03:14','2025-03-06 08:03:14',NULL);

/*Table structure for table `kategori_anime` */

DROP TABLE IF EXISTS `kategori_anime`;

CREATE TABLE `kategori_anime` (
  `kategori_id` int NOT NULL AUTO_INCREMENT,
  `kategori_nama` varchar(100) NOT NULL,
  `kategori_deskripsi` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`kategori_id`)
);

/*Data for the table `kategori_anime` */

insert  into `kategori_anime`(`kategori_id`,`kategori_nama`,`kategori_deskripsi`,`createdAt`,`updatedAt`,`deletedAt`) values 
(1,'Shounen','Anime dengan target penonton remaja laki-laki',NULL,NULL,NULL),
(2,'Isekai','Anime yang bertemakan dunia lain',NULL,NULL,NULL),
(3,'Romance','Anime dengan cerita romantis',NULL,NULL,NULL);

DROP TABLE IF EXISTS `mahasiswa`;

CREATE TABLE `mahasiswa` (
  `mhs_id` int NOT NULL AUTO_INCREMENT,
  `mhs_nrp` varchar(20) NOT NULL,
  `mhs_nama` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`mhs_id`)
);
/* Sample data for table `mahasiswa` */
INSERT INTO `mahasiswa` (`mhs_nrp`, `mhs_nama`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('123456789', 'Andi Wijaya', NOW(), NOW(), NULL),
('987654321', 'Budi Santoso', NOW(), NOW(), NULL);

/* Table structure for table `favorite` */
DROP TABLE IF EXISTS `favorite`;

CREATE TABLE `favorite` (
  `favorite_id` int NOT NULL AUTO_INCREMENT,
  `mhs_nrp` varchar(20) NOT NULL,
  `anime_id` int NOT NULL,
  `favorite_tahun` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`favorite_id`)
);

/* Sample data for table `favorite` */
INSERT INTO `favorite` (`mhs_nrp`, `anime_id`, `favorite_tahun`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('123456789', 2, 2023, NOW(), NOW(), NULL),
('987654321', 3, 2024, NOW(), NOW(), NULL);