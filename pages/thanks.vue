<script setup> 
import { Buffer } from 'buffer';
onMounted(() => { 

class DirectPost {
  constructor(security_key) {
    this.security_key = security_key;
  }

  setBilling(billingInformation) {
    // Validate that passed in information contains valid keys
    const validBillingKeys = ['first_name', 'last_name', 'company', 'address1',
        'address2', 'city', 'state', 'zip', 'country', 'phone', 'fax', 'email'];

    for (let key in billingInformation) {
      if (!validBillingKeys.includes(key)) {
        throw new Error(`Invalid key provided in billingInformation. '${key}'
            is not a valid billing parameter.`)
      }
    };

    this.billing = billingInformation;
  }

  setShipping(shippingInformation) {
    // Validate that passed in information contains valid keys
    const validShippingKeys = [
      'shipping_first_name', 'shipping_last_name', 'shipping_company',
      'shipping_address1', 'address2', 'shipping_city', 'shipping_state',
      'shipping_zip', 'shipping_country', 'shipping_email'
    ];

    for (let key in shippingInformation) {
      if (!validShippingKeys.includes(key)) {
        throw new Error(`Invalid key provided in shippingInformation. '${key}'
            is not a valid shipping parameter.`)
      }
    };

    this.shipping = shippingInformation;
  }

  doSale(amount, ccNum, ccExp, cvv) {
    let requestOptions = {
      'type': 'sale',
      'amount': amount,
      'ccnumber': ccNum,
      'ccexp': ccExp,
      'cvv': cvv
    };

    // Merge together all request options into one object
    Object.assign(requestOptions, this.billing, this.shipping);

    // Make request
    this._doRequest(requestOptions);
  }

  _doRequest(postData) {
    const hostName = 'secure.networkmerchants.com';
    const path = '/api/transact.php';

    postData.security_key = this.security_key;
    postData = JSON.stringify(postData);

    const options = {
      hostname: hostName,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    // Make request to Payment API
    const req = $fetch(options, (response) => {
      console.log(`STATUS: ${response.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

      response.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      response.on('end', () => {
        console.log('No more data in response.');
      });
    });

    // req.on('error', (e) => {
    //   console.error(`Problem with request: ${e.message}`);
    // });

    // // Write post data to request body
    // req.write(postData);
    // req.end();
    // req();
  }
}



//// do a sale



const dp = new DirectPost('wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4');
const billingInfo = {
  'first_name': 'Test',
  'last_name': 'User',
  'address1': '123 Main St',
  'city': 'New York',
  'state': 'NY',
  'zip' : '12345',
}
const shippingInfo = {
  'shipping_first_name': 'User',
  'shipping_last_name': 'Test',
  'shipping_address1': '987 State St',
  'shipping_city': 'Los Angeles',
  'shipping_state': 'CA',
  'shipping_zip' : '98765',
}

dp.setBilling(billingInfo);
dp.setShipping(shippingInfo);
// Set dummy data for sale
dp.doSale('100.00', '4111111111111111', '1221', '123');

})




</script> 
<template>
<main class="auto">  
    <h2>GRACIAS POR SU COMPRA</h2>
</main> 
</template>
<style scoped lang="scss">  
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
        button {
            background-color: #047EFF;
            padding: 5px 15px;
            border-radius: 5px; 
            text-transform: uppercase;
            font-size: 16px;
            font-weight: 600;
            color: white;    
            text-align: center;
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