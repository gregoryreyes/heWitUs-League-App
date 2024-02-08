import { Router } from 'express';

const router = new Router();

router
  .get( '/', (req, res) => {
    try {
      res.send( 'testing users route' );
    } catch (error) {
      console.log( error );
    }
  });

export default router;