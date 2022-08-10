import { axios } from "../utils/request"

//回显方法
export const getPropertyInfo = (data) => {
    return axios({
        url: "property/getPropertyInfo",
        method: "post",
        data,
    })
}
//提交修改方法
export const editPropertyInfo = (data) => {
    return axios({
        url: 'property/editPropertyInfo',
        method: 'post',
        data,
    })
}