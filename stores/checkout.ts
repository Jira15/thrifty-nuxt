import { defineStore } from 'pinia' 
import { useForm } from 'vee-validate';
import * as Yup from 'yup'; 
import { usePedidoStore } from '@/stores/pedido';     
import { Pedido } from '~~/types/interfaces';  

const checkoutSchema = Yup.object({ 
    nombre: Yup.string().required(),
    apellido: Yup.string().required(),
    // email: Yup.string().required(),
    // telefono: Yup.string().required(),
    // licencia: Yup.string().required(),
    // nacimiento: Yup.string().required(),
});   

export const useCheckoutStore = defineStore('checkout',  () => { 

    const { createItems } = useDirectusItems(); 
    const storePedido = usePedidoStore();
    const totalPedido = storePedido.total();   
    console.log(totalPedido);   
 
    const metodos = ref('none')


    const tarjeta = ref( {
      ccnumber: '',
      ccexp: '',
      cvv: ''
  })
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
 
    async function onSubmit(values) {
      // Submit values to API... 
      console.log('Submit', JSON.stringify(values, null, 2));
      console.log("Values", values);   
        const bodyData = {
            'security_key': 'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
            'first_name': storePedido.pedido.cliente.nombre,
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
            'ccnumber': this.tarjeta.ccnumber, 
            'ccexp': this.tarjeta.ccexp,
            'cvv': this.tarjeta.cvv
        }    
        await $fetch( '/api/tarjeta', { 
            method: 'POST',
            // headers: {  
            //     'Content-Type': 'application/x-www-form-urlencoded',
            // },
            params: bodyData,
            body: bodyData ,   
        }).then(function (response) {    
            const router = useRouter();  

            let respuesta = response; 
            let codigoAprobado = 'response=1';
            let codigoTransaccionDeclinada = 'response=2';
            let codigoErrorSistema = 'response=3'; 

            if (respuesta.includes(codigoAprobado)){   
              
              console.log('codigoAprobado')   
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
                    status: 'Pagado',
                    total: totalPedido
                } ]; 
                createItems<Pedido>({ collection: "pedidos", items });
                router.push('/thanks/'); 
            }

            if (respuesta.includes(codigoTransaccionDeclinada)){ 
                console.log('Transacción Declinada')   
                router.push('/error/'); 
            } 
            if (respuesta.includes(codigoErrorSistema)){
                
                console.log('Error en el sistema')   
                router.push('/error/'); 
            } 
        })     
    }  
    return {
        errors,
        nombre,
        apellido,
        email,
        telefono,
        licencia,
        nacimiento,
        tarjeta,
        onSubmit
    };
});   