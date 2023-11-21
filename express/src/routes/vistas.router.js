import { Router } from 'express';

export const router=Router()


import { join } from "path";
import __dirname from '../../../utils2.js';
import { ProductManager } from '../ProductManager.js';
import { io } from '../app.js';







let archivo = join(__dirname, "/archivos/products.json");
console.log(archivo)

const productManager = new ProductManager(archivo)

router.get('/', async (req,res)=>{

    try {
        let resultado =  await productManager.getProductsAsyncFS();
        res.status(200).render('home',{resultado, titulo :'Home Page'})

    } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`error`});
    }

  
   

      

  
    

    
})
router.get('/realtimeproducts',async (req,res)=>{
    try {
         
        let resultado =  await productManager.getProductsAsyncFS();
        res.status(200).render('realtimeproducts',{resultado, titulo :'RealTime Page'})

    } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`error`});
    }
})

