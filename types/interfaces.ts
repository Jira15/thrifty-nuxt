export interface Pedido {  
    nombre: StringConstructor;
    apellido: StringConstructor;
    email: StringConstructor,
    telefono: StringConstructor,
    licencia: StringConstructor,
    nacimiento: DateConstructor,
    retiro: StringConstructor,
    fecha_retiro: DateConstructor,  
    retorno: StringConstructor,
    fecha_retorno: DateConstructor, 
    carro: object,
    cobertura: object,
    extras: string,
    dropoff: string,
    sucursal_detail: object,
    sucursal_retorno_detail: object,
    total: string
}  