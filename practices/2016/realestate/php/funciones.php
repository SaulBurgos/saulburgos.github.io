<?php

function existeSesion (){
	
	@ session_start();
	
	if (!isset($_SESSION['id_usuario'])){ /*si no estas registrado entonces...*/
		return false;
	}else{
		return true;
	}

}

/********************************************************************/
/********************************************************************/

function crear_mensaje_informativo($mensaje)
{
			
  $mensaje_armado = '<div class="alert alert-info"><i class="icon-info-sign"></i> '.$mensaje.'</div>';
		
  return $mensaje_armado;	
	
}

/********************************************************************/
/********************************************************************/
function crear_mensaje_error($mensaje)
{
						  
	 $mensaje_armado = '</i><div class="alert alert-error"><i class="icon-warning-sign"></i> '.$mensaje.'</div>';
						
	return $mensaje_armado;
	
}

/********************************************************************/
/********************************************************************/
function crear_mensaje_exito($mensaje)
{
						  
	 $mensaje_armado = '<div class="alert alert-success"><i class="icon-ok-sign"></i> '.$mensaje.'</div>';
						
	return $mensaje_armado;
	
}

/********************************************************************/
/********************************************************************/
function db_to_array ($arreglo_recibido)
{
 $arreglo_armado = array();
 
 for ($count = 0; $row = $arreglo_recibido->fetch_assoc();$count++)
 {
	 $arreglo_armado[$count] = $row;
 }
 return $arreglo_armado;
}

/********************************************************************/
/********************************************************************/

function ArmarJsonBasico($resultado){
	
$json = '[';
$first = true;

while($row = $resultado->fetch_assoc())
{
	if (!$first) { $json .=  ','; } else { $first = false; }				
				
	$json .= '{"idPropiedad": "'.$row['id'].'", "usuarioId": "'.utf8_encode($row['usuario']).'", "actividad": "'.$row['actividad'].'", 
				"tipopropiedad": "'.$row['tipopropiedad'].'", "titulo": "'.utf8_encode($row['titulo']).'",
				 "precio": "'.number_format($row['precio'],0,".",",").'","descripcion": "'.utf8_encode($row['descripcion']).'",
				  "linkimg": "'.$row['linkimg'].'", "lat": "'.$row['lat'].'","lng": "'.$row['lng'].'",
				   "fecha_creacion": "'.cambia_fecha_a_normal($row['fecha_creacion']).'","linkInfo":"'.$row['linkinfo'].'" ,
				"telefonos": "'.$row['telefonos'].'" ,"correo":"'.$row['correo'].'" ,  "tipo_cuenta": "'.$row['tipo_cuenta'].'" ,
				"tipoarea":"'.$row['tipo_area'].'","area":"'.number_format($row['area'],0,".",",").'" , "polygonPath":"'.$row['path_poligono'].'" ,
				"linkalbum":"'.$row['linkalbum'].'" , "nombreUsuario":"'.utf8_encode($row['nombre']).'"}';			
				
}
$json .= ']';

return $json; 
	
}


/********************************************************************/
/********************************************************************/

function ArmarJsonGridPanel($resultado){
	
$json = '[';
$first = true;

while($row = $resultado->fetch_assoc())
{
	if (!$first) { $json .=  ','; } else { $first = false; }				
				
	$json .= '{"id": "'.$row['id'].'", "imagen": "'.$row['linkimg'].'", "titulo": "'.utf8_encode($row['titulo']).'", 
				"precio": "$ '.number_format($row['precio'],0,".",",").'", "actividad": "'.$row['actividad'].'",
				 "propiedad": "'.$row['tipopropiedad'].'","tipoArea": "'.$row['tipo_area'].'",
				  "area": "'.number_format($row['area'],0,".",",").'", "fechaCreacion": "'.cambia_fecha_a_normal($row['fecha_creacion']).'",
				  "pais": "'.$row['pais'].'"}';			
				
}
$json .= ']';

								/*[{ FirstName: "Joe", LastName: "Smith" , otro:"1"},
                 			   { FirstName: "Jane",LastName: "Smith",otro:"2"},
							    { FirstName: "saul",LastName: "burgos",otro:"3"}]*/

return $json; 
	
}

/********************************************************************/
/********************************************************************/

function ArmarJsonEditar($resultado){
	
$json = '[';
$first = true;

while($row = $resultado->fetch_assoc())
{
	if (!$first) { $json .=  ','; } else { $first = false; }				
				
	$json .= '{"actividad": "'.$row['actividad'].'", "tipopropiedad": "'.$row['tipopropiedad'].'", "titulo": "'.utf8_encode($row['titulo']).'", 
				"precio": "'.$row['precio'].'", "descripcion": "'.utf8_encode($row['descripcion']).'",
				 "linkimg": "'.$row['linkimg'].'","linkinfo": "'.$row['linkinfo'].'",
				  "tipo_area": "'.$row['tipo_area'].'", "area": "'.$row['area'].'" ,"linkalbum":"'.$row['linkalbum'].'"}';			
				
}
$json .= ']';

								/*[{ FirstName: "Joe", LastName: "Smith" , otro:"1"},
                 			   { FirstName: "Jane",LastName: "Smith",otro:"2"},
							    { FirstName: "saul",LastName: "burgos",otro:"3"}]*/

return $json; 
	
}


/**************************************************/

function cambia_fecha_a_normal($fecha){ 

if (($fecha == '') or ($fecha == '0000-00-00') ) 
    {
		return '';
	} 
else 
    {
	return date('d/m/Y',strtotime($fecha));/*date formatea la fecha */
	} 

} 
/***************************************************/

function getRealIpAddr()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
    {
      $ip=$_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
    {
      $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
      $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

?>