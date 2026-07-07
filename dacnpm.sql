CREATE DATABASE BKEC;
USE BKEC;
-- Create Users table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(50),
    email VARCHAR(255),
    image BLOB
);

-- Create Students table
CREATE TABLE Students (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    sex VARCHAR(10),
    dateofbirth DATE,
    phone VARCHAR(20),
    address VARCHAR(255),
    FOREIGN KEY (id) REFERENCES Users(id)
);

-- Create Teachers table
CREATE TABLE Teachers (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    sex VARCHAR(10),
    dateofbirth DATE,
    phone VARCHAR(20),
    address VARCHAR(255),
    FOREIGN KEY (id) REFERENCES Users(id)
);

-- Create Staff table
CREATE TABLE Staff (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    sex VARCHAR(10),
    dateofbirth DATE,
    phone VARCHAR(20),
    address VARCHAR(255),
    FOREIGN KEY (id) REFERENCES Users(id)
);

-- Create Admin table
CREATE TABLE Admin (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    sex VARCHAR(10),
    dateofbirth DATE,
    phone VARCHAR(20),
    address VARCHAR(255),
    FOREIGN KEY (id) REFERENCES Users(id)
);

CREATE TABLE ManageStaff (
    idStaff INT,
    month INT,
    year INT,
    attendDate INT,
    rate INT,
    paid INT,
    paidStatus BOOLEAN,
    prize INT,
    prizeStatus BOOLEAN,
    PRIMARY KEY(idStaff,month,year),
    FOREIGN KEY (idStaff) REFERENCES Staff(id)
);

CREATE TABLE Courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    intro LONGBLOB,
    img VARCHAR(255),
    imgintro VARCHAR(255),
    short LONGBLOB,
    description LONGBLOB,
    paidStudent INT,
    prizeStudent INT,
    paidTeacher INT,
    prizeTeacher INT,
    maxAttendDate INT
);

CREATE TABLE Classes (
    idCourse INT ,
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    startDate DATE,
    endDate DATE,
    schedule VARCHAR(255),
    maxStudent INT,
    address VARCHAR(255),
    FOREIGN KEY (IdCourse) REFERENCES Courses(id)
);

CREATE TABLE StudentJoinClass (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idStudent INT,
    idClass INT,
    attendDate INT,
    listening INT,
    writing INT,
    speaking INT,
    reading INT,
    status INT,
    paidStatus BOOLEAN,
    prizeStatus BOOLEAN,
    FOREIGN KEY (idStudent) REFERENCES Students(id),
    FOREIGN KEY (idClass) REFERENCES Classes(id)
);

CREATE TABLE TeacherJoinClass (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idTeacher INT,
    idClass INT,
    attendDate INT,
    rating INT,
    status INT,
    paidStatus BOOLEAN,
    prizeStatus BOOLEAN,
    FOREIGN KEY (idTeacher) REFERENCES Teachers(id),
    FOREIGN KEY (idClass) REFERENCES Classes(id)
);
CREATE TABLE TeacherHasFile(
	 id INT AUTO_INCREMENT PRIMARY KEY,
    idTeacher INT,
    idClass INT,
	 fileName VARCHAR(255),
    filetype VARCHAR(255),
    fileAmount INT,
    fileStatus BOOLEAN,
    FOREIGN KEY (idClass) REFERENCES Classes(id),
    FOREIGN KEY (idTeacher) REFERENCES Teachers(id)
);

CREATE TABLE Log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idUser INT,
    action VARCHAR(255),
    status BOOLEAN,
    date DATE,
    FOREIGN KEY (IdUser) REFERENCES Users(id)
);

-- Create RegisterLog table
CREATE TABLE RegisterLog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idUser INT,
    email VARCHAR(255),
    date DATE,
    FOREIGN KEY (IdUser) REFERENCES Users(id)
);
CREATE TABLE Sponsors(
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	amount INT,
	status BOOLEAN
);
CREATE TABLE Emails(
	id INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) UNIQUE,
	role VARCHAR(255)
)