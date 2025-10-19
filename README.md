# Test Automation con Cypress

Este proyecto está configurado para realizar test automation usando Cypress.

## Estructura del proyecto

```
test-aut/
├── cypress/
│   ├── e2e/           # Tests end-to-end
│   ├── fixtures/      # Datos de prueba
│   └── support/       # Comandos personalizados y configuración
├── cypress.config.js  # Configuración de Cypress
└── package.json       # Dependencias y scripts
```

## Comandos disponibles

### Abrir Cypress en modo interactivo
```bash
npm run cypress:open
```

### Ejecutar tests en modo headless
```bash
npm run cypress:run
```

### Ejecutar tests en navegadores específicos
```bash
npm run cypress:run:chrome
npm run cypress:run:firefox
npm run cypress:run:edge
```

## Configuración

El archivo `cypress.config.js` contiene la configuración principal:
- **baseUrl**: URL base para los tests (actualmente: https://example.cypress.io)
- **viewportWidth/Height**: Tamaño de la ventana del navegador
- **video**: Graba videos de las ejecuciones
- **screenshotOnRunFailure**: Toma screenshots cuando fallan los tests

## Primeros pasos

1. Ejecuta `npm run cypress:open` para abrir la interfaz de Cypress
2. Selecciona "E2E Testing"
3. Elige un navegador
4. Ejecuta el test de ejemplo `example.cy.js`

## Escribir nuevos tests

Crea nuevos archivos `.cy.js` en la carpeta `cypress/e2e/` para agregar más tests.
# test-aut
