import { useRef, useState } from 'react';

const Api_key = 'e888d04ff106d353836955ce994becbd';

const App = () => {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

  const WeatherTypes = [
    {
      type: 'Clear',
      img: 'https://usagif.com/wp-content/uploads/gifs/sun-41.gif ',
    },
    {
      type: 'Rain',
      img: 'https://img1.picmix.com/output/stamp/normal/2/2/4/3/1393422_45cac.gif',
    },
    {
      type: 'Snow',
      img: 'https://usagif.com/wp-content/uploads/gif/snwflks-5.gif',
    },
    {
      type: 'Clouds',
      img: 'https://thumbs.gfycat.com/VacantGloriousAmberpenshell-size_restricted.gif',
    },
    {
      type: 'Haze',
      img: 'https://cdn-icons-png.flaticon.com/512/1197/1197102.png',
    },
    {
      type: 'Smoke',
      img: 'https://i.gifer.com/origin/48/48a539ab3f10d2289757272b2c8242a0_w200.gif',
    },
    {
      type: 'Mist',
      img: 'https://cdn-icons-png.flaticon.com/512/4005/4005901.png',
    },
    {
      type: 'Drizzle',
      img: 'https://i0.wp.com/media1.giphy.com/media/MBNaeXPprs8lBb4fjQ/giphy.gif?cid=6c09b952mjt3u4yobkwd32q3werhmveo43x8btqknbc0xm5d&rid=giphy.gif&ct=s',
    },
  ];

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);
        if (data.cod === 404 || data.cod === 400) {
          setShowWeather([
            {
              type: 'Not Found',
              img: 'https://i.pinimg.com/originals/0e/c0/db/0ec0dbf1e9a008acb9955d3246970e15.gif',
            },
          ]);
        }
        setShowWeather(
          WeatherTypes.filter((weather) => weather.type === data.weather[0].main),
        );
        console.log(data);
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-800 h-screen grid place-items-center">
      <div className="bg-white w-96 p-4 rounded-md">
        <div className="flex items-center justify-between">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Your Location"
            className="text-xl border-b
          p-1 border-gray-200 font-semibold uppercase flex-1"
          />
          <button onClick={fetchWeather}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/009/393/706/original/magnifying-glass-sign-search-icon-free-png.png"
              alt="..."
              className="w-8"
            />
          </button>
        </div>
        <div
          className={`duration-300 delay-75  overflow-hidden
         ${showWeather ? 'h-[27rem]' : 'h-0'}`}
        >
          {loading ? (
            <div className="grid place-items-center h-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                alt="..."
                className="w-14 mx-auto mb-2 animate-spin"
              />
            </div>
          ) : (
            showWeather && (
              <div className="text-center flex flex-col gap-6 mt-10">
                {apiData && (
                  <p className="text-xl font-semibold">
                    {apiData?.name + ',' + apiData?.sys?.country}
                  </p>
                )}
                <img src={showWeather[0]?.img} alt="..." className="w-52 mx-auto" />
                <h3 className="text-2xl font-bold text-zinc-800">
                  {showWeather[0]?.type}
                </h3>

                {apiData && (
                  <>
                    <div className="flex justify-center">
                      <img
                        src="https://w7.pngwing.com/pngs/30/254/png-transparent-thermometer-temperature-computer-icons-liquid-crystal-thermometer-audio-%D1%82%D0%B5%D1%80%D0%BC%D0%BE%D0%BC%D0%B5%D1%82%D1%80-thermometer-thumbnail.png"
                        alt="..."
                        className="h-9 mt-1"
                      />
                      <h2 className="text-4xl font-extrabold">
                        <h2 className="text-4xl font-extrabold">
                          {isCelsius
                            ? `${apiData?.main?.temp.toFixed(1)}°C`
                            : `${(apiData?.main?.temp * 1.8 + 32).toFixed(1)}°F`}
                        </h2>
                      </h2>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
        <div className="flex justify-center items-center">
          <button
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 p-4"
            onClick={() => setIsCelsius(!isCelsius)}
          >
            {isCelsius ? '°F' : '°C'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
