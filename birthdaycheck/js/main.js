function daysInMonth(month, year){
    return new Date(year, month + 1, 0).getDate();
}

function firstMonthDay(year, month){
    return new Date(year, month, 1).getDay();
}


function ViewModel(){
    var self = this;
    //data
    self.daynames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    var monthNames = [ 
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June",
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December" 
    ];

    
    var today = new Date();
    today.setHours(0,0,0,0);
    self.year = today.getFullYear();
    self.month = ko.observable(today.getMonth());
    self.date = ko.observable(0);

    self.weeks = ko.computed(function(){
        var month = self.month();
        var days = daysInMonth(month, self.year);
        var firstDate = firstMonthDay(self.year, month);
        var digit = 1, curCell = 1;
        var weekList = [];
        for (var row=1; row <= Math.ceil((days+firstDate-1)/7); ++row){
            var dateList = [];
            for (var col = 1; col <=7; ++col){
                if (digit > days){
                    dateList.push("");
                }else if (curCell < firstDate+1){
                    dateList.push("");
                    curCell++;
                } else {
                    dateList.push(digit);
                    digit++;
                }
            }
            weekList.push(dateList);
        }
        return weekList;
    });

    self.monthName = ko.computed(function(){
        return monthNames[self.month()];
    });
    self.showStats = ko.observable(false);
    self.showCake = ko.observable(false);
    self.daysTill = ko.observable(0);


    //actions
    self.nextMonth = function(){
        var m = self.month();
        if (m < 11){
            self.month(m+1);
        }
    };
    self.prevMonth = function(){
        var m = self.month();
        if(m > 0){
            self.month(m-1);
        }
    };

    self.selectDate= function(date){
        if (date != ""){
            var m = self.month();
            var d = new Date(self.year, m, date);
            self.date(d);
            self.showStats(false);
            self.showCake(false);
        }
    };
    self.isDate = function(date){
        if (date != ""){
            var m = self.month();
            var d = new Date(self.year, m, date);
            //the plus is to coerce the
            //dates to numbers
            if (+d ==  +self.date()){
                return true;
            }
        }
        return false;
    };

    self.birthdayCheck = function(){
        var d = self.date();
        if (+today == +d){
            self.showCake(true);
        } else {
            if (+d < +today){
                d.setFullYear(d.getFullYear()+1);
            }
            var diff = Math.abs(today - d);
            var oneDay = 1000*60*60*24;
            
            self.showStats(true);
            self.daysTill(Math.round(diff/oneDay))
        }
    }
    self.hideCake = function(){
        self.showCake(false);
    };
}

ko.applyBindings(new ViewModel());
