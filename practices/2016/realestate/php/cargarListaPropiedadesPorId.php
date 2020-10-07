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
$id = filter_var($id, FILTER_SANITIZE_STRING); /*saneando los datos*/
	
$consulta = 'SELECT  propiedades.id, propiedades.usuario,propiedades.actividad, propiedades.tipopropiedad,
			propiedades.titulo ,propiedades.precio ,propiedades.descripcion,
			propiedades.linkimg,propiedades.lat,propiedades.lng ,propiedades.fecha_creacion ,
			propiedades.linkinfo ,usuarios.correo,usuarios.telefonos,usuarios.tipo_cuenta , usuarios.nombre , 
			propiedades.tipo_area , propiedades.area , propiedades.path_poligono ,propiedades.linkalbum
			 FROM propiedades , usuarios WHERE propiedades.usuario = usuarios.id AND  
			 usuarios.id = "'.$id.'" AND propiedades.publicado = "si" ORDER BY propiedades.precio ASC' ;
			 
$resultado = $mysqli->query($consulta);


echo ArmarJsonBasico($resultado);


$mysqli->close();/*cierra la conexion a la base datos*/	
?>