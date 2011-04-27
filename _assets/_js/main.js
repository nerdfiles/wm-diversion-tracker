$(function() {

    var total = 214,
        totalp = 100,
        initVal = total, // 0 = 0, 30 = ~1%, 35 = ~5%, 45 = ~10%, ..., 235 = ~100
        targetDelay = 0,
        fillDelay = 0,
        fillSpeed = 0,
        percentageDelay = 0;
        
    $('#bin-container').bind('loadBin.click.load', function(e, param1, param2) {
           
        var newSet = param1,
            newTarget = parseInt(param2),
            newVal = ((total/totalp) * parseInt(newSet)),
            $targetVal = $('#bin-target .val'),
            $targetLine = $('#bin-target-line'),
            $fillLayer = $('#bin-fill-layer');
            
        function func() {
        
            var $val = $('#bin-status-layer .status .val'),
                $valS = $('#bin-status-layer .status-shadow .val'),
                i = parseInt($val.text());
                
            if ( parseInt(i) == parseInt(newSet) ) {
                return false;
            }
            
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
        
        }
             
        $targetVal.text(param2);
        
        if ( e.namespace === "load" ) {
        
            targetDelay = 1000;
            fillDelay = 1000;
            fillSpeed = 2000;
            percentageDelay = 1000;
        
        } else {
        
            targetDelay = 0;
            fillDelay = 0;
            fillSpeed = 1000;
            percentageDelay = 0;
        
        }
        
        window.setTimeout(function() {
            func();
        }, percentageDelay);
            
        $fillLayer.delay(fillDelay).css({
            
            background: "#00623e"
            
        }).animate({
        
            height: [(15+newVal) + "px", "easeOutExpo"]
            
        }, fillSpeed, function() {

        });
                
        $targetLine.find('#bin-target-line-body').delay(targetDelay).animate({
        
            height: [(11+(total-((newTarget/totalp)*total)))+'px', 'easeOutBack']
                
        }, 2000, function() {
        
        });
    
    });
        
    $('a[data-binp]').bind('click', function(e, param1) {
    
        var newSet = ($(this).attr('data-binp')) ? $(this).attr('data-binp') : param1;
        
        $('#bin-container').trigger('loadBin.click', newSet);
        
        e.preventDefault();
        
    });
    
    $('#bin-container').trigger('loadBin.load', [50, 70]);

});
