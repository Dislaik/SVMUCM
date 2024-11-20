const express = require('express');
const router = require('./router/router');
const { syncDatabase } = require('./config/db');
const authentication = require('./security/authentication');
const Role = require('./model/role');
const cors = require ('cors');
const Headquarter = require('./model/headquarter');
const User = require('./model/user');
const utils = require('./utils/utils');
const Region = require('./model/region');
const City = require('./model/city');
const Faculty = require('./model/faculty');
const Career = require('./model/career');
const projectStatus = require('./model/projectStatus');
const UserStatus = require('./model/userStatus');
const port = 8080;
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

syncDatabase(initTable);



app.listen(port, () => {
  console.log('Server listening on Port:', port);
})

async function initTable() {
  await Region.findOrCreate({ where: {name: 'aricayparinacota'}, defaults: {label: 'Región de Arica y Parinacota'} });
  await Region.findOrCreate({ where: {name: 'tarapaca'}, defaults: {label: 'Región de Tarapacá'} });
  await Region.findOrCreate({ where: {name: 'antofagasta'}, defaults: {label: 'Región de Antofagasta'} });
  await Region.findOrCreate({ where: {name: 'atacama'}, defaults: {label: 'Región de Atacama'} });
  await Region.findOrCreate({ where: {name: 'coquimbo'}, defaults: {label: 'Región de Coquimbo'} });
  await Region.findOrCreate({ where: {name: 'valparaiso'}, defaults: {label: 'Región de Valparaíso'} });
  await Region.findOrCreate({ where: {name: 'metropolitana'}, defaults: {label: 'Región Metropolitana de Santiago'} });
  await Region.findOrCreate({ where: {name: 'ohiggins'}, defaults: {label: 'Región del Libertador General Bernardo O’Higgins'} });
  await Region.findOrCreate({ where: {name: 'maule'}, defaults: {label: 'Región del Maule'} });
  await Region.findOrCreate({ where: {name: 'nuble'}, defaults: {label: 'Región de Ñuble'} });
  await Region.findOrCreate({ where: {name: 'biobio'}, defaults: {label: 'Región del Biobío'} });
  await Region.findOrCreate({ where: {name: 'araucania'}, defaults: {label: 'Región de La Araucanía'} });
  await Region.findOrCreate({ where: {name: 'losrios'}, defaults: {label: 'Región de Los Ríos'} });
  await Region.findOrCreate({ where: {name: 'loslagos'}, defaults: {label: 'Región de Los Lagos'} });
  await Region.findOrCreate({ where: {name: 'aisen'}, defaults: {label: 'Región de Aysén del General Carlos Ibáñez del Campo'} });
  await Region.findOrCreate({ where: {name: 'magallanes'}, defaults: {label: 'Región de Magallanes y de la Antártica Chilena'} });
  await City.findOrCreate({ where: {name: 'arica'}, defaults: {label: 'Arica', id_region: 1} });
  await City.findOrCreate({ where: {name: 'parinacota'}, defaults: {label: 'Parinacota', id_region: 1} });
  await City.findOrCreate({ where: {name: 'generallagos'}, defaults: {label: 'General Lagos', id_region: 1} });
  await City.findOrCreate({ where: {name: 'putre'}, defaults: {label: 'Putre', id_region: 1} });
  await City.findOrCreate({ where: {name: 'camarones'}, defaults: {label: 'Camarones', id_region: 1} });
  await City.findOrCreate({ where: {name: 'arica'}, defaults: {label: 'Arica', id_region: 1} });
  await City.findOrCreate({ where: {name: 'iquique'}, defaults: {label: 'Iquique', id_region: 2} });
  await City.findOrCreate({ where: {name: 'altohospicio'}, defaults: {label: 'Alto Hospicio', id_region: 2} });
  await City.findOrCreate({ where: {name: 'pozoalmonte'}, defaults: {label: 'Pozo Almonte', id_region: 2} });
  await City.findOrCreate({ where: {name: 'pica'}, defaults: {label: 'Pica', id_region: 2} });
  await City.findOrCreate({ where: {name: 'huara'}, defaults: {label: 'Huara', id_region: 2} });
  await City.findOrCreate({ where: {name: 'colchane'}, defaults: {label: 'Colchane', id_region: 2} });
  await City.findOrCreate({ where: {name: 'antofagasta'}, defaults: {label: 'Antofagasta', id_region: 3} });
  await City.findOrCreate({ where: {name: 'mejillones'}, defaults: {label: 'Mejillones', id_region: 3} });
  await City.findOrCreate({ where: {name: 'taltal'}, defaults: {label: 'Taltal', id_region: 3} });
  await City.findOrCreate({ where: {name: 'sierragorda'}, defaults: {label: 'Sierra Gorda', id_region: 3} });
  await City.findOrCreate({ where: {name: 'calama'}, defaults: {label: 'Calama', id_region: 3} });
  await City.findOrCreate({ where: {name: 'sanpedrodeatacama'}, defaults: {label: 'San Pedro de Atacama', id_region: 3} });
  await City.findOrCreate({ where: {name: 'copiapo'}, defaults: {label: 'Copiapó', id_region: 4} });
  await City.findOrCreate({ where: {name: 'caldera'}, defaults: {label: 'Caldera', id_region: 4} });
  await City.findOrCreate({ where: {name: 'tierraamarilla'}, defaults: {label: 'Tierra Amarilla', id_region: 4} });
  await City.findOrCreate({ where: {name: 'vallenar'}, defaults: {label: 'Vallenar', id_region: 4} });
  await City.findOrCreate({ where: {name: 'freirina'}, defaults: {label: 'Freirina', id_region: 4} });
  await City.findOrCreate({ where: {name: 'huasco'}, defaults: {label: 'Huasco', id_region: 4} });
  await City.findOrCreate({ where: {name: 'laserena'}, defaults: {label: 'La Serena', id_region: 5} });
  await City.findOrCreate({ where: {name: 'coquimbo'}, defaults: {label: 'Coquimbo', id_region: 5} });
  await City.findOrCreate({ where: {name: 'ovalle'}, defaults: {label: 'Ovalle', id_region: 5} });
  await City.findOrCreate({ where: {name: 'montepatria'}, defaults: {label: 'Monte Patria', id_region: 5} });
  await City.findOrCreate({ where: {name: 'combarbala'}, defaults: {label: 'Combarbalá', id_region: 5} });
  await City.findOrCreate({ where: {name: 'vicuna'}, defaults: {label: 'Vicuña', id_region: 5} });
  await City.findOrCreate({ where: {name: 'valparaiso'}, defaults: {label: 'Valparaíso', id_region: 6} });
  await City.findOrCreate({ where: {name: 'vinadelmar'}, defaults: {label: 'Viña del Mar', id_region: 6} });
  await City.findOrCreate({ where: {name: 'quillota'}, defaults: {label: 'Quillota', id_region: 6} });
  await City.findOrCreate({ where: {name: 'quilpue'}, defaults: {label: 'Quilpué', id_region: 6} });
  await City.findOrCreate({ where: {name: 'sanantonio'}, defaults: {label: 'San Antonio', id_region: 6} });
  await City.findOrCreate({ where: {name: 'casablanca'}, defaults: {label: 'Casablanca', id_region: 6} });
  await City.findOrCreate({ where: {name: 'santiago'}, defaults: {label: 'Santiago', id_region: 7} });
  await City.findOrCreate({ where: {name: 'providencia'}, defaults: {label: 'Providencia', id_region: 7} });
  await City.findOrCreate({ where: {name: 'lascondes'}, defaults: {label: 'Las Condes', id_region: 7} });
  await City.findOrCreate({ where: {name: 'maipu'}, defaults: {label: 'Maipú', id_region: 7} });
  await City.findOrCreate({ where: {name: 'puentealto'}, defaults: {label: 'Puente Alto', id_region: 7} });
  await City.findOrCreate({ where: {name: 'laflorida'}, defaults: {label: 'La Florida', id_region: 7} });
  await City.findOrCreate({ where: {name: 'rancagua'}, defaults: {label: 'Rancagua', id_region: 8} });
  await City.findOrCreate({ where: {name: 'sanfernando'}, defaults: {label: 'San Fernando', id_region: 8} });
  await City.findOrCreate({ where: {name: 'santacruz'}, defaults: {label: 'Santa Cruz', id_region: 8} });
  await City.findOrCreate({ where: {name: 'pichilemu'}, defaults: {label: 'Pichilemu', id_region: 8} });
  await City.findOrCreate({ where: {name: 'marchigue'}, defaults: {label: 'Marchigüe', id_region: 8} });
  await City.findOrCreate({ where: {name: 'litueche'}, defaults: {label: 'Litueche', id_region: 8} });
  await City.findOrCreate({ where: {name: 'talca'}, defaults: {label: 'Talca', id_region: 9} });
  await City.findOrCreate({ where: {name: 'curico'}, defaults: {label: 'Curicó', id_region: 9} });
  await City.findOrCreate({ where: {name: 'maule'}, defaults: {label: 'Maule', id_region: 9} });
  await City.findOrCreate({ where: {name: 'linares'}, defaults: {label: 'Linares', id_region: 9} });
  await City.findOrCreate({ where: {name: 'constitucion'}, defaults: {label: 'Constitución', id_region: 9} });
  await City.findOrCreate({ where: {name: 'parral'}, defaults: {label: 'Parral', id_region: 9} });
  await City.findOrCreate({ where: {name: 'chillan'}, defaults: {label: 'Chillán', id_region: 10} });
  await City.findOrCreate({ where: {name: 'pemuco'}, defaults: {label: 'Pemuco', id_region: 10} });
  await City.findOrCreate({ where: {name: 'quillon'}, defaults: {label: 'Quillón', id_region: 10} });
  await City.findOrCreate({ where: {name: 'yungay'}, defaults: {label: 'Yungay', id_region: 10} });
  await City.findOrCreate({ where: {name: 'concepcion'}, defaults: {label: 'Concepción', id_region: 11} });
  await City.findOrCreate({ where: {name: 'talcahuano'}, defaults: {label: 'Talcahuano', id_region: 11} });
  await City.findOrCreate({ where: {name: 'coronel'}, defaults: {label: 'Coronel', id_region: 11} });
  await City.findOrCreate({ where: {name: 'lota'}, defaults: {label: 'Lota', id_region: 11} });
  await City.findOrCreate({ where: {name: 'lebu'}, defaults: {label: 'Lebu', id_region: 11} });
  await City.findOrCreate({ where: {name: 'losangeles'}, defaults: {label: 'Los Ángeles', id_region: 11} });
  await City.findOrCreate({ where: {name: 'temuco'}, defaults: {label: 'Temuco', id_region: 12} });
  await City.findOrCreate({ where: {name: 'padrelascasas'}, defaults: {label: 'Padre Las Casas', id_region: 12} });
  await City.findOrCreate({ where: {name: 'angol'}, defaults: {label: 'Angol', id_region: 12} });
  await City.findOrCreate({ where: {name: 'victoria'}, defaults: {label: 'Victoria', id_region: 12} });
  await City.findOrCreate({ where: {name: 'villarrica'}, defaults: {label: 'Villarrica', id_region: 12} });
  await City.findOrCreate({ where: {name: 'pucon'}, defaults: {label: 'Pucón', id_region: 12} });
  await City.findOrCreate({ where: {name: 'valdivia'}, defaults: {label: 'Valdivia', id_region: 13} });
  await City.findOrCreate({ where: {name: 'launion'}, defaults: {label: 'La Unión', id_region: 13} });
  await City.findOrCreate({ where: {name: 'riobueno'}, defaults: {label: 'Río Bueno', id_region: 13} });
  await City.findOrCreate({ where: {name: 'panguipulli'}, defaults: {label: 'Panguipulli', id_region: 13} });
  await City.findOrCreate({ where: {name: 'puertomontt'}, defaults: {label: 'Puerto Montt', id_region: 14} });
  await City.findOrCreate({ where: {name: 'osorno'}, defaults: {label: 'Osorno', id_region: 14} });
  await City.findOrCreate({ where: {name: 'castro'}, defaults: {label: 'Castro', id_region: 14} });
  await City.findOrCreate({ where: {name: 'ancud'}, defaults: {label: 'Ancud', id_region: 14} });
  await City.findOrCreate({ where: {name: 'puertovaras'}, defaults: {label: 'Puerto Varas', id_region: 14} });
  await City.findOrCreate({ where: {name: 'coyhaique'}, defaults: {label: 'Coyhaique', id_region: 15} });
  await City.findOrCreate({ where: {name: 'puertoaysen'}, defaults: {label: 'Puerto Aysén', id_region: 15} });
  await City.findOrCreate({ where: {name: 'chilechico'}, defaults: {label: 'Chile Chico', id_region: 15} });
  await City.findOrCreate({ where: {name: 'cochrane'}, defaults: {label: 'Cochrane', id_region: 15} });
  await City.findOrCreate({ where: {name: 'puntaarenas'}, defaults: {label: 'Punta Arenas', id_region: 16} });
  await City.findOrCreate({ where: {name: 'puertonatales'}, defaults: {label: 'Puerto Natales', id_region: 16} });
  await City.findOrCreate({ where: {name: 'porvenir'}, defaults: {label: 'Porvenir', id_region: 16} });
  await City.findOrCreate({ where: {name: 'puertowilliams'}, defaults: {label: 'Puerto Williams', id_region: 16} });
  await Role.findOrCreate({ where: {name: 'admin'}, defaults: {label: 'Administrador'} });
  await Role.findOrCreate({ where: {name: 'externalrelationscoordinator'}, defaults: {label: 'Coordinador'} });
  await Role.findOrCreate({ where: {name: 'externalrelations'}, defaults: {label: 'Vinculador con el medio'} });
  await Role.findOrCreate({ where: {name: 'dean'}, defaults: {label: 'Decano'} });
  await Role.findOrCreate({ where: {name: 'careerdirector'}, defaults: {label: 'Jefe de carrera'} });
  await Role.findOrCreate({ where: {name: 'professor'}, defaults: {label: 'Docente'} });
  await Role.findOrCreate({ where: {name: 'student'}, defaults: {label: 'Alumno voluntario'} });
  await Role.findOrCreate({ where: {name: 'community'}, defaults: {label: 'Comunidad'} });
  await UserStatus.findOrCreate({ where: {name: 'active'}, defaults: {label: 'Activo'} });
  await UserStatus.findOrCreate({ where: {name: 'inactive'}, defaults: {label: 'Inactivo'} });
  await User.findOrCreate({ where: { username: '20.349.272-3' }, defaults: {password: await authentication.cryptPassword('123'), email: 'matias.salas@alu.ucm.cl', first_name: 'Matias Nicolas', last_name: 'Salas Sepulveda', address: 'Santa María 660', phone: '+56930853894', image: 'http://localhost:8080/attachments/avatarDefault.png', id_role: 1, id_user_status: 1, created_at: new Date()} });
  await User.findOrCreate({ where: { username: '20.564.236-6' }, defaults: {password: await authentication.cryptPassword('123'), email: 'alex.gajardo@alu.ucm.cl', first_name: 'Alex Nicolas', last_name: 'Gajardo Sanchez', address: '9 Ote. 30 sur Pje. 31 493 Villa Brisas Del Maule', phone: '+56936341033', image: 'http://localhost:8080/attachments/avatarDefault.png', id_role: 8, id_user_status: 1, created_at: new Date()} });
  await User.findOrCreate({ where: { username: '8.698.796-1' }, defaults: {password: await authentication.cryptPassword('123'), email: 'mjarur@ucm.cl', first_name: 'Mary Carmen', last_name: 'Jarur Muñoz', address: 'Chorrillos 1167', phone: '+56712203306', image: 'http://localhost:8080/attachments/avatarDefault.png', id_role: 6, id_user_status: 1, created_at: new Date()} });
  await User.findOrCreate({ where: { username: '7.817.164-2' }, defaults: {password: await authentication.cryptPassword('123'), email: 'haraya@ucm.cl', first_name: 'Hugo Antonio', last_name: 'Araya Carrasco', address: 'Vi Galilea 9 Pte 0 228', phone: '+56712633436', image: 'http://localhost:8080/attachments/avatarDefault.png', id_role: 5, id_user_status: 1, created_at: new Date()} });
  await User.findOrCreate({ where: { username: '16.303.922-2' }, defaults: {password: await authentication.cryptPassword('123'), email: 'ccastrob@ucm.cl', first_name: 'Carlos Andres', last_name: 'Castro Bustamante', address: 'Mataquito 90 Licanten', phone: null, image: 'http://localhost:8080/attachments/avatarDefault.png', id_role: 5, id_user_status: 1, created_at: new Date()} });
  await Headquarter.findOrCreate({ where: {name: 'ucm1'}, defaults: {label: 'Campus San Miguel'} });
  await Headquarter.findOrCreate({ where: {name: 'ucm2'}, defaults: {label: 'Campus Nuestra Señora del Carmen'} });
  await Headquarter.findOrCreate({ where: {name: 'ucm3'}, defaults: {label: 'Campus San Isidro'} });
  await Faculty.findOrCreate({ where: {name: 'medicina'}, defaults: {label: 'Facultad de Medicina'} });
  await Faculty.findOrCreate({ where: {name: 'educacion'}, defaults: {label: 'Facultad de Ciencias de la Educación'} })
  await Faculty.findOrCreate({ where: {name: 'salud'}, defaults: {label: 'Facultad de Ciencias de la Salud'} });
  await Faculty.findOrCreate({ where: {name: 'ingenieria'}, defaults: {label: 'Facultad de Ciencias de la Ingeniería'} });
  await Faculty.findOrCreate({ where: {name: 'socialesyeconomia'}, defaults: {label: 'Facultad de Ciencias Sociales y Económicas'} });
  await Faculty.findOrCreate({ where: {name: 'agrariasyforestales'}, defaults: {label: 'Facultad de Ciencias Agrarias y Forestales'} });
  await Faculty.findOrCreate({ where: {name: 'religiosasyfilosoficas'}, defaults: {label: 'Facultad de Ciencias Religiosas y Filosóficas'} });
  await Faculty.findOrCreate({ where: {name: 'basicas'}, defaults: {label: 'Facultad de Ciencias Básicas'} });
  await Career.findOrCreate({ where: {name: 'bachilleratocienciasbiomedicas'}, defaults: {label: 'Bachillerato en Ciencias Biomédicas', id_faculty: 1, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'bioingenieriamedica'}, defaults: {label: 'Bioingeniería Médica', id_faculty: 1, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'medicina'}, defaults: {label: 'Medicina', id_faculty: 1, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'quimicayfarmacia'}, defaults: {label: 'Química y Farmacia', id_faculty: 1, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'educacionespecialtalca'}, defaults: {label: 'Pedagogía en Educación Especial', id_faculty: 2, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'educacionespecialcurico'}, defaults: {label: 'Pedagogía en Educación Especial', id_faculty: 2, id_headquarter: 2} });
  await Career.findOrCreate({ where: {name: 'educacionfisica'}, defaults: {label: 'Pedagogía en Educación Física', id_faculty: 2, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'educaciongeneralbasicaconmencioncurico'}, defaults: {label: 'Pedagogía en Educación General Básica con Mención', id_faculty: 2, id_headquarter: 2} });
  await Career.findOrCreate({ where: {name: 'educaciongeneralbasicaconmenciontalca'}, defaults: {label: 'Pedagogía en Educación General Básica con Mención', id_faculty: 2, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'educacionparvulariaconmenciontalca'}, defaults: {label: 'Pedagogía en Educación Parvularia con Mención', id_faculty: 2, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'educacionparvulariaconmencioncurico'}, defaults: {label: 'Pedagogía en Educación Parvularia con Mención', id_faculty: 2, id_headquarter: 2} });
  await Career.findOrCreate({ where: {name: 'historiageografiaycienciassociales'}, defaults: {label: 'Pedagogía en Historia, Geografía y Ciencias Sociales', id_faculty: 2, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'ingles'}, defaults: {label: 'Pedagogía en Inglés', id_faculty: 2, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'lenguacastellanaycomunicacion'}, defaults: {label: 'Pedagogía en Lengua Castellana y Comunicación', id_faculty: 2, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'obstetriciaypuericultura'}, defaults: {label: 'Obstetricia y Puericultura', id_faculty: 3, id_headquarter: 2} });
  await Career.findOrCreate({ where: {name: 'enfermeriatalca'}, defaults: {label: 'Enfermería', id_faculty: 3, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'enfermeriacurico'}, defaults: {label: 'Enfermería', id_faculty: 3, id_headquarter: 2} });
  await Career.findOrCreate({ where: {name: 'kinesiologia'}, defaults: {label: 'Kinesiología', id_faculty: 3, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'nutricionydietetica'}, defaults: {label: 'Nutrición y Dietética', id_faculty: 3, id_headquarter: 2} });
  await Career.findOrCreate({ where: {name: 'psicologiatalca'}, defaults: {label: 'Psicología', id_faculty: 3, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'psicologiacurico'}, defaults: {label: 'Psicología', id_faculty: 3, id_headquarter: 2} });
  await Career.findOrCreate({ where: {name: 'terapiaocupacional'}, defaults: {label: 'Terapia Ocupacional', id_faculty: 3, id_headquarter: 2} });
  await Career.findOrCreate({ where: {name: 'tecnologiamedicaconmencion'}, defaults: {label: 'Tecnología Médica con Mención', id_faculty: 3, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'arquitectura'}, defaults: {label: 'Arquitectura', id_faculty: 4, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'construccioncivilvespertino'}, defaults: {label: 'Construcción Civil (Vespertino)', id_faculty: 4, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'ingenieriacivil'}, defaults: {label: 'Ingeniería Civil', id_faculty: 4, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'ingenieriacivilelectronica'}, defaults: {label: 'Ingeniería Civil Electrónica', id_faculty: 4, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'ingenieriacivilindustrial'}, defaults: {label: ' Ingeniería Civil Industrial', id_faculty: 4, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'ingenieriacivilinformatica'}, defaults: {label: 'Ingeniería Civil Informática', id_faculty: 4, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'ingenieriaejecucionencomputacioneinformaticavespertino'}, defaults: {label: 'Ingeniería Ejecución en Computación e Informática (Vespertino)', id_faculty: 4, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'ingenieriaejecucionengeomensuravespertino'}, defaults: {label: 'Ingeniería Ejecución en Geomensura (Vespertino)', id_faculty: 4, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'ingenieriaenautomatizacionycontrolvespertino'}, defaults: {label: 'Ingeniería en Automatización y Control (Vespertino)', id_faculty: 4, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'ingenieriaenconstruccion'}, defaults: {label: 'Ingeniería en Construcción', id_faculty: 4, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'ingenieriaenejecucionindustrialvespertino'}, defaults: {label: 'Ingeniería en Ejecución Industrial (Vespertino)', id_faculty: 4, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'ingenieriadeejecucionenadministraciondeempresas'}, defaults: {label: 'Ingeniería de Ejecución en Administración de Empresas', id_faculty: 5, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'administracionpublica'}, defaults: {label: 'Administración Pública', id_faculty: 5, id_headquarter: 2} });
  await Career.findOrCreate({ where: {name: 'contadorpublicoyauditortalca'}, defaults: {label: 'Contador Público y Auditor', id_faculty: 5, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'contadorpublicoyauditorcurico'}, defaults: {label: 'Contador Público y Auditor', id_faculty: 5, id_headquarter: 2} });
  await Career.findOrCreate({ where: {name: 'derecho'}, defaults: {label: 'Derecho', id_faculty: 5, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'ingenieriacomercial'}, defaults: {label: 'Ingeniería Comercial', id_faculty: 5, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'sociologia'}, defaults: {label: 'Sociología', id_faculty: 5, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'trabajosocialtalca'}, defaults: {label: 'Trabajo Social', id_faculty: 5, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'trabajosocialcurico'}, defaults: {label: 'Trabajo Social', id_faculty: 5, id_headquarter: 2} });
  await Career.findOrCreate({ where: {name: 'contadorauditorvespertinotalca'}, defaults: {label: 'Contador Auditor (Vespertino)', id_faculty: 5, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'contadorauditorvespertinocurico'}, defaults: {label: 'Contador Auditor (Vespertino)', id_faculty: 5, id_headquarter: 2} });
  await Career.findOrCreate({ where: {name: 'agronomia'}, defaults: {label: 'Agronomía', id_faculty: 6, id_headquarter: 3} });
  await Career.findOrCreate({ where: {name: 'ingenieriaenbiotecnologia'}, defaults: {label: 'Ingeniería en Biotecnología', id_faculty: 6, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'ingenieriaenrecursosnaturales'}, defaults: {label: 'Ingeniería en Recursos Naturales', id_faculty: 6, id_headquarter: 3} });
  await Career.findOrCreate({ where: {name: 'medicinaveterinaria'}, defaults: {label: 'Medicina Veterinaria', id_faculty: 6, id_headquarter: 3} });
  await Career.findOrCreate({ where: {name: 'agronomia'}, defaults: {label: 'Agronomía', id_faculty: 6, id_headquarter: 3} });
  await Career.findOrCreate({ where: {name: 'religionyfilosofia'}, defaults: {label: 'Pedagogía en Religión y Filosofía', id_faculty: 7, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'geologia'}, defaults: {label: 'Geología', id_faculty: 8, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'ingenieriaenestadistica'}, defaults: {label: 'Ingeniería en Estadística', id_faculty: 8, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'ingenieriamatematica'}, defaults: {label: 'Ingeniería Matemática', id_faculty: 8, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'pedagogiaenciencias'}, defaults: {label: 'Pedagogía en Ciencias', id_faculty: 8, id_headquarter: 1} });
  await Career.findOrCreate({ where: {name: 'pedagogiaenmatematicaycomputación'}, defaults: {label: 'Pedagogía en Matemática y Computación', id_faculty: 8, id_headquarter: 1} });
  await projectStatus.findOrCreate({ where: {name: 'created'}, defaults: {label: 'Creado'} });
  await projectStatus.findOrCreate({ where: {name: 'underreview'}, defaults: {label: 'En revisión'} });
  await projectStatus.findOrCreate({ where: {name: 'approved'}, defaults: {label: 'Aprobado'} });
  await projectStatus.findOrCreate({ where: {name: 'rejected'}, defaults: {label: 'Rechazado'} });
}


// HABLAR DE CARACTERISTICAS, MEDIA PAGINA APROXIMADAMENTE HABLAR DE LOS FRONTS, EXPLICAR DETALLES BENEFICIOS, -- DOCUMENTO

// CONSIDERANDO LOS BENEFICIOS DE ANGULAR, (PORQUE USAMOS ANGULAR), SE ALINIAN A LAS NECESIDADES DE ESTE PROYECTO,  -- DOCUMENTO

// HABLAR DE OTROS FRAMEWORKS DE FRONTS Y EL POQUUE OCUPAOS ANGULAR (HABLAR EL ORIGEN, BENEFCIOS Y CARACTERISTICAS) -- DOCUMENTO

// BENEFICIOS EN FORMA DE VIÑETAS -- DOCUMENTO

// OCUPAR GRAFICOS REFERENCIA, TOP EN BUSQUEDAS -- DOCUMENTO

// DESARROLLO DE HABILIDADES PROFESIONALES, MERCADO LABORAR CHILENO ANGULAR, DECISIONES TECNICAS, -- DOCUMENTO

// NODE.JS HABLAR DEL Y LUEGO DE EXPRESS EN BACKEND -- DOCUMENTO

// CUADROS COMPARATIVOS, TENDECIA A NIVEL DE CHILE -- DOCUMENTO

// SECCION DE CONTROL DE VERSIONES, HABLAR DE ORIGEN, EL PORQUE SIRVE EL CONTROL DE VERSION, HABLAR DE LOS DISTINTOS VERSIONES DE CONTROL DE VERSIONES -- DOCUMENTO

// BACKEND HABLAR DE POSTMAN, HERRAMIENTAS PARA PROBAR EL BACKEND, -- DOCUMENTO

// introduccion conceptos BASCISO ,ANTES DE CONTINUAS SE HACE NECESARIO LA DEFINICION DE ALGUNOS CONCEPTOS -- DOCUMENTO

//  CAP 2, ABAJO DE INTRODUCCION , CONCEPTOS FUNDAMENTALES (VIÑETA) (REFERENCIA, DE DONDE SE SACO) -- DOCUMENTO

// METODOLOGIA- HABLAR DE OTRAS METOLOGIAS, HABLAR DE PRO Y CONTRAS, HABLARA DE SCRUM, EL PORQUE SE ELIGIO ESA METOLOGIA -- DOCUMENTO

// INDICAR ESCUELA EN SOLICITUD DE PROYECTO  -- CUMPLIDO

// LISTADO DE CARRERAS DESDE LA FACULTAD SELECCIONADA -- CUMPLIDO

// COORDINADOR PUEDE CORREGIR LA SOLICITUD

// NO ES NECSARIO NOTIFICAR CAMBIOS EN LA SOLICITUD

// crear 4° cuarto estado, puede ser modificado mientras no este en revisado
// solicitante puede modificar mientras no este en revision
// seleccionar la carrera
// APUS = capsulas no modificables
// COTIZACION en la apu el recurso  puede ser x0
// Vincuador con el medio por facultad
// VINCULADOR CON EL MEDIO PUEDE VER OTRAS SOLICITUDES DE OTRAS FACULTADES
// ESTADO DE PROYECTO DEBEN SER MÁS DE 5
// LISTADO CON FILTRO DE PROYECTO
// ADMINISTRADOR POR FACULTAD, ADMINISTRAR FACULTAD, ASIGNAR MIENMBROS, ETC.
// COORDINADOR DE VINCULACION DE LA FACULTAD - INGRID LOPEZ, FILTRO 1, DESIGNA LA VINCULACION POR CARRERA, ASIGNA LA SOLICITUD A LAS CARRERAS
// COORDINADOR DE VICULACION DE CARRERAS - ASIGNA PROFESORES, APROBAR O RECHZAR UN PROYECTO
// VISTA DE PROFESORES VER PROYECTOS DE SU CARRERA
// ALMACENAMIENTO DE ARCHIVOS, USAR SERVICIO EXTERNO
// ENCARGAO DE LA CARRERA VINCULACION Y PASA A COTIZACION
// SOLICITUD, AÑADIR CAMPO DE CONTACTO
// ENCARGADO DE VINCULACION ASIGNA, 
// ALUMNO NO ENTRA AL SISTEMA
// PROFESOR PUEDE VER LOS POYECTOS DE LA CARRERA QUE ESTA ASOCIADO
// ESTADO DE USUARIO (ACTIVO Y NO ACTIVO) LO PUEDE MODIFICAR EL ENCARGADO DE LA CARRERA
// TODOS LOS PROFESOR PUEDEN VER LOS PROYECTOS
// DIRECCION DEL SOLICITANTE (GEOLOCALIZACION A FUTURO)(A FUTURO)
// CREAR CATEGORIA SI EL SOLICITANTE ES UN ORGANISMO O PERSONA
// REGISTER AÑADIR EL TELEFONO 
// COTIZACION, LO QUE SE VA HACER Y CUANTO VA A COSTAR
// COTIZACION PARA LEVANTAR COSTOS, 
// PROFESOR RESPONSABLE DE LA EJECUCION COTIZACIONES, PROFESOR RESPONSABLE DE LA EJECUCION OBLIGATORIO
// COTIZACION AÑADIR ESTUDIANTE ENCARGO DE VINCULACION CON EL MEDIO
// COTIZACION VA A TENER TODO LOS RECOPILADO DEL PROYECTO
// AÑADIR FECHA DE CIERRE AL CERRAR UN PROECTO, LO REALIZA VINCULADOR CON EL MEDIO
// UN PROYECTO PUEDE ESTAR UN TIEMPO CONSIDERABLEMENTE LARGO ABIERTO



// APU 1 UNIDAD QUITAR AMOUNT
// EN COTIZACION SE MODIFICA LA APU
// CREAR TABLA COTIZACION 
// MAS DE UNA APU IGUAL

//PRECIO UNITARIO X LA CANTIDAD, PRECIO TOTAL Y PRECIO CON IVA Y SIN IVA

// VER DETALLES 
// MOSTRAR INFORMACION BASICA, APUS Y RESUMEN DE VALORRES (CON IVA Y SIN IVA)

// NUEVA COTIZACION
// NOMBRE COTIZACION FECHA, ESTADO, AGREGAR APUS
// AGREGAR APU (RECURSO, PRECIO UNITARIO, CANTIDAD, SUBTOTAL
// SUBTOTAL PRECIO X CANTIDAD
// listado profesores sacar desde la pagina de ucm
// Añadir animacion de transicion a los input cuando se va a editar un item