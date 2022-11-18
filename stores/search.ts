import { defineStore } from 'pinia'
import moment from 'moment';
export const useSearchStore = defineStore('search', {
    // a function that returns a fresh state - STATE ES COMO DATA
state: () => ({   
    sucursal: Object, 
    sucursalRetorno: Object,
    modelo:'', 
    diaRetiro: '',
    horaRetiro:  '',
    tiempoRetiro: null, 
    diaRetorno: null, 
    horaRetorno: null, 
    tiempoRetorno: null, 
    sucursales: '',
    options: [],  
}),
// optional getters GETTER SON COMO COMPUTED 
// { value: 'TH TORRE', label: 'Torremolinos (Tocumen)', region: 'Panamá'}, 
// { value: 'TDAVIDC', label: 'David Centro', region: 'Chiriquí'} 
getters: {
    // GETTER SON COMO COMPUTED getters receive the state as first parameter 
},
// optional actions ACTIONS SON COMO METHODS
actions: {
        retiroAFechaCorta(fecha)
        {
            this.diaRetiro=moment(fecha).format('YYYY-MM-DD'); 
        },
        retornoAFechaCorta(fecha)
        { 
            this.diaRetorno=moment(fecha).format('YYYY-MM-DD');
        
        },
        tiempoRetiroConHorasMinutos()
        { 
            this.tiempoRetiro = this.horaRetiro.hours + ':' + this.horaRetiro.minutes; 
        },
        tiempoRetornoConHorasMinutos()
        {  
            this.tiempoRetorno = this.horaRetorno.hours + ':' + this.horaRetorno.minutes;
        }
    },
}) 