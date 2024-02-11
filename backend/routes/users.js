import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/users.js';

const router = new Router();
const saltRounds = Number( process.env.SALT_ROUNDS );

router
/**
 * GET /
 * @description returns all users
 */
  .get( '/', async (req, res) => {
    const getAllUsers = await User.find({});
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
   * DELETE /:id
   */
  .delete( '/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const deleteUser = await User.findByIdAndDelete(id);
      res.json( {msg: "User deleted", deleteUser } );
    } catch (error) {
      console.log(error);
      res.json(error).status(400);
    }
  })
  /**
   * PUT /:id/update-password
   * @param: client needs to send body;
   * {
   *  currentPassword: "my old password"
   *  newPassword: "my new password"
   * }
   * 
   * We can use NodeMailer here to send emails before updating the password
   */
  .put( '/:id/update-password', async (req, res) => {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;

      // Find the user to update
      const user = await User.findById(id);
      if ( !user ) return res.json( { msg: 'User not found!' } ).status(404);

      // Verify old password with the password hash in db
      const passwordMatched = await bcrypt.compare( currentPassword, user.password );
      if (!passwordMatched ) {
        return res.json( { msg: 'Authentication Error' } ).status(401);
      }

      console.log( 'password matched!' );

      // Hash the new password
      const hashedPassword = await bcrypt.hash( newPassword, saltRounds );

      // Set the old password hash to the newPassword hash
      await User.findByIdAndUpdate( id, { password: hashedPassword } );

      res.json( { msg: 'User password updated!', user } );
    } catch (error) {
      console.log(error);
      res.json(error).status(400);
    }
  })
  /**
   * POST /signin
   * @description Route for user authentication with email and password
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
      const passwordMatched = await bcrypt.compare( req.body.password, findUserByEmail.password );

      console.log( 'passwordMatched --> ', passwordMatched );

      passwordMatched ? passwordValidated = true : passwordValidated = false;
    }

    if ( userFound && passwordValidated ) {
      console.log( 'found user and password was validated!' );
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

          // Using the Mongoose timestamp instead of the two lines below
          // let myDate = new Date();
          // newDocument.date_created = myDate.toString();

          const newUser = await User.create(newDocument);

          // send the new user
          res.json(newUser).status(203);
          
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