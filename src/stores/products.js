import { addDoc, collection, where, query, limit, orderBy, updateDoc} from "firebase/firestore";
import { defineStore } from "pinia";
import { computed } from "vue";
import { useFirestore,useCollection } from "vuefire";
export const useProductsStore =  defineStore("products",()=>{
    
    const db = useFirestore();
    const categories = [
      {
        id: 1,
        name: "sudaderas"
      },
      {
        id: 2,
        name: "tenis"
      },
      {
        id: 3,
        name: "Lentes"
      }

    ];
    
     const q= query(
      collection(db,"products"),
      orderBy("name","asc")
     )

    const productsCollection = useCollection(q);
    async function createProduct(product){
         await addDoc(collection(db,"products"),product);

    }

    async function updateProduct(docRef,product){

      const {image,url,...values} = product;

        if(image.length){
            await updateDoc(docRef,{
              ...values,
               image: url.value
            })
        }else{
     await updateDoc(docRef,values);
              
        }

    }

    const categoriesOptions = computed(()=>{
        const options = [
            {label: 'Seleccione',value: '',attrs:{disabled: true}},
            ...categories.map(category=>(
                {
                    label: category.name,
                    value: category.id
                }
            ))
        ]


        return options;
    })



    const noResults = computed(()=>  productsCollection.value.length === 0);

    return{
        categoriesOptions,
       createProduct,
       productsCollection,
       updateProduct,
       noResults
    }
});