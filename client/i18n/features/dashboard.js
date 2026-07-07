/**
 * i18n/features/dashboard.js — Dashboard stats, page headings, sidebar
 */
const labelsDashboard = {
  // Stats
  'stat.access':        {vi: 'Lượt truy cập',       en: 'Total Accesses', es: 'Accesos totales', fr: 'Accès totaux',  de: 'Gesamtzugriffe', it: 'Accessi totali', ca: 'Accessos totals'},
  'stat.students':      {vi: 'Học viên',             en: 'Students',       es: 'Estudiantes',     fr: 'Étudiants',     de: 'Schüler',        it: 'Studenti',       ca: 'Estudiants'},
  'stat.teachers':      {vi: 'Giảng viên',           en: 'Teachers',       es: 'Profesores',      fr: 'Enseignants',   de: 'Lehrer',         it: 'Insegnanti',     ca: 'Professors'},
  'stat.staff':         {vi: 'Nhân viên',            en: 'Staff',          es: 'Personal',        fr: 'Personnel',     de: 'Personal',       it: 'Personale',      ca: 'Personal'},
  'stat.access_count':  {vi: 'Số lượng truy cập',   en: 'Total Accesses', es: 'Accesos totales', fr: 'Accès totaux',  de: 'Gesamtzugriffe', it: 'Accessi totali', ca: 'Accessos totals'},
  'stat.student_count': {vi: 'Số lượng học viên',   en: 'Total Students', es: 'Total estudiantes',fr: 'Total étudiants',de: 'Schüler gesamt', it: 'Studenti totali', ca: 'Total estudiants'},
  'stat.teacher_count': {vi: 'Số lượng giảng viên', en: 'Total Teachers', es: 'Total profesores',  fr: 'Total enseignants',de: 'Lehrer gesamt', it: 'Insegnanti totali', ca: 'Total professors'},
  'stat.staff_count':   {vi: 'Số lượng nhân viên',  en: 'Total Staff',    es: 'Total personal',    fr: 'Total personnel',de: 'Personal gesamt', it: 'Personale totale', ca: 'Total personal'},

  // Page headings
  'page.overview':       {vi: 'Tổng quan',                   en: 'Overview',             es: 'Resumen',           fr: 'Aperçu',             de: 'Übersicht',       it: 'Panoramica',         ca: 'Resum'},
  'page.salary_fund':    {vi: 'Quỹ lương',                   en: 'Salary Fund',          es: 'Fondo salarial',    fr: 'Fonds salaires',     de: 'Gehaltsfonds',    it: 'Fondo stipendi',     ca: 'Fons salaris'},
  'page.payment':        {vi: 'Chi trả',                     en: 'Payment',              es: 'Pago',              fr: 'Paiement',           de: 'Zahlung',         it: 'Pagamento',          ca: 'Pagament'},
  'page.access_log':     {vi: 'Lịch sử truy cập',           en: 'Access History',       es: 'Historial acceso',  fr: "Historique d'accès", de: 'Zugriffshistorie', it: 'Cronologia accessi', ca: "Historial d'accés"},
  'page.register_log':   {vi: 'Đăng ký',                    en: 'Registration',         es: 'Registro',          fr: 'Inscription',        de: 'Anmeldung',       it: 'Registrazione',      ca: 'Registre'},
  'page.staff_portal':   {vi: 'Cổng quản lý học viên và giảng viên', en: 'Student & Teacher Portal', es: 'Portal estudiantes y profesores', fr: 'Portail étudiants et enseignants', de: 'Schüler- und Lehrerportal', it: 'Portale studenti e insegnanti', ca: "Portal d'estudiants i professors"},
  'page.tuition':        {vi: 'Học phí',                    en: 'Tuition',              es: 'Matrícula',         fr: 'Frais scolaires',    de: 'Studiengebühren', it: 'Retta',              ca: 'Matrícula'},
  'page.scholarship':    {vi: 'Học bổng',                   en: 'Scholarship',          es: 'Beca',              fr: 'Bourse',             de: 'Stipendium',      it: 'Borsa di studio',    ca: 'Beca'},
  'page.admin_dashboard':{vi: 'Bảng điều khiển quản trị',  en: 'Administrator Dashboard', es: 'Panel de administración', fr: "Tableau de bord administrateur", de: 'Administrator-Dashboard', it: 'Dashboard amministratore', ca: "Tauler d'administrador"},

  // Sidebar
  'sidebar.stat':             {vi: 'Thống kê',              en: 'Statistics',          es: 'Estadísticas',          fr: 'Statistiques',           de: 'Statistiken',         it: 'Statistiche',           ca: 'Estadístiques'},
  'sidebar.stat_financial':   {vi: 'Thống kê tài chính',   en: 'Financial Stats',     es: 'Estadísticas financieras', fr: 'Statistiques financières', de: 'Finanzstatistiken', it: 'Statistiche finanziarie', ca: 'Estadístiques financeres'},
  'sidebar.stat_access':      {vi: 'Thống kê truy cập',    en: 'Access Logs',         es: 'Registros de acceso',   fr: "Journaux d'accès",        de: 'Zugriffsprotokolle',  it: 'Log di accesso',          ca: "Registres d'accés"},
  'sidebar.manage_class':     {vi: 'Quản lý lớp học',      en: 'Class Management',    es: 'Gestión de clases',     fr: 'Gestion des classes',     de: 'Klassenverwaltung',   it: 'Gestione classi',         ca: 'Gestió de classes'},
  'sidebar.classes':          {vi: 'Lớp học',              en: 'Classes',             es: 'Clases',                fr: 'Classes',                 de: 'Klassen',             it: 'Classi',                  ca: 'Classes'},
  'sidebar.courses':          {vi: 'Khóa học',             en: 'Courses',             es: 'Cursos',                fr: 'Cours',                   de: 'Kurse',               it: 'Corsi',                   ca: 'Cursos'},
  'sidebar.manage_staff':     {vi: 'Quản lý nhân viên',    en: 'Staff Management',    es: 'Gestión del personal',  fr: 'Gestion du personnel',    de: 'Personalverwaltung',  it: 'Gestione del personale',  ca: 'Gestió del personal'},
  'sidebar.staff_info':       {vi: 'Thông tin nhân viên',  en: 'Staff Info',          es: 'Info del personal',     fr: 'Info personnel',          de: 'Personalinfo',        it: 'Info personale',          ca: 'Info del personal'},
  'sidebar.attendance':       {vi: 'Chấm công',            en: 'Attendance',          es: 'Asistencia',            fr: 'Présence',                de: 'Anwesenheit',         it: 'Presenze',                ca: 'Assistència'},
  'sidebar.salary':           {vi: 'Lương và thưởng',      en: 'Salary & Bonus',      es: 'Salario y bonificación',fr: 'Salaire et prime',        de: 'Gehalt und Bonus',    it: 'Stipendio e bonus',       ca: 'Salari i bonus'},
  'sidebar.student_teacher':  {vi: 'Học viên và giảng viên', en: 'Students & Teachers', es: 'Estudiantes y profesores', fr: 'Étudiants et enseignants', de: 'Schüler und Lehrer', it: 'Studenti e insegnanti', ca: 'Estudiants i professors'},
  'sidebar.manage_student':   {vi: 'Quản lý học viên',     en: 'Student Management',  es: 'Gestión de estudiantes',fr: 'Gestion des étudiants',   de: 'Schülerverwaltung',   it: 'Gestione studenti',       ca: "Gestió d'estudiants"},
  'sidebar.student_info':     {vi: 'Thông tin học viên',   en: 'Student Info',        es: 'Info del estudiante',   fr: 'Info étudiant',           de: 'Schülerinfo',         it: 'Info studente',           ca: "Info de l'estudiant"},
  'sidebar.daily_attend':     {vi: 'Điểm danh hằng ngày', en: 'Daily Attendance',    es: 'Asistencia diaria',     fr: 'Présence quotidienne',    de: 'Tägliche Anwesenheit',it: 'Presenze giornaliere',    ca: 'Assistència diària'},
  'sidebar.student_mark':     {vi: 'Điểm của học viên',   en: 'Student Grades',      es: 'Calificaciones del estudiante', fr: 'Notes des étudiants', de: 'Schülernoten',     it: 'Voti degli studenti',     ca: 'Notes dels estudiants'},
  'sidebar.tuition':          {vi: 'Học phí và học bổng', en: 'Tuition & Scholarship', es: 'Matrícula y beca',   fr: 'Frais et bourse',         de: 'Studiengebühren und Stipendium', it: 'Retta e borsa di studio', ca: 'Matrícula i beca'},
  'sidebar.manage_teacher':   {vi: 'Quản lý giảng viên',  en: 'Teacher Management',  es: 'Gestión de profesores', fr: 'Gestion des enseignants', de: 'Lehrerverwaltung',    it: 'Gestione insegnanti',     ca: 'Gestió de professors'},
  'sidebar.teacher_info':     {vi: 'Thông tin giảng viên',en: 'Teacher Info',         es: 'Info del profesor',     fr: 'Info enseignant',         de: 'Lehrerinfo',          it: 'Info insegnante',         ca: 'Info del professor'},
  'sidebar.teacher_rate':     {vi: 'Đánh giá giảng viên', en: 'Teacher Ratings',     es: 'Calificaciones del profesor', fr: 'Évaluations des enseignants', de: 'Lehrerbewertungen', it: 'Valutazioni degli insegnanti', ca: 'Valoracions dels professors'},
  'sidebar.documents':        {vi: 'Tài liệu',            en: 'Documents',           es: 'Documentos',            fr: 'Documents',               de: 'Dokumente',           it: 'Documenti',               ca: 'Documents'},
  'sidebar.account_info':     {vi: 'Thông tin tài khoản', en: 'Account Info',        es: 'Información de la cuenta', fr: 'Informations du compte', de: 'Kontoinformationen', it: "Informazioni sull'account", ca: 'Informació del compte'},
  'sidebar.copyright':        {vi: 'Bản quyền',           en: 'All Rights Reserved', es: 'Todos los derechos reservados', fr: 'Tous droits réservés', de: 'Alle Rechte vorbehalten', it: 'Tutti i diritti riservati', ca: 'Tots els drets reservats'},
};
