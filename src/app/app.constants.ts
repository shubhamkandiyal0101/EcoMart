const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
const StringSpacesRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const MobileRegex = /^\d{10}$/;
const PincodeRegex = /^\d{6}$/;

export {
    EmailRegex, StringSpacesRegex, MobileRegex, PincodeRegex
}