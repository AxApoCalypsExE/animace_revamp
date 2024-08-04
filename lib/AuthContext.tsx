// "use client";

// import { Loader2 } from "lucide-react";
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   const loginUser = (userInfo) => {};

//   const logoutUser = () => {};

//   const registerUser = (userInfo) => {};

//   const checkUserStatus = () => {};

//   const contextData = {
//     user,
//     loginUser,
//     logoutUser,
//     registerUser,
//     checkUserStatus,
//   };

//   useEffect(() => {
//     setLoading(false)

//   }, [])
  

//   return (
//     <AuthContext.Provider value={contextData}>
//       {loading ? <Loader2 className="animate-spin" /> : children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext)
// }

// export default AuthContext;
