import { useEffect } from "react";
import { useAppDispatch } from "../utils/hooks";
import { useGetprofileQuery } from "../store/Userapi";
import { setisauth } from "../store/Userslice";
import { Outlet } from "react-router-dom";

const Authinit = () => {
  const dispatch = useAppDispatch();
  const {  isSuccess, isError, isLoading, isUninitialized } = useGetprofileQuery({});
  console.log(isSuccess,isUninitialized)

  useEffect(() => {
    if (isSuccess) dispatch(setisauth(true));
    if (isError) dispatch(setisauth(false));
  }, [isSuccess, isError, dispatch]);

  // Gate: don't render routes until we know the auth state
  if (isLoading || isUninitialized) {
    return null; // or null, but a spinner avoids layout flash too
  }

  return <Outlet />;
};

export default Authinit;