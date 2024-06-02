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

3. Montar:

En la raiz del proyecto (la altura donde se encuentra el package.json) ejecute "docker-compose up",
el proyecto construira la imagen y la expondrá en el puerto 3006 

http://localhost:3006/api/

puede hacer las siguiente consultas

http://localhost:3006/api/get  (para obtener todos los libros) POST

http://localhost:3006/api/getBook/:id  (para obtener book en base a su ID, debe enviarse un id por params) GET

http://localhost:3006/api/delete/:id  (Para eliminar un book por ID, enviar referencia en params) DELETE

http://localhost:3006/api/upload  (Para cargar un book, el archivo debe subirse con el nombre "file", ademas debe tener 

una propiedad "title" en el body) POST

http://localhost:3006/api/query/:idBook  (Para interactuar con la IA, debe enviarse un id del libro en parametros

y una propiedad "question" en el cuerpo del body) POST