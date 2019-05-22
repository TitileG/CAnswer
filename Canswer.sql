use master 
go
--drop database S354_Project
--go

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
archive BIT  ,
WHO_add int,
FOREIGN KEY (WHO_add) REFERENCES Users(ID)
)
go

--use master 
--go
--drop table Post
--go



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

--use master 
--go
--drop table Answers
--go


create table Answers
(ID int IDENTITY(1,1) PRIMARY KEY,
Answer VARCHAR(200),
_User int,
FA_Answer varchar(200),
FOREIGN KEY (Answer) REFERENCES Question(ID),
FOREIGN KEY (_User) REFERENCES Users(ID)
)
go


create table Reminder 
(ID int Identity(1,1) Primary Key,
Title varchar(200),
Description varchar(1000),
DateStart DateTime,
DateEnd DateTime,
Client int,
FOREIGN KEY (Client) REFERENCES Users(ID)
)
go

--use S354_Project
--go

--inserting into usertype table
insert into UserType(Usertype) Values('Çlient')
insert into UserType(Usertype) Values('Master')
insert into UserType(Usertype) Values('Collaborator')
go

--inserting into User table
insert into Users(email_address,Username,Password,usertypeID) Values('nickeysibanyoni@gmail.com','master','master',2)
insert into Users(email_address,Username,Password,usertypeID) Values('fred@gmail.com','justin','justin',3)
insert into Users(email_address,Username,Password,usertypeID) Values('nosisa@gmail.com','nosisa','nosisa',3)
insert into Users(email_address,Username,Password,usertypeID) Values('bob@gmail.com','bob','bob',3)
insert into Users(email_address,Username,Password,usertypeID) Values('zwanezinhle97@gmail.com','zinhle','zinhle',1)
insert into Users(email_address,Username,Password,usertypeID) Values('titilegama@gmail.com','titile','titile',3)
go


--insert into Treat_Type
insert into Treatment_Type(TreatmentTypeName) Values('Diet')
insert into Treatment_Type(TreatmentTypeName) Values('Exercise')
insert into Treatment_Type(TreatmentTypeName) Values('StopSmokingTips')
insert into Treatment_Type(TreatmentTypeName) Values('SignsOfCancer')


--insert into Collaborators 
insert into Colloborators(Name,Surname,Phone_number,Qualification,Job_Depscription,Users) Values('justin','aubrey',08424136319,'BSc Human Physiology Genetics and Psychology','Psychologist',3)
insert into Colloborators(Name,Surname,Phone_number,Qualification,Job_Depscription,Users) Values('nosisa','matsebula',0943003309,'B Pharm','Pharmacist',3)
insert into Colloborators(Name,Surname,Phone_number,Qualification,Job_Depscription,Users) Values('nickey','sibanyoni',0893059364,'BSc in Radiology','Oncologist',2)
insert into Colloborators(Name,Surname,Phone_number,Qualification,Job_Depscription,Users) Values('zinhle','zwane',0723829494,'BSc Radiotherapy','Radiologist',1)
insert into Colloborators(Name,Surname,Phone_number,Qualification,Job_Depscription,Users) Values('titile','gama',0809349553,'Nursing','Nursing Studies',3)


--insert into Post
insert into Post(Title,Post_Description,Post_DateAdded,archive,WHO_add) Values ('First Appointment','Feelings for first appointment','2019-05-18','false',3)
insert into Post(Title,Post_Description,Post_DateAdded,archive,WHO_add) Values ('Speak out!','Voice out to yor partners and family about your diagnosis.It is important to not be alone during this tough time.','2019-05-10','false',1)
insert into Post(Title,Post_Description,Post_DateAdded,archive,WHO_add) Values ('Staying Positive','Having a positive mindset will assist you to survive these hard times.','2019-04-16 ','false',1)
insert into Post(Title,Post_Description,Post_DateAdded,archive,WHO_add) Values ('Changes in your body','You might experience a few body changes which include weight loss.Do not let that get you down.','2019-03-20','false',1)
insert into Post(Title,Post_Description,Post_DateAdded,archive,WHO_add) Values ('How is the treatment going','Tiring put keep the momentum going','2019-05-23','false',1)
insert into Post(Title,Post_Description,Post_DateAdded,archive,WHO_add) Values ('Community talks','Lets spread the word about cancer.Someone else can be saved.','2019-04-07','false',1)


----insert into treatment
insert into Treatment (TreatmentName,treatmenttypeID,WHO_added) Values('Diet',1,1)
insert into Treatment (TreatmentName,treatmenttypeID,WHO_added) Values('Exercise Plan',2,1)
insert into Treatment (TreatmentName,treatmenttypeID,WHO_added) Values('Yoga',2,1)
insert into Treatment (TreatmentName,treatmenttypeID,WHO_added) Values('Mind exercise',2,1)


--insert into post comment
insert into Post_Comment(Post_Comment,Post_ID,UserID) Values('helpful',1,3)
insert into Post_Comment(Post_Comment,Post_ID,UserID) Values('Very Thoughtful',2,3)
insert into Post_Comment(Post_Comment,Post_ID,UserID) Values('Wonderful content',3,3)
insert into Post_Comment(Post_Comment,Post_ID,UserID) Values('helpful',4,3)
insert into Post_Comment(Post_Comment,Post_ID,UserID) Values('Neautral',4,3)
insert into Post_Comment(Post_Comment,Post_ID,UserID) Values('Encouraging',4,3)


--insert into symptoms
insert into Symptoms(Sym_Description,Sym_Content,Sym_DateAdded,WHO_added) Values('Early Signs Of Cancer detection','How to detect symptoms','2019-05-05',2)
insert into Symptoms(Sym_Description,Sym_Content,Sym_DateAdded,WHO_added) Values('Fatigue & tired','How to detect symptoms','2019-05-18 ',2)
insert into Symptoms(Sym_Description,Sym_Content,Sym_DateAdded,WHO_added) Values('Coughing','Dry cough with','2019-05-18',2)
insert into Symptoms(Sym_Description,Sym_Content,Sym_DateAdded,WHO_added) Values('Respiratory','Shortness of breath & dizzness','2019-05-18',2)
insert into Symptoms(Sym_Description,Sym_Content,Sym_DateAdded,WHO_added) Values('Pain types','Dull or sharp pains.','2019-05-18',2)

--insert question  Question
insert into  Question(Question,Colab_ID) Values ('How do I identify cancer?',2)
insert into  Question(Question,Colab_ID) Values ('How to start positive?',3)
insert into  Question(Question,Colab_ID) Values ('Is it ok to miss checkups?',3)
insert into  Question(Question,Colab_ID) Values ('How do you check consistent with your diet?',1)


--insert Answers
insert into Answers(Answer,_User,FA_Answer) Values ('Lumps & shortness of breath',2,1)
insert into Answers(Answer,_User,FA_Answer) Values ('Do not overthink the situation',3,2)
insert into Answers(Answer,_User,FA_Answer) Values ('Always go for checkups to maintain your progress',3,3)
insert into Answers(Answer,_User,FA_Answer) Values ('Ask for families assistance',1,4)

--insert into reminder
insert into Reminder (Title,Description,DateStart,DateEnd,Client) Values ('Appointment with oncologist','Check review','2019-04-22','2019-04-22',3)
