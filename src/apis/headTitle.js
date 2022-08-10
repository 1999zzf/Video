import { axios } from "../utils/request"

export const Shut = (data) => {
    return axios({
        url: 'monitorRecord/monitorQuit',
        method: 'post',
        data,
    })
}