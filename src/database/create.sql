CREATE DATABASE gamaburguer;
use gamaburguer;
CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  endereco VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(255) UNIQUE,
  senha VARCHAR(255),
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL
);

CREATE TABLE funcionarios (
  id AUTO_INCREMENT INT PRIMARY KEY,
  nome VARCHAR(255),
  email VARCHAR(20),
  senha VARCHAR(20)
  );
  
  


CREATE TABLE categorias (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome varchar(255) NOT NULL,
  descricao text,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL
);

CREATE TABLE produtos (
  id AUTO_INCREMENT INT PRIMARY KEY,
  nome VARCHAR(255),
  descricao TEXT,
  preco DECIMAL(10,2),
  id_categoria int NOT NULL,
  FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);

CREATE TABLE pedidos (
  id AUTO_INCREMENT INT PRIMARY KEY,
  id_cliente INT,
  id_funcionario INT,
  hora DATETIME,
  valor_total DECIMAL(10,2),
  FOREIGN KEY (id_cliente) REFERENCES clientes(id),
  FOREIGN KEY (id_produtos) REFERENCES produtos(id),
  FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id)
  );









