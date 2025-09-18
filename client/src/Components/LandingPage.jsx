import Docs from "../assets/undraw_scientist_5td0.svg";
import Logo from "../assets/hemoapp_logo.png";
import HeroImg from "../assets/undraw_medicine_hqqg.svg";
import Ubi from "../assets/user-ubication.svg";
import userNoti from "../assets/user-notification.svg";
import mapaUbi from "../assets/mapa-ubicacion.svg";
import RegisterModal from "./Register.jsx";
import OnboardingModal from "./Onboarding.jsx";
import { useState } from "react";

const LandingPage = ({ isLoggedIn, onLogout, onNavigateHome }) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleRegister = () => {
    closeRegisterModal();
    setIsRegistered(true);
    //onboarding
    setIsOnboardingOpen(true);
  };

  const handleOnboardingComplete = (responses) => {
    console.log("Onboarding completado con respuestas:", responses);
    setIsOnboardingOpen(false);
    // Aquí guardarías las respuestas en el perfil del usuario
    // Y redirigirías a la página principal
    onNavigateHome("home");
  };
  const closeOnboarding = () => {
    setIsOnboardingOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-150 to-red-200">
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        onRegister={handleRegister}
        onNavigateHome={onNavigateHome}
      />
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onComplete={handleOnboardingComplete}
        onClose={closeOnboarding}
      />

      {/* Header */}
      <header className="bg-gradient-to-bl from-red-200 to-red-250 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-h-25">
          <div className="flex justify-between h-16 items-center">
            <img src={Logo} alt="" className="h-13" />
            <nav className="hidden md:ml-6 md:flex space-x-8 items-center">
              <a href="#features" className="text-gray-600 hover:text-red-600">
                Servicios
              </a>
              <a href="#benefits" className="text-gray-600 hover:text-red-600">
                Beneficios
              </a>
              <a href="#contact" className="text-gray-600 hover:text-red-600">
                Contacto
              </a>
              <div>
                {isLoggedIn  ? (
                  <button
                    onClick={onLogout}
                    className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cerrar sesión
                  </button>
                ) : (
                  <button
                    onClick={openRegisterModal}
                    className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Unete!
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="bg-gradient-to-br from-[#e21c34] to-[#500b28] max-w mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex items-center ">
          <img src={HeroImg} alt="" srcset="" className="size-80 mx-10" />
          <div className="text-end px-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-300">
              Bienvenido a HemoApp
            </h1>
            <p className="mt-4 text-xl text-gray-200">
              Bienvenido a HemoApp, la plataforma innovadora que conecta a
              donantes de sangre con instituciones de salud de manera rápida y
              eficiente. Nuestra misión es salvar vidas facilitando el proceso
              de donación de sangre, asegurando que nunca falte sangre cuando
              más se necesita y que sepas donde ir cuando mas te necesiten.
            </p>
            {/*           <div className="mt-10">
            <button
              onClick={onNavigateToLogin}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red -700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
              Comenzar ahora
            </button>
                </div> */}
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="bg-gray-100 py-18">
          <div className="text-center">
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Todo lo que necesitas en un solo lugar
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 ">
              <div className="bg-gray-50 rounded-lg p-6 ">
                <div className="inline-flex items-center justify-center h-50 w-50 rounded-md">
                  <img src={Ubi} alt="" srcset="" className="h-fit w-fit" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-center text-gray-900">
                  Geolocalización Inteligente
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Mapa interactivo en tiempo real que muestra centros de donación, campañas móviles y necesidades 
                  específicas por ubicación, permitiendo encontrar el punto más cercano para donar.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="inline-flex items-center justify-center h-50 w-50 rounded-md m-1 ">
                  <img
                    src={userNoti}
                    alt=""
                    srcset=""
                    className="h-fit w-fit"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-center text-gray-900">
                  Alertas Personalizadas
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Notificaciones automáticas basadas en tu perfil sanguíneo que te alertan cuando tu tipo 
                  de sangre se requiere urgentemente en instituciones cercanas.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="inline-flex items-center justify-center h-50 w-50 rounded-md m-1 ">
                  <img src={mapaUbi} alt="" srcset="" className="h-fit w-fit" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-center text-gray-900">
                  Aca iria otro beneficio
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  puede ser las solicitude
                  (cambiar ilustracion por una mas explicativa)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          id="benefits"
          className="bg-gradient-to-br from-[#500b28] to-[#660000] max-w mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 flex flex-col items-center"
        >
          <div className="text-center ">
            <p className="mt-2 text-7xl font-extrabold mb-8  text-gray-500 sm:text-4xl">
              Beneficios de HemoApp
            </p>
          </div>
          <div className="flex items-center">
            <img src={Docs} alt="" srcset="" className="size-80 mx-10" />
            <div className="text-center px-6">
              <h1 className="text-4xl md:text-3xl font-extrabold text-gray-300">
                Para donantes:{" "}
              </h1>
              <ol className="mt-4 text-xl text-gray-200">
                <li>
                  Acceso inmediato a información verificada sobre necesidades
                  reales
                </li>
                <li>
                  Optimización de tu tiempo con recordatorios inteligentes y
                  agendamiento simplificado
                </li>
                <li>
                  Seguimiento del impacto de tu donación con confirmación de
                  ayuda recibida
                </li>
                <li>
                  Comunidad de donantes reconocidos con programas de incentivos
                  solidarios
                </li>
              </ol>
              <h1 className="text-4xl md:text-3xl font-extrabold text-gray-300">
                Para Instituciones:{" "}
              </h1>
              <ol className="mt-4 text-xl text-gray-200">
                <li>
                  Reducción hasta del 40% en tiempos de búsqueda de donantes
                  compatibles
                </li>
                <li>
                  Herramientas digitales para gestión predictiva de inventarios
                </li>
                <li>
                  Comunicación masiva instantánea con donantes por tipo
                  sanguíneo y ubicación
                </li>
                <li>
                  Dashboard analítico para toma de decisiones basada en datos
                  reales
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">HemoApp</h3>
              <p className="mt-2 text-gray-400">
                © YPF.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Enlaces</h4>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Términos y condiciones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Política de privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
