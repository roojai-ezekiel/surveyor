document.write('<script type="text/javascript" src="assets/claim/js/map/keydragzoom.js"></script>\r\n');

var map;
var polyLine;
var infoArray = [];
var markersArray = [];
var pointArray = [];
var bounds = new google.maps.LatLngBounds();

var myMarker, myInfo;

function detectBrowser() {
  useragent = navigator.userAgent;
  mapdiv = document.getElementById("map");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  } else {
    mapdiv.style.width = '800px';
    mapdiv.style.height = '600px';
  }
}

function LoadGmap() {
  map_opt = {
    zoom: 10,
    center: getLatLng(13.123146, 100.933094),
    panControl: true,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  //load map
  map = new google.maps.Map(document.getElementById("map"), map_opt);

  //enble dragzoom
  map.enableKeyDragZoom({
    key: "shift",
    boxStyle: {
      border: "1px solid #003CB7",
      backgroudColor: "#003CB7",
      opacity: 0.4
    },
    veilStyle: {
      backgroundColor: "#003CB7",
      opacity: 0.2,
      cursor: "crosshair"
    },
    visualEnabled: true,
    visualPosition: google.maps.ControlPosition.TOP_RIGHT,
    visualPositionOffset: new google.maps.Size(0, 7),
    visualPositionIndex: null,
    visualSprite: "http://maps.gstatic.com/mapfiles/ftr/controls/dragzoom_btn.png",
    visualSize: new google.maps.Size(20, 20),
    visualTips: {
      off: "Enable drag zoom",
      on: "Disable drag zoom"
    }
  });

  polyOptions = {
    strokeColor: "#003CB7",
    strokeOpacity: 0.7,
    strokeWeight: 3
  };

  polyLine = new google.maps.Polyline(polyOptions);
  polyLine.setMap(map);
}

function getLatLng(olat, olng) {
  return new google.maps.LatLng(olat, olng);
}

function addMarkerCenterPoint(olat, olng, otext, image_url, image_width, image_height, marker_layer) {
  marker_layer = (marker_layer) ? marker_layer : 1;
  marker_point = getLatLng(olat, olng);
  marker_icon = getIconCenterPoint(image_url, image_width, image_height);

  omarker = getMarker(marker_icon, marker_point, otext, marker_layer);

  bounds.extend(marker_point);
  markersArray.push(omarker);
  pointArray.push(marker_point);
}

function addMarkerOverPoint(olat, olng, otext, image_url, image_width, image_height, marker_layer) {
  marker_layer = (marker_layer) ? marker_layer : 1;
  marker_point = getLatLng(olat, olng);
  marker_icon = getIconOverPoint(image_url, image_width, image_height);

  omarker = getMarker(marker_icon, marker_point, otext, marker_layer);

  bounds.extend(marker_point);
  markersArray.push(omarker);
  pointArray.push(marker_point);
}

function getMarker(marker_icon, marker_point, marker_text, marker_layer) {
  marker_opt = {
    position: marker_point,
    map: map,
    icon: marker_icon,
    zIndex: parseInt(marker_layer)
  };

  var marker = new google.maps.Marker(marker_opt);
  var info = new google.maps.InfoWindow({
    content: '<div style="font-size:12px; text-align:left">' + marker_text + '</div>'
  });

  google.maps.event.addListener(marker, "click", function () {
    //close all infowindow
    closeInfo();
    info.open(map, marker);
  });

  infoArray.push(info);
  return marker;
}

function getIconCenterPoint(image_url, image_width, image_height) {
  icon_size = new google.maps.Size(image_width, image_height);
  icon_origin = new google.maps.Point(0, 0);
  icon_anchor = new google.maps.Point((image_width / 2), (image_height / 2));

  return new google.maps.MarkerImage(image_url, icon_size, icon_origin, icon_anchor);
}

function getIconOverPoint(image_url, image_width, image_height) {
  icon_size = new google.maps.Size(image_width, image_height);
  icon_origin = new google.maps.Point(0, 0);
  icon_anchor = new google.maps.Point((image_width / 2), image_height);

  return new google.maps.MarkerImage(image_url, icon_size, icon_origin, icon_anchor);
}

function clearMarker() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
  }

  //clear array object
  markersArray.length = 0;
  infoArray.length = 0;
  pointArray.length = 0;
  bounds = new google.maps.LatLngBounds();

  //clear polyline
  polyLine.setMap(null);

  polyLine = new google.maps.Polyline(polyOptions);
  polyLine.setMap(map);
}

function toggleMarker(action) {
  if (action == "show") {
    if (markersArray) {
      for (i in markersArray) {
        if (markersArray[i])
          markersArray[i].setMap(map);
      }
    }
  } else if (action == "hide") {
    if (markersArray) {
      for (i in markersArray) {
        if (markersArray[i])
          markersArray[i].setMap(null);
      }
    }
  }
}

function closeInfo() {
  if (infoArray) {
    for (i in infoArray) {
      infoArray[i].close();
    }
  }
}

function fitZoom() {
  map.fitBounds(bounds);
  map.setCenter(bounds.getCenter());
}

function ZoomIn() {
  zoom_level = map.getZoom();
  zoom_level = zoom_level + 1;
  zoom_level = (zoom_level > 17) ? 17 : zoom_level;
  map.setZoom(zoom_level);
}

function ZoomOut() {
  zoom_level = map.getZoom();
  zoom_level = zoom_level - 1;
  zoom_level = (zoom_level < 1) ? 1 : zoom_level;

  map.setZoom(zoom_level);
}

function drawPolyline(olat, olng) {
  path = polyLine.getPath();
  path.push(getLatLng(olat, olng));
}

function setMapType(MapType) {
  if (MapType == 'ROADMAP') {
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
  } else if (MapType == 'HYBRID') {
    map.setMapTypeId(google.maps.MapTypeId.HYBRID);
  }
}

function MapControlUI(ui_container, ui_html, invoker) {
  ui_container.style.padding = "3px";

  var control_ui = document.createElement("div");
  control_ui.style.cursor = "pointer";
  control_ui.style.textAlign = "center";
  ui_container.appendChild(control_ui);

  var control_html = document.createElement("div");
  control_html.innerHTML = ui_html;
  control_ui.appendChild(control_html);

  google.maps.event.addDomListener(ui_container, "click", invoker);
}

function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      if (myMarker) {
        myMarker.setMap(null);
      }

      var currentLat = position.coords.latitude;
      var currentLng = position.coords.longitude;

      var opt = {
        position: getLatLng(currentLat, currentLng),
        map: map,
        icon: getIconCenterPoint("images/map/icon-current-location-green.png", 28, 32),
        zIndex: parseInt(10)
      };

      myMarker = new google.maps.Marker(opt);
      myInfo = new google.maps.InfoWindow({
        content: '<div style="font-size:12px; text-align:left">Your location</div>'
      });

      google.maps.event.addListener(myMarker, "click", function () {
        myInfo.open(map, myMarker);
      });
    });
  }
}
