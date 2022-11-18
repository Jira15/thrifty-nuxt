import { defineStore } from 'pinia'
import { mapWritableState } from 'pinia'
import { useExtrasStore } from '@/stores/extras';
import { useCoberturasStore } from '@/stores/coberturas'; 

export const usePedidoStore = defineStore(
    'pedido', 
    { 
// a function that returns a fresh state - STATE ES COMO DATA 
        state: () => ({  
            pedido: {
                carro: Object,
                cobertura: Object,
                extras: [],
                sucursal: Object,
                sucursalRetorno: Object,
                diaRetiro: String, 
                horaRetiro: Object, 
                diaRetorno: null, 
                horaRetorno: Object, 
                dropoff:null,
                era: 3.99,
                cupon: null,
                prepago: null,
                totalDeDias: Number,
                subTotal: Number,
            } 
        }), 
        // optional getters GETTER SON COMO COMPUTED 
        getters: {  

            },  
        actions: {  
            diffDias(retiro, retorno){
                    let difference = new Date(retiro).getTime() - new Date(retorno).getTime();
                    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                return TotalDays;
            },
            checkDropoff(sucursalDeRetiro, sucursalDeRetorno) { 
                let dropoff 
                const tier = {
                    uno: 0,
                    dos: 16,
                    tres: 20,
                    cuatro: 25,
                    cinco: 30,
                    seis: 52,
                    siete: 55,
                    ocho: 85,
                    nueve: 90, 
                    diez: 125,
                    once: 177,  
                    doce: 190, 
                    trece: 235, 
                    catorce: 290
                } 
        
                if (sucursalDeRetiro === sucursalDeRetorno)
                {
                    dropoff = tier.uno;
                }
                if (sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'ALBROOK' 
                || sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'V ESPANA' )
                {
                    dropoff = tier.dos;
                } 
                if ( sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'APOTOCUMEN' 
                ||  sucursalDeRetiro === 'APOTOCUMEN' && sucursalDeRetorno === 'V ESPANA' )
                {
                    dropoff = tier.tres;
                } 
                if ( sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'CHORRERA' 
                ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'V ESPANA' )
                {
                    dropoff = tier.cuatro;
                } 
                if ( sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'APOTOCUMEN' 
                ||  sucursalDeRetiro === 'APOTOCUMEN' && sucursalDeRetorno === 'CHORRERA' )
                {
                    dropoff = tier.cinco;
                } 
                if ( sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'COLON' 
                ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'ALBROOK' 
                ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'V ESPANA'
                ||  sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'COLON')
                {
                    dropoff = tier.seis;
                } 
                return  dropoff; 
            }, 
            total() {
                let precioDias = this.pedido.totalDeDias; 
                let precioAuto = this.pedido.carro.precio * precioDias;  
                let precioCobertura = this.pedido.cobertura.precio  * precioDias;
                let precioEra = this.pedido.era  * precioDias; 
                let precioDropoff = this.pedido.dropoff  * precioDias;
                const precioExtra = this.pedido.extras;   
                const preciosASumar = []; 
        
                // sumo todos los extras
                const extrasSumados = precioExtra.map(element => element.precio).reduce((a, b) => a + b, 0) * precioDias; 
                //  agrego los precios de cobertura y carro y todos los extras ya sumados al array
                preciosASumar.push(extrasSumados, precioCobertura, precioAuto, precioEra, precioDropoff); 
                // sumo todo en el array
                const suma = preciosASumar.map(element => element).reduce((a, b) => a + b, 0);

                // const resultado = suma * 6;

                // que siempre formattee como dolares 
                return new Intl.NumberFormat('en-US').format(suma); 
            }   
        } 
    }   
)    