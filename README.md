# Birra Front
El projecto utiliza <a href='https://angular.io/'>Angular v12.2.12</a>. El framework de CSS utilizado es Bootstrap.
Incluye Karma para el Testing.

## Instalacion

Primero instalamos dependencias: `npm i`
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Testing
Si bien esta instalado, no cree ningun testing exceptuando el de ejemplo. 
Para poder correr el testing debe correr `npm run test`.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Consideraciones
Para la Weather API elegi: https://rapidapi.com/community/api/open-weather-map, principalmente porque era la que menos ms tenia. Tuve un par de problemas, por ejemplo, no me dejaba mandarle una fecha para que revise el clima, sino que podia ver 16 dias en el futuro (y eso a veces ni me devolvia los dias). Entonces tome el clima actual de la localidad.
La Weather API aveces se bloquea, por lo que en utils guarde una response de la API y cargara por defecto si la Weather API no devuelve nada o devuelve error.
Con el tema de localizacion, queria usar la API de Google para que puedas escribir la direccion exacta pero por peleas con los de Google Cloud no tengo acceso a esas APIs por el momento. Entonces, agarre la API del gobierno para seleccionar la provincia y luego la localidad.
Si hovereas por el icono del clima te dice la temperatura en C. Si, MUY poco UX, perdon!

Si, la pagina tiene register, raro, pero sino un poco bardo cargar usuarios.

## Dudas
Cualquier duda no tengo problema en responderlas :D.
