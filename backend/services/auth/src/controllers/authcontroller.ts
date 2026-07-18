import bcrypt from "bcryptjs";
import { Auth } from "../models/authmodel.js";

import { tryCatch,err,success } from "@gothalo/shared";
import validator from "validator";
import { gettoken } from "../utils/jwt.js";
import {publishMessage} from "@gothalo/shared"

const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return err(res, "Pls provide all credentials");
  }
  if (!validator.isEmail(email)) {
    return err(res, "Pls provide valid email");
  }
  const user = await Auth.findOne({ email });
  if (!user) {
    return err(res, "User not found");
  }

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return err(res, "Invalid credentials");
  }

  const token = gettoken(user._id);
  if (token) {
    res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    return success(res, "Login successfull", {
      email: user.email,
      fullname: user.fullname,
    });
  }
});

const signup = tryCatch(async (req, res) => {
  const { email, password, fullname } = req.body;
  if (!email || !password || !fullname) {
    return err(res, "Pls provide all credentials");
  }

  if (!validator.isEmail(email)) {
    return err(res, "Pls provide valid email");
  }
  let user = await Auth.findOne({ email });
  if (user) {
    return err(res, "User already exist");
  }

  if (!validator.isStrongPassword(password)) {
    return err(res, "Pls provide strong password");
  }

  const hashed = await bcrypt.hash(password, 10);
  user = await Auth.create({
    email,
    password:hashed,
    fullname,
  });

  if (user) {
    const token = gettoken(user._id);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    await publishMessage("email-ex","email123",{email:user.email})


    return success(res, "User create successfully", {
      email: user.email,
      fullname: user.fullname,
    });
  }
});

const logout=tryCatch(async (req ,res)=>{

  res.clearCookie("token")
  return success(res,"User logout successfully")
})


export{
  signup,login,logout
}
