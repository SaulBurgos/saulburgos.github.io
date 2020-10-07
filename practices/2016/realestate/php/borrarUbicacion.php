<?php


if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'){

}else{
	echo 'This is not an AJAX request. This page cannot be accessed directly.';
	return;
}

require_once('db_connect.php');
require_once('funciones.php');

@ $mysqli = conectar_bd();

if (mysqli_connect_errno()) /*si no se logro la conexion mandar error*/
	{
	echo crear_mensaje_error('Imposible conectar a la base de datos');
	return;			
	}
	
$idPropiedades = trim($_POST['idPropiedades']);
$idPropiedades = filter_var($idPropiedades, FILTER_SANITIZE_STRING); /*saneando los datos*/
	
$consulta = 'DELETE FROM propiedades WHERE 	id="'.$idPropiedades.'"'; 

if ($mysqli->query($consulta))/*si se borro la pregunta entonces*/ 
	{
		echo 'ok';
	}else{
		echo crear_mensaje_error('No se pudo borrar la ubicacion');
	}

$mysqli->close();/*cierra la conexion a la base datos*/	

?>