import Vue from 'vue';
import Guide from './guide.vue';


export default function guide({ elements, config = {} } = {}) {
return new Promise((resolve) => {
const Ctor = Vue.extend(Guide);

const vm = new Ctor({
propsData: {
elements,
config,
},
});
vm.$mount();
document.body.append(vm.$el);

vm.$on('confirm', () => {
vm.$el.remove();
vm.$destroy();
resolve();
});
});
}