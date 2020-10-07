<!DOCTYPE html>
<html>
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">
<meta http-equiv="Content-Type" content="text/html" charset="iso-8859-1">

<meta name="description" content="Guia de Bienes raices donde puedes buscar propiedades con un comodo mapa , busca y encuentra tu propiedad facil y rapido."/> 
<meta name="keywords" content="Bienes raices  Latinoam&#233;rica, real state  Latinoam&#233;rica , propiedades compra y venta, mapa propiedades , guia bienes raices ,  Latinoam&#233;rica" />
<meta property="og:title" content="Guia de Bienes racies facil" />
<meta property="og:description" content="Busca propiedades en toda Latinoam&#233;rica de tu interes facil y rapido no pierdas tiempo en los periodicos , guia practica de bienes raices" />

<!--<meta property="og:image" content="http://cotizaloaqui.com/img/logo.jpg" />-->
<meta property="og:url" content="http://mapainmobiliario.net"> 
<meta property="og:type" content="website">
<meta property="og:site_name" content="mapainmobiliario.net"/>
<meta property="og:title" content="Mapainmobiliario.net Compra y venta de propiedades">
<meta property="og:description" content="Registra tu propiedad en nuestra guia es gratis!!! , una manera rapida y facil de vender y comprar propiedades , reduce el tiempo de busqueda a la mitad">
<meta property="fb:app_id" content="399028653483186"/> 
<meta property="og:locale:alternate" content="es_ES"/>


<meta name="viewport" content="initial-scale=1.0, user-scalable=no ,width=device-width" />
<title>MapaInmobiliario.net - Guia de Bienes Raices</title>
 	<?php
	require_once('plantilla/carga_js_css.php');
	?> 
    <script src="js/maplabel.js" type="text/javascript"></script> 
    <script src="js/markerclusterer.js" type="text/javascript"></script>       
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

<body onLoad="cargarMapa()">
    
    <nav id="menuNavTop"></nav>
    
    <div id="contenedor" class="container-fluid">
         
      <!--<div class="row-fluid bordes">
        	<div class="bordes span1">
            	1
            </div>
            <div class="bordes span1">
            	1
            </div>
            <div class="bordes span1">
            	1
            </div>
            <div class="bordes span1">
            	1
            </div>
            <div class="bordes span1">
            	1
            </div>
            <div class="bordes span1">
            	1
            </div>
            <div class="bordes span1">
            	1
            </div>
            <div class="bordes span1">
            	1
            </div>
            <div class="bordes span1">
            	1
            </div>
            <div class="bordes span1">
            	1
            </div>
            <div class="bordes span1">
            	1
            </div>
            <div class="bordes span1">
            	1
            </div>
        </div>-->          
        
        <div class="row-fluid">
        
        	<div class="span3 offset3 hidden-phone"></div>
            
         	<div id="ContenedorFiltrosMapa" class="span6">            
            	<form id="formFiltros" class="form-inline">
				
						<div class="span3">   
							<select name="pais" class="span12" style="display:none;">
								<!-- <option value="todas">Todos los paises</option> -->
								<?php
									require_once('plantilla/opcionesSelectPaises.php');
								?>		
							</select>
						</div>
						
                        <div class="span3">            
                            <select name="actividad" class="span12">
                                <option value="todas">Todas</option>
                                <option value="alquiler">En alquiler</option>
                                <option value="venta">En venta</option>
                            </select>
                        </div>
                        
                        <div class="span3"> 
                            <select name="tipoPropiedad" class="span12">
                                <option value="todas">Todas</option>
                                <?php
                                    require_once('plantilla/opcionesSelectTipoPropiedad.php');
                                ?>              
                            </select>
                        </div>
                        <div class="span3">
                            <button type="submit" class="btn"><i class=" icon-filter"></i> Filtrar</button>
                        </div>                 	
                </form>            
            </div>
         	
            <div class="span3 offset3 hidden-phone"></div>
            
        </div> <!-- end row -->   
        
        
        <div id="contenedorMapaLista" class="row-fluid">
            <aside id="sidebar" class="span3 well hidden-phone" style="margin:5px;"></aside>            
            <div id="googleMap" class="span9" style="margin:5px;"></div>           
        </div>
    </div>
    
    <footer>
    		<?php
			require_once('plantilla/footer.php');
			?> 
    </footer>
</body>
</html>