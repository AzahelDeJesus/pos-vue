<script setup>
import VueTailwindPicker  from "vue-tailwind-datepicker";
import {useSaleStore} from "../../stores/sales"
import {ref} from "vue"
import SalesDetailsVue from "../../components/SalesDetails.vue";
  

   const saleStore =  useSaleStore(); 
    const formatter = ref({
        date: "DD/MM/YYYY",
        month: 'MMMM'
    });
</script>

<template>
      <h1  class="text-4xl font-black  my-10">
             Ventas
       </h1>
    <div  class="md:flex md:items-start gap-5">
        <div class="md:w-1/2 lg:w-1/3  bg-white flex justify-center">
           <VueTailwindPicker 
           i18n="es-mx"
            as-single
            v-model="saleStore.date"
            :formatter="formatter"
            />
        </div>
        <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5  pb-32 ">
           <p 
           class="text-center text-lg"
           v-if="saleStore.isDateSelected"
           >
           Ventas de la fecha  
           <span class="font-black">{{ saleStore.date }}</span> 
          </p>

          <p v-else class="text-center text-lg">Selecciona una fecha:</p>

          <div class="space-y-5">
              <SalesDetailsVue  
              v-for="sale in saleStore.salesCollection"
              :key="sale.id"
              :sale="sale"
              />
          </div>
        </div>
    </div>
</template>



