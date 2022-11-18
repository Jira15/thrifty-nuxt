import { defineStore } from 'pinia'
import moment from 'moment';
import { useForm, useField  } from 'vee-validate';
import * as Yup from 'yup';


const schema = Yup.object({
        sucursal: Yup.string().required(), 
        diaRetiro: Yup.string().required(),
        horaRetiro: Yup.object().required(), 
        sucursalRetorno: Yup.string().required(),
        diaRetorno: Yup.string().required(),
        horaRetorno: Yup.object().required()
    }); 
 
export const useSearchStore = defineStore('search',
 () => {
        const { errors, useFieldModel, handleSubmit  } = useForm({
            validationSchema: schema,
        }); 
        const [
                sucursal,
                diaRetiro,
                horaRetiro,
                sucursalRetorno,
                diaRetorno,
                horaRetorno 
                ] = useFieldModel(
                [
                'sucursal',
                'diaRetiro',
                'horaRetiro', 
                'sucursalRetorno',
                'diaRetorno',
                'horaRetorno'
                ]); 

 
        // const [sucursal ] = useFieldModel(['sucursal', 'sucursalRetorno', 'diaRetiro']); 
        // const sucursal = reactive(useField('sucursal'));
 
        const submit = handleSubmit((values) => {
            // send values to API
            console.log('Submit', JSON.stringify(values, null, 2));
            
        }); 
        return {
            errors,
            sucursal,
            diaRetiro,
            horaRetiro,
            sucursalRetorno,
            diaRetorno,
            horaRetorno,
            submit,
        };
    // },
// { // a function that returns a fresh state - STATE ES COMO DATA
// state: () => ({   
//     sucursal: Object, 
//     sucursalRetorno: Object,
//     modelo:'', 
//     diaRetiro: '',
//     horaRetiro:  '',
//     tiempoRetiro: null, 
//     diaRetorno: null, 
//     horaRetorno: null, 
//     tiempoRetorno: null, 
//     sucursales: '',
//     options: [],  
// }),
// // optional getters GETTER SON COMO COMPUTED 
// // { value: 'TH TORRE', label: 'Torremolinos (Tocumen)', region: 'Panamá'}, 
// // { value: 'TDAVIDC', label: 'David Centro', region: 'Chiriquí'} 
// getters: {
//     // GETTER SON COMO COMPUTED getters receive the state as first parameter 
// },
// // optional actions ACTIONS SON COMO METHODS
// actions: {
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
}) 




