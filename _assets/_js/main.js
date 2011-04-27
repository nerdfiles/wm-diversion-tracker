/**
 * main.js for WM Diversion Tracker - Animated Bin
 *
 * Animated recycling bin for representing recycled waste per building.
 *
 * @author          aalexan1
 * @project         wm-diversion-tracker
 * @package         wm-redesign
 * @lastmodified    04-27-2011 7:08AM
 * @version         0.0.1
 *
 * @tested-for      chrome10.x,opera10.x,ie7,ie8,ff3.6.x
 * @js-for          all
 */
 
$(function() {

    var total = 214,
        totalp = 100,
        initVal = total, // 0 = 0, 30 = ~1%, 35 = ~5%, 45 = ~10%, ..., 235 = ~100
        targetDelay = 0,
        fillDelay = 0,
        fillSpeed = 0,
        percentageDelay = 0;
        
    $('#bin-container').bind('loadBin.click.load', function(e, actual, target) {
           
        var newSet = actual,
            newTarget = parseInt(target),
            newVal = ((total/totalp) * parseInt(newSet)),
            $targetVal = $('#bin-target .val'),
            $targetLine = $('#bin-target-line'),
            $fillLayer = $('#bin-fill-layer');
            
        function setActual() {
        
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
             
        $targetVal.text(actual);
        
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
            
            setActual();
            
        }, percentageDelay);
            
        $fillLayer.delay(fillDelay).addClass('filled').animate({
        
            height: [(15+newVal) + "px", "easeOutExpo"]
            
        }, fillSpeed, function() {

        });
                
        $targetLine.find('#bin-target-line-body').delay(targetDelay).animate({
        
            height: [(13+(total-((newTarget/totalp)*total)))+'px', 'easeOutBack']
                
        }, 2000, function() {
        
        });
    
    });
        
    $('a[data-actual]').bind('click', function(e, actual) {
    
        var newSet = ($(this).attr('data-actual')) ? parseInt($(this).attr('data-actual')) : parseInt(actual);
        
        $('#bin-container').trigger('loadBin.click', [newSet]);
        
        e.preventDefault();
        
    });
    
    $('#bin-container').trigger('loadBin.load', [50, 50]);

});
