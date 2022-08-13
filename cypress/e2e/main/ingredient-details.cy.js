describe("Create order", () => {
 
    beforeEach(() => {
        cy.intercept("GET", "ingredients", { fixture: "ingredients.json" }).as("getIngredients");
        cy.visit('http://localhost:3000');
    });    
    
    it('should drag ingredient to the constructor', () => {
        cy.wait("@getIngredients")
        .its("response.body")
        .then((response) => {
            response.data.forEach(data => {
                cy.get(`[data-cy=ingredient_${data._id}]`).click();
                cy.get(`[data-cy=modal_title]`).contains('Детали ингредиента');
                cy.get(`[data-cy=ingredient_name]`).contains(data.name);
                cy.get(`[data-cy=calories] > [data-cy=detail-value]`).contains(data.calories);
                cy.get(`[data-cy=proteins] > [data-cy=detail-value]`).contains(data.proteins);
                cy.get(`[data-cy=fat] > [data-cy=detail-value]`).contains(data.fat);
                cy.get(`[data-cy=carbohydrates] > [data-cy=detail-value]`).contains(data.carbohydrates);
    
                cy.url().should('include', `/ingredients/${data._id}`); 
    
                cy.get('[data-cy=modal_close_btn]').click().should("not.exist");
            })
        });
    });

  });