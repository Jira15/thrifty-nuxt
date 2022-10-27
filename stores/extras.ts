import { defineStore } from 'pinia'

export const useExtrasStore = defineStore('extras', {
    // a function that returns a fresh state - STATE ES COMO DATA
state: () => ({ 
    extras: [] 
}),
// optional getters GETTER SON COMO COMPUTED 
getters: {
    getExtras: (state) => { 
        return state.extras 
    },  
    // GETTER SON COMO COMPUTED getters receive the state as first parameter 
},
// optional actions ACTIONS SON COMO METHODS
actions: {
        async fetchExtras(){
                try {
                    const { getItems } = useDirectusItems(); 
                    const extras = await getItems(
                        { collection: "extras"}); 
                    this.extras = extras  
                } catch (error) {
                        console.error(error); 
                }
            }, 
    },
})  