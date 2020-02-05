window.localStorage.removeItem('index');
// window.uploadFiles = function ...
const uploadFiles = function(hezi, xuanze, start, filetype, calback1, calback2, calback3, is_shibie){
    // let g_object_name_type = 'random_name';
    if(is_shibie == true){
        var g_object_name_type = 'local_name';
    } else{
        var g_object_name_type = 'random_name';
    }

    // 定义参数
    let accessid = '',
    accesskey = '',
    host = '',
    policyBase64 = '',
    signature = '',
    callbackbody = '',
    filename = '',
    key = '',
    suffix,
    expire = 0,
    g_object_name = '',
    tmp_name = '',
    timestamp;
    let now = timestamp = Date.parse(new Date()) / 1000; 

    // ajax请求接口返回配置信息
    function send_request(){
        var xmlhttp = null;
        if (window.XMLHttpRequest)
        {
            xmlhttp=new XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
      


        if (xmlhttp!=null)
        {
            let serverUrl = 'http://tansuo.lebaosongfu.net/admin/upload/index';
            xmlhttp.open( "GET", serverUrl, false );
            xmlhttp.send( null );
            return xmlhttp.responseText
        }
        else
        {
            alert("Your browser does not support XMLHTTP.");
        }
    };

    // 填入配置信息 返回pei值状态
    function get_signature(){
        // 可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
        now = timestamp = Date.parse(new Date()) / 1000; 
        if (expire < now + 3)
        {
            let body = send_request()
            var obj = eval ("(" + body + ")");
            host = obj['host']
            policyBase64 = obj['policy']
            accessid = obj['accessid']
            signature = obj['signature']
            expire = parseInt(obj['expire'])
            callbackbody = obj['callback'] 
            key = obj['dir']
            window.localStorage['index']=JSON.stringify(obj);
            return true;
        }
        return false;
    };

    // 随机生成字符串
    function random_string(len){
        len = len || 32;
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
        var maxPos = chars.length;
        var pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    // 获取文件后缀名
    function get_suffix(filename){
        let pos = filename.lastIndexOf('.')
        suffix = ''
        if (pos != -1) {
            suffix = filename.substring(pos)
        }
        return suffix;
    }

    // 计算文件完整路径 g_object_name
    function calculate_object_name(filename){
        if (g_object_name_type == 'local_name')
        {
            g_object_name += "${filename}"
        }
        else if (g_object_name_type == 'random_name')
        {
            suffix = get_suffix(filename)
            // 判断类型
            g_object_name = key + filetype +'/' +random_string(10) + suffix
        }
        return ''
    }

    // 获取文件完整路径 返回g_object_name
    function get_uploaded_object_name(filename){
        if (g_object_name_type == 'local_name')
        {
            tmp_name = g_object_name
            tmp_name = tmp_name.replace("${filename}", filename);
            return tmp_name
        }
        else if(g_object_name_type == 'random_name')
        {
            return g_object_name
        }
    }

    // 设置上传参数信息 开始上传
    function set_upload_param(up, filename, ret){
        if (ret == false)
        {
            // 获取配置信息
            ret = get_signature()
        }
        g_object_name = key;
        if (filename != '') { suffix = get_suffix(filename)
            calculate_object_name(filename)
        }
        let new_multipart_params = {
            'key' : g_object_name,
            'policy': policyBase64,
            'OSSAccessKeyId': accessid, 
            'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
            'callback' : callbackbody,
            'signature': signature,
            'author': 'rexhang'
        };

        up.setOption({
            'url': host,
            'multipart_params': new_multipart_params
        });

        up.start();
    }

    
    var typeArr = {
        //允许上传文件
        'image': { title : "Image files", extensions : "jpg,jpeg,gif,png,bmp" }, 
        'video': { title : "Video files", extensions : "mov,mp4,avi,flv" },
        '3d': { title : "Zip files", extensions : "zip,rar,7z" },
        'mp3': { title : "Mp3 files", extensions : "mp3" }
    }

    var uploader = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : xuanze, 
        multi_selection: false,
        container: document.getElementById(hezi),
        flash_swf_url : 'https://interface.arseeds.com/oss-lib/plupload-2.1.2/js/Moxie.swf',
        silverlight_xap_url : 'https://interface.arseeds.com/oss-lib/plupload-2.1.2/js/Moxie.xap',
        url : 'https://oss.aliyuncs.com',

        filters: {
            mime_types : [
                typeArr[filetype]
            ],
            max_file_size : '10mb', //最大只能上传10mb的文件
            prevent_duplicates : true //不允许选取重复文件
        },

        init: {
            PostInit: function() {
                document.getElementById(start).onclick = function() {
                    set_upload_param(uploader, '', false);
                    return false;
                };
            },

            FilesAdded: function(up, files) {
                plupload.each(files, function(file) {
                    calback2(file)
                });
            },

            BeforeUpload: function(up, file) {
                set_upload_param(up, file.name, true);
            },

            UploadProgress: function(up, file) {
                calback1(file);
            },

            FileUploaded: function(up, file, info) {
                if (info.status == 200)
                {
                    // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name(file.name) + ' 回调服务器返回的内容是:' + info.response;
                    
                    calback3(JSON.parse(window.localStorage['index'] || '{}').host + '/' + get_uploaded_object_name(file.name));
                }
                else if (info.status == 203)
                {
                    window.localStorage['FileUploadedError'] = '上传到OSS成功，但是oss访问用户设置的上传回调服务器失败，失败原因是:'+info.response;
                }
                else
                {
                    window.localStorage['FileUploadedError'] = info.response;
                } 
            },

            Error: function(up, err) {
                if (err.code == -600) {
                    window.localStorage['Error'] = '选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小';
                }
                else if (err.code == -601) {
                    window.localStorage['Error'] = '选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型';
                }
                else if (err.code == -602) {
                    window.localStorage['Error'] = '这个文件已经上传过一遍了';
                }
                else 
                {
                    window.localStorage['Error'] = 'Error xml:'+err.respons;
                }
            }
        }
    });

    uploader.init();
}

export default uploadFiles;