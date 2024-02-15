import { useEffect } from 'react';

export default function StreetBallWeather() {

  const handleGetWeather = async (e) => {
    e.preventDefault();

    try {
      // Connect to the backend
      const fetchData = async () => {
        const zipcode = document.getElementById('weatherZip');
        console.log( 'zipcode --> ', zipcode.value );

        const url = 'http://127.0.0.1:4523/api/street-ball-weather-conditions/' + zipcode.value;

        const res = await fetch(url);
        const weatherConditions = await res.json();
        console.log( 'weatherConditions ----> ', weatherConditions );

        const city = weatherConditions.name;
        console.log( 'city --> ', city );
        const temp = weatherConditions.main.temp;
        console.log( `temp: ${temp}`);
        const description = weatherConditions.weather[0].description;
        console.log( 'description ---> ', description );

        document.getElementById('hwuWeatherCity').innerHTML = city;
        document.getElementById('hwuWeatherTemp').innerHTML = temp;
        document.getElementById('hwuWeatherDescription').innerHTML = description;
      }

      fetchData();

    } catch (error) {
      console.log( error );
    }
  }

  return(
    <div className='hwuDivContentWrap'>
      <div className='hwuDivContent weatherDiv'>
        <h2>Street Ball Weather Forecast</h2>

        <div className="weatherFormWrap">
          <form onSubmit={handleGetWeather}>
            <input
              id='weatherZip'
              className='weatherInput'
              type='text'
              placeholder='Enter Zip Code'
              pattern='[0-9]{5}'
              maxLength="5"
              max={5}
              autoComplete="on"
              // value={''}
              // onChange={ (e) => console.log( e.target.value )}
              required
            />

            <div>
              <button className='hwuSubmitButton' type='submit'>
                Get Weather
                </button>
            </div>

            <div id='weatherResults'>
              <span>
                <p id="hwuWeatherCity"></p>
              </span>
              <span>
                <p id="hwuWeatherTemp"></p>
              </span>
              <span>
                <p id="hwuWeatherDescription"></p>
              </span>
            </div>

          </form>
        </div>

      </div>
      
    </div>
  );
}