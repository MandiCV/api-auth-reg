Servicios Web RESTFul de Registro y Autenticación
Ejemplo de Web RestFul con NodeJS que proporciona un API CRUD para gestionar una DB MongoDB de usuarios, y además permite registrar y logear dichos usuarios. Esto funciona en Ubuntu 20.04 LTS

Comenzando 🚀
Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

Ver Deployment para conocer cómo desplegar el proyecto.

Pre-requisitos 📋
Qué cosas necesitas para instalar el software y cómo instalarlas

Para este caso necesitaremos instalar MongoDB, NodeJS, Morgan, Cors y Moment y descargar y descomprimir en una carpeta todos los archivos del repositorio.

Para instalar MOngoDB habrá que seguir los siguientes pasos:

Abrimos un terminar nuevo

Accedemos a nuestra carpeta enlazada con Github o Bitbucked en nuestro caso $ cd node/api-rest

Actualizamos con $ sudo apt update

Instalamos MongoDB con $ sudo apt install -y mongodb

4.1 si ocurre algún error debido a que se interrumpe la ejecución dpkg, poner $ sudo dpkg --configure --a y volver al paso 4

En cuanto a la instalación de NodeJS:

Como en la instalación de MongoDB volvemos a actualizar con $ sudo apt update
Instalamos el gestor de paquetes de Node (npm) $ sudo apt install npm
A continuación, instalamos con npm una utilidad que ayuda a instalar y mantener las versiones de Node (se denomina n) $ sudo npm clean -f $ sudo npm i -g n
Finalmente, instalamos la última versión estable de Node JS a través de la utilidad n $ sudo n stable
Podemos comprobamos las versiones instaladas $ node --version $ npm -v

Para instalar Morgan necesitaremos escribir en el terminal:
$ npm i morgan

Para Cors:
$ npm i cors

Para Moment:

$ npm i moment

Y para Bcrypt:

$ npm i bcrypt

Instalación 🔧

Una serie de ejemplos paso a paso que te dice lo que debes ejecutar para tener un entorno de desarrollo ejecutandose

Para empezar inicializaremos la base de datos en nuestro terminal.Para ello haremos Ctrl+Alt+T para abrir una nueva pestaña.

Gracias a Systemctl podremos iniciar la base de datos. $ sudo systemctl start mongodb

Nota: Podemos comprobar su funcionamiento con $ mongo --eval 'db.runCommand({connectionstatus:1})'

En otro terminal, (ctrl+alt+T) y dentro de nuestra carpeta enlazada al repositorio remoto donde previamente tenemos instalado Nodemon para no tener que estar constantemente reiniciando nuestra aplicación con cada cambio en el código. (es opcional pero si no está instalado previamente y se desea instalar ejecutamos $ npm i -D nodemon) y también tenemos instalado Morgan (también opcional) debido a que proporciona registro de peticiones y respuestas en nuestra aplicación Express y así podemos visualizar los logs desde terminal. Ejecutaremos $ npm start para iniciar nodemon , y en otra terminal inicializaremos nuestra base de datos con $ mongo --host localhost:27017.

Ahora teniendo todo preparado con un editor de texto, nosotros usaremos code, para lo cual haremos $ code . para abrir todos los ficheros de nuestra carpeta, pegaremos todos los archivos del Github en la carpeta y en concreto nos interesa index.js. En este archivo podemos visualizar todos los end-point. En este caso contaremos con una función  GET que te devuelve los usuarios concreto app.get('/api/user') y un GET que te devuelve un usuario concreto app.get('/api/user/:id'). Además contamos con un end-pint POST app.post('/api/user') para añadir usuarios a nuestra base de datos, PUT app.put('/api/user/:id') para actualizar datos de los usuarios y DELETE app.delete('/api/user/:id') para borrar un usuario. Todo esto en cuanto al CRUD, pero en cuanto a la parte de autentificación, tenemos un GET app.get('/api/auth') que nos devuelven los usuarios en nuestra base de datos pero de forma resumida, mostrando solamente el email y la contraseña encriptada con Bcrypt. También tenemos un end-point para mostrar nuestra información (algo así como un perfil), esto lo conseguimos con un un GET app.get('/api/auth/me'). Y llegamos al grueso de la aplicación donde podemos registrar y logear usuarios. Primero para registrar un usuario usaremos POST app.post('/api/reg'), donde tendrémos que relleenar un formulario de registro, y  POST app.post('/api/auth') para loggearnos, para esto necesitaremos introducir el email y la contraseña, y el sistema comprobará la autenticidad de esta con la guardada en la base de datos, totalmente encriptada.

Todos estos end-points menos el de registro y login requiren de un sistema de autentificación Bearer-Token, el cual nos generará un token a la hora de registrarnos o iniciar sesión, el cual, necesitaremos para ejecutar las demás acciones.

Podemos hacer una pequeña prueba en el terminal para que nos devuelva las colecciones creadas, buscando en el navegador http://localhost:3000/api lo cual nos devolverá un registro de nuestras colecciones, si está vacio es que no contamos con ninguna en este momento.

Ejecutando las pruebas ⚙️
Para ejecutar las pruebas tendremos que importar el archivo crud.postman_collection.json en el que hay una colección exportada de Postman. Para esto en nuestro caso usaremos Postman. Si no usas Postman saltar el siguiente párrafo.

Para esto tendremos que tener una cuenta en Postman e instalarlo $ sudo snap install postman Posteriormente iniciamos postman e importamos el archivo crud.postman_collection.json.

Una vez con la colección importada podemos ejecutar cualquier end-point.

Además si hemos activado Nodemon podremos ver como funciona la ejecución en el terminal.

Construido con 🛠️
Menciona las herramientas que utilizaste para crear tu proyecto

Dropwizard - El framework web usado
Maven - Manejador de dependencias
ROME - Usado para generar RSS

Contribuyendo 🖇️
Por favor lee el CONTRIBUTING.md para detalles de nuestro código de conducta, y el proceso para enviarnos pull requests.

Wiki 📖
Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra Wiki

Versionado 📌
Usamos SemVer para el versionado. Para todas las versiones disponibles, mira los tags en este repositorio.

Autores ✒️
Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios

Paco Maciá - Trabajo Inicial - pmacia
Amanda Cascales - Documentación - MandiCV
También puedes mirar la lista de todos los contribuyentes quiénes han participado en este proyecto.

Licencia 📄
Este proyecto está bajo la Licencia (Tu Licencia) - mira el archivo LICENSE.md para detalles

Expresiones de Gratitud 🎁
Comenta a otros sobre este proyecto 📢
Invita una cerveza 🍺 o un café ☕ a alguien del equipo.
Da las gracias públicamente 🤓.
etc.
