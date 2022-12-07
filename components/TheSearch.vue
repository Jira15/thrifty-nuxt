<script setup> 
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia' 
import { useSucursalStore } from '@/stores/sucursal'
import { defineRule, Form, Field, ErrorMessage, configure } from 'vee-validate';
 
const storeSearch = useSearchStore();

const storeSucursal = useSucursalStore(); 

const sucursales = computed(() => {
    return storeSucursal.sucursales
})

 
onMounted(() => {
    storeSucursal.fetchSucursales();   
    // storeSearch.options = sucursales;
})
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
 

</script> 
<template>
    
<form  class="reservador" @submit="storeSearch.siguiente" >   
    <article>
        <div class="retiro">
            <section>
                <legend>sucursal de retiro</legend> 
                <label class="sucursal">
                    <select  v-model="storeSearch.sucursal"  name="sucursal" as="select" rules="required" > 
                        <option disabled value="">Selecciona una sucursal</option>
                        <option v-for="option in sucursales" :key="option" :value="option">
                            {{ option.name }}
                        </option> 
                    </select> 
                </label>    
            </section>    
            <section>
                <legend>Día de retiro</legend> 
                    <fieldset class="fechas">  
                    <date-picker
                        v-model="storeSearch.diaRetiro"  
                        :minDate="new Date()"
                        :enableTimePicker="false"
                        locale="es" 
                        name="diaRetiro"
                        rules="required"  
                        />   
                    <date-picker 
                        class="hora"
                        v-model="storeSearch.horaRetiro"
                        :startTime="startTime"
                        timePicker
                        minutesIncrement="30"    
                        name="horaRetiro" 
                        >
                        <template  #input-icon> 
                            <img class="slot-icon"  src="@/assets/images/clock.png"/> 
                        </template>
                    </date-picker>  
                </fieldset>  
            </section>  
        </div> 
        <div class="retorno">  
            <section>
                <legend>sucursal de retorno</legend> 
                <label class="sucursales">
                    <select  v-model="storeSearch.sucursalRetorno"  name="sucursalRetorno" as="select"   rules="required" > 
                        <option disabled value="">Selecciona una sucursal</option>
                        <option v-for="option in  sucursales" :key="option" :value="option">
                            {{ option.name }}
                        </option> 
                    </select> 
                </label>  
            </section> 
            
            <section> 
                <legend>Día de retorno</legend>  
                <fieldset class="fechas">
                    <date-picker
                        v-model="storeSearch.diaRetorno" 
                        :minDate="storeSearch.diaRetiro"
                        :enableTimePicker="false"
                        locale="es" 
                        rules="required"
                        />  
                    <date-picker
                        class="hora"
                        v-model="storeSearch.horaRetorno"
                        :startTime="startTime"
                        timePicker
                        minutesIncrement="30"  
                        name="horaRetorno"
                        rules="required"
                        > 
                        <template  #input-icon> 
                            <img class="slot-icon"  src="@/assets/images/clock.png"/> 
                        </template>
                    </date-picker>  
                </fieldset> 
            </section> 
        </div>
        <div class="siguiente">  
            <!-- <NuxtLink  @click="storeSearch.searchIs = 'ThePrompt'">Esconder</NuxtLink> 
            <br/><br/><br/><br/> -->
            <button class="verificar"  type="submit" @click="submit">Buscar</button> 

            <ErrorMessage name="sucursal" >
                <p>Todos los Campos son requeridos</p> 
              </ErrorMessage>

        </div>
    </article>  
</form>

</template> 
<style lang="scss">
.slot-icon {
    height: 12px;
    width: auto;
    padding-left: 5px;
}
.reservador {   
    background: linear-gradient(180deg, rgba(1, 45, 85, 1) 0%, rgba(0, 45, 80, 1) 30%, rgba(26, 77, 129, 1) 100%);
    padding: 15px;
    box-sizing: border-box;  
    border-radius: 8px;  
    width: 100%;    
    display:flex; 
    flex-direction: column; 
    text-transform: uppercase; 
    color: white;
    align-items: center;
    h2 {
        font-size: 20px; 
        font-weight: bold;
        padding: 0.2rem;
    } 
    legend {
        font-size: 14px;
        font-weight: bold; 
    } 
    
    section {
        padding: 0.5rem;
        font-weight: bold;
        font-size: 14px;  
    } 
    select { 
        width: 100%;
        height: 40px;
    }   
}  
.fechas{
    display: flex;
    justify-content: space-between;
    
    .hora {
        margin-left: 30px;
        width:150px
    }
}

.sucursales h2 {
    font-size: 16px;
}

.siguiente { 
    padding: 8px; 
}  

.verificar { 
    padding: 10px;  
    font-weight: bold;
    font-size: 14px;
    background: rgb(3, 101, 199) ;
    color: white;
    border-radius:10px;
    align-self: flex-end; 
}  

// Desktop  
@media screen and (min-width: 768px) { 
    .siguiente {    
        align-self: flex-end;
        margin-bottom: 10px;
    } 
    .reservador {    
        display: flex;  
        margin-top: -5px;  
        width: 100%;
        article {
            display:flex;
            width: 100%;
            justify-content: center;
        }
        footer 
        {
            align-self: end;
        }
    }
} 
</style>