'use server';

import { cookies } from "next/headers"
import { InputString } from "./definitions"
import { URL } from "url";
import { compress, decompress } from 'compress-json'

export async function saveCombo2Cookies( group : InputString[]){
    const cookieStore = await cookies();
    const compressedObject = compress(group);
    cookieStore.delete("previewCombo");
    cookieStore.set('previewCombo', JSON.stringify(compressedObject));
    console.log(JSON.stringify(group));
}

export async function getComboFromCookies( ) {
    
    try{
        const cookieStore = await cookies(); 
        const request = cookieStore.get('previewCombo')
        if (request){
            const decompressedObject = decompress(JSON.parse(request.value));
            return decompressedObject;
        }
         
    } catch ( err) {
       
    }
    
    return undefined;
   
}

