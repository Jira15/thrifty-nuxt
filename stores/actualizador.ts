import { defineStore, storeToRefs } from 'pinia'  
import { usePedidoStore } from '@/stores/pedido';    
import { loadScript } from "@paypal/paypal-js";
import { Pedido } from '~~/types/interfaces';
import axios, {isCancel, AxiosError} from 'axios';


export const useActualizarStore = defineStore('actualizar',() =>{
const storePedido = usePedidoStore();
const totalPedido = storePedido.total();    
const { updateItem  } = useDirectusItems();    

console.log('Log de store' + storePedido.pedido.pedidos_id);

const referencia = storeToRefs(storePedido );

console.log(referencia.getPedido)

const route = useRoute()  

const bodyData = {
    'security_key': 'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
    'first_name': storePedido.getPedido.cliente.nombre,
    'last_name': storePedido.pedido.cliente.apellido,
    'address1': storePedido.pedido.sucursal.name,
    'city': 'Panama City',
    'state': 'PTY',
    'zip' : '12345', 
    'shipping_first_name': storePedido.pedido.cliente.nombre, 
    'shipping_last_name': storePedido.pedido.cliente.apellido,
    'shipping_address1': '987 State St',
    'shipping_city': 'Panama City',
    'shipping_state': 'PTY',
    'shipping_zip' : '98765', 
    'type': 'sale',
    'amount': totalPedido,
    'ccnumber':'4111111111111111', 
    'ccexp':'1228',
    'cvv': '123'
}


async function onCancelar() { 
    // Submit values to API...   
    try {
        var status = {  status: 'Cancelado'  }   // var newItem = { status: "Draft" };
        await updateItem<Pedido>({ 
            collection: "pedidos",
            id: storePedido.pedido.pedidos_id,
            item: status });  
            await refreshNuxtData()
            window.location.reload()
    } catch (e) { 
            console.log('error') 
    } 
}   
async function onSubmit() {
 
    console.log('Log de id ' + storePedido.pedido.pedidos_id);
    console.log('Log de dia ' + storePedido.pedido.cliente);



        // var status  =  { status: 'Pagado'  }  
        // try {   
    // await useFetch( '/api/tarjeta', {
    //             method: 'POST',
    //             headers: { 
    //                 'Accept': 'application/json', 
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //             },
    //             params: bodyData,
    //             body: JSON.stringify( bodyData )
    //         } ).then(function (response) {
    //                 console.log(response);
    //         })   
}


    // Submit values to API...  
    loadScript({ 
    "client-id": "Aa2-lyJOfSxdyNqdMX_91EI24gW16qkYhzIJKxg4rq_dYC5HFDz7Sjb5FUp_UZ54dFDQ46lNQ2ykix-u",
    "currency": "USD",
    "data-page-type": "checkout",
    })
    .then((paypal) => {
        paypal
            .Buttons({
                createOrder: function(data, actions) {
                // Set up the transaction
                    return actions.order.create({
                        
                        purchase_units: [{
                        amount: {
                            //   value: totalPedido
                            value: '77.88'
                        }
                        }], 
                    });
                },
                onApprove: async function(data, actions) {
                    var status  =  { status: 'Pagado'  } 
                    try {
                    await updateItem<Pedido>({ 
                        collection: "pedidos",
                        id: storePedido.pedido.id,
                        item: status }) 
                        await refreshNuxtData()
                        window.location.reload() 
                    } catch (e) { 
                        console.log('error') 
                    }
                    // This function captures the funds from the transaction.
                    // return actions.order.capture().then(function(details) {
                    // // This function shows a transaction success message to your buyer. 
                    // });
                },           
                onError: function (err) {
                // For example, redirect to a specific error page
                // hacer un mensaje/function de error quedar en la misma pagina
                // window.location.href = "/error";
                }
            })    
            .render("#paypal-button")
            .catch((error) => {
                console.error("failed to render the PayPal Buttons", error);
            }); 
        })
        .catch((error) => {
            console.error("failed to load the PayPal JS SDK script", error);
        });  



    return { 
        onSubmit,
        onCancelar
    };
});     