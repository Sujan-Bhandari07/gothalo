import { useEffect, useState } from "react";
import back from "../assets/loginback.jpg";
import type { ILogin } from "../types/pagestypes/Logintypes";
import { useLoginMutation, useRegisterMutation } from "../store/Userapi";
import toast from "react-hot-toast";
import type { IError } from "../types/commontypes/commontype";
import { useAppDispatch } from "../utils/hooks";
import { setisauth } from "../store/Userslice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [islogin, setislogin] = useState(true);

  const dispatch=useAppDispatch()
  const navigate=useNavigate()

  const [
    signup,
    { data: rd, isLoading: ril, isError: rie, error: re, isSuccess: ris },
  ] = useRegisterMutation();

  const [
    login,
    { data: ld, isLoading: lil, isError: lie, error: le, isSuccess: lis },
  ] = useLoginMutation();


  const [form, setform] = useState<ILogin>({
    fullname: "",
    email: "",
    password: "",
  });

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setform((prev) => ({ ...prev, [name]: value }));
  };

  const handlesubmit = async () => {
    if(!islogin){

      const a = await signup(form).unwrap();
      if (a.success) {
        setform({
          fullname: "",
          email: "",
          password: "",
        });
      }

    }else{
       const a = await login({
        email:form.email,
        password:form.password
       }).unwrap();
      if (a.success) {
        setform((prev)=>({
          ...prev,
          password:"",
          email:""
        }))
      }
    }
  };

  useEffect(() => {
    let id: string;
    if (ris) {
      dispatch(setisauth(true))
navigate("/",{replace:true})
      toast.success(rd.message);

    }
    if (rie && re && "data" in re) {
      const err = re.data as IError;
      toast.error(err.message);
    }

    if (ril) {
      id = toast.loading("Creating your account...");
    }

    return () => {
      if (id) toast.dismiss(id);
    };
  }, [rd, rie, re, ris, ril,dispatch,navigate]);


  useEffect(() => {
    let id: string;
    if (lis) {
        dispatch(setisauth(true))
navigate("/",{replace:true})
      toast.success(ld.message);
    }
    if (lie && le && "data" in le) {
      const err = le.data as IError;
      toast.error(err.message);
    }

    if (lil) {
      id = toast.loading("Logging in...");
    }

    return () => {
      if (id) toast.dismiss(id);
    };
  }, [ld, lie, le, lis, lil,dispatch,navigate]);

  return (
    <div className="h-screen w-screen relative flex justify-center items-center ]">
      <img
        className="absolute z-10 top-0 left-0 h-full w-full "
        src={back}
        alt=""
      />
      <div className=" w-[75%] relative z-30 flex justify-center   h-[85%] rounded-3xl p-5  border-8 border-white">
        <div className=" w-[54%] bg-white border-r-8 gap-5 border-white flex flex-col justify-center border-2 items-center">
          <div className="flex flex-col justify-center ">
            <h1 className="font-bold text-3xl">{islogin?"WELCOME BACK !":"Gothalo AI"}</h1>
            <div className="font-extralight text-gray-400">
             {islogin? "Welcome back! Please enter your details.":"One Platform. Endless Intelligence."}
            </div>
          </div>
          <div className="flex flex-col gap-3 ">
            {!islogin && (
              <div className="flex flex-col w-[22vw] ">
                <label className="" htmlFor="">
                  Fullname
                </label>
                <input
                  type="text"
                  onChange={handlechange}
                  name="fullname"
                  value={form.fullname}
                  className="ab"
                  placeholder="Enter your fullname"
                />
              </div>
            )}
            <div className="flex flex-col w-[22vw]">
              <label htmlFor="">Email</label>
              <input
                type="email"
                onChange={handlechange}
                value={form.email}
                name="email"
                className="ab"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col w-[22vw]">
              <label htmlFor="">Password</label>
              <input
                type="password"
                onChange={handlechange}
                value={form.password}
                name="password"
                className="ab"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button
            onClick={handlesubmit}
            className="b border-2 cursor-pointer border-amber-100"
          >
            {islogin ? "Sign in" : "Sign up"}
          </button>
          <div className="text-[13px] text-gray-400">
            {islogin ? "Don't have an account?" : "Already have account ?"}{" "}
            <span
              onClick={() => {
                setislogin(!islogin);
              }}
              className="text-black font-bold cursor-pointer"
            >
              {!islogin ? "Sign in" : "Sign up"}
            </span>
          </div>
        </div>
        <div className="w-[47%]  border-l-4 border-white rounded-4xl"></div>
      </div>
    </div>
  );
};

export default Login;
