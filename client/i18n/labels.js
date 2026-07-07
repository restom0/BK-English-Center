/**
 * i18n/labels.js — BK English Center  (auto-bundled from i18n/features/*)
 *
 * Edit individual feature files, then this file is regenerated:
 *   i18n/features/nav.js        → Navigation links
 *   i18n/features/auth.js       → Login / register / role-selection pages
 *   i18n/features/common.js     → Shared actions, fields, labels, placeholders, selects
 *   i18n/features/course.js     → Course and Class management
 *   i18n/features/attendance.js → Attendance statuses
 *   i18n/features/finance.js    → Finance, salary, tuition
 *   i18n/features/dashboard.js  → Dashboard stats, page headings, sidebar
 *   i18n/features/ui.js         → Toasts, confirms, table headers, status values, validation
 *
 * Usage:
 *   i18n.setLang('en');
 *   i18n.t('nav.home');                           // → "Home"
 *   i18n.t('confirm.editing', { name: 'Alice' }); // → "You are editing the info of Alice"
 */

const LANGUAGES = {
  vi: 'Tiếng Việt',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  ca: 'Català',
};

const labels = {

  // ── Feature: nav ─────────────────────────────────────────────────────────────
  'nav.home':       {vi: 'Trang chủ', en: 'Home',    es: 'Inicio',  fr: 'Accueil',  de: 'Startseite', it: 'Home',    ca: 'Inici'},
  'nav.courses':    {vi: 'Khóa học',  en: 'Courses', es: 'Cursos',  fr: 'Cours',    de: 'Kurse',      it: 'Corsi',   ca: 'Cursos'},
  'nav.my_courses': {vi: 'Khóa học của tôi', en: 'My Courses',  es: 'Mis cursos',  fr: 'Mes cours',    de: 'Meine Kurse',  it: 'I miei corsi',  ca: 'Els meus cursos'},
  'nav.my_class':   {vi: 'Lớp học của tôi',  en: 'My Classes',  es: 'Mis clases',  fr: 'Mes classes',  de: 'Meine Klassen',it: 'Le mie classi', ca: 'Les meves classes'},
  'nav.my_page':    {vi: 'Trang của tôi',    en: 'My Page',     es: 'Mi página',   fr: 'Ma page',      de: 'Meine Seite',  it: 'La mia pagina', ca: 'La meva pàgina'},
  'nav.contact':    {vi: 'Liên hệ',          en: 'Contact',     es: 'Contacto',    fr: 'Contact',      de: 'Kontakt',      it: 'Contatto',      ca: 'Contacte'},
  'nav.about':      {vi: 'Giới thiệu',       en: 'About',       es: 'Acerca de',   fr: 'À propos',     de: 'Über uns',     it: 'Chi siamo',     ca: 'Sobre nosaltres'},
  'nav.login':      {vi: 'Đăng nhập', en: 'Login',   es: 'Iniciar sesión', fr: 'Connexion',    de: 'Anmelden',     it: 'Accedi',        ca: 'Iniciar sessió'},
  'nav.logout':     {vi: 'Đăng xuất', en: 'Logout',  es: 'Cerrar sesión',  fr: 'Déconnexion',  de: 'Abmelden',     it: 'Esci',          ca: 'Tancar sessió'},
  'nav.signup':     {vi: 'Đăng ký',   en: 'Sign Up', es: 'Registrarse',    fr: "S'inscrire",   de: 'Registrieren', it: 'Registrati',    ca: 'Registrar-se'},

  // ── Feature: auth ─────────────────────────────────────────────────────────────
  'auth.username':          {vi: 'Tài khoản',     en: 'Username',  es: 'Usuario',       fr: "Nom d'utilisateur", de: 'Benutzername', it: 'Nome utente', ca: "Nom d'usuari"},
  'auth.password':          {vi: 'Mật khẩu',      en: 'Password',  es: 'Contraseña',    fr: 'Mot de passe',      de: 'Passwort',     it: 'Password',    ca: 'Contrasenya'},
  'auth.confirm_password':  {vi: 'Nhập lại mật khẩu', en: 'Confirm password', es: 'Confirmar contraseña', fr: 'Confirmer le mot de passe', de: 'Passwort bestätigen', it: 'Conferma password', ca: 'Confirmar contrasenya'},
  'auth.login_btn':         {vi: 'Đăng nhập',     en: 'Sign In',   es: 'Entrar',        fr: 'Se connecter',      de: 'Einloggen',    it: 'Accedi',      ca: 'Entrar'},
  'auth.register_btn':      {vi: 'Đăng ký',       en: 'Register',  es: 'Registrarse',   fr: "S'inscrire",        de: 'Registrieren', it: 'Registrati',  ca: 'Registrar-se'},
  'auth.forgot_pass':       {vi: 'Quên mật khẩu?', en: 'Forgot password?', es: '¿Olvidé mi contraseña?', fr: 'Mot de passe oublié ?', de: 'Passwort vergessen?', it: 'Password dimenticata?', ca: 'Heu oblidat la contrasenya?'},
  'auth.send_otp':          {vi: 'Gửi mã xác thực', en: 'Send OTP', es: 'Enviar OTP', fr: 'Envoyer OTP', de: 'OTP senden', it: 'Invia OTP', ca: 'Enviar OTP'},
  'auth.otp_code':          {vi: 'Mã xác thực',   en: 'OTP Code',  es: 'Código OTP',    fr: 'Code OTP',          de: 'OTP-Code',     it: 'Codice OTP',  ca: 'Codi OTP'},
  'auth.role':              {vi: 'Vai trò',        en: 'Role',      es: 'Rol',           fr: 'Rôle',              de: 'Rolle',        it: 'Ruolo',       ca: 'Rol'},
  'auth.role_student':      {vi: 'Học viên',       en: 'Student',   es: 'Estudiante',    fr: 'Étudiant',          de: 'Student',      it: 'Studente',    ca: 'Estudiant'},
  'auth.role_teacher':      {vi: 'Giảng viên',     en: 'Teacher',   es: 'Profesor',      fr: 'Enseignant',        de: 'Lehrer',       it: 'Insegnante',  ca: 'Professor'},
  'auth.role_staff':        {vi: 'Nhân viên',      en: 'Staff',     es: 'Personal',      fr: 'Personnel',         de: 'Personal',     it: 'Personale',   ca: 'Personal'},
  'auth.role_admin':        {vi: 'Quản trị viên',  en: 'Admin',     es: 'Administrador', fr: 'Administrateur',    de: 'Administrator',it: 'Amministratore', ca: 'Administrador'},
  'auth.login_title':       {vi: 'Đăng nhập',        en: 'Sign In',         es: 'Iniciar sesión',    fr: 'Connexion',           de: 'Anmelden',           it: 'Accedi',             ca: 'Inicia sessió'},
  'auth.signup_title':      {vi: 'Đăng ký',           en: 'Register',        es: 'Registrarse',       fr: "S'inscrire",          de: 'Registrieren',       it: 'Registrati',         ca: 'Registrar-se'},
  'auth.choose_role':       {vi: 'Đăng nhập dành cho', en: 'Sign in as',    es: 'Iniciar sesión como', fr: 'Se connecter en tant que', de: 'Anmelden als',  it: 'Accedi come',        ca: 'Inicia sessió com a'},
  'auth.forgot_pass_title': {vi: 'Quên mật khẩu',   en: 'Forgot Password', es: 'Olvidé mi contraseña', fr: 'Mot de passe oublié', de: 'Passwort vergessen', it: 'Password dimenticata', ca: 'Contrasenya oblidada'},
  'auth.signup_promo':      {vi: 'Đăng ký ngay',      en: 'Sign Up Today',   es: 'Regístrate hoy',    fr: 'Inscrivez-vous',      de: 'Jetzt registrieren', it: 'Iscriviti ora',       ca: "Registra't avui"},
  'auth.signup_desc':       {vi: 'Nhận liền khóa học hay.', en: 'Get great courses instantly.', es: 'Obtén excelentes cursos al instante.', fr: 'Obtenez des cours de qualité instantanément.', de: 'Erhalten Sie sofort großartige Kurse.', it: 'Ottieni subito ottimi corsi.', ca: 'Obteniu cursos excel·lents immediatament.'},
  'auth.view_courses':      {vi: 'Xem thêm các khóa học của chúng tôi', en: 'View our courses', es: 'Ver nuestros cursos', fr: 'Voir nos cours', de: 'Unsere Kurse ansehen', it: 'Vedi i nostri corsi', ca: 'Veure els nostres cursos'},
  'auth.remember_me':       {vi: 'Ghi nhớ tài khoản', en: 'Remember me', es: 'Recordarme', fr: 'Se souvenir de moi', de: 'Angemeldet bleiben', it: 'Ricordami', ca: "Recorda'm"},
  'auth.no_account':        {vi: 'Chưa có tài khoản?', en: 'No account yet?', es: '¿Sin cuenta?', fr: 'Pas encore de compte ?', de: 'Noch kein Konto?', it: 'Nessun account?', ca: 'Sense compte?'},
  'auth.signup_now':        {vi: 'Đăng ký ngay',       en: 'Sign up now',    es: 'Regístrate ahora', fr: 'Inscrivez-vous maintenant', de: 'Jetzt registrieren', it: 'Registrati ora', ca: "Registra't ara"},
  'auth.send_new_pass':     {vi: 'Gửi mật khẩu mới',  en: 'Send New Password', es: 'Enviar nueva contraseña', fr: 'Envoyer le nouveau mot de passe', de: 'Neues Passwort senden', it: 'Invia nuova password', ca: 'Enviar nova contrasenya'},
  'auth.terms_agree':       {vi: 'Bằng cách nhấp vào Đăng ký, bạn đồng ý với', en: 'By clicking Register, you agree to our', es: 'Al hacer clic en Registrarse, aceptas nuestros', fr: "En cliquant sur S'inscrire, vous acceptez nos", de: 'Mit Klick auf Registrieren stimmen Sie unseren zu', it: 'Facendo clic su Registrati, accetti i nostri', ca: "En fer clic a Registrar-se, acceptes els nostres"},
  'auth.terms_link':        {vi: 'Điều khoản',          en: 'Terms',       es: 'Términos',   fr: 'Conditions', de: 'Nutzungsbedingungen', it: 'Termini',  ca: 'Condicions'},
  'auth.privacy_link':      {vi: 'Chính sách quyền riêng tư', en: 'Privacy Policy', es: 'Política de privacidad', fr: 'Politique de confidentialité', de: 'Datenschutzrichtlinie', it: 'Informativa sulla privacy', ca: 'Política de privadesa'},
  'auth.cookie_link':       {vi: 'Chính sách cookie',   en: 'Cookie Policy', es: 'Política de cookies', fr: 'Politique de cookies', de: 'Cookie-Richtlinie', it: 'Politica sui cookie', ca: 'Política de cookies'},
  'auth.have_account':      {vi: 'Đã có tài khoản?',    en: 'Already have an account?', es: '¿Ya tienes cuenta?', fr: 'Vous avez déjà un compte ?', de: 'Haben Sie bereits ein Konto?', it: 'Hai già un account?', ca: 'Ja teniu compte?'},
  'auth.login_now':         {vi: 'Đăng nhập ngay',      en: 'Sign in now', es: 'Inicia sesión ahora', fr: 'Connectez-vous maintenant', de: 'Jetzt anmelden', it: 'Accedi ora', ca: 'Inicia sessió ara'},
  'auth.receive_otp':       {vi: 'Nhận mã xác thực',    en: 'Get OTP',    es: 'Obtener OTP', fr: 'Obtenir le code OTP', de: 'OTP erhalten', it: 'Ottieni OTP', ca: 'Obtenir OTP'},
  'auth.account_info':      {vi: 'Thông tin tài khoản', en: 'Account Info', es: 'Info de cuenta', fr: 'Infos du compte', de: 'Kontoinformationen', it: 'Informazioni account', ca: 'Informació del compte'},

  // ── Feature: common — actions ─────────────────────────────────────────────────
  'action.add':           {vi: 'Thêm',          en: 'Add',          es: 'Agregar',      fr: 'Ajouter',       de: 'Hinzufügen',  it: 'Aggiungi',  ca: 'Afegeix'},
  'action.edit':          {vi: 'Chỉnh sửa',     en: 'Edit',         es: 'Editar',       fr: 'Modifier',      de: 'Bearbeiten',  it: 'Modifica',  ca: 'Edita'},
  'action.delete':        {vi: 'Xóa',           en: 'Delete',       es: 'Eliminar',     fr: 'Supprimer',     de: 'Löschen',     it: 'Elimina',   ca: 'Suprimeix'},
  'action.save':          {vi: 'Lưu thay đổi',  en: 'Save Changes', es: 'Guardar cambios', fr: 'Enregistrer', de: 'Änderungen speichern', it: 'Salva modifiche', ca: 'Desa els canvis'},
  'action.cancel':        {vi: 'Hủy',           en: 'Cancel',       es: 'Cancelar',     fr: 'Annuler',       de: 'Abbrechen',   it: 'Annulla',   ca: 'Cancel·la'},
  'action.confirm':       {vi: 'Xác nhận',      en: 'Confirm',      es: 'Confirmar',    fr: 'Confirmer',     de: 'Bestätigen',  it: 'Conferma',  ca: 'Confirmar'},
  'action.search':        {vi: 'Tìm kiếm',      en: 'Search',       es: 'Buscar',       fr: 'Rechercher',    de: 'Suchen',      it: 'Cerca',     ca: 'Cercar'},
  'action.send_email':    {vi: 'Gửi email',     en: 'Send Email',   es: 'Enviar email', fr: 'Envoyer email', de: 'E-Mail senden', it: 'Invia email', ca: 'Enviar email'},
  'action.view_detail':   {vi: 'Chi tiết',      en: 'Detail',       es: 'Detalle',      fr: 'Détail',        de: 'Detail',      it: 'Dettaglio', ca: 'Detall'},
  'action.view_more':     {vi: 'Xem thêm',      en: 'View More',    es: 'Ver más',      fr: 'Voir plus',     de: 'Mehr anzeigen', it: 'Vedi altro', ca: 'Veure més'},
  'action.collapse':      {vi: 'Thu gọn',       en: 'Collapse',     es: 'Contraer',     fr: 'Réduire',       de: 'Einklappen',  it: 'Comprimi',  ca: 'Reduir'},
  'action.change':        {vi: 'Thay đổi',      en: 'Change',       es: 'Cambiar',      fr: 'Modifier',      de: 'Ändern',      it: 'Cambia',    ca: 'Canvia'},
  'action.mark':          {vi: 'Điểm danh',     en: 'Mark Attendance', es: 'Tomar asistencia', fr: 'Pointer', de: 'Anwesenheit erfassen', it: 'Appello', ca: 'Passar llista'},
  'action.warn':          {vi: 'Cảnh cáo',      en: 'Warn',         es: 'Advertir',     fr: 'Avertir',       de: 'Verwarnen',   it: 'Avvisare',  ca: 'Avisar'},
  'action.commend':       {vi: 'Tuyên dương',   en: 'Commend',      es: 'Elogiar',      fr: 'Féliciter',     de: 'Loben',       it: 'Elogiare',  ca: 'Felicitar'},
  'action.detail':        {vi: 'Chi tiết',      en: 'Details',      es: 'Detalles',     fr: 'Détails',       de: 'Details',     it: 'Dettagli',  ca: 'Detalls'},
  'action.notify_salary': {vi: 'Thông báo nhận lương',  en: 'Notify Salary', es: 'Notificar salario', fr: 'Notifier salaire', de: 'Gehalt benachrichtigen', it: 'Notifica stipendio', ca: 'Notifica salari'},
  'action.notify_bonus':  {vi: 'Thông báo nhận thưởng', en: 'Notify Bonus',  es: 'Notificar bono',    fr: 'Notifier bonus',   de: 'Bonus benachrichtigen',  it: 'Notifica bonus',     ca: 'Notifica bonus'},

  // ── Feature: common — fields ──────────────────────────────────────────────────
  'field.name':    {vi: 'Họ và tên',     en: 'Full Name',    es: 'Nombre completo',    fr: 'Nom complet',       de: 'Vollständiger Name', it: 'Nome completo',  ca: 'Nom complet'},
  'field.email':   {vi: 'Địa chỉ email', en: 'Email',        es: 'Correo electrónico', fr: 'Email',             de: 'E-Mail',             it: 'Email',          ca: 'Correu electrònic'},
  'field.phone':   {vi: 'Số điện thoại', en: 'Phone',        es: 'Teléfono',           fr: 'Téléphone',         de: 'Telefon',            it: 'Telefono',       ca: 'Telèfon'},
  'field.dob':     {vi: 'Ngày sinh',     en: 'Date of Birth',es: 'Fecha de nacimiento',fr: 'Date de naissance', de: 'Geburtsdatum',       it: 'Data di nascita',ca: 'Data de naixement'},
  'field.gender':  {vi: 'Giới tính',     en: 'Gender',       es: 'Género',             fr: 'Genre',             de: 'Geschlecht',         it: 'Genere',         ca: 'Gènere'},
  'field.gender_m':{vi: 'Nam',           en: 'Male',         es: 'Masculino',          fr: 'Masculin',          de: 'Männlich',           it: 'Maschio',        ca: 'Masculí'},
  'field.gender_f':{vi: 'Nữ',           en: 'Female',       es: 'Femenino',           fr: 'Féminin',           de: 'Weiblich',           it: 'Femmina',        ca: 'Femení'},
  'field.address': {vi: 'Địa chỉ',       en: 'Address',      es: 'Dirección',          fr: 'Adresse',           de: 'Adresse',            it: 'Indirizzo',      ca: 'Adreça'},
  'field.id':      {vi: 'Mã số',         en: 'ID',           es: 'ID',                 fr: 'ID',                de: 'ID',                 it: 'ID',             ca: 'ID'},
  'field.status':  {vi: 'Trạng thái',    en: 'Status',       es: 'Estado',             fr: 'Statut',            de: 'Status',             it: 'Stato',          ca: 'Estat'},
  'field.date':    {vi: 'Ngày',          en: 'Date',         es: 'Fecha',              fr: 'Date',              de: 'Datum',              it: 'Data',           ca: 'Data'},
  'field.action':  {vi: 'Thao tác',      en: 'Action',       es: 'Acción',             fr: 'Action',            de: 'Aktion',             it: 'Azione',         ca: 'Acció'},
  'field.note':    {vi: 'Ghi chú',       en: 'Note',         es: 'Nota',               fr: 'Note',              de: 'Notiz',              it: 'Nota',           ca: 'Nota'},

  // ── Feature: common — labels ──────────────────────────────────────────────────
  'label.full_name':      {vi: 'Họ và tên',         en: 'Full Name',         es: 'Nombre completo',   fr: 'Nom complet',        de: 'Vollständiger Name',   it: 'Nome completo',        ca: 'Nom complet'},
  'label.year':           {vi: 'Năm',               en: 'Year',              es: 'Año',               fr: 'Année',              de: 'Jahr',                 it: 'Anno',                 ca: 'Any'},
  'label.month':          {vi: 'Tháng',             en: 'Month',             es: 'Mes',               fr: 'Mois',               de: 'Monat',                it: 'Mese',                 ca: 'Mes'},
  'label.gender':         {vi: 'Giới tính',         en: 'Gender',            es: 'Género',            fr: 'Genre',              de: 'Geschlecht',           it: 'Genere',               ca: 'Gènere'},
  'label.male':           {vi: 'Nam',               en: 'Male',              es: 'Masculino',         fr: 'Masculin',           de: 'Männlich',             it: 'Maschio',              ca: 'Masculí'},
  'label.female':         {vi: 'Nữ',               en: 'Female',            es: 'Femenino',          fr: 'Féminin',            de: 'Weiblich',             it: 'Femmina',              ca: 'Femení'},
  'label.address':        {vi: 'Địa chỉ',           en: 'Address',           es: 'Dirección',         fr: 'Adresse',            de: 'Adresse',              it: 'Indirizzo',            ca: 'Adreça'},
  'label.phone':          {vi: 'Số điện thoại',     en: 'Phone Number',      es: 'Teléfono',          fr: 'Téléphone',          de: 'Telefonnummer',        it: 'Telefono',             ca: 'Telèfon'},
  'label.email':          {vi: 'Địa chỉ email',     en: 'Email Address',     es: 'Correo electrónico',fr: 'Adresse e-mail',     de: 'E-Mail-Adresse',       it: 'Indirizzo email',      ca: 'Adreça de correu'},
  'label.class':          {vi: 'Lớp',               en: 'Class',             es: 'Clase',             fr: 'Classe',             de: 'Klasse',               it: 'Classe',               ca: 'Classe'},
  'label.class_name':     {vi: 'Lớp học',           en: 'Class',             es: 'Clase',             fr: 'Classe',             de: 'Klasse',               it: 'Classe',               ca: 'Classe'},
  'label.sessions':       {vi: 'Số buổi',           en: 'Sessions',          es: 'Sesiones',          fr: 'Séances',            de: 'Einheiten',            it: 'Sessioni',             ca: 'Sessions'},
  'label.quantity':       {vi: 'Số lượng',          en: 'Quantity',          es: 'Cantidad',          fr: 'Quantité',           de: 'Menge',                it: 'Quantità',             ca: 'Quantitat'},
  'label.amount':         {vi: 'Số tiền',           en: 'Amount',            es: 'Monto',             fr: 'Montant',            de: 'Betrag',               it: 'Importo',              ca: 'Import'},
  'label.status':         {vi: 'Trạng thái',        en: 'Status',            es: 'Estado',            fr: 'Statut',             de: 'Status',               it: 'Stato',                ca: 'Estat'},
  'label.role':           {vi: 'Vai trò',           en: 'Role',              es: 'Rol',               fr: 'Rôle',               de: 'Rolle',                it: 'Ruolo',                ca: 'Rol'},
  'label.rating':         {vi: 'Đánh giá',          en: 'Rating',            es: 'Evaluación',        fr: 'Évaluation',         de: 'Bewertung',            it: 'Valutazione',          ca: 'Valoració'},
  'label.description':    {vi: 'Mô tả',             en: 'Description',       es: 'Descripción',       fr: 'Description',        de: 'Beschreibung',         it: 'Descrizione',          ca: 'Descripció'},
  'label.short_desc':     {vi: 'Mô tả ngắn',        en: 'Short Description', es: 'Descripción corta', fr: 'Description courte', de: 'Kurzbeschreibung',     it: 'Descrizione breve',    ca: 'Descripció curta'},
  'label.intro':          {vi: 'Giới thiệu',        en: 'Introduction',      es: 'Introducción',      fr: 'Introduction',       de: 'Einführung',           it: 'Introduzione',         ca: 'Introducció'},
  'label.intro_img':      {vi: 'Hình giới thiệu',   en: 'Intro Image',       es: 'Imagen intro',      fr: 'Image intro',        de: 'Einführungsbild',      it: 'Immagine intro',       ca: 'Imatge intro'},
  'label.desc_img':       {vi: 'Hình mô tả',        en: 'Description Image', es: 'Imagen descripción',fr: 'Image description',  de: 'Beschreibungsbild',    it: 'Immagine descrizione', ca: 'Imatge descripció'},
  'label.duration':       {vi: 'Thời gian',         en: 'Duration',          es: 'Duración',          fr: 'Durée',              de: 'Dauer',                it: 'Durata',               ca: 'Durada'},
  'label.doc_type':       {vi: 'Loại tài liệu',     en: 'Document Type',     es: 'Tipo de documento', fr: 'Type de document',   de: 'Dokumententyp',        it: 'Tipo di documento',    ca: 'Tipus de document'},
  'label.book':           {vi: 'Sách',              en: 'Book',              es: 'Libro',             fr: 'Livre',              de: 'Buch',                 it: 'Libro',                ca: 'Llibre'},
  'label.document':       {vi: 'Tài liệu',          en: 'Document',          es: 'Documento',         fr: 'Document',           de: 'Dokument',             it: 'Documento',            ca: 'Document'},
  'label.course':         {vi: 'Khóa học',          en: 'Course',            es: 'Curso',             fr: 'Cours',              de: 'Kurs',                 it: 'Corso',                ca: 'Curs'},
  'label.staff':          {vi: 'Nhân viên',         en: 'Staff',             es: 'Personal',          fr: 'Personnel',          de: 'Personal',             it: 'Personale',            ca: 'Personal'},
  'label.max_students':   {vi: 'Sĩ số tối đa',      en: 'Max Students',      es: 'Máx. estudiantes',  fr: 'Étudiants max',       de: 'Max. Studenten',       it: 'Studenti max',         ca: 'Estudiants màx.'},
  'label.sponsor':        {vi: 'Tên nhà tài trợ',   en: 'Sponsor Name',      es: 'Nombre patrocinador',fr: 'Nom du sponsor',     de: 'Sponsorname',          it: 'Nome sponsor',         ca: 'Nom del patrocinador'},
  'label.start_date':     {vi: 'Ngày bắt đầu',      en: 'Start Date',        es: 'Fecha de inicio',   fr: 'Date de début',      de: 'Startdatum',           it: 'Data inizio',          ca: "Data d'inici"},
  'label.end_date':       {vi: 'Ngày kết thúc',     en: 'End Date',          es: 'Fecha de fin',      fr: 'Date de fin',        de: 'Enddatum',             it: 'Data fine',            ca: 'Data de fi'},
  'label.schedule':       {vi: 'Lịch học',          en: 'Schedule',          es: 'Horario',           fr: 'Calendrier',         de: 'Stundenplan',          it: 'Orario',               ca: 'Horari'},
  'label.payment':        {vi: 'Chi trả',           en: 'Payment',           es: 'Pago',              fr: 'Paiement',           de: 'Zahlung',              it: 'Pagamento',            ca: 'Pagament'},
  'label.per_month':      {vi: '1 tháng',           en: '1 Month',           es: '1 mes',             fr: '1 mois',             de: '1 Monat',              it: '1 mese',               ca: '1 mes'},
  'label.branch':         {vi: 'Cơ sở',             en: 'Branch',            es: 'Sede',              fr: 'Succursale',         de: 'Standort',             it: 'Filiale',              ca: 'Seu'},
  'label.type_payment':   {vi: 'Chi trả',           en: 'Payment',           es: 'Pago',              fr: 'Paiement',           de: 'Zahlung',              it: 'Pagamento',            ca: 'Pagament'},
  'label.type_sponsor':   {vi: 'Tài trợ',           en: 'Sponsorship',       es: 'Patrocinio',        fr: 'Parrainage',         de: 'Förderung',            it: 'Sponsorizzazione',     ca: 'Patrocini'},
  'label.sessions_unit':  {vi: 'buổi',              en: 'sessions',          es: 'sesiones',          fr: 'séances',            de: 'Einheiten',            it: 'sessioni',             ca: 'sessions'},
  'label.score_of':       {vi: 'Điểm của {name}',   en: 'Score of {name}',   es: 'Puntaje de {name}', fr: 'Score de {name}',    de: 'Punktzahl von {name}', it: 'Punteggio di {name}',  ca: 'Puntuació de {name}'},
  'label.rating_of':      {vi: 'Đánh giá của {name}', en: 'Rating for {name}', es: 'Evaluación de {name}', fr: 'Évaluation de {name}', de: 'Bewertung von {name}', it: 'Valutazione di {name}', ca: 'Valoració de {name}'},
  'label.salary':         {vi: 'Lương',             en: 'Salary',            es: 'Salario',           fr: 'Salaire',            de: 'Gehalt',               it: 'Stipendio',            ca: 'Salari'},
  'label.bonus':          {vi: 'Thưởng',            en: 'Bonus',             es: 'Bono',              fr: 'Bonus',              de: 'Bonus',                it: 'Bonus',                ca: 'Bonus'},
  'label.tuition':        {vi: 'Học phí',           en: 'Tuition',           es: 'Matrícula',         fr: 'Frais de scolarité', de: 'Studiengebühr',        it: 'Tasse scolastiche',    ca: 'Matrícula'},
  'label.scholarship':    {vi: 'Học bổng',          en: 'Scholarship',       es: 'Beca',              fr: 'Bourse',             de: 'Stipendium',           it: 'Borsa di studio',      ca: 'Beca'},
  'label.received_amount':{vi: 'Số tiền nhận',      en: 'Amount Received',   es: 'Monto recibido',    fr: 'Montant reçu',       de: 'Erhaltener Betrag',    it: 'Importo ricevuto',     ca: 'Import rebut'},
  'label.bonus_amount':   {vi: 'Số tiền thưởng',    en: 'Bonus Amount',      es: 'Monto del bono',    fr: 'Montant du bonus',   de: 'Bonusbetrag',          it: 'Importo del bonus',    ca: 'Import del bonus'},

  // ── Feature: common — placeholders & selects ──────────────────────────────────
  'placeholder.person_name': {vi: 'Nguyễn Văn A', en: 'John Doe',      es: 'Juan García',   fr: 'Jean Dupont',  de: 'Max Mustermann', it: 'Mario Rossi',   ca: 'Joan García'},
  'placeholder.search':      {vi: 'Nhập thông tin người dùng, lớp học, khóa học,...', en: 'Search by user, class, course...', es: 'Buscar usuario, clase, curso...', fr: 'Rechercher utilisateur, classe, cours...', de: 'Benutzer, Klasse, Kurs suchen...', it: 'Cerca utente, classe, corso...', ca: 'Cercar usuari, classe, curs...'},
  'placeholder.schedule':    {vi: 'Thứ 2, 4, 6',  en: 'Mon, Wed, Fri', es: 'Lun, Mié, Vie', fr: 'Lun, Mer, Ven', de: 'Mo, Mi, Fr',  it: 'Lun, Mer, Ven', ca: 'Dl, Dc, Dv'},
  'placeholder.branch':      {vi: 'Cơ sở 1',      en: 'Branch 1',      es: 'Sede 1',        fr: 'Succursale 1', de: 'Standort 1',  it: 'Filiale 1',     ca: 'Seu 1'},
  'placeholder.book':        {vi: 'Sách',          en: 'Book',          es: 'Libro',         fr: 'Livre',        de: 'Buch',        it: 'Libro',         ca: 'Llibre'},
  'placeholder.duration':    {vi: '1 tháng',       en: '1 month',       es: '1 mes',         fr: '1 mois',       de: '1 Monat',     it: '1 mese',        ca: '1 mes'},
  'select.class':     {vi: 'Chọn lớp',        en: 'Select class',    es: 'Seleccionar clase',     fr: 'Sélectionner classe',    de: 'Klasse wählen',   it: 'Seleziona classe',     ca: 'Selecciona classe'},
  'select.class_alt': {vi: 'Chọn lớp học',    en: 'Select class',    es: 'Seleccionar clase',     fr: 'Sélectionner classe',    de: 'Klasse wählen',   it: 'Seleziona classe',     ca: 'Selecciona classe'},
  'select.year':      {vi: 'Chọn năm',        en: 'Select year',     es: 'Seleccionar año',       fr: 'Sélectionner année',     de: 'Jahr wählen',     it: 'Seleziona anno',       ca: 'Selecciona any'},
  'select.month':     {vi: 'Chọn tháng',      en: 'Select month',    es: 'Seleccionar mes',       fr: 'Sélectionner mois',      de: 'Monat wählen',    it: 'Seleziona mese',       ca: 'Selecciona mes'},
  'select.status':    {vi: 'Chọn trạng thái', en: 'Select status',   es: 'Seleccionar estado',    fr: 'Sélectionner statut',    de: 'Status wählen',   it: 'Seleziona stato',      ca: 'Selecciona estat'},
  'select.staff':     {vi: 'Chọn nhân viên',  en: 'Select staff',    es: 'Seleccionar personal',  fr: 'Sélectionner personnel', de: 'Personal wählen', it: 'Seleziona personale',  ca: 'Selecciona personal'},
  'select.student':   {vi: 'Chọn học viên',   en: 'Select student',  es: 'Seleccionar estudiante',fr: 'Sélectionner étudiant',  de: 'Schüler wählen',  it: 'Seleziona studente',   ca: 'Selecciona estudiant'},
  'select.teacher':   {vi: 'Chọn giảng viên', en: 'Select teacher',  es: 'Seleccionar profesor',  fr: 'Sélectionner enseignant',de: 'Lehrer wählen',   it: 'Seleziona insegnante', ca: 'Selecciona professor'},
  'select.course':    {vi: 'Chọn khóa học',   en: 'Select course',   es: 'Seleccionar curso',     fr: 'Sélectionner cours',     de: 'Kurs wählen',     it: 'Seleziona corso',      ca: 'Selecciona curs'},

  // ── Feature: course ───────────────────────────────────────────────────────────
  'course.title':       {vi: 'Khóa học',       en: 'Course',         es: 'Curso',          fr: 'Cours',               de: 'Kurs',             it: 'Corso',              ca: 'Curs'},
  'course.fee':         {vi: 'Học phí',         en: 'Tuition Fee',    es: 'Matrícula',       fr: 'Frais de scolarité',  de: 'Studiengebühr',    it: 'Tassa scolastica',   ca: 'Matrícula'},
  'course.prize_stu':   {vi: 'Học bổng HS',     en: 'Student Prize',  es: 'Premio estudiante',fr: 'Bourse étudiant',   de: 'Schülerpreis',     it: 'Premio studente',    ca: 'Premi estudiant'},
  'course.salary_tea':  {vi: 'Lương GV',        en: 'Teacher Salary', es: 'Salario profesor', fr: 'Salaire enseignant', de: 'Lehrergehalt',     it: 'Stipendio insegnante', ca: 'Salari professor'},
  'course.prize_tea':   {vi: 'Thưởng GV',       en: 'Teacher Bonus',  es: 'Bono profesor',    fr: 'Prime enseignant',   de: 'Lehrerzulage',     it: 'Bonus insegnante',   ca: 'Bonus professor'},
  'course.max_attend':  {vi: 'Số buổi tối đa',  en: 'Max Sessions',   es: 'Sesiones máx.',    fr: 'Sessions max.',      de: 'Max. Sitzungen',   it: 'Sessioni massime',   ca: 'Sessions màx.'},
  'course.description': {vi: 'Mô tả',           en: 'Description',    es: 'Descripción',      fr: 'Description',        de: 'Beschreibung',     it: 'Descrizione',        ca: 'Descripció'},
  'class.title':        {vi: 'Lớp học',         en: 'Class',          es: 'Clase',            fr: 'Classe',             de: 'Klasse',           it: 'Classe',             ca: 'Classe'},
  'class.schedule':     {vi: 'Lịch học',        en: 'Schedule',       es: 'Horario',          fr: 'Horaire',            de: 'Stundenplan',      it: 'Orario',             ca: 'Horari'},
  'class.start_date':   {vi: 'Ngày bắt đầu',   en: 'Start Date',     es: 'Fecha inicio',     fr: 'Date début',         de: 'Startdatum',       it: 'Data inizio',        ca: 'Data inici'},
  'class.end_date':     {vi: 'Ngày kết thúc',  en: 'End Date',       es: 'Fecha fin',        fr: 'Date fin',           de: 'Enddatum',         it: 'Data fine',          ca: 'Data fi'},
  'class.max_student':  {vi: 'Sĩ số tối đa',   en: 'Max Students',   es: 'Máx. alumnos',     fr: 'Élèves max.',        de: 'Max. Schüler',     it: 'Studenti massimi',   ca: 'Alumnes màx.'},
  'class.cur_student':  {vi: 'Sĩ số hiện tại', en: 'Current Students',es: 'Alumnos actuales',fr: 'Élèves actuels',     de: 'Aktuelle Schüler', it: 'Studenti attuali',   ca: 'Alumnes actuals'},
  'class.branch':       {vi: 'Cơ sở',          en: 'Branch',         es: 'Sede',             fr: 'Agence',             de: 'Filiale',          it: 'Sede',               ca: 'Seu'},
  'class.teacher':      {vi: 'Giảng viên',      en: 'Teacher',        es: 'Profesor',         fr: 'Enseignant',         de: 'Lehrer',           it: 'Insegnante',         ca: 'Professor'},
  'toast.add_course_ok':   {vi: 'Thêm khóa học thành công', en: 'Course added successfully',   es: 'Curso añadido correctamente',    fr: 'Cours ajouté avec succès',   de: 'Kurs erfolgreich hinzugefügt', it: 'Corso aggiunto con successo',  ca: 'Curs afegit correctament'},
  'toast.edit_course_ok':  {vi: 'Sửa khóa học thành công',  en: 'Course updated successfully', es: 'Curso actualizado correctamente', fr: 'Cours mis à jour avec succès', de: 'Kurs erfolgreich aktualisiert', it: 'Corso aggiornato con successo', ca: 'Curs actualitzat correctament'},
  'toast.delete_course_ok':{vi: 'Xóa khóa học thành công',  en: 'Course deleted successfully', es: 'Curso eliminado correctamente',  fr: 'Cours supprimé avec succès',  de: 'Kurs erfolgreich gelöscht',    it: 'Corso eliminato con successo',  ca: 'Curs eliminat correctament'},
  'outcome.class_edit':    {vi: 'Đang chỉnh sửa lớp {name} ({course})', en: 'Editing class {name} ({course})', es: 'Editando clase {name} ({course})', fr: 'Modification de la classe {name} ({course})', de: 'Klasse {name} ({course}) wird bearbeitet', it: 'Modifica della classe {name} ({course})', ca: 'Editant la classe {name} ({course})'},
  'outcome.class_delete':  {vi: 'Đang xóa lớp {name} ({course})',       en: 'Deleting class {name} ({course})', es: 'Eliminando clase {name} ({course})', fr: 'Suppression de la classe {name} ({course})', de: 'Klasse {name} ({course}) wird gelöscht', it: 'Eliminazione della classe {name} ({course})', ca: 'Eliminant la classe {name} ({course})'},

  // ── Feature: attendance ───────────────────────────────────────────────────────
  'attend.present': {vi: 'Có mặt',   en: 'Present', es: 'Presente', fr: 'Présent',   de: 'Anwesend',  it: 'Presente',   ca: 'Present'},
  'attend.absent':  {vi: 'Vắng mặt', en: 'Absent',  es: 'Ausente',  fr: 'Absent',    de: 'Abwesend',  it: 'Assente',    ca: 'Absent'},
  'attend.late':    {vi: 'Đi trễ',   en: 'Late',    es: 'Tarde',    fr: 'En retard', de: 'Verspätet', it: 'In ritardo', ca: 'Tard'},

  // ── Feature: finance ──────────────────────────────────────────────────────────
  'finance.paid':    {vi: 'Đã thanh toán',   en: 'Paid',    es: 'Pagado',      fr: 'Payé',      de: 'Bezahlt',   it: 'Pagato',       ca: 'Pagat'},
  'finance.unpaid':  {vi: 'Chưa thanh toán', en: 'Unpaid',  es: 'Sin pagar',   fr: 'Impayé',    de: 'Unbezahlt', it: 'Non pagato',   ca: 'No pagat'},
  'finance.pending': {vi: 'Đang xử lý',      en: 'Pending', es: 'Pendiente',   fr: 'En attente',de: 'Ausstehend',it: 'In sospeso',   ca: 'Pendent'},
  'finance.income':  {vi: 'Thu nhập',        en: 'Income',  es: 'Ingresos',    fr: 'Revenus',   de: 'Einnahmen', it: 'Reddito',      ca: 'Ingressos'},
  'finance.outcome': {vi: 'Chi phí',         en: 'Outcome', es: 'Gastos',      fr: 'Dépenses',  de: 'Ausgaben',  it: 'Uscite',       ca: 'Despeses'},
  'finance.salary':  {vi: 'Lương',           en: 'Salary',  es: 'Salario',     fr: 'Salaire',   de: 'Gehalt',    it: 'Stipendio',    ca: 'Salari'},
  'finance.bonus':   {vi: 'Thưởng',          en: 'Bonus',   es: 'Bonificación',fr: 'Bonus',     de: 'Bonus',     it: 'Bonus',        ca: 'Bonus'},
  'finance.tuition': {vi: 'Học phí',         en: 'Tuition', es: 'Matrícula',   fr: 'Scolarité', de: 'Schulgeld', it: 'Retta',        ca: 'Matrícula'},

  // ── Feature: dashboard ────────────────────────────────────────────────────────
  'stat.access':        {vi: 'Lượt truy cập',       en: 'Total Accesses', es: 'Accesos totales',  fr: 'Accès totaux',  de: 'Gesamtzugriffe', it: 'Accessi totali', ca: 'Accessos totals'},
  'stat.students':      {vi: 'Học viên',             en: 'Students',       es: 'Estudiantes',      fr: 'Étudiants',     de: 'Schüler',        it: 'Studenti',       ca: 'Estudiants'},
  'stat.teachers':      {vi: 'Giảng viên',           en: 'Teachers',       es: 'Profesores',       fr: 'Enseignants',   de: 'Lehrer',         it: 'Insegnanti',     ca: 'Professors'},
  'stat.staff':         {vi: 'Nhân viên',            en: 'Staff',          es: 'Personal',         fr: 'Personnel',     de: 'Personal',       it: 'Personale',      ca: 'Personal'},
  'stat.access_count':  {vi: 'Số lượng truy cập',   en: 'Total Accesses', es: 'Accesos totales',  fr: 'Accès totaux',  de: 'Gesamtzugriffe', it: 'Accessi totali', ca: 'Accessos totals'},
  'stat.student_count': {vi: 'Số lượng học viên',   en: 'Total Students', es: 'Total estudiantes',fr: 'Total étudiants',de: 'Schüler gesamt', it: 'Studenti totali', ca: 'Total estudiants'},
  'stat.teacher_count': {vi: 'Số lượng giảng viên', en: 'Total Teachers', es: 'Total profesores', fr: 'Total enseignants',de: 'Lehrer gesamt', it: 'Insegnanti totali', ca: 'Total professors'},
  'stat.staff_count':   {vi: 'Số lượng nhân viên',  en: 'Total Staff',    es: 'Total personal',   fr: 'Total personnel',de: 'Personal gesamt', it: 'Personale totale', ca: 'Total personal'},
  'page.overview':       {vi: 'Tổng quan',                   en: 'Overview',             es: 'Resumen',             fr: 'Aperçu',              de: 'Übersicht',       it: 'Panoramica',         ca: 'Resum'},
  'page.salary_fund':    {vi: 'Quỹ lương',                   en: 'Salary Fund',          es: 'Fondo salarial',      fr: 'Fonds salaires',      de: 'Gehaltsfonds',    it: 'Fondo stipendi',     ca: 'Fons salaris'},
  'page.payment':        {vi: 'Chi trả',                     en: 'Payment',              es: 'Pago',                fr: 'Paiement',            de: 'Zahlung',         it: 'Pagamento',          ca: 'Pagament'},
  'page.access_log':     {vi: 'Lịch sử truy cập',           en: 'Access History',       es: 'Historial acceso',    fr: "Historique d'accès",  de: 'Zugriffshistorie', it: 'Cronologia accessi', ca: "Historial d'accés"},
  'page.register_log':   {vi: 'Đăng ký',                    en: 'Registration',         es: 'Registro',            fr: 'Inscription',         de: 'Anmeldung',       it: 'Registrazione',      ca: 'Registre'},
  'page.staff_portal':   {vi: 'Cổng quản lý học viên và giảng viên', en: 'Student & Teacher Portal', es: 'Portal estudiantes y profesores', fr: 'Portail étudiants et enseignants', de: 'Schüler- und Lehrerportal', it: 'Portale studenti e insegnanti', ca: "Portal d'estudiants i professors"},
  'page.tuition':        {vi: 'Học phí',                    en: 'Tuition',              es: 'Matrícula',           fr: 'Frais scolaires',     de: 'Studiengebühren', it: 'Retta',              ca: 'Matrícula'},
  'page.scholarship':    {vi: 'Học bổng',                   en: 'Scholarship',          es: 'Beca',                fr: 'Bourse',              de: 'Stipendium',      it: 'Borsa di studio',    ca: 'Beca'},
  'page.admin_dashboard':{vi: 'Bảng điều khiển quản trị',  en: 'Administrator Dashboard', es: 'Panel de administración', fr: "Tableau de bord administrateur", de: 'Administrator-Dashboard', it: 'Dashboard amministratore', ca: "Tauler d'administrador"},
  'sidebar.stat':            {vi: 'Thống kê',              en: 'Statistics',          es: 'Estadísticas',          fr: 'Statistiques',           de: 'Statistiken',         it: 'Statistiche',           ca: 'Estadístiques'},
  'sidebar.stat_financial':  {vi: 'Thống kê tài chính',   en: 'Financial Stats',     es: 'Estadísticas financieras', fr: 'Statistiques financières', de: 'Finanzstatistiken', it: 'Statistiche finanziarie', ca: 'Estadístiques financeres'},
  'sidebar.stat_access':     {vi: 'Thống kê truy cập',    en: 'Access Logs',         es: 'Registros de acceso',   fr: "Journaux d'accès",        de: 'Zugriffsprotokolle',  it: 'Log di accesso',          ca: "Registres d'accés"},
  'sidebar.manage_class':    {vi: 'Quản lý lớp học',      en: 'Class Management',    es: 'Gestión de clases',     fr: 'Gestion des classes',     de: 'Klassenverwaltung',   it: 'Gestione classi',         ca: 'Gestió de classes'},
  'sidebar.classes':         {vi: 'Lớp học',              en: 'Classes',             es: 'Clases',                fr: 'Classes',                 de: 'Klassen',             it: 'Classi',                  ca: 'Classes'},
  'sidebar.courses':         {vi: 'Khóa học',             en: 'Courses',             es: 'Cursos',                fr: 'Cours',                   de: 'Kurse',               it: 'Corsi',                   ca: 'Cursos'},
  'sidebar.manage_staff':    {vi: 'Quản lý nhân viên',    en: 'Staff Management',    es: 'Gestión del personal',  fr: 'Gestion du personnel',    de: 'Personalverwaltung',  it: 'Gestione del personale',  ca: 'Gestió del personal'},
  'sidebar.staff_info':      {vi: 'Thông tin nhân viên',  en: 'Staff Info',          es: 'Info del personal',     fr: 'Info personnel',          de: 'Personalinfo',        it: 'Info personale',          ca: 'Info del personal'},
  'sidebar.attendance':      {vi: 'Chấm công',            en: 'Attendance',          es: 'Asistencia',            fr: 'Présence',                de: 'Anwesenheit',         it: 'Presenze',                ca: 'Assistència'},
  'sidebar.salary':          {vi: 'Lương và thưởng',      en: 'Salary & Bonus',      es: 'Salario y bonificación',fr: 'Salaire et prime',        de: 'Gehalt und Bonus',    it: 'Stipendio e bonus',       ca: 'Salari i bonus'},
  'sidebar.student_teacher': {vi: 'Học viên và giảng viên', en: 'Students & Teachers', es: 'Estudiantes y profesores', fr: 'Étudiants et enseignants', de: 'Schüler und Lehrer', it: 'Studenti e insegnanti', ca: 'Estudiants i professors'},
  'sidebar.manage_student':  {vi: 'Quản lý học viên',     en: 'Student Management',  es: 'Gestión de estudiantes',fr: 'Gestion des étudiants',   de: 'Schülerverwaltung',   it: 'Gestione studenti',       ca: "Gestió d'estudiants"},
  'sidebar.student_info':    {vi: 'Thông tin học viên',   en: 'Student Info',        es: 'Info del estudiante',   fr: 'Info étudiant',           de: 'Schülerinfo',         it: 'Info studente',           ca: "Info de l'estudiant"},
  'sidebar.daily_attend':    {vi: 'Điểm danh hằng ngày', en: 'Daily Attendance',    es: 'Asistencia diaria',     fr: 'Présence quotidienne',    de: 'Tägliche Anwesenheit',it: 'Presenze giornaliere',    ca: 'Assistència diària'},
  'sidebar.student_mark':    {vi: 'Điểm của học viên',   en: 'Student Grades',      es: 'Calificaciones del estudiante', fr: 'Notes des étudiants', de: 'Schülernoten',     it: 'Voti degli studenti',     ca: 'Notes dels estudiants'},
  'sidebar.tuition':         {vi: 'Học phí và học bổng', en: 'Tuition & Scholarship', es: 'Matrícula y beca',   fr: 'Frais et bourse',         de: 'Studiengebühren und Stipendium', it: 'Retta e borsa di studio', ca: 'Matrícula i beca'},
  'sidebar.manage_teacher':  {vi: 'Quản lý giảng viên',  en: 'Teacher Management',  es: 'Gestión de profesores', fr: 'Gestion des enseignants', de: 'Lehrerverwaltung',    it: 'Gestione insegnanti',     ca: 'Gestió de professors'},
  'sidebar.teacher_info':    {vi: 'Thông tin giảng viên',en: 'Teacher Info',         es: 'Info del profesor',     fr: 'Info enseignant',         de: 'Lehrerinfo',          it: 'Info insegnante',         ca: 'Info del professor'},
  'sidebar.teacher_rate':    {vi: 'Đánh giá giảng viên', en: 'Teacher Ratings',     es: 'Calificaciones del profesor', fr: 'Évaluations des enseignants', de: 'Lehrerbewertungen', it: 'Valutazioni degli insegnanti', ca: 'Valoracions dels professors'},
  'sidebar.documents':       {vi: 'Tài liệu',            en: 'Documents',           es: 'Documentos',            fr: 'Documents',               de: 'Dokumente',           it: 'Documenti',               ca: 'Documents'},
  'sidebar.account_info':    {vi: 'Thông tin tài khoản', en: 'Account Info',        es: 'Información de la cuenta', fr: 'Informations du compte', de: 'Kontoinformationen', it: "Informazioni sull'account", ca: 'Informació del compte'},
  'sidebar.copyright':       {vi: 'Bản quyền',           en: 'All Rights Reserved', es: 'Todos los derechos reservados', fr: 'Tous droits réservés', de: 'Alle Rechte vorbehalten', it: 'Tutti i diritti riservati', ca: 'Tots els drets reservats'},

  // ── Feature: ui — toasts ─────────────────────────────────────────────────────
  'toast.login_ok':    {vi: 'Đăng nhập thành công',  en: 'Login successful',     es: 'Inicio de sesión exitoso',   fr: 'Connexion réussie',       de: 'Erfolgreich angemeldet',  it: 'Accesso riuscito',          ca: 'Inici de sessió correcte'},
  'toast.logout_ok':   {vi: 'Đăng xuất thành công',  en: 'Logged out',            es: 'Sesión cerrada',             fr: 'Déconnecté',              de: 'Abgemeldet',              it: 'Disconnesso',               ca: 'Sessió tancada'},
  'toast.save_ok':     {vi: 'Lưu thành công',        en: 'Saved successfully',    es: 'Guardado correctamente',     fr: 'Enregistré avec succès',  de: 'Erfolgreich gespeichert',  it: 'Salvato con successo',      ca: 'Desat correctament'},
  'toast.delete_ok':   {vi: 'Xóa thành công',        en: 'Deleted',               es: 'Eliminado',                  fr: 'Supprimé',                de: 'Gelöscht',                it: 'Eliminato',                 ca: 'Eliminat'},
  'toast.add_ok':      {vi: 'Thêm thành công',       en: 'Added successfully',    es: 'Agregado correctamente',     fr: 'Ajouté avec succès',      de: 'Erfolgreich hinzugefügt', it: 'Aggiunto con successo',     ca: 'Afegit correctament'},
  'toast.edit_ok':     {vi: 'Chỉnh sửa thành công', en: 'Updated successfully',  es: 'Actualizado correctamente',  fr: 'Mis à jour avec succès',  de: 'Erfolgreich aktualisiert', it: 'Aggiornato con successo',   ca: 'Actualitzat correctament'},
  'toast.error_server':{vi: 'Lỗi máy chủ',          en: 'Server error',          es: 'Error del servidor',         fr: 'Erreur serveur',          de: 'Serverfehler',            it: 'Errore server',             ca: 'Error del servidor'},
  'toast.fill_all':    {vi: 'Vui lòng nhập đầy đủ thông tin', en: 'Please fill in all fields', es: 'Por favor, completa todos los campos', fr: 'Veuillez remplir tous les champs', de: 'Bitte alle Felder ausfüllen', it: 'Si prega di compilare tutti i campi', ca: 'Si us plau, ompliu tots els camps'},
  'toast.pwd_mismatch':{vi: 'Hai mật khẩu không khớp', en: 'Passwords do not match', es: 'Las contraseñas no coinciden', fr: 'Les mots de passe ne correspondent pas', de: 'Passwörter stimmen nicht überein', it: 'Le password non corrispondono', ca: 'Les contrasenyes no coincideixen'},
  'toast.send_fail':   {vi: 'Gửi không thành công', en: 'Send failed',           es: 'Error al enviar',            fr: "Échec de l'envoi",        de: 'Senden fehlgeschlagen',   it: 'Invio fallito',             ca: "Error en l'enviament"},
  'toast.sent_ok':     {vi: 'Gửi thành công',       en: 'Sent successfully',     es: 'Enviado correctamente',      fr: 'Envoyé avec succès',      de: 'Erfolgreich gesendet',    it: 'Inviato con successo',      ca: 'Enviat correctament'},

  // ── Feature: ui — confirms ────────────────────────────────────────────────────
  'confirm.title':    {vi: 'Bạn chắc chứ?',       en: 'Are you sure?',         es: '¿Estás seguro?',           fr: 'Êtes-vous sûr ?',          de: 'Sind Sie sicher?',      it: 'Sei sicuro?',              ca: "N'esteu segur?"},
  'confirm.logout':   {vi: 'Bạn đang đăng xuất',  en: 'You are logging out',   es: 'Estás cerrando sesión',    fr: 'Vous vous déconnectez',    de: 'Sie werden abgemeldet', it: 'Stai effettuando il logout',ca: 'Esteu tancant la sessió'},
  'confirm.delete':   {vi: 'Hành động này không thể hoàn tác', en: 'This action cannot be undone', es: 'Esta acción no se puede deshacer', fr: 'Cette action est irréversible', de: 'Diese Aktion kann nicht rückgängig gemacht werden', it: 'Questa azione non può essere annullata', ca: 'Aquesta acció no es pot desfer'},
  'confirm.editing':  {vi: 'Bạn đang chỉnh sửa thông tin của {name}',    en: 'You are editing the info of {name}',     es: 'Está editando la info de {name}',     fr: 'Vous modifiez les infos de {name}',     de: 'Sie bearbeiten die Daten von {name}',    it: 'Stai modificando le info di {name}',     ca: "Esteu editant la informació de {name}"},
  'confirm.deleting': {vi: 'Bạn đang xóa thông tin của {name}',          en: 'You are deleting the record of {name}',  es: 'Está eliminando el registro de {name}', fr: 'Vous supprimez le dossier de {name}',   de: 'Sie löschen den Eintrag von {name}',     it: 'Stai eliminando il record di {name}',    ca: "Esteu eliminant el registre de {name}"},
  'confirm.marking':  {vi: 'Bạn đang điểm danh cho {name}',              en: 'You are marking attendance for {name}',  es: 'Está marcando asistencia de {name}',   fr: 'Vous enregistrez la présence de {name}',de: 'Sie erfassen die Anwesenheit von {name}',it: 'Stai segnando la presenza di {name}',    ca: "Esteu registrant l'assistència de {name}"},
  'confirm.warning_msg': {vi: 'Bạn đang gửi cảnh cáo cho {name}',       en: 'You are sending a warning to {name}',    es: 'Está enviando una advertencia a {name}',fr: 'Vous envoyez un avertissement à {name}',de: 'Sie senden eine Warnung an {name}',      it: 'Stai inviando un avviso a {name}',       ca: "Esteu enviant un avís a {name}"},
  'confirm.commend_msg': {vi: 'Bạn đang gửi thông báo tuyên dương cho {name}', en: 'You are commending {name}',       es: 'Está felicitando a {name}',             fr: 'Vous félicitez {name}',                 de: 'Sie loben {name}',                       it: 'Stai elogiando {name}',                  ca: "Esteu felicitant {name}"},
  'confirm.notify_salary':{vi: 'Bạn đang gửi thông báo nhận lương cho {name}', en: 'You are notifying {name} about salary', es: 'Notificando a {name} sobre salario', fr: 'Vous notifiez {name} pour le salaire', de: 'Sie benachrichtigen {name} über Gehalt', it: 'Stai notificando {name} per lo stipendio',ca: "Notificant {name} sobre el salari"},
  'confirm.notify_bonus': {vi: 'Bạn đang gửi thông báo nhận thưởng cho {name}', en: 'You are notifying {name} about bonus', es: 'Notificando a {name} sobre bono', fr: 'Vous notifiez {name} pour le bonus', de: 'Sie benachrichtigen {name} über Bonus', it: 'Stai notificando {name} per il bonus', ca: "Notificant {name} sobre el bonus"},
  'confirm.notify_book': {vi: 'Bạn đang gửi thông báo cho {name} đến nhận sách?', en: 'Notify {name} to pick up their book?', es: '¿Notificar a {name} para recoger su libro?', fr: 'Notifier {name} pour récupérer son livre ?', de: '{name} benachrichtigen, Buch abzuholen?', it: 'Notificare {name} per ritirare il libro?', ca: "Notificar {name} per recollir el seu llibre?"},
  'confirm.editing_month_year': {vi: 'Bạn đang chỉnh sửa thông tin của {name} vào tháng {month} vào năm {year}', en: 'You are editing the record of {name} for month {month} of year {year}', es: 'Está editando el registro de {name} del mes {month} del año {year}', fr: "Vous modifiez le dossier de {name} pour le mois {month} de l'année {year}", de: 'Sie bearbeiten den Eintrag von {name} für Monat {month} des Jahres {year}', it: "Stai modificando il record di {name} per il mese {month} dell'anno {year}", ca: "Esteu editant el registre de {name} per al mes {month} de l'any {year}"},
  'confirm.editing_class':  {vi: 'Bạn đang chỉnh sửa thông tin của {name} thuộc lớp {class}', en: 'You are editing the record of {name} in class {class}', es: 'Está editando el registro de {name} en la clase {class}', fr: 'Vous modifiez le dossier de {name} de la classe {class}', de: 'Sie bearbeiten den Eintrag von {name} in Klasse {class}', it: 'Stai modificando il record di {name} nella classe {class}', ca: 'Esteu editant el registre de {name} de la classe {class}'},
  'confirm.editing_teach':  {vi: 'Bạn đang chỉnh sửa thông tin của {name} dạy lớp {class}',   en: 'You are editing the record of {name} teaching class {class}', es: 'Está editando el registro de {name} enseñando la clase {class}', fr: 'Vous modifiez le dossier de {name} enseignant la classe {class}', de: 'Sie bearbeiten den Eintrag von {name} als Lehrer der Klasse {class}', it: 'Stai modificando il record di {name} che insegna la classe {class}', ca: 'Esteu editant el registre de {name} que ensenya la classe {class}'},
  'confirm.deleting_class': {vi: 'Bạn đang xóa thông tin của {name} thuộc lớp {class}', en: 'You are deleting the record of {name} in class {class}', es: 'Está eliminando el registro de {name} en la clase {class}', fr: 'Vous supprimez le dossier de {name} de la classe {class}', de: 'Sie löschen den Eintrag von {name} in Klasse {class}', it: 'Stai eliminando il record di {name} nella classe {class}', ca: 'Esteu eliminant el registre de {name} de la classe {class}'},
  'confirm.deleting_teach': {vi: 'Bạn đang xóa thông tin của {name} dạy lớp {class}',   en: 'You are deleting the record of {name} teaching class {class}', es: 'Está eliminando el registro de {name} enseñando clase {class}', fr: 'Vous supprimez le dossier de {name} enseignant la classe {class}', de: 'Sie löschen den Eintrag von {name} als Lehrer der Klasse {class}', it: 'Stai eliminando il record di {name} che insegna la classe {class}', ca: 'Esteu eliminant el registre de {name} que ensenya la classe {class}'},

  // ── Feature: ui — table headers ───────────────────────────────────────────────
  'table.sessions':      {vi: 'Số buổi',         en: 'Sessions',          es: 'Sesiones',          fr: 'Séances',          de: 'Einheiten',        it: 'Sessioni',           ca: 'Sessions'},
  'table.month':         {vi: 'Tháng',            en: 'Month',             es: 'Mes',               fr: 'Mois',             de: 'Monat',            it: 'Mese',               ca: 'Mes'},
  'table.year':          {vi: 'Năm',              en: 'Year',              es: 'Año',               fr: 'Année',            de: 'Jahr',             it: 'Anno',               ca: 'Any'},
  'table.open_date':     {vi: 'Ngày mở',          en: 'Open Date',         es: 'Fecha apertura',    fr: "Date d'ouverture", de: 'Eröffnungsdatum',  it: 'Data apertura',      ca: "Data d'obertura"},
  'table.quantity':      {vi: 'Số lượng',         en: 'Quantity',          es: 'Cantidad',          fr: 'Quantité',         de: 'Menge',            it: 'Quantità',           ca: 'Quantitat'},
  'table.rating':        {vi: 'Đánh giá',         en: 'Rating',            es: 'Evaluación',        fr: 'Évaluation',       de: 'Bewertung',        it: 'Valutazione',        ca: 'Valoració'},
  'table.username':      {vi: 'Tên tài khoản',    en: 'Username',          es: 'Usuario',           fr: 'Nom utilisateur',  de: 'Benutzername',     it: 'Nome utente',        ca: "Nom d'usuari"},
  'table.role':          {vi: 'Chức vụ',          en: 'Role',              es: 'Rol',               fr: 'Rôle',             de: 'Rolle',            it: 'Ruolo',              ca: 'Rol'},
  'table.activity':      {vi: 'Hoạt động',        en: 'Activity',          es: 'Actividad',         fr: 'Activité',         de: 'Aktivität',        it: 'Attività',           ca: 'Activitat'},
  'table.reg_date':      {vi: 'Ngày đăng ký',     en: 'Registration Date', es: 'Fecha registro',    fr: 'Date inscription', de: 'Anmeldedatum',     it: 'Data registrazione', ca: 'Data registre'},
  'table.amount':        {vi: 'Số tiền',          en: 'Amount',            es: 'Monto',             fr: 'Montant',          de: 'Betrag',           it: 'Importo',            ca: 'Import'},
  'table.total':         {vi: 'Tổng',             en: 'Total',             es: 'Total',             fr: 'Total',            de: 'Gesamt',           it: 'Totale',             ca: 'Total'},
  'table.sponsor':       {vi: 'Tên nhà tài trợ', en: 'Sponsor',           es: 'Patrocinador',      fr: 'Sponsor',          de: 'Sponsor',          it: 'Sponsor',            ca: 'Patrocinador'},
  'table.type':          {vi: 'Loại',             en: 'Type',              es: 'Tipo',              fr: 'Type',             de: 'Typ',              it: 'Tipo',               ca: 'Tipus'},
  'table.name':          {vi: 'Tên',              en: 'Name',              es: 'Nombre',            fr: 'Nom',              de: 'Name',             it: 'Nome',               ca: 'Nom'},
  'table.intro_img':     {vi: 'Hình giới thiệu', en: 'Cover Image',       es: 'Imagen portada',    fr: 'Image couverture', de: 'Titelbild',        it: 'Immagine copertina', ca: 'Imatge portada'},
  'table.short_desc':    {vi: 'Mô tả ngắn',       en: 'Short Description', es: 'Descripción corta', fr: 'Desc. courte',     de: 'Kurzbeschreibung', it: 'Descr. breve',       ca: 'Desc. breu'},
  'table.desc_img':      {vi: 'Hình mô tả',       en: 'Description Image', es: 'Imagen descripción',fr: 'Image description',de: 'Beschreibungsbild',it: 'Immagine descr.',    ca: 'Imatge descripció'},
  'table.intro':         {vi: 'Giới thiệu',       en: 'Introduction',      es: 'Introducción',      fr: 'Introduction',     de: 'Einführung',       it: 'Introduzione',       ca: 'Introducció'},
  'table.duration':      {vi: 'Thời gian',        en: 'Duration',          es: 'Duración',          fr: 'Durée',            de: 'Dauer',            it: 'Durata',             ca: 'Durada'},
  'table.doc_type':      {vi: 'Loại tài liệu',    en: 'Document Type',     es: 'Tipo documento',    fr: 'Type document',    de: 'Dokumenttyp',      it: 'Tipo documento',     ca: 'Tipus document'},
  'table.book':          {vi: 'Sách',             en: 'Book',              es: 'Libro',             fr: 'Livre',            de: 'Buch',             it: 'Libro',              ca: 'Llibre'},
  'table.students_count':{vi: 'Sĩ số',            en: 'Student Count',     es: 'Número alumnos',    fr: 'Nombre élèves',    de: 'Schüleranzahl',    it: 'Num. studenti',      ca: 'Nombre alumnes'},

  // ── Feature: ui — status values ───────────────────────────────────────────────
  'status.success':      {vi: 'Thành công',        en: 'Success',      es: 'Éxito',         fr: 'Succès',        de: 'Erfolg',             it: 'Successo',      ca: 'Èxit'},
  'status.failed':       {vi: 'Thất bại',          en: 'Failed',       es: 'Fallido',       fr: 'Échoué',        de: 'Fehlgeschlagen',     it: 'Fallito',       ca: 'Fallat'},
  'status.completed':    {vi: 'Đã hoàn thành',     en: 'Completed',    es: 'Completado',    fr: 'Terminé',       de: 'Abgeschlossen',      it: 'Completato',    ca: 'Completat'},
  'status.not_completed':{vi: 'Chưa hoàn thành',   en: 'Not Completed',es: 'Sin completar', fr: 'Non terminé',   de: 'Nicht abgeschlossen',it: 'Non completato',ca: 'No completat'},
  'status.studying':     {vi: 'Đang học',          en: 'Studying',     es: 'Estudiando',    fr: 'En cours',      de: 'Lernend',            it: 'In corso',      ca: 'Estudiant'},
  'status.not_studied':  {vi: 'Chưa học',          en: 'Not Started',  es: 'Sin empezar',   fr: 'Pas commencé',  de: 'Nicht begonnen',     it: 'Non iniziato',  ca: 'No iniciat'},
  'status.studied':      {vi: 'Đã học',            en: 'Completed',    es: 'Completado',    fr: 'Terminé',       de: 'Abgeschlossen',      it: 'Completato',    ca: 'Completat'},
  'status.teaching':     {vi: 'Đang dạy',          en: 'Teaching',     es: 'Enseñando',     fr: 'En cours',      de: 'Unterrichtend',      it: 'In corso',      ca: 'Ensenyant'},
  'status.not_taught':   {vi: 'Chưa dạy',          en: 'Not Started',  es: 'Sin empezar',   fr: 'Pas commencé',  de: 'Nicht begonnen',     it: 'Non iniziato',  ca: 'No iniciat'},
  'status.taught':       {vi: 'Đã dạy',            en: 'Done',         es: 'Completado',    fr: 'Terminé',       de: 'Erledigt',           it: 'Completato',    ca: 'Fet'},
  'status.received':     {vi: 'Đã nhận',           en: 'Received',     es: 'Recibido',      fr: 'Reçu',          de: 'Erhalten',           it: 'Ricevuto',      ca: 'Rebut'},
  'status.not_received': {vi: 'Chưa nhận',         en: 'Not Received', es: 'Sin recibir',   fr: 'Non reçu',      de: 'Nicht erhalten',     it: 'Non ricevuto',  ca: 'No rebut'},
  'status.closed':       {vi: 'Đã đóng',           en: 'Closed',       es: 'Cerrado',       fr: 'Fermé',         de: 'Geschlossen',        it: 'Chiuso',        ca: 'Tancat'},
  'status.not_closed':   {vi: 'Chưa đóng',         en: 'Open',         es: 'Abierto',       fr: 'Ouvert',        de: 'Offen',              it: 'Aperto',        ca: 'Obert'},
  'status.available':    {vi: 'Đã có',             en: 'Available',    es: 'Disponible',    fr: 'Disponible',    de: 'Verfügbar',          it: 'Disponibile',   ca: 'Disponible'},
  'status.not_available':{vi: 'Chưa có sẵn',       en: 'Not Available',es: 'No disponible', fr: 'Pas disponible',de: 'Nicht verfügbar',    it: 'Non disponibile',ca: 'No disponible'},

  // ── Feature: ui — validation ──────────────────────────────────────────────────
  'validate.enter_class':   {vi: 'Hãy nhập lớp',               en: 'Please enter a class',       es: 'Ingrese una clase',        fr: 'Veuillez saisir une classe',       de: 'Klasse eingeben',           it: 'Inserire una classe',       ca: 'Introduïu una classe'},
  'validate.enter_name':    {vi: 'Hãy nhập tên',               en: 'Please enter a name',        es: 'Ingrese un nombre',        fr: 'Veuillez saisir un nom',           de: 'Name eingeben',             it: 'Inserire un nome',          ca: 'Introduïu un nom'},
  'validate.invalid_date':  {vi: 'Ngày không hợp lệ',          en: 'Invalid date',               es: 'Fecha inválida',           fr: 'Date invalide',                    de: 'Ungültiges Datum',          it: 'Data non valida',           ca: 'Data no vàlida'},
  'validate.invalid_rating':{vi: 'Đánh giá không hợp lệ',     en: 'Invalid rating',             es: 'Evaluación inválida',      fr: 'Évaluation invalide',              de: 'Ungültige Bewertung',       it: 'Valutazione non valida',    ca: 'Valoració no vàlida'},
  'validate.select_status': {vi: 'Vui lòng chọn trạng thái',  en: 'Please select a status',     es: 'Seleccione un estado',     fr: 'Veuillez sélectionner un statut',  de: 'Status auswählen',          it: 'Selezionare uno stato',     ca: 'Seleccioneu un estat'},
  'validate.enter_month':   {vi: 'Vui lòng nhập tháng',       en: 'Please enter a month',       es: 'Ingrese un mes',           fr: 'Veuillez saisir un mois',          de: 'Monat eingeben',            it: 'Inserire un mese',          ca: 'Introduïu un mes'},
  'validate.enter_year':    {vi: 'Vui lòng nhập năm',         en: 'Please enter a year',        es: 'Ingrese un año',           fr: "Veuillez saisir une année",        de: 'Jahr eingeben',             it: 'Inserire un anno',          ca: 'Introduïu un any'},
  'validate.enter_salary':  {vi: 'Vui lòng nhập lương',       en: 'Please enter salary',        es: 'Ingrese el salario',       fr: 'Veuillez saisir le salaire',       de: 'Gehalt eingeben',           it: 'Inserire lo stipendio',     ca: 'Introduïu el salari'},
  'validate.enter_bonus':   {vi: 'Vui lòng nhập khoản thưởng',en: 'Please enter bonus amount',  es: 'Ingrese el bono',          fr: 'Veuillez saisir le bonus',         de: 'Bonus eingeben',            it: 'Inserire il bonus',         ca: 'Introduïu el bonus'},
  'validate.no_data':       {vi: 'Dữ liệu không tồn tại',     en: 'Data not found',             es: 'Datos no encontrados',     fr: 'Données introuvables',             de: 'Daten nicht gefunden',      it: 'Dati non trovati',          ca: 'Dades no trobades'},
  'validate.old_attend':    {vi: 'Tháng được điểm danh đã quá lâu', en: 'Attendance period too far in the past', es: 'Período de asistencia muy lejano', fr: 'Période de présence trop ancienne', de: 'Anwesenheitszeitraum zu weit zurück', it: 'Periodo presenze troppo lontano', ca: 'Període assistència massa llunyà'},
  'validate.salary_exists': {vi: 'Lương đã tồn tại',          en: 'Salary record already exists',es: 'Registro salarial ya existe',fr: 'Enregistrement salaire existe',  de: 'Gehaltseintrag vorhanden',  it: 'Record stipendio esiste',   ca: 'Registre salari ja existeix'},
  'validate.select_class':  {vi: 'Vui lòng chọn lớp',        en: 'Please select a class',      es: 'Seleccione una clase',     fr: 'Veuillez sélectionner une classe', de: 'Klasse auswählen',          it: 'Selezionare una classe',    ca: 'Seleccioneu una classe'},
  'validate.select_qty':    {vi: 'Vui lòng chọn số lượng',   en: 'Please select a quantity',   es: 'Seleccione una cantidad',  fr: 'Veuillez sélectionner une quantité',de: 'Menge auswählen',          it: 'Selezionare una quantità',  ca: 'Seleccioneu una quantitat'},
  'validate.select_teacher':{vi: 'Vui lòng chọn tên giảng viên', en: 'Please select a teacher', es: 'Seleccione un profesor',  fr: 'Sélectionnez un enseignant',       de: 'Lehrer auswählen',          it: 'Selezionare un insegnante', ca: 'Seleccioneu un professor'},
  'validate.enter_book':    {vi: 'Vui lòng nhập tên sách',   en: 'Please enter book title',    es: 'Ingrese título del libro', fr: 'Saisissez le titre du livre',      de: 'Buchtitel eingeben',        it: 'Inserire titolo libro',     ca: 'Introduïu el títol del llibre'},
  'validate.load_error':    {vi: 'Lỗi tải dữ liệu',          en: 'Error loading data',         es: 'Error al cargar datos',    fr: 'Erreur chargement données',        de: 'Fehler beim Laden',         it: 'Errore caricamento dati',   ca: 'Error en carregar dades'},
  'validate.enter_listening':{vi: 'Hãy nhập điểm listening', en: 'Enter listening score',      es: 'Ingrese puntaje listening',fr: 'Entrez le score listening',        de: 'Listening-Punktzahl eingeben', it: 'Inserisci punteggio listening', ca: 'Introduïu puntuació listening'},
  'validate.enter_speaking': {vi: 'Hãy nhập điểm speaking',  en: 'Enter speaking score',       es: 'Ingrese puntaje speaking', fr: 'Entrez le score speaking',         de: 'Speaking-Punktzahl eingeben',  it: 'Inserisci punteggio speaking',  ca: 'Introduïu puntuació speaking'},
  'validate.enter_reading':  {vi: 'Hãy nhập điểm reading',   en: 'Enter reading score',        es: 'Ingrese puntaje reading',  fr: 'Entrez le score reading',          de: 'Reading-Punktzahl eingeben',   it: 'Inserisci punteggio reading',   ca: 'Introduïu puntuació reading'},
  'validate.enter_writing':  {vi: 'Hãy nhập điểm writing',   en: 'Enter writing score',        es: 'Ingrese puntaje writing',  fr: 'Entrez le score writing',          de: 'Writing-Punktzahl eingeben',   it: 'Inserisci punteggio writing',   ca: 'Introduïu puntuació writing'},

  // ── Feature: ui — outcome messages ───────────────────────────────────────────
  'outcome.marked_ok':    {vi: '{name} đã được điểm danh thành công', en: '{name} has been marked successfully', es: '{name} marcado con éxito', fr: '{name} a été marqué avec succès', de: '{name} wurde erfolgreich markiert', it: '{name} è stato segnato con successo', ca: '{name} ha estat marcat correctament'},
  'outcome.warned_ok':    {vi: '{name} đã được gửi cảnh cáo',        en: 'Warning sent to {name}',             es: 'Advertencia enviada a {name}',     fr: 'Avertissement envoyé à {name}',  de: 'Warnung an {name} gesendet',       it: 'Avviso inviato a {name}',            ca: 'Avís enviat a {name}'},
  'outcome.commend_ok':   {vi: '{name} đã được tuyên dương',          en: '{name} has been commended',          es: '{name} ha sido felicitado',        fr: '{name} a été félicité',          de: '{name} wurde gelobt',              it: '{name} è stato elogiato',            ca: '{name} ha estat felicitat'},
  'outcome.notified_ok':  {vi: '{name} đã được gửi thông báo',        en: '{name} has been notified',           es: '{name} ha sido notificado',        fr: '{name} a été notifié',           de: '{name} wurde benachrichtigt',      it: '{name} è stato notificato',          ca: '{name} ha estat notificat'},
  'outcome.in_class':     {vi: 'thuộc lớp {class}',                  en: 'in class {class}',                   es: 'en clase {class}',                 fr: 'de la classe {class}',           de: 'in Klasse {class}',                it: 'nella classe {class}',               ca: 'de la classe {class}'},
  'outcome.teach_class':  {vi: 'dạy lớp {class}',                    en: 'teaching class {class}',             es: 'enseñando clase {class}',          fr: 'enseigne la classe {class}',     de: 'unterrichtet Klasse {class}',      it: 'insegna la classe {class}',          ca: "ensenya la classe {class}"},
  'outcome.in_month':     {vi: 'vào tháng {month}',                  en: 'in month {month}',                   es: 'en mes {month}',                   fr: 'au mois {month}',                de: 'im Monat {month}',                 it: 'nel mese {month}',                   ca: 'al mes {month}'},
  'outcome.in_year':      {vi: 'vào năm {year}',                     en: 'in year {year}',                     es: 'en año {year}',                    fr: "en l'an {year}",                 de: 'im Jahr {year}',                   it: "nell'anno {year}",                   ca: "l'any {year}"},
  'outcome.editing':      {vi: '{name} đang bị chỉnh sửa',           en: '{name} is being edited',             es: '{name} está siendo editado',       fr: '{name} est en cours de modification', de: '{name} wird bearbeitet',         it: '{name} è in fase di modifica',       ca: '{name} està sent editat'},
  'outcome.score_editing':{vi: 'Điểm của {name} thuộc lớp {class} đang bị chỉnh sửa', en: 'Score of {name} in class {class} is being edited', es: 'La puntuación de {name} en la clase {class} está siendo editada', fr: 'Le score de {name} de la classe {class} est en cours de modification', de: 'Der Punktestand von {name} in Klasse {class} wird bearbeitet', it: 'Il punteggio di {name} nella classe {class} è in fase di modifica', ca: 'La puntuació de {name} de la classe {class} està sent editada'},
  'outcome.rating_editing':{vi: 'Đánh giá của {name} dạy lớp {class} đang bị chỉnh sửa', en: 'Rating of {name} teaching class {class} is being edited', es: 'La evaluación de {name} enseñando la clase {class} está siendo editada', fr: "L'évaluation de {name} pour la classe {class} est en cours de modification", de: 'Die Bewertung von {name} für Klasse {class} wird bearbeitet', it: 'La valutazione di {name} per la classe {class} è in fase di modifica', ca: "La valoració de {name} per a la classe {class} està sent editada"},

};

// ── i18n engine ───────────────────────────────────────────────────────────────

const i18n = (function () {
  const STORAGE_KEY = 'bk_lang';
  const FALLBACK = 'vi';

  let _lang = localStorage.getItem(STORAGE_KEY) || FALLBACK;

  /**
   * Get the translation for key in the current language.
   * @param {string} key    - e.g. 'nav.home'
   * @param {object} [vars] - interpolation vars, e.g. { name: 'Admin' }
   * @returns {string}
   */
  function t(key, vars) {
    const entry = labels[key];
    if (!entry) {
      console.warn(`[i18n] Missing key: "${key}"`);
      return key;
    }
    let text = entry[_lang] || entry[FALLBACK] || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        text = text.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
      });
    }
    return text;
  }

  /**
   * Switch language and re-render all elements with data-i18n.
   * @param {string} lang
   */
  function setLang(lang) {
    if (!LANGUAGES[lang]) {
      console.warn(`[i18n] Unknown language: "${lang}"`);
      return;
    }
    _lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyAll();
    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang } }));
  }

  /** Return the active language code. */
  function getLang() { return _lang; }

  /** Return the LANGUAGES map. */
  function getLanguages() { return LANGUAGES; }

  /**
   * Translate all [data-i18n] elements in the document.
   * Also handles [data-i18n-placeholder] for input placeholders.
   */
  function applyAll() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });
  }

  // Auto-apply on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAll);
  } else {
    applyAll();
  }

  return { t, setLang, getLang, getLanguages, applyAll };
})();
