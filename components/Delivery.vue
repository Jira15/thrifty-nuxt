 
<script setup>   
import { usePedidoStore } from '@/stores/pedido' 
import { useDeliveryStore } from '@/stores/delivery'
const storePedido = usePedidoStore()  
const storeDelivery = useDeliveryStore() 
const delivery = computed(() => {
    return storeDelivery.delivery
}) 
onMounted(() => {
    storeDelivery.fetchDelivery(); 
}) 

</script> 
<template>
<main class="delivery">   
<h2>Delivery</h2>
<section>   
    <div class="remover" v-if="storePedido.pedido.delivery.precio > 0"> 
        <button   @click="storePedido.resetDelivery()"  >Remover Delivery</button> 
    </div> 
        <article v-for="delivery in delivery" :key="delivery.id"> 
            <div> 
                <header>  
                    <h3>{{delivery.nombre}}</h3> 
                </header>     
                <p>
                    {{ delivery.explicacion }}
                </p> 
                <p class="aviso">
                    {{ delivery.aviso }}
                </p> 
            </div> 
            <footer  v-if="storePedido.pedido.reserva === 'prepago' " >  
                <input  type="radio" name="delivery" id="delivery"  v-model="storePedido.pedido.delivery" :value="delivery">
                <h4>B/. {{ delivery.precio }}.00  </h4>  
            </footer> 
        </article>

  
 
    </section> 
</main> 
</template> 
<style scoped lang="scss">  
.delivery {  
    .remover { 
        border: none;
        border-radius: 15px 15px 15px 0px;
        color: white;
        font-weight: bold; 
        font-size: 11px; 
        padding: 3px 3px 0px 3px; 
        display: flex;
        align-items: center;
        justify-content: center; 
        margin:5px;
        button {
            background-color: #27507c;
            padding: 3px 10px;
            border-radius: 5px; 
            text-transform: uppercase;
            font-size: 16px;
            font-weight: 600;
            color: white;   
            width: 100%;
            text-align: center;
            cursor: pointer;
        }
    }
    article {
        background-color: rgba(255, 255, 255, 0.644);
        border-radius: 5px;  
        border: 1px solid #c7c7c7;
        display: flex;
        flex-direction: column;
        min-width: 350px; 
        margin:10px;
        padding: 0px;
        p {  
            font-size: 16px;
            text-align: justify;
            padding:5px;
            }  
        
        .aviso {
            color: rgb(145, 145, 145);
            font-size: 11px;
            font-weight: bold;
            font-style: italic;
        }
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
    h2 {
        font-weight: bold;
        font-size: 22px;  
        padding-left:10px;
        width: 100%; 
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
    border-radius: 5px;  
    background-color: rgba(4, 125, 255, 0.4588235294);
    padding: 10px;
        h4 {
            font-size: 20px;
            font-weight:bold;
            margin: 5px;
        } 
        em {
            font-size: 24px;
            color: rgb(3, 3, 3);
            font-style:normal;
        }  
    } 
} 
  // Desktop  
@media screen and (min-width: 768px) {
    .delivery { 
        .remover{
            margin:5px;
            border: none;
            border-radius: 15px 15px 15px 0px;
            color: white;
            font-weight: bold; 
            font-size: 11px; 
            padding: 3px 15px 3px 5px; 
            display: flex;
            align-items: center;
            justify-content: center;
        }
         article {
            background-color: rgba(255, 255, 255, 0.644);
            border-radius: 5px;  
            display: flex; 
            flex-direction: row-reverse; 
            margin:10px;
            padding: 0px;
            justify-content: space-between;
        } 
        div{
            width: 100%;  
        } 
        footer {  
            align-items: center;
            max-width: 140px; 
            
        } 
    } 
}
</style>
