import { defineStore } from 'pinia'
import moment from 'moment'; 
import { useForm } from 'vee-validate';
import * as Yup from 'yup'; 
import { usePedidoStore } from '@/stores/pedido'; 

const schema = Yup.object({
    sucursal: Yup.object().required(),
    // diaRetiro: Yup.string().required(),
    // horaRetiro: Yup.object().required(),
    sucursalRetorno: Yup.object().required(),
    // diaRetorno: Yup.string().required(),
    // horaRetorno: Yup.object().required()
});  
 
export const useSearchStore = defineStore('search',  () => { 

    const storePedido = usePedidoStore();
    const router = useRouter()

    const { errors, useFieldModel, handleSubmit, values } = useForm({
        validationSchema: schema,
    });

    const [sucursal] = useFieldModel(['sucursal']);
 
    
    const siguiente = handleSubmit((values) => {
        // send values to API
        console.log('Submit', JSON.stringify(values, null, 2));
        console.log("en Search Store", values);
        storePedido.pedido.sucursal = values.sucursal;
        storePedido.pedido.sucursalRetorno = values.sucursalRetorno;
        router.push('/search/');
        
    });  

    return {
        errors,
        sucursal,
        siguiente
    };
});
 

    // In Setup Stores: 
    // ref()s become state properties
    // computed()s become getters
    // function()s become actions





    
// state: () => ({   
//     searchData: null
// }),
// // optional getters GETTER SON COMO COMPUTED 
// // { value: 'TH TORRE', label: 'Torremolinos (Tocumen)', region: 'Panamá'}, 
// // { value: 'TDAVIDC', label: 'David Centro', region: 'Chiriquí'} 
// getters: {
//     // GETTER SON COMO COMPUTED getters receive the state as first parameter 
// },
// // optional actions ACTIONS SON COMO METHODS
// actions: {
//         validadoASearch() {
//             console.log("en Search Store", this.searchData); 
//         },
//         retiroAFechaCorta(fecha)
//         {
//             this.diaRetiro=moment(fecha).format('YYYY-MM-DD'); 
//         },
//         retornoAFechaCorta(fecha)
//         { 
//             this.diaRetorno=moment(fecha).format('YYYY-MM-DD');
        
//         },
//         tiempoRetiroConHorasMinutos()
//         { 
//             this.tiempoRetiro = this.horaRetiro.hours + ':' + this.horaRetiro.minutes; 
//         },
//         tiempoRetornoConHorasMinutos()
//         {  
//             this.tiempoRetorno = this.horaRetorno.hours + ':' + this.horaRetorno.minutes;
//         }
//     },
// })  