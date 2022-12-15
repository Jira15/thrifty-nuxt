import { defineStore } from 'pinia' 
import { useForm } from 'vee-validate';
import * as Yup from 'yup'; 
import { usePedidoStore } from '@/stores/pedido';
import { loadScript } from "@paypal/paypal-js";
 
  
const checkoutSchema = Yup.object({ 
    nombre: Yup.string().required(),
    apellido: Yup.string().required(),
    // email: Yup.string().required(),
    // telefono: Yup.string().required(),
    // licencia: Yup.string().required(),
    // nacimiento: Yup.string().required(),
}); 

export const usePaypalStore = defineStore('paypal',  () => { 
    const { createItems } = useDirectusItems(); 
    const storePedido = usePedidoStore();
    const totalPedido = storePedido.total();  
    const horaRetiro = storePedido.pedido.horaRetiro; 
    const horaRetiroString = horaRetiro.hours.toString() + ':' + horaRetiro.minutes.toString();  
    const horaRetorno = storePedido.pedido.horaRetorno;
    const horaRetornoString = horaRetorno.hours.toString() + ':' + horaRetorno.minutes.toString();  
    const router = useRouter() 
    const { errors, useFieldModel,  } = useForm({
        validationSchema: checkoutSchema,
    }); 
    const [
        nombre,
        apellido,
        email,
        telefono,
        licencia,
        nacimiento
        ] = useFieldModel([
        'nombre',
        'apellido',
        'email',
        'telefono',
        'licencia',
        'nacimiento'
        ]);

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
        total: string
    }   
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
                            fecha_retiro: storePedido.pedido.diaRetiro,
                            hora_retiro:  horaRetiroString,
                            retorno: storePedido.pedido.sucursalRetorno.name,
                            fecha_retorno: storePedido.pedido.diaRetorno,
                            hora_retorno: horaRetornoString,
                            carro: storePedido.pedido.carro.modelo,
                            cobertura:storePedido.pedido.cobertura.nombre,
                            extras: JSON.stringify(storePedido.pedido.extras), 
                            total: totalPedido
                        } 
                    ]; 
                    createItems<Pedido>({ collection: "pedidos", items });
                    router.push('/thanks/');  
                    });
                  },
                  onError: function (err) {
                    // For example, redirect to a specific error page
                    // hacer un mensaje/function de error quedar en la misma pagina
                    window.location.href = "/error";
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
        errors,
        nombre,
        apellido,
        email,
        telefono,
        licencia,
        nacimiento
    };
});   