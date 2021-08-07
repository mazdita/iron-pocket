# iron-pocket

El objetivo es construir una aplicación parecida a [pocket](https://getpocket.com). Esta aplicación nos va a permitir guardar enlaces de interés y automágicamente sacará información relevante del enlace para mostrarla en nuestro panel.


El proyecto tiene 2 partes:
  - Express API
  - React app

# Express API

## Iteración 1: definición del modelo Link

Tenemos que completar la definición del modelo **Link** `models/links.model.js`:

| Attribute   | Type     | Validation               |
|-------------|----------|--------------------------|
| url         | String   | Required, must be an URL |
| name        | String   |                          |
| description | String   |                          |
| image       | String   |                          |
| keywords    | [String] | default empty            |

Un ejemplo de esta información representada en json sería:
```
{
  "url": "https://javascript.plainenglish.io/how-to-add-a-file-input-button-and-display-a-preview-image-with-react-2568d9d849f5",
  "title": "How to Add a File Input Button and Display a Preview Image With React",
  "image": "https://miro.medium.com/max/1200/0*MnYS80XbHOkVSXrn",
  "description": "There are often times you want to upload images, videos, pdfs, or other documents from your device. We can easily accomplish this using the HTML input element by setting type="file". This would…"
},
```

## Iteración 2: seeds

Antes de empezar a trabajar en el CRUD necesitamos tener algo de información en la base de datos, para ello vamos a implementar un script con el que llenar nuestra base de datos `bin/seeds.js`. El script está parcialmente implementado, es importante que lo leas detenidamente, te ayudará a entender cómo implementar la acción de `create` del controlador de links.

En `data/links.json` tenemos los links que queremos que terminen en base de datos. Estos links sólo contienen la URL, es lo único que necesitamos conocer, para calcular el resto de la información del modelo vamos a usar la librería [url-metadata](https://www.npmjs.com/package/url-metadata). No nos quedaremos con toda la información, sólo nos interesa: `title`, `description`, `image`.

¡El reto a completar en este fichero es el guardado de los links en base de datos!

## Iteración 3: API CRUD

Trabajaremos en los ficheros de `config/routes.config.js` y `controllers/links.controller.js`, la especificación de la API es la siguiente:

| Verbo  | Ruta       | Respuesta      | Descripción                                                                                                   |
|--------|------------|----------------|---------------------------------------------------------------------------------------------------------------|
| GET    | /links     | [{...}, {...}] | Devuelve todos los links                                                                                      |
| POST   | /links     | {...}          | A partir de una url, obtiene sus metadatos y añade un link a la base de datos. Devuelve el que ha sido creado |
| GET    | /links/:id | {...}          | Devuelve un link por identificador o 404 si no existe                                                         |
| DELETE | /links/:id |                | Borra un link por identificador o 404 si no existe                                                            |
| PUT    | /links/:id |                | Actualiza un link por identificador o 404 si no existe                                                        |

Implementa los métodos en el siguiente orden:
- list
- detail
- delete
- create:
La acción de `create` es especial, no nos van a dar todos los campos del modelo, únicamente nos darán la URL y con la librearía de [url-metadata](https://www.npmjs.com/package/url-metadata) obtendremos el resto de información.
- update:
Todos los campos del modelo podrán ser editados **menos** la `url`.


> Prueba todo **con postman** antes de pasar a la implementación de la web con React. Es importante probar todos los posibles casos, no solo el _happy path_. Trastea poniendo un identificador que no exista, formato inválido, pon como URL un string que no lo sea, etc...

# React APP

Una vez tengamos **bien probada** la API es hora de ponerse manos a la obra con la web.

Necesitaremos los siguientes componentes, este será el orden de implementación:
- Header: link a la vista de todos los enlaces
- Footer
- links:
  - LinksList: listado de todos los links que tenemos en base datos
  - LinkItem: celda resumen de un Link
  - LinkDetail: detalle completo de un link, lo mostraremos en una página dedicada
  - LinkCreator: formulario de creación de un link, **recuerda**: sólo necesitamos la URL.
  - LinkEditor: formulacio de edición de un link: **recuerda**: podremos editar todo menos la URL.

Recuerda que un componente sólo puede volver a pintarse si cambian sus `props` o su `estado`.

> Antes de implementar los componentes piensa si van necesitar estado o no (componente de `clase` vs `función`)
