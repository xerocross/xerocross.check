<template>
    <div class="checklist-app">
        <h1>check</h1>
        <div v-show = "status == 'using'">
            <select 
                v-model = "currentChecklistKey" 
                class="form-control">
                <option 
                    v-for ="checklistKey in checklistKeys" 
                    :key = "checklistKey" 
                    :value = "checklistKey"
                >
                    {{ checklists[checklistKey].name }}
                </option>
            </select>
            <div class="btn-group">
                <a 
                    class="btn btn-success" 
                    @click.prevent = "edit">edit</a>
                <a 
                    class="btn btn-success" 
                    @click.prevent = "makeNewChecklist">new</a>
            </div>
            <div 
                class = "usage-panel">
                <checklist-usage :checklist-data = "checklists[currentChecklistKey]" />
            </div>
        </div>

        <checklist-editor
            v-if = "status == 'editing'"
            :current-checklist = "checklists[currentChecklistKey]"
            @event_save = "saveEdits"
            @event_cancel = "status = 'using'"
        />
        <checklist-editor
            v-if = "status == 'new'"
            :current-checklist = "baseNewChecklist"
            @event_cancel = "status = 'using'"
            @event_save = "saveNew"
        />

    </div>
</template>
<script>
import ChecklistEditor from "./checklist-editor.vue";
import {SimpleHashSet} from "xerocross-dstructs";
import ChecklistUsage from "./checklist-usage.vue";
import {StoreLocal} from "cross-vue-base";
import {StringHash} from "../helpers/string-hash.js";

export default {
    components : {
        ChecklistEditor,
        ChecklistUsage
    },
    data () {
        return {
            checklists : {},
            baseNewChecklist : {
                checklistName : "",
                itemList : []
            },
            currentChecklistKey : "",
            status : "using",
            localStore : null
        }
    },
    computed : {
        checklistKeys () {
            return Object.keys(this.checklists);
        }
    },
    mounted () {
        this.buildFromStorage();
        this.currentChecklistKey = this.checklistKeys[0];
    },
    methods : {
        buildFromStorage () {
            let indexName = "checklists";
            try {
                this.localStore = StoreLocal.build(indexName);
                let storedChecklistsIndex = this.localStore.getIndex();

                for (let i = 0; i < storedChecklistsIndex.length; i++) {
                    let key = storedChecklistsIndex[i];
                    let checklist = JSON.parse(this.localStore.getItem(key));
                    this.$set(this.checklists, key, checklist);
                }
            } catch (e) {
                localStorage.removeItem(indexName);
                alert("There was an error accessing local storage.  Please refresh.");
            }
        },
        saveEdits (newChecklist) {
            this.$set(this.checklists, this.currentChecklistKey, newChecklist);
            this.localStore.removeItem(this.currentChecklistKey);
            this.localStore.addItem(this.currentChecklistKey, JSON.stringify(newChecklist));
            this.status = "using";
        },
        saveNew (newChecklist) {
            let newKey = StringHash(newChecklist.name) + ":" + performance.now();
            this.$set(this.checklists, newKey, newChecklist);
            this.localStore.addItem(newKey, JSON.stringify(newChecklist));
            this.status = "using";
        },
        edit () {
            this.status = "editing";
        },
        makeNewChecklist () {
            this.status = "new";
        }
    }
}
</script>
<style lang="scss">
.checklist-app {
    .usage-panel {
        margin-top: 1em;
    }
    .item {
        font-weight: bold;
        font-size: 16pt;
    }
    .list-group-item:nth-child(odd) {
        background-color:rgb(181, 198, 214);
    }
    .btn-group {
        margin-top:1em;
    }
    select, textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"] { font-size: 16px; }
}
</style>
