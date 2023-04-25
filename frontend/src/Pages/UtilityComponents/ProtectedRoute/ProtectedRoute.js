import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = ({auth}) => {
    
    return (auth === true ? <Navigate to="/" replace/> : <Outlet /> )
}
export default ProtectedRoutes;


