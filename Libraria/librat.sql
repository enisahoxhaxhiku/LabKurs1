create database Librat

use Librat

create table Autoret_Shqip(
   AutoretShId int Primary Key identity(1,1),
   Emri varchar(256),
   Mbiemri varchar(256),
   Biografia varchar(8000)
)

select * from Autoret_Shqip

insert into Autoret_Shqip values('Jeronim De', 'Rada', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
insert into Autoret_Shqip values('Ismail', 'Kadare', 'Lorem Ipsum is simply dummy text industry.')
insert into Autoret_Shqip values('Ernes', 'Koliqi', 'Lorem Ipsum is simply dummy text industry.')
insert into Autoret_Shqip values('Fan', 'Noli', 'Lorem Ipsum is simply dummy text industry.')
insert into Autoret_Shqip values('Mitrush', 'Kuteli', 'Lorem Ipsum is simply dummy text industry.')
insert into Autoret_Shqip values('Dritero', 'Agoli', 'Lorem Ipsum is simply dummy text industry.')






create table Autoret_Huaj(
   AutoretHId int Primary Key identity(1,1),
   Emri varchar(256),
   Mbiemri varchar(256),
   Biografia varchar(8000)
)


select * from Autoret_Huaj


insert into Autoret_Huaj values('Franz', 'Kafka', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
insert into Autoret_Huaj values('Collen', 'Hover', 'Lorem Ipsum is simply dummy text industry.')
insert into Autoret_Huaj values('Pedro', 'Alonso', 'Lorem Ipsum is simply dummy text industry.')
insert into Autoret_Huaj values('Alvaro', 'Morte', 'Lorem Ipsum is simply dummy text industry.')
insert into Autoret_Huaj values('Ursula', 'Corbero', 'Lorem Ipsum is simply dummy text industry.')
insert into Autoret_Huaj values('Jaime', 'Lorente', 'Lorem Ipsum is simply dummy text industry.')


create table Publicistet_Shqip(
PublicistetID int Primary Key  identity(1,1),
Emri varchar(256),
Mbiemri varchar(256),
Biografia varchar(8000)
)


INSERT INTO Publicistet_Shqip ([Emri],[Mbiemri],[Biografia]) VALUES ('Aleksander','Sirdani','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s')
INSERT INTO Publicistet_Shqip ([Emri],[Mbiemri],[Biografia]) VALUES ('Beqe','Cufaj','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s')
INSERT INTO Publicistet_Shqip ([Emri],[Mbiemri],[Biografia]) VALUES ('Ardian','Vehbiu','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s')
INSERT INTO Publicistet_Shqip ([Emri],[Mbiemri],[Biografia]) VALUES ('Gjergj','Bubani','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s')
INSERT INTO Publicistet_Shqip ([Emri],[Mbiemri],[Biografia]) VALUES ('Hasan','Bunjaku','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s')
INSERT INTO Publicistet_Shqip ([Emri],[Mbiemri],[Biografia]) VALUES ('Nonda','Bulka','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s')





create table Publicistet_Huaj(
PublicistetHID int Primary Key  identity(1,1),
Emri varchar(256),
Mbiemri varchar(256),
Biografia varchar(8000)
)


INSERT INTO Publicistet_Huaj ([Emri],[Mbiemri],[Biografia]) VALUES ('Carl','Weathers','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s')
INSERT INTO Publicistet_Huaj ([Emri],[Mbiemri],[Biografia]) VALUES ('Burgess','Meredith','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s')
INSERT INTO Publicistet_Huaj ([Emri],[Mbiemri],[Biografia]) VALUES ('Dolph','Lundergen','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s')
INSERT INTO Publicistet_Shqip ([Emri],[Mbiemri],[Biografia]) VALUES ('Charles','Winkler','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s')
INSERT INTO Publicistet_Shqip ([Emri],[Mbiemri],[Biografia]) VALUES ('Harper','Collins','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s')
INSERT INTO Publicistet_Shqip ([Emri],[Mbiemri],[Biografia]) VALUES ('Hachette','Livre','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s')



create table Revistat_Shqip(
RevistatShID int Primary Key  identity(1,1),
Emri varchar(256),
Pershkrimi varchar(256),
More varchar(8000)
)

INSERT INTO Revistat_Shqip([Emri],[Pershkrimi],[More]) VALUES ('Agimi','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','Lorem Ipsum has been the industry standard dummy text ever since the 1500s')
INSERT INTO Revistat_Shqip([Emri],[Pershkrimi],[More]) VALUES ('Albaniac','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','Lorem Ipsum has been the industry standard dummy text ever since the 1500s')
INSERT INTO Revistat_Shqip([Emri],[Pershkrimi],[More]) VALUES ('Bota e Re','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','Lorem Ipsum has been the industry standard dummy text ever since the 1500s')
INSERT INTO Revistat_Shqip([Emri],[Pershkrimi],[More]) VALUES ('Drita','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','Lorem Ipsum has been the industry standard dummy text ever since the 1500s')
INSERT INTO Revistat_Shqip([Emri],[Pershkrimi],[More]) VALUES ('Emathia','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','Lorem Ipsum has been the industry standard dummy text ever since the 1500s')
INSERT INTO Revistat_Shqip([Emri],[Pershkrimi],[More]) VALUES ('Fatosi','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','Lorem Ipsum has been the industry standard dummy text ever since the 1500s')

create table Revistat_Huaj(
RevistatHID int Primary Key  identity(1,1),
Emri varchar(256),
Pershkrimi varchar(256),
More varchar(8000)
)

insert into Revistat_Huaj values('Tech Bots', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
insert into Revistat_Huaj values('Vogue', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
insert into Revistat_Huaj values('Crizest', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
insert into Revistat_Huaj values('Family Fun', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
insert into Revistat_Huaj values('Absorb Curve', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
insert into Revistat_Huaj values('Rotary Club', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')


create table Kategorite_Shqip(
    KategoriaShId int Primary Key identity(1,1),
	Kategoria varchar (256)
	)


	insert into Kategorite_Shqip values('Klasike')
	insert into Kategorite_Shqip values('Krim')
	insert into Kategorite_Shqip values('Horror')
	insert into Kategorite_Shqip values('Autobiografi')
	insert into Kategorite_Shqip values('Drame')
	insert into Kategorite_Shqip values('Mister')


	select * from Kategorite_Shqip


	create table Kategorite_Huaj(
    KategoriaHID int Primary Key identity(1,1),
	Kategoria varchar (256)
	)
	

	insert into Kategorite_Shqip values('Klasike')
	insert into Kategorite_Shqip values('Krim')
	insert into Kategorite_Shqip values('Horror')
	insert into Kategorite_Shqip values('Autobiografi')
	insert into Kategorite_Shqip values('Drame')
	insert into Kategorite_Shqip values('Mister')

	SELECT * FROM Kategorite_Huaj


	create table Eventet_Shqip(
    EventetId int Primary Key identity(1,1),
	Emri varchar (256),
	Koha varchar (256),
	Lokacioni varchar(8000)
	)

	INSERT INTO Eventet_Shqip VALUES ('Takim me Autorin','E merkure','Prishtine')
	INSERT INTO Eventet_Shqip VALUES ('Promovimi i Librit','E enjte','Vushtrri')
	INSERT INTO Eventet_Shqip VALUES ('Takim me Autorin','E premte','Prishtine')
	INSERT INTO Eventet_Shqip VALUES ('Promovimi i Librit','E shtune','Mitrovice')
	INSERT INTO Eventet_Shqip VALUES ('Takim me Autorin','E diel','Prishtine')
	INSERT INTO Eventet_Shqip VALUES ('Promovimi i Librit','E hene','Prizren')

	select * from Eventet_Shqip

	create table Eventet_Huaj(
    EventetHId int Primary Key identity(1,1),
	Emri varchar (256),
	Koha varchar (256),
	Lokacioni varchar(8000)
	)

	INSERT INTO Eventet_Shqip VALUES ('Takim me Autorin','E merkure','Paris')
	INSERT INTO Eventet_Shqip VALUES ('Promovimi i Librit','E enjte','London')
	INSERT INTO Eventet_Shqip VALUES ('Takim me Autorin','E premte','Berlin')
	INSERT INTO Eventet_Shqip VALUES ('Promovimi i Librit','E shtune','Rome')
	INSERT INTO Eventet_Shqip VALUES ('Takim me Autorin','E diel','Milano')
	INSERT INTO Eventet_Shqip VALUES ('Promovimi i Librit','E hene','Amsterdam')

	Select * from Eventet_Huaj



	create table Librat_Shqip(
	LibratShId int Primary Key identity(1,1),
	Titulli varchar (256),
	Foto_Sh varchar (256),
	Data_PostimitSh datetime DEFAULT CURRENT_TIMESTAMP not null,
	Pershkrimi_Librit_Shqip varchar(8000),
	ISBN_Librit_Shqip varchar(1000),
	AutoriID int FOREIGN KEY REFERENCES Autoret_Shqip(AutoretShId),
	KategoriaID int FOREIGN KEY REFERENCES Kategorite_Shqip(KategoriaShId),
	PublicistiID int FOREIGN KEY REFERENCES Publicistet_Shqip(PublicistetID),
	RevistaID int FOREIGN KEY REFERENCES Revistat_Shqip(RevistatShID),
	EventiID int FOREIGN KEY REFERENCES Eventet_Shqip(EventetId)
    )

	Insert Into Librat_Shqip Values ('Ceta e Profeteve', 'anonymous.png', '2022-05-28', 'It is a long established fact that a reader will be distracted', '264734325678', '2', '2', '2', '1', '1')
	Insert Into Librat_Shqip Values ('Bageti e Bujqesi', 'anonymous.png', '2022-05-28', 'It is a long established fact that a reader will be distracted', '264734325678', '2', '2', '2', '1', '1')
	Insert Into Librat_Shqip Values ('Estetika dhe publicistika', 'anonymous.png', '2022-05-28', 'It is a long established fact that a reader will be distracted', '264734325678', '2', '2', '2', '1', '1')
	Insert Into Librat_Shqip Values ('Vepra e plotë', 'anonymous.png', '2022-05-28', 'It is a long established fact that a reader will be distracted', '264734325678', '2', '2', '2', '1', '1')
	Insert Into Librat_Shqip Values ('Kujtime', 'anonymous.png', '2022-05-28', 'It is a long established fact that a reader will be distracted', '264734325678', '2', '2', '2', '1', '1')
	Insert Into Librat_Shqip Values ('Kronike në gur', 'anonymous.png', '2022-05-28', 'It is a long established fact that a reader will be distracted', '264734325678', '2', '2', '2', '1', '1')
	
	CREATE TABLE Librat_Huaj(
    LibratH_Id int Primary Key identity(1,1),
    Titulli varchar(256),
    NrKapitujve int,
	Data_PostimitH datetime DEFAULT CURRENT_TIMESTAMP not null,
	Pershkrimi_Librit_Huaj varchar(8000),
	Foto_H varchar(256),
    AutoretHId INT,
    FOREIGN KEY (AutoretHId) REFERENCES Autoret_Huaj(AutoretHId),
    PublicistetHID int,
    FOREIGN KEY (PublicistetHID) REFERENCES Publicistet_Huaj(PublicistetHID),
    RevistatHID int,
    FOREIGN KEY (RevistatHID) REFERENCES Revistat_Huaj(RevistatHID),
    EventetHId int,
    FOREIGN KEY (EventetHId) REFERENCES Eventet_Huaj(EventetHId),
    KategoriaHID int,
    FOREIGN KEY (KategoriaHID) REFERENCES Kategorite_Huaj(KategoriaHID)

    )

	SELECT * FROM Librat_Huaj

	

	
	SELECT Lh.Titulli ,K.NrKapitulli , F.Titulli ,F.NrFaqes
	FROM Librat_Huaj Lh
	INNER JOIN Kapitulli K
	ON Lh.KapitulliID=K.KapitulliID
	INNER JOIN KapitulliFaqja Kf
	ON Kf.KapitulliID=Kf.KapitulliID
	INNER JOIN Faqja F
	ON F.FaqjaID=Kf.FaqjaID
	WHERE K.NrKapitulli=1









	  SELECT * FROM Faqja



    CREATE TABLE Faqja(
    FaqjaID int Primary Key identity(1,1),
    TitulliKapitullit varchar(256),
    NrFaqes int,
    PershkrimiF varchar(1000),
    Linku varchar(8000)

    )



    CREATE TABLE Kapitulli(
    KapitulliID int Primary Key identity(1,1),
    NrKapitulli int,
    NrFaqeve int


    )


	CREATE TABLE KapitulliFaqja (
	KapitulliID int not null foreign key references Kapitulli(KapitulliID),
	FaqjaID int not null foreign key references Faqja(FaqjaID),
	Constraint Kapitulli_Faqja Primary key (KapitulliID,FaqjaID)
	)


	CREATE TABLE Libri_HuajKapitulli (
    LibratH_Id int not null foreign key references Librat_Huaj(LibratH_Id),
	KapitulliID int not null foreign key references Kapitulli(KapitulliID),
	
	Constraint Libri_Huaj_Kapitulli Primary key (LibratH_Id,KapitulliID)
	)


	
	
	INSERT INTO Faqja VALUES ('Perendimi',10,'It is a long established fact that a reader will be distracted','https://youtu.be/To_kVMMu-Ls')
    INSERT INTO Faqja VALUES ('Nata',22,'It is a long established fact that a reader will be distracted','https://youtu.be/To_kVMMu-Ls')
	INSERT INTO Faqja VALUES ('Perendimi',13,'It is a long established fact that a reader will be distracted','https://youtu.be/To_kVMMu-Ls')
    INSERT INTO Faqja VALUES ('Nata',32,'It is a long established fact that a reader will be distracted','https://youtu.be/To_kVMMu-Ls')
	INSERT INTO Kapitulli VALUES (1,9,1)
	INSERT INTO Kapitulli VALUES (1,9,2)
	INSERT INTO Librat_Huaj VALUES ('La Casa De Papel',5,'2017-09-8','It is a long established fact that a reader will be distracted .','pro.jpg',1,1,1,1,2)

 
    --Insert into SerialiEpisodi values ()
	INSERT INTO Libri_HuajKapitulli VALUES(1,1)
	INSERT INTO Libri_HuajKapitulli VALUES(1,2)
	INSERT INTO Libri_HuajKapitulli VALUES(1,10)
	INSERT INTO Libri_HuajKapitulli VALUES(1,13)

	
	
create table AspNetUsers(
Id varchar(450) Primary Key,
UserName varchar(256),
NormalizedUserName varchar(256),
Email varchar(256),
NormalizedEmail varchar(256),
EmailConfirmed bit not null,
PasswordHash varchar(max),
SecurityStamp varchar(max),
ConcurrencyStamp varchar(max),
PhoneNumber varchar(max),
PhoneNumberConfirmed bit not null,
TwoFactorEnabled bit not null,
LockoutEnd datetimeoffset(7),
LockoutEnabled bit not null,
AccessFailedCount int not null
)

create table AspNetRoles(
Id varchar(450) Primary Key,
Name varchar(256),
NormalizedName varchar(256),
ConcurrencyStamp varchar(max)
)


create table AspNetUserRoles(
UserId varchar(450) not null,
RoleId varchar(450) not null,
constraint UserRolesPk primary key (UserId, RoleId),
constraint UserFk foreign key (UserId) references AspNetUsers(Id),
constraint RoleFk foreign key (RoleId) references AspNetRoles(Id),
)



insert into RrethNesh values ('Rreth Nesh','Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolor hic, 
fugit beatae soluta minus odit numquam ipsum similique nobis aut sint rerum sequi eos delectus et facere nemo quo quod incidunt repudiandae repellat
consequatur ipsam maxime! Dolor, illo. Expedita quia quam repellendus alias officiis voluptates natus dicta veritatis tempora maiores dolorem ab, sed voluptatum 
ex molestiae aspernatur odit voluptatibus nobis eius ad. Adipisci laborum tempore, voluptates distinctio temporibus reprehenderit error pariatur quisquam unde culpa 
asperiores ex ratione. Impedit, doloremque. Eos vitae voluptatibus tempore sequi excepturi, iusto quas cupiditate, sapiente provident in voluptatem maiores soluta rem 
voluptatum exercitationem perspiciatis ratione.')



Create Table Contact(

KontaktID int primary key identity(1,1),
Emri varchar (50),
Mbiemri varchar (50),
NrTel varchar(50),
Mesazhi varchar(8000)


)

INSERT INTO Contact VALUES('Osman','Osmani','+38349578654','A do ta publikoni serialin Squid Game sezona 2?')


SELECT * FROM Contact