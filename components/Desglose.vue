
<script setup> 
import { usePedidoStore } from '@/stores/pedido';

const pedidoStore = usePedidoStore();

// const cobertura = computed(() => {
//     return pedidoStore.pedido.cobertura
// }) 
// const extras = computed(() => {
//     return pedidoStore.pedido.extras
// })  
// onMounted(() => {
//     pedidoStore. 
// })

const totalPedido = computed(() => {
    return pedidoStore.total(); 
})  

const pedido = computed(() => {
    return pedidoStore.pedido
})  
// const total = computed(() => {

//     // defino variables
//     let precioAuto = pedidoStore.pedido.carro.precio;  
//     let precioCobertura = pedidoStore.pedido.cobertura.precio; 
//     const precioExtra = pedidoStore.pedido.extras;   
//     const preciosASumar = []; 
//     // sumo todos los extras
//     const extrasSumados = precioExtra.map(element => element.precio).reduce((a, b) => a + b, 0); 
    
//     //multiplicar extras y coberturas por la cantidad de dias arrendados
    
//     // falta sumar ERA 3.99

//     // agrego los precios de cobertura y carro y todos los extras ya sumados al array
//     preciosASumar.push(extrasSumados, precioCobertura, precioAuto); 
//     // sumo todo en el array
//     const suma = preciosASumar.map(element => element).reduce((a, b) => a + b, 0);
//     // que siempre formattee como dolares
//     return suma.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })
//     });  
</script>

<template>
    <section class="desglose">
        <h6>Detalles:</h6> 
            <dl>
                <dt>
                    Retiro: {{ pedido.sucursal.label }}
                </dt> 
                <dd>
                    Retorno: {{ pedido.sucursalRetorno.label }} 
                </dd>
            </dl>
            <dl>
                <dt>
                    Drop-off 
                </dt> 
                <dd>
                    {{ pedido.carro.precio }} 
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
       
        <dl v-if="pedido.cobertura">
            <dt> 
            </dt>
            <dd>
                B/.  {{ +totalPedido || 0 }} 
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