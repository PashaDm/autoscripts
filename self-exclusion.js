define(function () {
    return function (task, config) {
        task('Deposit limits', function (task) {

            task.beforeAll(function (done) {
                task.ui
                    .waitForElement('.main-header', 30000)
                    .end(done)
            });

            task.afterAll(function (done) {
                 task.ui
                    .isElementPresent('.fn-open-menu', function(isPresent){
                         if(isPresent) {
                              task.ui
                              .click('.fn-open-menu')
                              .waitForElement('li[data-url="/casino"] a')
                              .click('li[data-url="/casino"] a');
                         } else {
                               task.ui
                        	   .click('.main-header__logo')
                        	   }
                        	  })
                        	.end(done);
                        });

            task.step('Open self-exclusion page', function (done) {
                task.ui
                    .isElementPresent('.fn-open-menu', function(isPresent){
                        if(isPresent) {
                            task.ui
                                .click('.fn-open-menu')
                                .waitForElement('li[data-url="/payment/deposit"] a')
                                .click('li[data-url="/payment/deposit"] a')
                                .waitForElement('.cashier-pages-navigation .arrow-previous')
                                .click('.cashier-pages-navigation .arrow-previous')
                                .waitForElement('.fn-self-exclusion-container', 5000);
                        } else {
                            task.ui
                                .waitForElement('li[data-url="/responsible-gaming"] a')
                                .click('li[data-url="/responsible-gaming"] a')
                                .waitForElement('.fn-self-exclusion-container', 5000);
                        }
                    })
                    .end(done)
            });

            task.step('Click Exclude and check message', function (done) {
                // var periodDropdown;
                // periodDropdown = document.querySelector('.fn-self-exclusion-container [name="period"]');
                // periodDropdown.selectedIndex = 0;
                // $(periodDropdown).trigger('change');
                task.ui
                    .click('.fn-responsible-gaming-self-exclusion-link')
                    .click('.fn-self-exclusion-container [type="submit"]')
                    .waitForElement('.popup-modal__content.fn-popup-content', 5000)
                    .click('.popup-modal__button.fn-accept')
                    .waitForElement('.info__content', 5000)
                    .getText('.info__content', function(text){

                        if (text !== 'Self exclusion was successful.') {
                            done(text);
                        }
                    })
                    .end(done)
            });

        });
    };
});
