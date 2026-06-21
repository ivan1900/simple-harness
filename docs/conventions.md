# Convenciones de código y estilo

Este documento define las convenciones de estilo y calidad de código que deben seguirse en este repositorio. Cualquier feature que no cumpla con estas reglas será rechazada por el revisor.

### Estilo TypeScript

## Names

| Type                                | Convention    | Example              |
| ----------------------------------- | ------------- | -------------------- |
| MModules                            | `PascalCase`  | `Module.ts`          |
| Classes                             | `PascalCase`  | `Class`              |
| Functions / variables               | `camelCase`   | `loadNotes`          |
| Constants                           | `UPPER_SNAKE` | `DEFAULT_NOTES_PATH` |
| Private                             | prefix `_`    | `_atomic_write`      |
| vars in interfaces for input output | `snake_case`  | `note_data`          |

## Tests

- use .test.ts suffix for test files.
- use `describe` and `it` blocks to group tests.
