# Proyecto de E-commerce con Node.js, Express y MongoDB

Este proyecto es una aplicación de e-commerce construida con Node.js, Express y MongoDB. Implementa autenticación mediante JWT, manejo de carritos de compras, y envío de correos electrónicos usando Nodemailer.

## Configuración del Entorno

Antes de ejecutar el proyecto, asegúrate de tener un archivo `.env.development` en la raíz del proyecto con las siguientes variables de entorno:

```
PORT=8080
MONGODB=<tu_url_de_mongodb>
JWT_SECRET=<tu_secreto_jwt>
EMAIL_USER=<tu_correo_electronico>
EMAIL_PASS=<tu_contraseña_de_correo>
```

## Instalación

1. Clona el repositorio.
   ```bash
   git clone <url_del_repositorio>
   ```
2. Instala las dependencias.
   ```bash
   cd <nombre_del_proyecto>
   npm install
   ```
3. Crea el archivo `.env.development` con las variables de entorno mencionadas anteriormente.

## Ejecución

Para ejecutar el proyecto en modo desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:8080`.

## Autenticación y Uso

### Registro y Login

1. **Registro**: Visita `http://localhost:8080/register` para registrar un nuevo usuario.
2. **Login**: Visita `http://localhost:8080/login` para iniciar sesión. Al iniciar sesión, se generará un token JWT que se guardará en las cookies del navegador.

### Carrito de Compras

- Una vez que hayas iniciado sesión, se creará automáticamente un carrito de compras asociado a tu usuario.
- Para agregar productos al carrito de compras, puedes hacerlo directamente desde la base de datos o usando el API mediante herramientas como Postman.

### Endpoints de la API

Puedes utilizar los siguientes endpoints para interactuar con la API. Asegúrate de incluir el token JWT en las cookies para tener acceso a ellos.

#### Rutas de Usuarios (`/api/users`)

- **GET `/api/users`**: Obtener todos los usuarios.
- **DELETE `/api/users`**: Eliminar usuarios inactivos.
- **PUT `/api/users/:id`**: Modificar el rol de un usuario.
- **DELETE `/api/users/:id`**: Eliminar un usuario.

#### Rutas de Productos (`/api/products`)

- **GET `/api/products`**: Obtener todos los productos.
- **GET `/api/products/:id`**: Obtener un producto por su ID.
- **POST `/api/products`**: Crear un nuevo producto.
- **PUT `/api/products/:id`**: Actualizar un producto existente.
- **DELETE `/api/products/:id`**: Eliminar un producto.

#### Rutas de Carritos (`/api/cart`)

- **GET `/api/cart`**: Obtener el carrito del usuario autenticado.
- **POST `/api/cart`**: Crear un nuevo carrito.
- **POST `/api/cart/:cid/products/:pid`**: Agregar un producto al carrito.
- **DELETE `/api/cart/:cid/products/:pid`**: Eliminar un producto del carrito.
- **PUT `/api/cart/:cid`**: Actualizar los productos del carrito.
- **DELETE `/api/cart/:cid`**: Vaciar el carrito.
- **POST `/api/cart/:cid/purchase`**: Realizar la compra de los productos en el carrito.

### Vistas

Las vistas implementadas se pueden observar en `views.router.js`. Las rutas de las vistas incluyen:

- **GET `/views/cart`**: Ver el contenido del carrito de compras.
- **GET `/views/purchase`**: Confirmar la compra.
- **GET `/views/login`**: Vista de inicio de sesión.
- **GET `/views/register`**: Vista de registro.

## Herramientas Recomendadas

- **Postman**: Para probar los endpoints de la API.
- **MongoDB Atlas**: Para gestionar tu base de datos MongoDB.
