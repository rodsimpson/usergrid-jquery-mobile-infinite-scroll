CREATE TABLE IF NOT EXISTS `tels` (
  `tel` varchar(10) NOT NULL,
  `nom` varchar(32) NOT NULL,
  KEY `tel` (`tel`,`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;