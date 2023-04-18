import { defineStore } from 'pinia'

export const useDeliveryStore = defineStore('delivery', {
    // a function that returns a fresh state - STATE ES COMO DATA
state: () => ({  
    delivery: [ ], 
}), 
getters: {
    getDelivery: (state) => { 
        return state.delivery 
    },   
}, 
actions: {
        async fetchDelivery(){
                try {
                    const { getItems } = useDirectusItems();  
                    const delivery = await getItems(
                        { collection: "delivery", 
                    }); 
                    this.delivery = delivery  
                } catch (error) {
                        console.error(error); 
                }
            }, 
            
    },
})  