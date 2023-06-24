import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../store/actions/employeeActions";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Loading from "../loading/Loading";

import { marker1, marker2, marker3, marker4 } from "../../assets";

const Maps = () => {
  const [centerPos, setCenterPos] = useState({
    lat: -6.239588,
    lng: 106.984413,
  });
  const zoomLevel = 12;
  const url =
    "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=AP8nqUUTBOTduZVX9rQl";

  const pin1 = new L.icon({
    iconUrl: marker1,
    iconSize: [35, 45],
  });

  const pin2 = new L.icon({
    iconUrl: marker2,
    iconSize: [35, 45],
  });

  // const pin3 = new L.icon({
  //   iconUrl: marker3,
  //   iconSize: [35, 45],
  // });

  // const pin4 = new L.icon({
  //   iconUrl: marker4,
  //   iconSize: [35, 45],
  // });

  // const pins = [pin1, pin2, pin3, pin4];

  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);
  const [isLoading, setIsLoading] = useState(true);

  let totalEmployeeAttendance = [];

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  useEffect(() => {
    employees.length !== 0 && setIsLoading(false);
  }, [employees]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading) {
    employees.forEach((e) => {
      totalEmployeeAttendance = totalEmployeeAttendance.concat(e.attendances);
    });
  }

  return (
    <div>
      <MapContainer
        center={centerPos}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        className="h-screen w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          url={url}
        />
        {totalEmployeeAttendance.map((employee, index) => {
          // const selectedIcon = pins[index % pins.length];
          return (
            <Marker
              position={[employee.lat, employee.lng]}
              icon={employee.IdUser == 1 ? pin1 : pin2}
              key={index}
            >
              <Popup>
                <h1>Name: {employee.IdUser == 1 ? "Khoirul" : "Ariffin"}</h1>
                <h2>Location: {employee.name}</h2>
                <h3>Status: {employee.status}</h3>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Maps;
