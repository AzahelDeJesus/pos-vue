<script setup>
import { RouterView } from "vue-router";
import AdmiNavVue from "../../components/AdmiNav.vue";
</script>


<template>
      

      <div>
        <AdmiNavVue/>
      </div>

      <div  class="pt-32  container mx-auto">
            <RouterView/>
      </div>
</template>



