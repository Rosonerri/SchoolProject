import { FC, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";




const privateRouter: FC<PropsWithChildren> = ({children}) => { 

  const state = useSelector((state: any) => state.user)
  return(
    <div>
   {state ? <div>{children}</div> : <Navigate to = "/auth/login"/>}
    </div>
  )
}

export default privateRouter