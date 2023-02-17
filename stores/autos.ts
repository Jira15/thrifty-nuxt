import { defineStore } from 'pinia'
import { useFiltroStore } from '@/stores/filtros'
 
export const useAutosStore = defineStore('autos', {
    // a function that returns a fresh state - STATE ES COMO DATA
state: () => ({ 
    autos: [] 
}),
// optional getters GETTER SON COMO COMPUTED 
getters: {
    getAutos: (state) => { 
        return state.autos 
    },  
    
    // GETTER SON COMO COMPUTED getters receive the state as first parameter 
},
// optional actions ACTIONS SON COMO METHODS


// https://admin.carstogopanama.com/items/carros?filter={"city":{"_in":["David"]},"make":{"_in":["Toyota"]}}&fields=*&sort=sort&sort=price

// https://admin.intermarketing.com.pa/items/flota?filter={"tipo":{"_in":["Sedan"]},"marca":{"_in":["Toyota"]}}&fields=*&sort=sort&sort=precio_thrifty



actions: {

    async fetchAutos(){
        try {
            const storeFiltro = useFiltroStore();
            const { getItems } = useDirectusItems(); 

            const filters =  
            { 
                tipo: storeFiltro.filtros.tipo,
                marca: storeFiltro.filtros.marca,
                // precio: storeFiltro.filtros.precio
            }
            
            let tipo
            if (filters.tipo != '')  { 
                tipo = {
                        "_in": [storeFiltro.filtros.tipo]
                        } 
                                
            } 
            let marca
            if (filters.marca != '')  { 
                marca = {
                        "_in": [storeFiltro.filtros.marca]
                        } 
                                
            } 
            const precio_thrifty = storeFiltro.filtros.precio_thrifty  
            const autos = await getItems(
        { 
                collection: "flota", 
                params: 
                    { 
                        filter: {
                            tipo,
                            marca
                        },
                        fields: ["*"],
                        sort: ["sort", precio_thrifty ]
                    }
            }); 
            this.autos = autos  
        } catch (error) {
                console.error(error); 
        }
}, 
        // async fetchAutos(){
        //         try {
        //             const { getItems } = useDirectusItems(); 
        //             const autos = await getItems(
        //                 { collection: "flota", params : { fields: ["*","galeria.*", "marcas.*"] }}); 
        //             this.autos = autos  
        //         } catch (error) {
        //                 console.error(error); 
        //         }
        //     }, 
    },
})  