<?php

if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'){

}else{
	return;
}

require_once('db_connect.php');
require_once('funciones.php');

$nombre = trim($_POST['nombre']);/*quita los espacios en blanco*/
$clave = trim($_POST['clave']);
$correo = trim($_POST['correo']);
$telefonos = trim($_POST['telefonos']);


//echo 'php dice nombre : '.$nombre.',clave:'.$clave.',correo:'.$correo;
//$semilla = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ.abcdefghijklmnopqrstuvwxyz0123456789+*()ñ';

if($nombre == '' || $clave == '' || $correo == '')/*si alguno de los campos esta vacio entonces..*/
	{
		echo crear_mensaje_error( ' Datos vacios , escribe todos tus datos.');
		
	}
	else
	{
				
		if(!filter_var($correo, FILTER_VALIDATE_EMAIL)){
			echo 'Por favor ingresa un correo valido';
			return;	
		}
		
		$nombre = filter_var($nombre, FILTER_SANITIZE_STRING); /*saneando los datos*/
		$clave = filter_var($clave, FILTER_SANITIZE_STRING);
		$correo = filter_var($correo, FILTER_SANITIZE_EMAIL);
		$telefonos = filter_var($telefonos, FILTER_SANITIZE_STRING);
				
		
		@ $mysqli = conectar_bd();
		
		if (mysqli_connect_errno()) /*si no se logro la conexion mandar error*/
			{
			echo crear_mensaje_error('Imposible conectar a la base de datos');
			return;			
			}
		
		$consulta = 'SELECT nombre FROM usuarios WHERE nombre = "'.$nombre.'"'; /*cheka si existe el usuario*/
		$resultado1 = $mysqli->query($consulta);
		
		if( $resultado1->num_rows > 0)
			{
				//$mensaje = 'El nombre de usuario ya existe ,'.$consulta.' numero de filas: '.$resultado1->num_rows;
				echo crear_mensaje_informativo('El nombre de usuario ya existe.');											
				return;
			}
		
		$consulta2 = 'SELECT correo FROM usuarios WHERE correo = "'.$correo.'"'; 
		$resultado2 = $mysqli->query($consulta2);
		
		if($resultado2->num_rows > 0)
			{																	
				//$mensaje = 'El correo escrito ya esta registrado'.$consulta2.'numero de filas:'.$resultado2->num_rows;
				echo crear_mensaje_informativo('El correo escrito ya esta registrado.');														
				return;
			}	
			
		$fecha = date ('y-m-d');
		//$clave = crypt($clave,'$2a$07$'.$semilla.'$');	
		$clave = hash('ripemd256', $clave);/*cifra la clave con algoritmo standar que pueda funcionar en cualquier server*/	
		$nombre = utf8_decode($nombre);	/*codifica el ñ si ponen ñ */
		$codigoActivacion = mt_rand(1,9000);/* Crea un numero aleatoria de activacion*/
		
		$direccionIp = getRealIpAddr();
		
		$consulta = 'INSERT INTO usuarios (nombre ,clave ,correo ,fecha_registro,telefonos,ip,cod_activacion)
					 VALUES ( "'.$nombre.'","'.$clave.'","'.$correo.'","'.$fecha.'","'.$telefonos.'","'.$direccionIp.'","'.$codigoActivacion.'")';	
				
		if ($mysqli->query($consulta)) /*si se logro escribir en la base entonces ..*/
			{

				$consulta2 = 'SELECT * FROM usuarios WHERE nombre = "'.$nombre.'"';
				$resultado2 = $mysqli->query($consulta2);/*saco el id del ultimo producto agregado*/
				
				$row = array();
				$row = $resultado2->fetch_assoc();
				$id_usuario = $row['id'];/*lo graba aqui*/	
				
				$to      = $correo;
				$from = 'info@saulburgos.com';
				$subject = 'mapainmobiliario.net activacion de cuenta';
				$message = 'Hola '.$nombre.' aqui te hemos enviado el link de activacion de tu cuenta , por favor visita el siguiente link para que 
							tu cuenta sea activada y puedas registrar propiedades.'."\r\n\r\n".'http://mapainmobiliario.net/active.php?id='.$id_usuario.'&code='.$codigoActivacion;

				$headers = 'From: info@saulburgos.com'. "\r\n".
				'Reply-To: info@saulburgos.com'. "\r\n".
				'Return-Path: info@saulburgos.com' . "\r\n".
				'X-Mailer: PHP/' . phpversion();				
				
				mail($to, $subject, $message, $headers, "-f $from");
				
				echo 'ok';
				
			}else{
				
				echo crear_mensaje_error('Lo siento hubo un error no pudimos registrarte.');
			}			
				
		$mysqli->close();/*cierra la conexion a la base datos*/				
	}



?>