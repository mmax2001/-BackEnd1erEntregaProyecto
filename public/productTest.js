//Genero la tabla con los productos emitidos desde el servidor
const socket = io();

// function generarTablaFaker(products) {
    //     return fetch('/layouts/layout.hbs')
    //         .then(respuesta => respuesta.text())
    //         .then(plantilla => {
        //             const template = Handlebars.compile(plantilla);
//             const html = template({ products })
//             return html
//         })
// }

// generarTabla(products).then(html=>{
//     document.getElementById('productsListFaker').innerHTML=html
// })

function generarTabla(products) {
    return fetch('/layouts/productsList.hbs')
    .then(respuesta => respuesta.text())
    .then(plantilla => {
        const template = Handlebars.compile(plantilla);
        const html = template({ products })
        return html
    })
}
socket.on('listadoFaker',products=>{
    generarTabla(products).then(html=>{
        document.getElementById('productsListFaker').innerHTML=html
    })
})