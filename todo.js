Vue.component('input-todo', {
    data() {
        return {
            task: ''
        }
    },
    props: ['flag'],
    methods: {
        addTodo() {
            if(this.task) {
                this.$emit('add-task', this.task);
                this.task = '';
            }
        },
        editTodo() {
            this.$emit('edit-task', this.task);
            this.task = '';
        }
    },
    template: '<div><input v-model="task" style="width: 200px" type="text"><button v-show="flag" @click="addTodo" style="margin-left: 5px">add</button><button v-show="!flag" @click="editTodo" style="margin-left: 5px">Edit</button></div>'
});

Vue.component('show-todo', {
    data() {
        return {
        
        }
    },
    props: ['tasks'],
    methods: {
        edit(index) {
            this.$emit('edit', index);
        },
        remove(index) {
            this.$emit('remove', index);
        }
    },
    template: '<ul><todo @remove-button="remove(index)"  @edit-button="edit(index)" :task="item" v-for="(item, index) in tasks" :key="index"></todo></ul>'
});

Vue.component('todo', {
    data() {
        return {
            btnStyle: 'marginLeft: 5px'
        }
    },
    props: ['task'],
    methods: {
        edit() {
            this.$emit('edit-button');
        },
        remove() {
            this.$emit('remove-button');
        }
    },
    template: '<li style="margin-top: 10px">{{task}}<button :style="btnStyle" @click="edit">Edit</button><button @click="remove" :style="btnStyle">Delete</button></li>'
})

new Vue({
    el: '#app',
    data: {
        tasks: ['go to bed', 'go to work', 'go to dinner'],
        flag: true,
        index: -1
    },
    methods: {
        addTodo(task) {
            this.tasks.push(task);
        },
        edit(index) {
            this.flag = false;
            this.index = index;
        },
        editTodo(task) {
            this.tasks.splice(this.index, 1, task);
            this.flag = true;
        },
        remove(index) {
            this.tasks.splice(index, 1);
        }
    },
    template:'<div style="width: 600px; margin: 50px auto"><input-todo :flag="flag" @add-task="addTodo" @edit-task="editTodo"></input-todo><show-todo @remove="remove" @edit="edit" :tasks="tasks"></show-todo></div>'
})