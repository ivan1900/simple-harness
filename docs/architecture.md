### Arquitectura de la aplicación

========================
Este documento define el estandar de calidad de la arquitectura de la aplicación. Cualquier feature que no cumpla con estas reglas será rechazada por el revisor.

### Principios

La aplicación se organiza en capas. Cada capa tiene un propósito y responsabilidades bien definidas. Las capas son:

- domain: Contiene la lógica de negocio y las entidades del dominio. No depende de ninguna otra capa.
- application: Contiene la lógica de aplicación y los casos de uso. Depende de domain
- infrastructure: Contiene la implementación de la infraestructura, como bases de datos, servicios externos, etc. Depende de application y domain.
- interfaces: Contiene la implementación de las interfaces de usuario, como APIs REST, CLI, etc. Depende de application y domain.
