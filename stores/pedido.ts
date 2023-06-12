import { defineStore } from 'pinia' 
import { array, date, number } from 'yup';
import { Extra } from '@/types/extra'; 
import { useExtrasStore } from "@/stores/extras";
import { useCoberturasStore } from "@/stores/coberturas";
import { getUniqueOrderID } from '@/types/orderIDGenerator';

 
export const usePedidoStore = defineStore(
    'pedido', 
    { 
// a function that returns a fresh state - STATE ES COMO DATA 
        state: () => ({  
            pedido: {
                reserva: '',
                precio_prepago: 0,
                pedidos_id: '',
                cliente: {
                    nombre: '',
                    apellido: '',
                    email: '',
                    telefono: '',
                    licencia: '', 
                    nacimiento: new Date()
                },
                carro:  {
                    id: 0,
                    modelo: '',
                    clasificacion:'',
                    imagen: '',
                    tipo: '',
                    pasajeros: 0,
                    maletas: 0,
                    transmision:'',
                    combustible:'',
                    marca:'',
                    puertas:0,
                    precio_thrifty: 0.00,
                    descuento_prepago: 0.00,
                    galeria:[]
                }, 
                cobertura: {
                    nombre: '',
                    explicacion: '',
                    precio: 0.00,
                    precio_2: 0.00,
                    precio_3: 0
                },  
                extras: [], 
                delivery: { 
                    precio: 0.00, 
                    explicacion: '',
                    aviso: '', 
                    seleccion: null
                }, 
                sucursal: { 
                            id: 0,
                            mapa: {},
                            imagen: '',
                            name: '',
                            telefono_1: '',
                            telefono_2: null,   
                            horario_cierre: 0,
                            LocationCode: '',
                            horario_apertura: 0,
                            horario_cierre_sabado: 0,
                            horario_cierre_domingo: 0,    
                            horario_apertura_sabado: 0,
                            horario_apertura_domingo: 0,
                            impuesto: 0
                        },
                sucursalRetorno: { 
                            id: 0,
                            mapa: {},
                            imagen: '',
                            name: '',
                            telefono_1: '',
                            telefono_2: null,
                            horario_cierre: 0,
                            LocationCode: '',
                            horario_apertura: 0,
                            horario_cierre_sabado: 0,
                            horario_cierre_domingo: 0,
                            horario_apertura_sabado: 0,
                            horario_apertura_domingo: 0,
                            impuesto: 0
                        },
                diaRetiro: '',  
                diaRetorno: '',  
                dropoff:0,
                era: 3.99,
                cupon: null,
                cupon_code: null,
                prepago: null,
                totalDeDias: 0,
                sub_total: 0,
                impuesto: 0,
                impuesto_aeropuerto: 0, 
                total: 0,
                order_id:'',
                status:''
            } 
        }), 
        // optional getters GETTER SON COMO COMPUTED 
        getters: {
                getPedido: (state) => { 
                    return state.pedido 
                },   
  
            },      
        actions: {  
            // setOrderId () {
            //     const orderID = getUniqueOrderID();
            //     this.pedido.order_id = orderID;

            // },

            resetDelivery() { 
                this.pedido.delivery = {
                  precio: 0,
                  explicacion: '',
                  aviso: '',
                  seleccion: null,
                } 
          },  
            addExtra(extra) { 
                    this.pedido.extras.push(extra)
 
              },
              removeExtra(extra) {
                const index = this.pedido.extras.indexOf(extra)
                if (index !== -1) {
                  this.pedido.extras.splice(index, 1)
                }
              },
              updatePedido(newPedido) {
                if (Array.isArray(newPedido.extras)) { // check if newPedido.extras is an array
                  this.pedido.extras = newPedido.extras
                } else {
                  console.error('extras must be an array')
                }
                // other logic
              },
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
                    doce: 290.00,
                    trece: 15.00
                }  

                 // tier 13 
                 if (  
                    sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'TOCUMEN' 
                    || sucursalDeRetiro === 'TOCUMEN' && sucursalDeRetorno === 'V ESPANA'  


                    || sucursalDeRetiro === 'THVENETTO' && sucursalDeRetorno === 'TOCUMEN' 
                    || sucursalDeRetiro === 'TOCUMEN' && sucursalDeRetorno === 'THVENETTO' 

                    || sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'TOCUMEN' 
                    || sucursalDeRetiro === 'TOCUMEN' && sucursalDeRetorno === 'ALBROOK' 


                    || sucursalDeRetiro === 'THCDELESTE' && sucursalDeRetorno === 'TOCUMEN' 
                    || sucursalDeRetiro === 'TOCUMEN' && sucursalDeRetorno === 'THCDELESTE' 

 


                    )
                    { dropoff = tier.trece; }  


                // tier 2  
                if (  
                    sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'ALBROOK' 
                    || sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'TORREMOLIN'   
                    )
                    { dropoff = tier.dos; }  

                // tier tres: 25.00
                if ( sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'CHORRERA' 
                    ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'ALBROOK' 

                    ||  sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'CHORRERA' 
                    ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'V ESPANA' 

                    ||  sucursalDeRetiro === 'THVENETTO' && sucursalDeRetorno === 'CHORRERA' 
                    ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'THVENETTO' 

                    ||  sucursalDeRetiro === 'THCDELESTE' && sucursalDeRetorno === 'CHORRERA' 
                    ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'THCDELESTE' 
                    ) 
                    { dropoff = tier.tres;  } 

                // tier cuatro: 30.00,
                if ( sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'CHORRERA' 
                    ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'TORREMOLIN'  
                    ||  sucursalDeRetiro === 'TOCUMEN' && sucursalDeRetorno === 'CHORRERA' 
                    ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'TOCUMEN'  
                    ) 
                { dropoff = tier.cuatro; } 

                //tier cinco: 52.00,
                if ( sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'COLON' 
                ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'ALBROOK' 

                ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'V ESPANA'
                ||  sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'COLON'

                ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'THCDELESTE'
                ||  sucursalDeRetiro === 'THCDELESTE' && sucursalDeRetorno === 'COLON'

                ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'THVENETTO'
                ||  sucursalDeRetiro === 'THVENETTO' && sucursalDeRetorno === 'COLON' 
                )
                {  dropoff = tier.cinco;  } 

                // tier seis: 55
                if (
                    sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'SANTIAGO' 
                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'CHITRE'  
                ||  sucursalDeRetiro === 'APOCHITRE' && sucursalDeRetorno === 'SANTIAGO' 
                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'APOCHITRE' 
                )
                {  dropoff = tier.seis; } 


                // tier siete: 85
                if ( 
                        sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'CHORRERA'
                    ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'COLON'
    
                    ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'TORREMOLIN'
                    ||  sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'COLON'
    
                    ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'TOCUMEN'
                    ||  sucursalDeRetiro === 'TOCUMEN' && sucursalDeRetorno === 'COLON' 
                    )
                {  dropoff = tier.siete; } 



                // tier ocho: 90  
                if ( 
                    sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'CHORRERA'
                ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'CHITRE'

                ||   sucursalDeRetiro === 'APOCHITRE' && sucursalDeRetorno === 'CHORRERA'
                ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'APOCHITRE'



                ||  sucursalDeRetiro === 'TDAVIDC' && sucursalDeRetorno === 'SANTIAGO'
                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'TDAVIDC'

                ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'SANTIAGO'
                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'APODAVID'

                ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'SANTIAGO'
                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'CHORRERA' 
                )
                { dropoff = tier.ocho; } 



                // tier nueve: 125   
                if ( 

                sucursalDeRetiro === 'APOCHITRE' && sucursalDeRetorno === 'TDAVIDC'
                ||  sucursalDeRetiro === 'TDAVIDC' && sucursalDeRetorno === 'APOCHITRE'

                ||  sucursalDeRetiro === 'APOCHITRE' && sucursalDeRetorno === 'ALBROOK'
                ||  sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'APOCHITRE'


                ||  sucursalDeRetiro === 'APOCHITRE' && sucursalDeRetorno === 'TOCUMEN'
                ||  sucursalDeRetiro === 'TOCUMEN' && sucursalDeRetorno === 'APOCHITRE' 

                ||  sucursalDeRetiro === 'APOCHITRE' && sucursalDeRetorno === 'V ESPANA'
                ||  sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'APOCHITRE'

                ||  sucursalDeRetiro === 'APOCHITRE' && sucursalDeRetorno === 'THCDELESTE'
                ||  sucursalDeRetiro === 'THCDELESTE' && sucursalDeRetorno === 'APOCHITRE'

                ||  sucursalDeRetiro === 'APOCHITRE' && sucursalDeRetorno === 'THVENETTO'
                ||  sucursalDeRetiro === 'THVENETTO' && sucursalDeRetorno === 'APOCHITRE'  

                ||  sucursalDeRetiro === 'APOCHITRE' && sucursalDeRetorno === 'TORREMOLIN'
                ||  sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'APOCHITRE'  

                ||   sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'TDAVIDC'
                ||  sucursalDeRetiro === 'TDAVIDC' && sucursalDeRetorno === 'CHITRE'

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'ALBROOK'
                ||  sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'CHITRE'


                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'TOCUMEN'
                ||  sucursalDeRetiro === 'TOCUMEN' && sucursalDeRetorno === 'CHITRE' 

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'V ESPANA'
                ||  sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'CHITRE'

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'THCDELESTE'
                ||  sucursalDeRetiro === 'THCDELESTE' && sucursalDeRetorno === 'CHITRE'

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'THVENETTO'
                ||  sucursalDeRetiro === 'THVENETTO' && sucursalDeRetorno === 'CHITRE'  

                ||  sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'TORREMOLIN'
                ||  sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'CHITRE' 
 
                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'ALBROOK'
                ||  sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'SANTIAGO'

                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'V ESPANA'
                ||  sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'SANTIAGO'
 
                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'TOCUMEN'
                ||  sucursalDeRetiro === 'TOCUMEN' && sucursalDeRetorno === 'SANTIAGO'
 
                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'TORREMOLIN'
                ||  sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'SANTIAGO' 
 

                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'THCDELESTE'
                ||  sucursalDeRetiro === 'THCDELESTE' && sucursalDeRetorno === 'SANTIAGO'

                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'THVENETTO'
                ||  sucursalDeRetiro === 'THVENETTO' && sucursalDeRetorno === 'SANTIAGO'   

 
                )
                { dropoff = tier.nueve; } 

                // tier diez: 177   
                if ( 
                    sucursalDeRetiro === 'CHITRE' && sucursalDeRetorno === 'COLON'
                ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'CHITRE' 
                ||  sucursalDeRetiro === 'APOCHITRE' && sucursalDeRetorno === 'COLON'
                ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'APOCHITRE' 
                ||  sucursalDeRetiro === 'SANTIAGO' && sucursalDeRetorno === 'COLON'
                ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'SANTIAGO' 
                )
                { dropoff = tier.diez; }  
                // tier once: 190   
                if ( 
                    
                    sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'ALBROOK'
                ||  sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'APODAVID' 
                ||  sucursalDeRetiro === 'ALBROOK' && sucursalDeRetorno === 'TDAVIDC'
                ||  sucursalDeRetiro === 'TDAVIDC' && sucursalDeRetorno === 'ALBROOK'

                ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'TOCUMEN'
                ||  sucursalDeRetiro === 'TOCUMEN' && sucursalDeRetorno === 'APODAVID' 
                ||  sucursalDeRetiro === 'TOCUMEN' && sucursalDeRetorno === 'TDAVIDC'
                ||  sucursalDeRetiro === 'TDAVIDC' && sucursalDeRetorno === 'TOCUMEN'


                ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'CHORRERA'
                ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'APODAVID' 
                ||  sucursalDeRetiro === 'CHORRERA' && sucursalDeRetorno === 'TDAVIDC'
                ||  sucursalDeRetiro === 'TDAVIDC' && sucursalDeRetorno === 'CHORRERA'


                ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'TORREMOLIN'
                ||  sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'APODAVID' 
                ||  sucursalDeRetiro === 'TORREMOLIN' && sucursalDeRetorno === 'TDAVIDC'
                ||  sucursalDeRetiro === 'TDAVIDC' && sucursalDeRetorno === 'TORREMOLIN'



                ||  sucursalDeRetiro === 'TDAVIDC' && sucursalDeRetorno === 'V ESPANA'
                ||  sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'TDAVIDC'
                ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'V ESPANA'
                ||  sucursalDeRetiro === 'V ESPANA' && sucursalDeRetorno === 'APODAVID' 
                ||  sucursalDeRetiro === 'TDAVIDC' && sucursalDeRetorno === 'THCDELESTE'
                ||  sucursalDeRetiro === 'THCDELESTE' && sucursalDeRetorno === 'TDAVIDC'
                ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'THCDELESTE'
                ||  sucursalDeRetiro === 'THCDELESTE' && sucursalDeRetorno === 'APODAVID'


                ||  sucursalDeRetiro === 'TDAVIDC' && sucursalDeRetorno === 'THVENETTO'
                ||  sucursalDeRetiro === 'THVENETTO' && sucursalDeRetorno === 'TDAVIDC'  
                ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'THVENETTO'
                ||  sucursalDeRetiro === 'THVENETTO' && sucursalDeRetorno === 'APODAVID'   
                
                )
                { dropoff = tier.once; } 


                // tier doce: 290  APODAVID TDAVIDC SANTIAGO CHORRERA CHITRE ALBROOK TORREMOLIN TOCUMEN ALBROOK
                if (  
                        sucursalDeRetiro === 'TDAVIDC' && sucursalDeRetorno === 'COLON'
                    ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'TDAVIDC'  
                    ||  sucursalDeRetiro === 'APODAVID' && sucursalDeRetorno === 'COLON'
                    ||  sucursalDeRetiro === 'COLON' && sucursalDeRetorno === 'APODAVID'   
                )
                { dropoff = tier.doce; }  

                //tier uno  0 dolares (sucursalDeRetiro === sucursalDeRetorno)
                // else
                // {
                //     dropoff = tier.uno;
                // }  
                return  dropoff; 
                // return new Intl.NumberFormat('en-US').format(dropoff); 
            },
            cuponActivo(codigoCupon) {
               this.pedido.cupon = codigoCupon;
               console.log('codigo cupon ' + codigoCupon)
            }, 
            precioAuto(){
                let precioAuto = 0; 
                let tipoReserva = this.pedido.reserva;

                    if(tipoReserva === 'prepago'){
                        
                        let cupon = this.pedido.cupon;
                        if(cupon === 'panamericano23'){
                            console.log('cupon Activo' + precioAuto)
                            const precio = this.pedido.carro.precio_thrifty;  
                            let descuento = 30;  
                            const descuentoCalculado = precio * (descuento / 100);  
                            const nuevoPrecio = precio - descuentoCalculado; 
                            precioAuto = nuevoPrecio 

                        }
                        else {
                            const precio = this.pedido.carro.precio_thrifty;  
                            let descuento = this.pedido.carro.descuento_prepago;  
                            const descuentoCalculado = precio * (descuento / 100);  
                            const nuevoPrecio = precio - descuentoCalculado; 
                            precioAuto = nuevoPrecio 
                        }  
                    }
                    else{
                        
                        let cupon = this.pedido.cupon;
                        if(cupon === 'panamericano23'){
                            console.log('cupon Activo' + precioAuto)
                            const precio = this.pedido.carro.precio_thrifty;  
                            let descuento = 30;  
                            const descuentoCalculado = precio * (descuento / 100);  
                            const nuevoPrecio = precio - descuentoCalculado; 
                            precioAuto = nuevoPrecio  
                        }
                        else {
                            precioAuto = this.pedido.carro.precio_thrifty ; 
                        } 
                    }  
                    console.log(precioAuto)
                return precioAuto
            },
            precioCobertura(){ 
                let precioCobertura
                let tipoCarro = this.pedido.carro.tipo;
                if(tipoCarro !== 'Sedan'){
                    precioCobertura = this.pedido.cobertura.precio_2; 
                }
                else {
                    precioCobertura = this.pedido.cobertura.precio; 
                }
                return precioCobertura;
            }, 
            extrasSumados(){  
                let extrasSumados = 0;
                if (Array.isArray(this.pedido.extras)) {
                    for (const extra of this.pedido.extras) {
                    extrasSumados += extra.precio;
                    }
                }
                return extrasSumados;
            },
            subTotal() {

                let precioAuto = this.precioAuto();
                let tipoReserva = this.pedido.reserva;
                if(tipoReserva === 'prepago'){
                        
                    let cupon = this.pedido.cupon;
                    if(cupon === 'panamericano23'){
                        console.log('cupon Activo' + precioAuto)
                        const precio = this.pedido.carro.precio_thrifty;  
                        let descuento = 30;  
                        const descuentoCalculado = precio * (descuento / 100);  
                        const nuevoPrecio = precio - descuentoCalculado; 
                        precioAuto = nuevoPrecio 

                    }
                    else {
                        const precio = this.pedido.carro.precio_thrifty;  
                        let descuento = this.pedido.carro.descuento_prepago;  
                        const descuentoCalculado = precio * (descuento / 100);  
                        const nuevoPrecio = precio - descuentoCalculado; 
                        precioAuto = nuevoPrecio 
                    }  
                }
                else{
                    
                    let cupon = this.pedido.cupon;
                    if(cupon === 'panamericano23'){
                        console.log('cupon Activo' + precioAuto)
                        const precio = this.pedido.carro.precio_thrifty;  
                        let descuento = 30;  
                        const descuentoCalculado = precio * (descuento / 100);  
                        const nuevoPrecio = precio - descuentoCalculado; 
                        precioAuto = nuevoPrecio  
                    }
                    else {
                        precioAuto = this.pedido.carro.precio_thrifty ; 
                    } 
                }  

                let precioCobertura = this.precioCobertura();
 
                let precioDias = this.pedido.totalDeDias;  
                let precioEra = this.pedido.era; 
                let precioDelivery = this.pedido.delivery.precio; 
                let precioDropoff = this.pedido.dropoff;
  
                const preciosASumar = [];   

                let extrasSumados = this.extrasSumados(); 
                // const extrasSumados =  this.pedido.extras.reduce((acc: number, extra: any) => acc + extra.precio, 0);
 
                preciosASumar.push( precioAuto, precioEra, precioCobertura, extrasSumados); 
 
                // sumo todo en el array
                const suma = preciosASumar.map(element => element).reduce((a, b) => a + b, 0);

                const multiplicadoPorDias = suma * precioDias; 
                const unSoloFee = precioDropoff + precioDelivery;
                const unSoloMonto = multiplicadoPorDias + unSoloFee; 
                 
                const subTotal = unSoloMonto; 
                return subTotal; 
            },
            impuestoAeropuerto(){ 
                // impuesto sobre el subtotal pero no la cobertura ni wifi  
                const precioDias = this.pedido.totalDeDias;
                const extrasArray = this.pedido.extras;
                if (this.pedido.sucursal.impuesto > 0){  
                    let precioWifi = 0; 
                    if (Array.isArray(extrasArray)) {
                        // find the object with name property set to 'wifi'
                        const wifiObj = extrasArray.find(obj => obj.id === 5); 
                            if (wifiObj) {  
                            precioWifi =  wifiObj.precio; 
                            // console.log('mi lista tiene wifi este es el precio' + precioWifi ); 
                            } else {
                            // console.log('no contiene "wifi"');
                            } 
                        } 
                    else {
                            // console.log('no hay extras');
                    } 
                    let extrasSinWifi = this.extrasSumados() - precioWifi;
                    const eraSumado = this.pedido.era * precioDias;
                    const precioAutoSumado = this.precioAuto() * precioDias; 
                    const extrasSinWifiSumado = extrasSinWifi * precioDias; 

                    let cargasAplicablesSaf = precioAutoSumado + extrasSinWifiSumado + eraSumado; 
                    // console.log(    'precioAuto' + precioAutoSumado +
                    //                 'extras sumados?' +  this.extrasSumados() +
                    //                 'extrasSinWifi' + extrasSinWifi +
                    //                 'extrasSinWifiSumado' + extrasSinWifiSumado +
                    //                 'eraSumado' + eraSumado +
                    //                 'cargasAplicablesSaf' + cargasAplicablesSaf)   
                    let impuestoAeropuerto = this.pedido.sucursal.impuesto;    

                    const impuestoAeropuertoCalculado = cargasAplicablesSaf * (impuestoAeropuerto / 100);  
                    const impuestoAeropuertoADeber = +(impuestoAeropuertoCalculado.toFixed(2)); 

                    return  impuestoAeropuertoADeber  
                }
                else{
                    let impuestoAeropuertoADeber = 0;    
                    return impuestoAeropuertoADeber
                }
            }, 
            impuesto(){ 
                let subTotal = this.subTotal(); 
                let impuestoAeropuerto = this.impuestoAeropuerto();
 
                const nuevoSubtotal = subTotal + impuestoAeropuerto; 
                let impuesto = 7; 
                // Calculate tax due
                const impuestoCalculado = nuevoSubtotal * (impuesto / 100);  

                const impuestoADeber = +(impuestoCalculado.toFixed(2));
        
                // que siempre formatee como dolares 
                return  impuestoADeber  
            }, 
            total() {
                // cuando llamamos la funcion es store.total y el state es store.pedido.total
 
                let subTotal = this.subTotal();
                let impuestoAeropuerto = this.impuestoAeropuerto();
                let impuesto = this.impuesto();  
 
                const total = subTotal + impuestoAeropuerto + impuesto; 
 
                return new Intl.NumberFormat('en-US').format(total); 
            }   
        } 
    }   
)     