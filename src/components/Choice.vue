<template>

  <section class="src-components-choice">
    <h1>Respuestas Choice</h1>

      <div class="table-responsive">
          <table class="table">
            <tr class="bg-success text-white">
              <th>Numero de Pregunta</th>
              <th>Respuesta</th>
            </tr>
            <tr
              class="bg-info text-white"
              v-for="(dato, index) in respuestasChoice"
              :key="index"
            >
              <td>{{ dato.pregunta }}</td>
              <td>{{ dato.respuestas.join() }}</td>
            </tr>
            </table>
        </div >
 </section>
</template>

<script>

  export default  {
    name: 'src-components-choice',
    props: [],
    mounted () {

    },
    data () {
      return {
        respuestasChoice:[
              { pregunta: 1, respuestas: ['b', 'd'] },
              { pregunta: 2, respuestas: ['b'] },   
              { pregunta: 3, respuestas: ['c'] },  
              { pregunta: 4, respuestas: ['d'] },  
             { pregunta: 5, respuestas: ['b', 'e'] },  
        ],
      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-choice {

  }
</style>
