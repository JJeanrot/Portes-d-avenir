drop table  if exists evenement;
drop table if exists departement;


create table departement(
    id_departement int primary key AUTO_INCREMENT,
    nom varchar(255),
    address varchar(255)
);

create table evenement(
    id_evenement int primary key AUTO_INCREMENT,
    nom varchar(255),
    image varchar(255),
    date_event DATETIME,
    departement_id int,
    foreign key evenement(departement_id) references departement(id_departement)
);
