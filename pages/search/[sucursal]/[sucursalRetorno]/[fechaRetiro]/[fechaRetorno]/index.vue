<script setup>
  
  const route = useRoute()
      
</script>
<template>
    <h2> ESTOY EN FECHA RETORNO {{ route.params.fechaRetorno }} </h2>
    <h1> {{ route.params }}</h1> 
</template>