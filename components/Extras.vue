<template>

    <main class="extras">   
        <h2>Extras</h2>
        <section> 
            <ul>
                <li>
                    <article  v-for="extra in extras" :key="extra.id"> 
                        <header>  
                            <h3> {{ extra.nombre }} </h3>
                        </header>  
                        <footer> 
                            <input type="checkbox" :value="extra" v-model="pedidoStore.pedido.extras"  >
                            <h4>B/.{{ extra.precio }} por día</h4>  
                        </footer> 
                    </article>
                </li>  
            </ul> 
        </section>
        
        </main>  
</template> 
<script setup lang="ts"> 
import { computed, ref } from 'vue'
import { useExtrasStore } from "@/stores/extras";
import { usePedidoStore } from "@/stores/pedido";
import { storeToRefs } from 'pinia'
const extrasStore = useExtrasStore()
const pedidoStore = usePedidoStore() 
 

const extras = computed(() => {
    return  extrasStore.extras
}) 


onMounted(() => {
    extrasStore.fetchExtras(); 
}) 
const selectedExtras = ref([])

function addSelectedExtras() {
  selectedExtras.value.forEach(extra => {
    pedidoStore.addExtra(extra)
  })
  selectedExtras.value = []
}
</script>
 


<style scoped lang="scss">  
.extras {  
    ul li article {
        background-color: rgba(255, 255, 255, 0.644);
        border-radius: 5px;  
        border: 1px solid #c7c7c7;
        display: flex;
        flex-direction: column; 
        margin:10px;
        padding: 0px; 
    } 
    header { 
        display: flex;
        text-align: center;
        padding:5px;
    }
    h2 {
        font-weight: bold;
        font-size: 22px; 
        margin-top: 20px;
        padding-left:10px;
        width: 100%; 
    }
    h3 {  
        font-weight: bold;
        font-size:14px;  
        width: 100%; 
    }  
    footer {
    text-align: center; 
    place-content: center;
    display: flex;
    width: 100%;
    background-color: rgba(4, 125, 255, 0.4588235294);
    padding: 5px;
        h4 {
            font-size: 16px;
            font-weight:bold;
        }  
    } 
} 
  // Desktop  
@media screen and (min-width: 768px) { 

    .extras {  
        footer h4 {
            font-size: 14px;
        }
        ul li article { 
            border-radius: 5px;  
            display: flex; 
            margin:2px;
            padding: 0px;
            justify-content: space-between;
            width: 100%;
        } 
        ul {     
            padding: 10px;
        } 
        ul li   { 
            display: flex; 
            
        } 
    } 
}
</style> 