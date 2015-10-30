
function ViewModel(){
    self = this;
   
    self.string=ko.observable(null); 

    //data
    self.url = ko.computed(function(){
        return "http://flathash.com/"+ self.string();
    });

    self.face = ko.computed(function(){
        var url = self.url();
        return '<img src="'+url+'"\><br><a href="'+url+'">'+url+'</a>';
    });
    
    //actions
    self.makeString = function(){
        var length = 15;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        self.string(text);
    }

    self.makeString();
}

ko.applyBindings(new ViewModel());
