import { defineStore } from 'pinia'  
import { usePedidoStore } from '@/stores/pedido';    
import { loadScript } from "@paypal/paypal-js";

export const useActualizarStore = defineStore('actualizar',() =>{
const { updateItem  } = useDirectusItems();     
const storePedido = usePedidoStore();
const totalPedido = storePedido.total();  
const horaRetiro = storePedido.pedido.horaRetiro; 
const horaRetiroString = horaRetiro.hours.toString() + ':' + horaRetiro.minutes.toString();  
const horaRetorno = storePedido.pedido.horaRetorno;
const horaRetornoString = horaRetorno.hours.toString() + ':' + horaRetorno.minutes.toString(); 
console.log(totalPedido);   
const route = useRoute() 


interface Pedido {  
    nombre: StringConstructor;
    apellido: StringConstructor;
    email: StringConstructor,
    telefono: StringConstructor,
    licencia: StringConstructor,
    nacimiento: DateConstructor,
    retiro: StringConstructor,
    fecha_retiro: DateConstructor, 
    hora_retiro: string,
    retorno: StringConstructor,
    fecha_retorno: DateConstructor,
    hora_retorno: string,
    carro: StringConstructor,
    cobertura: StringConstructor,
    extras: string,
    status: string,
    total: string
}   



async function onCancelar() { 
    // Submit values to API...   
    try {
        var status = {  status: 'Cancelado'  }   // var newItem = { status: "Draft" };
        await updateItem<Pedido>({ 
            collection: "pedidos",
            id: storePedido.pedido.id,
            item: status });  
            await refreshNuxtData()
            window.location.reload()
    } catch (e) { 
            console.log('error') 
    } 
}   
async function onSubmit() { 
        var status  =  { status: 'Pagado'  } 
        try {
        await updateItem<Pedido>({ 
            collection: "pedidos",
            id: '6d1ced9e-ae42-43a8-a736-a601f44c2d00', 
            item: status }) 
            await refreshNuxtData()
            window.location.reload() 
        } catch (e) { 
            console.log('error') 
    }  
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