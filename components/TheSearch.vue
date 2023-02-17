<script setup> 
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia' 
import { useSucursalStore } from '@/stores/sucursal'
import { defineRule, Form, Field, ErrorMessage, configure } from 'vee-validate';
import { ref, computed } from 'vue';


const date = ref(new Date());

const hoursArray = computed(() => {
  const arr = [];
  for (let i = 0; i < 24; i++) {
    arr.push({ text: i < 10 ? `0${i}` : i, value: i });
  }
  return arr;
});

const minutesArray = computed(() => {
  const arr = [];
  for (let i = 0; i < 60; i+=10) {
    arr.push({ text: i < 10 ? `0${i}` : i, value: i });
  }
  return arr;
}); 
const storeSearch = useSearchStore();

const storeSucursal = useSucursalStore(); 

const sucursales = computed(() => {
    return storeSucursal.sucursales
}) 
onMounted(() => {
    storeSucursal.fetchSucursales();   
    // storeSearch.options = sucursales;
}) 

function minimoDeDias(date, days){
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);

    return newDate;
};  

</script> 
<template>
    
<form  class="reservador" @submit="storeSearch.siguiente" >
    <article>
        <div class="sucursales">    
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
                <legend>sucursal de retorno</legend> 
                <label class="sucursal"> 
                    <select  v-model="storeSearch.sucursalRetorno"  name="sucursalRetorno" as="select"   rules="required" > 
                        <option disabled value="">Selecciona una sucursal</option>
                        <option v-for="option in  sucursales" :key="option" :value="option">
                            {{ option.name }}
                        </option> 
                    </select> 
                </label>  
            </section>  
        </div>   


                <!-- <date-picker
                    v-model="storeSearch.fechas"  
                    :minDate="new Date()"
                    range  
                    min-range="2" 
                    locale="es" 
                    name="diaRetiro"
                    rules="required"
                    class="dpicker"
                    format="yyyy/MM/dd"  
                    :enable-time-picker="false"
                    />   
                    <date-picker v-model="storeSearch.fechas" minutesIncrement="30" time-picker disable-time-range-validation range placeholder="Select Time" /> -->

                    <section class="fechas"> 
                        <div> 
                            <label>Fecha de Retiro</label>
                            <date-picker v-model="storeSearch.fechaRetiro"  :minDate="new Date()"  >
                                <template #time-picker="{ time, updateTime }">
                                    <div class="custom-time-picker-component">
                                    <select 
                                        class="select-input" 
                                        :value="time.hours"
                                        
                                        @change="updateTime(+$event.target.value)" >
                                        <option 
                                        v-for="h in hoursArray"
                                        :key="h.value" 
                                        :value="h.value">{{ h.text }}</option>
                                    </select>


                                    <select
                                        class="select-input"
                                        :value="time.minutes"
                                        @change="updateTime(+$event.target.value, false)" >
                                        <option 
                                        v-for="m in minutesArray"
                                        :key="m.value"
                                        :value="m.value">{{ m.text }}</option>
                                    </select>
                                    </div>
                                </template>
                            </date-picker> 
                        </div>
                        <div>
                            <label>Fecha de Retorno</label>
                            <date-picker v-model="storeSearch.fechaRetorno" :minDate="minimoDeDias(storeSearch.fechaRetiro, 3)">
                                <template #time-picker="{ time, updateTime }">
                                    <div class="custom-time-picker-component">
                                    <select 
                                        class="select-input" 
                                        :value="time.hours"
                                        @change="updateTime(+$event.target.value)" >
                                        <option 
                                        v-for="h in hoursArray"
                                        :key="h.value"
                                        :value="h.value">{{ h.text }}</option>
                                    </select>


                                    <select
                                        class="select-input"
                                        :value="time.minutes"
                                        @change="updateTime(+$event.target.value, false)"  >
                                        <option 
                                        v-for="m in minutesArray"
                                        :key="m.value"
                                        :value="m.value">{{ m.text }}</option>
                                    </select>
                                    </div>
                                </template>
                            </date-picker>
                        </div> 
        </section>  
        

        <div class="verificar-wrap">
            <button class="verificar"  type="submit" @click="submit">Buscar</button>   
        </div>  
            <!-- <ErrorMessage name="sucursal" >
                <p class="warn">Todos los Campos son requeridos</p> 
            </ErrorMessage>  --> 
    </article> 
</form>

</template> 
<style lang="scss">

.custom-time-picker-component {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .select-input {
    margin: 5px 3px;
    padding: 5px;
    width: 100px;
    border-radius: 4px;
    border-color: var(--dp-border-color);
    outline: none;
    -webkit-appearance: menulist;
  } 
  
.warn {
    font-size: 12px;
}
.dpicker {
    width: 100%;
}
.slot-icon {
    height: 12px;
    width: auto;
    padding-left: 5px;
}
.reservador {   
    background: linear-gradient(180deg, rgba(1, 45, 85, 1) 0%, rgba(0, 45, 80, 1) 30%, rgba(26, 77, 129, 1) 100%);
    padding:5px;
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
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    .hora {
        margin-left: 30px;
        width:150px
    }
}
.sucursales {
    width: 100%;
    h2 {
        font-size: 16px;
    }
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
    margin-top: 5px;
    align-self: end;
}  
.verificar-wrap{
    width: 100%;
    display: flex;
    flex-direction: column;
}
// Desktop  
@media screen and (min-width: 768px) { 
    .siguiente {    
        align-self: flex-end;
        margin-bottom: 10px;
    } 
    .reservador {      
        justify-content: space-around;  
        .sucursales {
            display: flex;
            justify-content: space-around; 
        }
        .fechas {  
            display: flex; 
            justify-content: space-between; 
            flex-direction: row;
            .dpicker{
            padding-right: 20px;
        }
            div { 
                display: flex;
                flex-direction: column;   
            }
            input {
                width: 272px;
                
            }
        }
        footer 
        {
            align-self: end;
        }
    }
} 
</style>