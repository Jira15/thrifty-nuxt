 
<script setup>   
import { usePedidoStore } from '@/stores/pedido' 
 
const storePedido = usePedidoStore()  
</script> 
<template>
<main class="delivery">   
<h2>Delivery</h2>
<section>   
        <article> 
            <div> 
                <header>  
                    <h3> Delivery</h3> 
                </header>    
                    <p>
                        {{ storePedido.pedido.delivery.explicacion }}
                    </p> 
            </div> 
            <footer v-if="storePedido.pedido.delivery.vuelta"> 
                <input required  type="radio" name="delivery" v-model="storePedido.pedido.delivery.seleccion" :value="delivery">
                <h4>B/. {{ storePedido.pedido.delivery.precio_2 }} </h4>  
            </footer>
            <footer  v-else> 
                <input required  type="radio" name="delivery" v-model="storePedido.pedido.delivery.seleccion" :value="delivery">
                <h4>B/. {{ storePedido.pedido.delivery.precio }}  </h4>  
            </footer>
    
        </article>
       
    </section> 
</main> 
</template> 
<style scoped lang="scss">  
.delivery {  
    ul li article {
        background-color: rgba(255, 255, 255, 0.644);
        border-radius: 5px;  
        display: flex;
        flex-direction: column;
        min-width: 350px; 
        margin:10px;
        padding: 0px;
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
        font-size: 32px; 
        margin-top: 20px; 
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
    p {  
    font-size: 13px;
    text-align: justify;
    padding: 10px;
    }  
    img {
        object-fit:contain;
        width: 100%;
        height: 200px;
        border-radius: 5px;
    } 
    footer {
    text-align: center;
    justify-content: space-around; 
    display: flex;
    width: 100%;
    background-color: #b3d7ff;
    padding: 10px;
        h4 {
            font-size: 20px;
            font-weight:bold;
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
    .coberturas {  
        ul li article {
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
            max-width: 150px;
        } 
    } 
}
</style>
