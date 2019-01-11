import ChecklistApp from "./components/checklist-app.vue";
import Vue from "vue";

new Vue({
    el : "#checklist-app",
    components : {
        ChecklistApp
    },
    render : function (createElement) {
        return createElement(ChecklistApp);
    }
});
