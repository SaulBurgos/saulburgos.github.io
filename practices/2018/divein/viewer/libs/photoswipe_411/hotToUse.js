this.options = {
	barsSize: {top: 1, bottom:'auto'},		
	arrowEl: true,
	counterEl: false,
	history: false,
	preload: [1, 3],
	shareEl: false,
	closeOnScroll: false,
	fullscreenEl: false,
	pinchToClose: false,
	modal: false,
	loop: false,
	closeOnVerticalDrag: false,
	clickToCloseNonZoomable: false,			
	escKey: false,					
	hotspotContainerClass: 'museumRunMultiBackground_HotspotContainer', //custom logic           
	closeElClasses: [] //only this clases should close the gallery 
};	


jQuery(currentItem.container).find('.' + this.selectorContainer).empty();
jQuery(currentItem.container).find('.' + that.selectorContainer).append(clonedElement);


 

 