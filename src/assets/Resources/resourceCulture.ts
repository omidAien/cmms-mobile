import { ResourceCultureStore } from "src/app/shared/ResourceManager/resourceModels";

export const resourceCultureStore:{ [key:string]: ResourceCultureStore } = {

    fa: {
        loginPageUsernameText: "نام کاربری",
        loginPagePasswordText: "کلمه عبور",
        loginPageEnterBtnText: "ورود به حساب کاربری",
        loginPageRememeberMeText: "مرا در این رایانه بخاطر نگه دار",
        loginPageRetrievePasswordText: "بازیابی گذرواژه",
        loginPageHasAccountText: "حساب کاربری ندارید؟",
        loginPageCreateNewAccount: "ایجاد حساب کاربری جدید",
        selectWorkGroupText: "انتخاب گروه کاری",
        selectWorkGroupTitleText: "لطفا گروه کاری پیش فرض خود را انتخاب نمایید",
        redirectToDashboardBtnText: "ورود به صفحه کاری",
        accountSettingsText: "تنظیمات حساب کاربری",
        ChangePasswordText: "تغییر گذرواژه",
        logOut: "خروج از حساب کاربری",
        networkDisconnectedErrorMessageText: "اتصال شبکه یا اینترنت را بررسی نمایید.",
        serverBadRequestErrorMessageText: "400 BAD REQUEST",
        baseCRUDImagePathText: "../../../assets/images/user-icon@96.png",
        generalServerErrorMessageText: "خطایی سمت سرور رخ داده است"
    },
    en: {
        loginPageUsernameText: "Username",
        loginPagePasswordText: "Password",
        loginPageEnterBtnText: "LogIn To Account",
        loginPageRememeberMeText: "Remember me",
        loginPageRetrievePasswordText: "Password Retrieve",
        loginPageHasAccountText: "Do not have an account?",
        loginPageCreateNewAccount: "Create New Account",
        selectWorkGroupText: "Select WorkGroup",
        selectWorkGroupTitleText: "Please Select Your Default Wrokgroup",
        redirectToDashboardBtnText: "Login To Dashboard",
        accountSettingsText: "Account settings",
        ChangePasswordText: "Change Password",
        logOut: "LogOut",
        networkDisconnectedErrorMessageText: "NETWORK OR INTERNET DISCONNECTED",
        serverBadRequestErrorMessageText: "400 BAD REQUEST",
        baseCRUDImagePathText: "../../../assets/images/user-icon@96.png",
        generalServerErrorMessageText: "A Server Error Occurred"
    }

}