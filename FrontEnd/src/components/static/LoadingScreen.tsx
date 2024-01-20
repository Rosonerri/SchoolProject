import { ClipLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ClipLoader color="#172554" size={30} />
    </div>
  );
};

export default LoadingScreen;
