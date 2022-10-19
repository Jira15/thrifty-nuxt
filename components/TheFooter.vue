<template>
  <footer class="footer">
    <section>
      <!-- <router-link to="/"><img src="../assets/images/logo.png"/></router-link> --> 
      
      <p>
        <h3>Contacto</h3>
          Reservaciones: (507) 204-9555 <br /> 
          Asistencia 24 H: (507) 204-9550<br /> 
          Whatsapp: (507) 6678-5406
      </p> 

    </section>

  <section>
    <nav> 
      <p>
        <h3>Servicios</h3>
          <a href="#">Coberturas</a>
          <a href="#">Requisitos</a>
          <a href="#">Bolsa de Trabajo</a>
      </p> 
    </nav> 
  </section>

    <section> 
      <p>
        <h3>Soporte</h3>
        <a href="#">Politica de Reembolso</a>
        <a href="#">Términos y Condiciones</a>
        <a href="#">Política de Privacidad</a>
      </p> 
    </section> 

    <section class="sociales"> 
      <h3>Siguenos en</h3>
      <p>   

        <a href="#"><font-awesome-icon icon="fa-brands fa-instagram" /></a>
        <a href="#"><font-awesome-icon :icon="['fab', 'twitter']" class="icon alt"/></a>
        <a href="#"><font-awesome-icon icon="fa-brands fa-facebook" /></a>
      </p>  
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
    width: 300px;
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
.sociales a{  
  font-size: 30px;
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
