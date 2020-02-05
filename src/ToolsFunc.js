/*
* @Author: rexhang
* @Date:   2017-12-20 10:16:52
 * @Last Modified by:   guhang
 * @Last Modified time: 2018-01-10 17:43:56
*/

const _getUrlParams = (params) => {
    let reg = new RegExp("(^|&)" + params + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
    /*带解析中文的方案*/
    /*var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;*/
}

const _getUrlParamsZh_CN = (params) => {
    /*带解析中文的方案*/
    var reg = new RegExp("(^|&)" + params +"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
}

const _validate = {
    badName: (badname) => { // 验证user名是否包含特殊字符
        let badnameReg = /[\\\/<>&\"\'\`#\*\^\~\|,:;\?\(\)\[\]%\$]/;
        if (badnameReg.test(badname)) {
            return true;
        }
        return false;
    },
    email: (email) => { // 验证邮箱格式
        let emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return emailReg.test(email);
    },
    space: (space) => { // 验证是否含空格
        let spaceReg = /\s+/;
        return spaceReg.test(space);
    },
    phone: (phone) => { // 验证电话吗是否合格
        let phoneReg = /^1[3,5,7,8]\d{9}$/;
        return phoneReg.test(phone);
    },
    url: (url) => { // 验证网址
        let urlReg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        return urlReg.test(url);
    }
}

const _imgLoadComplete = function (imgObj, callback) {
    let imgLoadTimer = setInterval(function () {
        console.log('img load is?' + imgObj.complete);
        if (imgObj.complete) {
            callback(imgObj)
            clearInterval(imgLoadTimer)
        }
    }, 40)
}

const _filterUrlParams = function(urlParams){
    let str_urlParams = JSON.stringify(urlParams).replaceAll("\"","");;
    let urlParamsArr = str_urlParams.substring(1, str_urlParams.length-1).split(',');
    let _len = urlParamsArr.length;
    let _urlParams = '';
    for(let i = 0;i < _len;i++){
        let _key = urlParamsArr[i].split(':')[0];
        let _value = urlParamsArr[i].split(':')[1];
        for(let m = 0;m < urlParamsArr[i].split(':').length;m++){
            if(m > 1){
                _value += ':'+urlParamsArr[i].split(':')[m]
            }
        }
        _urlParams += _key + '=' + _value + ((i >= _len-1) ? '' : '&');
    }
    return _urlParams;
}

const _local = { // 本地存储服务
    //存储单个属性
    set(key, value) {
        window.localStorage[key] = value;
    },
    //读取单个属性
    get(key, defaultValue) {
        return window.localStorage[key] || defaultValue;
    },
    //存储对象，以JSON格式存储
    setObject(key, value) {
        window.localStorage[key] = JSON.stringify(value);
    },
    //读取对象
    getObject(key) {
        return JSON.parse(window.localStorage[key] || '{}');
    },
    // 清除指定元素
    remove(key) {
        window.localStorage.removeItem(key);
    },
    // 清除全部
    clear() {
        window.localStorage.clear();
    }
};

// 时间转换秒数
const _formatTime = (timeTemp) => {
    let m = Math.floor(timeTemp / 60);
    let s = Math.floor(timeTemp % 60);
    return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
};

// 时间戳转时间格式
const _getLocalTime = (nS) => {
    return new Date(parseInt(nS) * 1000).toLocaleString('chinese', {hour12: false}).replace(/\//g, '-');
};

const _getBase64Image = (img) => {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL // return dataURL.replace("data:image/png;base64,", ""); 
}

export const getUrlParams = _getUrlParams;

export const getUrlParamsZh_CN = _getUrlParamsZh_CN;

export const validate = _validate;

export const imgLoadComplete = _imgLoadComplete;

export const filterUrlParams = _filterUrlParams;

export const local = _local;

export const formatTime = _formatTime;

export const getLocalTime = _getLocalTime;

export const getBase64Image = _getBase64Image;
