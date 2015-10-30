
var CHUNK_SIZE = 5;

function splitArray(array){
    var i,j,retarray=[];
    for (i=0,j=array.length; i<j; i+=CHUNK_SIZE) {
        retarray.push(array.slice(i,i+CHUNK_SIZE));
    }   
    return retarray;
}

function ViewModel(){
    self = this;
    
    //data
    self.numbers = ko.observable(null);
    self.passLength = ko.observable(5).extend({min:1}).extend({max:2000});

    self.words = ko.computed(function(){
        var nums = self.numbers();
        if (nums != null){
            var ret = [];
            for(c in nums){
                ret.push(wordlist[nums[c].join('')]);
            }
            return ret.join(" ");
        }
        return "";
    });

    //actions
    self.getRandomNumbers = function(){
        RandomOrgAPI.integers({min: 1, max: 6, num: (CHUNK_SIZE*self.passLength())},
        //success!
        function(res){
            self.numbers(splitArray(res));
        },
        //failure 
        function(res){
            console.log("getting integers failed", res);
        });
    };

    self.showExpl = function(){
        $('#expl').toggle();
    };

    self.getRandomNumbers();
}





ko.applyBindings(new ViewModel());
