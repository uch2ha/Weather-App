# Dmitry Sinyavskiy Weather App for Eficode

## Installation

### Docker

1. Download and install docker app from official website

```sh
https://docs.docker.com/get-docker/
```

2. Clone or download the zip of the project from git (unzip if needed)

3. Run this command in a terminal, in the root folder where the file docker-compose.yml is located

```sh
docker-compose up -d
```

4. When all packages are downloaded and installed, the application will run on the ports:

   - `Backend` http://localhost:9000
   - `Frontend` http://localhost:8000

### NPM

1. You also can run the application manually via npm package.

   Run this command in the terminal to be sure that you have an npm installed on your device

```sh
npm -v
```

2. Now you need to install npm packages for the project

   Run this command in the ./frontend and ./backend folders

```sh
npm install
```

3. When all is done you can run the application by this command. Do it in different terminals

```sh
npm start
```

4. Application will run on the ports:

   - `Backend` http://localhost:9000
   - `Frontend` http://localhost:8000

## Functionalities and Usage

- Enter the city name to add it to the list of cities or click on location button to add city by your location

picture

- You can add infinite number of cities

- Click "close button" on the bottom the to delete city from the list

- If you click on the card, it will turn and you will see more information about city's weather

picture

- If you will try to add a city that is already on the list or try to add a non-existent city, you will get an error message

picture

picture

- All cities are stored in browser's local storage, if you will refresh the page all not deleted cities will reappear

## Testing
