<script setup>
import { formatCurrency } from "../helpers/helpers";
import { useCart } from "../stores/cart";
import Amount from "./Amount.vue";
import ShoppingCartItem from "./ShoppingCartItem.vue";

    const cart = useCart();
</script>

<template>
    <p v-if="cart.isEmpty"  class="text-xl text-gray-900">Carrito Vacio</p>
    <div v-else>
          <p class="text-4xl font-bold text-gray-900">Resumen de venta</p>
          <ul  
          role="list"
          class="mt-6 divide-y divide-gray-200"
          >
            <ShoppingCartItem  
            v-for="item in cart.items"
            :key="item.id"
            :item="item"
            />
          </ul>


          <dl class=" 
          space-y-6 
          border-t  
          border-gray-400 
          pt-6 
          text-sm 
          font-medium 
          text-gray-500">
              <Amount>
                  <template #label>
                     Subtotal:
                  </template>
                  {{ formatCurrency(cart.subtotal) }}
              </Amount>
              <Amount>
                 <template #label>
                     Impuestos:
                 </template>
                 {{ formatCurrency(100) }}
              </Amount>
              <Amount>
                 <template #label>
                     Total a pagar:
                 </template>
                 {{ formatCurrency(400) }}
              </Amount>
          </dl>
    </div>
</template>



