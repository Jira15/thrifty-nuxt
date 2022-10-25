 
<script setup>  
import { useAutosStore } from '@/stores/autos'
import { storeToRefs } from 'pinia' 
import { getAssetURL } from "@/utils/get-asset-url";
 
const storeAutos = useAutosStore()

const getAutos = computed(() => {
    return storeAutos.getAutos
})
const autos = computed(() => {
    return storeAutos.autos
}) 
onMounted(() => {
    storeAutos.fetchAutos(); 
})
</script> 
<template>
<main class="auto">
    <h2>Flota</h2>
    <div>
        <article v-for="auto in autos" :key="auto.id">
            <figure> 
                <img :src="getAssetURL(auto.imagen)"  loading="lazy" /> 
            </figure> 
            <section>
                <h2>
                    {{ auto.marca }}  {{ auto.modelo }} <em>o similar</em> 
                </h2>   
                <dl class="specs">
                    <div v-if="auto.pasajeros">
                        <dt>
                            <img src="@/assets/images/pasajeros.png" alt="Pasajeros" />  
                        </dt>
                        <dd>{{auto.pasajeros }}</dd>
                    </div>
                    <div v-if="auto.puertas">
                        <dt>
                            <img src="@/assets/images/doors.png" alt="Puertas" />
                        </dt>
                        <dd>{{auto.puertas }}</dd>
                    </div>
                    <div v-if="auto.maletas">
                        <dt>
                            <img src="@/assets/images/luggage.png" alt="Maletas" />
                        </dt>
                        <dd>{{auto.maletas }}</dd>
                    </div>
                    <div v-if="auto.transmision">
                        <dt>
                        <img src="@/assets/images/transmision.png" alt="Transmision" />
                        </dt>
                        <dd>{{ auto.transmision }}</dd>
                    </div>
                    <div v-if="auto.motor">
                        <dt>
                        <img src="@/assets/images/motor.png" alt="Motor" />
                        </dt>
                        <dd>1200cc</dd>
                    </div>
                    <div v-if="auto.combustible">
                        <dt>
                        <img src="@/assets/images/fuel.png" alt="Gasolina" />
                        </dt>
                        <dd>{{ auto.combustible}}</dd>
                    </div>
                    <div>
                        <dt>
                        <img src="@/assets/images/ac.png" alt="ac" /> 
                        </dt>
                        <dd>A/C</dd>
                    </div>
                </dl>   
            </section>  

            <NuxtLink to="#"><button>Reservar Aqui</button></NuxtLink>
        </article> 
    </div>
</main> 
</template>

<style scoped lang="scss"> 
.auto {  
    article {
        background-color: white;
        border-radius: 5px;
        margin: 10px;
        padding: 5px;
        display: flex;
        flex-direction: column;
    } 
    h2 {
        font-weight: bold;
        font-size: 32px;
        line-height: 36px;
        margin-top: 20px;
        margin: 10px;
    }
    em {
        font-size: 24px;
        color: gray;
    }
    p {  
        font-size: 15px; 
        padding: 3px; 
    }  
    img {
        object-fit:contain;
        width: 100%;
        height: 150px;
        border-radius: 5px;
    }
    button {
        background-color: #047EFF;
        padding: 5px 15px;
        border-radius: 5px; 
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
        color: white;  
        margin-top: 20px;
        width: 100%;
        text-align: center;
    }
    .specs {
        display: flex;   
        width: 100%;
        padding: 5px;
            dl {
                display: flex;
                font-size: 14px;
                font-weight: bold;
            }
            dd {  
                font-size: 12px;
           
            }
            div {
                text-align: center; 
                text-transform:capitalize
            }
            dt {
                object-fit:contain;
            } 
            img{ 
                max-width: 25px;  
            } 
    }
} 


// Desktop  
@media screen and (min-width: 768px) { 
    div { 
        display: flex;
        justify-content: center;
    }
    article {
        min-width: 350px;
        max-width: 350px; 
    }
    section {
        height: 130px;
    }
}
</style>
