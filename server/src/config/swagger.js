// =============================================================
// Swagger / OpenAPI configuration
// Docs available at GET /api-docs
// =============================================================

'use strict';

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'BK English Center API',
      version: '2.0.0',
      description: 'REST API for the BK English Center management system.',
      contact: {
        name: 'BK English Center',
        email: 'support@bkec.edu.vn',
      },
    },
    servers: [
      { url: '/api', description: 'Docker (nginx proxied)' },
      { url: 'http://localhost:3000', description: 'Local dev' },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            check: { type: 'boolean', example: false },
            msg: { type: 'string', example: 'An error occurred' },
          },
        },
        Success: {
          type: 'object',
          properties: {
            check: { type: 'boolean', example: true },
          },
        },
        // ── User ──────────────────────────────────────────────
        LoginResponse: {
          type: 'object',
          properties: {
            check: { type: 'boolean' },
            apitoken: { type: 'string' },
            role: { type: 'string', enum: ['student', 'teacher', 'staff', 'admin'] },
          },
        },
        // ── Course ────────────────────────────────────────────
        Course: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            intro: { type: 'string' },
            img: { type: 'string' },
            short: { type: 'string' },
            description: { type: 'string' },
            paidStudent: { type: 'integer' },
            prizeStudent: { type: 'integer' },
            paidTeacher: { type: 'integer' },
            prizeTeacher: { type: 'integer' },
            maxAttendDate: { type: 'integer' },
            version: { type: 'integer' },
          },
        },
        // ── Class ─────────────────────────────────────────────
        Class: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            idCourse: { type: 'integer' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            maxStudent: { type: 'integer' },
            address: { type: 'string' },
            schedule: { type: 'string' },
            version: { type: 'integer' },
          },
        },
        // ── Student ───────────────────────────────────────────
        Student: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            sex: { type: 'string', enum: ['male', 'female', 'other'] },
            dateofbirth: { type: 'string', format: 'date' },
            phone: { type: 'string' },
            address: { type: 'string' },
            image: { type: 'string' },
            version: { type: 'integer' },
          },
        },
        // ── Teacher ───────────────────────────────────────────
        Teacher: {
          allOf: [{ $ref: '#/components/schemas/Student' }],
        },
      },
    },
    security: [{ BearerAuth: [] }],
    tags: [
      { name: 'Auth', description: 'Authentication & registration' },
      { name: 'Courses', description: 'Course management' },
      { name: 'Classes', description: 'Class management' },
      { name: 'Students', description: 'Student management' },
      { name: 'Teachers', description: 'Teacher management' },
      { name: 'Staff', description: 'Staff management' },
      { name: 'Admin', description: 'Admin dashboard & stats' },
      { name: 'StudentJoinClass', description: 'Student-class enrollment & grades' },
      { name: 'TeacherJoinClass', description: 'Teacher-class assignment' },
      { name: 'Logs', description: 'Activity logs' },
      { name: 'RegisterLogs', description: 'Registration logs' },
      { name: 'Sponsors', description: 'Sponsor management' },
      { name: 'Files', description: 'Teaching material tracking' },
      { name: 'Emails', description: 'Email whitelist management' },
      { name: 'Mail', description: 'Email dispatch (OTP, notifications)' },
    ],
  },
  // Scan all route files for @swagger JSDoc blocks
  apis: ['./routes/*.js', './src/controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
