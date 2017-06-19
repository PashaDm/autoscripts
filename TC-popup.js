define(['./utils/ui/logout/logout'], function (logoutHelper) {
    return function (task) {
        task('Terms & Conditions popup', function (task) {

            task.beforeAll(function(done) {
                logoutHelper.logout(task, done);
            });

            task.afterAll(function (done) {
                task.ui
                    .click('.main-header__logo')
                done();
            });

            task.step('Click on login button', function (done) {
               task.ui
               .waitForElement('.btn_action_login', 1000)
               .click('.btn_action_login')
               .end(done);
               });

               task.step('Wait for login popup', function (done) {
                 task.ui
                 .waitForElement('.fn-login', 5000)
                 .click('.btn_register_clear')
                 .end(done);
                 });

                task.step('Wait for register portlet', function (done) {
                   task.ui
                   .waitForElement('[data-portlet-type="registration"]', 5000)
                   .end(done)
                   });

            task.step('Check if T&C link is present', function (done) {
                task.ui
                    .isElementPresent('[data-title="Terms & Conditions"]', function(isPresent){
                        if(!isPresent)
                        done("No T&C link")
                    })
                    .end(done);
            });

            task.step('Open T&C link and check scroll', function (done) {
                task.ui
                    .click('[data-title="Terms & Conditions"]')
                    .waitForElement('.fn-popup-content', 5000)
                    .pause(1000)
                    .hasVerticalScrollBar('.fn-popup-content', function(isPresent){
                        if(!isPresent)
                            done('No scroll. Possibly T&C are empty')
                    })
                    .end(done);
            });

            task.step('Close T&C popup', function (done) {
                task.ui
                    .click('.fn-close')
                    .pause(500)
                    .isElementPresent('.fn-popup-loader', function(isPresent){
                        if(isPresent){
                            done('Popup was not closed')
                        }
                    })
                    .end(done);
            });

        });
    };
});
