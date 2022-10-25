import { defineStore } from 'pinia'

export const useAutosStore = defineStore('autos', {
    // a function that returns a fresh state - STATE ES COMO DATA
state: () => ({ 
    autos: [] 
}),
// optional getters GETTER SON COMO COMPUTED 
getters: {
    getautos: (state) => { 
        return state.autos 
    },  
    // GETTER SON COMO COMPUTED getters receive the state as first parameter 
},
// optional actions ACTIONS SON COMO METHODS
actions: {
        async fetchAutos(){
                try {
                    const { getItems } = useDirectusItems(); 
                    const autos = await getItems(
                        { collection: "flota", params : { fields: ["*","galeria.*", "marcas.*"] }}); 
                    this.autos = autos  
                } catch (error) {
                        console.error(error); 
                }
            }, 
    },
})  