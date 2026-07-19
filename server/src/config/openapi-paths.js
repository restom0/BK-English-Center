/**
 * @swagger
 * /api-docs.json:
 *   get:
 *     tags: [System]
 *     summary: Return raw OpenAPI JSON.
 *     security: []
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /users/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login and set API token cookie.
 *     description: Credentials are sent in the body so they never appear in URLs.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required: [username, userpassword]
 *             properties:
 *               username: { type: string }
 *               userpassword: { type: string, format: password }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *   post:
 *     tags: [Auth]
 *     summary: Register a new account.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, userpassword, name, email, dob, sex, phone, address, role]
 *             properties:
 *               username: { type: string }
 *               userpassword: { type: string, format: password }
 *               name: { type: string }
 *               email: { type: string, format: email }
 *               dob: { type: string, format: date }
 *               sex: { type: string }
 *               phone: { type: string }
 *               address: { type: string }
 *               role: { type: string, enum: [student, teacher, staff, admin] }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Created'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *   patch:
 *     tags: [Auth]
 *     summary: Update current account profile.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, dob, sex, phone, address]
 *             properties:
 *               name: { type: string }
 *               email: { type: string, format: email }
 *               dob: { type: string, format: date }
 *               sex: { type: string }
 *               phone: { type: string }
 *               address: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *
 * /users/info:
 *   get:
 *     tags: [Auth]
 *     summary: Get current account profile.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *
 * /sendMail:
 *   get:
 *     tags: [Mail]
 *     summary: Send registration OTP email.
 *     security: []
 *     parameters:
 *       - in: query
 *         name: to
 *         schema: { type: string, format: email }
 *       - in: query
 *         name: role
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *
 * /sendPay:
 *   get:
 *     tags: [Mail]
 *     summary: Send tuition payment reminder email.
 *     parameters:
 *       - in: query
 *         name: to
 *         schema: { type: string, format: email }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /sendPrize:
 *   get:
 *     tags: [Mail]
 *     summary: Send prize notification email.
 *     parameters:
 *       - in: query
 *         name: to
 *         schema: { type: string, format: email }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /sendSalary:
 *   get:
 *     tags: [Mail]
 *     summary: Send salary notification email.
 *     parameters:
 *       - in: query
 *         name: to
 *         schema: { type: string, format: email }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /sendWarning:
 *   get:
 *     tags: [Mail]
 *     summary: Send warning email.
 *     parameters:
 *       - in: query
 *         name: to
 *         schema: { type: string, format: email }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /sendFile:
 *   get:
 *     tags: [Mail]
 *     summary: Send file pickup notification email.
 *     parameters:
 *       - in: query
 *         name: to
 *         schema: { type: string, format: email }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /sendCheer:
 *   get:
 *     tags: [Mail]
 *     summary: Send cheer email.
 *     parameters:
 *       - in: query
 *         name: to
 *         schema: { type: string, format: email }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /courses:
 *   get:
 *     tags: [Courses]
 *     summary: List all courses.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /courses/all:
 *   get:
 *     tags: [Courses]
 *     summary: List public courses.
 *     security: []
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /courses/course:
 *   get:
 *     tags: [Courses]
 *     summary: Get one course by name.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *   post:
 *     tags: [Courses]
 *     summary: Create a course.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Created'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *   patch:
 *     tags: [Courses]
 *     summary: Update a course.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/Course'
 *               - type: object
 *                 properties:
 *                   oldname: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *   delete:
 *     tags: [Courses]
 *     summary: Delete a course by name.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *
 * /admins/admin:
 *   get:
 *     tags: [Admin]
 *     summary: Get current admin profile.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /admins/income:
 *   get:
 *     tags: [Admin]
 *     summary: Get income statistics.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /admins/outcome:
 *   get:
 *     tags: [Admin]
 *     summary: Get outcome statistics.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /admins/stat:
 *   get:
 *     tags: [Admin]
 *     summary: Get access statistics.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /classes:
 *   get:
 *     tags: [Classes]
 *     summary: List classes.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /classes/class:
 *   get:
 *     tags: [Classes]
 *     summary: Get one class by name.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   post:
 *     tags: [Classes]
 *     summary: Create a class.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Created'
 *   patch:
 *     tags: [Classes]
 *     summary: Update a class.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/Class'
 *               - type: object
 *                 properties:
 *                   oldname: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   delete:
 *     tags: [Classes]
 *     summary: Delete a class by name.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /staffs/stat:
 *   get:
 *     tags: [Staff]
 *     summary: Get staff, teacher, and student totals.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /staffs/staff:
 *   get:
 *     tags: [Staff]
 *     summary: List staff.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   patch:
 *     tags: [Staff]
 *     summary: Update staff profile.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               name: { type: string }
 *               sex: { type: string }
 *               dayofbirth: { type: string, format: date }
 *               phone: { type: string }
 *               address: { type: string }
 *               email: { type: string, format: email }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /staffs/showtimekeeping:
 *   get:
 *     tags: [Staff]
 *     summary: List staff attendance.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /staffs/timekeeping:
 *   get:
 *     tags: [Staff]
 *     summary: Get staff attendance by staff id.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   post:
 *     tags: [Staff]
 *     summary: Create monthly staff attendance row.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               month: { type: integer }
 *               year: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Created'
 *   patch:
 *     tags: [Staff]
 *     summary: Update monthly staff attendance.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               month: { type: integer }
 *               year: { type: integer }
 *               attendDate: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /staffs/salary/null:
 *   get:
 *     tags: [Staff]
 *     summary: List staff salary rows with empty status.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /staffs/salary:
 *   get:
 *     tags: [Staff]
 *     summary: List staff salary rows.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   patch:
 *     tags: [Staff]
 *     summary: Update staff salary payment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               month: { type: integer }
 *               year: { type: integer }
 *               paid: { type: number }
 *               paidStatus: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   delete:
 *     tags: [Staff]
 *     summary: Clear staff salary payment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               month: { type: integer }
 *               year: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /staffs/prize/null:
 *   get:
 *     tags: [Staff]
 *     summary: List staff prize rows with empty status.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /staffs/prize:
 *   get:
 *     tags: [Staff]
 *     summary: List staff prize rows.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   patch:
 *     tags: [Staff]
 *     summary: Update staff prize payment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               month: { type: integer }
 *               year: { type: integer }
 *               paid: { type: number }
 *               paidStatus: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   delete:
 *     tags: [Staff]
 *     summary: Clear staff prize payment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               month: { type: integer }
 *               year: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /register-logs:
 *   get:
 *     tags: [RegisterLogs]
 *     summary: List registration logs.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /register-logs/register-log:
 *   get:
 *     tags: [RegisterLogs]
 *     summary: Get one registration log by id.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /logs:
 *   get:
 *     tags: [Logs]
 *     summary: List activity logs.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /logs/log:
 *   get:
 *     tags: [Logs]
 *     summary: Get one activity log by id.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /sponsors:
 *   get:
 *     tags: [Sponsors]
 *     summary: List sponsors.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /sponsors/sponsor:
 *   post:
 *     tags: [Sponsors]
 *     summary: Create a sponsor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               amount: { type: number }
 *               status: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Created'
 *   patch:
 *     tags: [Sponsors]
 *     summary: Update a sponsor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               name: { type: string }
 *               amount: { type: number }
 *               status: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   delete:
 *     tags: [Sponsors]
 *     summary: Delete a sponsor.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /files:
 *   get:
 *     tags: [Files]
 *     summary: List teaching files.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /files/file:
 *   post:
 *     tags: [Files]
 *     summary: Create a teaching file record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idTeacher: { type: integer }
 *               idClass: { type: integer }
 *               fileName: { type: string }
 *               filetype: { type: string }
 *               fileAmount: { type: integer }
 *               fileStatus: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Created'
 *   patch:
 *     tags: [Files]
 *     summary: Update a teaching file record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               fileName: { type: string }
 *               filetype: { type: string }
 *               fileAmount: { type: integer }
 *               fileStatus: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   delete:
 *     tags: [Files]
 *     summary: Delete a teaching file record.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /emails:
 *   get:
 *     tags: [Emails]
 *     summary: List allowed registration emails.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /emails/email:
 *   post:
 *     tags: [Emails]
 *     summary: Add allowed registration email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, format: email }
 *               role: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Created'
 *   patch:
 *     tags: [Emails]
 *     summary: Update allowed registration email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               email: { type: string, format: email }
 *               role: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   delete:
 *     tags: [Emails]
 *     summary: Delete allowed registration email.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /teachers:
 *   get:
 *     tags: [Teachers]
 *     summary: List teachers.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /teachers/teacher:
 *   patch:
 *     tags: [Teachers]
 *     summary: Update teacher profile.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   delete:
 *     tags: [Teachers]
 *     summary: Delete teacher.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /students:
 *   get:
 *     tags: [Students]
 *     summary: List students.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /students/student:
 *   patch:
 *     tags: [Students]
 *     summary: Update student profile.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   delete:
 *     tags: [Students]
 *     summary: Delete student.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /studentjoinclasses:
 *   get:
 *     tags: [StudentJoinClass]
 *     summary: List student-class records.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /studentjoinclasses/student:
 *   get:
 *     tags: [StudentJoinClass]
 *     summary: Get current student's class records.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /studentjoinclasses/class:
 *   post:
 *     tags: [StudentJoinClass]
 *     summary: Add a student to a class.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idStudent: { type: integer }
 *               idClass: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Created'
 *   delete:
 *     tags: [StudentJoinClass]
 *     summary: Remove a student from a class.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /studentjoinclasses/date:
 *   get:
 *     tags: [StudentJoinClass]
 *     summary: List student-class rows missing attendance date.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   patch:
 *     tags: [StudentJoinClass]
 *     summary: Update student attendance date and status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               idClass: { type: integer }
 *               attendDate: { type: integer }
 *               status: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /studentjoinclasses/null-prize:
 *   get:
 *     tags: [StudentJoinClass]
 *     summary: List student prize rows missing status.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /studentjoinclasses/null-salary:
 *   get:
 *     tags: [StudentJoinClass]
 *     summary: List student salary rows missing status.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /studentjoinclasses/prize:
 *   get:
 *     tags: [StudentJoinClass]
 *     summary: List student prize rows.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   patch:
 *     tags: [StudentJoinClass]
 *     summary: Update student prize status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               prizeStatus: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   delete:
 *     tags: [StudentJoinClass]
 *     summary: Clear student prize status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /studentjoinclasses/salary:
 *   get:
 *     tags: [StudentJoinClass]
 *     summary: List student salary rows.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   patch:
 *     tags: [StudentJoinClass]
 *     summary: Update student salary status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               paidStatus: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   delete:
 *     tags: [StudentJoinClass]
 *     summary: Clear student salary status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /studentjoinclasses/rating:
 *   get:
 *     tags: [StudentJoinClass]
 *     summary: List student rows missing rating.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   patch:
 *     tags: [StudentJoinClass]
 *     summary: Update student skill ratings.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               listening: { type: number }
 *               writing: { type: number }
 *               speaking: { type: number }
 *               reading: { type: number }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /teacherjoinclasses:
 *   get:
 *     tags: [TeacherJoinClass]
 *     summary: List teacher-class records.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /teacherjoinclasses/teacher:
 *   get:
 *     tags: [TeacherJoinClass]
 *     summary: Get current teacher's class records.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /teacherjoinclasses/class:
 *   post:
 *     tags: [TeacherJoinClass]
 *     summary: Add a teacher to a class.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idTeacher: { type: integer }
 *               idClass: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Created'
 *   delete:
 *     tags: [TeacherJoinClass]
 *     summary: Remove a teacher from a class.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /teacherjoinclasses/date:
 *   get:
 *     tags: [TeacherJoinClass]
 *     summary: List teacher-class rows missing attendance date.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   patch:
 *     tags: [TeacherJoinClass]
 *     summary: Update teacher attendance date and status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               idClass: { type: integer }
 *               attendDate: { type: integer }
 *               status: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /teacherjoinclasses/null-prize:
 *   get:
 *     tags: [TeacherJoinClass]
 *     summary: List teacher prize rows missing status.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /teacherjoinclasses/null-salary:
 *   get:
 *     tags: [TeacherJoinClass]
 *     summary: List teacher salary rows missing status.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /teacherjoinclasses/prize:
 *   get:
 *     tags: [TeacherJoinClass]
 *     summary: List teacher prize rows.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   patch:
 *     tags: [TeacherJoinClass]
 *     summary: Update teacher prize status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               prizeStatus: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   delete:
 *     tags: [TeacherJoinClass]
 *     summary: Clear teacher prize status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /teacherjoinclasses/salary:
 *   get:
 *     tags: [TeacherJoinClass]
 *     summary: List teacher salary rows.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   patch:
 *     tags: [TeacherJoinClass]
 *     summary: Update teacher salary status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               paidStatus: { type: string }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   delete:
 *     tags: [TeacherJoinClass]
 *     summary: Clear teacher salary status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *
 * /teacherjoinclasses/rating:
 *   get:
 *     tags: [TeacherJoinClass]
 *     summary: List teacher rows missing rating.
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 *   patch:
 *     tags: [TeacherJoinClass]
 *     summary: Update teacher rating.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               rating: { type: number }
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Ok'
 */

module.exports = {};
