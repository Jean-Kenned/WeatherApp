# WeatherApp

## Configuração do Banco de dados

- Executar o seguinte script SQL:

` CREATE DATABASE weather_app; `

`` CREATE TABLE `weather_app`.`historico` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `country` VARCHAR(255) NOT NULL , `temperature` VARCHAR(255) NOT NULL , `description` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_at` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci; ``


`` CREATE TABLE `weather_app`.`maispesquisadas` ( `id` INT NOT NULL , `name` VARCHAR(255) NOT NULL , `country` VARCHAR(255) NOT NULL , `num_pesquisas` INT NOT NULL , `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_at` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci; ``
