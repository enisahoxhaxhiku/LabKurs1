create database LabKurs1
use LabKurs1

create table Perdoruesi(

	PerdoruesiID  int Primary key identity(1,1),
	PerdoruesiName varchar(50),
	PerdoruesiSurname varchar(70),
	PerdoruesiEmail varchar(80)

)

select * from Perdoruesi

insert into Perdoruesi values('Enisa' ,'Hoxhaxhiku','enisahoxhaxhiku@hotmail.com')
insert into Perdoruesi values('Adea' ,'Mulaku','adeamulaku@gmail.com')



create table Takimet(

	 TakimetID int Primary key identity(1,1),
	 LlojiTakimit varchar(70),
	 DataTakimit datetime,
	 PerdoruesiID int foreign key references Perdoruesi(PerdoruesiID),
	 LokacioniID  int foreign key references Lokacioni(LokacioniID)

)


select * from Takimet

insert into Takimet values('Familjar' ,'4-28-2022','1','1')
insert into Takimet values('Shoqeror' ,'5-28-2022','2','2')




create table Lokacioni(

	 LokacioniID int Primary key identity(1,1),
	 Aktivitetet varchar(10),--Hapur ose Mbyllur
	 LlojiLokacionit varchar(30)


)

select * from Lokacioni

insert into Lokacioni values('Mbyllur' , 'Restaurant')
insert into Lokacioni values('Hapur' ,'Swimming')



create table Restaurantet(

	RestaurantetID  int Primary key identity(1,1),
	RestaurantetName varchar(50),
	RestaurantetAddress varchar(80),
	RestaurantetMenu varchar(80),
	LokacioniID  int foreign key references Lokacioni(LokacioniID)
)


create table Rekomandimet(

	RekomandimetID  int Primary key identity(1,1),
	RekomandimetAddress varchar(80),
	RestaurantetID  int foreign key references Restaurantet(RestaurantetID)
)

create table Koha(

	KohaID  int Primary key identity(1,1),
	KohaDay int,
	KohaMonth varchar(20),
	KohaYear int,
	TakimetID  int foreign key references Takimet(TakimetID)

)


