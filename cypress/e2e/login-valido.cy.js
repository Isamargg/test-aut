describe('Test de Login Válido - Portal Alumno Teclab', () => {
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

  it('debería realizar login exitoso con credenciales válidas', () => {
    // Datos de login válidos
    const username = '95755968'
    const password = 'Teclab2025_'

    // Visitar la página de login
    cy.visit('/login')
    
    // Esperar a que la página cargue completamente
    cy.get('body').should('be.visible')
    
    // Verificar que estamos en la página correcta
    cy.contains('¡Hola! Qué bueno tenerte por aquí.').should('be.visible')
    
    // Llenar el campo DNI
    cy.get('input[type="text"]').first().clear().type(username)
    
    // Llenar el campo de contraseña
    cy.get('input[type="password"]').first().clear().type(password)
    
    // Hacer clic en el botón "Siguiente"
    cy.contains('Siguiente').click()
    
    // Esperar a que se procese el login
    cy.wait(5000)
    
    // Verificar el resultado del login
    cy.url().then((url) => {
      cy.log('URL actual después del login:', url)
      
      // Verificar si hay mensajes de error
      cy.get('body').then(($body) => {
        const bodyText = $body.text()
        
        if (bodyText.includes('Usuario o contraseña incorrectos') || 
            bodyText.includes('Error de autenticación') ||
            bodyText.includes('Credenciales inválidas') ||
            bodyText.includes('Usuario no encontrado') ||
            bodyText.includes('Contraseña incorrecta') ||
            bodyText.includes('DNI incorrecto')) {
          cy.log('Login falló - credenciales incorrectas')
          cy.screenshot('login-fallido')
          throw new Error('Las credenciales proporcionadas no son válidas')
        } else {
          cy.log('Login exitoso - no se encontraron mensajes de error')
          cy.screenshot('login-exitoso')
          
          // Verificar que no estamos en la página de login
          cy.url().should('not.include', '/login')
        }
      })
    })
  })
})
