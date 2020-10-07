var idPropiedades = ''; //global variable donde se guarda el id de la propiedad seleccionada
var propiedades;//obj global donde se guardaran todas las propiedades

$(document).ready(function(e) {
		
	if ($("#gridPropiedades").length != 0){//verifica si el objeto existe
		CargarPropiedadesUsuarioBD();//carga las propiedades
	}	
	
	FormLoginAgregarEventoSubmit();//desde funcion.js	
	
	$('#eliminarUbicacion').on('click',function(){ 	
	
		if(idPropiedades != ''){			
			BorrarUbicacion();			
		}else { 
			$('#msgExitoFracaso').html(crear_mensaje_informativo('Selecciona una Propiedad de la lista antes de borrar'));  
		}
	
	});
	
	$('#editarUbicacion').on('click',function(){ 	
	
		if(idPropiedades != ''){			
			ObtenerPropiedadPorID();			
		}else { 
			$('#msgExitoFracaso').html(crear_mensaje_informativo('Selecciona una Propiedad de la lista Para editarla'));  
		}
	
	});	
	
	$('#insertarCodigo').on('click',function(){	
	
		var link = document.getElementById("linkMapaUsuario");
		var idUser = link.getAttribute("data-iduser");	
		$('#modalInsertarMapa').modal('show').find('textarea').val('<iframe src="http://www.mapainmobiliario.net/mapa.php?id=' + idUser + '&bar=false" style="height:500px;width:900px;"></iframe>');	
			
	});
	
	
	$('#cerrarModalEdicion').on('click',function(e){
		e.preventDefault();
		$('#modalEdicion').modal('hide');
	});
	
	$('#formEditarUbicacion').submit(function (e){
		e.preventDefault();		
		var datos = $(this).serialize();
		GuardarPropiedadEditada(datos);		
	});
	
});

/********************************************/
function CargarPropiedadesUsuarioBD(){//carga las propiedades del usuario al inicio
	
	$.post('php/cargarPropiedadesUsuario.php', 
	function(data)
		{	
			propiedades = JSON.parse(data);
			if (propiedades.length > 0){
				LlenarGridPanel(propiedades);
			}						
									
		}).error(function() { console.log("error ajax"); });	
}
/********************************************/
function LlenarGridPanel(datos){
	
	$("#gridPropiedades").kendoGrid({
		
		  scrollable: true,
          sortable: true,
		  virtual: true	,
		  navigatable: true,
		  selectable:"row",
		  pageable: true,
		  
          columns:[ 
					{field: "id",title: "id"},
		  			{field: "imagen",title: "Imagen"},
		  			{field: "titulo",title: "titulo"},
					{field: "precio",title: "precio"},
					{field: "actividad",title: "actividad"},
					{field: "propiedad",title: "propiedad"},
					{field: "tipoArea",title: "Tipo Area"},
					{field: "area",title: "area"},					
					{field: "fechaCreacion",title: "Fecha Creacion"},
					],
				  
          dataSource: { 
		  				data: datos,
						pageSize: 20
					  },					  
				  
		change: function() {//cuando se selecciona	guarda en variable global el id de la propiedad									
							if (this.select().length > 0){//si hay filas
								idPropiedades = this.dataItem(this.select()).id;
								//console.log('entro');
							}else { 
							//console.log('no entro'); 
							}
						},
				
		rowTemplate: kendo.template($("#plantillaGrid").html())
		 
     });
	
}

/***********************************************/
/***********************************************/

function BorrarUbicacion(){
	
	var msgExito = $('#msgExitoFracaso');		
	msgExito.empty().html(crear_cargando ());//imagen de carga de datos se quita cuando se le agrega texto	
	
	$.post('php/borrarUbicacion.php', {'idPropiedades': idPropiedades } ,
	function(data)
		{	
			if (data=='ok'){				
				var grid = $("#gridPropiedades").data("kendoGrid");
				grid.removeRow(grid.tbody.find('tr:contains('+ idPropiedades +')'));				
				msgExito.empty();
			}else {
				msgExito.empty().html(data);
			}				
									
		}).error(function() { console.log("error ajax"); });

}

/**********************************************************/
function MostrarVentanaEdicion(propiedadEditar){
	
	$('#actividadEdit').val(propiedadEditar[0].actividad);
	$('#tipoPropiedadEdit').val(propiedadEditar[0].tipopropiedad);
	$('#tituloEdit').val(propiedadEditar[0].titulo);
	$('#precioEdit').val(parseInt(propiedadEditar[0].precio));
	$('#tipoAreaEdit').val(propiedadEditar[0].tipo_area);
	$('#areaEdit').val(parseInt(propiedadEditar[0].area));
	$('#descripcionEdit').val(propiedadEditar[0].descripcion);
	$('#linkImgEdit').val(propiedadEditar[0].linkimg);
	$('#linkAlbumEdit').val(propiedadEditar[0].linkalbum);
	$('#linkInfoEdit').val(propiedadEditar[0].linkinfo);
	
	$('#modalEdicion').modal('show');
}

/*************************************************************/
//ya no la voy a necesitar pero la dejo por si un futuro la necesito
function ObtenerPropiedadSeleccionada(){
	
	for(var i = 0; i < propiedades.length; i++)
	{
		if(propiedades[i].id == idPropiedades){
			return (propiedades[i]);	
		}
	}	
}

/*****************************************/

function ObtenerPropiedadPorID(){
	
	var msgExito = $('#msgExitoFracaso');		
	msgExito.empty().html(crear_cargando ());//imagen de carga de datos se quita cuando se le agrega texto
	
	$.post('php/ObtenerPropiedaById.php',{ id : idPropiedades } ,
	function(data)
		{		
			MostrarVentanaEdicion(JSON.parse(data));	
			msgExito.empty();							
		}).error(function() { console.log("error ajax"); });	
}

/****************************************/

function GuardarPropiedadEditada(datos){
	
	var msgExito = $('#msgExitoFracasoFormEditar');		
	msgExito.empty().html(crear_cargando ());//imagen de carga de datos se quita cuando se le agrega texto
	
	datos += '&id=' + idPropiedades;
	
	$.post('php/guardarPropiedadEditada.php',datos ,
	function(data)
		{		
			if (data =='ok'){
				
				msgExito.empty().html(crear_mensaje_exito('Propiedad Guardada'));
				location.reload();/*recarga la pagina*/						
						
			}else{
				msgExito.empty().html(data);
			}			
										
		}).error(function() { console.log("error ajax"); });
	
}