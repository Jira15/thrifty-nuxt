<script setup>   
import { getAssetURL } from "@/utils/get-asset-url";
import { storeToRefs } from 'pinia' 
import moment from 'moment';


const route = useRoute()
const { getItemById } = useDirectusItems(); 
const pedido = await  getItemById({
        collection: "pedidos",
        id: '2e210ffe-c4c2-4323-82e4-3c77dc02300a',
    });  

    const fechaFormat = function(value) {
    if (value) {
        return moment(value).format('DD MMM YYYY')
    }
}

const horaFormat = function(value) {
    if (value) {
        return moment(value).format('hh:mm A')
    }
}

</script> 
<template>  
    <article class="manage-pedido">  
        <!-- <img :src="getAssetURL(pedido.banner)"  loading="lazy" />   -->
            <h2>
                {{ pedido.nombre }} {{ pedido.apellido }}
            </h2>
            <section class="info-cliente"></section> 

            <section class="info-pedido">
                <h6>Detalles:</h6> 
                    <dl>
                        <dt>
                            Retiro:<br/>{{ pedido.retiro }}
                        </dt> 
                        <dd>
                            Retorno: <br/>{{ pedido.retorno }} 
                        </dd>
                    </dl> 
                    <dl>
                        <dt>
                            Día de Retiro:
                        </dt> 
                        <dd>
                            {{ fechaFormat(pedido.fecha_retiro) }}   {{  pedido.hora_retiro  }}
                        </dd>
                    </dl> 
                    <dl>
                        <dt>
                            Día de Retorno: 
                        </dt> 
                        <dd>
                            {{ fechaFormat(pedido.fecha_retorno) }}  {{  pedido.hora_retorno   }}
                        </dd>
                    </dl>   
                    <!-- <dl v-if="(precioDropoff > 0)">
                        <dt>
                            Drop-off 
                        </dt> 
                        <dd>
                            {{ precioDropoff }}
                        </dd>
                    </dl> -->
                
                <h6>Modelo:</h6>
                <dl>
                    <dt>
                        {{ pedido.carro }} 
                    </dt> 
                    <dd>
                        <!-- {{ pedido.carro.precio_thrifty }}  -->
                    </dd>
                </dl>
                
                <h6>Coberturas:</h6>
        
                <dl >
                    <dt> 
                        {{ pedido.cobertura }} 
                    </dt> 
                    <dd>
                        <!-- {{ pedido.cobertura.precio}}  -->
                    </dd> 
                </dl> 
                <dl >
                    <dt> 
                        Asistencia Vial(ERA)
                    </dt> 
                    <dd>
                        {{ pedido.era }} 
                    </dd> 
                </dl> 
        
                <!-- <h6>Extras:</h6> 
                <dl v-if="pedido.extras" class="extras">
                    <div v-for="extra in pedido.extras">
                        <dt>
                            {{ extra.nombre }}
                        </dt>  
                        <dd>
                            {{ extra.precio }}
                        </dd> 
                    </div>
                </dl>
                 -->
                <h6>Sub-Total:  </h6> 
        
                <dl  >
                    <dt> 
                    </dt>
                    <dd >
                        B/.  {{ pedido.total }} 
                    </dd> 
                </dl>  
            </section>


    </article> 
</template>

<style scoped lang="scss">

.manage-pedido { 
    display: flex;
    flex-direction: column; 
    padding: 10px; 
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color:white;
    box-shadow: 5px 5px 5px rgba(65, 65, 65, 0.308);
    border-radius: 5px; 
    line-height: 20px;   
    section {
        margin: 20px;
    } 
    h2 {
        margin: 20px;
        font-size: 28px;
        font-weight: bold;
    }
    h3 {
        font-weight: bold;
        font-size: 22px;
        margin-bottom: 20px;
    }

    img {
        object-fit: cover;
        width: 100%;
        height: 250px;
        border-radius: 5px;
    }

    .info-pedido {
        display: flex;
        flex-direction: column; 
        line-height: 1.5;
        h6 {
            font-weight:bold;
            background-color: #cde4ff;
        }
        dl {
            display: flex;
            justify-content: space-between;
            background-color: #f8fbff; 
        }
        .extras { 
            flex-direction: column; 
            div {
                display: flex;
                justify-content: space-between;
            }
        }
        button {
            background-color: #047EFF;
            padding: 5px 15px;
            border-radius: 5px; 
            text-transform: uppercase;
            font-size: 16px;
            font-weight: 600;
            color: white;   
            width: 100%;
            text-align: center;
        }
    }


}  
// Desktop  
@media screen and (min-width: 768px) { 
    .page-content {
        max-width: 1000px; 
    }
}
</style>
