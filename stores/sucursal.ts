import { defineStore } from 'pinia'

export const useSucursalStore = defineStore('sucursal', {
    // a function that returns a fresh state - STATE ES COMO DATA
state: () => ({ 
    sucursales: []
}),
// optional getters GETTER SON COMO COMPUTED 
getters: {
    getSucursales: (state) => { 
        return state.sucursales 
    },  
    // GETTER SON COMO COMPUTED getters receive the state as first parameter 
},
// optional actions ACTIONS SON COMO METHODS
actions: {
        async fetchSucursales(){
                try {
                    const { getItems } = useDirectusItems(); 
                    const sucursales = await getItems(
                        { collection: "sucursal", params : { fields: ["*","picture.*"] }});
                    this.sucursales = sucursales 
                } catch (error) {
                        console.error(error); 
                }
            }, 
    },
})  