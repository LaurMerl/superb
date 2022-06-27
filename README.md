<h1>This solution has been develp as Booking Manager service.</h1>

<h2><b>Full disclaimer:</b></h2>
The solution that I've suggested is a light, out-of-the-box implementation of a Booking Manager service using NestJS and Mongoose, intended mainly to be used in combination with a dedicated Front-end. </br>This is <u>NOT</u> production ready it's intended to be a quick setup due to time costraint I've choose to dedicate to it (10 hs).
</br></br>
<h3><i>About the apis:</i></h3>
The developed endpoints are all CRUD operations, see the Postman.json file for the entire collection (nice to have, OpenApi standard in Swagger or similar).
</br></br>
<h3><i>How to run it:</i></h3>
Navigate from your terminal in the downloaded project's folder.
In your terminal window run `docker-compose up --build`
</br></br>
<h3><i>How to test it:</i></h3>
In your terminal console, run `npm tun test` (mind that there are only some unit-tests)
</br></br>
<h3><i>Further improvement points:</i></h3>
<ul>
  <li> No validation if restaurant is not present in the collection (would be nice to have a generic shared one for all routes)</li>
  <li> The structure of Opening Dates and Time of a Restaurant (I had other ideas on that but it would have required much more time)</li>
  <li> Reservation times could have been in a better format, I am still happy that the system can support different timezones</li>
  <li> Configuration separate from business logic</li>
  <li> Code refactory (smaller functions, maybe even some abstraction)</li>
  <li> Diversification and enhancement of tests (of course)</li>
</ul>
</br></br>
