# V2C Telegram Bot

Bot de Telegram que permite controlar y monitorizar cargadores V2C en tiempo real a través de la API de V2C Cloud.

Disponible en Telegram como `@v2charge_bot`.

## Funcionalidades

- Estado del cargador en tiempo real
- Estadísticas de carga
- Comandos de control: pausar, reanudar, bloquear, desbloquear
- Soporte multiidioma (ES, EN, DE, FR, IT, PT)

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
