<script setup> 
import { usePedidoStore } from '@/stores/pedido'; 
import moment from 'moment';

const pedidoStore = usePedidoStore();
 
const pedido = computed(() => { 
    return pedidoStore.pedido
})   
const precioDropoff = computed(() => {
    return pedidoStore.pedido.dropoff = pedidoStore.checkDropoff(pedidoStore.pedido.sucursal.codigo_rentworks, pedidoStore.pedido.sucursalRetorno.codigo_rentworks); 
})   

const totalDeDias = computed(() => {
    return pedidoStore.pedido.totalDeDias = pedidoStore.diffDias(pedidoStore.pedido.diaRetorno, pedidoStore.pedido.diaRetiro); 
})

const totalPedido = computed(() => {
    return pedidoStore.pedido.subTotal = pedidoStore.total(); 
})  

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

onMounted(() => { 
    pedidoStore.pedido.totalDeDias = pedidoStore.diffDias(pedidoStore.pedido.diaRetorno, pedidoStore.pedido.diaRetiro);  
}) 



</script>

<template>
    <section class="desglose">
        <h6>Detalles:</h6> 
            <dl>
                <dt>
                    Retiro:<br/>{{ pedido.sucursal.name }}
                </dt> 
                <dd>
                    Retorno: <br/>{{ pedido.sucursalRetorno.name }} 
                </dd>
            </dl>
            <!-- <dl>
                <dt>
                    Días Reservados:
                </dt> 
                <dd>
                    {{ totalDeDias }}
                </dd>
            </dl>   -->
            <dl>
                <dt>
                    Día de Retiro:
                </dt> 
                <dd>
                    {{ fechaFormat(pedido.diaRetiro) }}   {{ horaFormat(pedido.horaRetiro) }}
                </dd>
            </dl> 
            <dl>
                <dt>
                    Día de Retorno: 
                </dt> 
                <dd>
                    {{ fechaFormat(pedido.diaRetorno) }}  {{ horaFormat(pedido.horaRetorno)  }}
                </dd>
            </dl>   
            <dl v-if="(precioDropoff > 0)">
                <dt>
                    Drop-off 
                </dt> 
                <dd>
                    {{ precioDropoff }}
                </dd>
            </dl>
        
        <h6>Modelo:</h6>
        <dl>
            <dt>
                {{ pedido.carro.marca }} {{ pedido.carro.modelo }} 
            </dt> 
            <dd>
                {{ pedido.carro.precio_thrifty }} 
            </dd>
        </dl>
        
        <h6>Coberturas:</h6>

        <dl v-if="pedido.cobertura">
            <dt> 
                {{ pedido.cobertura.nombre }} 
            </dt> 
            <dd>
                {{ pedido.cobertura.precio}} 
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

        <h6>Extras:</h6> 
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
        
        <h6>Sub-Total:  </h6> 

        <dl v-if="totalPedido">
            <dt> 
            </dt>
            <dd >
                B/.  {{ totalPedido }} 
            </dd> 
        </dl>  
    </section>
</template>
<style lang="scss">
.desglose {
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
</style>