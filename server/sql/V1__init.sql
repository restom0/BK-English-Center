-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'teacher', 'staff', 'admin');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('male', 'female', 'other');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "sex" "Sex" NOT NULL,
    "dateofbirth" DATE NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255),
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "sex" "Sex" NOT NULL,
    "dateofbirth" DATE NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255),
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "sex" "Sex" NOT NULL,
    "dateofbirth" DATE NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "sex" "Sex" NOT NULL,
    "dateofbirth" DATE NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "intro" TEXT,
    "img" VARCHAR(255),
    "imgintro" VARCHAR(255),
    "short" VARCHAR(255),
    "description" TEXT,
    "paidStudent" INTEGER NOT NULL DEFAULT 0,
    "prizeStudent" INTEGER NOT NULL DEFAULT 0,
    "paidTeacher" INTEGER NOT NULL DEFAULT 0,
    "prizeTeacher" INTEGER NOT NULL DEFAULT 0,
    "maxAttendDate" INTEGER NOT NULL DEFAULT 30,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "idCourse" INTEGER NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "maxStudent" INTEGER NOT NULL DEFAULT 30,
    "address" VARCHAR(255) NOT NULL,
    "schedule" VARCHAR(255) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentjoinclass" (
    "id" SERIAL NOT NULL,
    "idStudent" INTEGER NOT NULL,
    "idClass" INTEGER NOT NULL,
    "attendDate" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT -1,
    "listening" INTEGER NOT NULL DEFAULT 0,
    "writing" INTEGER NOT NULL DEFAULT 0,
    "speaking" INTEGER NOT NULL DEFAULT 0,
    "reading" INTEGER NOT NULL DEFAULT 0,
    "paidStatus" INTEGER,
    "prizeStatus" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "studentjoinclass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacherjoinclass" (
    "id" SERIAL NOT NULL,
    "idTeacher" INTEGER NOT NULL,
    "idClass" INTEGER NOT NULL,
    "attendDate" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT -1,
    "paidStatus" INTEGER,
    "prizeStatus" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "teacherjoinclass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "managestaff" (
    "id" SERIAL NOT NULL,
    "idStaff" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "attendDate" INTEGER NOT NULL DEFAULT 0,
    "paid" INTEGER,
    "paidStatus" INTEGER,
    "prize" INTEGER,
    "prizeStatus" INTEGER,

    CONSTRAINT "managestaff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacherhasfile" (
    "id" SERIAL NOT NULL,
    "idTeacher" INTEGER NOT NULL,
    "idClass" INTEGER NOT NULL,
    "fileName" VARCHAR(255) NOT NULL,
    "filetype" VARCHAR(50) NOT NULL,
    "fileAmount" INTEGER NOT NULL DEFAULT 1,
    "fileStatus" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "teacherhasfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emails" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "emails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsors" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "status" VARCHAR(50) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "sponsors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registerlog" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registerlog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "courses_name_key" ON "courses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "classes_name_key" ON "classes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "managestaff_idStaff_month_year_key" ON "managestaff"("idStaff", "month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "emails_email_role_key" ON "emails"("email", "role");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_idCourse_fkey" FOREIGN KEY ("idCourse") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentjoinclass" ADD CONSTRAINT "studentjoinclass_idStudent_fkey" FOREIGN KEY ("idStudent") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentjoinclass" ADD CONSTRAINT "studentjoinclass_idClass_fkey" FOREIGN KEY ("idClass") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacherjoinclass" ADD CONSTRAINT "teacherjoinclass_idTeacher_fkey" FOREIGN KEY ("idTeacher") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacherjoinclass" ADD CONSTRAINT "teacherjoinclass_idClass_fkey" FOREIGN KEY ("idClass") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managestaff" ADD CONSTRAINT "managestaff_idStaff_fkey" FOREIGN KEY ("idStaff") REFERENCES "staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacherhasfile" ADD CONSTRAINT "teacherhasfile_idTeacher_fkey" FOREIGN KEY ("idTeacher") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacherhasfile" ADD CONSTRAINT "teacherhasfile_idClass_fkey" FOREIGN KEY ("idClass") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registerlog" ADD CONSTRAINT "registerlog_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

