// Importar mongoose y el modelo Product
const Product = require('../dao/models/Products.model');


// Lista de productos de prueba
const products = [
    {
        title: 'Producto 1',
        description: 'Descripción del Producto 1',
        price: 10.5,
        thumbnail: 'http://example.com/product1.jpg',
        code: 1001,
        stock: 20,
        category: 'Categoría 1',
        status: true
    },
    {
        title: 'Producto 2',
        description: 'Descripción del Producto 2',
        price: 20.5,
        thumbnail: 'http://example.com/product2.jpg',
        code: 1002,
        stock: 10,
        category: 'Categoría 2',
        status: true
    },
    {
        title: 'Producto 3',
        description: 'Descripción del Producto 3',
        price: 30.5,
        thumbnail: 'http://example.com/product3.jpg',
        code: 1003,
        stock: 5,
        category: 'Categoría 5',
        status: true
    },
    {
        title: 'Producto 4',
        description: 'Descripción del Producto 4',
        price: 40.5,
        thumbnail: 'http://example.com/product4.jpg',
        code: 1004,
        stock: 15,
        category: 'Categoría 5',
        status: true
    },
    {
        title: 'Producto 5',
        description: 'Descripción del Producto 5',
        price: 50.5,
        thumbnail: 'http://example.com/product5.jpg',
        code: 1005,
        stock: 25,
        category: 'Categoría 5',
        status: true
    },
    {
        title: 'Producto 6',
        description: 'Descripción del Producto 6',
        price: 60.5,
        thumbnail: 'http://example.com/product6.jpg',
        code: 1006,
        stock: 30,
        category: 'Categoría 5',
        status: true
    },
    //inserta 10 productos más
    {
        title: 'Producto 7',
        description: 'Descripción del Producto 7',
        price: 70.5,
        thumbnail: 'http://example.com/product7.jpg',
        code: 1007,
        stock: 40,
        category: 'Categoría 5',
        status: true
    },
    {
        title: 'Producto 8',
        description: 'Descripción del Producto 8',
        price: 80.5,
        thumbnail: 'http://example.com/product8.jpg',
        code: 1008,
        stock: 35,
        category: 'Categoría 6',
        status: true
    },
    {
        title: 'Producto 9',
        description: 'Descripción del Producto 9',
        price: 90.5,
        thumbnail: 'http://example.com/product9.jpg',
        code: 1009,
        stock: 45,
        category: 'Categoría 6',
        status: true
    },
    {
        title: 'Producto 10',
        description: 'Descripción del Producto 10',
        price: 100.5,
        thumbnail: 'http://example.com/product10.jpg',
        code: 1010,
        stock: 50,
        category: 'Categoría 6',
        status: true
    },
    {
        title: 'Producto 11',
        description: 'Descripción del Producto 11',
        price: 110.5,
        thumbnail: 'http://example.com/product11.jpg',
        code: 1011,
        stock: 55,
        category: 'Categoría 6',
        status: true
    },
    {
        title: 'Producto 12',
        description: 'Descripción del Producto 12',
        price: 120.5,
        thumbnail: 'http://example.com/product12.jpg',
        code: 1012,
        stock: 60,
        category: 'Categoría 12',
        status: true
    },
    {
        title: 'Producto 13',
        description: 'Descripción del Producto 13',
        price: 130.5,
        thumbnail: 'http://example.com/product13.jpg',
        code: 1013,
        stock: 65,
        category: 'Categoría 13',
        status: true
    },
    {
        title: 'Producto 14',
        description: 'Descripción del Producto 14',
        price: 140.5,
        thumbnail: 'http://example.com/product14.jpg',
        code: 1014,
        stock: 70,
        category: 'Categoría 14',
        status: true
    },
    {
        title: 'Producto 15',
        description: 'Descripción del Producto 15',
        price: 150.5,
        thumbnail: 'http://example.com/product15.jpg',
        code: 1015,
        stock: 75,
        category: 'Categoría 15',
        status: true
    },
    {
        title: 'Producto 16',
        description: 'Descripción del Producto 16',
        price: 160.5,
        thumbnail: 'http://example.com/product16.jpg',
        code: 1016,
        stock: 80,
        category: 'Categoría 16',
        status: true
    },
    {
        title: 'Producto 17',
        description: 'Descripción del Producto 17',
        price: 170.5,
        thumbnail: 'http://example.com/product17.jpg',
        code: 1017,
        stock: 85,
        category: 'Categoría 17',
        status: true
    },
    {
        title: 'Producto 18',
        description: 'Descripción del Producto 18',
        price: 180.5,
        thumbnail: 'http://example.com/product18.jpg',
        code: 1018,
        stock: 90,
        category: 'Categoría 18',
        status: true
    },
    {
        title: 'Producto 19',
        description: 'Descripción del Producto 19',
        price: 190.5,
        thumbnail: 'http://example.com/product19.jpg',
        code: 1019,
        stock: 95,
        category: 'Categoría 19',
        status: true
    },
    {
        title: 'Producto 20',
        description: 'Descripción del Producto 20',
        price: 200.5,
        thumbnail: 'http://example.com/product20.jpg',
        code: 1020,
        stock: 100,
        category: 'Categoría 20',
        status: true
    }

];

// Función para insertar productos de prueba
const insertTestProducts = async () => {
    try {
        // Eliminar todos los productos existentes (opcional)
        await Product.deleteMany({});
        
        // Insertar productos de prueba
        await Product.insertMany(products);
        console.log('Productos de prueba insertados');
    } catch (error) {
        console.error('Error insertando productos de prueba', error);
    } 
};


module.exports = insertTestProducts;