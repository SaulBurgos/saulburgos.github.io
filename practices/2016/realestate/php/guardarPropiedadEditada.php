<?php

if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'){

}else{
	return;
}

require_once('db_connect.php');
require_once('funciones.php');

$actividad = trim($_POST['actividad']);/*quita los espacios en blanco*/
$tipoPropiedad = trim($_POST['tipoPropiedad']);
$titulo = trim($_POST['titulo']);
$precio = trim($_POST['precio']);
$descripcion = trim($_POST['descripcion']);
$linkImg = trim($_POST['linkimg']);
$linkInfo = trim($_POST['linkInfo']);
$tipoArea = trim($_POST['tipoArea']);
$area = trim($_POST['area']);
$linkAlbum = trim($_POST['linkAlbum']);
$id = trim($_POST['id']);

//echo 'php dice : '.$actividad.','.$tipoPropiedad.','.$titulo.','.$precio.','.$descripcion.','.$linkImg.','.$lat.','.$lng;

if($actividad == '' || $tipoPropiedad == '' || $titulo == '' || $precio == '' || $descripcion == '' 
	|| $descripcion == '' || $area == '' )/*si alguno de los campos esta vacio entonces..*/
	{
		echo crear_mensaje_error( ' Datos vacios , escribe todos tus datos.');
		
	}
	else
	{		
		$descripcion = str_replace("\r\n","",$descripcion);//remueve los salto de linea que cuasan un error en el json
		$descripcion = str_replace("	"," ",$descripcion);
		
		$actividad = filter_var($actividad, FILTER_SANITIZE_STRING); /*saneando los datos*/
		$tipoPropiedad = filter_var($tipoPropiedad, FILTER_SANITIZE_STRING);
		$titulo = filter_var($titulo, FILTER_SANITIZE_STRING);
		$precio = filter_var($precio, FILTER_SANITIZE_NUMBER_FLOAT);
		$area = filter_var($area, FILTER_SANITIZE_NUMBER_FLOAT);
		$tipoArea = filter_var($tipoArea, FILTER_SANITIZE_STRING);
		$descripcion = filter_var($descripcion, FILTER_SANITIZE_STRING);
		$linkImg = filter_var($linkImg, FILTER_SANITIZE_STRING);
		$linkAlbum = filter_var($linkAlbum, FILTER_SANITIZE_STRING);
		$linkInfo = filter_var($linkInfo, FILTER_SANITIZE_STRING);
				
		$titulo = utf8_decode($titulo);
		$descripcion = utf8_decode($descripcion);
		
		@ $mysqli = conectar_bd();
		@ session_start();/*inicio la sesion y registro las variables que puedo necesitar*/
		
		if (mysqli_connect_errno()) /*si no se logro la conexion mandar error*/
			{
			echo crear_mensaje_error('Imposible conectar a la base de datos');
			return;			
			}																			
							
		$consulta = 'UPDATE propiedades SET 
							  actividad = "'.$actividad.'" ,
							  tipopropiedad = "'.$tipoPropiedad.'" ,
							  titulo = "'.$titulo.'" ,
							  precio = "'.$precio.'",
							  descripcion = "'.$descripcion.'",
							  linkimg = "'.$linkImg.'",
							  linkinfo = "'.$linkInfo.'",
							  tipo_area = "'.$tipoArea.'" ,
							  area = "'.$area.'" ,  
							  linkalbum = "'.$linkAlbum.'" 
							  WHERE id = "'.$id.'"';	
				
		if ($mysqli->query($consulta)) 
			{
				
				echo 'ok';
			}else{ 
				echo crear_mensaje_error('No pudimos guardar tus cambios, intentalo de nuevo'); 
			}
		
	}



?>