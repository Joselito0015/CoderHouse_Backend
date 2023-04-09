const fs = require('fs');

class ProductManager{
    constructor(){
        //Creamo una nueva lista vacia de productos
        this.productos=[]

        //Id inicial de los productos
        this.id=0
    
        //PATH de la ubicación de la persistencia de datos
        this.path="./src/public/DB/ProductBD.json"

        //Creamos una nueva BD en caso no se encuentre
        this.createJson()
    }

    createJson= ()=> {
        if (!fs.existsSync(this.path)) {
            const empityList=[]
            fs.writeFileSync(this.path, JSON.stringify(empityList), ()=>console.log("Creando Nuevo archivo JSON"))
        }
        else {
            return "Archivo JSON existe"
        }
    }


    getProducts=()=>{
        
        if (fs.existsSync(this.path)) {
            const data =  fs.readFileSync(this.path, ()=>console.log("Leyendo JSON file"))
        
            const list_products = JSON.parse(data)
            
            return list_products  //Retornamos productos
        }
        else {
            return "Archivo JSON No existe"
        }
    }

    saveProduct =  (producto)=>{
        const data =   fs.readFileSync(this.path, ()=>console.log("Leyendo JSON file"))
        
        const list_products = JSON.parse(data)

        list_products.push(producto)

        fs.writeFileSync( this.path,JSON.stringify(list_products, null, '\t'), 'utf-8')
    }

    addProduct= (title,description,price,thumbnail,code,stock,category)=>{
        //Validación de parametros
        console.log(title,description,price,thumbnail,code,stock,category)
        if (!isNaN(stock) && !isNaN(price) && !isNaN(code) && description.trim().length > 0 && category.trim().length > 0  && title.trim().length > 0 ){
            if (price>0 && stock>0){

            
            if (thumbnail===undefined) {
                thumbnail=[]
            }        

            //Creamos la estructura del producto
            const producto= {   
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
                category:category,
                status:true
            }

            //Buscamos por los productos hasta encontrar el coincidente
            const listProducts= this.getProducts()
            // console.log(listProducts)

            const encontrado= listProducts.find(product=>{
                let {code,...rest} = product;
                return code === producto.code;
            } )

            //En caso encontremos un producto coincidente o el array de productos esté vacio 
            if (encontrado){
                return "Error, el producto ya existe"
            }
            else{
                //Incrementamos el Id Global del manager y lo agregamos a la estructura del producto
                producto.id = listProducts.length ===0 ? 1 :  listProducts[listProducts.length-1].id + 1 
                this.saveProduct(producto)
                return "Producto guardado con éxito"
                }
            }
        }

        else
        {
            return "Error al validad parámetros"
        }
    }

    getProductById(id) {

        const listProducts=this.getProducts()
        const product = listProducts.find(p => p.id === id); //Buscamos en la lista de productos un producto con ID coincidente
        if (!product) {//En caso no encontremos un producto con ID coincidente
            return []
        }
        else{
            console.log(product) //Entregamos el producto encontrado      
            return(product)
        }
    
        
    }

    deleteProductById(id){

        const listProducts=this.getProducts()
        const indexProduct = listProducts.findIndex(p => p.id == id); //Buscamos en la lista de productos un producto con ID coincidente
        
        console.log(indexProduct)

        
        if (indexProduct>=0)  {
        listProducts.splice(indexProduct,1)
        fs.writeFileSync( this.path,JSON.stringify(listProducts, null, '\t'), 'utf-8')
        return "Se eliminó correctamente"
        }
        else {
            return `No se encontró producto con ID ${id}`
        }

        

    }


    updateProductById(id,title = undefined , description = undefined, price = undefined, thumbnail = undefined, code = undefined, stock = undefined, status = undefined, category = undefined){
        let listProducts=this.getProducts()
        const indexProduct = listProducts.findIndex(p => p.id == id); //Buscamos en la lista de productos un producto con ID coincidente
        
        console.log(indexProduct)

        console.log(title)
        console.log(listProducts[indexProduct])

        if (indexProduct>=0)  {
        if (title!=undefined)       listProducts[indexProduct].title = title
        if (description!=undefined) listProducts[indexProduct].description  = description  
        if (price!=undefined)       listProducts[indexProduct].price = JSON.parse(price)
        if (thumbnail!=undefined)   listProducts[indexProduct].thumbnail = thumbnail
        if (code!=undefined)        listProducts[indexProduct].code = JSON.parse(code)
        if (stock!=undefined)       listProducts[indexProduct].stock  = JSON.parse(stock) 
        if (status!=undefined)       listProducts[indexProduct].status  = JSON.parse(status) 
        if (category!=undefined)       listProducts[indexProduct].category  = category
        
        fs.writeFileSync( this.path,JSON.stringify(listProducts, null, '\t'), 'utf-8')
        console.log(listProducts[indexProduct])
        return "Se actualizó correctamente" 


        

        }
        else {
            return `No se encontró producto con ID ${id}`
        }
    }
}

//-------------------- Exportamos  -------------------- //

module.exports =  ProductManager