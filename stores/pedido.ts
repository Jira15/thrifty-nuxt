import { defineStore } from 'pinia'
import { mapWritableState } from 'pinia'
import { useExtrasStore } from '@/stores/extras';
import { useCoberturasStore } from '@/stores/coberturas'; 
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
                total: number,
                order_id:String,
                status:String
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
                    uno: 0.00,
                    dos: 16.00,
                    tres: 20.00,
                    cuatro: 25.00,
                    cinco: 30.00,
                    seis: 52.00,
                    siete: 55.00,
                    ocho: 85.00,
                    nueve: 90.00, 
                    diez: 125.00,
                    once: 177.00,  
                    doce: 190.00, 
                    trece: 235.00, 
                    catorce: 290.00
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
                    console.log('precio' + precio +
                                'descuento' + descuento+
                                'descuento calculado' +  descuentoCalculado +
                                'nuevo precio' + nuevoPrecio)
                    // // Calculate tax due
                    // const impuestoADeber = nuevoSubtotal * (impuesto / 100);
                    // // Calculate final price
                    // const impuestoSumado = nuevoSubtotal * (1 + (impuesto / 100));
                    // this.pedido.precio_prepago = nuevoPrecio
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

                // console.log(extrasSumados);
                preciosASumar.push( precioAuto, precioEra, precioCobertura, extrasSumados); 
                // sumo todo en el array
                const suma = preciosASumar.map(element => element).reduce((a, b) => a + b, 0);

                const resultado = suma * precioDias;
                const subTotal = +(resultado.toFixed(2));

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
                let subTotal = this.subTotal(); 
                let impuestoAeropuerto = this.pedido.sucursal.impuesto;     
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