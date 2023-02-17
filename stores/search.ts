import { defineStore } from 'pinia'
import moment from 'moment'; 
import { useForm } from 'vee-validate';
import * as Yup from 'yup'; 
import { usePedidoStore } from '@/stores/pedido';  

const schema = Yup.object({
    sucursal: Yup.object().required(),
    // diaRetiro: Yup.string().required(),
    // horaRetiro: Yup.object().required(),
    // sucursalRetorno: Yup.object().required(),
    // diaRetorno: Yup.string().required(),
    // horaRetorno: Yup.object().required()
});  

export const useSearchStore = defineStore('search',  () => { 
    let searchIs = ref('default')
    const storePedido = usePedidoStore();
    const router = useRouter();

    const mostrarWarning = ref(false)

    const { errors, useFieldModel, handleSubmit, values } = useForm({
        validationSchema: schema,
    }); 

    const [
        sucursal, 
        fechaRetiro,
        fechaRetorno,
        sucursalRetorno,
        ] = useFieldModel([
        'sucursal', 
        'fechaRetiro',
        'fechaRetorno',
        'sucursalRetorno',  
        ]);
        
        
    const siguiente = handleSubmit((values) => {
        // send values to API
        // console.log('Submit', JSON.stringify(values, null, 2));
        // console.log("en Search Store", values);
        storePedido.pedido.sucursal = values.sucursal;
        // storePedido.pedido.horaRetiro = values.horaRetiro; 
        storePedido.pedido.diaRetiro = values.fechaRetiro; 
        storePedido.pedido.sucursalRetorno = values.sucursalRetorno;
        // storePedido.pedido.horaRetorno = values.horaRetorno; 
        storePedido.pedido.diaRetorno = values.fechaRetorno;  
        router.push('/reserva/'); 
        searchIs = ref('TheProgress');
    });  
//    diaRetiro ["[native Date Thu Dec 22 2022 11:26:00 GMT-0500 (Eastern Standard Time)]","[native Date Sat Dec 31 2022 11:26:00 GMT-0500 (Eastern Standard Time)]"]
    return {
        errors,
        sucursal,
        fechaRetiro,
        fechaRetorno,
        sucursalRetorno, 
        siguiente,
        mostrarWarning,
        searchIs
    };
});  