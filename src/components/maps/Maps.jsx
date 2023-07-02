import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../store/actions/employeeActions";
import "leaflet/dist/leaflet.css";
import Loading from "../Loading/Loading";
import pins from "../../helpers/Pins";

const Maps = () => {
  const maptilerKey = import.meta.env.VITE_MAPTILER;
  const [centerPos, setCenterPos] = useState({
    lat: -6.239588,
    lng: 106.984413,
  });
  const zoomLevel = 12;
  const url = `https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${maptilerKey}`;

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
          const selectedIcon = pins[index % pins.length];
          return (
            <Marker
              position={[employee.lat, employee.lng]}
              icon={selectedIcon}
              key={index}
            >
              <Popup>
                <h1>Name: {employees[employee.IdUser - 1].name}</h1>
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
