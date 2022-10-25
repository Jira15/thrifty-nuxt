<script>  
 
</script>

<template>
  <article class="carro" >
 
    <figure> 
 
            <img :src="'../assets/images/modelos/' + imagen + '.png'" :alt="imagenDescrip" />
 
    </figure> 
    <section>
      <header>
        <h2>
          <!-- {{ name }}   -->
        </h2>
        <!-- <h3>{{imagen}}</h3> -->
      </header>
      <dl class="specs">
        <div>
          <dt>
            <img src="../assets/images/pasajeros.png" alt="Pasajeros" />  
          </dt>
          <dd>5 Pasajeros</dd>
        </div>
          <div>
            <dt>
              <img src="../assets/images/doors.png" alt="Puertas" />
            </dt>
            <dd>5 Puertas</dd>
          </div>
          <div>
            <dt>
              <img src="../assets/images/luggage.png" alt="Maletas" />
            </dt>
            <dd>2 Maletas</dd>
          </div>
          <div>
            <dt>
              <img src="../assets/images/transmision.png" alt="Transmision" />
            </dt>
            <dd>Manual</dd>
          </div>
          <div>
            <dt>
              <img src="../assets/images/motor.png" alt="Motor" />
            </dt>
            <dd>1200cc</dd>
          </div>
          <div>
            <dt>
              <img src="../assets/images/fuel.png" alt="Gasolina" />
            </dt>
            <dd>Diesel</dd>
          </div>
          <div>
            <dt>
              <img src="../assets/images/ac.png" alt="ac" /> 
            </dt>
            <dd>A/C</dd>
          </div>
        </dl>
    </section>
      <footer>
        <p class="precio">
          <dl>
            <dt>Precio Total</dt>
            <dd>B/. {{ precioEstimado }}</dd>
            <dd>
              <a href="#">Reservar</a>
            </dd>
          </dl>
        </p>
      </footer>
    
  </article>
 
</template>
<style lang="scss">


.specs {  
  width: 100%; 
  justify-content: space-between; 
  align-items: end;  
  grid-area:info;
  dd {
    margin:5px; 
    font-size: 10px;
  }
  
}

.detalles-content { 
  max-width: 1100px;
  // height: 300px;
  border: gray 1px solid;
  display: flex; 
  background-color: white;
  padding: 10px; 
  box-shadow: 5px 5px 5px rgba(65, 65, 65, 0.308);
  grid-area: content; 
  margin-top: 20px;
  margin-bottom: 50px;

 
  
  h2 {
      font-size: 24px;
      margin-bottom: 20px; 
      font-weight: bold;
      margin-left:10px;
    }
    p{
      max-width: 100%; 
      text-align: justify;
      padding: 10px;
    }
  figure {
    min-height: 280px; 
  }
  i{
    font-style: italic;
    font-size: 1.5rem;
    color: #4a4a4a;
  }
  section{  
    padding: 5px; 
  }


  h2 {
    font-size: 2.5rem;
    margin: 0;
  }

  h3{
    margin-top: 0;
    font-size: 1.5rem;
  }

  section {
    width: 100%;
    font-size: 1rem;
  }

  dl {
    display: flex;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }

  dd {
    margin-left: 4px;
    margin-right: 20px;
    margin-bottom: 5px;
    
  }
  
  section img{
    max-width: 25px;
  }
  

  a  { 
    padding: 10px 20px;
    width: 140px;
    font-size: 1.1rem;
    line-height: 1.25;
    font-weight: 700;
    border: 1px solid #450a57;
    border-radius: 10px;
    background-color: #E1AA3E;
    color:rgb(252, 252, 252);
    text-transform: uppercase;
    margin-top: 10px;
  } 

  figure {
    width: 100%;
    height:100%; 
  }
  figure img {
    padding: 15px;
  }
  footer { 
  display: flex;
  flex-direction: column; 
  width: 50%;
  
  }
}

</style>