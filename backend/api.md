# Garden Hero API Documentation

## Endpoints

### MVP1

| endpoint            | method   | Description                        |
| ------------------- | -------- | ---------------------------------- |
| `/crops`            | `GET`    | Get all crops                      |
| `/crop/:cropname`   | `GET`    | Get crop by cropname               |
| `/login`            | `POST`   | Login user                         |
| `/weather`          | `GET`    | Get the latest weather information |
| `/plantbox/:userid` | `GET`    | Get user's plantbox                |
| `/plantbox/:userid` | `PATCH`  | Add crop to plantbox               |
| `/plantbox/:userid` | `DELETE` | Delete crop from plantbox          |

### GET /crops

This endpoint is used to get all available crops from the database

#### RESPONSE:

```JSON
{
	"status": 200,
	"data": [
		{
			"_id": "1",
			"name": "Arugula",
			"soil": "Well-drained",
			"temperature": 45,
			"plantingSeason": "Spring",
			"daysToHarvest": 50,
			"url": "https://en.wikipedia.org/wiki/Eruca_vesicaria"
		},
		{
			"_id": "2",
			"name": "Asparagus",
			"soil": "Well-drained",
			"temperature": 70,
			"plantingSeason": "Spring",
			"daysToHarvest": 180,
			"url": "https://en.wikipedia.org/wiki/Asparagus"
		},
        "..."
	]
}

```

### GET /crop/:cropname

This is endpoint is used to get a specific crop when you supply a crop in the param.

#### RESPONSE:

```JSON
{
	"status": 200,
	"data": {
		"_id": "24",
		"name": "Tomato",
		"soil": "Sandy loam, rich in nutrient, well-drained",
		"temperature": 65,
		"plantingSeason": "Spring",
		"daysToHarvest": 90,
		"url": "https://en.wikipedia.org/wiki/Tomato"
	}
}
```

### POST /login

This endpoint is used to handle login. It will verify if the user exists. If it doesn't it creates it in the database.

#### PAYLOAD:

The user supplied from the auth0 provider in the front end is what we send to the endpoint.

```JSON
{
    "nickname": "UserName",
    "name": "user@gmail.com",
    "picture": "https://s.gravatar.com/avatar/7af72f0b4b865164dc7cf57f7b628387?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpy.png",
    "updated_at": "2023-08-29T03:14:38.726Z",
    "email": "user@gmail.com",
    "email_verified": false,
    "sub": "auth0|ID"
}

```

#### RESPONSE:

```JSON
{
  "status": 200,
  "data": {
    "_id": "auth0|idhere",
    "email": "user@gmail.com",
    "nickname": "Usernickname"
  }
}
```

### GET /weather

This endpoint is used to get the weather in Montreal, as well as a 3 day forecast.

#### RESPONSE:

```JSON
{
  "status": 200,
  "data": {
    "location": {
      "name": "Montreal",
      "region": "Quebec",
      "country": "Canada",
      "lat": 45.5,
      "lon": -73.58,
      "tz_id": "America/Toronto",
      "localtime_epoch": 1692324846,
      "localtime": "2023-08-17 22:14"
    },
    "current": {
      "last_updated_epoch": 1692324000,
      "last_updated": "2023-08-17 22:00",
      "temp_c": 22,
      "temp_f": 71.6,
      "is_day": 0,
      "condition": {
        "text": "Clear",
        "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
        "code": 1000
      },
      "wind_mph": 10.5,
      "wind_kph": 16.9,
      "wind_degree": 160,
      "wind_dir": "SSE",
      "pressure_mb": 1008,
      "pressure_in": 29.76,
      "precip_mm": 0,
      "precip_in": 0,
      "humidity": 78,
      "cloud": 0,
      "feelslike_c": 24.5,
      "feelslike_f": 76.1,
      "vis_km": 14,
      "vis_miles": 8,
      "uv": 1,
      "gust_mph": 22.4,
      "gust_kph": 36
    },
    "forecast": {
      "forecastday": [
        {
          "date": "2023-08-17",
          "date_epoch": 1692230400,
          "day": {
            "maxtemp_c": 27.3,
            "maxtemp_f": 81.1,
            "mintemp_c": 17.9,
            "mintemp_f": 64.2,
            "avgtemp_c": 21.9,
            "avgtemp_f": 71.5,
            "maxwind_mph": 12.5,
            "maxwind_kph": 20.2,
            "totalprecip_mm": 1.8,
            "totalprecip_in": 0.07,
            "totalsnow_cm": 0,
            "avgvis_km": 6.9,
            "avgvis_miles": 4,
            "avghumidity": 87,
            "daily_will_it_rain": 1,
            "daily_chance_of_rain": 73,
            "daily_will_it_snow": 0,
            "daily_chance_of_snow": 0,
            "condition": {
              "text": "Patchy rain possible",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/176.png",
              "code": 1063
            //more info
}
```

### GET /plantbox/:userid

This is used to get the user's plantbox base on the user's id (sub)

#### RESPONSE:

```JSON
{
  "status": 200,
  "data": {
    "_id": "auth0|Idhere",
    "user": "user@gmail.com",
    "garden": [
      {
        "_id": "1",
        "name": "Arugula",
        "soil": "Well-drained",
        "temperature": 45,
        "plantingSeason": "Spring",
        "daysToHarvest": 50,
        "url": "https://en.wikipedia.org/wiki/Eruca_vesicaria",
        "plantedOn": "Tuesday, August 15",
        "harvestDate": "Wednesday, October 4"
      },
      {
        "_id": "4",
        "name": "Beet",
        "soil": "Well-drained",
        "temperature": 65,
        "plantingSeason": "Spring",
        "daysToHarvest": 50,
        "url": "https://en.wikipedia.org/wiki/Beetroot",
        "plantedOn": "Tuesday, August 15",
        "harvestDate": "Wednesday, October 4"
      },
      {
        "_id": "1_1692232337713",
        "name": "Arugula",
        "soil": "Well-drained",
        "temperature": 45,
        "plantingSeason": "Spring",
        "daysToHarvest": 50,
        "url": "https://en.wikipedia.org/wiki/Eruca_vesicaria",
        "plantedOn": "Wednesday, August 16",
        "harvestDate": "Thursday, October 5"
      },
      {
        "_id": "21_1692316383019",
        "name": "Edamame",
        "soil": "Well-drained, not too rich in nitrogen",
        "temperature": 60,
        "plantingSeason": "Spring",
        "daysToHarvest": 75,
        "url": "https://en.wikipedia.org/wiki/Edamame",
        "plantedOn": "Thursday, August 17",
        "harvestDate": "Tuesday, October 31"
      }
    ]
  }
}
```

### PATCH /plantbox/:userid

Endpoint used to add a crop to the user's plantbox

#### PAYLOAD:

```JSON
{
  "crop": {
    "_id": "10_1693280861719",
    "name": "Corn",
    "soil": "Loose, well-drained, add nutrients",
    "temperature": 60,
    "plantingSeason": "Spring",
    "daysToHarvest": 60,
    "url": "https://en.wikipedia.org/wiki/Maize",
    "plantedOn": "Monday, August 28",
    "harvestDate": "Friday, October 27"
  }
}

```

#### RESPONSE:

```JSON
{
  "status": 200,
  "message": "Crop added successfully"
}
```

### DELETE /plantbox/:userid

Endpoint used to delete a crop in a user's plantbox

#### PAYLOAD:

```JSON
{
  "crop": {
    "_id": "1_1693073390200",
    "name": "Arugula",
    "soil": "Well-drained",
    "temperature": 45,
    "plantingSeason": "Spring",
    "daysToHarvest": 50,
    "url": "https://en.wikipedia.org/wiki/Eruca_vesicaria",
    "plantedOn": "Saturday, August 26",
    "harvestDate": "Sunday, October 15"
  }
}
```

#### RESPONSE:

```JSON
{
  "status": 200,
  "message": "Crop removed successfully"
}
```
