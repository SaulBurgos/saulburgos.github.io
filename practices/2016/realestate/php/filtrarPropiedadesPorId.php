<?php

require_once('db_connect.php');
require_once('funciones.php');

@ $mysqli = conectar_bd();

if (mysqli_connect_errno()) /*si no se logro la conexion mandar error*/
	{
	echo crear_mensaje_error('Imposible conectar a la base de datos');
	return;			
	}
	
$actividad = trim($_POST['actividad']);
$tipoPropiedad = trim($_POST['tipoPropiedad']);
$id = trim($_POST['id']);

$actividad  = filter_var($actividad , FILTER_SANITIZE_STRING); 
$tipoPropiedad  = filter_var($tipoPropiedad , FILTER_SANITIZE_STRING);
$id  = filter_var($id , FILTER_SANITIZE_STRING); 



$cadena_filtros = '';

if($actividad != 'todas'){
	$cadena_filtros = $cadena_filtros.' AND propiedades.actividad = "'.$actividad.'" ';
}

if($tipoPropiedad != 'todas'){
	$cadena_filtros = $cadena_filtros.' AND propiedades.tipopropiedad = "'.$tipoPropiedad.'" ';
}

$consulta = 'SELECT propiedades.id, propiedades.usuario, propiedades.actividad, propiedades.tipopropiedad, propiedades.titulo, propiedades.precio, propiedades.descripcion, propiedades.linkimg, propiedades.lat, propiedades.lng, propiedades.fecha_creacion, propiedades.linkinfo, usuarios.correo, usuarios.telefonos, usuarios.tipo_cuenta, usuarios.nombre, propiedades.tipo_area, propiedades.area, propiedades.path_poligono, propiedades.linkalbum
FROM propiedades, usuarios
WHERE propiedades.usuario = usuarios.id
AND propiedades.usuario =  "'.$id.'" '.$cadena_filtros.' AND propiedades.publicado = "si" ORDER BY propiedades.precio ASC' ;
			 

			 
$resultado = $mysqli->query($consulta);

echo ArmarJsonBasico($resultado);


$mysqli->close();/*cierra la conexion a la base datos*/	
?>