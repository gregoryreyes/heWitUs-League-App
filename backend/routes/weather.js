import { Router } from "express";

const router = new Router;
const weatherUrl = process.env.OPEN_WEATHER_URL;

router
  .get( '/', async (req, res) => {
    console.log( 'weather main page' );
    res.json( { msg: 'weather main page' } ).status(200);
  })
  .get( '/:zip', async (req, res) => {
    const { zip } = req.params;

    try {
      const getWeather = (await fetch( weatherUrl + zip )).json()
        .then( data => {
          console.log( 'data --> ', data );
          // const temp = data.main.temp;
          // const feelsLike = data.main.feels_like;
          // const city = data.name;
          // const country = data.sys.country;
          // const weatherDescription = data.weather[0].main;

          // const weatherInfo = {
          //   temperature: temp,
          //   feels_like: feelsLike,
          //   city: city,
          //   country: country,
          //   weather_description: weatherDescription
          // }

          res.json( data ).status(200);
        })
    } catch (error) {
      res.json(error);
    }

  });

export default router;
