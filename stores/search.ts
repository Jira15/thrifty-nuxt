import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
    // a function that returns a fresh state - STATE ES COMO DATA
state: () => ({   
    sucursalRetorno: '',
    modelo:'',
    diaRetiro: null,
    diaRetorno: null,
    horaRetiro: null,
    horaRetorno: null,
    tiempoRetiro: null,
    tiempoRetorno: null,
    carroObjetoArray: [], 
    sucursal: 'Seleccione', 
    sucursales: '',
    options: [
        { value: 'TH TORRE', label: 'Torremolinos (Tocumen)', region: 'Panamá'}, 
        { value: 'TDAVIDC', label: 'David Centro', region: 'Chiriquí'}  
    ],  
}),
// optional getters GETTER SON COMO COMPUTED 
getters: {
    // GETTER SON COMO COMPUTED getters receive the state as first parameter 
},
// optional actions ACTIONS SON COMO METHODS
actions: {
        ChangeD(retiroAFechaCorta)
        {
            this.diaRetiro=moment(retiroAFechaCorta).format('YYYY-MM-DD'); 
        },
        ChangeR(retornoAFechaCorta)
        { 
            this.diaRetorno=moment(retornoAFechaCorta).format('YYYY-MM-DD');
        
        },
        ChangeH()
        { 
            this.tiempoRetiro = this.horaRetiro.hours + ':' + this.horaRetiro.minutes; 
        },
        ChangeT()
        {  
            this.tiempoRetorno = this.horaRetorno.hours + ':' + this.horaRetorno.minutes;
        }
    },
}) 