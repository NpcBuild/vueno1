// import axios from "../utils/request";
import axios from "axios";

const base = {
    baseUrl:"http://api.tianapi.com",
    pyqwenan:"/pyqwenan/index"
}

const api = {
    /*
    朋友圈文案
     */
    getPyqwenan(params){
        return axios.get(base.baseUrl + base.pyqwenan,{
            params
        })
    }
}

export default api;
