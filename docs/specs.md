# Spec Driven Development (SDD)

> El código no se escribe hasta que el spec está aprobado por un humano.

## Estructura

```
specs/<feature-name>/
├── plan.md   # QUÉ se necesita
```

El `feature-name` se le debe pedir al humano.

## Estados de current.md

| Estado        | Significado                                                   |
| ------------- | ------------------------------------------------------------- |
| `pending`     | Sin spec. El `spec_author` es el primero en actuar.           |
| `spec_ready`  | Spec drafted. Esperando aprobación humana. NO se toca código. |
| `in_progress` | Spec aprobado. `implementer` trabajando.                      |
| `done`        | Código verde, `reviewer` aprobó, sesión cerrada.              |
| `blocked`     | Atascado. Razón en `progress/current.md`.                     |

## La puerta de aprobación humana

El flujo automático se detiene **una vez**: cuando el `planner` termina
el plan, marca la feature en current.md como `spec_ready` y para. El humano
lee `specs/<feature>/` y dice "aprobado" (o pide cambios).

Solo entonces el `leader` transiciona `spec_ready → in_progress` y lanza
el `implementer`.

```
pending → [planner] → spec_ready → ⏸ HUMANO → in_progress → [implementer → reviewer] → done
```
