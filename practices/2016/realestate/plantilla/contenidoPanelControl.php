 <!-- Define the HTML table, with rows, columns, and data -->
  <button id="editarUbicacion" class="btn btn-inverse" href="#">Editar</button>
  <button id="eliminarUbicacion" class="btn btn-inverse" href="#">Eliminar</button>  
  
	<?php  
		@ session_start();	

		if ($_SESSION['tipo_cuenta']=='full'){
			echo '<button id="insertarCodigo" class="btn btn-inverse" href="#">Insertar mapa en tu web</button>';		
		}		
				
	?>
	
    
  <span class="badge badge-success pull-right">
  	<?php  
		 	
		echo '<a id="linkMapaUsuario" data-iduser="'.$_SESSION['id_usuario'].'" href="mapa.php?id='.$_SESSION['id_usuario'].'&bar=true" style="color:#FFF;">Comparte tus propiedades con este link</a>';		
	?>
  	
  </span>
  <div id="msgExitoFracaso"></div>
  <div id="gridPropiedades"> </div>
 
  	<script id="plantillaGrid" type="text/x-kendo-tmpl">
		<tr>
			<td>
				${ id }
			</td>
			<td>				
				<img class="imgPropiedadGrid" src="${ imagen }" alt="${ titulo }" />				
			</td>
			<td>
				${ titulo }
			</td>
			<td>
				${ precio }
			</td>
			
			<td>
				${ actividad }
			</td>
			<td>
				${ propiedad }
			</td>
			<td>
				${ tipoArea }
			</td>
			<td>
				${ area }
			</td>
			<td>
				${ fechaCreacion }
			</td>
			
		</tr>
	</script>
    
<div class="modal hide" id="modalEdicion" style="display: none; ">
    <div class="modal-header">
        <button class="close" data-dismiss="modal">×</button>
        <h3>Editando Propiedad</h3>
    </div>
    
    <div class="modal-body">   		
            
            <form id="formEditarUbicacion">
                    <label><strong>Actividad</strong></label>
                    <select id="actividadEdit" name="actividad" class="span12" required>
                                <option value="alquiler">Alquiler</option>
                                <option value="venta">Venta</option>
                    </select>
                    <label><strong>Tipo de Propiedad</strong></label>
                    <select id="tipoPropiedadEdit" name="tipoPropiedad" class="span12" required>
                    	<?php
							require_once('opcionesSelectTipoPropiedad.php');
						?>              
                    </select>                    
                    <label><strong>Titulo</strong></label>
                    <input id="tituloEdit" name="titulo" type="text" class="span12" placeholder="Titulo de tu ubicacion" required/>
                    <label><strong>Precio en $</strong></label>
                    <input id="precioEdit" name="precio" type="number" class="span12" placeholder="solo numeros" min="1" required/>       
                
                   <label><strong>Area Total</strong></label>
                    <select id="tipoAreaEdit" name="tipoArea" class="span6" required>
                                <option value="vrs&sup2;">vrs&sup2;</option>
                                <option value="mz">mz</option>
                                <option value="mts&sup2;">mts&sup2;</option> 
                                <option value="hm&sup2;">hm&sup2; (hectareas)</option>           
                    </select>  
                    <input id="areaEdit" name="area" type="number" class="span12" placeholder="Escribe el area solo numeros" min="1" required/> 
                    
                    <label><strong>Breve Descripcion</strong></label>
                    <textarea id="descripcionEdit" name="descripcion" class="span12" id="textarea" rows="6" 
                    placeholder="Descripcion Corta" required></textarea>
                    <!--<label class="checkbox">
                    <input type="checkbox"> Check me out
                    </label>-->
                    <label><strong>Imagen de presentacion (opcional)</strong></label>
                    <input id="linkImgEdit" name="linkimg" type="text" class="span12" placeholder="Link web http://www de la imagen"/>
                        
                    <span class="help-block">
                       <i class="icon-picture"></i> Puedes Subir tu imagen en 
                        <a href="http://imgur.com/" target="_blank" title="imgur.com">imgur.com</a>,
                        <a href="http://tinypic.com/" target="_blank" title="tinypic.com">tinypic.com</a>,
                        <a href="http://imageshack.us/" target="_blank" title="imageshack.us">imageshack.us</a>         
                        &#243; donde desees         
                    </span>  
                    
                     
					
					<label><strong>Link album de fotos (opcional)</strong></label>	
					<input id="linkAlbumEdit" name="linkAlbum" class="span12" type="text" placeholder="Link web http://www de tu album" />			
					 <span class="help-block">
						<i class="icon-th"></i> Puedes crear tu album en  
						<a href="http://www.flickr.com/" target="_blank" title="flickr.com">flickr.com</a>,
						<a href="http://picasa.google.com/" target="_blank" title="picasa.google.com">picasa.google.com</a>,
						<a href="http://imgur.com/" target="_blank" title="imgur.com">imgur.com</a> &#243; donde desees       
					</span>
						
					
                                   
                    <label><strong>Informacion adicional (opcional)</strong></label>
                    <input id="linkInfoEdit" name="linkInfo" type="text" class="span12" placeholder="Link web http://www para mas informacion" />                    
                    <button type="submit" class="btn btn-success">Guardar</button> 
   					<a id="cerrarModalEdicion" href="#" class="btn btn-inverse">Cerrar</a>
                    <div id="msgExitoFracasoFormEditar"></div> 
                </form>  		
    </div>    
</div>




<div class="modal hide" id="modalInsertarMapa" style="display: none; ">
    <div class="modal-header">
        <button class="close" data-dismiss="modal">×</button>
        <h3>Inserta este codigo en tu pagina web</h3>
    </div>
    
    <div class="modal-body">   		
            
            <form>
				<label><strong>Con este codigo podras insertar tus propiedades en tu propia pagina web</strong></label>
				<textarea class="span12" id="textarea" rows="2">					
				</textarea>				 
			</form>  		
    </div>    
</div>

