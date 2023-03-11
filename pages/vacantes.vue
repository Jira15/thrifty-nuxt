<script setup>  
import { useVacantesStore } from '@/stores/vacantes' 
import { useCandidatoStore } from '@/stores/candidato' 
import { storeToRefs } from 'pinia'   
import { Form, Field, ErrorMessage } from 'vee-validate'; 
const storeVacantes = useVacantesStore();  
const storeCandidato = useCandidatoStore();  

const vacantes = computed(() => {
    return storeVacantes.vacantes
}) 
const candidato = computed(() => {
    return storeCandidato.candidato
}) 
onMounted(() => {
    storeVacantes.fetchVacantes(); 
})  
useHead({
        title: 'Lista de Vacantes | Thrifty Car Rental Panamá'
    });
</script> 
<template>
<main>
    <h2>Vacantes Abiertas:</h2> 

    <section class="card-wrap" >
        <article class="vacante" v-for="vacante in vacantes" :key="vacante.id"> 

            <header>
                <h3>{{ vacante.vacante}}</h3>
                <h3>{{ vacante.area }}</h3>
            </header>

            <h4>Requisitos:</h4>
            <ul>
                <li v-for="requisito in vacante.requisitos">
                    {{ requisito }} 
                </li>
            </ul>
                <h4>Funciones:</h4>
            <ul>
                <li v-for="funcion in vacante.funciones" >
                    {{ funcion }}
                </li> 
            </ul>
                <h4>Ofrecemos:</h4>
            <ul>
                <li v-for="ofrecemos in vacante.ofrecemos">
                    {{ ofrecemos }}
                </li>
            </ul>
        </article> 
    </section>



    <section class="candidato"> 
        <h3>Dejanos tu Información</h3>  
            <Form @submit="storeCandidato.crearCandidato">
            <fieldset>
                <p>
                    <label for="nombre">Nombre</label>
                    <Field  type="text" id="nombre" name="nombre" rules="required" placeholder="Nombre" />  
                    <ErrorMessage name="nombre" >
                        <p class="warning">Todos los Campos son requeridos</p> 
                    </ErrorMessage>
                </p> 
                <p>
                    <label for="apellido">Apellido</label>
                    <Field  type="text" id="apellido" name="apellido" rules="required"   placeholder="Apellido"/> 
                    <ErrorMessage name="apellido" >
                        <p class="warning">Todos los Campos son requeridos</p> 
                    </ErrorMessage>
                </p>  
                <p>
                    <label for="telefono">Teléfono</label>
                    <Field  type="text" id="telefono" name="telefono"   placeholder="Teléfono" rules="required"   />
                    <ErrorMessage name="telefono" > 
                        <p class="warning">Todos los Campos son requeridos</p> 
                    </ErrorMessage> 
                </p>  
                <p>
                    <label for="email">Correo electrónico</label>
                    <Field  type="text" id="email" name="email" rules="required"   placeholder="Correo" /> 
                    <ErrorMessage name="email" > 
                        <p class="warning">Todos los Campos son requeridos</p> 
                    </ErrorMessage>  
                </p>    
              <p>
                    <label for="cv">Hoja de vida(solo archivos docx o PDF):</label> 

                    <Field    type="file" id="cv" name="cv"     placeholder="cv" /> 
                    <ErrorMessage name="cv" > 
                        <p class="warning">Todos los Campos son requeridos</p> 
                    </ErrorMessage> 
                </p> 
            </fieldset> 
            <button type="submit">Enviar</button> 
        </Form>
    </section>

</main>
</template>

<style scoped lang="scss">
.warning{
    font-size: 12px;
    color: red;
}
main { 
    h2 {
        font-size: 24px;
        font-weight: bold;
        margin: 10px;
        
    }
    .candidato {
        h3 {
            margin-bottom: 10px;
            margin-top: 10px;
            font-size:1.5em;
            font-weight: bold;
            justify-content: center;
        } 
        background-color: white;
        padding: 10px; 
        
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 10px;
        background-color:white;
        box-shadow: 5px 5px 5px rgba(65, 65, 65, 0.308);
        border-radius: 5px; 
        line-height: 20px; 
        p{
            display: flex;
            flex-direction: column;
            margin-bottom:5px;
        }
        button {
            background-color:#006FB4;
            color: white;
            padding: 5px;
            border-radius: 5px;
        }
    }
}
.card-wrap{
    display: flex;
    flex-direction: column;

}
.vacante { 
    display: flex;
    flex-direction: column; 
    padding: 10px; 
    margin: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color:white;
    box-shadow: 5px 5px 5px rgba(65, 65, 65, 0.308);
    border-radius: 5px; 
    line-height: 20px; 
    header {
        justify-content: center;
    }   
    h3 {
        margin-bottom: 10px;
        margin-top: 10px;
        font-size:1.5em;
        font-weight: bold;
        justify-content: center;
    } 
    h4 {
        margin-bottom: 10px;
        margin-top: 10px;
        font-size:1.2em;
        font-weight: bold;
    } 
    ul li {
        font-size: 0.9em;
    }

 
}  
// Desktop  
@media screen and (min-width: 768px) { 
    .card-wrap{ 
        flex-direction: row;
    
    }
    .vacante {
        max-width: 350px;
    }
    .candidato {
        max-width: 500px; 
    }
} 
</style>
