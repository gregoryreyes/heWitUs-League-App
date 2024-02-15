import { Router } from 'express';
import UserProfile from '../models/userProfiles.js';

const router = new Router();

router
  /**
   * GET /
   * @description main route for user profiles
   */
  .get( '/', async (req, res) => {
    try {
      console.log( 'user profile main page' );
      const profiles = await UserProfile.find({}).populate( { path: 'user_id' } );
      res.json(profiles).status(200);
    } catch (error) {
      res.json(error);
    }
  })
  /**
   * GET /:id
   * @description Route to search for a single profile by id
   */
  .get( '/:id', async (req, res) => {
    try {
      const profile = await UserProfile.findOne( { user_id: req.params.id } );
      res.json( profile ).status(200);
    } catch (error) {
      res.json(error).status(404);
    }
  })
  /**
   * PUT /:id
   * @description Edit user profile information by id
   */
  .put( '/:id', async (req, res) => {
    console.log( 'user-profile /:id PUT route coming soon' );
    res.json( {msg: 'user-profile /:id PUT route coming soon' } );
  });

  export default router;