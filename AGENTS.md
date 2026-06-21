# AGENTS.md — Mapa de navegación para agentes de IA

> Este archivo es el **punto de entrada** para cualquier agente que trabaje en este
> repositorio. NO es una biblia de reglas: es un **mapa**. Lee solo lo que
> necesites cuando lo necesites (divulgación progresiva).

---

## 1. Antes de empezar (obligatorio)

1. Lee `progress/current.md` para entender en qué estado quedó la última sesión.
2. Lee `docs/specs.md` antes de tocar cualquier spec.

## 2. Mapa del repositorio

| Archivo / carpeta      | Qué contiene                                                               | Cuándo leerlo                           |
| ---------------------- | -------------------------------------------------------------------------- | --------------------------------------- |
| `progress/current.md`  | Estado de la sesión actual                                                 | Siempre, al empezar                     |
| `progress/history.md`  | Bitácora append-only de sesiones anteriores                                | Si necesitas contexto histórico         |
| `specs/<feature>/`     | `plan.md`                                                                  | Antes de implementar cualquier feature  |
| `docs/architecture.md` | Qué significa "hacer un buen trabajo" en este proyecto                     | Antes de implementar                    |
| `docs/conventions.md`  | Reglas de estilo, nombres, estructura                                      | Antes de escribir código                |
| `docs/specs.md`        | Proceso SDD: el plan, puerta de aprobación humana                          | Antes de redactar o leer un spec        |
| `docs/verification.md` | Cómo verificar que tu trabajo funciona (incluye trazabilidad requirements) | Antes de declarar una tarea como `done` |

|
`.agents/` | Definiciones de subagentes (`leader`, `planner`, `implementer`, `reviewer`) | Si orquestas trabajo |
| `src/` | Código de la aplicación | Para implementar |

## 3. Reglas duras (no negociables)

- **Una sola feature a la vez.** No mezcles cambios de varias tareas en la misma sesión.
- **No saltes la puerta de aprobación humana.** El leader detiene el flujo
  en `spec_ready` y espera.
- **Documenta lo que haces** en `progress/current.md` mientras trabajas, no al final.
- **Deja el repositorio limpio** antes de cerrar la sesión (ver §5).
- **Si no sabes algo, busca en `docs/`** antes de inventarlo.

## 4. Flujo de trabajo (SDD)

```
pending → [planner] → spec_ready → ⏸ HUMANO → in_progress → [implementer → reviewer] → done
```

1. El leader detecta la primera feature `pending`.
2. El leader lanza `planner`, que crea
   `specs/<name>/plan.md` y marca el status como
   `spec_ready`.
3. **Pausa.** El humano lee el spec en `specs/<name>/` y aprueba (o pide cambios).
4. Una vez aprobado, el leader cambia el status a `in_progress` y lanza `implementer`.
5. El implementer ejecuta `plan.md` .
6. El reviewer verifica, aprueba o rechaza.
7. Si aprueba, el implementer marca `done` y mueve el resumen a
   `progress/history.md`.

## 5. Cierre de sesión (lifecycle)

Antes de terminar:

1. Si la tarea está acabada: marca `status: "done"` en `feature_list.json`.
2. Mueve el resumen de `progress/current.md` al final de `progress/history.md`.
3. Vacía `progress/current.md` dejando solo la plantilla.
4. No dejes archivos temporales, ni TODOs sin contexto.

## 6. Si te bloqueas

- Relee la sección relevante de `docs/`.
- Si la herramienta no hace lo que esperas, **no inventes un workaround**:
  documenta el bloqueo en `progress/current.md` y para la sesión.
