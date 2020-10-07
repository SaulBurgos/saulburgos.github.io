/*hay un error cuando la pagina carga y el usuario da click rapido en agregarubicacion entonces se quita la ul y como al rato se dispara un bounds changed al inicio
quiere meter los elementos en la lista queno exite*/

var mapa;
var markerTemp;
var arrayMarcadores = [];
var objTodasPropiedades;
var poligonosdeTerrenos = [];
var eventoDobleClickMarkerTemp;
var timerMarker;
var timerPoligonos;
var poligonosEnMapa = false;
var poligono;
var dibujandoPoligono = false;
var agregandoUbicacion = false;
var markerColor;
var markerClusterer;
var etiquetasprecio = [];
var paises;				

function cargarMapa(){
	
	mapa = new google.maps.Map(document.getElementById("googleMap"),OptionsMap);	
	poligono = new Poligono(mapa);// creamos un obj de la clase	para dibujar los terrenos
	CargarSideLista();//crea el ul para meter los li
	CargarPaises ();//carga los obj de los paises , se graba en paises 
	markerColor = CrearMarkerDeColor();		
	
	//cuando el mapa esta listo
	google.maps.event.addListenerOnce(mapa, 'idle', function(){
		CargarPropiedadesBD();//carga todas la propiedades de la BD	
		CrearDivNumeroPropiedades();// esta en funciones
	});
	
	google.maps.event.addListener(mapa, 'bounds_changed', function() {	
		
		if(arrayMarcadores.length > 0){//previene que se llame si no hay marcadores 
			clearTimeout(timerMarker);
			CrearCargandoEnListaSideBar();
			timerMarker = setTimeout('ActualizarLista()',1200);
			//console.log('turn on timerMarker');							
		}	
		
		if(poligonosdeTerrenos.length > 0 && agregandoUbicacion == false ){//previene que se llame si no hay terrenos 		
		
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
		
		
		if (agregandoUbicacion == true && dibujandoPoligono == false){	
			markerTemp.setPosition(mapa.getCenter());		
			//console.log('esta el marker temp en pantalla');			
		}else{  }
		
	});
	
}

/********************/
function ActualizarLista(){
	
	var	marcadores = MarcadoresVisiblesEnBounds();	//carga lista de propiedades	
	if(marcadores.length > 0){
		CargarInfoEnLista(marcadores);
	}else{		
		MsgSinPropiedadesEnLista();		
	}
		
}

/******borrar esta funcion es solo para pruebas que estaba haciendo ************/

function PruebasFechas () {
//obj date usa la hora del navegador local y todos sus resultados
	var resultado;

	resultado = new Date();
	
	var month = 6; // Month 10, in zero based system, is November
	var day = 25;
	var year = 2012;
	var objDate = new Date(year,month,day); // time is set to zero by default
	
	//console.log(resultado);
	//console.log(resultado.getMonth());//obtiene el mes basado en 0
	//console.log(resultado.getDate());//obtiene dia del mes
	//console.log(resultado.getDay());//obtiene el dia de la semana basado en 0 domingo es cero
	//console.log(objDate);
	
	//var futureDate = new Date();
	//futureDate.setDate(futureDate.getDate() + 10);//suma 10 dias a la fecha actual
	//console.log(futureDate);
	
	//var futureDate = new Date();
	//console.log(futureDate);
	//futureDate.setMonth(futureDate.getMonth() + 1);//suma 10 dias a la fecha actual
	//console.log(futureDate);
	
	//para obtener fechas semanales segun mis calculos solo basta sumar 7 dias desde la fecha indicada
	
}

/**********************/

/*******************/
$(document).ready(function(e) {
	
	//PruebasFechas ();
	
	$('#menuNavTop').load('plantilla/barraNavegacion.php',function(){		
		FormLoginAgregarEventoSubmit();// desde funcion.js	 
		AgregarUbicacionEvent();//agregamos el evento click 		
	});
	
	//en el futuro moverlo a un script solo para la pagina registro
	$('#formRegistro').submit(function (e){		
	
		var msgExito = $("#msgExitoFracaso");	
		var datos = $(this).serialize();		
		var ajax;
		
		msgExito.empty().html( crear_cargando ());//imagen de carga de datos se quita cuando se le agrega texto		
				
		ajax = $.post('php/registrar.php', datos,
				function(data)
					{
						if (data =='ok'){
							msgExito.empty();
							document.getElementById('formRegistro').innerHTML = 'Gracias por Registrarte , Ahora puedes iniciar sesion y publicar propiedades|.';
							//window.location.replace("index.php");
							//location.reload();/*recarga la pagina*/	
						}else{
							msgExito.empty().html(data);
						}
									
					}
						
					).error(function() { console.log("error ajax"); });	
				
		e.preventDefault();
	});
	
	VincularClickIrUbicacion();
	
	
	$('#formFiltros').submit(function (e){	
	
		e.preventDefault();		
		CrearCargandoEnListaSideBar();
		var datos = $(this).serialize();
		
		ajax = $.post('php/filtrarPropiedades.php', datos ,
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
	
	//le da la altura a los div
	$(window).resize(function() {
        CalcularAltura();
    }).load(function() {
        CalcularAltura();
    })
	
});//end document ready

/**************/

function CargarMarkersEnMapa(){
	
	var propiedades =  objTodasPropiedades;
	arrayMarcadores = [];//borra todos para meter los nuevos
	poligonosdeTerrenos = []; //borra todos para meter los nuevos
	etiquetasprecio = [];//borra para meter los nuevas etiquetas
	
	var boundsAjustado = new google.maps.LatLngBounds ();
	
	for (var i = 0; i < propiedades.length; i++)
	{
		//console.log(propiedades[i].titulo);
		var pocision = new google.maps.LatLng(propiedades[i].lat,propiedades[i].lng);
		
		var marker = new google.maps.Marker({
		 map: mapa,
		 title: propiedades[i].titulo,
		/* icon: pinImage,
		 shadow: pinShadow,*/
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
	
	markerClusterer = new MarkerClusterer(mapa, arrayMarcadores,{//cluster
		/*'gridSize': 100,*/
		'zoomOnClick': true,
		'maxZoom':13
	});
	
}

/************************/

function CargarPropiedadesBD(){//carga todas las propiedades de la BD	
	crear_cargando ();
	ajax = $.post('php/cargarListaPropiedades.php', //pasar a get es mas rapido
		function(data)
			{
				//console.log(JSON.parse(data));
				objTodasPropiedades = JSON.parse(data);//guardamos un obj que tenga toda la coleccion
				//console.log(objTodasPropiedades);
				CargarMarkersEnMapa();//carga los marker en el mapa
									
			}).error(function() { console.log("error ajax"); });
	
}

/*********************/

function AgregarUbicacionEvent(){
	
	$('#agregarUbicacion').on('click',function (e) /*click agregar ubicacion*/
		{
			//if(!dibujandoPoligono){
				e.preventDefault();
				MarkerAgregarUbicacion();//poner markerTemp
				VincularEventosMapa(); //poner evento
				PonerformAgregarUbicacion();//poner el formulario				
				poligonosEnMapa = false;
				agregandoUbicacion = true;
				$(this).hide();
				$('#ContenedorFiltrosMapa').hide();
				document.getElementById('cantidadPropiedades').innerHTML = 'Arrastra el marcador o doble click para ubicarlo';
				mapa.setMapTypeId(google.maps.MapTypeId.HYBRID);//cambia el tipo de mapa hibrido
			//}else { console.log('Estas dibujando no puedo hacer eso');}
			
	});	
}

/**************************************/

function MarkerAgregarUbicacion(){
	
	LimpiarMapa();
	
	arrayMarcadores = [];//reinicia el array
	
	var marker = new google.maps.Marker({
					position: mapa.getCenter(),
					animation: google.maps.Animation.BOUNCE,
					map: mapa,
					draggable: true,
					title: 'Ubicame'
					});
					
	//infoWindow.setContent('<br /><i class="icon-info-sign"></i><strong>Muevete y acercate en el mapa y con doble click o arrastrandome puedes colocarme en tu' +
	//						' propiedad ,Tienes que ser exacto para que los usuarios sepan donde esta ubicada tu propiedad , despues escribe la informacion en el panel izquierdo.</strong>');
	
	infoWindow.setContent('<br /><i class="icon-info-sign"></i><strong>&nbsp;Ubicame en tu propiedad</strong>');
	
	//infoWindow.open(mapa, marker);//abre el infowindows
	markerTemp = marker;//guardamos el marker	
	
	google.maps.event.addListener(marker, 'click', function(event) {
		infoWindow.open(mapa,this);
	});	

}

/************************/
function VincularEventosMapa(){	
/* los ui event pasan argumentos que pueden ser accedidos atraves del addlistener en este ejemplo el evento click pasa
el eventmouse que contiene la propiedad latLng que tiene la localizacion en el mapa donde se hizo click , se puede acceder
a estos datos de la misma manera que un objeto*/
	//if (!agregandoUbicacion){
		
		eventoDobleClickMarkerTemp = google.maps.event.addListener(mapa, 'dblclick', function(event) {
				markerTemp.setPosition(event.latLng);/*se llama a la funcion pasandola la coordenadas que devuelve el evento ui*/
				//console.log('evento doble click');
		});
							
		
		//console.log('agregado el evento doble click');
	//}

	
}
/************/
function PonerformAgregarUbicacion(){	

	$('#sidebar').empty().load('plantilla/formAgregarUbicacion.php',function(){//cuando se termine de carga 
		
		$('#formAgregarUbicacion').submit(function (e){
			
			e.preventDefault();	
			var msgExito = $("#msgExitoGuardarUbicacion");	
			
			if (!VerificarUbicacionPais(markerTemp.getPosition())) {
				
				msgExito.empty().html(crear_mensaje_error('La ubicacion de tu marcador no esta dentro del pais seleccionado'));
				return ;
			}
			
			
			var datos = $(this).serialize();
			var cadenalatLng = markerTemp.getPosition().toUrlValue();
			var arrayLatLng = cadenalatLng.split(",",2);
			var polygonPath = '';
			
			if(poligono.dibujoFinalizado){//si el poligono esta listo
				polygonPath = SerializarPath(poligono.polygon.getPath());				
				//console.log('Poligono Guardado');								
			}
			
			datos = datos + '&lat=' + arrayLatLng[0] + '&lng=' + arrayLatLng[1] + '&poligonoPath=' + polygonPath;		
					
			msgExito.empty().html(crear_cargando ());			
			//console.log(datos);
	
			ajax = $.post('php/guardarUbicacion.php', datos ,
				function(data)
					{	
						if (data =='ok'){						
							msgExito.empty().html(crear_mensaje_exito('Propiedad Guardada'));
							
							setTimeout("CargarPropiedadesBD()",300);//carga la lista de la base de datos
							CargarSideLista();
							markerTemp.setMap(null);							
							agregandoUbicacion = false;//no esta agregando
							
							if(poligono.dibujoFinalizado){//si hay un terreno dibujado entonce quitarlo despues de guardar
								poligono.polygon.setMap(null);	
							}			
							
							$('#agregarUbicacion').show();
							$('#ContenedorFiltrosMapa').show();
							
							google.maps.event.removeListener(eventoDobleClickMarkerTemp);
							mapa.setMapTypeId(google.maps.MapTypeId.ROADMAP);//cambia el tipo de mapa hibrido
						}else{
							msgExito.empty().html(data);
						}
									
					}).error(function() { console.log("error ajax"); });
			
					
		});	//end submit	
		
			
		$('#cancelarAgregarUbicacion').on('click',function (e) /*cancela la operacion de agregado*/
		{								
			CargarSideLista();
			CargarMarkersEnMapa();			
			markerTemp.setMap(null);			
			google.maps.event.removeListener(eventoDobleClickMarkerTemp);			
			$('#agregarUbicacion').show();
			$('#ContenedorFiltrosMapa').show();
			
			//si el dibujo estaba completo pero cancelo despues
			if(poligono.dibujoFinalizado){
				poligono.polygon.setMap(null);
				poligono.dibujoFinalizado = false;
			}
			
			if(dibujandoPoligono){//si estaba dibujando
				poligono.CancelarTodosEventos();
				poligono.polygon.setMap(null);	
				poligono.polyline.setMap(null);	
				poligono.tmpPolyline.setMap(null);	
				dibujandoPoligono = false;				
			}
			
			mapa.setMapTypeId(google.maps.MapTypeId.ROADMAP);//cambia el tipo de mapa hibrido
			agregandoUbicacion = false;//ya dejo de estar agregando
			
		});	
		
		
		
		$('#selectPaisFormAgregar').change(function(){
			
			var paisSeleccionado = $(this).attr('value');
			
			for (var i = 0;i < paises.length; i++)
			{
				if(paises[i].pais == paisSeleccionado) {//variable pais global		
					
					var stringLatLng =  paises[i].center.split(",");
					var centro = new google.maps.LatLng(stringLatLng[0],stringLatLng[1]);
					mapa.setZoom(6);
					mapa.setCenter(centro);//centro el mapa					
				}
			}	
			
		});
		
		
		$('#selectTipoPropiedad').change(function(){
			
			var propiedadSeleccionada = $(this).attr('value');			
						
			if(propiedadSeleccionada == 'lote' || propiedadSeleccionada == 'terreno' || propiedadSeleccionada == 'finca/hacienda'){
				
				$('#contenedorBotonDibujarTerreno').show('slow');
				
			}else{
				$('#contenedorBotonDibujarTerreno').hide('normal');
				
				//si ya se dibujo una vez y volvio de nuevo
				if(poligono.dibujoFinalizado){
					poligono.polygon.setMap(null);
					poligono.dibujoFinalizado = false;
				}
			}
			
		});
		
		
		$('#botonDibujarTerreno').on('click',function (e){			
			e.preventDefault();	
			
			if ($(this).text() == 'Dibujar terreno'){
								
				$(this).toggleClass('btn-success');//cambio de color
				$(this).text('Finalizar');//cambio de texto	
				$('#botonReiniciarTerreno').show();
				$('#selectTipoPropiedad').attr('disabled','disabled');
				$('#BotonAgregarUbicacionForm').hide();
				
				google.maps.event.removeListener(eventoDobleClickMarkerTemp);
				
				//si ya se dibujo una vez y volvio de nuevo
				if(poligono.dibujoFinalizado){
					poligono.polygon.setMap(null);
				}
				
				poligono.ini();	
				dibujandoPoligono = true;			
				markerTemp.setMap(null);//Quita el marker
				
			}else{//finalizar dibujo , es cuando le dan click en finalizar
				$('#botonReiniciarTerreno').hide();
				$(this).toggleClass('btn-success');//cambio de color
				$(this).text('Dibujar terreno');//cambio de texto
				$('#selectTipoPropiedad').removeAttr('disabled');
				$('#BotonAgregarUbicacionForm').show();
					
				dibujandoPoligono = false;
				//cancela todos los eventos globales por eso va primero 
				poligono.CancelarTodosEventos();
				poligono.polyline.setMap(null);	
				poligono.tmpPolyline.setMap(null);					
				
				MarkerAgregarUbicacion(); //ponemos el evento de nuevo
				VincularEventosMapa();				
				
				if(poligono.dibujoFinalizado){//solo si el poligono se finalizo centrar el marker
					var centroide = poligono.CentroidLatLng();
					markerTemp.setPosition(centroide);//centra el marker en el centro del poligono
				}
				
				
				//metros cuadrados
				//var area = google.maps.geometry.spherical.computeArea(poligono.polygon.getPath());
				//console.log(Math.round(Number(area)));
				//infoWindow.setContent(area);
				
			}		
			
		});
		
		$('#botonReiniciarTerreno').on('click',function (e){			
			e.preventDefault();
			poligono.ReiniciarDibujo();			
		});
				
	});//end load
}//end function PonerformAgregarUbicacion

/********************************************/
/********************************************/
/********************************************/
/********metodos para usarlo en el futuro para geolocacion********************/
function GeolocalizarUsuario(){
	navigator.geolocation.getCurrentPosition(mostrar,error);	
}

function mostrar(posicion){
	
	var lat = posicion.coords.latitude; //obtengo la latitud
	var lon = posicion.coords.longitude; //obtengo la longitud
	
	console.log("Te he encontrado, estas en: " + lat + " , " + lon);
}

 function error(error){
	console.log("No te encontre, pero lo voy a seguir intentando.");
}




function GetState(latLng) {
    
    //var latlngArray = latLngString.split(",",2);
    //var lat = parseFloat(latlngArray[0]);
    //var lng = parseFloat(latlngArray[1]);
    //var latlng = new google.maps.LatLng(lat, lng);
	
	//service google of geocoding
	geocoder = new google.maps.Geocoder();
	
	//method reverse geocoding
	geocoder.geocode({'latLng': latLng}, function(results, status) {
		
		if (status == google.maps.GeocoderStatus.OK) {

			for (var component in results[0]['address_components']) 
			{
				for (var i in results[0]['address_components'][component]['types']) 
				{
					//each obj address_components have the obj "type"S this type are tags (consult refence)
					if (results[0]['address_components'][component]['types'][i] == "administrative_area_level_1") {
						
						state = results[0]['address_components'][component]['short_name'];
			
						printStateLink(state);
						
					}
				}
			}
			
		} else {		
		console.log("Geocoder failed due to: " + status);		
		}
	});
 }