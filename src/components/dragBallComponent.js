import dragBallComponent from "@/components/dragBallComponent.vue";
export default {
    install: (Vue)=> {
        Vue.component('drag-ball',dragBallComponent)
    }
}