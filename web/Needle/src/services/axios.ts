import axios from 'axios';

export async function getData(api: string, token?: string) {

    const response = await axios.get(api);
    return response;

}

export async function getBlob(api: string, token?: string) {
   
    const url = api;
    const method = 'GET';
    const response = await axios

    .request({

      url,

      method,

      responseType: 'blob', 

    });
    return response;

}

export async function postData(api: string, data: any, token?: string) {

    const response = await axios.post(api, data);
    return response;

}

export async function putData(api: string, data: any, token?: string) {

    const response = await axios.put(api, data);
    return response;

}

export async function deleteData(api: string, data?: any, token?: string) {
    const response = await axios.delete(api);
    return response;

}
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");

    if (!token) {
        return config;
    }
    config.headers.Authorization = "Bearer "+ token;
    // config.headers={
    //     "Content-Type": "application/json",
    //     'Access-Control-Allow-Origin': "*",
    //     "Authorization":"Bearer "+ token
    //     }

    return config;
  });