import { Router } from 'express';
export const router=Router()


import { join } from "path";
import __dirname from '../../../utils2.js';

import { CartManager } from '../CartManager.js';
import { ProductManager } from '../ProductManager.js';






let archivo = join(__dirname, "/archivos/carts.json");

// console.log(archivo)

const cartsManager = new CartManager(archivo);

let archivoManager = join(__dirname, "/archivos/products.json");

const productManager3 = new ProductManager(archivoManager)


router.get('/',async (req,res)=>{

    let resultado = await cartsManager.getCartsAsyncFS();

    if (req.query.limit) {
      resultado = resultado.slice(0, req.query.limit);
    }
    res.setHeader("Content-type", "application/json");
    return res.status(200).json({ filtros: req.query, resultado });

    

})




router.get('/:cid',async (req,res)=>{

    let { cid } = req.params;
    cid = parseInt(cid);

    if (isNaN(cid)) {
        res.setHeader("Content-Type", "application/json");
        return res
          .status(400)
          .send({ error: "Error, ingrese un argumento id numerico" });
      }

      let resultado = await cartsManager.getCartByIdAsyncFS(cid)

  if (!resultado) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).send({ error: `Error, No existe el id ${cid}` });
  }
  res.setHeader("Content-type", "application/json");
  return res.status(200).json({ filtros: req.params, resultado });

    

})



router.post('/',async (req,res)=>{

    let {
        products
      } = req.body;

      if (!products ) {
        res.setHeader("Content-Type", "application/json");
        return res.status(400).json({
          error: `Los products del carrito son obligatorios`,
        });
      }


      let resultado = await cartsManager.addCartAsyncFS(products)
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({ resultado });
})

router.post("/:cid/product/:pid", async (req,res)=>{

    let {cid} = req.params;
    let {pid} = req.params;
   
    cid = parseInt(cid);
    pid = parseInt(pid);
    


    let{ productId, qty} = req.body
   

    let productAgregar = req.body
  

    if (isNaN(cid) || isNaN(pid)) {
        res.setHeader("Content-Type", "application/json");
        return res
          .status(400)
          .send({ error: "Error, ingrese los id numericos" });
      }

      let resultado1 = await cartsManager.getCartByIdAsyncFS(cid)

      if (!resultado1 ) {
        res.setHeader("Content-Type", "application/json");
        return res.status(400).json({
          error: `No existe el carrito con id ${cid}`,
        });
      }

      let resultado2 = await productManager3.getProductByIdAsyncFS(pid)

      if (!resultado2 ) {
        res.setHeader("Content-Type", "application/json");
        return res.status(400).json({
          error: `No existe el producto  con id ${pid}`,
        });
      }

      let resultado3 = await cartsManager.addCartProductAsyncFS(cid, pid, productAgregar)

      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({ resultado3 });

    

})