
import "cypress-localstorage-commands";
describe("Create order", () => {
 
    beforeEach(() => {
        cy.intercept("GET", "ingredients", { fixture: "ingredients.json" });
        cy.intercept("POST", "/api/auth/login", { fixture: "login.json" }).as("postLogin");
        cy.intercept("POST", "/api/orders", { fixture: "created-order.json" }).as("postOrder");
        cy.visit('http://localhost:3000');
    });
    
    // Полный цикл создания заказа
    it('should drag ingredient to the constructor', () => {
        // Убедимся что мы находимся на нужном экране
        cy.contains('Соберите бургер');

        // Проверим возможность листать список ингредиентов
        cy.get('#CommonIngredientList').scrollTo('bottom');   

        // Соберем бургер
        const ingredients = ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733cc", "60d3b41abdacab0026a733c8"];

        const dataTransfer = new DataTransfer();

        ingredients.forEach(id => {
            const element = cy.get(`[data-cy=ingredient_${id}]`);

            element.trigger('dragstart',{
                dataTransfer
            });

            element.invoke('data', 'type').then((val) => {
                let targetSelector = '#ConstructorFilling';

                if (val === 'bun')
                {
                    targetSelector = '#ConstructorTopBun';
                }

                cy.get(targetSelector).trigger('drop', {
                    dataTransfer
                });                
            });            
        });

        // Поиск кнопки "Оформить заказ"
        cy.get('[data-cy=footer_constructor]>Button').contains('Оформить заказ').click();

        // Авторизация
        const email = 'test@yandex.ru';
        const password = 'test_password';
        cy.get('[data-cy=email_input_wrapper] input').type(`${email}`);//{enter}
        cy.get('[data-cy=password_input_wrapper] input').type(`${password}{enter}`);

        // Проверим ответ на соответствие
        cy.wait("@postLogin").its("request.body").should("deep.equal", {
            "email": "test@yandex.ru", 
            "password": "test_password" 
        });

        // Проверим верность отображения имени пользователя в интерфейсе
        cy.get("[data-cy=profile]").should("have.text", "TestName");

        cy.getCookie('accessToken').should('have.property', 'value', 'teSTbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjMzNjhkNDJkMzRhMDAxYzI2ZWM4NSIsImlhdCI6MTY2MDIzNTI4NywiZXhwIjoxNjYwMjM2NDg3fQ.ECLd_eHQ7sLCXH2WWtSJFQAx9BA2v-JXbb1VLINQZRE');
        cy.getLocalStorage('refreshToken').should('equal','TeSt7d5b90e1c3e0cb5f7e9ae07e68021e4d9f8efb567b5b5ba5eca2ffab83d028a95e2d456ab265');

        // Повторный поиск кнопки "Оформить заказ" и создадим заказ
        cy.get('[data-cy=footer_constructor]>Button').contains('Оформить заказ').click();

        cy.wait("@postOrder").its("request.body").should("deep.equal", {
            "ingredients": ingredients
        });

        // Убедимся что мы находимся на нужном экране
        cy.get('[data-cy=created_order_id]').contains('777');

        // Закрываем модальное окно с заказом
        cy.get('[data-cy=modal_close_btn]').click().should("not.exist");
    });

  });