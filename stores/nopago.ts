import { defineStore } from 'pinia' 
import { useForm } from 'vee-validate';
import * as Yup from 'yup'; 
import { usePedidoStore } from '@/stores/pedido';    

const checkoutSchema = Yup.object({ 
    nombre: Yup.string().required(),
    apellido: Yup.string().required(),
    // email: Yup.string().required(),
    // telefono: Yup.string().required(),
    // licencia: Yup.string().required(),
    // nacimiento: Yup.string().required(),
}); 

export const useNoPagoStore = defineStore('nopago',  () => { 
 
    const { createItems } = useDirectusItems(); 
    const storePedido = usePedidoStore();
    const totalPedido = storePedido.total();  
    const horaRetiro = storePedido.pedido.horaRetiro; 
    const horaRetiroString = horaRetiro.hours.toString() + ':' + horaRetiro.minutes.toString();  
    const horaRetorno = storePedido.pedido.horaRetorno;
    const horaRetornoString = horaRetorno.hours.toString() + ':' + horaRetorno.minutes.toString(); 
    console.log(totalPedido);   

    const router = useRouter()

    const { errors, useFieldModel, handleSubmit, values } = useForm({
        validationSchema: checkoutSchema,
    });

    const [
        nombre,
        apellido,
        email,
        telefono,
        licencia,
        nacimiento
        ] = useFieldModel([
        'nombre',
        'apellido',
        'email',
        'telefono',
        'licencia',
        'nacimiento'
        ]);

    interface Pedido { 
        nombre: StringConstructor;
        apellido: StringConstructor;
        email: StringConstructor,
        telefono: StringConstructor,
        licencia: StringConstructor,
        nacimiento: DateConstructor,
        retiro: StringConstructor,
        fecha_retiro: DateConstructor, 
        hora_retiro: string,
        retorno: StringConstructor,
        fecha_retorno: DateConstructor,
        hora_retorno: string,
        carro: StringConstructor,
        cobertura: StringConstructor,
        extras: string,
        total: string
    } 

    function onSubmit(values) {
      // Submit values to API...
      alert(JSON.stringify(values, null, 2));
      console.log('Submit', JSON.stringify(values, null, 2));
      console.log("Values", values); 


      try {

            var items: Pedido[] = [
                {
                    nombre: values.nombre,
                    apellido: values.apellido, 
                    email: values.email,
                    telefono: values.telefono, 
                    licencia: values.licencia,
                    nacimiento:  values.nacimiento,
                    retiro: storePedido.pedido.sucursal.name,
                    fecha_retiro: storePedido.pedido.diaRetiro,
                    hora_retiro:  horaRetiroString,
                    retorno: storePedido.pedido.sucursalRetorno.name,
                    fecha_retorno: storePedido.pedido.diaRetorno,
                    hora_retorno: horaRetornoString,
                    carro: storePedido.pedido.carro.modelo,
                    cobertura:storePedido.pedido.cobertura.nombre,
                    extras: JSON.stringify(storePedido.pedido.extras), 
                    total: totalPedido
                } 
            ]; 
            createItems<Pedido>({ collection: "pedidos", items });
            router.push('/thanks/'); 

            } catch (e) { 
              console.log('error'); 
            } 


    }
    
 
      
    return {
        errors,
        nombre,
        apellido,
        email,
        telefono,
        licencia,
        nacimiento, 
        onSubmit
    };
});   