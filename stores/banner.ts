import { defineStore } from 'pinia'

export const useBannerStore = defineStore('banner', {
    // a function that returns a fresh state - STATE ES COMO DATA
state: () => ({ 
    imagenes: [] 
}),
// optional getters GETTER SON COMO COMPUTED 
getters: {
    getAutos: (state) => { 
        return state.imagenes 
    },  
    
    // GETTER SON COMO COMPUTED getters receive the state as first parameter 
},
// optional actions ACTIONS SON COMO METHODS
actions: {
        async fetchBanners(){
                try {
                    const { getItems } = useDirectusItems(); 
                    const banner = await getItems(
                        { collection: "banner_principal", params : { fields: ["*"] }}); 
                    this.imagenes = banner  
                } catch (error) {
                        console.error(error); 
                }
            }, 
    },
})  