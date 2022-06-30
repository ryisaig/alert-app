import axios from 'axios'
import { HOST } from '../URL';

// const URL = "http://192.168.1.12:5000";
const URL = HOST;

export const generateOtp = (mobileNumber: any, callback: any) => {
    axios.get(URL + "/user/otp?mobileNumber=" + mobileNumber)
    .then(res => {
        callback(res.data.referenceKey);
    }).catch(error => {
        alert(error);
    });
};

export const validateOtp = (referenceKey: string, otp: string, callback: any) => {
    axios.get(URL + "/user/otp/validate?referenceKey=" + referenceKey + "&otp=" + otp)
    .then(res => {
        callback(res.data);
    }).catch(error => {
        alert(error);
    });
}

export const getUser = (mobileNumber:any, callback:any) => {
    axios.get(URL + "/user?mobileNumber=" + mobileNumber)
    .then(res => {
        callback(res.data);
    }).catch(error => {
        alert(error);
    });
}

export const saveUser = (userDetails:any, callback:any) => {
    
    axios.post(URL + "/user", {
        mobileNumber: sessionStorage.getItem("user"),
        name: userDetails.fullName,
        brgy: userDetails.brgy,
        lastName: userDetails.lastName,
        address: userDetails.address,
        geolocationX: sessionStorage.getItem("geoLocationX"),
        geolocationY: sessionStorage.getItem("geoLocationY"),
    })
    .then((result) => {
       callback(result.data);
    }).catch(error => {
        alert(error);
    });
}