import { defineStore } from 'pinia' 
import { number } from 'yup';

export const usePedidoStore = defineStore(
    'pedido', 
    { 
// a function that returns a fresh state - STATE ES COMO DATA 
        state: () => ({  
            pedido: {
                reserva: '',
                precio_prepago: Number,
                pedidos_id: '',
                cliente: {
                    nombre: '',
                    apellido: '',
                    email: '',
                    telefono: '',
                    licencia: '', 
                    nacimiento: Date
                },
                carro:  {
                    id: Number,
                    modelo: String,
                    clasificacion:String,
                    imagen: String,
                    tipo: String,
                    pasajeros: Number,
                    maletas: Number,
                    transmision:String,
                    combustible:String,
                    marca:String,
                    puertas:Number,
                    precio_thrifty: number,
                    galeria:Array
                }, 
                cobertura: {
                    nombre: String,
                    explicacion: String,
                    precio: 0.00,
                    precio_2: 0.00,
                    precio_3: Number
                }, 
                cobertura_e: {
                    nombre: String,
                    explicacion: String,
                    precio: 0.00,
                    precio_2: 0.00,
                    precio_3: Number
                },
                extras: [],
                sucursal: { 
                            id: Number,
                            mapa: Object,
                            imagen: String,
                            name: String,
                            telefono_1: String,
                            telefono_2: null,
                            horario_cierre: Number,
                            LocationCode: String,
                            horario_apertura: Number,
                            horario_cierre_sabado: Number,
                            horario_cierre_domingo: Number,    
                            horario_apertura_sabado: Number,
                            horario_apertura_domingo: Number,
                            impuesto: 0
                        },
                sucursalRetorno: { 
                            id: Number,
                            mapa: Object,
                            imagen: String,
                            name: String,
                            telefono_1: String,
                            telefono_2: null,
                            horario_cierre: Number,
                            LocationCode: String,
                            horario_apertura: Number,
                            horario_cierre_sabado: Number,
                            horario_cierre_domingo: Number,
                            horario_apertura_sabado: Number,
                            horario_apertura_domingo: Number,
                            impuesto: Number
                        },
                diaRetiro: Date,  
                diaRetorno: Date,  
                dropoff:number,
                era: 3.99,
                cupon: null,
                prepago: null,
                totalDeDias: number,
                sub_total: number,
                impuesto: number,
                impuesto_aeropuerto: number, 
                total: '',
                order_id:String,
                status:String
            } 
        }), 
        // optional getters GETTER SON COMO COMPUTED 
        getters: {
                getPedido: (state) => { 
                    return state.pedido 
                },  
            
            },  
        actions: {   
            diffDias(retiro, retorno){
                    let difference = new Date(retiro).getTime() - new Date(retorno).getTime();
                    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                return TotalDays;
            },
            checkDropoff(sucursalDeRetiro, sucursalDeRetorno) { 
                let dropoff = 0;
                const tier = {
                    uno: 0.00, 
                    dos: 20.00,
                    tres: 25.00,
                    cuatro: 30.00,
                    cinco: 52.00,
                    seis: 55.00,
                    siete: 85.00,
                    ocho: 90.00, 
                    nueve: 125.00,
                    diez: 177.00,  
                    once: 190.00, 
                    doce: 290.00
                }  
                // tier 2  
                if (  
                    sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'ALBROOK' 
                    || sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'TORREMOLIN'  
                    || sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'APOTOCUM' 
                    || sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'ALBROOK' 
                    )
                    { dropoff = tier.dos; }  

                // tier tres: 25.00
                if ( sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'CHORRERA' 
                    ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'ALBROOK' 

                    ||  sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'CHORRERA' 
                    ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'V ESPANA' 

                    ||  sucursalDeRetiro === 'VVENETTO' && sucursalDeRetorno === 'CHORRERA' 
                    ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'VVENETTO' 

                    ||  sucursalDeRetiro === 'THCDELESTE' && sucursalDeRetorno === 'CHORRERA' 
                    ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'THCDELESTE' 
                    ) 
                    { dropoff = tier.tres;  } 

                // tier cuatro: 30.00,
                if ( sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'CHORRERA' 
                    ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'TORREMOLIN'  
                    ||  sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'CHORRERA' 
                    ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'APOTOCUM'  
                    ) 
                { dropoff = tier.cuatro; } 

                //tier cinco: 52.00,
                if ( sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'COLON' 
                ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'ALBROOK' 

                ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'V ESPANA'
                ||  sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'COLON'

                ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'THCDELESTE'
                ||  sucursalDeRetiro === 'THCDELESTE' && sucursalDeRetorno === 'COLON'

                ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'VVENETTO'
                ||  sucursalDeRetiro === 'VVENETTO' && sucursalDeRetorno === 'COLON' 
                )
                {  dropoff = tier.cinco;  } 

                // tier seis: 55
                if (
                    sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'SANTIAGO' 
                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'CHITRE'  )
                {  dropoff = tier.seis; } 


                // tier siete: 85
                if ( 
                        sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'CHORRERA'
                    ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'COLON'
    
                    ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'TORREMOLIN'
                    ||  sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'COLON'
    
                    ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'APOTOCUM'
                    ||  sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'COLON' 
                    )
                {  dropoff = tier.siete; } 



                // tier ocho: 90  
                if ( 
                    sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'CHORRERA'
                ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'CHITRE'

                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'SANTIAGO'
                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'DAVIDC'

                ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'SANTIAGO'
                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'APODAVID'

                ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'SANTIAGO'
                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'CHORRERA' 
                )
                { dropoff = tier.ocho; } 



                // tier nueve: 125   
                if ( 
                    sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'CHITRE'

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'ALBROOK'
                ||  sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'CHITRE'

                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'ALBROOK'
                ||  sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'SANTIAGO'

                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'APOTOCUM'
                ||  sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'SANTIAGO'

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'APOTOCUM'
                ||  sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'CHITRE' 

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'V ESPANA'
                ||  sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'CHITRE'

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'THCDELESTE'
                ||  sucursalDeRetiro === 'THCDELESTE' && sucursalDeRetorno === 'CHITRE'

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'VVENETTO'
                ||  sucursalDeRetiro === 'VVENETTO' && sucursalDeRetorno === 'CHITRE'  

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'TORREMOLIN'
                ||  sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'CHITRE' 

 
                )
                { dropoff = tier.nueve; } 

                // tier diez: 177   
                if ( 
                    sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'CHITRE'

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'ALBROOK'
                ||  sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'CHITRE'

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'APOTOCUM'
                ||  sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'CHITRE' 

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'V ESPANA'
                ||  sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'CHITRE'

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'THCDELESTE'
                ||  sucursalDeRetiro === 'THCDELESTE' && sucursalDeRetorno === 'CHITRE'

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'VVENETTO'
                ||  sucursalDeRetiro === 'VVENETTO' && sucursalDeRetorno === 'CHITRE'  

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'TORREMOLIN'
                ||  sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'CHITRE' 

                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'TORREMOLIN'
                ||  sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'SANTIAGO' 

                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'APOTOCUM'
                ||  sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'SANTIAGO'  

                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'V ESPANA'
                ||  sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'SANTIAGO'

                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'THCDELESTE'
                ||  sucursalDeRetiro === 'THCDELESTE' && sucursalDeRetorno === 'SANTIAGO'

                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'VVENETTO'
                ||  sucursalDeRetiro === 'VVENETTO' && sucursalDeRetorno === 'SANTIAGO'   

                )
                { dropoff = tier.diez; } 


                // tier once: 190   
                if ( 
                    
                    sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'ALBROOK'
                ||  sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'APODAVID' 
                ||  sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'ALBROOK'

                ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'APOTOCUM'
                ||  sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'APODAVID' 
                ||  sucursalDeRetiro === 'APOTOCUM' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'APOTOCUM'


                ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'CHORRERA'
                ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'APODAVID' 
                ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'CHORRERA'


                ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'TORREMOLIN'
                ||  sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'APODAVID' 
                ||  sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'TORREMOLIN'



                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'V ESPANA'
                ||  sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'V ESPANA'
                ||  sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'APODAVID'
         
                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'THCDELESTE'
                ||  sucursalDeRetiro === 'THCDELESTE' && sucursalDeRetorno === 'DAVIDC'
                ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'THCDELESTE'
                ||  sucursalDeRetiro === 'THCDELESTE' && sucursalDeRetorno === 'APODAVID'


                ||  sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'VVENETTO'
                ||  sucursalDeRetiro === 'VVENETTO' && sucursalDeRetorno === 'DAVIDC'  
                ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'VVENETTO'
                ||  sucursalDeRetiro === 'VVENETTO' && sucursalDeRetorno === 'APODAVID'   
                
                )
                { dropoff = tier.once; } 


                // tier doce: 290  APODAVID DAVIDC SANTIAGO CHORRERA CHITRE ALBROOK TORREMOLIN APOTOCUM ALBROOK
                if (  
                        sucursalDeRetiro === 'DAVIDC' && sucursalDeRetorno === 'COLON'
                    ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'DAVIDC'  
                    ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'COLON'
                    ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'APODAVID'   
                )
                { dropoff = tier.doce; }  

                //tier uno  0 dolares (sucursalDeRetiro === sucursalDeRetorno)
                // else
                // {
                //     dropoff = tier.uno;
                // } 
                console.log('dropoff' + dropoff)
                return  dropoff; 
                // return new Intl.NumberFormat('en-US').format(dropoff); 
            },
            subTotal() {

                let precioAuto 
                let tipoReserva = this.pedido.reserva;
                if(tipoReserva === 'prepago'){
                    const precio = this.pedido.carro.precio_thrifty;  
                    let descuento = 10;  
                    const descuentoCalculado = precio * (descuento / 100);  
                    const nuevoPrecio = precio - descuentoCalculado;
 
 
                    precioAuto = nuevoPrecio 
                }
                else{
                    precioAuto = this.pedido.carro.precio_thrifty ; 
                } 
                let precioCobertura
                let tipoCarro = this.pedido.carro.tipo;
                if(tipoCarro !== 'Sedan'){
                    precioCobertura = this.pedido.cobertura.precio_2; 
                }
                else {
                    precioCobertura = this.pedido.cobertura.precio; 
                }
                
                // console.log('precio de cobertura' + precioCobertura)

                let precioDias = this.pedido.totalDeDias; 
         
                let precioEra = this.pedido.era; 
                let precioDropoff = this.pedido.dropoff;
                const precioExtra = this.pedido.extras;   
                const preciosASumar = []; 
                 
                // sumo todos los extras
                const extrasSumados = precioExtra.map(element => element.precio).reduce((a, b) => a + b, 0); 
                //  agrego los precios de cobertura y carro y todos los extras ya sumados al array
                // preciosASumar.push(extrasSumados, precioCobertura, precioAuto, precioEra, precioDropoff); 

                console.log('precio drop off' + precioDropoff);
                preciosASumar.push( precioAuto, precioEra, precioCobertura, extrasSumados); 

                console.log(preciosASumar);
                // sumo todo en el array
                const suma = preciosASumar.map(element => element).reduce((a, b) => a + b, 0);

                const multiplicadoPorDias = suma * precioDias;


                const unSoloMonto = multiplicadoPorDias + precioDropoff;

                const subTotal = +(unSoloMonto.toFixed(2));

                // que siempre formattee como dolares 
                return subTotal; 
            },
            impuestoAeropuerto(){ 
                let subTotal = this.subTotal();   
                let impuestoAeropuerto = this.pedido.sucursal.impuesto;   
                const impuestoAeropuertoCalculado = subTotal * (impuestoAeropuerto / 100); 
                // const nuevoSubtotal = subTotal + impuestoAeropuertoCalculado; 
                const impuestoAeropuertoADeber = +(impuestoAeropuertoCalculado.toFixed(2));

                return  impuestoAeropuertoADeber 
            }, 
            impuesto(){ 
                let subTotal = this.subTotal();
                // console.log('subtotal inicial' + subTotal);
                let impuestoAeropuerto = this.pedido.sucursal.impuesto;  
                // console.log('impuestoAeropuerto viene de sucursal  ' +  impuestoAeropuerto)  
                // Calculate tax due
                const impuestoAeropuertoCalculado = subTotal * (impuestoAeropuerto / 100);
                // console.log('impuestoAeropuertoCalculado  ' + impuestoAeropuertoCalculado); 


                const nuevoSubtotal = subTotal + impuestoAeropuertoCalculado;
                // console.log('nuevo subtotal, no lo ocupo, solo referencia' + nuevoSubtotal);   
                let impuesto = 7; 
                // Calculate tax due
                const impuestoCalculado = nuevoSubtotal * (impuesto / 100); 
                // console.log(impuestoCalculado);

                const impuestoADeber = +(impuestoCalculado.toFixed(2));
                // console.log('impuesto con aeropuerto y nuevo total sumado:' + impuestoADeber);
                

                // que siempre formattee como dolares 
                return  impuestoADeber  
            }, 
            total() {
                // cuando llamamos la funcion es store.total y el state es store.pedido.total
                let impuestoAeropuerto = 0;
                if ( this.pedido.sucursal.impuesto)
                {
                    impuestoAeropuerto = this.pedido.sucursal.impuesto;    
                }
                let subTotal = this.subTotal();   
                let impuesto = 7;  
                const impuestoAeropuertoCalculado = subTotal * (impuestoAeropuerto / 100);

                const nuevoSubtotal = subTotal + impuestoAeropuertoCalculado;
                // Calculate tax due
                const impuestoADeber = nuevoSubtotal * (impuesto / 100);
                // Calculate final price
                const impuestoSumado = nuevoSubtotal * (1 + (impuesto / 100));
                
                let precioFinal = +(impuestoSumado.toFixed(2)); 
                // console.log(
                //     "Subtotal: $" + subTotal + 
                //     'impuestoAeropuerto viene de sucursal  ' +  impuestoAeropuerto +
                //     "\n Impuesto Aeropuerto: " + impuestoAeropuertoCalculado + 
                //     "\n nuevo Subtotal: " + nuevoSubtotal + 
                //     "%\n Impuesto Final: $" + impuestoADeber + 
                //     "\n\nFinal price: $" + precioFinal);
                    
                return new Intl.NumberFormat('en-US').format(precioFinal); 
            }   
        } 
    }   
)    

// total() {
//     let subTotal = this.subTotal();  
//     let impuesto = 7;
    
    
//     // Calculate tax due
//     const impuestoADeber = subTotal * (impuesto / 100);
//     // Calculate final price
//     const impuestoSumado = subTotal * (1 + (impuesto / 100));
    
//     const precioFinal = +(impuestoSumado.toFixed(2));


//     // console.log(
//     //     "Cart value: $" + subTotal + 
//     //     "\nTax rate: " + impuesto + 
//     //     "%\nTax due: $" + impuestoADeber + 
//     //     "\n\nFinal price: $" + precioFinal); 
//     // que siempre formattee como dolares 
//     return new Intl.NumberFormat('en-US').format(precioFinal); 
// }  