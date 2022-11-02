
<script setup> 
import { usePedidoStore } from '@/stores/pedido';

const pedidoStore = usePedidoStore();

const cobertura = computed(() => {
    return pedidoStore.pedido.cobertura
}) 
const extras = computed(() => {
    return pedidoStore.pedido.extras
})  
const carro = computed(() => {
    return pedidoStore.pedido.carro
})  
const total = computed(() => {
        let precioAuto = pedidoStore.pedido.carro.precio;  
        let precioCobertura = pedidoStore.pedido.cobertura.precio;
 
        let suma = precioAuto + precioCobertura;
        console.log(suma)
        return suma; 
    }); 
</script>

<template>
    <section class="desglose">
        <h6>Carro:</h6>
        <ul>
            <li >
                {{ carro.marca }} {{ carro.modelo }} {{ carro.precio}} 
            </li> 
        </ul> 


        <h6>Coberturas:</h6>
        <ul>
            <li v-if="cobertura"> 
                {{ cobertura.nombre }} {{ cobertura.precio}} 
            </li> 
        </ul> 

        <h6>Extras:</h6>
        <ul v-if="extras">
            <li  v-for="extra in extras">
            {{ extra.nombre}}
            <span>{{ extra.precio}}</span>
            </li> 
        </ul>
        <h6>Sub-Total:</h6>
        <ul>
            <li> 
                {{ total }}
            </li> 
        </ul>
    </section>
</template> 