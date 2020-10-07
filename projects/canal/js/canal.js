/**
* Created with canal.
* User: SaulBurgos
* Date: 2014-07-29
* Time: 06:58 PM
* To change this template use Tools | Templates.
*/
var canalApp = new function() {	
	"use strict";
	//private variable
	var that = this;	
	this.map;
	this.infoWindow;
	this.drawingManager;
	this.ruler = {};

	this.activeTools = { 
		ruler : false
	};

	this.mapOptions = {
		center: new google.maps.LatLng(12.3890, -85.9303),
		zoom: 8, 
		mapTypeId: google.maps.MapTypeId.HYBRID ,
		draggable : true
	};
	this.customOverlay;
	this.routeOnMap;
	this.routeSymbol = {
 		path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
 		scale: 3,
 		strokeColor: '#0085E6'
	};
	
	this.routeOnMapOptions = {
		geodesic: false,
		editable: true,
		strokeColor: '#37FF25',
		strokeOpacity: 1.0,
		strokeWeight: 2,
	 	icons: [{
		   icon: this.routeSymbol,
		   offset: '0%'
	 	}]
  	};

	this.geoJsonFeatureOnMap;
	this.currentLocation;

	this.imagesMap = [
		{
			name : 'HKND 07/07/2014 (oficial)',
			pathString: '11.321189,-85.968829,11.335285,-85.964966,11.349044,-85.957327,11.376561,-85.941362,11.383145,' + 
			'-85.934153,11.389225,-85.926085,11.39177,-85.916301,11.393474,-85.907031,11.392717,-85.895015,11.382367,' + 
			'-85.871841,11.372585,-85.852078,11.368609,-85.839525,11.36823,-85.828324,11.371386,-85.814377,11.377908,' + 
			'-85.804206,11.420671,-85.748394,11.424057,-85.739962,11.426118,-85.730306,11.425193,-85.717345,11.353673,' + 
			'-85.495731,11.318664,-85.203219,11.306209,-85.104342,11.283651,-84.927188,11.338778,-84.788357,11.359438,' + 
			'-84.741086,11.363035,-84.700113,11.365338,-84.668983,11.3675,-84.659598,11.371681,-84.652959,11.411563,-84.606525,' + 
			'11.433437,-84.570303,11.464394,-84.517432,11.504894,-84.447094,11.50687,-84.435636,11.504432,-84.418384,11.485423,' + 
			'-84.292213,11.508721,-84.214192,11.527476,-84.178229,11.537862,-84.119178,11.557351,-84.057379,11.570038,-84.017125,' + 
			'11.570616,-84.004595,11.559811,-83.97567,11.55136,-83.961422,11.510403,-83.920652,11.496189,-83.905159,11.48904,' + 
			'-83.890181,11.488199,-83.875354,11.490554,-83.8619,11.495811,-83.851322,11.502077,-83.843489,11.535044,-83.79817,' + 
			'11.538745,-83.789244,11.541437,-83.779975,11.541311,-83.767916,11.539502,-83.75826,11.489965,-83.633719',
			img: 'img/07072014_oficial.jpg',
			bounds: new google.maps.LatLngBounds(
	   		new google.maps.LatLng(10.629728450718241, -86.30942138671878),
	   		new google.maps.LatLng(12.00105004496645, -83.40765747070327))
		},
		{
			name : 'HKND 07/07/2014 (entrada caribe)',
			pathString: '',
			img: 'img/entrada_caribe.jpg',
			bounds: new google.maps.LatLngBounds(
	   		new google.maps.LatLng(11.362393164152538, -84.00915893554702),
	   		new google.maps.LatLng(11.690666888018928, -83.56215270996108))
		},
		{
			name : 'HKND 09/07/2014 (Atlanta-Tule)',
			pathString: '',
			img: 'img/atlanta_tule.jpg',
			bounds: new google.maps.LatLngBounds(
	   		new google.maps.LatLng(11.36330629845264, -84.39910737304683),
	   		new google.maps.LatLng(11.690712490053174, -83.95278857421886))
		},
		{
			name : 'HKND 09/07/2014 (Atlanta-Tule2)',
			pathString: '',
			img: 'img/atlanta_tule2.jpg',
			bounds: new google.maps.LatLngBounds(
	   		new google.maps.LatLng(11.276838704375768, -84.78877869873043),
	   		new google.maps.LatLng(11.604244895976302, -84.34245989990245))
		},
		{
			name : 'HKND 09/07/2014 (Lago Nicaragua)',
			pathString: '',
			img: 'img/lago_nicaragua.png',
			bounds: new google.maps.LatLngBounds(
	   		new google.maps.LatLng(10.975410177122301, -85.74184266357418),
	   		new google.maps.LatLng(11.718145816106937, -84.68303607177745))
		},
		{
			name : 'HKND 09/07/2014 (Entrada pacifico)',
			pathString: '',
			img: 'img/entrada_pacifico.jpg',
			bounds: new google.maps.LatLngBounds(
	   		new google.maps.LatLng(11.220637422808743, -86.08791199951168),
	   		new google.maps.LatLng(11.546025362268367, -85.65635607910167))
		}
	];

	this.locations = [
		{
			name: 'Nicaragua',
			position: new google.maps.LatLng(12.3890, -85.9303),
			zoom: 8
		},
		{
			name: 'Rio Brito',
			position: new google.maps.LatLng(11.3462, -85.9791),
			zoom: 13
		},
		{
			name: 'Punta Gorda',
			position: new google.maps.LatLng(11.5104, -83.7774),
			zoom: 13
		},
		{
			name: 'Monkey Point',
			position: new google.maps.LatLng(11.594773, -83.659796),
			zoom: 13
		},
		{
			name: 'Las Lajas',
			position: new google.maps.LatLng(11.390295, -85.767460),
			zoom: 13
		},
		{
			name: 'Refugio de Vida Silvestre Los Guatuzos',
			position: new google.maps.LatLng(11.037114, -84.937148),
			zoom: 13
		},
		{
			name: 'Reserva Natural Cerro Silva',
			position: new google.maps.LatLng(11.735476, -84.016751),
			zoom: 13
		},
		{
			name: 'Archipiélago de Solentiname ',
			position: new google.maps.LatLng(11.188099, -85.002566),
			zoom: 13
		},
		{
			name: 'Archipiélago de Solentiname ',
			position: new google.maps.LatLng(11.345098, -84.655700),
			zoom: 13
		}				
	];	

	this.twitterWidget = '<a style="margin-top:10px;" class="twitter-timeline" href="https://twitter.com/hashtag/CanalNi" data-widget-id="548695528918495232">' + 
                  'Cargando twitter en #CanalNi, Espere por favor...' + 
                   '<img src="img/loading.gif" />' +
               '</a>';

   this.timeLine = {
   	news2014: '<iframe src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=0Aq3IfOduqCJudGVHR29CNnptUkdRblRaNmI4dWo3VVE&font=Bevan-PotanoSans&maptype=toner&lang=es&start_at_end=true&debug=true&height=630"' + 
		  ' width="100%" height="100%" frameborder="0"></iframe>',
		news2015: '<iframe src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=0Aq3IfOduqCJudE85cHlyNjB5bkJqMHFEamdSVVk0b1E&font=Bevan-PotanoSans&maptype=toner&lang=es&start_at_end=true&debug=true&height=630"' + 
		  ' width="100%" height="100%" frameborder="0"></iframe>',
	  	news2016: '<iframe src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1UqQzBWEbmSfAdxuKKxoJdWzALjT7ldaKbPdbX-nOMsw&font=Bevan-PotanoSans&maptype=toner&lang=es&start_at_end=true&debug=true&height=630"' + 
		  ' width="100%" height="100%" frameborder="0"></iframe>',
	  	news2017: '<iframe src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1uZs3Tpt6TE-n_WganOf9QFJT_baZBM850RgR0sTnIGo&font=Bevan-PotanoSans&maptype=toner&lang=es&start_at_end=true&debug=true&height=630"' + 
		  ' width="100%" height="100%" frameborder="0"></iframe>'
		  
	};
	
	


			
	this.init = function () {

   	google.maps.Polyline.prototype.serializeMvcArray = function () { 
   		var mvcArray =  this.getPath();
   		var path = [];
	      for(var i= 0; i < mvcArray.getLength(); i++) {
	         path.push(mvcArray.getAt(i).toUrlValue());
	      }
	      return path.toString();
   	};

   	this.routeOnMap = new google.maps.Polyline(this.routeOnMapOptions);
   	this.animateRouteSymbol();
   	$('.news-timeline').html(that.timeLine.news2017);
	}; 

	this.loadMap = function() {
		if(typeof this.map === 'undefined' ) {
			this.map = new google.maps.Map(document.getElementById("map"),  this.mapOptions);
	   	this.infoWindow = new google.maps.InfoWindow();

	   	google.maps.event.addListenerOnce(this.map, 'idle', function() {
				that.setupEvent();
				that.loadRoute(0);
				that.setupDrawingTools();
				//that.loadEndStartPoints();
			});

		}		
	};

	this.animateRouteSymbol = function() {
		var count = 0;
		window.setInterval(function() {
			count = (count + 1) % 200;
			var icons = that.routeOnMap.get('icons');
			icons[0].offset = (count / 2) + '%';
			that.routeOnMap.set('icons', icons);
		}, 50);
	}

	/*this.animateRouteSymbol = function (objMap) {		
		var startSymbol = {
			path: google.maps.SymbolPath.CIRCLE,
			scale: 3
		};		
		var endSymbol = {
			path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
			scale: 3
		};
		var polyline = new google.maps.Polyline({
			strokeColor: "#2C59E7",
			strokeOpacity: 1.0,
			strokeWeight: 3 ,
			icons: [
				{icon: endSymbol ,offset: '100%',scale:10},{ icon: startSymbol, offset: '0%',scale:10 }
				] ,
			zIndex : 20 
		});		
		
		var count = 0;
		window.setInterval(function() {
		
			count = (count + 1) % 200;
			var icons = polyline.get('icons');
			icons[0].offset = (count / 2) + '%';
			polyline.set('icons', icons);
			
		}, 60);	
	}*/

	/******temp***************/
	this.loadEndStartPoints =  function() {
		var marker = new google.maps.Marker({
	    	position: this.locations[1].position,
	   	map: this.map
		});
		var marker = new google.maps.Marker({
	    	position: this.locations[2].position,
	   	map: this.map
		});
	}

	this.createPolylineBuffer = function() {
		
		var mvcArray =  this.routeOnMap.getPath();
    	var overviewPathGeo = [];
		for(var i = 0; i < mvcArray.length; i++) { //convert to GEOJSON to use in jsts
	    	overviewPathGeo.push([
	    		mvcArray.getAt(i).lng(), mvcArray.getAt(i).lat()
	    	]);
		}
		
		//var distance = 10/111.12; // Roughly 10km
		console.log(parseFloat($( "#canalWidth option:selected" ).val()));
		var distance =  parseFloat($( "#canalWidth option:selected" ).val())/111.12; //
    	var geoInput = {
        	type: "LineString",
        	coordinates: overviewPathGeo
    	};
		var geoReader = new jsts.io.GeoJSONReader();
		var geoWriter = new jsts.io.GeoJSONWriter();
		var geometry = geoReader.read(geoInput).buffer(distance);
		var polygon = geoWriter.write(geometry); //as GEOJSON


		var geoJsonObj = {
		  "type": "FeatureCollection",
		  "features": [
		    {
		      "type": "Feature",
		      "geometry": {
		        "type": polygon.type,
		        "coordinates": polygon.coordinates
		      }
		    }
		  ]
		};

		if(typeof this.geoJsonFeatureOnMap !== 'undefined') {
			this.map.data.remove(this.geoJsonFeatureOnMap[0]);	
		}

		this.geoJsonFeatureOnMap = this.map.data.addGeoJson(geoJsonObj);
		this.map.data.setStyle({
    		fillColor: '#F00',
    		fillOpacity: 0.3,
    		strokeWeight: 0
  		});
	};

	this.loadRoute = function(index,userRoute) {

		if(typeof that.tempOverlay != 'undefined') {
			that.tempOverlay.setMap(null);	
		}

		if(typeof index !== 'undefined') {
			var mvcArray = this.deserializeMvcArray(this.imagesMap[index].pathString);
			this.routeOnMap.setPath(mvcArray);
		} else {
			this.routeOnMap.setPath(userRoute.getPath());
		}
		this.routeOnMap.setMap(this.map);
		this.createPolylineBuffer();	

 	 	/*google.maps.event.addListener(this.routeOnMap, "dragend", this.updateRoute);*/
     	google.maps.event.addListener(this.routeOnMap.getPath(), "insert_at", this.updateRoute);
     	google.maps.event.addListener(this.routeOnMap.getPath(), "remove_at", this.updateRoute);
     	google.maps.event.addListener(this.routeOnMap.getPath(), "set_at", this.updateRoute);
	};

	//"this" is inside scope event
	this.updateRoute =  function() {
		that.createPolylineBuffer();
	};

	this.deserializeMvcArray = function(stringLatlng) {
      var arrayPoints = stringLatlng.split(',');
      var mvcArray = new google.maps.MVCArray();
      for(var i= 0; i < arrayPoints.length; i+=2)
      {
         var latlng = new google.maps.LatLng(arrayPoints[i],arrayPoints[i+1]);
         mvcArray.push(latlng);
      }
      return mvcArray;
   };

	this.setupDrawingTools = function() {
		this.drawingManager = new google.maps.drawing.DrawingManager({
			drawingControlOptions: {
				position:google.maps.ControlPosition.TOP_CENTER,
				drawingModes: [
			      google.maps.drawing.OverlayType.POLYLINE
			   ]
			}
		});
		this.drawingManager.setMap(this.map);

		google.maps.event.addListener(this.drawingManager, 'overlaycomplete', function(event) {
			if(typeof that.tempOverlay != 'undefined') {
				that.tempOverlay.setMap(null);	
			}
			that.tempOverlay = event.overlay;
			that.tempOverlay.setOptions(that.routeOnMapOptions);
			that.loadRoute(undefined,that.tempOverlay);
		});
	};

	this.setupEvent =  function() {
		$('#imagesMaps').change(function() {
		 	if(this.value != 'remove') {
		 		that.loadCustomOverlay(this.value);
		 	} else {
		 		if(typeof that.customOverlay !== 'undefined') {
					that.customOverlay.onRemove();
					that.customOverlay = undefined;
				}
		 	}
		});

		$('#locations').change(function() {

			if(typeof that.currentLocation !== 'undefined') {
				that.currentLocation.setMap(null);
			}

		 	that.map.setZoom(that.locations[this.value].zoom);
		 	that.map.setCenter(that.locations[this.value].position);

			if(this.value != 0) {
				that.currentLocation = new google.maps.Marker({
			    	position: that.locations[this.value].position,
			   	map: that.map
				});
			}

		});

		$('#routes').change(function() {
			if(this.value == 10) {
				that.routeOnMap.setMap(null);
				that.map.data.remove(that.geoJsonFeatureOnMap[0]);
			} else {
		 		that.loadRoute(this.value);
			}
		});

		$('#canalWidth').change(function(){
			that.createPolylineBuffer();
		});
	};

	
	this.addruler = function() {

		if(typeof this.map === 'undefined' ) {
			console.log('Map is not loaded yet..');
			return
		}

		this.ruler.ruler1 = new google.maps.Marker({
			position: this.map.getCenter() ,
			map: this.map,
			draggable: true
		});

		this.ruler.ruler2 = new google.maps.Marker({
			position: this.map.getCenter() ,
			map: this.map,
			draggable: true
		});
		this.ruler.ruler1label = new Label({ map: this.map });
		this.ruler.ruler2label = new Label({ map: this.map });

		this.ruler.ruler1label.bindTo('position', this.ruler.ruler1, 'position');
		this.ruler.ruler2label.bindTo('position', this.ruler.ruler2, 'position');

		this.ruler.rulerpoly = new google.maps.Polyline({
			path: [this.ruler.ruler1.position,this.ruler.ruler2.position] ,
			strokeColor: "#FFFF00",
			strokeOpacity: .7,
			strokeWeight: 7
		});
		this.ruler.rulerpoly.setMap(this.map);

		this.ruler.ruler1label.set('text',this.getDistance( 
			this.ruler.ruler1.getPosition(),
			this.ruler.ruler2.getPosition()
		));
		this.ruler.ruler2label.set('text',this.getDistance( 
			this.ruler.ruler1.getPosition(),
			this.ruler.ruler2.getPosition()
		));


		google.maps.event.addListener(this.ruler.ruler1, 'drag', function() {
			that.updateRuler();
		});

		google.maps.event.addListener(this.ruler.ruler2, 'drag', function() {
			that.updateRuler();
		});

	};

	this.updateRuler = function() {
		this.ruler.rulerpoly.setPath([
			this.ruler.ruler1.getPosition(), 
			this.ruler.ruler2.getPosition()
		]);
		
		this.ruler.ruler1label.set('text',this.getDistance(
			this.ruler.ruler1.getPosition(),
			this.ruler.ruler2.getPosition()
		));

		this.ruler.ruler2label.set('text',this.getDistance(
			this.ruler.ruler1.getPosition(),
			this.ruler.ruler2.getPosition()
		));
		
		console.log('check distiance: ' + this.checkDistance( 
			this.ruler.ruler1.getPosition().lat(), 
			this.ruler.ruler1.getPosition().lng(), 
			this.ruler.ruler2.getPosition().lat(), 
			this.ruler.ruler2.getPosition().lng()
		));
	};

	this.getDistance = function (position1,position2) {
		var km = google.maps.geometry.spherical.computeDistanceBetween(position1,position2)/1000;
		if(isNaN(km)) {
			km = 0;
		} 
		return km.toFixed(2) + 'km';
	};

	this.checkDistance = function (lat1,lon1,lat2,lon2) {
		var R = 6371; // km (change this constant to get miles)
		var dLat = (lat2-lat1) * Math.PI / 180;
		var dLon = (lon2-lon1) * Math.PI / 180; 
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) * 
			Math.sin(dLon/2) * Math.sin(dLon/2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;
		if (d>1) return Math.round(d)+"km";
		else if (d<=1) return Math.round(d*1000)+"m";
		return d;
	};

	this.removeRuler = function() {
		if(typeof this.ruler.ruler1 !== 'undefined') {
			this.ruler.ruler1.setMap(null);
			this.ruler.ruler2.setMap(null);
			this.ruler.rulerpoly.setMap(null);
			this.ruler.ruler1label.onRemove();
			this.ruler.ruler2label.onRemove();
		}
	};
	
	this.loadCustomOverlay = function(index) {
		if(typeof this.customOverlay !== 'undefined') {
			this.customOverlay.onRemove();
		}
		this.customOverlay = new USGSOverlay(this.imagesMap[index].bounds,this.imagesMap[index].img, this.map,false);
		this.map.fitBounds(this.imagesMap[index].bounds);
	};

	this.loadTwitterWidget = function() {
		$('#social').html(this.twitterWidget);

		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs"); 
		
	};

	$(document).ready(function(){
		that.init();

		$('.loadTimeline').on('click',function(){
			var year = $(this).data('year');

			switch(year) { 
				case 2014:
					$('.news-timeline').html(that.timeLine.news2014);
				break;
				case 2015:
					$('.news-timeline').html(that.timeLine.news2015);
				break;
				case 2016:
					$('.news-timeline').html(that.timeLine.news2016);
				break;
				case 2017:
					$('.news-timeline').html(that.timeLine.news2017);
				break;
			}


		});

		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			var type = $(e.target).data('type');
			if( type == 'map') {
				that.loadMap();
			}
			if( type == 'social' && $('#social').find('iframe').length == 0) {
				that.loadTwitterWidget();
			}
		});

		$('.toolsAction').on('click',function() {
			var button = $(this);
			switch(button.data('type')) {
	    		case 'ruler':
		      	that.activeTools.ruler = !that.activeTools.ruler;
		      	
		      	if(!that.activeTools.ruler) {
		      		that.removeRuler();	
		      	} else {
		      		that.addruler();	
		      	}
        		break;
			};
			button.toggleClass("btn-success");
		});

	});
};