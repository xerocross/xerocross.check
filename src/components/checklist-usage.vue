<template>
    <div class="checklist-usage">
        <ul class="list-group">
            <li 
                v-for = "(item, index) in checklist" 
                :key = "item.key"
                :class = "item.done ? 'done-item' : ''"
                class = "list-group-item"
                @click.prevent="toggleDone(index)"
            >
                

                <div class="row">
                    <div class="col-sm-12">
                        <span class="item"> 
                            
                            <span 
                                v-show = "item.done" 
                                class="glyphicon glyphicon-ok"></span>
                            <span 
                                v-show = "!item.done" 
                                class="glyphicon glyphicon-unchecked">
                                
                            </span>
                            {{ item.listItemText }}
                        </span>
                    </div>
                </div>


            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props : {
        checklistData : {
            type : "object",
            default : {}
        }
    },
    data () {
        return {
            checklist : []
        }
    },
    watch : {
        checklistData () {
            this.update();
        }
    },
    mounted () {
        this.update();
    },
    methods : {
        toggleDone (index) {
            this.checklist[index].done = !this.checklist[index].done;
        },
        update () {
            if (this.checklistData.items) {
                let dataList = this.checklistData.items;
                this.checklist = [];
                for (let i = 0; i < dataList.length; i++) {
                    this.checklist.push({
                        listItemText : dataList[i].listItemText,
                        key : dataList[i].key,
                        done : false
                    });
                }
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
}
</style>