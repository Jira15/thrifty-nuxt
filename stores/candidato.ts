import { defineStore } from 'pinia' 

import { useForm } from 'vee-validate'; 
import { vacanteSchema } from '@/types/vacante-schema-yup';  


export const useCandidatoStore = defineStore('candidato',  () => { 

    const { createItems } = useDirectusItems();   
    // const candidato = ref( {
    //     nombre: '',
    //     apellido: '',
    //     email:'',
    //     telefono:'' 
    // })
    const { errors, useFieldModel, handleSubmit, values } = useForm({
        validationSchema: vacanteSchema,
    });

    const [
        nombre,
        apellido,
        email,
        telefono,
        cv
        ] = useFieldModel([
        'nombre',
        'apellido',
        'email',
        'telefono',
        'cv'
        ]);
 
    async function crearCandidato(values) {
      // Submit values to API... 
      console.log('Submit', JSON.stringify(values, null, 2));
      console.log("Values", values);   
      const router = useRouter();  
        console.log('codigoAprobado')   

        const formData = new FormData();
        formData.append('cv', values.cv);


        var items  =  
        {
           
            nombre: values.nombre,
            apellido: values.apellido, 
            email:values.email,
            telefono:values.telefono,  
            cv: values.cv, 
        }    
        // createItems({ collection: "candidatos", items });
        // router.push('/thanks/');  


        // https://admin.intermarketing.com.pa/assets/
         await fetch('https://admin.intermarketing.com.pa/items/candidatos', {
            method: 'POST',
            headers: {
              Authorization: 'uiN-pHJwLhUKcmbMCH8PXfJjKT9D5cfh',
            },
            body: formData,
        });

        router.push('/thanks/');  


        
    }  
    return {
        errors,
        nombre,
        apellido,
        email,
        telefono,
        cv,
        crearCandidato
    };
});   





// export const useCandidatoStore = defineStore('candidato', {
//     // a function that returns a fresh state - STATE ES COMO DATA
// state: () => ({  
//     candidato: {
//         nombre: '',
//         apellido: '',
//         email:'',
//         telefono:'' 
//     }
// }),
// // optional getters GETTER SON COMO COMPUTED 
// getters: {
//     getcCandidato: (state) => { 
//         return state.candidato 
//     },   
// },
// // optional   ACTIONS SON COMO METHODS
// actions: {
//             async  crearCandidato(values) {
//                 const { createItems } = useDirectusItems(); 

//                 // Submit values to API...  
//                 console.log("Values", values);    
//                 const router = useRouter();   
//                     var items = [
//                     {
//                         nombre: this.candidato.nombre,
//                         apellido: this.candidato.apellido, 
//                         email:this.candidato.email,
//                         telefono:this.candidato.telefono,  
//                         // cv: this.candidato.cv, 
//                     } ]; 
//                 createItems({ collection: "candidatos", items });
//                 router.push('/thanks/'); 
//             }   
//     },
// })  
