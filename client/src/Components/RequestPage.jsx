import { useState } from "react";
import Logo from "../assets/hemoapp_logo.png";

const RequestPage = ({ onBack, onSubmit }) => {
  const [requestData, setRequestData] = useState({
    bloodType: "",
    urgency: "medium",
    quantity: 1,
    patientInfo: "",
    donorsNeeded: 1
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData({
      ...requestData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío de la solicitud
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Solicitud enviada:", requestData);
      setSubmitSuccess(true);
      
      // Opcional: resetear el formulario después de 2 segundos y volver atrás
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsSubmitting(false);
        if (onSubmit) onSubmit();
      }, 2000);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e21c34] to-[#500b28] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Solicitud Enviada!</h2>
          <p className="text-gray-600 mb-6">
            Tu solicitud de donación de sangre ha sido enviada correctamente. 
            Los donantes compatibles serán notificados.
          </p>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e21c34] to-[#500b28]">
      {/* Header */}
      <header className="bg-gradient-to-bl from-red-200 to-red-250 shadow-sm"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-h-25">
          <div className="flex justify-between h-16 items-center">
            <img src={Logo} alt="HemoApp Logo" className="h-13" />
            <nav className="hidden md:ml-6 md:flex space-x-8 items-center">
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-red-600"
              >
                Volver
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Formulario de Solicitud */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Solicitar Donación de Sangre
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de Sangre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Sangre Requerido *
              </label>
              <select
                name="bloodType"
                value={requestData.bloodType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Selecciona un tipo de sangre</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Urgencia */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel de Urgencia *
              </label>
              <select
                name="urgency"
                value={requestData.urgency}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="critical">Crítica</option>
              </select>
            </div>

            {/* Cantidad de unidades */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad de Unidades Requeridas (1-10) *
              </label>
              <input
                type="number"
                name="quantity"
                min="1"
                max="10"
                value={requestData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Donantes necesarios */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donantes Necesarios *
              </label>
              <input
                type="number"
                name="donorsNeeded"
                min="1"
                value={requestData.donorsNeeded}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Información del paciente */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Información del Paciente (Opcional)
              </label>
              <textarea
                name="patientInfo"
                value={requestData.patientInfo}
                onChange={handleChange}
                rows="3"
                maxLength="200"
                placeholder="Información relevante sobre el paciente..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">
                {requestData.patientInfo.length}/200 caracteres
              </p>
            </div>

            {/* Botones */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-70 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : "Enviar Solicitud"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;