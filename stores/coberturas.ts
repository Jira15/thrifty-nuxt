import { defineStore } from 'pinia'

export const useCoberturasStore = defineStore('coberturas', {
    // a function that returns a fresh state - STATE ES COMO DATA
state: () => ({  
    coberturas: [
        {    descripcion: true}
    ], 
}), 
getters: {
    getCoberturas: (state) => { 
        return state.coberturas 
    },   
}, 
actions: {
        async fetchCoberturas(){
                try {
                    const { getItems } = useDirectusItems(); 
                    var filters = { marca: "Thrifty"  };
                    const coberturas = await getItems(
                        { collection: "coberturas",
                                params: {
                                    filter: filters,
                                },
                    }); 
                    this.coberturas = coberturas  
                } catch (error) {
                        console.error(error); 
                }
            }, 
    },
})  