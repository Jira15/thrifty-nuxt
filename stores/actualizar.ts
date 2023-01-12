import { Head } from './../.nuxt/components.d';
import { defineStore } from 'pinia'  
import { usePedidoStore } from '@/stores/pedido';    
import { loadScript } from "@paypal/paypal-js";
import { Pedido } from '~~/types/interfaces';
import axios, {isCancel, AxiosError} from 'axios';


export const useActualizarStore = defineStore('actualizar',() =>{
const { updateItem  } = useDirectusItems();     
const storePedido = usePedidoStore();
const totalPedido = storePedido.total();   
console.log(totalPedido);   
const route = useRoute()  

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
        // var status  =  { status: 'Pagado'  } 


        useFetch("/api/transact.php")
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        }); 



        // try { 

        // const bodyData = {
        //     'first_name': 'Prueba',
        //     'last_name': 'Usuario',
        //     'address1': '123 Main St',
        //     'city': 'New York',
        //     'state': 'NY',
        //     'zip' : '12345', 
        //     'shipping_first_name': 'User',
        //     'shipping_last_name': 'Test',
        //     'shipping_address1': '987 State St',
        //     'shipping_city': 'Los Angeles',
        //     'shipping_state': 'CA',
        //     'shipping_zip' : '98765', 
        //     'type': 'sale',
        //     'amount': '250.00',
        //     'ccnumber':'4111111111111111', 
        //     'ccexp':'1228',
        //     'cvv': '123'
        //     }  
        //     // $fetch( '/thanks', {
        //     //     method: 'POST',
        //     //     headers: {
        //     //         // 'Authorization': 'security_key'+'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
        //     //         'Accept': 'application/json',
        //     //         // 'security_key': 'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
        //     //         'Content-Type': 'application/x-www-form-urlencoded',
        //     //     },
        //     //     params: {
        //     //         'security_key': 'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4'
        //     //     },
        //     //     body: JSON.stringify( bodyData )
        //     // } ).then(function (response) {
        //     //         console.log(response);
        //     //     })  


 

        // // const url = '/thanks'
        // // const options = {
        // //     headers: {
        // //         // 'Authorization': 'security_key'+'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
        // //         'Accept': 'application/json',
        // //         'security_key': 'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
        // //         'Content-Type': 'application/x-www-form-urlencoded',
        // //     },
        // //     // options: {}
        // // }

        // // axios.post(url, bodyData, options)
        // //     .then(function (response) {
        // //         console.log(response);
        // //     })
            
        // //   axios({
        // //     method: 'post',
        // //     url:'http://localhost:3000/api/transact.php',
        // //       headers: {
        // //         // 'Authorization': 'security_key'+'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
        // //         // 'Accept': 'application/json',
        // //         'security_key': 'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
        // //         'Content-Type': 'application/x-www-form-urlencoded',
        // //     },
        // //     data: JSON.stringify( bodyData )
        // //   });
        
        //         // await updateItem<Pedido>({ 
        //         // collection: "pedidos",
        //         // id: storePedido.pedido.pedidos_id,
        //         // item: status }) 
        //         // await refreshNuxtData()
        //         // window.location.reload()  

        // }
        // catch (e) { 
        //     console.log('error') 
        // }  
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