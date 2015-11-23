(function(){
    
    
    $(document).ready(function() {
        
        $("#getTemperatureButton").click(function(){
            
            getTemperatureByLocation(32.00,34.00).then(function(res){
            var currentInF = res.currently.apparentTemperature;
            var currentTemp = (currentInF-32)/1.8;
           console.log("Weather test, response on fixed location: "+currentTemp);
           $("#tmpLi").html("Current Temp:" + currentTemp);
            },function(error){
                console.log(error);
            })
            
        })
            
            
        
        
    });
    
 var getTemperatureByLocation = function (lat,lon) {
  var d = Q.defer();
  
  var url = 'http://188.226.198.99:3000/Weather/'+lat+'/'+lon;
  
    httpService(url).then(function (res) {
      if(res){
        var jsonpData = res;
        var json;
        //if you don't know for sure that you are getting jsonp, then i'd do something like this
        try
        {
           json = JSON.parse(jsonpData);
        }
        catch(e)
        {
            var startPos = jsonpData.indexOf('({');
            var endPos = jsonpData.indexOf('})');
            var jsonString = jsonpData.substring(startPos+1, endPos+1);
            json = JSON.parse(jsonString);
        }
        d.resolve(json);
      } else {
        d.reject();
      }
    })
    
    return d.promise;
}

var httpService = function(url){
    var d = Q.defer();
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
    
    xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    d.resolve(xmlhttp.responseText);
    }
  }
  
  return d.promise;

}

/*    var request = require('request');
var getTemperatureByLocation = function (lat,lon) {
  var d = q.defer();
  
  var url = 'https://api.forecast.io/forecast/' + '803fccd23763a6555da6b83cbc7a2a4f' + '/'+ lat + ',' + lon + '?callback=JSON_CALLBACK';
  
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var jsonpData = body;
        var json;
        //if you don't know for sure that you are getting jsonp, then i'd do something like this
        try
        {
           json = JSON.parse(jsonpData);
        }
        catch(e)
        {
            var startPos = jsonpData.indexOf('({');
            var endPos = jsonpData.indexOf('})');
            var jsonString = jsonpData.substring(startPos+1, endPos+1);
            json = JSON.parse(jsonString);
        }
        d.resolve(json);
      } else {
        d.reject(error);
      }
    })
}*/
    
    
}())