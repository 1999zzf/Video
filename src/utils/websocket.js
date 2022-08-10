import {
    ElMessage
} from 'element-plus';
let socket = null;
let lockReconnet = false;	//避免重复连接
const wsUrl = '';
let isReconnet = false;
let globalCallback = null;	//把要发送给socket的数据和处理socket返回数据的回调保存起来

let createSocket = url => {	//创建socket
    try {
        if ('WebSocket' in window) {
            socket = new WebSocket(url)
        }
        //Vue.prototype.socket = socket	//需要主动关闭的话就可以直接调用this.socket.close()进行关闭，不需要的话这个可以去掉
        initSocket()
    } catch (e) {
        reconnet(url)
    }

}

let sendMsg = (data, callback) => {
    if (socket.readyState === 1) {
        globalCallback = callback;
        data = JSON.stringify(data);
        socket.send(data);
    } else {
        setTimeout(() => {
            // console.log(socket, '等待socket链接成功')
            sendMsg(data, callback)
        }, 5500)
        return false
    }
    socket.onmessage = ev => {
        callback && callback(ev)
    }


    // globalCallback = data
    // socket.send(data);
    // //发送数据,接收数据
    // socket.onmessage = ev => {
    //     callback && callback(ev)
    // }

}

let initSocket = () => {	//初始化websocket
    socket.onopen = () => {
        if (socket.readyState === 1) {
            ElMessage({
                message: 'websocket连接成功',
                type: 'success'
            })
        }
        //heartCheck.reset().start()	//心跳检测

        if (isReconnet) {//执行全局回调函数
            //console.log('websocket重新连接了')
            sendMsg(globalCallback)
            isReconnet = false
        }
        // socket.send(JSON.stringify({
        //     "cmd": "SET_AREA",
        //     "monitorAreaNo": sessionStorage.getItem("area")
        // }))

    }

    // socket.onmessage = () => {
    //     // sessionStorage.setItem("", host);
    //     // console.log(ev,'连接正常')
    //     //heartCheck.reset().start()	//心跳检测
    // }

    socket.onerror = () => {
        ElMessage({
            message: 'websocket连接出错',
            type: 'error'
        })
        reconnet(wsUrl)
    }



    socket.onclose = () => {
        ElMessage({
            message: 'websocket连接关闭',
            type: 'error'
        })
        reconnet(wsUrl)
    }
}
let closeSocket = () => {	//发送数据,接收数据
    socket.close();
    socket.onclose = () => {
        ElMessage({
            message: 'websocket连接关闭',
            type: 'error'
        })
        reconnet(wsUrl)
    }
}
let getSocketState = () => {
    return socket.readyState
}
let reconnet = url => {	//重新连接websock函数
    if (lockReconnet)
        return false

    isReconnet = true;
    lockReconnet = true
    setTimeout(() => {
        createSocket(url)
        lockReconnet = false
    }, 2000)
}

// let heartCheck = {	//心跳检测
// 	timeout: 60*1000,
// 	timeoutObj: null,
// 	serverTimeoutObj: null,
// 	reset(){
// 		clearTimeout(this.timeoutObj)
// 		clearTimeout(this.serverTimeoutObj)
// 		return this;
// 	},
// 	start(){
// 		let that = this;
// 		this.timeoutObj = setTimeout(()=>{
// 			//发送数据，如果onmessage能接收到数据，表示连接正常,然后在onmessage里面执行reset方法清除定时器
// 			socket.send('heart check')
// 			this.serverTimeoutObj = setTimeout(()=>{
// 				socket.close()
// 			},that.timeout)
// 		},this.timeout)
// 	}
// }



export { sendMsg, createSocket, closeSocket, getSocketState }