# Flight-Booking-System

This is the Backend project of basic CRUD rest APIs for Flight-Booking-System.

## Task performed by Admin

- Registering and Login
- Creating Airplane with Specific Seat Cofiguration
- Fetching Airplane Details
- Creating Flights
- Getting Flight details by PNR and and the corresponding seat configuration
- Allocating Passenger with PNR and Seat Class
- Getting Passenger details

## Tasks performed by User

- Registering and Login
- Getting Flight details by PNR and and the corresponding seat configuration
- Select Seat
- Upgrade Seat

## Documentation

[API Documentation](https://documenter.getpostman.com/view/28873754/2s9Y5crzAF)

## Tech Stack

**Server:** NodeJS, ExpressJS, MongoDB

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE`

`DATABASE_PASSWORD`

`JWT_SECRET`

`JWT_EXPIRES_IN`

`JWT_COOKIE_EXPIRES_IN`

`NODE_ENV`

# Steps to test the application

1-> Login the User (already role set as admin in database)

```http
  POST /api/login
```

```json
{
  "email": "sunny@gmail.com",
  "password": "test1234"
}
```

2-> Create the Airplane

```http
  POST /api/createAirplane
```

```json
{
  "name": "Spice Jetways 203",
  "seatConfiguration": [
    {
      "class": "First",
      "rows": 2,
      "seatsPerRow": 2,
      "farePrice": 5000
    },
    {
      "class": "Business",
      "rows": 2,
      "seatsPerRow": 2,
      "farePrice": 4000
    },
    {
      "class": "Economy",
      "rows": 2,
      "seatsPerRow": 2,
      "farePrice": 3000
    }
  ]
}
```

3-> Create Flight

```http
  POST /api/createFlight
```

```json
{
    "origin": "Bangalore",
    "destination": "New Delhi",
    "airplaneId": (get from the last create Airplane request)
}
```

4-> Get Flight Details by PNR

```http
  GET /api/getFlightByPNR/BANNEW
```

5-> Allocate Passenger with PNR and Seat Class

```http
  POST /api/allocatePNRwithClass
```

create passenger with seat class of First, Economy and Business

```json
{
    "name": "Shivam Dubey",
    "flightId": (fetch from flight details with PNR request),
    "seatClass": "Economy"
}
```

6-> Select Seat

```http
  POST /api/selectSeat
```

```json
{
    "passengerId": (fetch from allocatePNRwithClass request),
    "seatId": (fetch from getFlightByPNR/BANNEW)
}
```

7-> Upgrade Seat

```http
  POST /api/upgradeSeat
```

```json
{
    "passengerId": (fetch from allocatePNRwithClass request),
    "newSeatId": (fetch from getFlightByPNR/BANNEW)
}
```

## Authors

- [@sunny-dubey](https://www.github.com/sunny-dubey)
