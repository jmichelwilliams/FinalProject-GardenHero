# Garden Hero API Documentation

## Endpoints

| endpoint                | method   | Description                      |
| ----------------------- | -------- | -------------------------------- |
| `/crops`                | `GET`    | Get all crops                    |
| `/crops`                | `POST`   | Add new crop                     |
| `/crop/:id`             | `GET`    | Get specific crop                |
| `/crop/:id`             | `PATCH`  | Update specific crop             |
| `/crop/:id`             | `DELETE` | Delete specific crop             |
| `/users`                | `GET`    | Get all users                    |
| `/users`                | `POST`   | Create new users                 |
| `/user/:id`             | `GET`    | Get specific user                |
| `/user/:id`             | `PATCH`  | Update specific user             |
| `/user/:id`             | `DELETE` | Delete specific user             |
| `/plantbox`             | `GET`    | Get all plantboxes               |
| `/plantbox`             | `POST`   | Create new plantbox              |
| `/plantbox/:id`         | `GET`    | Get specific plantbox            |
| `/plantbox/:id`         | `PATCH`  | Update specific plantbox         |
| `/plantbox/:id`         | `DELETE` | Delete specific plantbox         |
| `/plantbox/:id/:cropId` | `POST`   | Add crop to specific plantbox    |
| `/plantbox/:id/:cropId` | `DELETE` | Delete crop to specific plantbox |

<!-- Remove Plantbox and make the user store the plant box -->
