<template>

  <section class="src-components-usuarios-registrados">
    <h1> Gastos cargados en formulario </h1>

      <div v-if="datosForm.length" class="table-responsive">
          <table class="table">
            <tr class="bg-success text-white">
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Importe</th>
               <th>Fecha</th>
            </tr>
            <tr
              class="bg-info text-white"
              v-for="(dato, index) in datosForm"
              :key="index"
            >
              <td>{{ dato.nombre }}</td>
              <td>{{ dato.descripcion }}</td>
              <td>{{ ponerPeso(dato.importe) }}</td>
              <td>{{formatearFecha(dato.createdAt) }}</td>  

            </tr>
            <tr v-bind:style="{ color: colorCalculado }" >
              <td colspan="2">Gasto total</td>
              <td colspan="2">{{calcularTotal}}</td>
            </tr>
          </table>
          </div>
 <h2 v-else class="alert alert-warning">No se encontraron nuevos datos cargados</h2>



  </section>

</template>

<script>

  import Filtros from '../Filtros.js'

  export default  {
    name: 'src-components-usuarios-registrados',
    mixins : [Filtros],
    props: [],
    components: {
     
  },
    mounted () {
      this.getDatosForm()
    },
    data () {
      return {
        url : 'https://5f789e6d66d4960016c49ded.mockapi.io/datosform',
        datosForm:[],
      }
    },
    methods: {

      //pedido de los datos almacenados en el backend - GET
      async getDatosForm(){
        try {
      let response= await this.axios(this.url)
      console.log(response.data)
      this.datosForm=response.data;    // cargo el array de datos con los datos del form que viene del backend
        } catch (error) {
          console.log('get error' , error)
        }

      },

      


    },
    computed: {
      colorCalculado() {
        let total = this.calcularTotal;
        let color = 'magenta';
        if(total<1000){
          color = 'green';
        }else if (total>5000){
          color = 'orange';
        }
        return color;
      },

      calcularTotal(){
        let total = 0;
        for (let index = 0; index < this.datosForm.length; index++) {
          const element = this.datosForm[index];
          if(element.importe && !isNaN(element.importe)){
            total = total +element.importe;
          }
        }
        return total;
      }

    }
}


</script>

<style scoped lang="css">
  .src-components-usuarios-registrados {

  }
</style>
