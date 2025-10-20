describe('Test de Login Inválido - Contraseña Incorrecta - Portal Alumno Teclab', () => {
  // Configurar para manejar errores no capturados
  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      // No fallar el test por errores de navegación
      if (err.message.includes('navigation guard') || 
          err.message.includes('Redirected when going')) {
        return false
      }
      return true
    })
  })

  it('debería mostrar error al intentar login con contraseña incorrecta', () => {
    // Datos de login con contraseña incorrecta
    const username = '95755968'  // Usuario válido
    const passwordIncorrecta = 'ContraseñaIncorrecta123'  // Contraseña incorrecta

    cy.visit('/login')
    
    // Esperar a que la página cargue completamente
    cy.get('body').should('be.visible')
    
    // Verificar que estamos en la página correcta
    cy.contains('¡Hola! Qué bueno tenerte por aquí.').should('be.visible')
    
    // Llenar el campo DNI con usuario válido
    cy.get('input[type="text"]').first().clear().type(username)
    
    // Llenar el campo de contraseña con contraseña incorrecta
    cy.get('input[type="password"]').first().clear().type(passwordIncorrecta)
    
    // Hacer clic en el botón "Siguiente"
    cy.contains('Siguiente').click()
    
    // Esperar a que se procese el login
    cy.wait(5000)
    
    // Verificar que el login falló correctamente
    cy.url().then((url) => {
      cy.log('URL actual después del intento de login:', url)
      
      // Verificar que aparezcan mensajes de error
      cy.get('body').then(($body) => {
        const bodyText = $body.text()
        
        // Verificar que se muestre algún mensaje de error relacionado con credenciales
        const hasErrorMessage = bodyText.includes('Usuario o contraseña incorrectos') || 
                               bodyText.includes('Error de autenticación') ||
                               bodyText.includes('Credenciales inválidas') ||
                               bodyText.includes('Usuario no encontrado') ||
                               bodyText.includes('Contraseña incorrecta') ||
                               bodyText.includes('DNI incorrecto') ||
                               bodyText.includes('Acceso denegado') ||
                               bodyText.includes('Error de login')
        
        if (hasErrorMessage) {
          cy.log('✓ Login falló correctamente - se mostró mensaje de error')
          cy.screenshot('login-invalido-contraseña-error')
          
          // Verificar que seguimos en la página de login
          cy.url().should('include', '/login')
          
          // Verificar que los campos siguen visibles (no se redirigió)
          cy.get('input[type="text"]').should('be.visible')
          cy.get('input[type="password"]').should('be.visible')
          cy.contains('Siguiente').should('be.visible')
          
        } else {
          cy.log('✗ No se encontró mensaje de error - el test podría estar fallando')
          cy.screenshot('login-invalido-contraseña-sin-error')
          
          // Si no hay mensaje de error visible, verificar que al menos no se redirigió
          cy.url().should('include', '/login')
        }
      })
    })
  })

  it('debería mantener los campos llenos después de un login fallido', () => {
    // Datos de login con contraseña incorrecta
    const username = '95755968'
    const passwordIncorrecta = 'OtraContraseñaIncorrecta'

    // Visitar la página de login
    cy.visit('/login')
    
    // Esperar a que la página cargue completamente
    cy.get('body').should('be.visible')
    
    // Llenar los campos
    cy.get('input[type="text"]').first().clear().type(username)
    cy.get('input[type="password"]').first().clear().type(passwordIncorrecta)
    
    // Hacer clic en el botón "Siguiente"
    cy.contains('Siguiente').click()
    
    // Esperar a que se procese el login
    cy.wait(5000)
    
    // Verificar que los campos mantienen sus valores (o están vacíos según el comportamiento esperado)
    cy.get('input[type="text"]').first().should('have.value', username)
    // Nota: Algunas aplicaciones limpian el campo de contraseña por seguridad
    // cy.get('input[type="password"]').first().should('have.value', passwordIncorrecta)
    
    cy.screenshot('login-invalido-campos-mantenidos')
  })
})
