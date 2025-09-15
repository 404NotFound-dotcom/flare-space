import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Volunteer() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in, if yes redirect to dashboard
    const authData = localStorage.getItem("volunteerAuth");
    if (authData) {
      const userData = JSON.parse(authData);
      if (userData.isLoggedIn) {
        navigate("/volunteer/dashboard");
        return;
      }
    }
    // If not logged in, redirect to login page
    navigate("/volunteer/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>Redirecting...</div>
    </div>
  );
}

