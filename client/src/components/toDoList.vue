<template>
  <div>
    <div class="header">
    <h2>To Do task</h2>
    <input type="text" v-model="input" placeholder="What need to do?"/>
    <span @click="addtasks()" class="addBtn">add</span>
    </div>
    <ul>
      <li v-for="(task, index) in tasks" :key="index" class="task" :class="getTaskClasses(task)" @click="checktask(index)">
        {{ task.description }}<span class="close" @click.prevent.stop="removetask(index)">x</span>
        </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'toDoList',
  data() {
    return {
      input: '',
      tasks: [],
    };
  },

  mounted() {
    axios.get('http://localhost:3001/tasks')
      .then((response) => {
        this.tasks = response.data;
      });
  },

  methods: {
    async addtasks() {
      if (!this.input) {
        return;
      }
      await axios.post('http://localhost:3001/tasks', { description: this.input });
      this.input = '';
      const response = await axios.get('http://localhost:3001/tasks');
      this.tasks = response.data;
    },

    async removetask(i) {
      await axios.delete(`http://localhost:3001/tasks/${this.tasks[i].id}`);
      const response = await axios.get('http://localhost:3001/tasks');
      this.tasks = response.data;
    },

    async checktask(i) {
      const task = this.tasks[i];
      if (!task.isCompleted) {
        await axios.put(`http://localhost:3001/tasks/${this.tasks[i].id}`, { description: this.tasks[i].description, isCompleted: true });
      } else {
        await axios.put(`http://localhost:3001/tasks/${this.tasks[i].id}`, { description: this.tasks[i].description, isCompleted: false });
      }
      const response = await axios.get('http://localhost:3001/tasks');
      this.tasks = response.data;
    },

    getTaskClasses(task) {
      const classes = [];
      if (task.isCompleted) {
        classes.push('checked');
      } if (task.isImportant) {
        classes.push('important');
      }
      return classes;
    },
  },
};
</script>

<style scoped>

* {
  box-sizing: border-box;
}

ul {
  margin: 0;
  padding: 0;
}

ul li {
  cursor: pointer;
  position: relative;
  padding: 12px 8px 12px 40px;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 1000px;
  display: inline-table;
}

ul li:nth-child(odd) {
  background: #f9f9f9;
}

ul li:hover {
  background: #ddd;
}

ul li.checked {
  background: #888;
  color: #fff;
  text-decoration: line-through;
}

ul li.checked::before {
  content: '';
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
}

.close {
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 16px 12px 16px;
}

.close:hover {
  background-color: #f44336;
  color: white;
}

.header {
  display: inline-table;
  background-color: #f44336;
  padding: 30px 40px;
  color: white;
  text-align: center;
  width: 1000px;
}

.header:after {
  content: "";
  display: table;
  clear: both;
}

input {
  margin: 0;
  border: none;
  border-radius: 0;
  width: 75%;
  padding: 10px;
  float: left;
  font-size: 16px;
}

.addBtn {
  padding: 10px;
  width: 25%;
  background: #d9d9d9;
  color: #555;
  float: left;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 0;
}

.addBtn:hover {
  background-color: #bbb;
}
</style>
