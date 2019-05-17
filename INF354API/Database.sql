use master 
go
drop database S354_Project
go
create database S354_Project
go
use S354_Project
go

create table UserType 
(ID int Identity(1,1) Primary Key,
Usertype varchar(100)
)
go

create table Users 
(ID int Identity(1,1) Primary Key,
email_address varchar(200),
Username varchar(100),
Password varchar(100),
usertypeID int,
FOREIGN KEY (usertypeID) REFERENCES UserType(ID)
)
go

create table Colloborators
(ID int IDENTITY(1,1) PRIMARY KEY,
Name varchar(200),
Surname varchar(200),
Phone_number varchar (200),
Qualification varchar (200),
Job_Depscription varchar (200),
Users int,
FOREIGN KEY (Users) REFERENCES Users(ID) 
)
go

create table Post
(ID int IDENTITY(1,1) PRIMARY KEY,
Title varchar(8000),
Post_Description varchar(8000),
Picture varbinary(max),
Post_DateAdded DATETIME,
archive BIT,
WHO_add int,
FOREIGN KEY (WHO_add) REFERENCES Users(ID)
)
go

create table Post_Comment
(ID int IDENTITY(1,1) primary key,
Post_Comment varchar(8000),
Post_ID int,
UserID int,
Foreign key (UserID) references Users(ID),
Foreign key (Post_ID) references Post(ID)
)
go

create table Symptoms
(ID int IDENTITY(1,1) PRIMARY KEY,
Sym_Description varchar(200),
Sym_Content varchar(8000),
Sym_DateAdded DATETIME,

WHO_added int,
FOREIGN KEY (WHO_added) REFERENCES Users(ID),
)
go
create table Treatment_Type
(ID int IDENTITY(1,1) PRIMARY KEY,
TreatmentTypeName varchar(200),
)
go
create table Treatment
(ID int IDENTITY(1,1) PRIMARY KEY,
TreatmentName varchar(200),
Treatment_Link varbinary(Max),
treatmenttypeID int,
WHO_added int,
FOREIGN KEY (WHO_added) REFERENCES Users(ID),
FOREIGN KEY (treatmenttypeID) REFERENCES Treatment_Type(ID)
)
go

create table Question
(ID int IDENTITY(1,1) PRIMARY KEY,
Question VARCHAR(200),
Colab_ID int,
FOREIGN KEY (Colab_ID) REFERENCES Users(ID),
)
go
create table Answers
(ID int IDENTITY(1,1) PRIMARY KEY,
Answer INT,
_User int,
FA_Answer varchar(200),
FOREIGN KEY (Answer) REFERENCES Question(ID),
FOREIGN KEY (_User) REFERENCES Users(ID)
)
go

create table Frequency 
(ID int Identity(1,1) Primary Key,
Description varchar(200),
)
go

create table Reminder 
(ID int Identity(1,1) Primary Key,
Title varchar(200),
Description varchar(1000),
DateStart DateTime,
DateEnd DateTime,
FreqID int,
Client int,
FOREIGN KEY (Client) REFERENCES Users(ID),
FOREIGN KEY (FreqID) REFERENCES Frequency(ID)
)
go
use S354_Project
go
insert into UserType(Usertype) Values('Çlient')
insert into UserType(Usertype) Values('Master')
insert into UserType(Usertype) Values('Collaborator')
go
insert into Users(email_address,Username,Password,usertypeID) Values('nickeysibanyoni@gmail.com','master','master',2)
insert into Users(email_address,Username,Password,usertypeID) Values('fred@gmail.com','justin','justin',3)
insert into Users(email_address,Username,Password,usertypeID) Values('nosisa@gmail.com','nosisa','nosisa',3)
insert into Users(email_address,Username,Password,usertypeID) Values('bob@gmail.com','bob','bob',3)

insert into Treatment_Type(TreatmentTypeName) Values('Diet')
insert into Treatment_Type(TreatmentTypeName) Values('Exercise')
insert into Treatment_Type(TreatmentTypeName) Values('StopSmokingTips')

insert into Colloborators(Name,Surname,Phone_number,Qualification,Job_Depscription,Users) Values('justin','S',08424136319,'Stupid himself','works with stupidty',2)
insert into Colloborators(Name,Surname,Phone_number,Qualification,Job_Depscription,Users) Values('nosisa','S',08424136319,'Bcom Cancer','works with breast cancer',3)
insert into Colloborators(Name,Surname,Phone_number,Qualification,Job_Depscription,Users) Values('fred','S',08424136319,'Silifoma','works with stupidty',4)
select *
from users -- inner join Users on Colloborators.Users = Users.ID
