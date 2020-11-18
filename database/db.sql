CREATE DATABASE IF NOT EXISTS `backendsistemaf`;
USE `backendsistemaf`;

CREATE TABLE IF NOT EXISTS `cliente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(125) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` (`id`, `nombre`) VALUES
	(109955, 'patito'),
	(351521531, 'El conejo');

CREATE TABLE IF NOT EXISTS `concepto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_venta` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `preciounitario` decimal(16,2) NOT NULL,
  `importe` decimal(16,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_venta` (`id_venta`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `concepto_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id`),
  CONSTRAINT `concepto_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`)
)

CREATE TABLE IF NOT EXISTS `producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `precio` decimal(16,2) NOT NULL DEFAULT '0.00',
  `costo` decimal(16,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
)

INSERT INTO `producto` (`id`, `nombre`, `precio`, `costo`) VALUES
	(1, 'Galleta N', 500.00, 300.00),
	(2, 'Gaseosa M', 1500.00, 1400.00);

CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) 

CREATE TABLE IF NOT EXISTS `venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `total` decimal(16,2) NOT NULL,
  `isvalido` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`)
)
