<template>
    <form @submit.prevent>
        <div>
            <h2> Update TODO </h2>
       <label><strong>TITLE</strong></label>
       <div :class="{ error: v$.todoTitle.$errors.length }">
         <input @input="validateName" placeholder:todoName v-model="state.todoTitle" />
         <span v-if="hasSymbols">Name should not contain symbols.</span>
         <div class="input-errors" v-for="error in v$.todoTitle.$errors" >
           <div class="error-msg">{{ error.$message }}</div>
         </div>
       </div>
     </div>
     <div>
       <label><strong>STATUS</strong></label>
       <div>
         <input placeholder="true/false" v-model="todoStatus" />
       </div>
     </div>
     <button @click="submitForm"> Update Todo</button>
     </form>
     <div>
     </div>

</template>
<script setup lang="ts">
import { ref, reactive, } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required,  } from '@vuelidate/validators';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
const router = useRouter();

const route = useRoute();
const todoId = ref(route.query.todoId as string);
const todoName = ref(route.query.todoName as string);
const status = ref(route.query.isComplete === 'true');

console.log('id',todoId);
console.log('name',todoName.value)
console.log('status',status.value);

const todoStatus = ref(status);

const state = reactive({
    todoTitle:todoName,
    // isComplete: status
});
const hasSymbols = ref(false);
    const validateName = () => {
     const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
     hasSymbols.value = symbolRegex.test(state.todoTitle);
   };
  
const rules = {
    todoTitle: { required,  },
};
const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  v$.value.$touch(); 

if (v$.value.$pending) {
   return;
 }
 if (v$.value.$invalid) {
   return;
 }
 try {
    await createtodo(state.todoTitle, todoStatus.value);
    console.log('1')
    await deletetodo(todoId.value);
    console.log('2')
    router.push('/');
    console.log('3')
  } catch (error) {
    console.error('Error while creating todo:', error);
  }
};

const createtodo = async (todoTitle: string, isComplete: boolean) => {
  try {
    await axios.post('https://calm-plum-jaguar-tutu.cyclic.app/todos', {
      todoName: todoTitle,
      isComplete: isComplete,
    });
    state.todoTitle = '';
    todoStatus.value = false;
  } catch (error) {
    console.error('Error while creating todo:', error);
    throw error; 
  }
};
const deletetodo =async(todoId: string) =>{
  try{
    await axios.delete(`https://calm-plum-jaguar-tutu.cyclic.app/todos/${todoId}`)
  }
  catch(error){
    throw error;
  }
};

</script>
