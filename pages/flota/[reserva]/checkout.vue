<script setup>    
import { getAssetURL } from "@/utils/get-asset-url";
import { usePedidoStore } from '@/stores/pedido';
import { useCheckoutStore } from '@/stores/checkout';
import { usePaypalStore } from '@/stores/paypal';
import { Form, Field, ErrorMessage } from 'vee-validate';  

const storePaypal = usePaypalStore(); 
const storePedido = usePedidoStore(); 
const storeCheckout = useCheckoutStore();

const pedido = computed(() => {
    return storePedido.pedido
})   
 
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
<main class="auto">  
 
    <article> 
        <CarroSeleccionado /> 
        <Desglose />  

    </article> 
    <section class="detalles-conductor"> 
        <h3>Finaliza tu reserva</h3>
        <Form @submit="storeCheckout.onSubmit">
            <p>
                <label for="nombre">Nombre</label>
                <Field v-model="pedido.cliente.nombre" type="text" id="nombre" name="nombre" rules="required" placeholder="Nombre" />  
                <ErrorMessage name="nombre"  class="warning">
                    <p>Todos los Campos son requeridos</p> 
                  </ErrorMessage>
            </p> 
            <p>
                <label for="apellido">Apellido</label>
                <Field v-model="pedido.cliente.apellido"  type="text" id="apellido" name="apellido" rules="required"   placeholder="Apellido"/> 
                <ErrorMessage name="apellido" /> 
            </p>  
            <p>
                <label for="telefono">Teléfono</label>
                <Field  v-model="pedido.cliente.telefono"  type="text" id="telefono" name="telefono"   placeholder="Teléfono"/> 
            </p>  
            <p>
                <label for="email">Dirección de correo electrónico</label>
                <Field   v-model="pedido.cliente.email"  type="text" id="email" name="email" rules="required"   placeholder="Correo" /> 
                <ErrorMessage name="email" />
        
            </p>  
            <p>
                <label for="licencia">Licencia</label>
                <Field  v-model="pedido.cliente.licencia"  type="text" id="licencia" name="licencia" rules="required"  placeholder="Licencia" /> 
                <ErrorMessage name="licencia" />
        
            </p>  
            <p>
                <label for="nacimiento">Fecha de Nacimiento</label> 
                <date-picker  :enableTimePicker="false" v-model="pedido.cliente.nacimiento"
                locale="es" name="nacimiento" rules="required" id="nacimiento" />  
            </p> 
            <div class="reserva" v-if="storePedido.pedido.reserva === 'reserva'"> 
                <button type="submit">Submit</button>
            </div>
            <section class="pagos"  v-if="storePedido.pedido.reserva === 'prepago'"> 
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

                            <button type="submit">Submit</button>
                        <!-- <button id="payButton" type="submit">Submit Payment</button> --> 
                    </section>  

                <div id="paypal-button">
                </div> 
            </section> 
        </Form>  
    </section> 
</main> 
</template>
<style scoped lang="scss">  

.warning{
    font-size: 12px;
    font-weight: bold;
}


  /* autos flota id */ 

.auto {  
    article {
        background-color: white;
        border-radius: 5px; 
        padding: 5px;
        display: flex;
        flex-direction: column;
        min-width: 350px; 
        margin:5px; 
        
    }
    h2 {
        font-weight: bold;
        font-size: 32px; 
        margin-top: 20px;
        margin: 10px;
        width: 100%; 
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
    footer {
        text-align: center;
        justify-content: space-between; 
        display: flex;
        width: 100%;
        h4 {
        font-size: 40px;
        font-weight:bold;
        } 
        em {
        font-size: 24px;
        color: rgb(3, 3, 3);
        font-style:normal;
        } 

    }
    .specs {
        display: none;    
        padding: 5px; 
        div {
            text-align: center; 
            text-transform:capitalize;
            width: 50px; 
        }
        dl {
            display: flex;
            font-size: 12px;
            font-weight: bold;
        }
        dd {  
            font-size: 12px; 
        } 
        dt {
            object-fit:contain;
        } 
        img{ 
            max-width:  15px;  
        } 
    }
    .detalles-conductor{
        background-color:white;
        border-radius: 5px; 
        padding: 5px; 
        min-width: 350px; 
        margin:5px;
        line-height: 1.5;
            form {
                margin-bottom: 10px; 
            p { 
                display: flex; 
                flex-direction: column;
                justify-content: space-between; 
            } 
            button {
                background-color: #047EFF;
                padding: 5px 15px;
                border-radius: 5px; 
                text-transform: uppercase;
                font-size: 16px;
                font-weight: 600;
                color: white;    
                text-align: center;
                cursor:pointer;
            } 
        }
    }
}   
// Desktop  
@media screen and (min-width: 768px) { 
    .auto {
        display: flex;
        .detalles-conductor{
            background-color: white;
            border-radius: 5px; 
            padding: 5px; 
            width: 100%; 
            margin:5px;
            line-height: 1.5;
            
            form {
                input {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 3px;
                    margin-left: 20px;
                    width: 100%;
                    box-sizing: border-box;
                    background-color: rgb(245, 245, 245);
                }
                margin-bottom: 10px; 
                p { 
                    font-size: 18px;
                    max-width: 500px;
                    display: flex; 
                    flex-direction: column;
                    justify-content: space-between; 
                }
            }
        }
        
        article {
            background-color: white;
            border-radius: 5px; 
            padding: 5px;
            display: flex;
            flex-direction: column;
            min-width: 400px; 
            margin:10px; 
            // justify-content: space-around;
        }
        header { 
            display: flex;
            flex-direction: column;  
        } 
        img {
            object-fit:contain;
            width: 100%;
            height: 400px;
            padding: 5px;
            border-radius: 5px; 
        } //650 x 411
        .specs { 
            display:flex;
            flex-wrap: wrap; 
            div {
                text-align: center; 
                text-transform:capitalize;
                width: 90px; 
                margin-top: 3px;
            }
            dl {
                display: flex;
                font-size: 14px;
                font-weight: bold;
            }
            dd {  
                font-size: 12px; 
            } 
            dt {
                object-fit:contain;
            } 
            img{ 
                max-width: 25px;
                max-height: 25px;
                object-fit:contain; 
                padding: 2px;  
            }  
        }
    } 
}
</style> 