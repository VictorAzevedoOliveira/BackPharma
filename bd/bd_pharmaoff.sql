create database if not exists db_PharmaOff;
use db_PharmaOff;

#TABLETION
create table tb_pessoa(
id_pessoa int primary key ,
nme_pessoa varchar (10) default null,
email_pessoa varchar (50) ,
pwd_pessoa varchar (500) ,
pwd_changed bigint  default null
);

Create table tb_estabelecimento (
id_estabelecimento int primary key,  
nme_estabelecimento varchar (100) default null,
rating_estabelecimento double ,
endereço_estabelecimento varchar(50) ,
img_estabelecimento varchar(500) default null,
sts_estabelecimento boolean    
);

CREATE TABLE ta_produto (
id_produto int primary key auto_increment,
nme_produto varchar(40) DEFAULT NULL,
preco_produto double ,
preco_desconto_produto int,
desc_produto varchar(400) DEFAULT NULL,
img_produto varchar(500) ,
cod_estabelecimento int REFERENCES tb_estabelecimento (id_estabelecimento)

);



create table ta_cupom(
id_cupom int primary key ,
nme_cupom  varchar(40) ,
percent_cupom double ,
dta_validade_cupom timestamp,
sts_ativo_cupom boolean,
cod_produto int references ta_produto (id_produto),
cod_estabelecimento int references tb_estabelecimento (id_estabelecimento),
);

-- Lista de desejos das pessoas, cada pessoa tem sua lista. 
create table tb_listaDesejos(
id_listaDesejos int primary key ,
cod_pessoa int REFERENCES tb_pessoa (id_pessoa)	
);

-- Lista de desejos dos produtos, que estão linkados com as pessoas da outra lista.
create table ta_listaDesejos_produtos(
id_listaDesejos_produtos int primary key ,
cod_listadesejos int  REFERENCES tb_listaDesejos (id_listadesejos),
cod_produto int  REFERENCES ta_produto (id_produto),    
);

CREATE TABLE senhatokenreset (
  id_token INT  REFERENCES tb_usuario (id_usuario),
  nme_token TEXT ,
  expira_token BIGINT 
);
