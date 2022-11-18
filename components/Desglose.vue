<script setup> 
import { usePedidoStore } from '@/stores/pedido';


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

// checkDropoff(pedidoStore.pedido.sucursal.codigo_rentworks, pedidoStore.pedido.sucursalRetorno.codigo_rentworks);

</script>

<template>
    <section class="desglose">
        <h6>Detalles:</h6> 
            <dl>
                <dt>
                    Retiro: {{ pedido.sucursal.nombre }}
                </dt> 
                <dd>
                    Retorno: {{ pedido.sucursalRetorno.nombre }} 
                </dd>
            </dl>
            <dl>
                <dt>
                    Días Reservados:
                </dt> 
                <dd>
                    {{ totalDeDias }}
                </dd>
            </dl>  
            <dl>
                <dt>
                    Día de Retiro:
                </dt> 
                <dd>
                    {{ pedido.diaRetiro }}   {{ pedido.horaRetiro.hours }}:{{ pedido.horaRetiro.minutes }}
                </dd>
            </dl> 
            <dl>
                <dt>
                    Día de Retorno: 
                </dt> 
                <dd>
                    {{ pedido.diaRetorno }}  {{ pedido.horaRetorno.hours }}:{{ pedido.horaRetorno.minutes }}
                </dd>
            </dl>   
            <dl>
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
                {{ pedido.carro.precio }} 
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