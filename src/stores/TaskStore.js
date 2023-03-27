import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      {
        id: 1,
        title: "Buy Some Milk!!",
        isFav: false,
      },
      {
        id: 2,
        title: "Play cricket!!",
        isFav: false,
      },
    ],
    name: "Tushar",
  }),
  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },
    favCount() {
      return this.favs.length;
    },
    totalCount() {
      return this.tasks.length;
    },
  },
  actions: {
    async fetchData() {
      const data = await fetch("http://localhost:3000/tasks");
      const res = await data.json();
      this.tasks = res;
    },
    async addtask(val) {
      this.tasks.push(val);

      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(val),
        headers: { "Content-type": "application/json" },
      });
      if (res.error) {
        console.error(res.error);
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);

      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });
      if (res.error) {
        console.error(res.error);
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.isFav = !task.isFav;
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isFav: task.isFav }),
        headers: { "Content-type": "application/json" },
      });
      if (res.error) {
        console.error(res.error);
      }
    },
  },
});
