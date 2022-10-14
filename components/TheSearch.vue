<script>   
import moment from 'moment';
export default { 
    setup() {
        const router = useRouter()

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
        
        return {
            time,
            startTime 
        }
    },
    data() {
        return { 
            sucursal: 'Seleccione',
            sucursalRetorno: '',
            modelo:'',
            diaRetiro: null,
            diaRetorno: null,
            horaRetiro: null,
            horaRetorno: null,
            tiempoRetiro: null,
            tiempoRetorno: null,
            carroObjetoArray: [], 
            sucursal: 'Seleccione', 
            sucursales: '',
            options: [
                { value: 'TH TORRE', label: 'Torremolinos (Tocumen)', region: 'Panamá'}, 
                { value: 'TDAVIDC', label: 'David Centro', region: 'Chiriquí'}  
            ],  
        }
    },
    methods:{
        ChangeD(retiroAFechaCorta)
        {
            this.diaRetiro=moment(retiroAFechaCorta).format('YYYY-MM-DD'); 
        },
        ChangeR(retornoAFechaCorta)
        { 
            this.diaRetorno=moment(retornoAFechaCorta).format('YYYY-MM-DD');
        },
        ChangeH()
        { 
            this.tiempoRetiro = this.horaRetiro.hours + ':' + this.horaRetiro.minutes; 
        },
        ChangeT()
        {  
            this.tiempoRetorno = this.horaRetorno.hours + ':' + this.horaRetorno.minutes;
        }
    }, 

}

</script>   
<template>
<form class="reservador" @submit.prevent="submit">
    <header>
        <h2>
            Haz tu reserva
        </h2>
    </header>
    <article>
        <div class="retiro">
            <section>
                <legend>sucursal de retiro</legend> 
                <label class="sucursal">
                    <select v-model="sucursal"> 
                        <option disabled value="">{{ sucursal }}</option>
                        <option v-for="option in options" :value="option.value"  >
                            {{ option.label }}
                        </option>
                    </select> 
                </label>
            </section> 

            <section>
                <legend>Día de retiro</legend> 
                    <fieldset class="fechas">  
                    <date-picker
                        v-model="diaRetiro"  
                        :minDate="new Date()"
                        :enableTimePicker="false"
                        locale="es"
                        @update:modelValue="ChangeD(date)"
                        /> 
    
                    <date-picker 
                        class="hora"
                        v-model="horaRetiro"
                        :startTime="startTime"
                        timePicker
                        minutesIncrement="30"  
                        @update:modelValue="ChangeH()" 
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
                    <select v-model="sucursalRetorno" > 
                        <option disabled value="">{{ sucursales }}</option>
                        <option v-for="option in options" :value="option.value"  >
                            {{ option.label }}
                        </option>
                    </select> 
                </label>
            </section>
            
            <section> 
                <legend>Día de retorno</legend>  
                <fieldset class="fechas">
                    <date-picker
                        v-model="diaRetorno" 
                        :minDate="diaRetiro"
                        :enableTimePicker="false"
                        locale="es"
                        @update:modelValue="ChangeR(date)"
                        /> 
                    
                    <date-picker
                        class="hora"
                        v-model="horaRetorno"
                        :startTime="startTime"
                        timePicker
                        minutesIncrement="30"  
                        @update:modelValue="ChangeT()" 
                        >
                        <template  #input-icon> 
                            <img class="slot-icon"  src="@/assets/images/clock.png"/> 
                        </template>
                    </date-picker> 
                </fieldset> 
            </section> 
        </div>
        <div class="siguiente"> 
            <NuxtLink class="verificar" 
            :to="'/search/' +
                sucursal +
                '/' +
                sucursalRetorno +
                '/' +
                diaRetiro + tiempoRetiro +
                '/' +
                diaRetorno + tiempoRetorno +
                '/'">
                Siguiente
            </NuxtLink>  
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