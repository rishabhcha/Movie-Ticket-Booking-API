# Movie-Ticket-Booking-API

Backend API's for movie ticket booking system using Node js, Express and MongoDB.

BASE_URL: https://shrouded-scrubland-75633.herokuapp.com/

**1. API to accept details of a movie screen.**

Request method: POST

Request URI: http://localhost:9090/screens

Request body (example):

`{ "name":"inox", "seatInfo": { "A": { "numberOfSeats": 10, "aisleSeats": [0, 5 ,6, 9] }, "B": { "numberOfSeats": 15, "aisleSeats": [0, 5 ,6, 9] }, "D": { "numberOfSeats": 20, "aisleSeats": [0, 5 ,6, 9] } } }`


**2. API to reserve tickets for given seats in a given screen**

Request method: POST

Request URI: http://localhost:9090/screens/{screen‑name}/reserve

Request body (example):

`{ "seats": { "B": [1, 2], "C": [ 6, 7] } }`


**3. API to get the available seats for a given screen**

Request method: GET

Request URI: http://localhost:9090/screens/{screen‑name}/seats?status=unreserved

Response body (example):

`{ "seats": { "A": [0, 1 ,2 ,6, 7, 8 , 9], "B": [0, 8 , 9], "D": [] } }`


**4. API to get information of available tickets at a given position**

Request method: GET

Request URI: http://localhost:9090/screens/{screen‑name}/seats?numSeats={x}&choice= {seat‑row‑and‑number}

Response body (example):

`{ "availableSeats": { "A": [3, 4] } }`
