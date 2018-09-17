function mapBox()
{
    return {
        restrict: 'A',
        template: '<div id="map" style="width: 400px; height: 300px"></div>',
        link: function (scope, element) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiZGlhbWF0aWMiLCJhIjoiY2pqZjh2a2huMng0cDNrcGxtaTRwa2NhZiJ9.7RJBlZw7LBi7FuiIFVXRWA';

            var map = new mapboxgl.Map({
                container: 'map', // container id
                style: 'mapbox://styles/mapbox/streets-v9',
                center: [-74.50, 40], // starting position
                zoom: 9 // starting zoom
            });
            map.addControl(new mapboxgl.NavigationControl());

        }
    };
}


// Add zoom and rotation controls to the map.
