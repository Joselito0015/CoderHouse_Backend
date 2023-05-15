const fs = require('fs');
const Product = require('../models/Products.model')

class ProductDao{

    find = async()=>{
            // const data =  fs.readFileSync(this.path, ()=>console.log("Leyendo JSON file"))
            try {
                const products = await Product.find().lean()
                return products
            }
            catch (error) {
                return error
            }
    }

    create = async (producto)=>{
          
        try {
            const filter = { "code": producto.code };
            const existingProduct = await Product.findOne(filter);

            if (existingProduct) {
                return `Ya existe un producto con el código ${producto.code}.`
            }     
        }
        catch (error) {
            return error
        }

        try {
            const response = await Product.create(producto);
            return response
        }
        catch (error) {
            // Si es otro tipo de error
            return error
        }

    }


    findOne = async(_id) => {
        const filter = { "_id": _id };
        try {
            const product = await Product.findOne(filter).lean();
            return product
        }
        catch (error) {
            return error
        }
    }

    
    deleteOne = async(_id) =>{
        const filter = { "_id": _id };
        try {
            const response = await Product.deleteOne(filter)
            return response
        }
        catch (error) {
            return error
        }
    }


    updateOne = async (product) =>{
       
        const {_id,...rest} = product;
        const filter = { "_id": _id}
        
        try {
            const response = await Product.updateOne(filter,rest)
            return response
        }
        catch (error) {
            return error
        }     

    }
}

//-------------------- Exportamos  -------------------- //

module.exports =  ProductDao