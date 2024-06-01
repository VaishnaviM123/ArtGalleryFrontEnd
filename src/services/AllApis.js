import { CommonAPI } from "./CommonStructure";
import { base_Url } from "./BaseUrl";

//add painting
export const addPaintingAPI=async(bodyData)=>{
    return await CommonAPI('POST',`${base_Url}/paintings`,bodyData)
}

//access paintings
export const accessPaintingAPI=async()=>{
    return await CommonAPI('GET',`${base_Url}/paintings`,{})
}

//delete painting
export const deletePaintingAPI=async(id)=>{
    return await CommonAPI('DELETE',`${base_Url}/paintings/${id}`,{})
}

//edit painting
export const editPaintingAPI=async(id,bodyData)=>{
    return await CommonAPI('PATCH',`${base_Url}/paintings/${id}`,bodyData)
}

//add photo
export const addPhotoAPI=async(bodyData)=>{
    return await CommonAPI('POST',`${base_Url}/photos`,bodyData)
}

//access photos
export const accessPhotosAPI=async()=>{
    return await CommonAPI('GET',`${base_Url}/photos`,{})
}

//delete photo
export const deletePhotoAPI=async(id)=>{
    return await CommonAPI('DELETE',`${base_Url}/photos/${id}`,{})
}

//edit photo
export const editPhotoAPI=async(id,bodyData)=>{
    return await CommonAPI('PUT',`${base_Url}/photos/${id}`,bodyData)
}

//access category
export const accessCategoryAPI=async()=>{
    return await CommonAPI('GET',`${base_Url}/category`,{})
}

//access Single category
export const accessSingleCategoryAPI=async(id)=>{
    return await CommonAPI('GET',`${base_Url}/category/${id}`,{})
}

//add painting /photo to category
export const addPCategoryAPI=async(bodyData,id)=>{
    return await CommonAPI('PUT',`${base_Url}/category/${id}`,bodyData)
}
