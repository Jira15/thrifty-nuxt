import { defineStore } from 'pinia'  
import { usePedidoStore } from '@/stores/pedido'; 
import { loadScript } from "@paypal/paypal-js";
import { Pedido } from '~~/types/interfaces';  
import moment from 'moment';

export const usePaypalStore = defineStore('paypal',  () => { 
    const { createItems, updateItem } = useDirectusItems(); 
    const storePedido = usePedidoStore(); 
    const totalPedido = storePedido.pedido.total; 

    const router = useRouter();
    //  SANDBOX API "client-id": "Aa2-lyJOfSxdyNqdMX_91EI24gW16qkYhzIJKxg4rq_dYC5HFDz7Sjb5FUp_UZ54dFDQ46lNQ2ykix-u",
    loadScript({ 
      "client-id": "AauU5ZBGbHQmw4NSSD3m8p_JC5an_3cscA7RZ52dH0YBZsKa5Za-X8aPlxf1FkowqAb0phFjjETUUnCl",
      "currency": "USD",
      "data-page-type": "checkout",
    }).then((paypal) => {
      
          paypal.Buttons({
                  createOrder: function(data, actions) {
                    const storePedido = usePedidoStore(); 
                    const totalPedido = storePedido.pedido.total; 
                
                  // Set up the transaction
                    return actions.order.create({
                        // payer: { 
                        //   payer_id: '',
                        //   name: {
                        //       given_name: '',
                        //       surname: ''
                        //     }, 
                        //     email_address: '', 
                        //     birth_date: '',
                        //     phone: {
                        //       phone_type: '',
                        //       phone_number: {
                        //           national_number: ''
                        //       }
                        //     },
                        //   address: {
                        //     address_line_1: '',
                        //     address_line_2:'',
                        //     admin_area_1:'',
                        //     admin_area_2:'',
                        //     postal_code:'',
                        //     country_code:'',
                        //   },
                        //   tax_info: {
                        //     tax_id: 'string',
                        //     tax_id_type: 'string'
                        //   },
                        //   tenant:''
                        // },
                        purchase_units: [{
                          amount: {
                              value: totalPedido
                            // value: '88.88'
                          }
                        }], 
                    });
                  },
                  onApprove: function(data, actions) {
                    // This function captures the funds from the transaction.
                    return actions.order.capture().then(function(details) {
                      // This function shows a transaction success message to your buyer.
                    
                      var items: Pedido[] = [
                        {
                          nombre: storePedido.pedido.cliente.nombre,
                          apellido: storePedido.pedido.cliente.apellido, 
                          email: storePedido.pedido.cliente.email,
                          telefono: storePedido.pedido.cliente.telefono, 
                          licencia: storePedido.pedido.cliente.licencia,
                          nacimiento:  storePedido.pedido.cliente.nacimiento,
                          retiro: storePedido.pedido.sucursal.name,
                          fecha_retiro:  moment(storePedido.pedido.diaRetiro).format(),  
                          retorno: storePedido.pedido.sucursalRetorno.name,
                          fecha_retorno:  moment(storePedido.pedido.diaRetorno).format(), 
                          carro: storePedido.pedido.carro,
                          cobertura: storePedido.pedido.cobertura,
                          dropoff: storePedido.pedido.dropoff,
                          sucursal_detail: storePedido.pedido.sucursal,
                          sucursal_retorno_detail: storePedido.pedido.sucursalRetorno,
                          extras: JSON.stringify(storePedido.pedido.extras), 
                          status: 'Pagado',
                          tipo_pago: 'Paypal',
                          total: totalPedido
                        } 
                    ];  
 

                    if (storePedido.pedido.pedidos_id !== ""){   
  
                      console.log('Transacción Aprobada' + storePedido.pedido.pedidos_id)    
                      var status = { status: 'Pagado', tipo_pago: 'Paypal' }   
                      updateItem<Pedido>({ 
                          collection: "pedidos",
                          id: storePedido.pedido.pedidos_id,
                          item: status });  
                      
                      router.push('/thanks/'); 
                  }
                    createItems<Pedido>({ collection: "pedidos", items }); 
                    router.push('/thanks/');  
                    });
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
    };
});   