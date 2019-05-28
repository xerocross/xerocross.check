<template>
    <div class="checklist-using">
        <checklist-select 
            :checklists = "checklists"
            :current-checklist-key = "currentChecklistKey"
            @event_checklist_key = "updateKey"
        ></checklist-select>
        <div 
            class="btn-panel"
            
        >
            <button 
                v-show = "checklistKeys.length > 0" 
                class="btn btn-secondary"
                data-toggle="tooltip"
                title="edit the current checklist" 
                @click.prevent = "editThisChecklist"    
            >edit
            </button>
            <button 
                v-show = "checklistKeys.length > 0" 
                class="btn btn-secondary"
                data-toggle="tooltip"
                title="delete the current checklist" 
                @click.prevent = "deleteThisChecklist"   
            >delete</button>
            <button
                class="btn btn-secondary" 
                data-toggle="tooltip"
                title="create a new checklist" 
                @click.prevent = "makeNewChecklist"       
            >new</button>
        </div>
        <div 
            class = "usage-panel">
            <checklist-display 
                v-if = "checklists[currentChecklistKey]"
                :checklist-data = "checklists[currentChecklistKey]" 
                @click_item = "toggleItemDone"
                @event_reset = "resetThisChecklist"
            />
        </div>
    </div>
</template>
<script>
import ChecklistSelect from "./checklist-select.vue";
import ChecklistDisplay from "./checklist-display.vue";

export default {
    components : {
        ChecklistSelect,
        ChecklistDisplay
    },
    props : {
        checklists : {
            type : Object,
            default : () => {}
        },
        currentChecklistKey : {
            type : String,
            default : ""
        }
    },
    data () {
        return {
        }
    },
    computed : {
        checklistKeys () {
            return Object.keys(this.checklists);
        },
        currentChecklistObject () {
            return this.checklists[this.currentChecklistKey];
        },
    },
    mounted () {
        //alert("key  " + this.currentChecklistKey);
    },
    methods : {
        updateKey (newKey) {
            this.$emit("event_update_checklist_key", newKey);
        },
        toggleItemDone (key) {
            debugger;
            let item = this.currentChecklistObject.items.filter(item => item.key == key)[0];
            if (item.done == true) {
                if(confirm("Uncheck this item?")) {
                    item.done = false;
                }
            } else {
                this.$set(item, "done", true);
                let t = new Date();
                this.$set(item, "doneTime", t.toJSON());
            }
            this.$emit("event_persist");
        },
        resetThisChecklist () {
            if (confirm("Reset the current checklist?")) {
                let list = this.currentChecklistObject.items;
                list.forEach((item) => {item.done = false});
                this.$emit("event_persist");
            }
        },
        deleteThisChecklist () {
            if (confirm("Delete this checklist?  (There is no undo.)")) {
                this.$emit("event_delete");
            }
        },
        editThisChecklist () {
            this.$emit("event_edit");
        },
        makeNewChecklist () {
            this.$emit('event_new');
        }
    }
}
</script>
<style lang="scss">
.checklist-using {
    .btn-panel {
        margin-top: 5px;
        margin-bottom: 5px;
    }
}
</style>