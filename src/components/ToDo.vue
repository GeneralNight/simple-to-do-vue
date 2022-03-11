<template>
    <section id="containerToDo" v-if="loaded">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="d-flex align-items-center justify-content-between" v-if="!editingTitle">
                        <div class="d-flex align-items-center">
                            <h1 @click="ableEditTitle" class="toDoTitle mb-0">{{tasksData.title || 'Click to edit'}}</h1>
                            <i @click="ableEditTitle" class="fas fa-edit ml-3 iconEdit"></i>
                            <i @click="clearTitle" class="fas fa-trash-alt ml-3 iconDel"></i>
                        </div>
                    </div>
                    <div class="d-flex flex-column flex-md-row align-items-md-center" v-if="editingTitle">
                        <input v-model="title" id="editTitle" :class="{'darkText':!mode,'lightText':mode}" type="text" class="editTitleInput">
                        <div class="d-flex align-items-center justify-content-end justify-content-md-start mt-4 mt-sm-auto">
                            <button @click="editTitle" class="bSave" :class="{'darkButton':!mode,'lightButton':mode}"><i class="fas fa-save mr-2"></i> Save</button>
                            <button @click="cancelTitleEdit" class="bSave ml-3" :class="{'darkButton':!mode,'lightButton':mode}"><i class="fas fa-times mr-2"></i> Cancel</button>
                        </div>                      
                    </div>
                    <div class="lineDivisor" :class="{'darkBack':!mode,'lightBack':mode}"></div>
                    <p class="noItems mt-4" v-if="!tasksData.tasks || tasksData.tasks.length==0">No items</p>
                    <div class="containerList" v-else>
                        <ul>
                            <li v-for="(task,index) in tasksData.tasks" :key="index" class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <input type="checkbox" v-model="task.status" @change="statusChange(index)">
                                    <p :class='{"slashed":task.status}' class="itemText mb-0" @click="statusChange(index)">{{task.text}}</p>
                                </div>
                                <div>
                                    <i class="fas fa-trash-alt iconDel ml-3" @click="removeTask(index)"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="d-flex flex-column flex-md-row align-items-md-center" v-if="addingItem">
                        <input v-model="newItem.text" id="addItem" :class="{'darkText':!mode,'lightText':mode}" type="text" class="editTitleInput">
                        <div class="d-flex align-items-center justify-content-end justify-content-md-start mt-4 mt-sm-auto">
                            <button @click="addItem" class="bSave" :class="{'darkButton':!mode,'lightButton':mode}"><i class="fas fa-save mr-2"></i> Save</button>
                            <button @click="cancelAddItem" class="bSave ml-3" :class="{'darkButton':!mode,'lightButton':mode}"><i class="fas fa-times mr-2"></i> Cancel</button>
                        </div>                      
                    </div>
                    <p @click="ableAddItem" class="addNewItem mt-2 mt-sm-4"><i class="fas fa-plus mr-2"></i>Add item</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
name: 'ToDo',
data() {
    return {
        title: '',
        tasks: [],
        editingTitle: false,
        loaded: false,
        addingItem: false,
        newItem: null
    }
},
methods: {
    cancelTitleEdit() {
        this.editingTitle = false
    },
    async clearTitle() {
        window.localStorage.titleTaskData = ''
        await this.loadData()
    },
    async editTitle() {
        window.localStorage.titleTaskData = this.title
        await this.loadData()
        this.editingTitle = false
    },
    ableEditTitle() {
        this.title = this.tasksData.title
        this.editingTitle = true
        setTimeout(() => {
            document.getElementById("editTitle").focus()
        }, 50);
    },
    ableAddItem() {
        this.newItem = {
            status: false,
            text: ''
        }
        this.addingItem = true
        setTimeout(() => {
            document.getElementById("addItem").focus()
        }, 50);
    },
    cancelAddItem() {
        this.addingItem = false
        this.newItem = null
    },
    async addItem() {
        var currentItems = this.tasksData.tasks
        currentItems.push(this.newItem)
        window.localStorage.tasks = JSON.stringify(currentItems)
        await this.loadData()
        this.addingItem = false
    },
    async statusChange(index) {
        var currentItems2 = this.tasksData.tasks
        currentItems2[index].status = !currentItems2[index].status
        window.localStorage.tasks = JSON.stringify(currentItems2)
        await this.loadData()
    },
    async removeTask(index) {
        var currentItems3 = this.tasksData.tasks
        currentItems3.splice(index, 1);
        window.localStorage.tasks = JSON.stringify(currentItems3)
        await this.loadData()
    },
    async loadData() {
        this.loaded = false
        await this.$store.dispatch('loadData')
        this.loaded = true
    }
},
created() {
    this.loadData()
},
computed: {
    ...mapState(['mode','tasksData'])
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
    #containerToDo {
        padding: 50px 0;
        min-height: 100vh;

        @include d(sm) {
            padding: 20px 0;
        }
        .toDoTitle, .iconEdit, .iconDel {
            cursor: pointer;
        }

        .toDoTitle, .editTitleInput {
            font-size: 2rem;
            font-weight: 700;
            @include d(sm)  {
                font-size: 1.5rem;
            }
            @include d(xs)  {
                font-size: 1.35rem;
            }
        }

        .iconEdit, .iconDel {
            font-size: 1.5rem;
            @include d(xs)  {
                font-size: 1.25rem;
            }
        }

        .editTitleInput {
            background: transparent;
            outline: none;
            border: none;
        }

        .bSave {
            border-radius: 16px;
            padding: 5px 16px;
            transition: .2s;
        }

        .lineDivisor {
            margin-top: 15px;
            width: 100%;
            height: 2px;
            opacity: .5;
        }

        .addNewItem {
            transition: .2s;
            cursor: pointer;
            &:hover {
                opacity: .8;
            }
        }

        .containerList {
            padding: 50px 0;
            @include d(xs) {
                padding: 20px 0;
            }
            ul {
                padding-left: 0px;
                list-style: none;

                li {
                    font-size: 1.25rem;
                    margin-bottom: 25px;
                    @include d(xs) {
                        font-size: 1rem;
                    }
                    input[type="checkbox"] {
                        margin-right: 15px;
                        transform: scale(1.2);
                    }
                    p, .iconDel, .iconEdit {
                        cursor: pointer;
                    }
                    .slashed {
                        text-decoration: line-through;
                    }
                }
            }
        }

        .iconDel {
            transition: .2s;
            &:hover {
                color: #e46363;
            }
        }
        .iconEdit {
            transition: .2s;
            &:hover {
                color: #e9b60f;
            }
        }
    }
</style>