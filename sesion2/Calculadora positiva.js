// calculadora positiva


const dividir = (divisor, dividendo)=>{
    return new Promise ((resolve, reject) =>{
        if (dividendo === 0){
            reject('No se puede dividir entre cero')
        } else {
            resolve(dividendo/divisor)
        }
    })
}

const sumar = (sumando1,sumando2)=>{
    return new Promise((resolve, reject) =>{
        if (sumando1 === 0){
            reject('Operacion inecesaria')
        }
        else
        {
            resolve(sumando1+sumando2)
        }
    })
}


const restar = (minuendo,sustraendo)=>{
    return new Promise((resolve, reject) =>{
        if (sustraendo === 0 || minuendo===0){
            reject('Operacion invalida')
        }
        else if(minuendo - sustraendo < 0){
            reject('la calculadora solo puede devolver valores positivos')     
        }
        else
        {
            resolve(sumando1+sumando2)
        }
    })
}

const multiplicar = (num1,num2)=>{
    return new Promise((resolve, reject) =>{
        if (num1 === 0 || num2 === 0){
            reject('Los valores no pueden ser cero')
        }
        else if(num1 * num2<0){
            reject('La calculadora solo puede resolver valores positivos')
        }
        else
        {
            resolve(num1*num2)
        }
    })
}



const calculadora =  async (num1,num2,cal)=>{
    try{
        const respuesta = await cal(num1,num2)
        console.log(respuesta)
    }
    catch(error){
        console.log(error)
    }
}

calculadora(2,4,multiplicar)