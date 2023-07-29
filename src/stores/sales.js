import { defineStore } from "pinia";
import {ref,computed} from "vue";
import {collection,where,query}  from "firebase/firestore"
import {useFirestore,useCollection} from "vuefire"

export const useSaleStore = defineStore('sales',()=>{
    const date = ref("");
    const db = useFirestore();


    const saleSources = computed(()=>{
        if(date.value){
            const q= query(
                collection(db,"sales"),
                where("date",'==',date.value)
            )

            return q;
        }
    })


     const salesCollection = useCollection(saleSources);


    const isDateSelected = computed(()=>{
         return  date.value
    })

    return{
        date,
        isDateSelected,
        salesCollection
    }
})