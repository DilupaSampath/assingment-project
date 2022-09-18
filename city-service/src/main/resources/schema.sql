SET sql_mode = '';

CREATE TABLE if not exists `city` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `photo` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;






