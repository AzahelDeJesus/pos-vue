import { defineStore } from "pinia";
import {ref,computed, watch} from "vue"
export const useCart = defineStore('cart',()=>{
    const items = ref([]);
    const subtotal = ref(0);




    watch(items,()=>{
          subtotal.value = items.value.reduce((accumulated,currentValue)=>{ 
           return  (currentValue.price * currentValue.quantity) + accumulated
          },0);


    },{deep:true});
    function addItem(item){
       items.value.push({...item,quantity: 1,id: item.id});

    }


    function updateQuantity(id,quantity){
      items.value = items.value.map(item=> item.id === id  ?  {...item,quantity} : item)
    }   
     
    const isEmpty = computed(()=>{
        return items.value.length === 0
    })

    const checkProductAvailability = computed(()=>{
        return (product)=> product.availability < 5 ?  product.availability  : 5
        
    })


   




    return{
        addItem,
        isEmpty,
        items,
        checkProductAvailability,
        updateQuantity,
        subtotal
    }
})