import axios from 'axios'
import { HOST } from '../URL';

const URL = HOST;

export const getPendingCallTreeList = (callback:any) => {
    axios.get(URL + "/calltree/pending", { params: {mobileNumber: sessionStorage.getItem("user")}})
    .then(res => {
        callback(res.data);
    });
}

export const getAlerts = (callback:any) => {
    axios.get(URL + "/alert", { params: {mobileNumber: sessionStorage.getItem("user")}})
    .then(res => {
        callback(res.data);
    });
}

export const getInstructionalCallTreeList = (callback:any) => {
    axios.get(URL + "/informational")
    .then(res => {
        callback(res.data);
    });
}

export const getRespondedCallTreeList = (callback:any) => {
    axios.get(URL + "/calltree/responded", { params: {mobileNumber: sessionStorage.getItem("user")}})
    .then(res => {
        const calltree:any[] = [];
        res.data.forEach((data:any) => {
            calltree.push({subject: data.callTree.subject + " - " + data.response +  ( data.additionalDetails && " ( " +  data.additionalDetails + " )"), createdDate: data.callTree.createdDate});
        })
        console.log("calltree", calltree);
        callback(calltree);
    });
}

export const getCallTreeDetails = (id:any, callback:any) => {
    axios.get(URL + "/calltree/pending/" + id, { params: {mobileNumber: sessionStorage.getItem("user")}})
    .then(res => {
        callback(res.data);
    });
}

export const getAlertDetails = (id:any, callback:any) => {
    axios.get(URL + "/alert/" + id + "/details")
    .then(res => {
        callback(res.data);
    });
}

export const getInformationalDetails = (id:any, callback:any) => {
    axios.get(URL + "/informational/" + id + "/details")
    .then(res => {
        callback(res.data);
    });
}



export const saveCallTreeResponse = (callTreeId: any, response: string, details: string, callback: any) => {
    axios.post(URL + "/calltree/respond/", {
        mobileNumber: sessionStorage.getItem("user"),
        callTreeId: callTreeId,
        additionalDetails: details,
        response: response
    })
    .then(() => {
       callback();
    })
}