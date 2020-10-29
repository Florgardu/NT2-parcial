import { createWebHistory, createRouter } from 'vue-router'
import Formulario from '../components/Formulario.vue'
import DatosForm from '../components/DatosForm.vue'
import Inicio from '../components/Inicio.vue'
import NavBar from '../components/NavBar.vue'
import Choice from '../components/Choice.vue'




const routes = [
    {path: '/datosForm', name: 'DatosForm', component: DatosForm},
    {path: '/formulario' , name: 'Formulario', component: Formulario},
    {path: '/' , name: 'Inicio', component:Inicio},
    {path: '/navBar' , name: 'NavBar', component: NavBar},
    {path: '/choice' , name: 'Choice', component: Choice}

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;