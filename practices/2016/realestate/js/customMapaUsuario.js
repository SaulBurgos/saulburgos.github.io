var objTodasPropiedades;
var arrayMarcadores = [];
var poligonosdeTerrenos = [];
var mapa;
var timerMarker;
var timerPoligonos;
var poligonosEnMapa = false;
var idUsuario;
var markerTemp;
var markerColor;
var markerClusterer;
var etiquetasprecio = [];

function cargarMapa(){
	
	mapa = new google.maps.Map(document.getElementById("googleMap"),OptionsMap);
	markerColor = CrearMarkerDeColor();	
	
	google.maps.event.addListenerOnce(mapa, 'idle', function(){
		CargarPropiedadesDeUsuario();//carga todas la propiedades de la BD	
		CrearDivNumeroPropiedades();
	});
	
	google.maps.event.addListener(mapa, 'bounds_changed', function() {	
		
		if(arrayMarcadores.length > 0){//previene que se llame si no hay marcadores 
			clearTimeout(timerMarker);
			CrearCargandoEnListaSideBar();
			timerMarker = setTimeout('ActualizarLista()',1200);
			//console.log('turn on timerMarker');							
		}	
		
		if(poligonosdeTerrenos.length > 0 ){//previene que se llame si no terrenos 		
		
			if(	mapa.getZoom() >= 15){
				clearTimeout(timerPoligonos);
				timerPoligonos = setTimeout('MostrarPoligonos()',1200);
				//console.log('mostrar terrenos');		
			}else {	
				clearTimeout(timerPoligonos);
				CrearCargandoEnListaSideBar();
				timerPoligonos = setTimeout('EsconderPoligonos()',1200);			
				//console.log('esconder terrenos');				
			}	
		}
		
	});
	
	
}
/************************************************/
function ActualizarLista(){
	
	var	marcadores = MarcadoresVisiblesEnBounds(arrayMarcadores,mapa);	//carga lista de propiedades
	
	if(marcadores.length > 0){
		CargarInfoEnLista(marcadores);
	}else{		
		MsgSinPropiedadesEnLista();		
	}
		
}
/**********************************************/

function CargarPropiedadesDeUsuario(){//carga todas las propiedades de la BD	
	
	idUsuario = ObtenerParametroUrl('id');	
	
	ajax = $.post('php/cargarListaPropiedadesPorId.php', { id : idUsuario },
		function(data)
			{		
				objTodasPropiedades = JSON.parse(data);	
				
				if (objTodasPropiedades.length > 0 ){
					console.log(objTodasPropiedades.length);
					document.getElementById('viendoMapaDe').innerHTML = objTodasPropiedades[0].nombreUsuario;
					CargarMarkersEnMapa();//carga los marker en el mapa
				}else {
					var sideBar = document.getElementById('sidebar');
					sideBar.innerHTML = crear_mensaje_informativo('Este usuario no tiene Propiedades registradas');
				}			
									
			}).error(function() { console.log("error ajax"); });	
}
/*******************************************/
function CargarMarkersEnMapa(){
	
	var propiedades =  objTodasPropiedades;
	arrayMarcadores = [];//borra todos para meter los nuevos
	poligonosdeTerrenos = []; ////borra todos para meter los nuevos
	etiquetasprecio = [];//borra para meter los nuevas etiquetas
	
	var boundsAjustado = new google.maps.LatLngBounds ();
	
	for (var i = 0; i < propiedades.length; i++)
	{
		//console.log(propiedades[i].titulo);
		var pocision = new google.maps.LatLng(propiedades[i].lat,propiedades[i].lng);
		
		var marker = new google.maps.Marker({
		 map: mapa,
		 title: propiedades[i].titulo,
		 //animation: google.maps.Animation.DROP,
		 position: pocision
		});	
		
		var contenido = ArmarContenidoMarker(propiedades[i]);
			
		arrayMarcadores.push(marker);
		VincularEventoClickEnMarker(marker, contenido);
		VincularEventoMouseOverEnMarker(marker);
		etiquetasprecio.push(CrearEtiquetaPrecio('$' + propiedades[i].precio,pocision,15));
		
		if(propiedades[i].polygonPath != ''){
			poligonosdeTerrenos.push(CrearPoligono(propiedades[i]));		
		}
		
		boundsAjustado.extend (pocision);
	
	}	
	mapa.fitBounds (boundsAjustado);//ajusta el bounds	
	document.getElementById('cantidadPropiedades').innerHTML = propiedades.length + ' Propiedades en el mapa';
}

/******************************************************/



$(document).ready(function(e) {

	FormLoginAgregarEventoSubmit();//desde functions
	CargarSideLista();	
	VincularClickIrUbicacion();
	
	$('#formFiltros').submit(function (e){	
	
		e.preventDefault();		
		CrearCargandoEnListaSideBar();
		var datos = $(this).serialize();
		datos = datos + '&id=' + idUsuario;		
		
	    ajax = $.post('php/filtrarPropiedadesPorId.php', datos ,
		function(data)
			{	
				LimpiarMapa();	
				document.getElementById('listaSidebar').innerHTML = '';												
				objTodasPropiedades = JSON.parse(data);//guardamos un obj que tenga toda la coleccion
				//console.log('propiedades filtradas :' + objTodasPropiedades.length);
				
				if(objTodasPropiedades.length > 0){
					CargarMarkersEnMapa();//carga los marker en el mapa
				}else{ 
					arrayMarcadores = [];//si no hay resultados vacio el array
					poligonosdeTerrenos = [];//si no hay resultados vacio el array
					var lista = document.getElementById('listaSidebar');
					lista.innerHTML = crear_mensaje_informativo('No existen propiedades en tu filtro de busqueda, intenta de nuevo.');
					document.getElementById('cantidadPropiedades').innerHTML = "";  
				}				
								
			}).error(function() { console.log("error ajax"); });
		
	});	
	
	$(window).resize(function() {
        CalcularAltura();
    }).load(function() {
        CalcularAltura();
    })
	
});//end document ready