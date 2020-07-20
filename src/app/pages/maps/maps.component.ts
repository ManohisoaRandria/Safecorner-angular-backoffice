import { Component, OnInit } from "@angular/core";
//declare const google: any;
import * as L from "node_modules/leaflet";

@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.scss"]
})
export class MapsComponent implements OnInit {
  private map;

  constructor() {}

  ngOnInit() {
    // let map = document.getElementById('map-canvas');
    // let lat = map.getAttribute('data-lat');
    // let lng = map.getAttribute('data-lng');

    // var myLatlng = new google.maps.LatLng(lat, lng);
    // var mapOptions = {
    //     zoom: 12,
    //     scrollwheel: false,
    //     center: myLatlng,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP,
    //     styles: [
    //       {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},
    //       {"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},
    //       {"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
    //       {"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},
    //       {"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},
    //       {"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
    //       {"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
    //       {"featureType":"water","elementType":"all","stylers":[{"color":'#5e72e4'},{"visibility":"on"}]}]
    // }

    // map = new google.maps.Map(map, mapOptions);

    // var marker = new google.maps.Marker({
    //     position: myLatlng,
    //     map: map,
    //     animation: google.maps.Animation.DROP,
    //     title: 'Hello World!'
    // });

    // var contentString = '<div class="info-window-content"><h2>Argon Dashboard</h2>' +
    //     '<p>A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</p></div>';

    // var infowindow = new google.maps.InfoWindow({
    //     content: contentString
    // });

    // google.maps.event.addListener(marker, 'click', function() {
    //     infowindow.open(map, marker);
    // });
    this.showMap();
  }

  //FONCTON POUR LA MAP
  //affciher map
  showMap() {
    this.map = L.map("map-canvas").setView([-18.929744, 47.509419], 12);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "SafeCorner",
      minZoom: 5
    }).addTo(this.map);
  }
}
