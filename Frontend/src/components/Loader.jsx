import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const Loader = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/loader1.json") 
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading Lottie JSON:", error));
  }, []);

  if (!animationData) return <p>Loading...</p>; 

  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default Loader;
