import {
   getDownloadURL,
   ref,
   StorageReference,
   uploadBytes
} from "firebase/storage";
import { storage } from "../config/firebase.config";

import { v4 } from "uuid";

const pdfsRef = ref(storage, "pdfs");
const pdfsCoversRef = ref(storage, `pdfsCovers`);

const uploadFile = (folderRef: StorageReference) => async (file: File) => {
   const id = v4();
   const name = file.name || "unknown";
   const coverRef = ref(folderRef, `${name}-${id}`);
   const result = await uploadBytes(coverRef, file);
   if (result) {
      const uploadedFileUrl = await getDownloadURL(coverRef);
      // TODO: clean console log
      console.log(uploadedFileUrl);
      return uploadedFileUrl;
   }
   return null;
};

const uploadPdf = uploadFile(pdfsRef);
const uploadPdfCover = uploadFile(pdfsCoversRef);

export { uploadPdf, uploadPdfCover };
