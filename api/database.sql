CREATE TABLE `phones` (
  `phone` varchar(10) NOT NULL,
  `name` varchar(32) NOT NULL,
  KEY `phone` (`phone`,`name`)
);