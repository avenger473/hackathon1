var xhttp, xhttp1, xhttp2, obj, obj1, obj2, cafe, park, stadium, lat, lng, xhttp3, obj3, sortedArray;

sortedArray = [] ;

cafe = [] ;

park = [] ;

stadium = [];

var destination=document.getElementById("to");
var submitplace= document.getElementById('submit');
var places= document.getElementById('toptenplaces');

console.log(destination.value);

submitplace.addEventListener("click", function(){
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState==4 && this.status==200){
      obj = JSON.parse(this.responseText) ;
      lat = obj.results[0].geometry.location.lat ;
      lng = obj.results[0].geometry.location.lng ;
      console.log(lat);
      console.log(lng);
      xhttp1 = new XMLHttpRequest();
      xhttp1.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
          obj1 = JSON.parse(this.responseText);
          for(var i =0; i < obj1.results.length ; i++){
            cafe.push({
              name : obj1.results[i].name,
              rating : obj1.results[i].rating,
              photo : obj1.results[i].photos,
              location : obj1.results[i].geometry.location
            });
          }
        // console.log(cafe);
        xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function(){
          if(this.readyState==4 && this.status==200){
            obj2 = JSON.parse(this.responseText);
            for(var i =0; i < obj2.results.length ; i++){
              park.push({
                name : obj2.results[i].name,
                rating : obj2.results[i].rating,
                photo : obj2.results[i].photos,
                location : obj1.results[i].geometry.location
              });
            }
            // console.log(park);
            var interests = cafe.concat(park) ;

            console.log(interests);

            interests.sort(function(a, b){
              var keyA = a.rating ;
              var keyB = b.rating ;
              return (keyB - keyA) ;
            });
            console.log(interests);
            for(var i =0; i< 10 ; i++){
              sortedArray.push(interests[i].name);
            }

            console.log(sortedArray);

          }
        };


        xhttp2.open("GET", "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=20000&type=park&key=AIzaSyAOERb90K5NLqz98ZqeacjdRIfNQBrBnVY", true);
        xhttp2.send();
      }
    };

    xhttp1.open("GET", "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=20000&type=cafe&key=AIzaSyAOERb90K5NLqz98ZqeacjdRIfNQBrBnVY", true);
    xhttp1.send();

  }
};
console.log(destination.value);


console.log(sortedArray);
console.log(places);
places.innerHTML= "<b>gaand phat gaya</b>";
for(var i=0; i< 10; i++)
{ 
  places.innerHTML+='<li class="list-group-item">'+sortedArray[i].name+'</li>';

}

xhttp.open("GET",`https://maps.googleapis.com/maps/api/geocode/json?address=${destination.value}&key=AIzaSyAOERb90K5NLqz98ZqeacjdRIfNQBrBnVY`,true);
xhttp.send();
});




