import { LoginPageUIText, SelectWorkGroupUIText, SingleErrorMessage } from "./projectInterfaceResources";

// LogIn Page 
export const getLogInPageUIText = (culture:string): LoginPageUIText => {

    const loginPageUIText: LoginPageUIText = {
        usernameLabelText: culture === "fa" ? "نام کاربری" : "Username",
        passwordLabelText: culture === "fa" ? "گذرواژه" : "Password",
        logInBtnText: "fa" ? "ورود به حساب کاربری" : "LogIn",
        remmeberMeCheckBoxText: culture === "fa" ? "مرا در این رایانه به خاطر نگه‌دار" : "Remmber Me",
        retrievePasswordText: culture === "fa" ? "بازیابی کلمه عبور" : "Fotget Password",
        hasAccountText: culture === "fa" ? "حساب کاربری ندارید؟" : "Do You Have Not An Account?",
        createNewAccountText: culture === "fa" ? "ایجاد حساب کاربری جدید" : "Create New Account",
    }

    return loginPageUIText;

}

// Select-Work_Group Page
export const getSelectWorkGroupUIText = (culture:string): SelectWorkGroupUIText => {

    const selectWorkGroupUIText: SelectWorkGroupUIText = {
        selectWorkGroupLabel: culture === "fa" ? "انتخاب گروه کاری" : "Select WorkGroup",
        selectWorkGroupTitle: culture === "fa" ? "لطفا گروه کاری پیش فرض خود را انتخاب نمایید" : "Please Select Your Default Wrokgroup",
        redirectToDashboard: culture === "fa" ? "ورود به صفحه کاری" : "Login"
    };

    return selectWorkGroupUIText;
    
}

// ServerErrorMessage
export const ServerErrorMessageResources: SingleErrorMessage = {
    message: "NETWORK OR INTERNET DISCONNECTED"
};


