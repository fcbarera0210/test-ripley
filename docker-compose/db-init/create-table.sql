CREATE TABLE `TRX_LOG` (`id_TRX` int NOT NULL AUTO_INCREMENT, `fecha_TRX` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `json_TRX` varchar(255) NOT NULL, PRIMARY KEY (`id_TRX`)) ENGINE=InnoDB;
