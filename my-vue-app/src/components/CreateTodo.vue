<template>
    <form @submit.prevent>
        <div>
            <h2> CREATE A TODO </h2>
       <label><strong>TITLE</strong></label>
       <div :class="{ error: v$.todoTitle.$errors.length }">
         <input @input="validateName" v-model="state.todoTitle" />
         <span v-if="hasSymbols">Name should not contain symbols.</span>
         <div class="input-errors" v-for="error in v$.todoTitle.$errors" >
           <div class="error-msg">{{ error.$message }}</div>
         </div>
       </div>
     </div>
     <div>
       <label><strong>STATUS</strong></label>
       <div>
         <input placeholder="true/false" v-model="state.isComplete" />
       </div>
     </div>
     <button @click="submitForm"> Add Todo</button>
     </form>
     <div>
     </div>

</template>
<script setup lang="ts">
import { ref, reactive, } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required,  } from '@vuelidate/validators';
import { defineEmits } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
const emit = defineEmits(['todoSubmitted']);

const state = reactive({
    todoTitle: '',
    isComplete: false
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
    await createtodo(state.todoTitle, state.isComplete);
    router.push('/');
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
    state.isComplete = false;
  } catch (error) {
    console.error('Error while creating todo:', error);
    throw error; 
  }
};

</script>
