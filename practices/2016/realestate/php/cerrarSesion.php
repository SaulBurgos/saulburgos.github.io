<?php


@ session_start();

require_once('funciones.php');

if (isset($_SESSION['id_usuario']))  /*revisa si ya se ha iniciado una sesion*/
{

	$viejo_usuario = $_SESSION['id_usuario'];/*almacenar el id para probar si estaban logueados*/
	
	unset($_SESSION['id_usuario']);		
	unset($_SESSION['nombre_usuario']);
	unset($_SESSION['tipo_cuenta']); 
	
	$destruida = session_destroy(); /*destruir la sesion*/
	
	if (!empty($viejo_usuario))/* no esta vacia esta variable*/
		{
			if($destruida)
				{
					/*si estaban logueados y ahora estan desconectados*/
					echo 'ok';
				}
				else
				{
					/*estan conectados y no se puede desconectar*/
					 echo crear_mensaje_error('No se pudo terminar la sesion');
				}
		}
		else
		{
			/*no estaban logueados pero de algun modo accedieron esta pagina*/
			echo crear_mensaje_error('No estas logueado por favor registrate');
		}		
}
?>