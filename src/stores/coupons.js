import { defineStore} from "pinia";
import {ref, watch,computed} from "vue"
import { useCart } from "./cart";

export const useCouponStore = defineStore("coupon",()=>{
     const cart = useCart();
     const couponInput = ref("");
     const couponValidationMessage = ref("");
     const discountPorcentage = ref(0);
     const discount = ref(0);
    const validateCoupons = [
        {
            name: "10DESCUENTO",
            discount: .10
        },
        {
            name: "20DESCUENTO",
            discount: .20
        }
    ]
     

    watch(discountPorcentage,()=>{
        discount.value= (cart.total*discountPorcentage.value).toFixed(2);
    })


     function applyCoupon(){
          if(validateCoupons.some(coupon=> coupon.name === couponInput.value)){
        
            couponValidationMessage.value = "Aplicando....";
            
            setTimeout(()=>{
                const percentage = validateCoupons.find(c=> c.name === couponInput.value);
                discountPorcentage.value = percentage.discount;
                couponValidationMessage.value = "¡Descuento Aplicado!"
            },3000);
           
            
          }else{
              couponValidationMessage.value = "No existe ese cupon";
          }


          setTimeout(()=>{
             couponValidationMessage.value = "";
          },5000);
     }

     function  $reset(){
         couponInput.value = "";
         couponValidationMessage.value = "";
         discountPorcentage.value = 0;
         discount.value = 0;
     }

     const isValidateCupon = computed(()=>{
            return discountPorcentage.value > 0
     });
     return {
        couponInput,
        applyCoupon,
        couponValidationMessage,
        discount,
        isValidateCupon,
        $reset
     }
})