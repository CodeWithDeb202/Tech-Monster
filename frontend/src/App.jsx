import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "./components/Common/Loader";
import AppRoutes from "./routes/AppRoutes";
import api from "./services/api/axios";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkServer = async () => {

      // already maintenance page re achhi
      if (window.location.pathname === "/503") {
        return;
      }

      try {

        await api.get("/health");

      } catch (err) {

        if (err.response?.status === 503) {

          navigate("/503", {
            replace: true
          });

        }

      }

    };

    checkServer();

    const handleOffline = () => {
      navigate("/offline");
    };

    const handleOnline = () => {
      if (window.location.pathname === "/offline") {
        navigate("/");
      }
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };

  }, [navigate]);

  return (
    <>
      {loading ? (
        <Loader finish={setLoading} />
      ) : (
        <div className="cyber-page">
          <div className="cyber-bg">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <AppRoutes />
        </div>
      )}
    </>
  );
}

export default App;