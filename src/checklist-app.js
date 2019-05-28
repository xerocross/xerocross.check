import ChecklistApp from "./components/checklist-app.vue";
import Vue from "vue";
import $ from "jquery";

Vue.mixin({
    mounted : function () {
        const elWrapper = $(this.$el);
        elWrapper.tooltip()
        elWrapper.find(".btn").on("click",(e) => {
            console.log("clicked this button; about to hide tooltip");
            $(e.target).tooltip("hide").blur();

        })
    }
})

new Vue({
    el : "#checklist-app",
    components : {
        ChecklistApp
    },
    render : function (createElement) {
        return createElement(ChecklistApp);
    }
});

