

    /*animation*/
    new WOW().init();
  
    /*navigation*/
    function home() {
      window.location.href = '/'
    }
    function blog() {
      window.location.href = '/blog'
    }
     function contact() {
      window.location.href = '/contact'
    }

    /*map*/
    function initMap() {
             var uluru = {lat: 19.417012, lng: 72.814483};
             var map = new google.maps.Map(document.getElementById('map'), {
               zoom: 4,
               center: uluru
             });
             var marker = new google.maps.Marker({
               position: uluru,
               map: map
             });
           }



