<script setup>
import {reactive} from "vue"
import Link from "../../components/Link.vue"
import useImages from "../../composables/useImage";
import {useProductsStore} from "../../stores/products"
import { useRouter } from "vue-router"


const router = useRouter();

const formData = reactive({
       name: "",
       category: "",
       price: "",
       availability: "",
       image: ""

})

const {onFileChange,url,isImageUploaded} = useImages();
const productsStore = useProductsStore();




const submitHandler = async(values)=>{
  const {image,...data} = formData;
   try {
      await productsStore.createProduct({
        ...data,
        image: url.value
      });

      router.push({name:'products'})
   } catch (error) {
    
   }

}
</script>


<template>
    <div>
       <Link  to="products">
         Volver
       </Link>

       <h1  class="text-4xl font-black  my-10">
             Nuevo Producto
       </h1>

       <div class="flex justify-center bg-white shadow">
            <div  class="mt-10 p-10 w-full 2xl:w-2/4">
                
              <FormKit  
              type="form"
              submit-label="agregar Producto"
              incomplete-message="No se puede enviar"
              @submit="submitHandler"
              :value="formData"
              >
                <FormKit
                 type="text"
                 label="Nombre"
                 name="name"
                 placeholder="Nombre del Producto"
                 validation="required"
                 :validation-messages="{required:'El nombre del producto es obligatorio'}"
                 v-model.trim="formData.name"
                />
                <FormKit
                 type="file"
                 label="Imagen Producto"
                 name="image"
                 placeholder="Nombre del Producto"
                 validation="required"
                 :validation-messages="{required:'La imagen del producto es obligatoria'}"
                 accept=".jpg"
                 @change="onFileChange"
                 v-model="formData.image"
                />

                <div v-if="isImageUploaded">
                    <p  class="font-black">Imagen Producto:</p>
                    <img 
                    :src="isImageUploaded"
                    alt="imagen producto"
                    class=" w-32"
                    >
                </div>

                <FormKit
                 type="select"
                 label="Categoria"
                 name="category"
                 validation="required"
                 :validation-messages="{required:'La categoria es obligatoria'}"
                 :options="productsStore.categoriesOptions"
                 v-model.number="formData.category"


                />
                
                <FormKit
                 type="number"
                 label="Precio"
                 name="price"
                 placeholder="Precio del Producto"
                 validation="required"
                 :validation-messages="{required:'El precio es obligatorio'}"
                 min="1"
                 v-model.number="formData.price"

                  
                />
                <FormKit
                 type="number"
                 label="Disponibles"
                 name="availability"
                 placeholder="numero de cantidades"
                 validation="required"
                 :validation-messages="{required:'La cantidad es obligatoria'}"
                 min="1"
                  v-model.number="formData.availability"
                />
                
              </FormKit>
            </div>
       </div>
    </div>
</template>



