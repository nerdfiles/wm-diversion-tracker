$(function() {

    var total = 237,
        totalp = 100,
        initVal = total; // 0 = 0, 30 = ~1%, 35 = ~5%, 45 = ~10%, ..., 235 = ~100
        
    $('#bin-container').bind('loadBin', function(e, param1, param2) {
    
        var newSet = param1,
            newVal = ((total/totalp) * parseInt(newSet)),
            $val = $('#bin-status-layer .status .val'),
            $valS = $('#bin-status-layer .status-shadow .val'),
            $targetVal = $('#bin-target .val'),
            $targetLine = $('#bin-target-line'),
            $fillLayer = $('#bin-fill-layer'),
            i = parseInt($val.text());
            
            if ( parseInt(i) == parseInt(newSet) ) {
                return false;
            }
            
            $targetVal.text(param2);
            
            $targetLine.animate({
                height: ['200px', 'linear']
            }, 1500);
            
            if (i < newSet) {
                var id = setInterval(function() {
                
                    $val.text((i+1));
                    $valS.text((i+1));
                
                    i = i + 1;
                
                    if (i === parseInt(newSet)) {
                        clearInterval(id);
                    }
                    
                    }, (15)
                
                );
            } else {
                var id = setInterval(function() {
                
                    $val.text((i-1));
                    $valS.text((i-1));
                
                    i = i - 1;
                
                    if (i === parseInt(newSet)) {
                        clearInterval(id);
                    }
                    
                    }, (15)
                
                );            
            }
    
        $fillLayer.css({
            background: "#00623e"
        }).animate({
            height: [(15+newVal) + "px", "swing"]
        }, 1000, function() {
            
        });
    
    });
        
    $('a[data-binp]').bind('click', function(e, param1) {
    
        var newSet = ($(this).attr('data-binp')) ? $(this).attr('data-binp') : param1;
        
        $('#bin-container').trigger('loadBin', newSet);
        
        e.preventDefault();
        
    });
    
    $('#bin-container').trigger('loadBin', [90, 30]);

});
