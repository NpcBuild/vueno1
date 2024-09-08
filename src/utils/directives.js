import Vue from 'vue'

Vue.directive('click-outside', {
    bind(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
            if (el === event.target) {
                // 如果点击事件发生在el上，触发绑定的方法
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
});
/**
 * 使用方法
 * 将以下代码复制到一个drag.js文件中，然后在入口文件main.js中导入：import '@/directive/dialogDrag.js'；
 * 给elementUI的dialog上加上  v-dialogDragg 指令就可以实现弹窗的全屏和拉伸了
 * 给dialog设置  :close-on-click-modal='false' ，禁止点击遮罩层关闭弹出层
 * 如果是form表单，不要将提交等按钮放置el-form-item，以免在上下拉伸时被隐藏
 */
//v-drag实现拖拽
Vue.directive('drags', {
    bind(el) {
        let oDiv = el;  // 获取当前元素
        oDiv.onmousedown = (e) => {
            console.log(11111111)
            // 算出鼠标相对元素的位置
            let disX = e.clientX - oDiv.offsetLeft;
            let disY = e.clientY - oDiv.offsetTop;

            document.onmousemove = (e) => {
                // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;
                let top = e.clientY - disY;

                oDiv.style.left = left + 'px';
                oDiv.style.top = top + 'px';
            };

            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
                console.log(e)
            }
        }
    },
    /*阻止拖拽*/
    stopdrag: {
        inserted: function(el, binding, vnode) {
            let element = el;
            element.onmousedown = function(e) {
                e.stopPropagation()
            }
            console.log(binding)
            console.log(vnode)
        }
    }
})
