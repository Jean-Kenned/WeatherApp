# WeatherApp

## Configuração do Banco de dados

- Executar o seguinte script SQL:

` CREATE DATABASE weather_app; `

`` CREATE TABLE `weather_app`.`historico` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `country` VARCHAR(255) NOT NULL , `temperature` VARCHAR(255) NOT NULL , `description` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_at` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci; ``


`` CREATE TABLE `weather_app`.`maispesquisadas` ( `id` INT NOT NULL , `name` VARCHAR(255) NOT NULL , `country` VARCHAR(255) NOT NULL , `num_pesquisas` INT NOT NULL , `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_at` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci; ``


 - Informações adicionais:
    * **Hostname**: localhost
    * **Schema**: weather_app
    * **User**: root
    * **Password**: 12345



## Instalação

  Dentro da pasta do projeto, execute os seguintes comandos:

 - Instalar módulos:

  `npm install` 

 -  Executar servidor:

  `node server.js`

 O servidor estará recebendo requisições na porta 3000

 - Executar aplicação:

  Acesse através do navegador o endereço:

  `http://localhost:3000`