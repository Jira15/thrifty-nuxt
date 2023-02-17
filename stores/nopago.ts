import { defineStore } from 'pinia' 
import { useForm } from 'vee-validate';
import * as Yup from 'yup'; 
import { usePedidoStore } from '@/stores/pedido';     
import { Pedido } from '~~/types/interfaces';
import moment from 'moment';


const checkoutSchema = Yup.object({ 
    nombre: Yup.string().required(),
    apellido: Yup.string().required(),
    // email: Yup.string().required(),
    // telefono: Yup.string().required(),
    // licencia: Yup.string().required(),
    // nacimiento: Yup.string().required(),
});   

export const useNoPagoStore = defineStore('nopago',  () => { 

    const { createItems } = useDirectusItems(); 
    const storePedido = usePedidoStore();
    const totalPedido = storePedido.total();    
 
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
    //   console.log("Values", values);    
            const router = useRouter();   
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
                    fecha_retorno: moment(storePedido.pedido.diaRetorno).format(), 
                    carro: storePedido.pedido.carro,
                    cobertura: storePedido.pedido.cobertura,
                    dropoff: storePedido.pedido.dropoff,
                    sucursal_detail: storePedido.pedido.sucursal,
                    sucursal_retorno_detail: storePedido.pedido.sucursalRetorno,
                    extras: JSON.stringify(storePedido.pedido.extras), 
                    status: 'Pendiente de Pago',
                    total: totalPedido
                } ]; 
                createItems<Pedido>({ collection: "pedidos", items });
                router.push('/thanks/'); 
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
    } 
});   