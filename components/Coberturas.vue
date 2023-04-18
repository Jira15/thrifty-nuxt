 
<script setup>  
import { useCoberturasStore } from '@/stores/coberturas'
import { usePedidoStore } from '@/stores/pedido' 
 
const storePedido = usePedidoStore() 
const storeCoberturas = useCoberturasStore() 
const coberturas = computed(() => {
    return storeCoberturas.coberturas
}) 
onMounted(() => {
    storeCoberturas.fetchCoberturas(); 
}) 
</script> 
<template>
<main class="coberturas">   
<h2>Coberturas</h2>
<section>  
    <ul>
        <li v-for="cobertura in coberturas" :key="cobertura.id">
            <article> 
                <div> 
                    <header>  
                        <h3 v-on:click="cobertura.descripcion = !cobertura.descripcion" >{{ cobertura.nombre }} <span>i</span></h3> 
                    </header>   
                    <Transition mode="out-in"> 
                        <p v-show="cobertura.descripcion === true">
                            {{ cobertura.explicacion }}
                        </p>
                    </Transition> 
                </div> 
                <footer v-if="storePedido.pedido.carro.tipo != 'Sedan'"> 
                    <input required  type="radio" name="cobertura" v-model="storePedido.pedido.cobertura" :value="cobertura">
                    <h4>B/. {{ cobertura.precio_2 }}</h4>  <em>por día</em> 
                </footer>
                <footer  v-else> 
                    <input required  type="radio" name="cobertura" v-model="storePedido.pedido.cobertura" :value="cobertura">
                    <div> <h4>B/. {{ cobertura.precio }}</h4>   <em>por día</em> </div>
                </footer>
        
            </article>
        </li>  
        <li>
            <article>
                <div>
                <header>  
                    <h3>Asistencia Vial(ERA)</h3>
                </header> 
                    <p>
                        Esta cobertura ofrece a EL ARRENDATARIO los siguientes servicios de asistencia en carretera sin cargo alguno: Pérdida de llave del automóvil, servicio de grúa, reemplazo de neumático, asistencia al quedarse sin combustible o sin batería. El tiempo de respuesta por parte de LA ARRENDADORA está sujeto al día, hora y ubicación del incidente.
                    </p>
                </div>
                <footer class="era"> 
                    <h4>B/. 3.99</h4>  <em>por día</em> 
                </footer>
            </article>
        </li> 
        </ul> 
    </section> 
</main> 
</template> 
<style scoped lang="scss">  
.coberturas {  
    h2 {
        font-weight: bold;
        font-size: 22px; 
        margin-top: 10px; 
        padding-left:10px;
        width: 100%; 
    } 
    ul li article {
        background-color: rgb(199, 226, 255);
        border-radius: 10px;  
        display: flex;
        flex-direction: column;
        min-width: 350px; 
        margin:10px;
        padding: 0px;
        border: 1px solid #c7c7c7;
    } 
    header { 
        display: flex;
        text-align: center;  
            cursor: pointer;
            span{ 
                background-color: #8aacc5;
                border: none; 
                border-radius: 15px 15px 15px 0px;
                color: white;
                font-weight: bold;
                font-family: initial;
                font-size: 11px; 
                padding: 3px 3px 0px 3px; 
            } 
    } 
 
    h3 {
        margin-top:10px;
        font-weight: bold;
        font-size: 20px;  
        width: 100%; 
    } 
    em {
        font-size: 20px;
        color: gray;
        font-style: italic; 
    }
    p {  
    font-size: 13px;
    text-align: justify;
    padding: 10px;
    background-color: white;
    }  
    img {
        object-fit:contain;
        width: 100%;
        height: 200px;
        border-radius: 5px;
    } 
    footer {
    text-align: center;
    place-content: center;
    display: flex;
    width: 100%;  
    padding: 10px; 
        h4 {
            font-size: 20px;
            font-weight:bold;
            margin-left: 10px;
        } 
        em {
            font-size: 14px; 
            color: #666666;
            font-style:italic;
            font-weight: bold;
        }  
    } 
} 
  // Desktop  
@media screen and (min-width: 768px) {
    .coberturas {  
        ul li article {
            background-color: rgba(255, 255, 255, 0.541);
            border-radius: 5px;  
            display: flex; 
            flex-direction: row-reverse; 
            margin:5px;
            padding: 0px;
            justify-content: space-between;
        } 
        div{
            width: 100%; 
    
        } 
        footer {   
            align-items: center;
            max-width: 150px;
        } 
        .era {  
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 150px;
        } 
    } 
}
</style>
