
# Segundo entregable

## Instrucciones de Inicio

Para iniciar el proyecto, asegúrate de estar en la carpeta raíz del mismo y ejecuta uno de los siguientes comandos dependiendo de si deseas utilizar Node.js de manera directa o mediante Nodemon para reinicios automáticos durante el desarrollo:

```bash
node ./src/app.js
```

o

```bash
nodemon ./src/app.js
```

## Lista de Tareas

Aquí se muestra la lista de tareas pendientes y completadas para el proyecto. Las tareas marcadas con [Hecho] ya se han completado.

- [Hecho] Controller de productos con base de datos y modelo DAO.
- [ ] Controller de carts con base de datos y modelo DAO.
- [ ] Controller de messages con base de datos y modelo DAO.
- [ ] Implementación de indexación en la base de datos para mejorar la eficiencia de las búsquedas.
- [ ] Implementación de paginación para las vistas de productos y carritos.
- [ ] Implementación de ordenamiento descendente y ascendente según query params en las vistas de productos.
- [ ] Implementación de populate para el carrito que traiga información detallada de los productos incluidos.

## Especificaciones Adicionales

Además de las tareas listadas, se deben completar las siguientes funcionalidades específicas para las vistas:

### Vista de Productos

- Crear una vista en el router de views '/products' para visualizar todos los productos con su respectiva paginación.
  - Cada producto mostrado debe permitir al usuario:
    - Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc., además de un botón para agregar al carrito.
    - Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.

### Vista de Carritos

- Agregar una vista en '/carts/:cid' (cartId) para visualizar un carrito específico, donde se deben listar SOLO los productos que pertenecen a dicho carrito.

Recuerda marcar las tareas como [Hecho] una vez que hayan sido completadas para mantener un registro actualizado del progreso del proyecto.
