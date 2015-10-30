function showSmile(){
    var smile = $("#smile");
    if (smile.is(":hidden")){
        console.log("smile is hidden");
        smile.show(0, function(){
            smile.addClass("expand");
            smile.children().show();
        });
    }else {
        smile.children().hide();
        smile.removeClass("expand");
        var hideS = function(){smile.hide();};
        smile.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', hideS);
    }
}

$(document).ready(function(){
    $("body").click(function(e){
        showSmile();
    });
});
