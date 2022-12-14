//获取当前时间
export const getTime = () => {
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    let hh = new Date().getHours();
    let mf =
        new Date().getMinutes() < 10
            ? "0" + new Date().getMinutes()
            : new Date().getMinutes();
    let ss =
        new Date().getSeconds() < 10
            ? "0" + new Date().getSeconds()
            : new Date().getSeconds();
    return yy + "/" + mm + "/" + dd + " " + hh + ":" + mf + ":" + ss
}
//时间戳转换
export const changeToDateTime = (time) => {
    return new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}