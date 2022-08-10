import { axios } from "../utils/request"

//提交修改方法
export const getVideoData = (data) => {
    return axios({
        url: 'test/videoFinds',
        method: 'post',
        data,
    })
}