

$(document).ready(function(){

    var upLimit = $('#plunger').offset().top;

    function resetPlunger(){
        $('#plunger').css('margin-top', '-100px');
        $('#stick').css('height', '70px');
    }
    $("#plunger").on('mousedrag',
        {
            start: function(ev) {
                
            },
            stop: function(ev) {
                var sHeight = parseFloat($('#stick').css('height'));
                if (sHeight <= 20) {
                    var expl = $("#explosion");
                    expl.show(function(){
                        expl.addClass("show-explosion");
                        expl.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                            function(){
                                expl.fadeOut("slow", function(){
                                    expl.removeClass("show-explosion");
                                    resetPlunger();
                                });
                            });
                    });
                }
            }
        },
        function(ev){
            var offset = $('#handle').offset();
            var delta = ev.pageY-offset.top;
            var sHeight = parseFloat($('#stick').css('height'));
            if (sHeight > 20 && ev.pageY > upLimit){
                $('#plunger').css("margin-top", "+="+delta);
                $('#stick').css("height", "-="+delta);
            }

        }
    );

});
