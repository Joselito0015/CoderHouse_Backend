const { Router } = require('express');
const ProductDao = require('../dao/class/ProductDao')


const Product = new ProductDao

const router = Router()


router.get('/', async (req, res) => {
    const { limit, page, sort, query } = req.query;

    // Preparar las opciones de ordenamiento
    const sortOptions = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

    // Preparar la consulta de búsqueda
    const searchQuery = query ? { $text: { $search: query } } : {};

    


    // Llamar al método find del DAO con los parámetros
    const products = await Product.find({
        page, // si no se provee, mongoose-paginate-v2 usará el valor predeterminado
        limit, // si no se provee, mongoose-paginate-v2 usará el valor predeterminado
        sort: sortOptions,
        query: searchQuery
    });

    const { docs, ...rest} = products 

    const info = {
        status: 200,
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.prevLink,
        nextLink: products.nextLink,
    }

    console.log(rest)

    // Renderizar la vista con los productos
    res.render('home.handlebars', { products: products.docs, info: info });
});





router.get('/:pid', async (req,res) =>{
    const id=  req.params.pid
    const response = await Product.findOne(id)
    res.json({resolve:response})  
})


router.post('/', async  (req,res) =>{
    const {title,description,price,thumbnail,code,stock,category} = req.body

    const newProduct= {   
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        category:category,
        status:true
    }
    const response= await Product.create(newProduct)
    res.json({resolve: response})
})



router.put('/:pid', async  (req,res) =>{
    const id = req.params.pid
    const {title,description,price,thumbnail,code,stock,category,status} = req.body
    
    const product= {
        _id:id,   
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        category:category,
        status:status
    }
    const response=  await Product.updateOne(product)
    res.json({resolve: response})
})


router.delete('/:pid', async  (req,res) =>{
    const id = req.params.pid
    const response= await Product.deleteOne(id)
    res.json({resolve: response})
})



module.exports = router;
