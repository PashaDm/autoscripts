define(['./utils/ui/logout/logout'], function (logoutHelper) {
    return function(task, config) {
        var userName = config.userName;
        var password = config.password;
        var acceptButton;
        var closeButton;
        function closePopup(task) {
            acceptButton = document.querySelector('.fn-accept');
            closeButton = document.querySelector('.fn-close');
            if (acceptButton) {
                task.ui
                    .click('.fn-accept')
            } else if (closeButton) {
                task.ui
                    .click('.fn-close')
            }
        }
        task('Login', function(task){

            task.beforeAll(function(done) {
                logoutHelper.logout(task, done);
            });

            /*task.afterAll(function (done) {
                task.ui
                    .click('.main-header__logo')
                    .end(done);
            });*/

            task.step('Open login popup', function(done) {
                task.ui
                    .isElementPresent('.btn.fn-login', function(result) {
                        !result && done('Login button not found');
                    })
                    .click('.btn.fn-login')
                    .waitForElement('.login-form',1000)
                    .end(done);
            });

            task.step('Submit form', function(done) {
                task.ui
                    .click('.fn-user-name')
                    .setValue('.fn-user-name', userName)
                    .click('input[name="password"]')
                    .setValue('input[name="password"]', password)
                    .click('.fn-login-btn')
                    .pause(2000)
                    .isElementPresent('.fn-form-messages p.error', function(result) {
                        if (result) {
                            done(document.querySelector('.fn-form-messages p.error').innerHTML);
                        }
                    })
                    .end(done);
            });

            task.step('Accept T&C', function (done) {
                var acceptTC = false;
                task.ui
                    .waitForElement('.fn-accept', 3000, function(isPresent) {
                        if(isPresent) {
                            acceptTC = true;
                        }
                    })
                    .chain(function(){
                        if (acceptTC) {
                            task.ui
                                .click('.fn-accept')
                        }
                    })

                    // .pause(1000)
                    // .isElementPresent('.fn-accept', function(isPresent) {
                    //     if(isPresent) {
                    //         task.ui
                    //             .click('.fn-accept')
                    //     }
                    // })
                    .end(done);
            });


            /*task.step('Open home page', function(done) {
                task.ui
                    .click('.main-header__logo')
                    .end(done);
            });*/

            task.step('Check login status in header', function(done) {
                task.ui
                    .waitForElement('.fn-main-header-user-balance', 5000)
                    .end(done);
            });


        });
    };
});
