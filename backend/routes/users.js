import { Router } from 'express';
import users from '../models/users.js';

const router = new Router();

router
  .get( '/', async (req, res) => {
    const getAllUsers = await users.find({});
    console.log( 'getAllUsers --> ', getAllUsers );
    try {
      res.send( 'testing users route' );
    } catch (error) {
      console.log( error );
    }
  })
  .post( '/signin', async (req, res) => {
    let userFound = false;
    let passwordValidated = false;

    const findUserByEmail = await users.findOne( { email: req.body.email } );

    // check if user exist
    if ( findUserByEmail ) {
      console.log( 'found user by email!', findUserByEmail );
      userFound = true;

      // check if password is a match
      findUserByEmail.password === 'qwerty' ? passwordValidated = true : passwordValidated = false;
    }

    if ( userFound && passwordValidated ) {
      console.log( 'found user and password was validate!' );
      res.json(findUserByEmail).status(200);
    } else {
      res.json('User not found or was unable to authenticate').status(204);
    }

  })

export default router;