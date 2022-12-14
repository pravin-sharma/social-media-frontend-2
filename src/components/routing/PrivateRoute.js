import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
const PrivateRoute = (props) => {
  const { Component }= props
  const { isAuthenticated, loading } = useContext(AuthContext);

  // when both are false navigate to login
  return !isAuthenticated && !loading?<Navigate to='/' />:<Component />
};

export default PrivateRoute
