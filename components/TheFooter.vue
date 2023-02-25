<template>
  <footer class="footer">
    <section>
      <!-- <router-link to="/"><img src="../assets/images/logo.png"/></router-link> --> 
      <h3>Contacto</h3>
      <p> 
          Reservaciones: (507) 204-9555 <br /> 
          Asistencia 24 H: (507) 204-9550<br /> 
          Whatsapp: (507) 6678-5406
      </p> 

    </section>

  <section>
    <nav> 
      
      <h3>Servicios</h3>
      <p>
          <NuxtLink to="/paginas/coberturas">Coberturas</NuxtLink>
          <NuxtLink to="/paginas/requisitos">Requisitos</NuxtLink>
          <NuxtLink to="/paginas/trabajo">Bolsa de Trabajo</NuxtLink>
      </p> 
    </nav> 
  </section>

    <section> 
      <h3>Soporte</h3>
      <p>
     
        <NuxtLink to="/paginas/reembolso">Politica de Reembolso</NuxtLink>
        <NuxtLink to="/paginas/tyc">Términos y Condiciones</NuxtLink>
        <NuxtLink to="/paginas/privacidad">Política de Privacidad</NuxtLink>
      </p> 
    </section> 

    <section class="sociales"> 
      <h3>Siguenos en</h3> 
      <ClientOnly>
        <p>
 
        </p>  
      </ClientOnly>
    </section>

    <p class="copyright">Copyright © 2022 Thrifty Panamá</p>

  </footer>
</template>

<style lang="scss" scoped> 
.footer {
  width: 100%;
  background-color: #001e36; 
  display: flex;
  flex-direction: column;
  color: white;  
  min-height: 300px;
  line-height: 1.3;  
  text-align: left; 
  padding:50px; 
  justify-content: space-between;
  h3 {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;

  } 
  nav { 
    display: flex;
    flex-direction: column;   
  }
  p { 
    font-family: sans-serif; 
 
    display: flex;
    flex-direction: column;
  }
  a {
    margin-bottom: 5px;
    margin-right: 5px;
    font-size: 14px;
  } 
  a:hover {
    color:#0693e3; 
  } 
  section {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    margin-right: 20px;
  } 
} 
.copyright {
 
  font-size: 12px;
}
.sociales { 
  font-size: 30px;
}
.sociales p { 
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

// Desktop  
@media screen and (min-width: 768px) { 
  .footer { 
      display: flex;
      flex-direction:row; 
      min-height: 300px; 
  }
  .copyright { 
    position: absolute;
    align-self: end;
  }
}
</style>
