
<script setup>
import { storeToRefs } from "pinia";
import MainNavVue from "../components/MainNav.vue";
import { useProductsStore } from "../stores/products";
import ProductCard from "../components/ProductCard.vue";
import ShoppingCart from "../components/ShoppingCart.vue";
import { useCart } from "../stores/cart";
const products =  useProductsStore();
const { filterProducts,noResults } =  storeToRefs(products);
const cart = useCart();


</script>


<template>
      
      <MainNavVue/>



      <main  class="pt-10 lg:flex lg:h-screen overflow-y-hidden">
           <div  class="lg:w-2/3 lg:h-screen  lg:overflow-y-scroll pt-10  pb-32 px-10">
                 <p  v-if="noResults"  class="text-3xl">No hay Productos</p>
                 <div  v-else  class="grid grid-cols-1  lg:grid-cols-2  2xl:grid-cols-3 gap-5">
                    <ProductCard  
                    v-for="product in filterProducts"
                    :key="product.id"
                    :product="product"
                    />

                 </div>
           </div>
           <aside  class="pt-10 lg:flex lg:h-screen overflow-y-hidden">
            <ShoppingCart/>
           </aside>
      </main>

</template>

