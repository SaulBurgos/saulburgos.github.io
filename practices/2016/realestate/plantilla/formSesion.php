<?php

@ session_start();

if (!isset($_SESSION['id_usuario'])) /*si no estas registrado entonces...*/
{
	echo ' <form id="formLogin" class=".form-vertical pull-left">
			<!--<input type="text" class="search-query span2" placeholder="Search">-->
			<label>Usuario</label>
			<input type="text" name="usuario" class="span2">
			<label>Clave</label>
			<input type="password" name="clave" class="span2">
			<button class="btn btn-primary" type="submit">entrar</button>                                   
			<a href="registro.php" class="btn">Registro</a>
			 <div id="msgExitoSesion"></div>
		  </form>';
}else{
	
	echo 'Hola <strong>'.$_SESSION['nombre_usuario'].
			'</strong><br /><button id="cerrarSesion" class="btn btn-mini">Salir</button>';
}
?>