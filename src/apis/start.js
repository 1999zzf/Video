import { axios } from "../utils/request"
export const button1 = (data) => {
    return axios({
        url: 'monitorRecord/messageNums',
        method: 'post',
        data,
    })
}
export const Login = (data) => {
    return axios({
        url: 'monitorRecord/monitorLogin',
        method: 'post',
        data,
    })
}