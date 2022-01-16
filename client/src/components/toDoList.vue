<template>
  <div>
    <div class="header">
    <h2>To Do List</h2>
    <input type="text" v-model="input" placeholder="What need to do?"/>
    <span @click="addLists()" class="addBtn">add</span>
    </div>
    <ul>
      <li v-for="(list, index) in lists" :key="index" class="list" :class="getListClasses(list)" @click="checkList(index)">
        {{ list.text }}<span class="close" @click="removeList(index)">x</span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'toDoLists',
  data() {
    return {
      input: '',
      lists: [],
    };
  },
  methods: {
    addLists() {
      if (!this.input) {
        return;
      }
      this.lists.push({ text: this.input, isChecked: false });
      this.input = '';
    },

    removeList(i) {
      if (this.lists[i] !== -1) {
        this.lists.splice(this.lists[i], 1);
      }
    },

    checkList(i) {
      const list = this.lists[i];
      if (!list.isChecked) {
        list.isChecked = true;
      } else {
        list.isChecked = false;
      }
    },

    getListClasses(list) {
      const classes = [];
      if (list.isChecked) {
        classes.push('checked');
      } if (list.isImportant) {
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
