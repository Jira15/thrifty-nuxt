<script setup>   
</script>

<template>
    <article class="page-content">
        <img src="@/assets/images/leasing-banner.jpg"/>

            <h2>Leasing Operativo</h2>

            <p> 
                NUESTRO PLAN DE LEASING OPERATIVO, es un contrato por el cual usted pagará una cuota mensual, que le permite utilizar los vehículos solicitados sin preocuparse de otros costos asociados como los gastos de utilización, mantenimiento, riesgo y gestión operativa. La cuota mensual se calcula en base al modelo seleccionado, tiempo de la renta, cantidad y servicios contratados, liberando así recursos de la empresa y asegurando continuidad en la operación.
                <br />
                Thrifty Car Rental cuenta con un equipo de expertos listos para asesorarlos a la hora de la toma de decisiones y buscando la mejor opción que mejor se adapte a las necesidades de su empresa. En momentos de constante cambio, es en donde esta figura lo puede ayudar a una mejor estabilidad ya que no necesita un mínimo de autos y puede solicitarlo por periodos de 1 hasta 3 años garantizando así la operatividad de su empresa y siempre logrando cumplir con sus objetivos sin preocupaciones.
                <br />
                Consulte sobre su próximo Leasing Operativo con nosotros y uno de nuestros expertos se pondrá en contacto.

            </p>

    </article> 
</template>

<style scoped lang="scss">

.page-content { 
    display: flex;
    flex-direction: column;
    place-items: center;
    padding: 10px; 
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color:white;
    box-shadow: 5px 5px 5px rgba(65, 65, 65, 0.308);
    border-radius: 5px;
    h2 {
        margin: 20px;
        font-size: 28px;
        font-weight: bold;
    }
    p {
        padding: 20px;
        text-align: justify;  
        line-height: 1.5;
    }
}

// Desktop  
@media screen and (min-width: 768px) { 
    .page-content {
        max-width: 1000px; 
    }
}
</style>
