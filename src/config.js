/*
* @Author: guhang
* @Date:   2018-01-03 14:13:20
 * @Last Modified by: rexhang
 * @Last Modified time: 2018-03-09 16:42:18
*/

/**
 * 接口配置文件
 */

const host = "http://tansuo.lebaosongfu.net";

const _API = {

    // post 登录 
    login: `${host}/admin/login/index`,

    // get 首页项目列表 
    index: `${host}/admin/index/index`,

    // get 获取项目详情接口 
    getdetail: `${host}/admin/index/getdetail`,

    // get 添加项目接口 
    addProject: `${host}/admin/index/addProject`,

    // post 更新项目接口 
    updateProject: `${host}/admin/index/updateProject`,

    // post 删除项目接口 
    deleteProject: `${host}/admin/index/deleteProject`,

    // post 添加项目元素接口 
    add: `${host}/admin/element/add`,

    // get 获取项目元素详情接口 
    element: `${host}/admin/element/index`,

    // post 更新获取用户信息接口 
    admin: `${host}/admin/admin/index`,
    
    // post 更新说明信息接口
    aboutView: `${host}/admin/login/aboutView`,

    // get 获取增加元素详细信息接口
    addElements: `${host}/admin/index/getReconginate`,

    // get/post 获取banner数据
    getBanner: `${host}/admin/carousel/index`,

    // get/post 提交banner数据
    saveBanner: `${host}/admin/carousel/add`,

    // post 图片上传接口
    uploadimg: `https://api.arseeds.com/explore/img-show/upload`

}

export {
	host,
	_API
}
