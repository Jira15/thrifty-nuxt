import { defineStore } from 'pinia' 
import { useForm } from 'vee-validate';
import * as Yup from 'yup'; 
import { usePedidoStore } from '@/stores/pedido';    
import { Buffer } from 'buffer'; 




// class DirectPost {
//     constructor(security_key) {
//       this.security_key = security_key;
//     }
  
//     setBilling(billingInformation) {
//       // Validate that passed in information contains valid keys
//       const validBillingKeys = ['first_name', 'last_name', 'company', 'address1',
//           'address2', 'city', 'state', 'zip', 'country', 'phone', 'fax', 'email'];
  
//       for (let key in billingInformation) {
//         if (!validBillingKeys.includes(key)) {
//           throw new Error(`Invalid key provided in billingInformation. '${key}'
//               is not a valid billing parameter.`)
//         }
//       };
  
//       this.billing = billingInformation;
//     }
  
//     setShipping(shippingInformation) {
//       // Validate that passed in information contains valid keys
//       const validShippingKeys = [
//         'shipping_first_name', 'shipping_last_name', 'shipping_company',
//         'shipping_address1', 'address2', 'shipping_city', 'shipping_state',
//         'shipping_zip', 'shipping_country', 'shipping_email'
//       ];
  
//       for (let key in shippingInformation) {
//         if (!validShippingKeys.includes(key)) {
//           throw new Error(`Invalid key provided in shippingInformation. '${key}'
//               is not a valid shipping parameter.`)
//         }
//       };
  
//       this.shipping = shippingInformation;
//     }
  
//     doSale(amount, ccNum, ccExp, cvv) {
//       let requestOptions = {
//         'type': 'sale',
//         'amount': amount,
//         'ccnumber': ccNum,
//         'ccexp': ccExp,
//         'cvv': cvv
//       };
  
//       // Merge together all request options into one object
//       Object.assign(requestOptions, this.billing, this.shipping);
  
//       // Make request
//       this._doRequest(requestOptions);
//     }


  
//     // _doRequest(postData) {
//     //   const hostName = 'secure.networkmerchants.com';
//     //   const path = '/api/transact.php';
  
//     //   postData.security_key = this.security_key;
//     //   postData = JSON.stringify(postData);
  
//     //   const options = {
//     //     hostname: hostName,
//     //     path: path,
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/x-www-form-urlencoded',
//     //       'Content-Length': Buffer.byteLength(postData)
//     //     }
//     //   };
  

//       _doRequest(postData) {
//         // POST request using fetch with set headers
//         const requestOptions = {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Content-Length': Buffer.byteLength(postData)
//           },
//           body: JSON.stringify(postData)
//         };
//         fetch('secure.networkmerchants.com/api/transact.php', requestOptions)
//           .then(response => response.json()) 
//           .catch(error => { 
//             console.error('There was an error!', error);
//           });
//       }


//       // Make request to Payment API
//       // const req = $fetch(options, (response) => {
  
//       //   // hacer return?
//       //   console.log(`STATUS: ${response.statusCode}`);
//       //   console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
  
//       //   response.on('data', (chunk) => {
//       //     console.log(`BODY: ${chunk}`);
//       //   });
//       //   response.on('end', () => {
//       //     console.log('No more data in response.');
//       //   });
//       // });
  
//       // req.on('error', (e) => {
//       //   console.error(`Problem with request: ${e.message}`);
//       // });
  
//       // Write post data to request body
//       // req.body(postData);
//       // req.end(); 
//     // }
//   }


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
    const horaRetiro = storePedido.pedido.horaRetiro; 
    const horaRetiroString = horaRetiro.hours.toString() + ':' + horaRetiro.minutes.toString();  
    const horaRetorno = storePedido.pedido.horaRetorno;
    const horaRetornoString = horaRetorno.hours.toString() + ':' + horaRetorno.minutes.toString(); 
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
        cobertura_e: object,
        extras: string,
        total: string
    } 

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
          
          useFetch( 'https://secure.networkmerchants.com/api/transact.php', {
                  method: 'POST',
                  headers: {
                      // 'Authorization': 'security_key'+'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
                      // 'Accept': 'application/json',
                      'security_key': 'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
                      'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: JSON.stringify( bodyData )
            } ) 
       


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
                    hora_retiro:  horaRetiroString,
                    retorno: storePedido.pedido.sucursalRetorno.name,
                    fecha_retorno: storePedido.pedido.diaRetorno,
                    hora_retorno: horaRetornoString,
                    carro: storePedido.pedido.carro.modelo,
                    cobertura_e: storePedido.pedido.cobertura,
                    extras: JSON.stringify(storePedido.pedido.extras), 
                    total: totalPedido
                } 
            ]; 
            createItems<Pedido>({ collection: "pedidos", items });
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