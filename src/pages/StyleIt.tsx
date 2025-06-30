
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StyleIt = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new DressUp page
    navigate('/dressup', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">✨</div>
        <p className="text-gray-600">Redirecting to Dress Up Studio...</p>
      </div>
    </div>
  );
};

export default StyleIt;
