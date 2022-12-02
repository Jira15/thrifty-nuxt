<script setup> 
import { useSearchStore } from '@/stores/search'
import { usePedidoStore } from '@/stores/pedido';
import { storeToRefs } from 'pinia' 
import moment from 'moment';
const storeSearch = useSearchStore();
 
const storePedido = usePedidoStore();

function tiempoMinimoAntesDeReserva(date, hours){
        const newDate = new Date(date);
        newDate.setHours(newDate.getHours() + hours);
        return newDate;
    }; 

const time = ref({ 
    hours: new Date().getHours(),
    minutes: new Date().getMinutes() 
});

const date = new Date();
const tiempoMinimo = tiempoMinimoAntesDeReserva(date, 1); 
const startTime = ref({ hours: tiempoMinimo.getHours(), minutes: 0 });


const fechaFormat = function(value) {
  if (value) {
    return moment(value).format('DD MMM')
  }
}

const horaFormat = function(value) {
  if (value) {
    return moment(value).format('hh:mm A')
  }
}

</script> 
<template> 

<aside class="progreso"> 
    <div>
        <section class="retiro"> 
            <h3> {{ storeSearch.sucursal.name }}</h3>  
            <p>   
                {{ fechaFormat(storeSearch.diaRetiro) }}<br /> 
                {{ horaFormat(storeSearch.horaRetiro) }}  
            </p>  
        </section>   
        <section  class="retorno">
            <h3>{{ storeSearch.sucursalRetorno.name }}</h3> 
            <p>  
                {{ fechaFormat(storeSearch.diaRetorno) }}<br /> 
                {{ horaFormat(storeSearch.horaRetorno) }} 
            </p>  
        </section> 
    </div>
    <div class="siguiente"> 
        <!-- <button type="submit">Buscar</button> -->
        <NuxtLink  
        to="/reserva/"  @click="submit">
            Cambiar
        </NuxtLink> 
    </div>
</aside>   

</template> 
<style lang="scss"> 
.progreso {   
background: linear-gradient(180deg, rgba(1, 45, 85, 1) 0%, rgba(0, 45, 80, 1) 30%, rgba(26, 77, 129, 1) 100%);
padding: 15px;
box-sizing: border-box;     
display:flex; 
text-transform: uppercase; 
color: white; 
    h3 {
        font-size: 15px;  
        padding: 0.2rem;
    } 
    div {
        display: flex;
        section {
            flex: 1; 
        }
        p {
            font-size: 18px;
            
            font-weight: bold;  
        }
    }
    a {
        padding: 10px;  
        font-weight: bold;
        font-size: 14px;
        background: rgb(3, 101, 199) ;
        color: white;
        border-radius:10px;
        align-self: flex-end; 
    }
}   
.siguiente { 
padding: 8px; 
}    

// Desktop  
@media screen and (min-width: 768px) { 
 
.progreso{     
    width:1000px; 
    background-color: aqua;
    } 
} 
</style>