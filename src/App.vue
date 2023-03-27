<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/pinia-logo.svg"
      width="125"
      height="125"
    />
    <h1>Pinia Tasks</h1>
  </header>
  <div class="input-form">
    <TaskForm />
  </div>
  <nav class="filter">
    <button @click="filterVal = 'all'">All Tasks</button>
    <button @click="filterVal = ''">Fav Tasks</button>
    <button @click="taskStore.$reset">Reset Tasks</button>
  </nav>
  <div class="task-container" v-if="filterVal === 'all'">
    <p>You have {{ taskStore.totalCount }} tasks left to do</p>
    <div :key="task.id" v-for="task in taskStore.tasks">
      <TaskDetails :task="task" />
    </div>
  </div>
  <div class="task-container" v-else>
    <p>You have {{ favCount }} favs left to do</p>
    <div :key="task.id" v-for="task in favs">
      <TaskDetails :task="task" />
    </div>
  </div>
</template>

<script>
import { useTaskStore } from "./stores/TaskStore.js";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { storeToRefs } from "pinia";
export default {
  components: {
    TaskDetails: TaskDetails,
    TaskForm: TaskForm,
  },
  data() {
    return {
      taskStore: useTaskStore(),
      filterVal: "all",
      favs: "",
      favCount: "",
    };
  },
  mounted() {
    this.taskStore.fetchData();
    console.log("inside mounted", this.taskStore);
    console.log("inside mounted", this.taskStore.tasks);
    const { favs, favCount } = storeToRefs(this.taskStore);
    this.favs = favs;
    this.favCount = favCount
  },
};
</script>