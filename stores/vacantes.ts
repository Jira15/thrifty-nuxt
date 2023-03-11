import { defineStore } from 'pinia'  
const { getItems } = useDirectusItems();  

export const useVacantesStore = defineStore('vacantes', {
    // a function that returns a fresh state - STATE ES COMO DATA
state: () => ({ 
    vacantes: [] 
}),
// optional getters GETTER SON COMO COMPUTED 
getters: {
    getVacantes: (state) => { 
        return state.vacantes 
    },   
},
// optional   ACTIONS SON COMO METHODS
actions: {
        async fetchVacantes(){
                try { 
                    const vacantes = await getItems(
                        { collection: "bolsa_trabajo", params : { fields: ["*","picture.*"] }});
                        this.vacantes = vacantes
                } catch (error) {
                        console.error(error); 
                }
            }, 
    },
})  