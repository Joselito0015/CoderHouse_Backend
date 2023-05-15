const fs = require('fs');
const ProductManager = require('./ProductDao');
const PManager = new ProductManager


class cartManager{
    constructor(){
        //Creamo una nueva lista vacia de productos
        this.productos=[]

        //Id inicial de los productos
        this.id=0
    
        //PATH de la ubicación de la persistencia de datos
        this.path="./src/public/DB/CartBD.json"

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


    getCarts=()=>{
        
        if (fs.existsSync(this.path)) {
            const data =  fs.readFileSync(this.path, ()=>console.log("Leyendo JSON file"))
        
            const list_products = JSON.parse(data)

            return list_products  //Retornamos productos
        }
        else {
            return "Archivo JSON No existe"
        }
    }

    saveCart =  (cart)=>{
        const data =   fs.readFileSync(this.path, ()=>console.log("Leyendo JSON file"))
        
        const list_products = JSON.parse(data)

        list_products.push(cart)

        fs.writeFileSync( this.path,JSON.stringify(list_products, null, '\t'), 'utf-8')
    }

    addCart= ()=>{
        //Validación de parametros
        
        //Creamos la estructura del producto
        const cart= {   
            Products: [],
        }

        //Buscamos todos los carritos
        const listCarts= this.getCarts()

        //En caso encontremos un producto coincidente o el array de productos esté vacio 
        //Incrementamos el Id Global del manager y lo agregamos a la estructura del producto
        cart.id = listCarts.length ===0 ? 1 :  listCarts[listCarts.length-1].id + 1 
        this.saveCart(cart)
        return "carrito creado con éxito"

    }
  

    getCartById(id) {

        const listCarts=this.getCarts()
        const cart = listCarts.find(c => c.id == id); //Buscamos en la lista de productos un producto con ID coincidente
        if (!cart) {//En caso no encontremos un producto con ID coincidente
            return "Carrito no encontrado"
        }
        else{
             //Entregamos el producto encontrado      
            return cart.Products
        }
    
        
    }

    getProductsFromCartById(cid,pid) {

        const listCarts=this.getCarts()
        //Buscamos en la lista de productos un producto con ID coincidente
        const cart = listCarts.find(c => c.id == cid); 
        
        if (!cart) {
            return "Carrito no encontrado"
        }

        //Entregamos el producto encontrado
        const listProductsfromCart = cart.Products
        //Buscamos  si hay un index product conincidente
        const indexProduct = listProductsfromCart.findIndex(p => p.id == pid)

        //verificamos si el producto existe
        if (indexProduct<0){
            
            const productFind= PManager.getProductById(pid)

            if (productFind.length > 0){
                return "Producto No encontrado"
            }

            const product ={
                id: pid,
                quantity: 1
            }
            
            cart.Products.push(product)
            const indexCart = listCarts.findIndex(c => c.id == cid)
            listCarts[indexCart]=cart

            fs.writeFileSync( this.path,JSON.stringify(listCarts, null, '\t'), 'utf-8')
            return "Producto agregado con éxito"
        }

        //aumentamos la candidad en uno
        cart.Products[indexProduct].quantity=cart.Products[indexProduct].quantity + 1

        //Buscamos el indice del carrito y volvemos a agregarlo
        const indexCart = listCarts.findIndex(c => c.id == cid)
        listCarts[indexCart]=cart

        //actualizamos el archivo JSON 
        fs.writeFileSync( this.path,JSON.stringify(listCarts, null, '\t'), 'utf-8')

        return "Producto aumentado"
        
    }

}




//-------------------- Exportamos  -------------------- //

module.exports =  cartManager