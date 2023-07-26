<script setup>
import { formatCurrency } from '../helpers/helpers';
import { useCart } from '../stores/cart';
const cart = useCart();


  defineProps({
      item:{
        type: Object,
        required: true
      }
  })
</script>

<template>
     <li class="flex space-x-6 py-6">
        <img :src="item.image"
        class="h-24 w-24 flex-none rounded-md"
        :alt="'imagen de ' + item.name">

        <div class="flex-auto  space-y-2">
            <h1  class="text-gray-900">{{ item.name }}</h1>
            <p>{{ formatCurrency(item.price) }}</p>

            <select  class="w-32 text-center p-2 rounded-lg bg-white"  @change="cart.updateQuantity(item.id, +$event.target.value)">
                 <option 
                 v-for="n in cart.checkProductAvailability(item)"
                 :key="n"
                 :value="n">{{ n }}</option> 

            </select>
        </div>
     </li>
</template>



