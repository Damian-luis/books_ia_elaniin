# Elaniin Books IA

## Descripción

Elaniin Books IA es una aplicación web para la gestión y visualización de libros. Los usuarios pueden buscar, subir y navegar a través de libros.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express, Typescript
- **Base de Datos**: PostgressSQL base de datos remota
- **Contenedores**: Docker

## Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- Docker (si deseas usar la configuración Docker)

### Configuración Local

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/elaniin-books-ia.git
cd elaniin-books-ia

2. Creación de las variables de entorno:

Ingrese a la carpeta clonada, cree un archivo .env y en el mismo pegue las credenciales que se les enviará por correo

(
OPCIONAL:
Puede clonar el frontend, dentro de la carpeta creada en la clonacion del backend books_ia_elaniin, dentro de la misma debe clonar el repositorio

https://github.com/Damian-luis/elaniin_front

alli debe agregar el archivo .env del frontend, cuando lo haya hecho dirigirse a la raiz del backend
y ejecutar 

docker-compose up

automaticamente buscará los dockerfiles del cliente y el servidor y los montará y correrá,
acceda a la app en http://localhost:3000/ 

la estructura debe quedar:

books_ia_elaniin/
               Dockerfile
               docker-compose.yml
               (otras carpetas)
               /elaniin_front  (el cliente debe ser clonado como hijo del servidor)
               .env
               (a este nivel ejecutar docker-compose up)
)

3. Montar:

En la raiz del proyecto (la altura donde se encuentra el package.json) ejecute 

"docker build -t nombre_de_la_imagen ."

 luego 

 "docker run -p 3006:3006 --env-file .env nombre_de_la_imagen"

el proyecto construira la imagen y la expondrá en el puerto 3006 

¡IMPORTANTE!

Recomiendo si se desea ejecutar los test ejecutarlos una vez o ir cambiando el id para los test que interactuen con un libro en especifico, ejemplo get,delete,askquestion
al momento de correr los test tambien se testea un DELETE, por lo cual al hacer tantos intentos termine de eliminar todos los libros o un libro especifico y el test que hace la consulta a X libro especifico no funcionará, entonces retornará false y el test fallará

http://localhost:3006/api/

puede hacer las siguiente consultas

http://localhost:3006/api/get  (para obtener todos los libros) POST

http://localhost:3006/api/getBook/:id  (para obtener book en base a su ID, debe enviarse un id por params) GET

http://localhost:3006/api/delete/:id  (Para eliminar un book por ID, enviar referencia en params) DELETE

http://localhost:3006/api/upload  (Para cargar un book, el archivo debe subirse con el nombre "file", ademas debe tener 

una propiedad "title" en el body) POST

http://localhost:3006/api/query/:idBook  (Para interactuar con la IA, debe enviarse un id del libro en parametros

y una propiedad "question" en el cuerpo del body) POST

Adicionalmente, puedes clonar el frontend de la aplicacion

https://github.com/Damian-luis/elaniin_front

ejecutar "npm install", luego "npm run dev" y se ejecutará en el puerto 3000

puedes acceder a él en

http://localhost:3000/

las variables de entorno para ambos se enviarán por mail.