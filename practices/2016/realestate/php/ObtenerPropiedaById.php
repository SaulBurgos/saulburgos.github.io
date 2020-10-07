<?php

require_once('db_connect.php');
require_once('funciones.php');

@ $mysqli = conectar_bd();
		
if (mysqli_connect_errno()) /*si no se logro la conexion mandar error*/
	{
	echo crear_mensaje_error('Imposible conectar a la base de datos');
	return;			
	}
	
$id = trim($_POST['id']);
$id  = filter_var($id , FILTER_SANITIZE_STRING); /*saneando la datos*/

	
$consulta = 'SELECT propiedades.actividad, propiedades.tipopropiedad,
			propiedades.titulo ,propiedades.precio ,propiedades.descripcion,
			propiedades.linkimg, propiedades.linkinfo ,	propiedades.tipo_area , 
			propiedades.area , propiedades.linkalbum 
			FROM propiedades WHERE propiedades.id ="'.$id.'"' ; 
			 
$resultado = $mysqli->query($consulta);
echo ArmarJsonEditar($resultado);

$mysqli->close();/*cierra la conexion a la base datos*/	
?>