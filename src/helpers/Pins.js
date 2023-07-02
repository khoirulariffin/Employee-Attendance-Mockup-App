import L from "leaflet";
import { marker1, marker2, marker3, marker4, marker5 } from "../assets";

const pin1 = new L.icon({
  iconUrl: marker1,
  iconSize: [35, 45],
});

const pin2 = new L.icon({
  iconUrl: marker2,
  iconSize: [35, 45],
});

const pin3 = new L.icon({
  iconUrl: marker3,
  iconSize: [35, 45],
});

const pin4 = new L.icon({
  iconUrl: marker4,
  iconSize: [35, 45],
});

const pin5 = new L.icon({
  iconUrl: marker5,
  iconSize: [35, 45],
});

const pins = [pin1, pin2, pin3, pin4, pin5];

export default pins;
