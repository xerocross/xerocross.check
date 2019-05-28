<template>
    <div class="checklist-usage">
        <div class="row title-row">
            <div class = "col-6 title">
                <h2>{{ checklistData.name }}</h2>
            </div>
            <div class="col-6 title-buttons">
                <button 
                    class="btn btn-danger"
                    data-toggle="tooltip" 
                    title="reset all items on the checklist to unchecked"
                    @click = "resetThisChecklist"
                >
                    reset
                </button>
            </div>
        </div>


        <ul class="list-group">
            <li 
                v-for = "item in checklistData.items" 
                :key = "item.key"
                class = "list-group-item"
                @click.prevent="toggleDone(item.key)"
            >
                <div class="row">
                    <div class="col-sm-12">
                        <span 
                            
                            class="item"> 
                            
                            <span 
                                v-show = "item.done"
                            >
                                &#9745;
                            </span>
                            <span 
                                v-show = "!item.done"
                            >
                                &#x2610;
                            </span>
                            <span :class = "item.done ? 'done-item' : ''" >
                                {{ item.listItemText }} 
                            </span>
                        </span>
                        <span 
                            v-show = "item.done" 
                            class="done-time"><br/>{{ displayTime(item.doneTime) }}
                        </span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import $ from "jquery";
import moment from "moment";
export default {
    props : {
        checklistData : {
            type : Object,
            default : function(){return {}}
        }
    },
    mounted () {
        $(document).ready(()=> {
            debugger;
            $("[data-toggle]").tooltip();
        })
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
        },
        resetThisChecklist () {
            this.$emit("event_reset");
        },
    },
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
    .title-row {
        margin-bottom: 10px;
        .title-buttons {
            text-align: right;
        }
    }
}
</style>