<script setup>
import Link from './Link.vue';
import LogoVue from './Logo.vue';
</script>



<template>
     <header  class="px-10 py-5  bg-gray-700 flex justify-between  absolute  top-0 w-full  z-10">
      <div>
        <LogoVue/>
      </div>
      <nav>
           <RouterLink
           :to="{name: 'products'}"
           class="rounded text-white font-bold p-2"
           >
           Productos
           </RouterLink>
           <RouterLink
           :to="{name: 'sales'}"
           class="rounded text-white font-bold p-2"
           >
            Ventas
           </RouterLink>
         <Link  to="shop">
           volver
         </Link>
      </nav>
</header>
</template>


