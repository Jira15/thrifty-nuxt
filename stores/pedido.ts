import { defineStore } from 'pinia'
import { mapWritableState } from 'pinia'
import { useExtrasStore } from '@/stores/extras';
import { useCoberturasStore } from '@/stores/coberturas';




export const usePedidoStore = defineStore(
    'pedido', 
    { 
// a function that returns a fresh state - STATE ES COMO DATA 
        state: () => ({  
            pedido: {
                carro: Object,
                cobertura: Object,
                extras: [],
                sucursal: Object,
                sucursalRetorno: Object,
                diaRetiro: String, 
                horaRetiro: Object, 
                diaRetorno: null, 
                horaRetorno: Object,  
            } 
        }), 
        // optional getters GETTER SON COMO COMPUTED 
getters: {   
    

    }, 



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

        actions: {  
            total() {
                let precioAuto = this.pedido.carro.precio;  
                let precioCobertura = this.pedido.cobertura.precio; 
                const precioExtra = this.pedido.extras;   
                const preciosASumar = []; 
        
                // sumo todos los extras
                const extrasSumados = precioExtra.map(element => element.precio).reduce((a, b) => a + b, 0); 
                //  agrego los precios de cobertura y carro y todos los extras ya sumados al array
                preciosASumar.push(extrasSumados, precioCobertura, precioAuto); 
                // sumo todo en el array
                const suma = preciosASumar.map(element => element).reduce((a, b) => a + b, 0);
                // que siempre formattee como dolares
                return suma.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })
            }   
        } 
    }   
)   