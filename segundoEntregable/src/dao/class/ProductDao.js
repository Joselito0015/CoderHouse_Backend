const Product = require('../models/Products.model')

class ProductDao{

    find = async ({ page = 1, limit = 10, sort = {}, query = {} }) => {
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: sort,
            lean: true
        };
    
        try {
            const result = await Product.paginate(query, options);
            return result; // Esto incluirá los documentos paginados y otra información como total de páginas, etc.
        } catch (error) {
            return error;
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
            const updatedDocument = await Product.findOneAndUpdate(filter, rest, {
                new: true, // Devuelve el documento actualizado
                runValidators: true // Opcional: ejecuta las validaciones definidas en el esquema
              });
            return updatedDocument
        }
        catch (error) {
            return error
        }     

    }
}

//-------------------- Exportamos  -------------------- //

module.exports =  ProductDao