<script setup>

async function onSubmit() {  
    await useFetch("/api/")
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        }); 
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