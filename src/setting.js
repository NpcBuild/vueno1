// todo 全局配置
// module.exports = {
//     // /**
//     //  * @type {string}
//     //  * @description 网站默认的 title 信息
//     //  */
//     // title: 'ingos web template',
//     //
//     // /**
//     //  * @type {boolean} true or false
//     //  * @description 是否固定网站的 header
//     //  */
//     // fixedHeader: false,
//     //
//     // /**
//     //  * @type {boolean} true or false
//     //  * @description 是否显示侧边栏的 logo
//     //  */
//     // sidebarLogo: false,
// };

// 上传文件后缀限制
export const ACCEPT_CONFIG = {
    image: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
    video: ['.mp4', '.rmvb', '.mkv', '.wmv', '.flv'],
    document: ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.tif', '.tiff'],
    getAll(){
        return [...this.image, ...this.video, ...this.document]
    },
};