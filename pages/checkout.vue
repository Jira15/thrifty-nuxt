<script setup>    
import { getAssetURL } from "@/utils/get-asset-url";
import { usePedidoStore } from '@/stores/pedido';
import { useCheckoutStore } from '@/stores/checkout';
import { Form, Field, ErrorMessage } from 'vee-validate'; 
const storePedido = usePedidoStore();
 
const pedido = computed(() => {
    return storePedido.pedido
})   

const storeCheckout = useCheckoutStore(); 

</script> 
<template>
<main class="auto">  
    <article> 
        <CarroSeleccionado /> 
        <Desglose />  

    </article> 
    <section class="detalles-conductor"> 
        <h3>Finaliza tu reserva</h3>
        <form @submit="storeCheckout.finalizar">
            <p>
                <label for="nombre">Nombre</label>
                <Field type="text" id="nombre" name="nombre" rules="required" />  
            </p> 
            <p>
                <label for="apellido">Apellido</label>
                <Field type="text" id="apellido" name="apellido" rules="required" /> 
            </p>  
            <p>
                <label for="telefono">Teléfono</label>
                <Field type="text" id="telefono" name="telefono" /> 
            </p>  
            <p>
                <label for="email">Dirección de correo electrónico</label>
                <Field type="text" id="email" name="email" rules="required"  /> 
            </p>  
            <p>
                <label for="licencia">Licencia</label>
                <Field type="text" id="licencia" name="licencia" rules="required" /> 
            </p>  
            <p>
                <label for="nacimiento">Fecha de Nacimiento</label> 
                <date-picker  :enableTimePicker="false" v-model="pedido.nacimiento"
                locale="es" 
                name="nacimiento"
                rules="required" 
                id="nacimiento"  
                /> 
            </p>

            <section class="tarjeta">
            <p>
                <label for="licencia">Tarjeta de Credito</label>
                <Field type="text" id="licencia" name="licencia" rules="required" /> 
            </p>  


            <p>
                <label for="licencia">CCV</label>
                <Field type="text" id="licencia" name="licencia" rules="required" /> 
            </p>  

            <p>
                <label for="licencia">MM/YY</label>
                <Field type="text" id="licencia" name="licencia" rules="required" /> 
            </p>  
        </section> 
 
            <button type="submit">Submit</button> 
        </form>
        <!--   <footer>  
          <NuxtLink to="/checkout">
                <button>PAGAR / PAYPAL</button>
            </NuxtLink>
        </footer>   -->


 
        <ErrorMessage name="nacimiento" >
            <p>Todos los Campos son requeridos</p> 
          </ErrorMessage>


    </section> 
</main> 
</template>
<style scoped lang="scss">  
  /* autos flota id */ 
.auto {  
    article {
        background-color: white;
        border-radius: 5px; 
        padding: 5px;
        display: flex;
        flex-direction: column;
        min-width: 350px; 
        margin:5px; 
        
    }
    h2 {
        font-weight: bold;
        font-size: 32px; 
        margin-top: 20px;
        margin: 10px;
        width: 100%; 
    }
    header { 
        display: flex;
        text-align: center;
        margin-bottom: 10px;
        align-items: center;
    }
    h3 {
        font-weight: bold;
        font-size: 34px;  
        width: 100%; 
    } 
    em {
        font-size: 24px;
        color: gray;
        font-style: italic; 
    }
    p {  
        font-size: 15px; 
        padding: 3px; 
    }  
    img {
        object-fit:contain;
        width: 100%;
        height: 160px;
        padding: 5px;
        border-radius: 5px;
    } 
    footer {
        text-align: center;
        justify-content: space-between; 
        display: flex;
        width: 100%;
        h4 {
        font-size: 40px;
        font-weight:bold;
        } 
        em {
        font-size: 24px;
        color: rgb(3, 3, 3);
        font-style:normal;
        } 

    }
    .specs {
        display: none;    
        padding: 5px; 
        div {
            text-align: center; 
            text-transform:capitalize;
            width: 50px; 
        }
        dl {
            display: flex;
            font-size: 12px;
            font-weight: bold;
        }
        dd {  
            font-size: 12px; 
        } 
        dt {
            object-fit:contain;
        } 
        img{ 
            max-width:  15px;  
        } 
    }
    .detalles-conductor{
        background-color:white;
        border-radius: 5px; 
        padding: 5px; 
        min-width: 350px; 
        margin:5px;
        line-height: 1.5;
            form {
                margin-bottom: 10px; 
            p { 
                display: flex; 
                flex-direction: column;
                justify-content: space-between; 
            } 
            button {
                background-color: #047EFF;
                padding: 5px 15px;
                border-radius: 5px; 
                text-transform: uppercase;
                font-size: 16px;
                font-weight: 600;
                color: white;    
                text-align: center;
            } 
        }
    }
}   
// Desktop  
@media screen and (min-width: 768px) { 
    .auto {
        display: flex;
        .detalles-conductor{
            background-color: white;
            border-radius: 5px; 
            padding: 5px; 
            width: 100%; 
            margin:5px;
            line-height: 1.5;
            
            form {
                input {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 3px;
                    margin-left: 20px;
                    width: 100%;
                    box-sizing: border-box;
                    background-color: rgb(245, 245, 245);
                }
                margin-bottom: 10px; 
                p { 
                    font-size: 18px;
                    max-width: 500px;
                    display: flex; 
                    flex-direction: column;
                    justify-content: space-between; 
                }
      
            }
        }
        
        article {
            background-color: white;
            border-radius: 5px; 
            padding: 5px;
            display: flex;
            flex-direction: column;
            min-width: 400px; 
            margin:10px; 
            // justify-content: space-around;
        }
        header { 
            display: flex;
            flex-direction: column;  
        } 
        img {
            object-fit:contain;
            width: 100%;
            height: 400px;
            padding: 5px;
            border-radius: 5px; 
        } //650 x 411
        .specs { 
            display:flex;
            flex-wrap: wrap; 
            div {
                text-align: center; 
                text-transform:capitalize;
                width: 90px; 
                margin-top: 3px;
            }
            dl {
                display: flex;
                font-size: 14px;
                font-weight: bold;
            }
            dd {  
                font-size: 12px; 
            } 
            dt {
                object-fit:contain;
            } 
            img{ 
                max-width: 25px;
                max-height: 25px;
                object-fit:contain; 
                padding: 2px;  
            }  
        }
    } 
}
</style> 