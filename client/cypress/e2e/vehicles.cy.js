describe('register and login spec', () => {
  before(() => {
    // Connexion pour obtenir le cookie d'authentification
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/signin', // Modifiez l'URL en fonction de votre API
      body: {
        email: 'cypress.example@test.fr',
        password: 'cypress'
      },
      followRedirect: false,
      // Capturez les cookies de la réponse
      onResponse: (response) => {
        // Assurez-vous que la connexion est réussie
        expect(response.status).to.eq(200);

        // Vous devrez peut-être ajuster cette partie pour extraire le cookie
        const authCookie = response.headers['set-cookie'].find(cookie => cookie.startsWith('token='));
        if (authCookie) {
          const cookieValue = authCookie.split(';')[0].split('=')[1];
          cy.setCookie('token', cookieValue);
        }
      }
    });
  });

  it('should access vehicles page with auth cookie', () => {
    // Visitez la page des véhicules avec le cookie d'authentification défini
    cy.visit('http://localhost:5173/vehicles', {
      onBeforeLoad: (win) => {
        // Vous pouvez aussi vérifier si le cookie est correctement défini ici
        // (si vous avez accès aux détails du cookie)
      }
    });

    // Assurez-vous que la page des véhicules se charge correctement
    cy.url().should('include', '/vehicles');
    cy.get('.vehicles-container').should('be.visible'); // Exemple de vérification, ajustez selon votre page
  });
});
