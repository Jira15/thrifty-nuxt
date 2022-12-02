import { useSucursalStore } from './sucursal';
import { defineStore } from 'pinia'
import moment from 'moment'; 
import { useForm } from 'vee-validate';
import * as Yup from 'yup'; 
import { usePedidoStore } from '@/stores/pedido'; 
import { create } from 'yup/lib/Reference';




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
        nombre: string;
        apellido: string;
        email: string,
        telefono: string,
        licencia: string,
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
        
    const finalizar = handleSubmit((values) => {
        // send values to API
        console.log('Submit', JSON.stringify(values, null, 2));
        console.log("Values", values);
        console.log("en Pedido Store", storePedido);
        console.log("Hora",  JSON.stringify(storePedido.pedido.horaRetiro, null, 2));
        
        // storePedido.pedido.cliente = values.nombre;  
        
        try {
            var items: Pedido[] = [
                {
                    nombre: values.nombre,
                    apellido: values.apellido, 
                    email: values.email,
                    telefono: values.telefono, 
                    licencia: values.licencia,
                    nacimiento:  storePedido.pedido.nacimiento,
                    retiro: storePedido.pedido.sucursal.nombre,
                    fecha_retiro: storePedido.pedido.diaRetiro,
                    hora_retiro:  horaRetiroString,
                    retorno: storePedido.pedido.sucursalRetorno.nombre,
                    fecha_retorno: storePedido.pedido.diaRetorno,
                    hora_retorno: horaRetornoString,
                    carro: storePedido.pedido.carro.modelo,
                    cobertura:storePedido.pedido.cobertura.nombre,
                    extras: JSON.stringify(storePedido.pedido.extras), 
                    total: totalPedido
                } 
            ]; 
            createItems<Pedido>({ collection: "pedidos", items });
            } catch (e) {} 
        router.push('/thanks/'); 
    });  

    return {
        errors,
        nombre,
        apellido,
        email,
        telefono,
        licencia,
        nacimiento,
        finalizar
    };
});  
 