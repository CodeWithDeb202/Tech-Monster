import { Wrench } from "lucide-react"; 
import StatusPage from "../../components/StatusPage/StatusPage";
import api from "../../services/api/axios";
import { useNavigate } from "react-router-dom";

export default function Maintenance() {
  const navigate = useNavigate();

  const handleRefresh = async () => {
    try {

      // Health check
      await api.get("/health");

      // Server up achhi
      navigate("/");

    } catch (err) {

      // Jadi ebe bhi maintenance re achhi
      if (err.response?.status === 503) {
        // Kichhi kariba darkar nahi.
        // User 503 page re hi rahiba.
        return;
      }

      // Other error
      window.location.reload();
    }
  };

  return (
    <StatusPage
      code="503"
      title="Maintenance Mode"
      description="We are upgrading our system. We'll be back soon."
      Icon={Wrench}
      primaryText="Refresh"
      onPrimaryClick={handleRefresh}
    />
  );
}