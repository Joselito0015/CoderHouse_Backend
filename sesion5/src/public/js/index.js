const socket = io()


const listProducts = document.getElementById('listProducts')



// Obtener el formulario de edición
const editForm = document.getElementById('edit-form');

// Escuchar el evento submit del formulario de edición
editForm.addEventListener('submit', async (event) => {
  console.log("gassssasdasd")
  // Prevenir el comportamiento por defecto del formulario
  event.preventDefault();

  const url = '/api/products';

  const data = {
    title: editForm.elements.title.value,
    description: editForm.elements.description.value,
    price: parseFloat(editForm.elements.price.value),
    thumbnail: editForm.elements.thumbnail.value,
    code: parseInt(editForm.elements.code.value),
    stock: parseInt(editForm.elements.stock.value),
    category: editForm.elements.category.value
  };

  console.log(data);
  
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Respuesta:', data);
  })
  .catch(error => {
    console.error('Ha ocurrido un error:', error);
  });

  // Enviar los datos del producto mediante socket.io al servidor
  socket.emit('addProductFromClient', data);
  
  // Limpiar el formulario
  editForm.reset();
});



socket.on('newProductFromServer', data => {
    listProducts.innerHTML += `<li>${data.title}</li>
                                                    <li>${data.description}</li>
                                                    <li>${data.price}</li>
                                                    <li>${data.thumbnail}</li>
                                                    <li>${data.code}</li>
                                                    <li>${data.stock}</li>`
  })
