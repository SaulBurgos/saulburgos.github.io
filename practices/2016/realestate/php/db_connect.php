<?php

/**
	* hace la conexion a la BD y todos los script la usan 
	*
	* nada mas que comentar
	*
	* @author chaka
	* @version 1.0
	* @package script php
	*/

function conectar_bd()
{
	
$usuario = '';
$contraseñabd = '';
$bd = '';

$conexion = new mysqli('localhost', $usuario, $contraseñabd, $bd); /*conecta a la Bd*/

return $conexion;

}




?>