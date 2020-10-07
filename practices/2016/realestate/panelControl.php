<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html" charset="iso-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MapaInmobiliario.net - Panel de Control</title>

<meta name="description" content=" Panel de control de mapainmobiliario.net aqui podras administrar tus propiedades"/> 

<meta name="keywords" content="Bienes raices  Latinoam&#233;rica , real state  Latinoam&#233;rica , propiedades compra y venta, mapa propiedades , guia bienes raices" />

 	<link rel="stylesheet"  type="text/css" href="css/bootstrap.css" />
    <link rel="stylesheet"  type="text/css" href="css/bootstrap-responsive.css" /> 
      
    <link rel="stylesheet" type="text/css" href="css/kendo.common.min.css"  />
    <link rel="stylesheet" type="text/css" href="css/kendo.silver.min.css"  />    
    <link rel="stylesheet/less" type="text/css" href="less/custom.less">
    
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyBSi-HA73tvLLURPI3-AXwCq5oSwV1GxNk&sensor=false&language=es">
    </script>
    <script src="js/less-1.3.0.min.js" type="text/javascript"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
    <!--<script src="js/jquery-1.7.1.js" type="text/javascript"></script>-->
    <script src="js/bootstrap-collapse.js" type="text/javascript"></script>
    <script src="js/bootstrap-dropdown.js" type="text/javascript"></script>
    <script src="js/bootstrap-modal.js" type="text/javascript"></script>
    <script src="js/kendo.web.min.js" type="text/javascript"></script>
    <script src="js/functions.js" type="text/javascript"></script>
    <script src="js/poligono.js" type="text/javascript"></script>
    <script src="js/panelControl.js" type="text/javascript"></script>
    
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
    
<nav id="menuNavTopControlPanel">

	<div class="navbar">
        <div class="navbar-inner">
          <div class="container">
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </a>
            <a class="brand" href="index.php">MapaInmobiliario.net</a>
            <div class="nav-collapse">
              <ul class="nav">
               <!--  <li class="active"><a href="#">Home</a></li>
               <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>-->
                   
               <!-- <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Login<b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li>
                             <form id="formLogin" class=".form-vertical pull-left" action="">
                                <input type="text" class="search-query span2" placeholder="Search">
                                <label>Usuario</label>
                                <input type="text" class="span2">
                                <label>Clave</label>
                                <input type="text" class="span2">
                                <button class="btn btn-primary" type="submit">entrar</button>
                                <button class="btn btn-success">Registro</button>
                              </form>                        
                        </li>
                    </ul>
                </li>-->
              </ul>             
                <ul class="nav pull-right">
                	 
                    <li class="divider-vertical"></li>
                    <li>
                        <a href="index.php"><i class="icon-home icon-white"></i> Inicio
                        </a>
                   </li>              
                               
                    <li class="divider-vertical"></li>
                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                      <i class="icon-user icon-white"></i> Inicar Sesion<b class="caret"></b></a>
                      <ul class="dropdown-menu">
                             <li>
                               <?php
                               require_once('plantilla/formSesion.php');
                               ?>                         
                            </li>
                      </ul>
                    </li>
                 </ul>
            </div><!-- /.nav-collapse -->
          </div>
        </div><!-- /navbar-inner -->
    </div>
   
</nav><!-- end navbar-menu -->
    
<div id="contenedor" class="container-fluid">
     
   <!-- <div class="row-fluid bordes">
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
    </div>  -->
    
        <div class="row-fluid">
        
            <div class="span1 hidden-phone"> 
              
            </div>
            
            <div class="span10 well sombraGenerica">  
                <div class="row-fluid "><h2>Listado de todas tus propiedades</h2></div>
                    <?php
                     
                    @ session_start();
                    
                    if (!isset($_SESSION['id_usuario'])) /*si no estas registrado entonces...*/
                    {
                        echo 'Necesitas estar registrado para ver el panel de control';
                    }else{
                        
                        require_once('plantilla/contenidoPanelControl.php');
                    }
                    ?>                        
                   
                </div>  
                
            <div class="span1 hidden-phone">
              
            </div>
        
       </div><!-- end row -->
	   
	<div class="row-fluid">
        <div class="span1">
            1
        </div>
        <div id="anuncio" class="span10 well">
            Contratando tu cuenta full puedes publicar propiedades ilimitadamente, envianos un correo a : <a href="mailto:info@mapainmobiliario.net">info@mapainmobiliario.net</a>
        </div>
        <div class="span1">
            1
        </div>
    </div> 
	   
	   
</div><!-- end contenedor-->

 <footer>
    		<?php
			require_once('plantilla/footer.php');
			?> 
    </footer>
</body>
</html>