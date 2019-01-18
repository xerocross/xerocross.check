<template>
    <div class="checklist-app">
        <div v-show = "status == 'signup'">
            <signup-div/>
        </div>
        <div v-show = "status == 'using'">
            <label>Your Checklists</label>
            <div 
                v-show = "checklistKeys.length == 0" 
                class="alert alert-info">you have no checklists yet</div>
            <select 
                v-show = "checklistKeys.length > 0"
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
                    v-show = "checklistKeys.length > 0" 
                    class="btn btn-success"
                    @click.prevent = "edit">edit</a>
                <a 
                    v-show = "checklistKeys.length > 0" 
                    class="btn btn-success"
                    @click.prevent = "deleteThisChecklist">delete</a>
                
                <a 
                    v-show = "checklistKeys.length > 0" 
                    class="btn btn-success" 
                    @click.prevent = "resetThisChecklist">reset
                </a>
                <a 
                    class="btn btn-success" 
                    @click.prevent = "makeNewChecklist">new</a>
            </div>
            <div 
                class = "usage-panel">
                <checklist-display 
                    :checklist-data = "checklists[currentChecklistKey]" 
                    @click_item = "toggleItemDone"
                />
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
        <drawer-div
            button-text-open = "about checklists"
            button-text-close = "hide"
        >
            <h2>About Checklists</h2>
            <p>
                A checklist is not the same thing as a to-do list.
                By its nature, a checklist is reusable.  For example, 
                it might be your nightly hygiene routine or steps 
                necessary before you can safely start a plane.  They 
                are not ad-hoc lists of things to do.  That's why in
                this app you can save them, edit them, and re-use them.
                All your data is saved locally on your own computer.
            </p>
        </drawer-div>
    </div>
</template>
<script>
import ChecklistEditor from "./checklist-editor.vue";
import ChecklistDisplay from "./checklist-display.vue";
import {StoreLocal} from "cross-js-base";
import {StringHash} from "../helpers/string-hash.js";
import Checklist from "../helpers/checklist.js";
import { DrawerDiv } from "cross-vue-base";
import SignupDiv from "./signup-div.vue";

export default {
    components : {
        ChecklistEditor,
        ChecklistDisplay,
        DrawerDiv,
        SignupDiv
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
            localStore : null,
            username : "",
            stateStore : null
        }
    },
    computed : {
        checklistKeys () {
            return Object.keys(this.checklists);
        },
        isSignedIn () {
            return typeof this.username == "string";
        },
        currentChecklistObject () {
            return this.checklists[this.currentChecklistKey];
        }
    },
    watch : {
        isSignedIn () {
            if (this.isSignedIn) {
                this.status = "using";
            }
        },
        currentChecklistKey () {
            this.stateStore.addItem("currentChecklist", this.currentChecklistKey);
        }
    },
    mounted () {
        this.buildFromStorage();
        this.currentChecklistKey = this.checklistKeys[0];
        this.stateStore = StoreLocal.build("checklist-state");
        let key = this.stateStore.getItem("currentChecklist")
        if (key) {
            this.currentChecklistKey = key;
        }
    },
    methods : {
        toggleItemDone (key) {
            let item = this.currentChecklistObject.items.filter(item => item.key == key)[0];
            window.item = item;
            if (item.done == true) {
                if(confirm("Uncheck this item?")) {
                    item.done = false;
                }
            } else {
                this.$set(item, "done", true);
                let t = new Date();
                this.$set(item, "doneTime", t.toJSON());
            }
            this.persist();
        },
        resetThisChecklist () {
            if (confirm("Reset the current checklist?")) {
                let list = this.currentChecklistObject.items;
                for (let i = 0; i < list.length; i++) {
                    list[i].done = false;
                }
                this.persist();
            }
        },
        buildFromStorage () {
            let indexName = "checklists";
            try {
                this.localStore = StoreLocal.build(indexName);
                let storedChecklistsIndex = this.localStore.getIndex();

                for (let i = 0; i < storedChecklistsIndex.length; i++) {
                    let key = storedChecklistsIndex[i];
                    let checklist;
                    try {
                        checklist = JSON.parse(this.localStore.getItem(key));
                        if (!Checklist.validate(checklist)) {
                            throw new Error();
                        }
                    }
                    catch (e) {
                        this.localStore.removeItem(key)
                        throw new Error();
                    }
                    this.$set(this.checklists, key, checklist);
                }
            } catch (e) {
                alert("There was an error accessing local storage.  Please refresh.");
            }
        },
        persist () {
            let cleanChecklist = this.buildCleanData();
            this.localStore.removeItem(this.currentChecklistKey);
            this.localStore.addItem(this.currentChecklistKey, JSON.stringify(cleanChecklist));
        },
        saveEdits (newChecklist) {
            this.$set(this.checklists, this.currentChecklistKey, newChecklist);
            this.persist();
            this.status = "using";
        },
        buildCleanData () {
            let items = this.currentChecklistObject.items;
            let cleanList = [];
            for (let i = 0; i < items.length; i++) {
                cleanList.push({
                    listItemText : items[i].listItemText,
                    key : items[i].key,
                    done : items[i].done,
                    doneTime : items[i].doneTime
                });
            }
            let checklist = {
                name : this.currentChecklistObject.name,
                items : cleanList
            }
            return checklist;
        },
        saveNew (newChecklist) {
            let newKey = StringHash(newChecklist.name) + ":" + performance.now();
            this.$set(this.checklists, newKey, newChecklist);
            this.localStore.addItem(newKey, JSON.stringify(newChecklist));
            this.currentChecklistKey = newKey;
            this.status = "using";
        },
        edit () {
            this.status = "editing";
        },
        makeNewChecklist () {
            this.status = "new";
        },
        deleteThisChecklist () {
            if (confirm("Delete this checklist?  (There is no undo.)")) {
                this.localStore.removeItem(this.currentChecklistKey);
                this.$delete(this.checklists, this.currentChecklistKey);
                this.currentChecklistKey = this.checklistKeys[0];
            }
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
        background-color:rgb(201, 219, 236);
    }
    .btn-group {
        margin-top:1em;
    }
    .alert.alert-info {
        padding-top: 0px;
        padding-bottom: 0px;
    }
    h2 {
        font-size: 130%;
        font-weight: bold;
    }
    select, textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"] { font-size: 16px; }
}
</style>
