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
  updatedAt datetime NOT NULL
);

CREATE TABLE funcionarios (
  id  INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  senha VARCHAR(255),
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL
  );
  


CREATE TABLE produtos (
  id  INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255),
  descricao TEXT,
  preco VARCHAR (20),
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL
);

CREATE TABLE pedidos (
  id  INT PRIMARY KEY AUTO_INCREMENT,
   produto_id INT ,
   cliente_id INT,
   quantidade VARCHAR (255),
   valor_total VARCHAR(255),
   createdAt datetime NOT NULL,
   updatedAt datetime NOT NULL,
   FOREIGN KEY (cliente_id) REFERENCES clientes(id),
FOREIGN KEY (produto_id) REFERENCES produtos(id)

  );

  CREATE TABLE itens_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quantidade INT ,
  pedido_id INT  ,
  produto_id INT ,
createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
  

);

INSERT INTO Produtos (nome, descricao, preco, createdAt,updatedAt )
VALUES ("hamburguer", "pao queijo e carne", "22",now(),now()
 
 );
