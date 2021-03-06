# Servicios Web RESTFul de Registro y Autenticaci贸n
Ejemplo de Web RestFul con NodeJS que proporciona un API CRUD para gestionar una DB MongoDB de usuarios, y adem谩s permite registrar y logear dichos usuarios. Esto funciona en Ubuntu 20.04 LTS

### Comenzando 馃殌

Estas instrucciones te permitir谩n obtener una copia del proyecto en funcionamiento en tu m谩quina local para prop贸sitos de desarrollo y pruebas.

Ver Deployment para conocer c贸mo desplegar el proyecto.

### Pre-requisitos 馃搵

Qu茅 cosas necesitas para instalar el software y c贸mo instalarlas

Para este caso necesitaremos instalar MongoDB, NodeJS, Morgan, Cors y Moment y descargar y descomprimir en una carpeta todos los archivos del repositorio.

Para instalar MOngoDB habr谩 que seguir los siguientes pasos:

Abrimos un terminar nuevo

Accedemos a nuestra carpeta enlazada con Github o Bitbucked en nuestro caso `$ cd node/api-rest`

Actualizamos con `$ sudo apt update`

Instalamos MongoDB con `$ sudo apt install -y mongodb`

4.1 si ocurre alg煤n error debido a que se interrumpe la ejecuci贸n dpkg, poner `$ sudo dpkg --configure --a` y volver al paso 4

En cuanto a la instalaci贸n de NodeJS:

Como en la instalaci贸n de MongoDB volvemos a actualizar con `$ sudo apt update`
Instalamos el gestor de paquetes de Node (npm) `$ sudo apt install npm`
A continuaci贸n, instalamos con npm una utilidad que ayuda a instalar y mantener las versiones de Node (se denomina n) `$ sudo npm clean -f` `$ sudo npm i -g n`
Finalmente, instalamos la 煤ltima versi贸n estable de Node JS a trav茅s de la utilidad n `$ sudo n stable`
Podemos comprobamos las versiones instaladas `$ node --version` `$ npm -v`

Para instalar Morgan necesitaremos escribir en el terminal:

`$ npm i morgan`

Para Cors:

`$ npm i cors`

Para Moment:

`$ npm i moment`

Y para Bcrypt:

`$ npm i bcrypt`

### Instalaci贸n 馃敡

Una serie de ejemplos paso a paso que te dice lo que debes ejecutar para tener un entorno de desarrollo ejecutandose

Para empezar inicializaremos la base de datos en nuestro terminal.Para ello haremos Ctrl+Alt+T para abrir una nueva pesta帽a.

Gracias a Systemctl podremos iniciar la base de datos. `$ sudo systemctl start mongodb`

Nota: Podemos comprobar su funcionamiento con `$ mongo --eval 'db.runCommand({connectionstatus:1})'`

En otro terminal, (ctrl+alt+T) y dentro de nuestra carpeta enlazada al repositorio remoto donde previamente tenemos instalado Nodemon para no tener que estar constantemente reiniciando nuestra aplicaci贸n con cada cambio en el c贸digo. (es opcional pero si no est谩 instalado previamente y se desea instalar ejecutamos `$ npm i -D nodemon`) y tambi茅n tenemos instalado Morgan (tambi茅n opcional) debido a que proporciona registro de peticiones y respuestas en nuestra aplicaci贸n Express y as铆 podemos visualizar los logs desde terminal. Ejecutaremos `$ npm start` para iniciar nodemon , y en otra terminal inicializaremos nuestra base de datos con `$ mongo --host localhost:27017`.

Ahora teniendo todo preparado con un editor de texto, nosotros usaremos code, para lo cual haremos `$ code .` para abrir todos los ficheros de nuestra carpeta, pegaremos todos los archivos del Github en la carpeta y en concreto nos interesa index.js. En este archivo podemos visualizar todos los end-point. 

En este caso contaremos con una funci贸n  GET que te devuelve los usuarios concreto *app.get('/api/user')* y un GET que te devuelve un usuario concreto *app.get('/api/user/:id')*. Adem谩s contamos con un end-pint POST *app.post('/api/user')* para a帽adir usuarios a nuestra base de datos, PUT *app.put('/api/user/:id')* para actualizar datos de los usuarios y DELETE app.delete *('/api/user/:id')* para borrar un usuario. 

Todo esto en cuanto al CRUD, pero en cuanto a la parte de autentificaci贸n, tenemos un GET *app.get('/api/auth')* que nos devuelven los usuarios en nuestra base de datos pero de forma resumida, mostrando solamente el email y la contrase帽a encriptada con Bcrypt. Tambi茅n tenemos un end-point para mostrar nuestra informaci贸n (algo as铆 como un perfil), esto lo conseguimos con un un GET *app.get('/api/auth/me')*. Y llegamos al grueso de la aplicaci贸n donde podemos registrar y logear usuarios. Primero para registrar un usuario usaremos POST *app.post('/api/reg')*, donde tendr茅mos que rellenar un formulario de registro, y  POST *app.post('/api/auth')* para loggearnos, para esto necesitaremos introducir el email y la contrase帽a, y el sistema comprobar谩 la autenticidad de esta con la guardada en la base de datos, totalmente encriptada.

Todos estos end-points menos el de registro y login requiren de un sistema de autentificaci贸n Bearer-Token, el cual nos generar谩 un token a la hora de registrarnos o iniciar sesi贸n, el cual, necesitaremos para ejecutar las dem谩s acciones.

Podemos hacer una peque帽a prueba en el terminal para que nos devuelva las colecciones creadas, buscando en el navegador [app](http://localhost:3000/api) lo cual nos devolver谩 un registro de nuestras colecciones, si est谩 vacio es que no contamos con ninguna en este momento.

### Ejecutando las pruebas 鈿欙笍
Para ejecutar las pruebas tendremos que importar el archivo **crud.postman_collection.json** en el que hay una colecci贸n exportada de Postman. Para esto en nuestro caso usaremos Postman. Si no usas Postman saltar el siguiente p谩rrafo.

Para esto tendremos que tener una cuenta en Postman e instalarlo `$ sudo snap install postman` Posteriormente iniciamos postman e importamos el archivo **crud.postman_collection.json**.

Una vez con la colecci贸n importada podemos ejecutar cualquier end-point.

Adem谩s si hemos activado Nodemon podremos ver como funciona la ejecuci贸n en el terminal.

### Construido con 馃洜锔?
Menciona las herramientas que utilizaste para crear tu proyecto

Dropwizard - El framework web usado
Maven - Manejador de dependencias
ROME - Usado para generar RSS

### Contribuyendo 馃枃锔?
Por favor lee el CONTRIBUTING.md para detalles de nuestro c贸digo de conducta, y el proceso para enviarnos pull requests.

### Wiki 馃摉
Puedes encontrar mucho m谩s de c贸mo utilizar este proyecto en nuestra Wiki

### Versionado 馃搶
Usamos SemVer para el versionado. Para todas las versiones disponibles, mira los tags en este repositorio.

### Autores 鉁掞笍
Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios

Paco Maci谩 - Trabajo Inicial - pmacia
Amanda Cascales - Documentaci贸n - MandiCV
Tambi茅n puedes mirar la lista de todos los contribuyentes qui茅nes han participado en este proyecto.

### Licencia 馃搫
Este proyecto est谩 bajo la Licencia (Tu Licencia) - mira el archivo LICENSE.md para detalles

### Expresiones de Gratitud 馃巵
Comenta a otros sobre este proyecto 馃摙
Invita una cerveza 馃嵑 o un caf茅 鈽? a alguien del equipo.
Da las gracias p煤blicamente 馃.
etc.
