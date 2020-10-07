<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MapaInmobiliario.net - Registro de usuario</title>


<meta name="description" content=" Registro de usuario para agragar propiedades a nuestra guia de bienes raices , te invitamos a unirte."/> 

        <meta name="keywords" content="Bienes raices  Latinoam&#233;rica , real state  Latinoam&#233;rica , propiedades compra y venta, mapa propiedades , guia bienes raices" />

 	<?php
	require_once('plantilla/carga_js_css.php');
	?> 
    <script src="js/customFunctions.js" type="text/javascript"></script>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-32431769-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>    
    

</head>

<body>
<header>
</header> 
    
<nav id="menuNavTop"> 
</nav>



<div class="row-fluid">
		<div class="container">
		
			<!--<div class="row-fluid bordes">
				<div class="span1 bordes">1</div>
				<div class="span1 bordes">1</div>
				<div class="span1 bordes">1</div>
				<div class="span1 bordes">1</div>
				<div class="span1 bordes">1</div>
				<div class="span1 bordes">1</div>
				<div class="span1 bordes">1</div>
				<div class="span1 bordes">1</div>
				<div class="span1 bordes">1</div>
				<div class="span1 bordes">1</div>
				<div class="span1 bordes">1</div>
				<div class="span1 bordes">1</div>
			</div>-->
			
			<div class="row-fluid">
				<div class="span6 well">
                
                		<?php

							@ session_start();
							
							if (!isset($_SESSION['id_usuario'])) /*si no estas registrado entonces...*/
							{
								echo '	
										<form id="formRegistro" class="form-vertical">
											<h2>Registro de usuario</h2>
											<label><strong>Nombre usuario</strong></label>
											<input type="text" class="span12" placeholder="Escribe tu nombre" name="nombre" required>
											<label><strong>Clave</strong></label>
											<input class="span12" placeholder="Escribe tu clave" type="password" name="clave" required>
											<label><strong>Correo</strong></label>
											<input type="email" class="span12" placeholder="Escribe tu correo" name="correo" required>
											<span class="help-block">Los visitantes te contactaran por el</span>
											<label><strong>Telefonos para contactarte</strong></label>
											<input type="text" class="span12" placeholder="celulares o convencionales" name="telefonos" required>
											<span class="help-block">Los visitantes te contactaran por ellos</span>
											<label class="checkbox">
											<input  required="required" type="checkbox"> Eres humano?
											</label>
											<button class="btn btn-success"type="submit">Registrarse</button>
										</form>
										
										<div id="msgExitoFracaso"></div>';
										
							}else{
								
								echo '<div class="">
										 Hola <strong>'.$_SESSION['nombre_usuario'].'</strong><br />
										 Ya estas registrado ve a la pagina pricipal <a href="index.php">inicio</a>
									  </div>';
							}
						?>  
                
                </div><!-- end container form -->
                
				<div class="span6 well hidden-phone">
                	
                      <h2>Bienvenido</h2>
                      <p>Registrate y ubica tus propiedades en nuestro mapa.</p>
                      <ul>                        
                        <li>Tus propiedades facil de encontrar.</li>
                        <li>Comparte tu mapa personalizado.</li>
                        <li>Inserta tu mapa personalizado en tu pagina web.</li>
                        <li>Agrega tus album de fotos.</li>
                      </ul>
                      <!--<p>Different types of form layouts require some changes to markup, but the controls themselves remain and behave the same.</p>-->
                    
                </div>
                
			</div>
			
		</div>
</div>


 <footer>
    		<?php
			require_once('plantilla/footer.php');
			?> 
    </footer>
</body>
</html>