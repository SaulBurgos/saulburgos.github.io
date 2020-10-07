
var infoWindow = new google.maps.InfoWindow({
					maxWidth: 200,
					disableAutoPan: false
				});
				
var terrenoOptions = {
			clickable: false,
			strokeColor:'#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 1.5,
			editable: false,
			zIndex:1
	};
	
	
var OptionsMap = {
					center: new google.maps.LatLng(12.130461121301762, -86.19462686157226),
								zoom: 11,
								draggableCursor: 'auto',
								draggingCursor: 'move',
								streetViewControl: false,
								disableDoubleClickZoom: true,
								mapTypeId: google.maps.MapTypeId.ROADMAP,
								mapTypeControlOptions: {
														  //style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
														},
								
					};
					
var eventosClickArray = [];
					


/********************************************************/
function crear_cargando (){
	var carga = '<img src="img/loading.gif"/> <span class="label">Cargando...</span>';
	return carga;
}
/*************************************/
function crear_mensaje_informativo(mensaje)
{
			
  var mensaje_armado = '<div class="alert alert-info"><i class="icon-info-sign"></i> ' + mensaje + '</div>';
		
  return mensaje_armado;	
	
}

function crear_mensaje_error(mensaje)
{
						  
	 var mensaje_armado = '<div class="alert alert-error"><i class="icon-exclamation-sign"></i> ' + mensaje + '</div>';
						
	return mensaje_armado;
	
}


function crear_mensaje_exito(mensaje)
{
						  
	 var mensaje_armado = '<div class="alert alert-success"><i class="icon-ok"></i> ' + mensaje + '</div>';
						
	return mensaje_armado;
	
}
/***********************************************/
function SerializarPath (pathArrayMvc){
		
		var path='';
		var count = pathArrayMvc.getLength();//each shape has a type obj google
		
		for(var b = 0; b < count; b++)
		{
			var string = pathArrayMvc.getAt(b).toUrlValue();
			//string = string.replace(/\(|\)/g, ''); //para quitar los parentesis en caso de que no se use toUrlValue
			path = path + string
			
			if( b != count-1){
				path = path + ',';
			}
		}
		
		return path;
}

/***********************************************/
function StringToArrayMVC (pathString){

	var pathArray = pathString.split(",");
	var numberPoints = pathArray.length
	
	var path = new google.maps.MVCArray();
	
	for(var k = 0; k < numberPoints;k=k+2){			
		path.push (new google.maps.LatLng(pathArray[k],pathArray[k+1]));				
	}
	return path;
}

/*************************************************/
function FormLoginAgregarEventoSubmit(){

	$('#formLogin').submit(function (e){		
		
		var msgExito = $("#msgExitoSesion");	
		var datos = $(this).serialize();
		
		msgExito.empty().html(crear_cargando ());//imagen de carga de datos se quita cuando se le agrega texto		

		ajax = $.post('php/iniciarSesion.php', datos,
			function(data)
				{	
					if (data =='ok'){						
						location.reload();/*recarga la pagina*/	
					}else{
						msgExito.empty().html(data);
					}
								
				}
					
				).error(function() { console.log("error ajax"); });			
				
		
		//console.log(datos);	
		e.preventDefault();
	});
	
	
	
	$('#cerrarSesion').on('click',function(){ /*Terminar Sesion de usuario*/		
		
		ajax = $.post('php/cerrarSesion.php', 
			function(data)
				{	
					if (data =='ok'){						
						location.reload();/*recarga la pagina*/	
					}else{
						msgExito.empty().html(data);
					}
								
				}
					
				).error(function() { console.log("error ajax"); });	
		
	
	});
	
}

/**********************************************************/
function ObtenerParametroUrl(name)//get id in URL
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if(results == null)
    return "";
    else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

/*********************************************************/
//por ahora no se usa
function ObtenerParametrosQueryString(queryString){
	
	var qsParm = [];
	//var query = window.location.search.substring(1);
	queryString = queryString.replace(/\+/g, " "); 
	var parms = queryString.split('&');
	for (var i=0; i<parms.length; i++)
	 {
		var pos = parms[i].indexOf('=');		
		if (pos > 0){
		var key = parms[i].substring(0,pos);
		var val = parms[i].substring(pos + 1);
		qsParm[key] = val;
		}
		
	}
	return qsParm;	
}
/*************************************************************/
function ArmarContenidoMarker(propiedades){
	
	var imgPresentacion ='';
	var linkInfo = '';
	var linkAlbum = '';
	
	if (!propiedades.linkimg == '') {//si puse un link entonce insertar la imagen
		imgPresentacion = '<div>' + 
							'<a href="' + propiedades.linkimg + '" target="_blank" title="' + propiedades.titulo + '">' +
							 '<img alt="' + propiedades.titulo + '"class="imgPropiedad" src="' + propiedades.linkimg + '" /></a>' + 
							 '</div>';
	}

	if (!propiedades.linkInfo == ''){//si puse un link entonce insertar la imagen
		linkInfo = '<a class="label label-info" title="' + propiedades.titulo +
		 '" href="' + propiedades.linkInfo + '" target="_blank">Mas info</a>';
	}
	
	if (!propiedades.linkalbum == ''){//si puse un link entonce insertar album
		linkAlbum = '<a class="label label-info" title="' + propiedades.titulo + 
		'" href="' + propiedades.linkalbum + '" target="_blank">Ver album</a>';
	}
	
	var contenido = '<div class="infoPropiedades">' + imgPresentacion + '<span class="tituloPropiedadInfoWindows">' + propiedades.titulo + 
					'</span><br />' + '<span class="label label-important">$ ' + propiedades.precio + '</span><br />' +
					'<strong>En: </strong>' + propiedades.actividad + ' <strong>por: </strong>' + propiedades.nombreUsuario + 
					'<br /><strong>Tipo: </strong>' + propiedades.tipopropiedad + '<br /><strong>Area: </strong>' + 
					propiedades.area + ' ' + propiedades.tipoarea + '<br /><strong>Registrado: </strong>' + 
					propiedades.fecha_creacion + '.<br /><strong>Contacto: </strong>' + 
					propiedades.correo +' , ' + propiedades.telefonos + '<br /><br />' + 
					propiedades.descripcion + '<br />' + linkInfo + ' ' + linkAlbum +'</div>';
					
	return contenido;
}

/****************************************/

function RemoverEventoClickMarker(){
	
	for (l=0;l < eventosClickArray.length;l++)
	{
		google.maps.event.removeListener(eventosClickArray[l]);
	}
	eventosClickArray = [];
}

/**********************************/
function VincularEventoClickEnMarker(markerActual,contenido){

	google.maps.event.addListener(markerActual, 'click', function() {
		infoWindow.setContent(contenido);
		infoWindow.open(mapa, this);
	});

}


function VincularEventoMouseOverEnMarker(marker){

	google.maps.event.addListener(marker, 'mouseover', function() {
		this.setIcon(markerColor);
	});	
	
	google.maps.event.addListener(marker, 'mouseout', function() {
		this.setIcon(null);	
	});

}


/******************************************/
function CrearMarkerDeColor(){
	var markerImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "0C3",
	new google.maps.Size(21, 34),
	new google.maps.Point(0,0),
	new google.maps.Point(10, 34));
/*var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
	new google.maps.Size(40, 37),
	new google.maps.Point(0, 0),
	new google.maps.Point(12, 35));*/
	
	return markerImage;
	
}


/**********************************************/
function CrearPoligono (obj){
	
	var arrayPath = StringToArrayMVC (obj.polygonPath);
	
	var terreno = new google.maps.Polygon(terrenoOptions);	
	terreno.setPath(arrayPath);
	//terreno.setMap(mapa);		
	return(terreno);
	
}


/************************************************/

function CrearEtiquetaPrecio(texto,pocision ,zoomMin){
	
  		var mapLabel = new MapLabel({
          text: texto,
          position: pocision,
          map: mapa,
		  fontFamily:'Arial',
          fontSize: 12,
		  fontColor: '#FFF',
		  strokeWeight:4,
		  strokeColor:'#B90000',
          align: 'center',
		  minZoom:zoomMin ,
		  //zIndex:100
        });
		
		return mapLabel;
       
	/* mapLabel.set('position', new google.maps.LatLng(34.03, -118.235));

        var marker = new google.maps.Marker;
        marker.bindTo('map', mapLabel);
        marker.bindTo('position', mapLabel);
        marker.setDraggable(true);*/
	
}

/**********************************************/
function CargarSideLista(){	

	var sideBar = document.getElementById('sidebar');
		
	if( sideBar != null){//si el obj existe entonces
		sideBar.innerHTML = '<ul id="listaSidebar"></ul>';
	}		
	 
}
/***************************************/
function CrearCargandoEnListaSideBar(){
	document.getElementById('listaSidebar').innerHTML = crear_cargando ();
}

/*********************************************/
function MarcadoresVisiblesEnBounds(){
	
	var markerEnbounds = [];
	
	for (k=0;k < arrayMarcadores.length;k++)
	{
		if (mapa.getBounds().contains(arrayMarcadores[k].getPosition())){
			markerEnbounds.push(k);
		}	
	
	}
	return  markerEnbounds;	//retorna la posicion en el arreglo de los marker visibles
}

/************************************************/
function ArmarContenidoLi(obj){
	
/*	var div = document.createElement('div');  estaba haciendo el esfuerzo pero me dio pereza
	
	var linkalbum;
	
	if (!obj.linkalbum == ''){//si puse un link entonce insertar el album
		linkalbum = document.createElement('a');
		linkalbum.className = 'label label-info';
		linkalbum.setAttribute('title',obj.titulo);
		linkalbum.setAttribute('href',obj.linkalbum);
		linkalbum.setAttribute('target','_blank');
		linkalbum.innerHTML = 'Ver album';
	}
	
	var span = document.createElement('span');
	span.className = 'tituloPropiedadLi';
	
	var img = document.createElement('img');
	img.setAttribute('src','img/markerDefault2.png');
	img.setAttribute('alt',obj.titulo);
	
	span.appendChild(img);
	span.innerHTML = obj.titulo;	*/
	
	/**************************************/
	
	var linkalbum = '';
		
	if (!obj.linkalbum == ''){//si puse un link entonce insertar el album
			linkalbum = '<a class="label label-info" title="' + obj.titulo + 
						'" href="' + obj.linkalbum + '" target="_blank">Ver album</a>';
		}
	
	var content = '<span class="tituloPropiedadLi"><img src="img/markerDefault2.png" alt="' + obj.titulo + '"/>' + 
					' ' + obj.titulo + '</span><br /> En ' + obj.actividad + '<br />precio: <span class="label label-important">$ ' + 
					obj.precio + '</span>' + '<br />Tipo: ' + obj.tipopropiedad + '<br />Area: ' + obj.area + ' ' + 
					obj.tipoarea + '<br />Registrado: ' + obj.fecha_creacion + 
					'<br /><span class="label label-info irUbicacion">Ver ubicacion</span> ' + linkalbum ;				   
				  
	
	return content;
}

/*************************************/
function CargarInfoEnLista(objs){
	//como los marcadores se guardar en las mismas posiciones de los objetos se pueden hacer referencia por ahi
	//var contenido = '';		
	var ul = document.getElementById('listaSidebar');
	
	if (ul != null){//hay un bounds_change cuando se agregar ubicacion y no esta la lista en el dom	
		
		ul.innerHTML='';	
		
		for ( t =0; t < objs.length; t++)
		{
			var contenido = '';
			contenido = contenido + ArmarContenidoLi(objTodasPropiedades[objs[t]]);						
			var li = document.createElement('li');
			li.innerHTML = contenido;
			
			var scriptCall = 'MostrarInfo(' + objs[t] + ')';
			li.setAttribute('onclick', scriptCall);
			li.setAttribute('title','Click para ver informacion sobre la propiedad');
			li.setAttribute("data-Marker",objs[t]);						
			ul.appendChild(li);			
			//VincularEventoMouseoverLi(li);// por ahora no lo uso podria usarlo en el futuro
			
		}
		
	}	//end if
	
}
/*******************************************/
//function para vincular alguna accion en el mouse over de los li
//por ahora no lo uso mas adelante podria usarlo usarlo
function VincularEventoMouseoverLi(li){
	
	$(li).mouseover(function() {				
		var i = this.getAttribute("data-marker");		
		arrayMarcadores[i].setAnimation(google.maps.Animation.BOUNCE);					
	}).mouseleave(function() {		
		var k = this.getAttribute("data-marker");		
		arrayMarcadores[k].setAnimation(null);	
	});
	
}

/***************************************************/
function MsgSinPropiedadesEnLista(){
	
	var ul = document.getElementById('listaSidebar');
	
	if (ul != null){//hay un bounds_change cuando se agregar ubicacion y no esta la lista en el dom	
		
		ul.innerHTML = ''		
		contenido = crear_mensaje_informativo('No encontramos propiedades por esta zona, Sigue buscando!!');						
		var li = document.createElement('li');
		li.innerHTML = contenido;
		li.setAttribute('title','Sin propiedades en la zona');				
		ul.appendChild(li);
		
	}	//end if
	
}
/************************************************/
function MostrarInfo(p){
	//OJO aqui funciona por que los dos script customfuncion y customMapausuatio tiene el mismo nombre de la 
	//variable global arrayMarcadores, si no no funcionaria y como se cargan individual en cada pagina trabaja bien 
	//hay que tener cuidado si se unen
	google.maps.event.trigger(arrayMarcadores[p], 'click');
}
/****************************************************/

function VincularClickIrUbicacion(){
	//OJO aqui funciona por que los dos script customfuncion y customMapausuatio tiene el mismo nombre de la 
	//variable global arrayMarcadores y mapa	
	$('#sidebar').on( 'click', '.irUbicacion',  function(){
		// probar en el futuro panToBounds talvez es mas bonito que setCenter()
		var i = $(this).parent().attr("data-marker");		
		mapa.setCenter(arrayMarcadores[i].getPosition());
		mapa.setZoom(16);
		
	});	
	
}
/************************************************/

//OJO aqui funciona por que los dos script customfuncion y customMapausuatio tiene el mismo nombre de la 
//variable global poligonosEnMapa y mapa ,poligonosdeTerrenos
function MostrarPoligonos (){
	
	if(!poligonosEnMapa){
		
		for(var t = 0; t < poligonosdeTerrenos.length; t++)
		{
			poligonosdeTerrenos[t].setMap(mapa);
		}
		poligonosEnMapa = true;
	}
	
}

function EsconderPoligonos(){
	
	if(poligonosEnMapa){
	
		for(var t = 0; t < poligonosdeTerrenos.length; t++)
		{
			poligonosdeTerrenos[t].setMap(null);
		}
		poligonosEnMapa = false;
	}
	
}
/*****************************************************/

//OJO aqui funciona por que los dos script customfuncion y customMapausuatio tiene el mismo nombre de la 
//variable global arrayMarcadores  y mapa ,poligonosdeTerrenos
function LimpiarMapa(){
	
	if (markerTemp){//si ya existe un markertemp entonces quitarlo
		markerTemp.setMap(null);
	}
	
	for (m in arrayMarcadores ){//quita todos los marker del mapa
		arrayMarcadores[m].setMap(null);	
	}
	
	for (k in poligonosdeTerrenos ){//quita todos los poligonos del mapa
		poligonosdeTerrenos[k].setMap(null);	
	}	
	
	for (t in etiquetasprecio ){//quita todas las etiquetas del mapa
		etiquetasprecio[t].setMap(null);	
	}
	
	if(markerClusterer){//limpia el cluster
		markerClusterer.clearMarkers();	
	}
	
	
}

/******************************************/

function CrearDivNumeroPropiedades(){
	
	var contenedorDiv = document.createElement('div');
	//contenedorDiv.style.marginTop = '10px';
	
	/*var controlDiv = document.createElement('div');
	controlDiv.setAttribute('id','cantidadPropiedades');
	controlDiv.title = 'Cantidad de propiedades';*/
	
	var controlSpan = document.createElement('span');
	controlSpan.setAttribute('id','cantidadPropiedades');
	controlSpan.title = 'Cantidad de propiedades';
	controlSpan.className = 'label label-important';	
	controlSpan.style.marginTop = '10px';
	
	contenedorDiv.appendChild(controlSpan);
	/*google.maps.event.addDomListener(controlDiv, 'click', function() {
	  alert('click');
	});*/
	
	//controlDiv.index = 100;
	mapa.controls[google.maps.ControlPosition.TOP_LEFT].push(controlSpan);
	
}

/*****************************************************/

function CalcularAltura (){	
	//120 el calculo que saque que miden el footer y el navbar con los filtros
	var altura = $(window).height();
	$('#googleMap ,#sidebar').height(altura -120);	
	
}

/****************************************************/

function CargarPaises (){

	$.get('php/paises.php', 
		function(data)
			{						
				paises = JSON.parse(data);	//variable global				
			}).error(function() { console.log("error ajax al cargar paises"); });

}

/*********************************************************/

function VerificarUbicacionPais (latLng) {

	var paisSeleccionado = document.getElementById('selectPaisFormAgregar').value;
	var objPais;
	
	for (var i = 0;i < paises.length; i++)
	{
		if(paises[i].pais == paisSeleccionado) {//variable pais global		
			objPais = paises[i];		
		}
	}	
	
	var result = IsInsideArea (latLng , objPais);	
	return (result);
}

function MinBoundingBox (paths) {//recibe un mvc array

	//var paths = this.polygon.getPath();
	var bounds = new google.maps.LatLngBounds();
	
	for (var i = 0;i < paths.getLength(); i++)
	{
		bounds.extend(paths.getAt(i));
	}
	
	return bounds;
}


function IsInsideArea (latLng ,objPais) {

	var pathArrayMvcPais = StringToArrayMVC(objPais.path_poligono);
	var bounds = MinBoundingBox(pathArrayMvcPais);//pasarle primero el paths del poligono

	if(bounds != null && !bounds.contains(latLng))
	{
		return false;
	}

	// Raycast point in polygon method
	//var path = this.polygon.getPath();
	var path = pathArrayMvcPais;
	var numPoints = path.getLength();
	var inPoly = false;
	var j = numPoints-1;

	for(var i=0; i < numPoints; i++)
	{ 
		var vertex1 = path.getAt(i);
		var vertex2 = path.getAt(j);

		if (vertex1.lng() < latLng.lng() && vertex2.lng() >= latLng.lng() || vertex2.lng() < latLng.lng() && vertex1.lng() >= latLng.lng())
		{
			if (vertex1.lat() + (latLng.lng() - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < latLng.lat())
			{
				inPoly = !inPoly;
			}
		}

		j = i;
	}

	return inPoly;
}