import { defineStore } from 'pinia'
 

export const useExtrasStore = defineStore( 'extras', { 
  state: () => ({ extras: [] }), 
  getters: {
      getExtras: (state) => { 
          return state.extras 
      },   
  }, 
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