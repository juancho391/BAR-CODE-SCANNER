import { useState, useRef, useEffect } from "react";

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [scanningText, setScanningText] = useState("Scanning"); // Estado para el texto de escaneo
  const [dotCount, setDotCount] = useState(0); // Contador de puntos

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4); // Cambia el contador de puntos
    }, 300); // Cada medio segundo

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  useEffect(() => {
    setScanningText("Scanning" + ".".repeat(dotCount)); // Actualiza el texto de escaneo
  }, [dotCount]);

  useEffect(() => {
    if (isScanning) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera(); // Limpiar al desmontar
    };
  }, [isScanning]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      startCapturing();
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const startCapturing = () => {
    const capture = () => {
      captureImage();
      if (isScanning) {
        setTimeout(capture, 3000); // Captura una imagen cada 3 segundos
      }
    };
    capture();
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);

      // Enviar la imagen al backend
      const imageDataUrl = canvas.toDataURL("image/jpeg");
      sendImageToBackend(imageDataUrl);
    }
  };

  const sendImageToBackend = (imageDataUrl) => {
    // Lógica para enviar la imagen al backend
    console.log("Enviando imagen al backend");
  };

  return (
    <section className="w-full max-w-4xl mx-auto min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full mb-8 flex justify-center">
        <button
          onClick={() => setIsScanning(!isScanning)}
          className={`px-8 py-4 rounded-lg text-xl font-semibold transition-colors ${
            isScanning
              ? "bg-gradient-to-br from-[#685bfe] to-[#ff61a1] text-white"
              : "bg-gradient-to-br from-[#ff61a1] to-[#685bfe] text-white"
          }`}
        >
          {isScanning ? scanningText : "Start scanning"}
        </button>
      </div>

      <div className="w-full aspect-[4/3] bg-gray-100 border-4 border-blue-500 rounded-xl shadow-xl overflow-hidden flex justify-center items-center">
        {isScanning ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-[#436b9d] text-white text-center h-full w-full">
            <div className="flex items-center flex-col p-8 gap-28 w-full h-full">
              <p className="text-[80px] mt-24">
                Welcome to <span className="gradient-text">Scann-X</span>
              </p>
              <p className="text-5xl">
                Click on the button above to start scanning your products!
              </p>
            </div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </section>
  );
};

export default Scanner;
