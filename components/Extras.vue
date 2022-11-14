<script setup>  
import { useExtrasStore } from '@/stores/extras'
import { usePedidoStore } from '@/stores/pedido'
 
const storePedido = usePedidoStore() 
const storeExtras = useExtrasStore() 
const extras = computed(() => {
    return storeExtras.extras
}) 
onMounted(() => {
    storeExtras.fetchExtras(); 
})
</script>  
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
                    <input :id="extra.id" type="checkbox" v-model="storePedido.pedido.extras" :value="extra" >
                    <h4>B/.{{ extra.precio }} / por día</h4>  
                </footer> 
            </article>
        </li>  
    </ul> 
</section>

</main> 
</template> 
<style scoped lang="scss">  
.extras {  
    ul li article {
        background-color: rgba(255, 255, 255, 0.644);
        border-radius: 5px;  
        display: flex;
        flex-direction: column; 
        margin:10px;
        padding: 0px; 
    } 
    header { 
        display: flex;
        text-align: center; 
    }
    h2 {
        font-weight: bold;
        font-size: 32px; 
        margin-top: 20px;
        padding-left:10px;
        width: 100%; 
    }
    h3 {
        margin-top:10px;
        font-weight: bold;
        font-size:18px;  
        width: 100%; 
    }  
    footer {
    text-align: center;
    justify-content: space-around; 
    display: flex;
    width: 100%;
    background-color: #b3d7ff;
    padding: 10px;
        h4 {
            font-size: 18px;
            font-weight:bold;
        }  
    } 
} 
  // Desktop  
@media screen and (min-width: 768px) { 

    .extras {  
        footer h4 {
            font-size: 16px;
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
