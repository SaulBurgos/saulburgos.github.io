<?php
$nombre = trim($_POST['usuario']);/*quita los espacios en blanco*/
$clave = trim($_POST['clave']);

require_once('db_connect.php');
require_once('funciones.php');

//$semilla = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ.abcdefghijklmnopqrstuvwxyz0123456789+*()ñ';
$nombre = utf8_decode($nombre);	/*codifica el ñ por si lo ponen en el nombre*/

if($nombre == '' || $clave == '')/*si alguno de los campos esta vacio entonces..*/
	{
		echo crear_mensaje_error( 'Datos vacios , escribe todos tus datos.');
	}
	else
	{
		$nombre = filter_var($nombre, FILTER_SANITIZE_STRING); /*saneando los datos*/
		$clave = filter_var($clave, FILTER_SANITIZE_STRING);
		
		@ $mysqli = conectar_bd();
		
		if (mysqli_connect_errno()) /*si no se logro la conexion mandar error*/
		{
			echo crear_mensaje_error('Imposible conectar a la base de datos');
			return;			
		}
		
		//$clave = crypt($clave,'$2a$07$'.$semilla.'$');	/*cifra la clave*/
		$clave = hash('ripemd256', $clave);/*cifra la clave con algoritmo standar que pueda funcionar en cualquier server*/
		$consulta = 'SELECT * FROM usuarios WHERE nombre = "'.$nombre.'" and clave ="'.$clave.'"'; /*cheka si existe el usuario*/
		$resultado = $mysqli->query($consulta);
			
		if($resultado->num_rows == 1)
			{
				$row = array();
				$row = $resultado->fetch_assoc();/*guardo los resultados en un arreglo para despues usarlos*/
				
				if($row['activada'] == 'no'){
				
					echo crear_mensaje_error('Cuenta no activada todavia, revisa tu correo.');
				
				}else {
		
					@ session_start();/*inicio la sesion y registro las variables que puedo necesitar*/
					
					$_SESSION['id_usuario'] = $row['id'];
					$_SESSION['nombre_usuario'] = utf8_encode($nombre);/*codifica la ñ*/
					$_SESSION['tipo_cuenta'] = $row['tipo_cuenta'];
					
					$fecha = date ('y/m/d');
													
					$consulta2 = 'UPDATE usuarios SET ultima_session = "'.$fecha.'" WHERE id = "'.$row['id'].'"'; 
					$resultado2 = $mysqli->query($consulta2);
					
					echo 'ok';				
				}
			}else{ echo crear_mensaje_error('Verifica tu clave y nombre de usuario'); }
		
		
		$mysqli->close();/*cierra la conexion a la base datos*/	
		
	}

?>