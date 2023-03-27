<template>
  <div class="task-bar">
    <h1>{{ task.title }}</h1>
    <div>
      <i class="material-icons" @click="taskStore.deleteTask(task.id)">delete</i>
      <i class="material-icons" :class="task.isFav ? 'red': ''" @click="taskStore.toggleFav(task.id)">favorite</i>
    </div>
  </div>
</template>
<script>
import { useTaskStore } from "../stores/TaskStore";
export default {
  props: {
    task: {
      type: Object,
      isRequired: true,
      default: {
        title: "abc",
      },
    },
  },
  data() {
    return {
      taskStore: useTaskStore(),
    };
  },
};
</script>