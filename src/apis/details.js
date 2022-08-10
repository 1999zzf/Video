import { axios } from "../utils/request"

//提交修改方法
export const getPagesData = (data) => {
    return axios({
        url: 'monitorRecord/getMonitorRecordPage',
        method: 'post',
        data,
    })
}
//查看格口
export const getLattice = (data)=>{
    return axios({
        url:'monitorRecord/findWallBillNoToLattices',
        method:'post',
        data,
    })
}
//处理快件
export const monitorRecord = (data)=>{
    return axios({
        url:'monitorRecord/processExpress',
        method:'post',
        data,
    })
}
export const button = (data)=>{
    return axios({
        url:'monitorRecord/messageNums',
        method:'post',
        data,
    })
}
export const Round = (data)=>{
    return axios({
        url:'monitorRecord/cameraBylatticNos',
        method:'post',
        data,
    })
}
export const Handel=(data)=>{
    return axios({
        url:'monitorRecord/updateToDayData',
        method:'post',
        data
    })
}