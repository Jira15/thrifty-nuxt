import { defineStore } from 'pinia' 
import { useForm } from 'vee-validate';
import * as Yup from 'yup'; 
import { usePedidoStore } from '@/stores/pedido';    
import { Buffer } from 'buffer'; 
import { Pedido } from '~~/types/interfaces'; 

import axios, {isCancel, AxiosError} from 'axios';



const checkoutSchema = Yup.object({ 
    nombre: Yup.string().required(),
    // apellido: Yup.string().required(),
    // email: Yup.string().required(),
    // telefono: Yup.string().required(),
    // licencia: Yup.string().required(),
    // nacimiento: Yup.string().required(),
}); 
  

// function fetchTest(postData) {
//   // POST request using fetch with set headers
//   const requestOptions = {
//     method: 'POST',
//     headers: { 
//       'security_key': 'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Content-Length': Buffer.byteLength(postData)
//     },
//     body: JSON.stringify(postData)
//   };
//   fetch('https://secure.networkmerchants.com/api/transact.php', requestOptions)
//     .then(response => response.json()) 
//     .catch(error => { 
//       console.error('There was an error!', error);
//     });
// }



// constructor(security_key) {
//   this.security_key = security_key;
// }

// fequest(postData) {
//   // POST request using fetch with set headers
//   const requestOptions = {
//     method: 'POST',
//     headers: { 
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Content-Length': Buffer.byteLength(postData)
//     },
//     body: JSON.stringify(postData)
//   };
//   fetch('secure.networkmerchants.com/api/transact.php', requestOptions)
//     .then(response => response.json()) 
//     .catch(error => { 
//       console.error('There was an error!', error);
//     });
// }


export const useCheckoutStore = defineStore('checkout',  () => { 

    const { createItems } = useDirectusItems(); 
    const storePedido = usePedidoStore();
    const totalPedido = storePedido.total();   
    console.log(totalPedido);   

    const router = useRouter()

    const { errors, useFieldModel, handleSubmit, values } = useForm({
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

 

    function onSubmit(values) {
      // Submit values to API... 
      console.log('Submit', JSON.stringify(values, null, 2));
      console.log("Values", values); 

       try {
 
            // POST request using fetch with set headers
 
          const bodyData = {
            'first_name': 'Prueba',
            'last_name': 'Usuario',
            'address1': '123 Main St',
            'city': 'New York',
            'state': 'NY',
            'zip' : '12345', 
            'shipping_first_name': 'User',
            'shipping_last_name': 'Test',
            'shipping_address1': '987 State St',
            'shipping_city': 'Los Angeles',
            'shipping_state': 'CA',
            'shipping_zip' : '98765', 
            'type': 'sale',
            'amount': '250.00',
            'ccnumber':'4111111111111111', 
            'ccexp':'1228',
            'cvv': '123'
          } 

          // const apiProxy = createProxyMiddleware({
          //   target: 'https://secure.networkmerchants.com/api/transact.php',
          //   changeOrigin: true,
          // });

          axios({
            method: 'post',
            url:'http://localhost:3000/api/transact.php',
              headers: {
                // 'Authorization': 'security_key'+'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
                // 'Accept': 'application/json',
                'security_key': 'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: JSON.stringify( bodyData )
          });

 
          // useFetch( 'https://secure.networkmerchants.com/api/transact.php', {
          //         method: 'POST',
          //         headers: {
          //             // 'Authorization': 'security_key'+'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
          //             // 'Accept': 'application/json',
          //             'security_key': 'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
          //             'Content-Type': 'application/x-www-form-urlencoded',
          //         },
          //         body: JSON.stringify( bodyData )
          //   } )  

          // const bodyData = {
          //   'first_name': 'Prueba',
          //   'last_name': 'Usuario',
          //   'address1': '123 Main St',
          //   'city': 'New York',
          //   'state': 'NY',
          //   'zip' : '12345', 
          //   'shipping_first_name': 'User',
          //   'shipping_last_name': 'Test',
          //   'shipping_address1': '987 State St',
          //   'shipping_city': 'Los Angeles',
          //   'shipping_state': 'CA',
          //   'shipping_zip' : '98765', 
          //   'type': 'sale',
          //   'amount': '250.00',
          //   'ccnumber':'4111111111111111', 
          //   'ccexp':'1228',
          //   'cvv': '123'
          // } 
          // fetchTest(bodyData);
          

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
                    retorno: storePedido.pedido.sucursalRetorno.name,
                    fecha_retorno: storePedido.pedido.diaRetorno, 
                    carro: storePedido.pedido.carro,
                    cobertura: storePedido.pedido.cobertura,
                    dropoff: storePedido.pedido.dropoff,
                    sucursal_detail: storePedido.pedido.sucursal,
                    sucursal_retorno_detail: storePedido.pedido.sucursalRetorno,
                    extras: JSON.stringify(storePedido.pedido.extras), 
                    total: totalPedido
                } 
            ]; 
            createItems<Pedido>({ collection: "pedidos", items });
            /// si mando el order id custom desde aqui lo puedo agregar a la pagina de gracias
            router.push('/thanks/'); 

            } catch (e) { 
              console.log('error')
              // router.push('/error/'); 
            }   
    } 
    

    return {
        errors,
        nombre,
        apellido,
        email,
        telefono,
        licencia,
        nacimiento, 
        onSubmit
    };
});   