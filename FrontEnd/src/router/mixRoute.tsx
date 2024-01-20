import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getSchoolCookie, readSchool } from "../api/schoolAPIs";
import FirstScreen from "../pages/home/FirstScreen";
import LoadingScreen from "../components/static/LoadingScreen";

const MixRoute = () => {
  const [state, setState] = useState({} as any);

  useEffect(() => {
    getSchoolCookie().then((res) => {
      return readSchool(res.data).then((res) => {
        setState(res.data);
      });
    });
  }, []);

  let check = Object.keys(state).length;

  return (
    <div>
      {check === 0 ? (
        <LoadingScreen />
      ) : (
        <div>{state.started ? <Outlet /> : <FirstScreen />}</div>
      )}
    </div>
  );
};

export default MixRoute;
