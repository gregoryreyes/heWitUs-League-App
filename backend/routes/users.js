import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/users.js';

const router = new Router();
const saltRounds = process.env.SALT_ROUNDS;

router
/**
 * GET /
 * @description returns all users
 */
  .get( '/', async (req, res) => {
    const getAllUsers = await User.find({});
    console.log( 'getAllUsers --> ', getAllUsers );
    try {
      res.json( getAllUsers );
    } catch (error) {
      console.log( error );
    }
  })
  /**
   * GET /:id
   * @description returns a user by id
   */
  .get( '/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user).status(200);

    } catch (error) {
      res.json(error).status(404);
    }
  })
  /**
   * PUT /:ID
   * @description edit user information by id
   */
  .put( '/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      if ( body.password ) {
        delete body.password;
        console.log( 'Password removed from body');
      }

      const updateUser = await User.findByIdAndUpdate( id, body, {new: true} );
      res.json(updateUser);
    } catch (error) {
      res.json( {msg: 'User not found!'} );
    }
  })
  /**
   * POST /signin
   * @description route to sign in to app
   */
  .post( '/signin', async (req, res) => {
    let userFound = false;
    let passwordValidated = false;

    const findUserByEmail = await User.findOne( { email: req.body.email } );

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
      res.json( {msg: 'User not found or was unable to authenticate'} ).status(204);
    }

  })
  /**
   * POST /
   * @description creates a new user
   */
  .post( '/signup', async (req, res) => {

    console.log( 'req.body --> ', req.body );

    try {
      // check email is not in db
      const isEmailTaken = await User.findOne( { email: req.body.email } );

      if ( !isEmailTaken ) {
        try {
          // create a new user in db
          let newDocument = req.body;
          let myDate = new Date();
          newDocument.date_created = myDate.toString();

          const user = await User.create(newDocument);

          // send the new user
          res.json(user);
          
        } catch (error) {
          res.json(error);
        }
      } else {
        res.json( {msg: 'Email already exists'} ).status(401);
      }
    } catch (error) {
      res.json(error);
    }
  });

export default router;