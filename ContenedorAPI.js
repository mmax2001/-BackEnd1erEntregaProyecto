
//Declaro la clase Contenedor con los metodos requeridos

class ContenedorAPI{
constructor(){
        this.prodListAPI=[];
    }

    getAll(){
        return this.prodListAPI;
    }

    getByID(ID){
        if(this.prodListAPI.length>0){             
                const prodToFind=this.prodListAPI.filter(product=>product.id===ID);             
                if(prodToFind){
                    return prodToFind;
                }
                else{
                    return null;
                }
            }
        return null 
    }

    deleteByID(ID){
        const indexOfID=this.prodListAPI.findIndex(producto=>{return producto.id==ID});
            console.log(indexOfID);
            if(indexOfID!=-1) {
                const prodNonDelete=this.prodListAPI.filter(producto=>producto.id!=ID);
                //console.log(`Se borro exitosamente el producto con id : ${ID}`);
                this.prodListAPI=prodNonDelete
                return this.prodListAPI;
            }
            else{
                return null
            }
    }

    save(newProduct){
        let newID;
        if (this.prodListAPI.length === 0) {
            newID=1;
        } 
        else{
            newID=(this.prodListAPI[this.prodListAPI.length-1].id)+1; 
        }
        const prodToAdd = {...newProduct,id:newID}; 
        this.prodListAPI.push(prodToAdd);
        return newID;
    }

    update(newProd,ID){
        if(this.prodListAPI.length>0){
            const productIndex = this.prodListAPI.findIndex((product) => product.id == ID);
            if (productIndex === -1) return { error: true };
            this.prodListAPI[productIndex] = {...this.prodListAPI[productIndex],...newProd,}; //copie el producto en esa posicion y le paso la nueva info
            //Sino actualizar asi :
            // const prodToUpdate=this.prodListAPI.find(product=>product.id===ID)
            // console.log("ESTO DEVUELVE METODO UPDATE",prodToUpdate);
            // if (prodToUpdate!=undefined){
            //     prodToUpdate.title=newProd.title
            //     prodToUpdate.price=newProd.price
            //     prodToUpdate.thumbnail=newProd.thumbnail;
            // } 
            // else{
            //     return null;
            // }
        }
        else{
            return null;
        }
    }

}
export default ContenedorAPI

// // //TEST DE METODOS DE LA CLASE
// // const prodTest=new ContenedorAPI;
// // let prod=[
// //     {
// //       title: "Calculadora",
// //       price: 234.56,
// //       thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
// //       id: 2
// //     },
// //     {
// //       title: "Globo Terráqueo",
// //       price: 345.67,
// //       thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
// //       id: 3
// //     }
// // ]

// // prodTest.prodListAPI=prod;
// // console.log(prodTest.getAll())
// // console.log(prodTest.getByID(2))
// // let testObject2={
// //     title:"Pincel",
// //     price:123.45,
// //     thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",            
// // };
// // prodTest.save(testObject2)
// // console.log(prodTest.getAll());
// // prodTest.update(testObject2,2)
// // console.log(prodTest.getAll())
// // prodTest.deleteByID(2)
// // console.log(prodTest.getAll())    


