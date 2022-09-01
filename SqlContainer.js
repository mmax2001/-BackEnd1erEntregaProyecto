class SqlContainer {
    constructor(knexConnector,nameOfTable){
        this.knex=knexConnector;
        this.table=nameOfTable;
    }

    async getAll() {
        let rows;
        rows = await this.knex.from("productos").select("*")
        console.log(rows)
        for (const row of rows) console.log (`ID:${row[ "id" ]} - Nombre:${row[ "title" ]} - Precio:$${row[ "price" ]}`)
        return rows;
    }

    async getById(ID) {
        let rows;
        rows = await this.knex.from("productos").where({id:ID})
        for (const row of rows) console.log (`ID:${row[ "id" ]} - Nombre:${row[ "title" ]} - Precio:$${row[ "price" ]}`)
        return rows;
    }
    
    async save(element) {
        try {
            const response = await this.knex.insert(element).into(this.table);
            return response;
        } catch (error) {
             return error;
        }
    }

    async deleteById(ID){
        try {
            await this.knex(this.table).where({id:ID}).del()
        } catch (error) {
            console.log(error);
        }
    }
}

//module.exports=SqlContainer
export default SqlContainer

// borrarArticuloPorId(id) {
//         return this.Knex.from(this.nombreTabla).where('id', id).del()
//     }

// const deleteProducts = async (knex,ID,all)=>{
//   try {
//     if(all==true){
//       await knex('productos').del()
//       console.log('productos eliminados')
//     }else{
//       await knex('productos').where({id:ID}).del()
//       console.log('producto eliminado')
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }