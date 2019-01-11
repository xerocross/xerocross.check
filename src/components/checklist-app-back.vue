<template>
    <div class="to-do-list container">
        <form
            class="form-group form-box"
            @submit.prevent = "add">
            <label>New Item</label>
            <input
                v-model = "newItemInput"
                class="form-control"
                type="text"
            />
            <input
                class="btn btn-primary add-button"
                type="submit"
                value = "add"
            />
        </form>
        <ul class="list-group">
            <li
                v-for = "item in itemList"
                :key = "item.key"
                class="list-group-item flex-item"
            >
                <div class="row">
                    <div class="col-xs-8">
                        <span class="item">{{ item.key }} {{item.value}}</span>
                    </div>
                    <div class="col-xs-4">
                        <button
                            class="btn btn-danger remove-button"
                            @click.prevent="deleteItem(item.key)">
                            x
                        </button>
                        <button
                            class="btn btn-warning remove-button"
                            @click.prevent="up(item.key)">
                            &uparrow;
                        </button>
                        <button
                            class="btn btn-warning remove-button"
                            @click.prevent="down(item.key)">
                            &downarrow;
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import {DrawerDiv} from "cross-vue-base";
import {StoreLocal} from "cross-vue-base";
import {SimpleHashMap} from "xerocross-dstructs";
import {StringHash} from "../helpers/string-hash.js";

export default {
    components : {
        DrawerDiv
    },
    data () {
        return {
            newItemInput : "",
            itemSet : SimpleHashMap.build(17, StringHash),
            itemList : [],
            storeLocal : {}
        }
    },
    computed : {
        maxIndex () {
            return this.itemList.length;
        }
    },
    mounted () {
        //this.storeLocal = StoreLocal.build("checklist-app");
        //this.buildFromStorage();
    },
    methods : {
        add () {
            let newIndex = this.maxIndex;
            this.itemSet.add(this.newItemInput, newIndex);
            //this.storeLocal.addItem(this.newItemInput, this.newItemInput);
            this.newItemInput = "";
            this.update();
        },
        deleteItem (key) {
            this.itemSet.remove(key);
            //this.storeLocal.removeItem(key);
            this.update();
        },
        up (key) {
            
        },
        update () {
            this.itemList = this.itemSet.toList().sort((a,b) => {return a.value - b.value});
        },
        buildFromStorage () {
            // let list = this.storeLocal.getAll();
            // for (let i = 0; i < list.length; i++) {
            //     this.itemSet.add(list[i]);
            // }
            // this.update();
        }
    }
}
</script>
<style lang="scss">
.to-do-list {
    .flex-item {
        .form-box {
            margin-bottom: 2em;
        }

        .item {
            font-weight: bold;
            font-size: 18pt;
        }
    }
    .add-button {
        margin-top: 1em;
        padding:1em;
    }
    select, textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"] { font-size: 16px; }
}
</style>
