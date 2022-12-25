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
            id:this.id++,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }


        if (this.products.some(p => p.code === product.code)) {
            console.log('Product code already exists');
          }

        this.productos.push(producto)
       

    }


    getProductById(id) {
        const product = this.productos.find(p => p.id === id);
        if (!product) {
            console.log('Producto no encontrado')
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

manager.getProducts()


manager.getProductById(5)