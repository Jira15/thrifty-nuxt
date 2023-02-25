import { defineStore } from 'pinia'
import moment from 'moment'; 
import { useForm } from 'vee-validate'; 
import { usePedidoStore } from '@/stores/pedido';  
import { schema } from '@/types/search-schema-yup';

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
        storePedido.pedido.diaRetiro = values.fechaRetiro; 
        storePedido.pedido.sucursalRetorno = values.sucursalRetorno; 
        storePedido.pedido.diaRetorno = values.fechaRetorno;  
        router.push('/reserva/'); 
        searchIs = ref('TheProgress');
    });   
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