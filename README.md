# V2C Telegram Bot

Bot de Telegram que permite controlar y monitorizar cargadores V2C en tiempo real a través de la API de V2C Cloud.

Disponible en Telegram como `@v2charge_bot`.

## Funcionalidades

- `/list`: elegir el cargador con botones (paginado)
- `/info`: estado actual en un solo mensaje con botón Actualizar, consumo, intensidad, programación y últimas cargas
- `/set`: pausar, reanudar, habilitar, deshabilitar, intensidad (6-32 A), modo solar y control dinámico
- Soporte multiidioma (ES, EN, DE, FR, IT, PT), también en el menú de comandos
- El mensaje con el token se borra del chat al recibirlo

La API pública de V2C Cloud tiene un límite de 1000 llamadas diarias por token, así que el bot evita llamadas innecesarias (caché breve del token, del cargador elegido y de la lista de cargadores).

## Despliegue

El servicio está desplegado en el **servidor DevOps físico de V2C** mediante **Portainer** usando Docker Compose.

### Requisitos

- Docker
- Portainer (gestión del stack)
- Variables de entorno configuradas (ver `.env.example`)

### Variables de entorno

Copiar `.env.example` a `.env` y rellenar los valores:

```
BOT_TOKEN=    # Token del bot de Telegram (BotFather)
VF_TOKEN=     # Token de la API de V2C Cloud
```

Opcionales:

```
LOG_LEVEL=info              # error | warn | info | debug
BOT_TIMEZONE=Europe/Madrid  # zona horaria de las horas que muestra el bot
```

## Desarrollo local

Requiere Node 22 o superior. Usa un bot de pruebas de @BotFather, nunca el token de producción (dos procesos leyendo el mismo bot se interrumpen entre sí).

```sh
npm ci
npm run dev   # lee .env y reinicia al guardar
npm test
```

### Construir y exportar imagen

Ejecutar en local para generar el `.tar.gz` listo para cargar en el servidor:

```sh
./build-export.sh
# genera: telegrambotservice-<VERSION>.tar.gz
```

### Cargar en el servidor

Subir el `.tar.gz` desde el portal de Portainer: **Images → Import**. Una vez cargada la imagen, actualizar el stack.

El contenedor se reinicia automáticamente ante cualquier error (`restart: unless-stopped`).

## Recursos

- [Cómo obtener el Token ID de la API](https://v2charge.com/how-can-i-get-my-token-id-to-use-the-api-rest-cloud/)
- [Vídeo demo](https://www.youtube.com/watch?v=Y6aZSRe1--Y)
- [GitHub V2C](https://github.com/V2Charge)
- [v2charge.com](https://v2charge.com/)
