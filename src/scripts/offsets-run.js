(function($) {
    
    function deg2rad(a) {
	var r= parseFloat(a)*(Math.PI*2)/360;
	return r;
    }
    function cos(a) {
	return Math.cos(deg2rad(a));
    }
    function sin(a) {
	return Math.sin(deg2rad(a));
    }

    $("[data-off-x],[data-off-y],[data-off-z],[data-off-ref]").each(function() {
	// Look for the reference step
	var ref, refId = $(this).data('off-ref');
	if (refId) ref = $("#"+refId)[0];
	else ref = $(this).prev()[0]; refId = $(ref).attr('id');
	var cur = this;

	// Auxiliar to get data
	function value(v) {
	    return parseFloat($(cur).data(v) || $(ref).data(v) || 0);
	}
	function offset(v) {
	    return parseFloat($(cur).data("off-"+v) || 0);
	}
	    
	// Compute a nice id
	var id = $(cur).attr('id'), next;
	if (!id) {
	    next = (parseFloat(refId.split("_")[1]) || 0) + 1;
	    id = refId.split("_")[0]+"_"+next;
	    $(cur).attr('id', id);
	}

	// Compute the scale
	var scl = value("scale") || 1;
	var fct = offset("scale") || 1;
	$(cur).attr("data-scale", (scl = scl * fct));

	// Compute rotate offset
	var rot = value("rotate-z") + offset("rotate-z");
	$(cur).attr("data-rotate-z", rot);
	var rsin = sin(rot), rcos = cos(rot);

	// Get and compute offsets
	var offX = offset("x") * scl;
	var offY = offset("y") * scl;
	var offZ = offset("z") * scl;
	var valX = value("x") + offX*rcos + offY*rsin;
	var valY = value("y") + offX*rsin + offY*rcos;
	var valZ = value("z") + offZ;
	$(cur).attr("data-x", valX.toFixed(6));
	$(cur).attr("data-y", valY.toFixed(6));
	$(cur).attr("data-z", valZ.toFixed(6));
    });

})(jQuery);


