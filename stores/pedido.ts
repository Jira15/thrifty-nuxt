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
                extras: []
            } 
        }), 
        // optional getters GETTER SON COMO COMPUTED 
        getters: {   
            
            // total(): number {
            //     const extras = useExtrasStore();
            //     return Object.keys(this.pedido).reduce((acc, id) => {
            //         return acc + extras.extras[id].precio ;
            //     }, 0);
            //     }, 
        },

        actions: {  
            
        } 
    }   
)  






// GETTER SON COMO COMPUTED getters receive the state as first parameter 
//hacer un getter que guarde o sume los extras/coberturas de los otros stores  
// getPedido: (state) => { 
//     return state.pedido // * this.contents[id].quantity
// },
//  agregarSubtotal(state) {
//     return state.pedido.subtotal.push(this.pedido.extras.precio);
//   }, 