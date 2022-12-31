import { defineStore } from 'pinia'

export const useCoberturasStore = defineStore('coberturas', {
    // a function that returns a fresh state - STATE ES COMO DATA
state: () => ({ 
    coberturas: [
        {    descripcion: true}
    ],

 
}),
// optional getters GETTER SON COMO COMPUTED 
getters: {
    getCoberturas: (state) => { 
        return state.coberturas 
    },  
    // GETTER SON COMO COMPUTED getters receive the state as first parameter 
},
// optional actions ACTIONS SON COMO METHODS
actions: {
        async fetchCoberturas(){
                try {
                    const { getItems } = useDirectusItems(); 
                    const coberturas = await getItems(
                        { collection: "coberturas"}); 
                    this.coberturas = coberturas  
                } catch (error) {
                        console.error(error); 
                }
            }, 
    },
})  