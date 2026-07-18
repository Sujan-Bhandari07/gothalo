import bcrypt from "bcryptjs";
import { Auth } from "../models/authmodel.js";
import { err, success } from "../utils/response.js";
import { tryCatch } from "../utils/tryCatch.js";
import validator from "validator";
import { gettoken } from "../utils/jwt.js";
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
        password,
        fullname,
    });
    if (user) {
        const token = gettoken(user._id);
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return success(res, "User create successfully", {
            email: user.email,
            fullname: user.fullname,
        });
    }
});
const ;
