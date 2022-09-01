// let faker = require('faker');
// faker.locale="es";

//En el caso de usar ES6
import faker from 'faker';
faker.setLocale("es");
const {commerce,image}=faker;

let MAX_ITEMS=5;
export let productosFaker=[];
let fakerData=faker;
for (let i=1; i<MAX_ITEMS ; i++){
    let elementFaker={
        id:i,
        title:fakerData.commerce.productName(),
        price:fakerData.commerce.productDescription(),
        thumbnailURL:fakerData.image.imageUrl()
    }
    productosFaker.push(elementFaker)
}
//console.log(productosFaker);

//module.exports={productosFaker}

