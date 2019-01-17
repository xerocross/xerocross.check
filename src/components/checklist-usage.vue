<template>
    <div class="checklist-usage">
        
        <h2>{{ checklistData.name }}</h2>
        <ul class="list-group">
            <li 
                v-for = "(item, index) in checklistData.items" 
                :key = "item.key"
                
                class = "list-group-item"
                @click.prevent="toggleDone(item.key)"
            >
                <div class="row">
                    <div class="col-sm-12">
                        <span 
                            :class = "item.done ? 'done-item' : ''" 
                            class="item"> 
                            
                            <span 
                                v-show = "item.done" 
                                class="glyphicon glyphicon-ok"></span>
                            <span 
                                v-show = "!item.done" 
                                class="glyphicon glyphicon-unchecked">
                                
                            </span>
                            {{ item.listItemText }} 
                        </span>
                        <span 
                            v-show = "item.done" 
                            class="done-time">{{ displayTime(item.doneTime) }}</span>
                    </div>
                </div>


            </li>
        </ul>
    </div>
</template>
<script>
import moment from "moment";

export default {
    props : {
        checklistData : {
            type : "object",
            default : {}
        }
    },
    data () {
        return {
        }
    },
    watch : {
    },
    mounted () {
    },
    methods : {
        toggleDone (key) {
            this.$emit("click_item", key);
        },
        displayTime (dateString) {
            try {
                return moment(dateString).format('LLL');
            } catch (e) {
                return "";
            }
        }
    }
}
</script>
<style lang="scss">
.checklist-usage {
    
    .list-group-item {
        cursor: pointer;
    }
    .done-item {
        text-decoration: line-through;
    }
    .done-time {
        padding-left:2em;
    }
}
</style>