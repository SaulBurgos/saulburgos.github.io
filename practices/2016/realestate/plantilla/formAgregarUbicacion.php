<form id="formAgregarUbicacion">

	<label><strong>Pais</strong></label>
	<select id="selectPaisFormAgregar" name="pais" class="span12" required>
		<?php
			require_once('opcionesSelectPaises.php');
		?>		
    </select>

	<label><strong>Actividad</strong></label>
	<select name="actividad" class="span12" required>
                <option value="alquiler">Alquiler</option>
                <option value="venta">Venta</option>
    </select>
	<label><strong>Tipo de Propiedad</strong></label>
	<select id="selectTipoPropiedad" name="tipoPropiedad" class="span12" required>
		<?php
			require_once('opcionesSelectTipoPropiedad.php');
		?>             
    </select>
    
	<div id="contenedorBotonDibujarTerreno">
        <label><strong>Dibujar poligono (opcional)</strong></label>
        <button id="botonDibujarTerreno" class="btn">Dibujar terreno</button>
        <button id="botonReiniciarTerreno" class="btn">Reinicar dibujo</button>					
        <div class="alert alert-info">
            <i class="icon-info-sign"></i> Acercate al maximo para mayor precision en tu dibujo y
             haz click en el mapa para dibujar y Doble click para cerrar el poligono.
        </div>					
	</div>
    
    <label><strong>Titulo</strong></label>
    <input name="titulo" type="text" class="span12" placeholder="Titulo de tu ubicacion" required/>
    <label><strong>Precio en USD</strong></label>
    <input name="precio" type="number" class="span12" placeholder="solo numeros" min="1" required/>  
    

   <label><strong>Area Total</strong></label>
    <select name="tipoArea" class="span6" required>
                <option value="vrs&sup2;">vrs&sup2;</option>
                <option value="mz">mz</option>
                <option value="mts&sup2;">mts&sup2;</option> 
                <option value="hm&sup2;">hm&sup2; (hectareas)</option>           
    </select>  
	<input name="area" type="number" class="span12" placeholder="Escribe el area solo numeros" min="1" required/> 
    
    <label><strong>Breve Descripcion</strong></label>
    <textarea name="descripcion" class="span12" id="textarea" rows="6" placeholder="Direccion y descripcion Corta de tu propiedad" required></textarea>
    <!--<label class="checkbox">
    <input type="checkbox"> Check me out
    </label>-->
	<hr />
    <label><strong>Imagen de presentacion (opcional)</strong></label>
    <input name="linkimg" type="text" class="span12" placeholder="Link web http://www de la imagen"/>
        
    <span class="help-block">
    	<i class="icon-picture"></i> Puedes Subir tu imagen en 
        <a href="http://imgur.com/" target="_blank" title="imgur.com">imgur.com</a>,
        <a href="http://tinypic.com/" target="_blank" title="tinypic.com">tinypic.com</a>,
        <a href="http://imageshack.us/" target="_blank" title="imageshack.us">imageshack.us</a>         
        &#243; donde desees. (No uses links de facebook) 
		<!-- <br />
		<i class="icon-film"></i> 
        <a href="http://www.youtube.com/watch?v=wSBBwItAS94&feature=youtu.be" target="_blank" title="tutorial">
            Mira el tutorial
        </a> -->
    </span>  
    
	<hr />
	
    <div>
		<label><strong>Link album de fotos (opcional)</strong></label>	
		<input name="linkAlbum" class="span12" type="text" placeholder="Link web http://www de tu album" />			
		 <span class="help-block">
			<i class="icon-th"></i> Puedes crear tu album en  
			<a href="http://www.flickr.com/" target="_blank" title="flickr.com">flickr.com</a>,
			<a href="http://picasa.google.com/" target="_blank" title="picasa.google.com">picasa.google.com</a>,
			<a href="http://imgur.com/" target="_blank" title="imgur.com">imgur.com</a> &#243; donde desees, 
			No uses links de facebook.
		</span>		
	</div>
		
	<hr />
    
    <label><strong>Informacion adicional (opcional)</strong></label>
    <input name="linkInfo" type="text" class="span12" placeholder="Link web http://www para mas informacion" />
    <button id="BotonAgregarUbicacionForm" type="submit" class="btn btn-success">Guardar</button> 
    <button id="cancelarAgregarUbicacion" type="button" class="btn btn-inverse">Cancelar</button>  
    <div id="msgExitoGuardarUbicacion"></div>
	
</form>
 