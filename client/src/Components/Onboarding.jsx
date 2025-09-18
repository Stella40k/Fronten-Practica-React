import { useState } from "react";

const OnboardingModal = ({ isOpen, onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponses, setUserResponses] = useState({
    bloodType: "",
    location: "",
    notificationFrequency: "solo_urgentes",
    canDonate: ""
  });

  // Preguntas del onboarding
  const steps = [
    {
      title: "Tipo de sangre",
      question: "¿Cuál es tu tipo de sangre?",
      type: "select",
      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "No lo sé"],
      key: "bloodType"
    },
    {
      title: "Ubicación",
      question: "¿En qué ciudad te encuentras?",
      type: "text",
      placeholder: "Ej: Buenos Aires",
      key: "location"
    },
    {
      title: "Notificaciones",
      question: "¿Con qué frecuencia deseas recibir notificaciones?",
      type: "select",
      options: [
        "Solo cuando hay necesidades urgentes",
        "Semanalmente",
        "Mensualmente",
        "No recibir notificaciones"
      ],
      key: "notificationFrequency"
    },
    {
      title: "Disponibilidad",
      question: "¿Puedes donar sangre actualmente?",
      type: "select",
      options: [
        "Sí, estoy disponible",
        "No, pero podré en el futuro",
        "No puedo donar por razones médicas"
      ],
      key: "canDonate"
    }
  ];

  const handleChange = (value, key) => {
    setUserResponses({
      ...userResponses,
      [key]: value
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Último paso - completar onboarding
      console.log("Respuestas del usuario:", userResponses);
      onComplete(userResponses);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(userResponses);
    }
  };

  if (!isOpen) return null;

  const currentQuestion = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-red-600/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#e21c34] to-[#500b28] rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 bg-opacity-30 rounded-full h-2.5 mx-4 mt-4">
          <div 
            className="bg-[#500b28] h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">
              {currentQuestion.title}
            </h2>
            <span className="text-sm text-gray-200">
              {currentStep + 1} de {steps.length}
            </span>
          </div>

          <div className="mb-6">
            <p className="text-lg text-white mb-4">
              {currentQuestion.question}
            </p>

            {currentQuestion.type === "select" ? (
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white bg-opacity-90"
                value={userResponses[currentQuestion.key] || ""}
                onChange={(e) => handleChange(e.target.value, currentQuestion.key)}
              >
                <option value="" className="text-gray-500">Selecciona una opción</option>
                {currentQuestion.options.map((option, index) => (
                  <option key={index} value={option} className="text-gray-800">
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white bg-opacity-90 text-gray-800"
                placeholder={currentQuestion.placeholder}
                value={userResponses[currentQuestion.key] || ""}
                onChange={(e) => handleChange(e.target.value, currentQuestion.key)}
              />
            )}
          </div>

          <div className="flex justify-between">
            <div>
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-white hover:text-gray-300"
                >
                  Atrás
                </button>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-white hover:text-gray-300"
              >
                {currentStep === steps.length - 1 ? "Omitir y finalizar" : "Omitir"}
              </button>
              
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-white text-[#e21c34] rounded-md hover:bg-gray-100 font-medium"
              >
                {currentStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;