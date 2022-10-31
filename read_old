# Weather app - Frontend developer challenge

There was a beautiful idea of building an app that would show the upcoming weather. The developers wrote a nice backend and a frontend following the latest principles and - to be honest - bells and whistles. However, the developers did not have time to finish the frontend. Your task is to continue where they left of or create your own frontend.

## Prerequisites

-   Dockr-er and dockecompose installed on your machine
-   An openweathermap API key

## Returning your solution

1. Create a private GitHub or GitLab repository. DON’T make it public.
2. Make changes, commit them, and push them to your own repository.
3. Create a .zip -package including the .git-directory, but excluding the node_modules-directories.
4. Send us the archive.

## Exercises

Before starting you need to get yourself an API key (by default you should set it in docker-compose.yml) to make queries in the openweathermap. You can run the app locally using npm i && npm start.

### Docker

_Docker containers are central to any modern development initiative. By knowing how to set up your application into containers and make them interact with each other, you have learned a highly useful skill._

-   Add **Dockerfile**'s in the _frontend_ and the _backend_ directories to run them virtually on any environment having [docker](https://www.docker.com/) installed. It should work by saying e.g. `docker build -t weatherapp_backend . && docker run --rm -i -p 9000:9000 --name weatherapp_backend -t weatherapp_backend`. If it doesn't, remember to check your api key first.

-   Add a **docker-compose.yml** -file connecting the frontend and the backend, enabling running the app in a connected set of containers.

-   The developers are still keen to run the app and its pipeline on their own computers. Share the development files for the container by using volumes, and make sure the containers are started with a command enabling hot reload.

## How to run backend and demo frontend

1. Go and get API key from openweathermap.org
2. Open docker-compose.yml file and replace APPID variable value with your API key
3. Run command line command `docker-compose up -d`
4. The service is now up and running!
    - Backend is now running in http://localhost:9000
    - And demo frontend in http://localhost:8000

### Choosing the frontend framework

One of the first decisions you have to make is to choose a frontend framework to
redesign the frontend. The goal is to build a new, modern, fast and reliable frontend
app to serve all of our current and future users.
Popular choices are:

-   React
-   Vue
-   Angular
-   Some other framework of you preference

Note that you can delete the existing demo frontend made with React if you choose
to implement your application with Vue, Angular or something totally different. Be
sure to include clear instructions on how to run your application. Sticking to
docker-compose is highly advisable.

### Frontend feature wishlist

The application should display the current weather as an icon as well as current temperature, humidity and air pressure

-   It should probably report the forecast e.g. a few hours from now. (tip: eropenweathmap api and existing methods in the backend)
-   The demo frontend app currently reports the weather only for Helsinki. Shouldn't it check the browser location and use that as the reference for
    making a forecast? (tip: geolocation)
-   Think of UI and UX. How could our service stand out from the vast amount of other weather service sites and, at the same time, be as user-friendly and
    intuitive as possible?

### Testing

Test automation is key in developing good quality applications. Finding bugs in early
stages of development is valuable in any software development project. With Robot
Framework you can create integration tests that also serve as feature descriptions,
making them exceptionally useful.

-   Create automated tests for the application. (tip: mocha)
-   Create Robot Framework integration tests. Hint: Start by creating a third
    container that gives expected weather data and direct the backend queries
    there by redefining the MAP_ENDPOINT.

### Documentation

Good documentation benefits everyone.

-   Remember to update the README
-   Use descriptive names and add comments in the code when necessary
