function Poligono(mapa)
{ 
	this.polyline;
	this.polygon;
	//this.path;
	this.tmpPolyline;
	this.ultimoPunto;
	this.eventoClick;
	this.eventoMousemove;
	this.eventoDobleClick;
	this.dibujoFinalizado;
	
				
	this.polylineOptions = {
		//tiene que se false por que si no el click se interpone en el click del mapa
		clickable: false,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 1.5
	};
	
	this.polygonOptions= {
			clickable: false,
			strokeColor:'#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 2,
			editable: true
	};	
	
	this.ini = function (){
		
		this.dibujoFinalizado = false;
		
		this.polyline = new google.maps.Polyline(this.polylineOptions);		
		this.polyline.setMap(mapa);	
		
		this.tmpPolyline = new google.maps.Polyline(this.polylineOptions);		
		this.tmpPolyline.setMap(mapa);	
		
		this.polygon = new google.maps.Polygon(this.polygonOptions);	
		this.polygon.setMap(mapa);
		
		this.VincularEventoClick();
		this.VincularEventoMouseMove();
		this.VincularEventoDobleClick();
		
	}
	
	this.VincularEventoClick = function(){		
		that = this;	
		this.eventoClick = google.maps.event.addListener(mapa, 'click', function(e) {			
			that.polyline.getPath().push(e.latLng);		
			that.ultimoPunto = (that.polyline.getPath().getLength() - 1);//para poder dibujar la polylinea			
			//console.log('click event poligono');			
		});		
	}
	
	this.VincularEventoMouseMove = function(){	
		that = this;	
		this.eventoMousemove = google.maps.event.addListener(mapa, 'mousemove', function(e) {			
			that.DibujandoPolylineTemp(e.latLng);		
		});		
	}
	
	
	this.VincularEventoDobleClick = function(){	
		
		that = this;	
		this.eventoDobleClick = google.maps.event.addListener(mapa, 'dblclick', function(e) {			
									
			if(that.polyline.getPath().length > 2){//solo si es mas de 2 puntos
				
				that.CancelarTodosEventos();												
				that.polygon.setPath(that.polyline.getPath());
				that.polyline.setMap(null);	
				that.tmpPolyline.setMap(null);	
				that.dibujoFinalizado = true;			
				//console.log('Dobleclick event poligono');
				
				$('#botonDibujarTerreno').trigger('click');//simulo click en el boton
				
			}
			
				
		});		
	}
	
	
	this.DibujandoPolylineTemp = function(latLng){
		
		if(this.polyline.getPath().length > 0){	
			 var path = this.polyline.getPath();		
			that.tmpPolyline.setPath([path.getAt(this.ultimoPunto), latLng]);//pasamos 2 puntos
			//console.log('evento mousemove');			
		}
		
	}
	
	
	this.CancelarTodosEventos = function(){
		google.maps.event.removeListener(this.eventoMousemove);
		google.maps.event.removeListener(this.eventoClick);
		google.maps.event.removeListener(this.eventoDobleClick);
		//console.log('eventos cancelados');
	}
	    
	this.ReiniciarDibujo = function(){
		this.polygon.setMap(null);
		this.polyline.setMap(null);
		this.tmpPolyline.setMap(null);
		//si no los reiniciaba aqui se portaba raro como que hacian un arreglo de eventos
		this.CancelarTodosEventos();
		this.ini(); 
	}
	
	
	
	this.CentroidLatLng = function()
	{
		var resultLat = 0;
		var resultLng = 0;
		this.polygon.getPath().forEach(function(element,index){
			resultLat += element.lat();
			resultLng += element.lng();
		});
		resultLat = resultLat / this.polygon.getPath().getLength();
		resultLng = resultLng / this.polygon.getPath().getLength();
		
		return new google.maps.LatLng(resultLat,resultLng);
	}
	
}//final clase