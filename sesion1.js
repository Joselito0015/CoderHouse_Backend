class ProductManager{
    constructor(){
        this.productos=[]
        this.id=0
    }

    getProducts=()=>{
        console.log(this.productos)
        return this.productos
    }


    addProduct=(title,description,price,thumbnail,code,stock)=>{
        const producto= {   
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }


        const encontrado= this.productos.find(product=>{
            let {id,...rest} = product;
            rest === producto
        } )



        if (encontrado || this.productos.length==0){
            producto.id = this.id++;
            this.productos.push(producto)
        }
        else{
            console.log("Producto ya existe")
        }
    }


    getProductById(id) {
        const product = this.productos.find(p => p.id === id);
        if (!product) {
            console.log('Producto no encontrado')
        }
        else{
            console.log(product)            
        }
    }


}



manager=new ProductManager()
manager.getProducts()
manager.addProduct(
    title= "producto prueba",
    description="Este es un producto prueba",
    price=200,
    thumbnail="Sin imagen",
    code="abc123",
    stock=25
)

manager.getProducts()

manager.addProduct(
    title= "producto prueba",
    description="Este es un producto prueba",
    price=200,
    thumbnail="Sin imagen",
    code="abc123",
    stock=25
)

manager.getProductById(1)