create database if not exists db_PharmaOff;
use db_PharmaOff;

#TABLETION
create table tb_usuario(
id_usuario SERIAL primary key not null,
nme_usuario varchar (10) ,
email_usuario varchar (50) not null,
pwd_usuario varchar (500) not null,
pwd_changed bigint  default null
);


Create table tb_estabelecimento (
id_estabelecimento SERIAL primary key not null,  
nme_estabelecimento varchar (100),
rating_estabelecimento double precision ,
endereço_estabelecimento varchar(50) ,
img_estabelecimento varchar(500) ,
sts_estabelecimento boolean    
);


create table EstabelecimentoParceiro(
	id_EstabelecimentoParceiro serial primary key,
	nme_franquia varchar(100) not null,
	cod_estabelecimento integer not null references tb_estabelecimento(id_estabelecimento)
)

create table ta_produto(
	id_produto serial primary key,
	nme_produto varchar(100) not null,
	preco_produto decimal(10,2) not null,
	sts_produto integer default 1,
	desc_produto varchar(400) ,
	img_produto varchar(500) ,
	cod_categoria integer not null references categoria(id_categoria),
	cod_estabelecimentoparceiro int REFERENCES estabelecimentoParceiro (id_estabelecimentoParceiro)
);






create table categoria(
	id_categoria serial primary key,
	categoria_produto varchar(100) not null,
	sts_categoria integer default 1
		
)



create table ta_cupom(
id_cupom SERIAL primary key not null,
nme_cupom  varchar(40) ,
percent_cupom double precision ,
dta_validade_cupom timestamp,
sts_ativo_cupom boolean,
cod_produto int references ta_produto (id_produto),
cod_estabelecimento int references tb_estabelecimento (id_estabelecimento)
);

-- Lista de desejos das usuarios, cada usuario tem sua lista. 
create table tb_listaDesejos(
id_listaDesejos SERIAL primary key not null ,
cod_usuario int REFERENCES tb_usuario (id_usuario)	
);

-- Lista de desejos dos produtos, que estão linkados com as usuarios da outra lista.
create table ta_listaDesejos_produtos(
id_listaDesejos_produtos SERIAL primary key not null,
cod_listadesejos int  REFERENCES tb_listaDesejos (id_listadesejos),
cod_produto int  REFERENCES ta_produto (id_produto),
qtd_produto integer not null
);


CREATE TABLE senhatokenreset (
  id_token SERIAL  REFERENCES tb_usuario (id_usuario),
  nme_token TEXT ,
  expira_token BIGINT 
);
