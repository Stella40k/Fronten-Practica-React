import { useEffect, useState } from "react";
import Slogan from "../assets/logo_slogan.png";

const RegisterModal = ({ isOpen, onClose, onRegister, onNavigateHome }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Lista de usuarios sospechosos/bloqueados
  const suspiciousUsers = [
    "condedracula@transylvania.com",
    "drácula@transilvania.com",
    "vlad@tepes.com",
    "vlad@impaler.com",
    "count@dracula.com",
    "conde@drácula.com",
    "vampire@blood.com"
  ];

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email) {
      newErrors.email = "El email es requerido";
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = "Ingresa un email válido";
    }
    
    // Validar contraseña
    if (!userData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (userData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    
    // Validar confirmación de contraseña
    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isSuspiciousUser = (email) => {
    return suspiciousUsers.includes(email.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // ✅ Validar usuario sospechoso
    if (isSuspiciousUser(userData.email)) {
      setErrors({ 
        general: "Usuario sospechoso bloqueado. Permisos no autorizados." 
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simular registro
      console.log("Datos de registro:", userData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Llamar a la función de registro proporcionada por el padre
      onRegister();
      
    } catch (error) {
      setErrors({ general: "Error en el registro. Intenta nuevamente." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      // Limpiar formulario al cerrar
      setUserData({ email: "", password: "", confirmPassword: "" });
      setErrors({});
    }
    
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const handleKeyEsc = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 bg-red-600/70 items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Crear cuenta</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              onKeyDown={handleKeyEsc}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-center mb-6">
            <img src={Slogan} alt="HemoApp Slogan" className="max-h-24" />
          </div>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              <strong>Error: </strong>{errors.general}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                placeholder="Mínimo 8 caracteres"
                value={userData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                placeholder="Confirmar contraseña"
                value={userData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            <div className="text-sm text-gray-600">
              <p>Al registrarte, aceptas nuestros <a href="#" className="text-red-600 hover:text-red-500">Términos de servicio</a> y <a href="#" className="text-red-600 hover:text-red-500">Política de privacidad</a>.</p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : "Registrarse"}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={onClose}
                className="font-medium text-red-600 hover:text-red-500"
              >
                Volver al inicio
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;