class ProductManager{
    constructor(){
        //Creamo una nueva lista vacia de productos
        this.productos=[]

        //Id inicial de los productos
        this.id=0
    }

    getProducts=()=>{
        // Mostramos los productos en consola
        console.log(this.productos)
        return this.productos  //Retornamos productos
    }


    addProduct=(title,description,price,thumbnail,code,stock)=>{



        //Validación de parametros
        if (!isNaN(stock) && !isNaN(price) && thumbnail.trim().length > 0 && code.trim().length > 0 && description.trim().length > 0 && title.trim().length > 0 ){
            if (price>0 && stock>0){
            //Creamos la estructura del producto
            const producto= {   
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            }

            //Buscamos por los productos hasta encontrar el coincidente
            const encontrado= this.productos.find(product=>{
                let {code,...rest} = product;
                return code === producto.code;
            } )

            //En caso encontremos un producto coincidente o el array de productos esté vacio 
            if (!encontrado || this.productos.length==0){
                
                producto.id = this.id++; //Incrementamos el Id Global del manager y lo agregamos a la estructura del producto
                this.productos.push(producto) //Agregamos el nuevo producto al  array 
            }
            else{
                console.log("Producto ya existe")
                }
            }
        }

        else
        {
            console.log("Error al validad parámetros")
        }


    }

    getProductById(id) {
        const product = this.productos.find(p => p.id === id); //Buscamos en la lista de productos un producto con ID coincidente
        if (!product) {//En caso no encontremos un producto con ID coincidente
            console.log('Not Found')
        }
        else{
            console.log(product) //Entregamos el producto encontrado      
        }
    }


}

//-------------------- Programa principal  -------------------- //

//Instanciamos al manager
manager=new ProductManager()

//Obtenemos los productos
manager.getProducts()

//Agregamos un nuevo producto
manager.addProduct(
    title= "producto prueba",
    description="Este es un producto prueba",
    price=200,
    thumbnail="Sin imagen",
    code="abc123",
    stock=25
)

//Obtenemos los productos
manager.getProducts()

//Agregamos el mismo producto previamente agregado
manager.addProduct(
    title= "producto prueba",
    description="Este es un producto prueba",
    price=200,
    thumbnail="Sin imagen",
    code="abc123",
    stock=25
)

//Preguntamos por un producto fuera del array
manager.getProductById(1)