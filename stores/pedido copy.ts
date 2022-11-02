// import { defineStore } from 'pinia'
// import { mapWritableState } from 'pinia'
// import { useExtrasStore } from '@/stores/extras';

// export interface Purchase {
//     productId: number;
//     quantity: number;
//   }
  
//   interface CartState {
//     pedido: Record<string, Purchase>;
//   }
  
//   export interface CartPreview {
//     id: number; 
//     title: string;
//     quantity: number;
//     cost: number;
//   }


// export const usePedidoStore = defineStore('pedido', {
//     // a function that returns a fresh state - STATE ES COMO DATA

//     state: (): CartState => ({
//     pedido: { 

//     }
// }),
// // optional getters GETTER SON COMO COMPUTED 
// getters: { 

// count(): number {
//     return Object.keys(this.pedido).reduce((acc, id) => {
//         return acc + this.pedido[id].quantity;
//     }, 0);
//     },
  

// total(): number {
//     const extras = useExtrasStore();
//     return Object.keys(this.pedido).reduce((acc, id) => {
//         return acc + extras.extras[id].precio ;
//     }, 0);
//     }, 



// formattedCart(): CartPreview[] {
//     const extras = useExtrasStore();
//     if (!extras.loaded) return [];

//     return Object.keys(this.pedido).map((productId) => {
//         const purchase = this.pedido[productId];

//     return {
//         id: purchase.productId, 
//         title: extras.extras[purchase.productId].nombre,
//         quantity: purchase.quantity,
//         cost: purchase.quantity * extras.extras[purchase.productId].precio,
//         };
//     });
// }, 
// },

// actions: {  
//     add(productId: number) {
//         if (this.pedido[productId]) {
//             this.pedido[productId].quantity += 1;
//         } else {
//             this.pedido[productId] = {
//             productId,
//             quantity: 1,
//             };
//         }
//         },
//         remove(productId: number) {
//         if (!this.pedido[productId]) {
//             return;
//         }

//         this.pedido[productId].quantity -= 1;

//         if (this.pedido[productId].quantity === 0) {
//             delete this.pedido[productId];
//         }
//         },

//     },
// })  






// // GETTER SON COMO COMPUTED getters receive the state as first parameter 
// //hacer un getter que guarde o sume los extras/coberturas de los otros stores  
// // getPedido: (state) => { 
// //     return state.pedido // * this.contents[id].quantity
// // },
// //  agregarSubtotal(state) {
// //     return state.pedido.subtotal.push(this.pedido.extras.precio);
// //   }, 




// import { defineStore, mapState } from 'pinia'


// export interface Extra {
//     id: number;
//     nombre: string;
//     precio: number;
//     explicacion: string; 
//   }
  
//   interface ExtraState {
//     extras: Record<string, Extra>;
//     ids: number[];
//   }
 

// export const useExtrasStore = defineStore(  {
// id: 'extras',
//     // STATE ES COMO DATA
//   state: (): ExtraState => ({
//     extras: {},
//     ids: [],
//   }),
// //  GETTER SON COMO COMPUTED 
// getters: {
//     list(): Extra[] {
//         return this.ids.map((i) => this.extras[i]);
//     },

//     loaded(): boolean {
//         return this.ids.length > 0;
//     },
// },

// // optional actions ACTIONS SON COMO METHODS
// actions: {
// async fetchExtras(){ 
//     if (this.loaded) return;

//         const { getItems } = useDirectusItems(); 
//         // const resp = await getItems( { collection: "extras"}); 
//         const data: Extra[] = await getItems( { collection: "extras"});
    
//         this.ids = data.map((extra) => {
//             this.extras[extra.id] = extra;
//             return extra.id;
//             });
//         }  
//     },
// });