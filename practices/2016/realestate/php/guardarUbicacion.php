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
$lat = trim($_POST['lat']);
$lng = trim($_POST['lng']);
$tipoArea = trim($_POST['tipoArea']);
$area = trim($_POST['area']);
$poligonoPath = trim($_POST['poligonoPath']);
$linkAlbum = trim($_POST['linkAlbum']);
$pais = trim($_POST['pais']);

//echo 'php dice : '.$actividad.','.$tipoPropiedad.','.$titulo.','.$precio.','.$descripcion.','.$linkImg.','.$lat.','.$lng;

if($titulo == '' || $precio == '' || $descripcion == '' || $area == '' )/*si alguno de los campos esta vacio entonces..*/
	{
		echo crear_mensaje_error( ' Datos vacios , escribe todos tus datos.');
		
	}
	else
	{		
		$descripcion = str_replace("\r\n","",$descripcion);
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
		$lat = filter_var($lat, FILTER_SANITIZE_NUMBER_FLOAT,FILTER_FLAG_ALLOW_FRACTION);
		$lng = filter_var($lng, FILTER_SANITIZE_NUMBER_FLOAT,FILTER_FLAG_ALLOW_FRACTION);		
		$poligonoPath = filter_var($poligonoPath, FILTER_SANITIZE_STRING);
		$pais = filter_var($pais, FILTER_SANITIZE_STRING);
		
		$titulo = utf8_decode($titulo);
		$descripcion = utf8_decode($descripcion);
		//$descripcion = htmlentities($descripcion, ENT_QUOTES);

		
		@ $mysqli = conectar_bd();
		@ session_start();/*inicio la sesion*/
		
		if (mysqli_connect_errno()) /*si no se logro la conexion mandar error*/
			{
			echo crear_mensaje_error('Imposible conectar a la base de datos');
			return;			
			}
										
		$idPropiedad = time().'-'.$_SESSION['id_usuario'];	/*crea id propiedad unico*/
		$fecha = date ('y-m-d');
				
		if($_SESSION['tipo_cuenta'] == 'basica'){
			$consulta = 'SELECT id FROM propiedades WHERE usuario = "'.$_SESSION['id_usuario'].'"'; /*cheka si existe el usuario*/
			$resultado1 = $mysqli->query($consulta);
			
			if( $resultado1->num_rows > 0)
				{
					//$mensaje = 'El nombre de usuario ya existe ,'.$consulta.' numero de filas: '.$resultado1->num_rows;
					echo crear_mensaje_error('Lo sentimos solo puedes agregar una propiedad con tu cuenta gratuita
					, para agregar mas de una propiedad te invitamos a contratar una cuenta full.  info@mapainmobiliario.net');											
					return;
				}
		}
		
			
		$consulta = 'INSERT INTO propiedades (id ,usuario ,actividad ,tipopropiedad,titulo,precio,
						descripcion,linkimg,lat,lng,fecha_creacion,linkinfo,tipo_area,area,path_poligono,linkalbum,pais) 
					VALUES ( "'.$idPropiedad.'","'.$_SESSION['id_usuario'].'","'.$actividad.'","'.$tipoPropiedad.'","'.
							$titulo.'","'.$precio.'","'.$descripcion.'","'.$linkImg.'","'.$lat.'","'.$lng.'","'.$fecha.'","'.$linkInfo.'","'.
							$tipoArea.'","'.$area.'","'.$poligonoPath.'","'.$linkAlbum.'","'.$pais.'")';	
				
		if ($mysqli->query($consulta)){				
			echo 'ok';
		}else { 
			echo crear_mensaje_error('No pudimos guardar la ubicacion, intentalo de nuevo'); 
		}
		
	}

?>