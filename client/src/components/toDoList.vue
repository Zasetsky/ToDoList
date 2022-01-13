<template>
  <div>
    <h1>To Do List</h1>
    <input type="text" v-model="input" placeholder="What need to do?"/>
    <button @click="addLists()">add</button>
    <ul>
      <li v-for="list in lists" :key="list">{{ list }}<button @click="removeList(list)" >del</button></li>
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
      this.lists.push(this.input);
      this.input = '';
    },
    removeList(li) {
      const list = this.lists.indexOf(li);
      if (list !== -1) {
        this.lists.splice(list, 1);
      }
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  display: grid;
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
