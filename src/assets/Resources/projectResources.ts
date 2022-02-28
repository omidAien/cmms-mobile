import { SystemInformation } from "src/app/shared/appModels";
import { LoginPageUIText } from "./projectInterfaceResources";

let culture:string = "en";

const systemInformation = sessionStorage.getItem("systemInformation");
if ( systemInformation ) {
    const data:SystemInformation = JSON.parse(systemInformation);
    culture = data.Culture;
};

// LogIn Page 

export const loginPageUIText: LoginPageUIText = {
    usernameLabelText: culture === "fa" ? "نام کاربری" : "Username",
    passwordLabelText: culture === "fa" ? "گذرواژه" : "Password",
    logInBtnText: "fa" ? "ورود به حساب کاربری" : "LogIn",
    remmeberMeCheckBoxText: culture === "fa" ? "مرا در این رایانه به خاطر نگه‌دار" : "Remmber Me",
    retrievePasswordText: culture === "fa" ? "بازیابی کلمه عبور" : "Fotget Password",
    hasAccountText: culture === "fa" ? "حساب کاربری ندارید؟" : "Do You Have Not An Account?",
    createNewAccountText: culture === "fa" ? "ایجاد حساب کاربری جدید" : "Create New Account",
}
