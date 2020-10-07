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
                	 
                    	<?php
							require_once('../php/funciones.php');
							
							if (existeSesion()){
								echo '<li class="divider-vertical"></li>
                						<li>
											<a id="agregarUbicacion" href="#"><i class="icon-map-marker icon-white">
												</i> Agregar Ubicacion
											</a>
									   </li>
									   <li class="divider-vertical"></li>
									   <li>
									     <a href="panelControl.php"><i class="icon-cog icon-white"></i> Panel de control</a>
									  </li>';
							}else {
								
								echo '<li>
											<a href="registro.php"><i class="icon-map-marker icon-white">
												</i> Agregar Ubicacion
											</a>
									   </li>';
								
							}
						?>                   
                               
                    <li class="divider-vertical"></li>
                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                      <i class="icon-user icon-white"></i> Inicar Sesion<b class="caret"></b></a>
                      <ul class="dropdown-menu">
                             <li>
                               <?php
                               require_once('formSesion.php');
                               ?>                         
                            </li>
                      </ul>
                    </li>
                 </ul>
            </div><!-- /.nav-collapse -->
          </div>
        </div><!-- /navbar-inner -->
    </div>