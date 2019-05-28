import ChecklistApp from "./components/checklist-app.vue";
import Vue from "vue";
import $ from "jquery";

Vue.mixin({
    mounted : function () {
        const elWrapper = $(this.$el);
        debugger;
        elWrapper.find("[data-toggle=tooltip]").tooltip()
        elWrapper.find(".btn").on("click",(e) => {
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

