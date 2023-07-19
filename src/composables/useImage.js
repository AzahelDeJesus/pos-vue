import {ref,computed}  from "vue";
import {getDownloadURL, ref as storageRef,uploadBytesResumable} from "firebase/storage"
import {useFirebaseStorage} from "vuefire"


export default  function useImages(){
    const storage = useFirebaseStorage();
    const url = ref('');
    

   function onFileChange(e){
      const file = e.target.files[0];
      const filename = crypto.randomUUID() + ".jpg";
      const sRef = storageRef(storage,"/products/" +filename);
      const uploadTask = uploadBytesResumable(sRef,file);
      uploadTask.on('state_changed',
      ()=>{

      },
      (err)=>{
      },
      ()=>{
           getDownloadURL(uploadTask.snapshot.ref)
           .then(downloadUrl=>{
               url.value = downloadUrl;
           })
      }
      )
   }


    
   const isImageUploaded = computed(()=>{
    return url.value ?  url.value : null 
 })

    return{
        url,
      onFileChange,
      isImageUploaded 
    }
   }
