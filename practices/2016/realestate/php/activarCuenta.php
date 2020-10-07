<?php

if (!isset($_GET['id']) || !isset($_GET['code'])) {//si no vienes las variables no hacer nada
return;
}
	
$id = trim($_GET['id']);
$code = trim($_GET['code']);

$id = filter_var($id, FILTER_SANITIZE_NUMBER_INT);/*saneando datos*/
$code = filter_var($code, FILTER_SANITIZE_NUMBER_INT);/*saneando datos*/

require_once('php/db_connect.php');

@ $mysqli = conectar_bd();
		
if (mysqli_connect_errno()) /*si no se logro la conexion mandar error*/
{
	echo crear_mensaje_error('Imposible conectar a la base de datos');
	return;			
}

$consulta = 'SELECT id FROM usuarios WHERE id = "'.$id.'" AND cod_activacion = "'.$code.'" AND 
			activada = "no"'; /*cheka si existe el usuario*/
$resultado = $mysqli->query($consulta);

if( $resultado->num_rows > 0) {	 
	
	$consulta2 = 'UPDATE usuarios SET activada = "si" WHERE id = "'.$id.'"';	
	
	if ($mysqli->query($consulta2)){ /*si se logro escribir en la base entonces ..*/
	
		echo '<div id="mensajeCuentaActivada" class="container well" style="text-align:center;">
					<h2>Tu cuenta a sido activada con exito.</h2>
					<p>Inicia sesion y ve a la pagina de <a href="index.php">inicio</a> por favor.</p>       
			</div>';
	
	}else {
	
		echo '<div id="mensajeCuentaActivada" class="container well" style="text-align:center;">
				<h2>Hubo un error activando tu cuenta.</h2>
				<p>Envianos un correo a info@mapainmobiliario.net informandonos de este error por favor.</p>       
			</div>';
	
	}
	
}else {

	echo '<div id="mensajeCuentaActivada" class="container well" style="text-align:center;">
				<h2>Tu cuenta ya ha sido activada.</h2>
				<p>Inicia sesion y ve a la pagina de <a href="index.php">inicio</a> por favor.</p> 
			</div>';

}

?>