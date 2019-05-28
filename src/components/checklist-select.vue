<template>
    <div>
        <label>Your Checklists</label>
        <div 
            v-show = "checklistKeys.length == 0" 
            class="alert alert-info">you have no checklists yet</div>
        <select 
            v-show = "checklistKeys.length > 0"
            v-model = "selectedKey" 
            class="form-control">
            <option 
                v-for ="checklistKey in checklistKeys" 
                :key = "checklistKey" 
                :value = "checklistKey"
            >
                {{ checklists[checklistKey].name }}
            </option>
        </select>
    </div>
</template>
<script>
export default {
    props : {
        checklists : {
            type : Object,
            default : ()=> {}
        },
        currentChecklistKey : {
            type : String,
            default : ""
        }
    },
    data () {
        return {
            selectedKey : this.currentChecklistKey
        }
    },
    computed : {
        checklistKeys () {
            return Object.keys(this.checklists);
        }
    },
    watch : {
        selectedKey () {
            this.$emit("event_checklist_key", this.selectedKey);
        },
        currentChecklistKey (newVal) {
            this.selectedKey = newVal;
        }
    }
}
</script>