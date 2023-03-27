<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="I need to..." v-model="newTask" />
      <button>Add</button>
    </form>
  </div>
</template>
<script>
import { useTaskStore } from "../stores/TaskStore";
export default {
  data() {
    return {
      newTask: "",
      taskStore: useTaskStore(),
    };
  },
  methods: {
    handleSubmit() {
      if (this.newTask.length > 0) {
        this.taskStore.addtask({
          title: this.newTask,
          isFav: false,
          id: +new Date(),
        });
        this.newTask = "";
      }
    },
  },
};
</script>