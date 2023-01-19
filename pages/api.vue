<script setup>

async function onSubmit() {  
    // await useFetch("/api/test")
    //     .then((res) => {
    //         console.log(res);
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //     }); 




    const bodyData = {
            'first_name': 'Prueba',
            'last_name': 'Usuario',
            'address1': '123 Main St',
            'city': 'New York',
            'state': 'NY',
            'zip' : '12345', 
            'shipping_first_name': 'User',
            'shipping_last_name': 'Test',
            'shipping_address1': '987 State St',
            'shipping_city': 'Los Angeles',
            'shipping_state': 'CA',
            'shipping_zip' : '98765', 
            'type': 'sale',
            'amount': '250.00',
            'ccnumber':'4111111111111111', 
            'ccexp':'1228',
            'cvv': '123'
            }  
    await useFetch( '/api/tarjeta', {
                method: 'POST',
                headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                params: {
                    'security_key': 'wjHj4Ku8wtTwH7s4v2W6Fx298A5Q56x4',
                    'first_name': 'Prueba',
                    'last_name': 'Usuario',
                    'address1': '123 Main St',
                    'city': 'New York',
                    'state': 'NY',
                    'zip' : '12345', 
                    'shipping_first_name': 'User',
                    'shipping_last_name': 'Test',
                    'shipping_address1': '987 State St',
                    'shipping_city': 'Los Angeles',
                    'shipping_state': 'CA',
                    'shipping_zip' : '98765', 
                    'type': 'sale',
                    'amount': '350.00',
                    'ccnumber':'4111111111111111', 
                    'ccexp':'1228',
                    'cvv': '123'
                },
                body: JSON.stringify( bodyData )
            } ).then(function (response) {
                    console.log(response);
                })   
    } 





</script>   

<template>
<main > 
    <div @click="onSubmit">Probar Api</div>
</main> 
</template>
<style lang="scss">

main {
    width: 200px;
    height: 200px;
    background-color: aquamarine;
    padding: 200px;
    margin: 0 auto;
}

</style>