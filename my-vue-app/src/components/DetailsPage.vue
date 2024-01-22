<template>
    <div>
      <h2>Details for Todo </h2>
      <table>
        <tr>
          <td><strong>Todo Title:</strong></td>
          <td>{{ todo.todoName }}</td>
        </tr>
        <tr>
          <td><strong>Status:</strong></td>
          <td>{{ todo.status }}</td>
        </tr>
        <tr>
          <td><strong>ID:</strong></td>
          <td>{{ todoId }}</td>
        </tr>
        <tr>
          <td><strong>Created At:</strong></td>
          <td>{{ todo.createdAt }}</td>
        </tr>
        <tr>
          <td><strong>Updated At:</strong></td>
          <td>{{ todo.updatedat }}</td>
        </tr>
      </table>
    </div>
  </template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute();
const todoId = ref(router.query.todoId);
const todo =ref({
    todoName: '',
    status: false,
    createdAt: '',
    updatedat:'',


})

  onMounted(async () => {
    
  await fetchTodoDetails(); 
  });

  const fetchTodoDetails = async () => {
  try {
    const response = await fetch(`https://calm-plum-jaguar-tutu.cyclic.app/todos/${todoId.value}`);
    const data = await response.json();
    todo.value.todoName = data.data.todoName ;
    todo.value.createdAt = data.data.createdAt;
    todo.value.updatedat = data.data.updatedAt;
    todo.value.status = data.data.isComplete;
  } catch (error) {
    console.error('Error fetching todo details', error);
  }
};
</script>