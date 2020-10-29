<template>

    <section class="src-components-formulario">
        <div class="jumbotron">
            <h2> Formulario Gastos</h2>
            <hr>

            <!-- formulario con el evento submit(apretar botón) llama a metodo enviar  -->
            <form novalidate autocomplete="off" @submit.prevent="enviar()">


                <!-- ingreso de dato nombre  -->
                <div class="form-group">
                    <label for="nombre"> Nombre </label>
                    <input type="text" id="nombre" class="form-control" v-model="$v.f.nombre.$model">
                </div>

                <!-- cartel de validación nombre -->
                <div v-if="$v.f.nombre.$error && $v.f.nombre.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.nombre.required.$invalid">Este campo es requerido</div>
                    <div v-else-if="$v.f.nombre.minLength.$invalid">Este campo debe tener al menos {{$v.f.nombre.minLength.$params.length}} caracteres</div>
                    <div v-else-if="$v.f.nombre.maxLength.$invalid">Este campo debe tener máximo {{$v.f.nombre.maxLength.$params.max}} caracteres</div>
                </div>

                <!-- Ingreso de descripcion-->
                <div class="form-group">
                    <label for="descripion"> Ingrese descripción de gasto </label>
                    <input type="text" id="descripcion" class="form-control" v-model="$v.f.descripcion.$model">
                </div>

                <!-- cartel de validación descripcion -->

                <div v-if="$v.f.descripcion.$error && $v.f.descripcion.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.descripcion.required.$invalid">Este campo es requerido</div>
                 
                </div>


          <!--  Ingreso IMPORTE-->
          <!-- ------------ -->
          <div class="form-group">
                <label for="importe">Importe</label>
                <input 
                    type="number"
                    id="importe"
                    class="form-control"
                    v-model.number="$v.f.importe.$model"
                >
                <!-- CARTELES DE VALIDACIÓN de edad de persona asignada -->
                <div v-if="$v.f.importe.$error && $v.f.importe.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.importe.required.$invalid">Este campo es requerido</div>
                    <!-- <div v-if="$v.f.edad.between.$invalid">La edad debe estar entre los {{$v.f.edad.between.$params.min}} y los {{$v.f.edad.between.$params.max}} años</div> -->
                </div>
          </div>


                <!-- Botón de envio -->
                <div class="form-group">
                    <input type="submit" class="btn btn-success mt-4" value="Enviar" :disabled="$v.$invalid">
                </div>
            </form>
        </div>
    </section>

</template>

<script>

import {
  required,
  minLength, 
  maxLength,
 
} from '@vuelidate/validators'


export default {
  name: 'src-components-formulario',
  props: [],
  mounted() {

  },
   components: {
  },
  data() {
    return {
      f: {
        nombre: '',
        descripcion: '',
        importe: ''
      },
      url: 'https://5f789e6d66d4960016c49ded.mockapi.io/datosform'

    }
  },
  // acá valido los campos de f (formulario)
  validations: {
    f: {

  nombre: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(15)
      },
      descripcion: {
        required,
      },
       importe: {
        required,
      },
    
    }
  },

  methods: {

    //Envio los datos del formulario al backend con AXIOS- POST
    async sendDatosForm(datos) {
      try {
        let response = await this.axios.post(this.url, datos, {
          'content-type': 'application/json'
        })
        console.log(response.data)
      } catch (error) {
          console.log('HTTP POST ERROR', error)
      }
    },

    // SUBMIT DEL FORMULARIO
    async enviar() {
        this.$v.$touch();
        if(!this.$v.$invalid) {
          let form = this.f;
          try{
            await this.sendDatosForm(form);
            this.f = this.resetCasillas();
            this.$v.$reset();            
          }catch(err){
            console.err(err);
          }

        } else {
          this.f = this.resetCasillas()
          this.$v.$reset()
        }
    },

    // REINICIO DE LOS DATOS- PONE EN BLANCO LAS CASILLAS COMPLETADAS 
    resetCasillas() {
      return {
        nombre: '',
        descripcion: '',
        importe: ''
      }
    }

  },
  computed: {

  }
}

</script>

<style scoped lang="css">

  .jumbotron {
    background-color: rgb(25, 184, 144);
    color: white;
  }

  hr {
    background-color: #ddd;
  }

  .btn {
    border: none;
    background-color: white;
    font-family: "Montserrat", "Avenir";
    text-transform: uppercase;
    height: 100%;
    font-weight: 700;
    letter-spacing: 1px;
    color: steelblue;
    transition: all 0.3s;
    outline: none;
  }
  .btn:hover {
    color: white;
    background-color: rgb(216, 95, 15);
  }

</style>
