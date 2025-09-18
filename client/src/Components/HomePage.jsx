import Logo from "../assets/hemoapp_logo.png";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../assets/hospital.svg";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
function HealthMarkers() {
  const healthIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  const centros = [
    {
      nombre: "CentroVirgenDeItatí",
      latitudLongitud: [-26.17422093811114, -58.203880499341814],
    },
    {
      nombre: "HospitalCentral",
      latitudLongitud: [-26.18781367836934, -58.16789701051316],
    },
    {
      nombre: "CentroMarianoMoreno",
      latitudLongitud: [-26.195792444594066, -58.19586314320663],
    },
    {
      nombre: "CentroSaludCuidar",
      latitudLongitud: [-26.173508652422463, -58.17093409538884],
    },
  ];

  return (
    <>
      {centros.map((centro, index) => (
        <Marker key={index} position={centro.latitudLongitud} icon={healthIcon}>
          <Popup>{centro.nombre}</Popup>
        </Marker>
      ))}
    </>
  );
}
const HomePage = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50bg-gradient-to-br from-red-150 to-red-200">
      {/* Header */}
      <header className="bg-gradient-to-bl from-red-200 to-red-250 shadow-sm"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-h-25">
          <div className="flex justify-between h-16 items-center">
            <img src={Logo} alt="" className="h-13 " />
            <nav className="hidden md:ml-6 md:flex space-x-8 items-center">
              <a href="#" className="text-gray-600 hover:text-red-600">
                Inicio
              </a>
              <a href="#" className="text-gray-600 hover:text-red-600">
                Proyectos
              </a>
              <a href="#" className="text-gray-600 hover:text-red-600">
                Configuración
              </a>
            <div>
              <button
                onClick={onLogout}
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                Cerrar sesión
              </button>
            </div>
                </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-red-100">
        {/* Sección del Mapa */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ubicación</h3>
          <p className="mt-2 text-gray-600">
            Bienvenido de vuelta. Aquí tienes un mapa de los centros más
            cercanos.
          </p>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="h-96 rounded-md overflow-hidden">
              <MapContainer
                center={[-26.18530399471582, -58.1749760326925]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                <HealthMarkers />
              </MapContainer>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Haz clic en el mapa para encontrar tu ubicación actual.
            </p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Actividad reciente
          </h3>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              <li>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-red-600 truncate">
                        Proyecto Alpha actualizado
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completado
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Por: María García
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p>Hace 3 horas</p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-red-600 truncate">
                        Nuevo comentario en Proyecto Beta
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-black-800">
                          Revisión
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Por: Juan Pérez
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p>Hace 1 día</p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
