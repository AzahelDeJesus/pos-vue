import { defineStore } from "pinia";
import {ref,computed, watch,watchEffect} from "vue"
import { useCouponStore } from "./coupons";
import {useFirestore} from "vuefire";
import {collection,addDoc,runTransaction,doc} from "firebase/firestore"
import { getCurrentDate } from "../helpers/helpers";
export const useCart = defineStore('cart',()=>{

    const db = useFirestore();
    const coupon = useCouponStore();
    const items = ref([]);
    const taxes = ref(0);
    const subtotal = ref(0);
    const total = ref(0);

    const TAX_RATE = .10;
   const MAX_PRODUCTS = 5;



     watchEffect(()=>{
        subtotal.value = items.value.reduce((accumulated,currentValue)=>{ 
            return  (currentValue.price * currentValue.quantity) + accumulated
           },0);
           taxes.value = Number((subtotal.value * TAX_RATE).toFixed(2));
           total.value = (subtotal.value + taxes.value) - coupon.discount;
     })

    function addItem(item){
        const index = isItemInCart(item.id);
         if(index >= 0){
          if(isProductAvailable(item,index)) return;
          items.value[index].quantity++    
         }else{
            items.value.push({...item,quantity: 1,id: item.id});    
         }
    }



    const isItemInCart = id => items.value.findIndex(i=> i.id === id);
    const isProductAvailable = (item,index)=> {
        return items.value[index].quantity  >= item.availability || items.value[index].quantity   >= 5 ;
    }


    function updateQuantity(id,quantity){
      items.value = items.value.map(item=> item.id === id  ?  {...item,quantity} : item)
    }   
     

   function deleteItem(itemId){
      items.value = items.value.filter(i=> i.id !== itemId);
   }


   async function checkout(){

       try {
           await addDoc(collection(db,"sales"),{
              items: items.value.map(item=> {
                 const {availability,category,...rest} = item;
                 return rest;
              }),
              subtotal: subtotal.value,
              taxes: taxes.value,
              discount: coupon.discount,
              total: total.value,
              date: getCurrentDate()
           });
            //  SUATRAER LA CANTIDAD DE DISPONIBLE
             items.value.forEach(async(item)=>{
                const productRef = doc(db,"products",item.id);
                await runTransaction(db,async(transaction)=>{
                    const currentProduct = await transaction.get(productRef);
                    const availability = currentProduct.data().availability - item.quantity;
                    transaction.update(productRef,{availability});  
                })
             })

            $reset();
            coupon.$reset();

       } catch (error) {
          console.log(error);
       }
   }

   function $reset(){        
    items.value = [];
    taxes.value = 0;
    subtotal.value = 0;
    total.value = 0;
   }

    const isEmpty = computed(()=>{
        return items.value.length === 0
    })

    const checkProductAvailability = computed(()=>{
        return (product)=> product.availability < 5 ?  product.availability  : MAX_PRODUCTS
        
    })


   




    return{
        addItem,
        isEmpty,
        items,
        checkProductAvailability,
        updateQuantity,
        deleteItem,
        checkout,
        subtotal,
        taxes,
        total
    }
})