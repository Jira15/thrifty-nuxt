<script setup>   
import { getAssetURL } from "@/utils/get-asset-url";
import { storeToRefs } from 'pinia' 
import { useActualizarStore } from '@/stores/actualizar'
import { usePedidoStore } from '@/stores/pedido';  
import moment from 'moment';  
 
const { getItemById } = useDirectusItems(); 
const storeActualizar = useActualizarStore();
const storePedido = usePedidoStore();
const route = useRoute()
const pedido = await  getItemById({
        collection: "pedidos", 
        id: route.params.id,
    });   
onMounted(() => {  
    storePedido.pedido = pedido;
}) 
const fechaFormat = function(value) {
    if (value) {
        return moment(value).format('DD MMM YYYY')
    }
}
const precioFormat = function(value) {
    if (value) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) 
    }
}


onMounted(() => {
    CollectJS.configure({
                    "paymentSelector" : "#demoPayButton",
                    "variant" : "inline",
                    "styleSniffer" : "false",
                    "googleFont": "Montserrat:400",
                    "customCss" : {
                        "color": "#0000ff",
                        "background-color": "#d0d0ff"
                    },
                    "invalidCss": {
                        "color": "white",
                        "background-color": "red"
                    },
                    "validCss": {
                        "color": "black",
                        "background-color": "#d0ffd0"
                    },
                    "placeholderCss": {
                        "color": "green",
                        "background-color": "#687C8D"
                    },
                    "focusCss": {
                        "color": "yellow",
                        "background-color": "#202020"
                    },
                    "fields": {
                        "ccnumber": {
                            "selector": "#demoCcnumber",
                            "title": "Card Number",
                            "placeholder": "0000 0000 0000 0000"
                        },
                        "ccexp": {
                            "selector": "#demoCcexp",
                            "title": "Card Expiration",
                            "placeholder": "00 / 00"
                        },
                        "cvv": {
                            "display": "show",
                            "selector": "#demoCvv",
                            "title": "CVV Code",
                            "placeholder": "***"
                        },
                        "checkaccount": {
                            "selector": "#demoCheckaccount",
                            "title": "Account Number",
                            "placeholder": "0000000000"
                        },
                        "checkaba": {
                            "selector": "#demoCheckaba",
                            "title": "Routing Number",
                            "placeholder": "000000000"
                        },
                        "checkname": {
                            "selector": "#demoCheckname",
                            "title": "Name on Checking Account",
                            "placeholder": "Customer McCustomerface"
                        },
                        "googlePay": {
                            "selector": ".googlePayButton",
                            "shippingAddressRequired": true,
                            "shippingAddressParameters": {
                                "phoneNumberRequired": true,
                                "allowedCountryCodes": ['US', 'CA']
                            },
                            "billingAddressRequired": true,
                            "billingAddressParameters": {
                                "phoneNumberRequired": true,
                                "format": "MIN"
                            },
                            'emailRequired': true,
                            "buttonType": "buy",
                            "buttonColor": "white",
                            "buttonLocale": "en"
                        },
                        'applePay' : {
                            'selector' : '.applePayButton',
                            'shippingMethods': [
                                {
                                    'label': 'Free Standard Shipping',
                                    'amount': '0.00',
                                    'detail': 'Arrives in 5-7 days',
                                    'identifier': 'standardShipping'
                                },
                                {
                                    'label': 'Express Shipping',
                                    'amount': '10.00',
                                    'detail': 'Arrives in 2-3 days',
                                    'identifier': 'expressShipping'
                                }
                            ],
                            'shippingType': 'delivery',
                            'requiredBillingContactFields': [
                                'postalAddress',
                                'name'
                            ],
                            'requiredShippingContactFields': [
                                'postalAddress',
                                'name'
                            ],
                            'contactFields': [
                                'phone',
                                'email'
                            ],
                            'contactFieldsMappedTo': 'shipping',
                            'lineItems': [
                                {
                                    'label': 'Foobar',
                                    'amount': '3.00'
                                },
                                {
                                    'label': 'Arbitrary Line Item #2',
                                    'amount': '1.00'
                                }
                            ],
                            'totalLabel': 'foobar',
                            'type': 'buy',
                            'style': {
                                'button-style': 'white-outline',
                                'height': '50px',
                                'border-radius': '0'
                            }
                        }
                    },
                    'price': '1.00',
                    'currency':'USD',
                    'country': 'US',
                    'validationCallback' : function(field, status, message) {
                        if (status) {
                            var message = field + " is now OK: " + message;
                        } else {
                            var message = field + " is now Invalid: " + message;
                        }
                        console.log(message);
                    },
                    "timeoutDuration" : 10000,
                    "timeoutCallback" : function () {
                        console.log("The tokenization didn't respond in the expected timeframe.  This could be due to an invalid or incomplete field or poor connectivity");
                    },
                    "fieldsAvailableCallback" : function () {
                        console.log("Collect.js loaded the fields onto the form");
                    },
                    'callback' : function(response) {
                        alert(response.token);
                        var input = document.createElement("input");
                        input.type = "hidden";
                        input.name = "payment_token";
                        input.value = response.token;
                        var form = document.getElementsByTagName("form")[0];
                        form.appendChild(input);
                        form.submit();
                    }
                }); 

}) 
</script> 
<template>  
    <article class="manage-pedido"> 
        <h2>
            Tu reserva:
        </h2>
            <section class="info-pedido">
                <header> 
                    <div> 
                        <h3>
                            {{ pedido.carro.marca }} 
                            {{ pedido.carro.modelo }}  
                        </h3>   
                        <em>o similar</em> 
                    </div> 
                    <figure> 
                        <img :src="getAssetURL(pedido.carro.imagen)"  loading="lazy" /> 
                    </figure> 
                </header>

                <section class="info-cliente"> 
                    <h6>Detalles:</h6>  
                        <dl>
                            <dt>
                                Nombre: 
                            </dt> 
                            <dd>
                                {{ pedido.nombre }} {{ pedido.apellido }}
                            </dd>
                        </dl> 
                        <dl>
                            <dt>
                                Correo: 
                            </dt> 
                            <dd>
                                {{ pedido.email }} 
                            </dd>
                        </dl> 
                        <dl>
                            <dt>
                                Telefono: 
                            </dt> 
                            <dd>
                                {{ pedido.telefono }}
                            </dd>
                        </dl> 
                        <dl>
                            <dt>
                                Licencia: 
                            </dt> 
                            <dd>
                                {{ pedido.licencia }}
                            </dd>
                        </dl> 
                        <h6>Modelo:</h6>
                        <dl>
                            <dt>
                                {{ pedido.carro.tipo }} 
                            </dt> 
                            <dd>
                                {{ precioFormat(pedido.carro.precio_thrifty) }} 
                            </dd>
                        </dl>
                </section> 

                <section class="info-sucursal">
                    <h6>Sucursal:</h6>
                    <dl>
                        <dt>
                            Retiro:<br/>{{ pedido.retiro }}
                        </dt> 
                        <dd>
                            Retorno: <br/>{{ pedido.retorno }} 
                        </dd>
                    </dl> 
                    <dl>
                        <dt>
                            Día de Retiro:
                        </dt> 
                        <dd>
                            {{ fechaFormat(pedido.fecha_retiro) }}   {{  pedido.hora_retiro  }}
                        </dd>
                    </dl> 
                    <dl>
                        <dt>
                            Día de Retorno: 
                        </dt> 
                        <dd>
                            {{ fechaFormat(pedido.fecha_retorno) }}  {{  pedido.hora_retorno   }}
                        </dd>
                    </dl>   
                    <dl v-if="(precioDropoff > 0)">
                        <dt>
                            Drop-off 
                        </dt> 
                        <dd>
                            {{ precioFormat(precioDropoff) }}
                        </dd>
                    </dl>
                

                </section> 
           
        <section class="info-coberturas">
            <h6>Coberturas:</h6> 
            <dl>
                <dt> 
                    {{ pedido.cobertura.nombre }} 
                </dt> 
                <dd>
                    {{ precioFormat(pedido.cobertura.precio)}} 
                </dd> 
            </dl> 
            <dl >
                <dt> 
                    Asistencia Vial(ERA)
                </dt> 
                <dd>
                    {{ precioFormat(pedido.era) }} 
                </dd> 
            </dl> 
    
            <h6>Extras:</h6> 
            <dl v-if="pedido.extras" class="extras">
                <div v-for="extra in pedido.extras">
                    <dt>
                        {{ extra.nombre }}
                    </dt>  
                    <dd>
                        {{ precioFormat(extra.precio) }} 
                    </dd> 
                </div>
            </dl> 
        </section> 
        <footer>
            <h6>Sub-Total:  </h6> 

            <dl>
                <dt> 
                </dt>
                <dd >
                    B/.  {{ pedido.total }} 
                </dd> 
            </dl>   
          {{ pedido.status }} 
            <div class="status" v-if="pedido.status === 'Pagado'"> 
                <h4>Esta reserva ya esta paga</h4>
            </div>
            <div class="status"  v-if="pedido.status === 'Cancelado'"> 
                <h4>El Pedido ha sido cancelado</h4>
            </div> 

            <section class="metodos" v-if="pedido.status === 'Pendiente de Pago'">   
                    <section class="tarjeta">  
                            <p>
                                <label>CC Number</label>  
                                <div id="demoCcnumber"></div> 
                            </p>  
                            <p>
                                <label>CVV Collect</label>  
                                <div id="demoCvv"></div> 
                            </p> 
                            <p>
                                <label>MM/YY</label> 
                                <div id="demoCcexp"></div>
                            </p>   
                         <button type="submit" @click="storeActualizar.onSubmit">Pagar</button>
                    </section> 
                <div id="paypal-button">
                </div>
            </section> 

            <div class="status" v-if="pedido.status === 'Pendiente de Pago'"> 
                <button type="submit" @click="storeActualizar.onCancelar">Cancelar Reserva</button>  
            </div>
        </footer> 
    </section> 
 
 
    <!-- Botones de Pago -->
</article> 
</template>

<style scoped lang="scss">

.manage-pedido { 
    display: flex;
    flex-direction: column; 
    padding: 10px; 
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color:white;
    box-shadow: 5px 5px 5px rgba(65, 65, 65, 0.308);
    border-radius: 5px; 
    line-height: 20px;    
    h2 {
        margin: 20px;
        font-size: 28px;
        font-weight: bold;
    }
    h3 {
        font-weight: bold;
        font-size: 22px;
        margin-bottom: 20px;
    }

    img {
        object-fit: cover;
        width: 100%;
        height: 250px;
        border-radius: 5px;
    }

    .info-pedido {
        display: flex;
        flex-direction: column; 
        line-height: 1.5;
        h6 {
            font-weight:bold;
            background-color: #cde4ff;
        }
        dl {
            display: flex;
            justify-content: space-between;
            background-color: #f8fbff; 
        }
        header { 
            display: flex;
            text-align: center;
            margin-bottom: 10px;
            align-items: center;
        }
        h3 {
            font-weight: bold;
            font-size: 34px;  
            width: 100%; 
        } 
        em {
            font-size: 24px;
            color: gray;
            font-style: italic; 
        }
        p {  
            font-size: 15px; 
            padding: 3px; 
        }  
        img {
            object-fit:contain;
            width: 100%;
            height: 160px;
            padding: 5px;
            border-radius: 5px;
        }
        .extras { 
            flex-direction: column; 
            div {
                display: flex;
                justify-content: space-between;
            }
        }
        button {
            background-color: #047EFF;
            padding: 5px 15px;
            border-radius: 5px; 
            text-transform: uppercase;
            font-size: 16px;
            font-weight: 600;
            color: white;   
            width: 100%;
            text-align: center;
        }
    }

    .metodos {
        margin-top: 10px; 
        button {
            background-color: #047EFF;
            padding: 5px 15px;
            border-radius: 5px; 
            text-transform: uppercase;
            font-size: 16px;
            font-weight: 600;
            color: white;   
            width: 100%;
            text-align: center;
            margin-top: 10px;
            margin-bottom: 40px;
        }
    }

}  
// Desktop  
@media screen and (min-width: 768px) { 

    .manage-pedido { 
        display: flex;
        flex-direction: column;  
        margin: auto; 
        max-width: 1000px;
        h2 {
            margin: 20px;
            font-size: 28px;
            font-weight: bold;
        }
        h3 {
            font-weight: bold;
            font-size: 24px;
            margin-bottom:0px;
        } 
        .info-pedido {
            display: flex;
            flex-direction: column; 
            line-height: 1.5;
            h6 {
                font-weight:bold;
                background-color: #cde4ff;
            }
            dl {
                display: flex;
                justify-content: space-between;
                background-color: #f8fbff; 
            }
            header { 
                display:contents; 
                margin-bottom: 0px; 
                div { 
                    justify-content: space-around;
                }
            }
            h3 {
                font-weight: bold;
                font-size: 34px;   
            } 
            em {
                font-size: 24px;
                color: gray;
                font-style: italic; 
            }
            p {  
                font-size: 15px; 
                padding: 3px; 
            }  
            img {
                object-fit:contain;
                width: 100%;
                height: 260px;
                padding: 5px;
                border-radius: 5px;
            }
            .extras { 
                flex-direction: column; 
                div {
                    display: flex;
                    justify-content: space-between;
                }
            }
            button {
                background-color: #047EFF;
                padding: 5px 15px;
                border-radius: 5px; 
                text-transform: uppercase;
                font-size: 16px;
                font-weight: 600;
                color: white;   
                width: 100%;
                text-align: center;
            }
        }
    
        .metodos {
            margin-top: 40px; 
            display: flex;
            width: 100%; 
            justify-content: space-around; 
        }
    
    }  
}
</style>
