define(['./utils/ui/logout/logout'], function (logoutHelper) {
  return function (task) {
    var buttonNextSelectorFirst;
    var buttonNextSelectorSecond;
    var acceptButton;
    var closeButton;
    var isDesktop = document.querySelector('html.desktop');
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

        task('Registration', function (task) {

            task.beforeAll(function(done) {
                logoutHelper.logout(task, done);
            });

            task.afterAll(function (done) {
                if (isDesktop) {
                    task.ui
                    .click('.main-header__logo')
                    .end(done);
                } else {
                   task.ui
                  .click('.fn-back-button')
                  .end(done);
                }
            });

            task.step('Open Casino page', function (done) {
                    task.ui
                        .isElementPresent('.fn-open-menu', function(isPresent){
                            if(isPresent) {
                                task.ui
                                    .click('.fn-open-menu')
                                    .waitForElement('a[href="/casino"]')
                                    .click('a[href="/casino"]')
                            } else {
                                task.ui
                                    .waitForElement('a[href="/casino"]')
                                    .click('a[href="/casino"]')
                            }
                        })
                        .end(done);
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

            task.step('Filling the fields', function (done) {
               /*
                var phoneSelector;
                phoneSelector = (document.querySelector('[name="phone"]')) ? '[name="phone"]' : '[name="cellphone"]';
               */
                // second selector is fake. created to click on it if Next button is not present (e.g. on desktop)
                buttonNextSelectorFirst = document.querySelector('.fn-next') ? '.fn-next' : '[name="firstname"]';
                /*
                var confirmEmailSelector;
                confirmEmailSelector = (document.querySelector('[data-origin-name="email"]')) ? '[data-origin-name="email"]' : '[name="emailVerify"]';
                var confirmPasswordSelector;
                confirmPasswordSelector = (document.querySelector('[data-origin-name="password"]')) ? '[data-origin-name="password"]' : '[name="passwordVerify"]';
                */
                var isDesktop = document.querySelector('html.desktop');
                if (isDesktop) {
                    console.log('Element', $('#day'));
                    task.ui
                    .click('[name="firstname"]')
                    .setValue('[name="firstname"]', 'Firstname')
                    .click('[name="lastname"]')
                    .setValue('[name="lastname"]', 'Lastname')
                    .setValue('#day', '01')
                    .setValue('#month', '01')
                    .setValue('#year', '1998')
                    .click('[name="email"]')
                    .setValue('[name="email"]', 'test@playtech.com')
                    .setValue('[name="cellphone"]', '1234567890')
                    .waitForElement('[name="userName"]')
                    .click('[name="userName"]')
                    .setRandomValue('[name="userName"]', '[a-zA-Z0-9]{6,10}')
                    .click('[name="password"]')
                    .setValue('[name="password"]', 'Password1')

                    .end(done);
                } else {
                    task.ui
                    .click('[name="firstname"]')
                    .setValue('[name="firstname"]', 'Firstname')
                    .click('[name="lastname"]')
                    .setValue('[name="lastname"]', 'Lastname')
                    .click('[name="email"]')
                    .setValue('[name="email"]', 'test@playtech.com')
                    .setValue('[name="cellphone"]', '1234567890')
                    .click(buttonNextSelectorFirst)
                    .waitForElement('[name="userName"]')
                    .click('[name="userName"]')
                    .setRandomValue('[name="userName"]', '[a-zA-Z0-9]{6,10}')
                    .click('[name="password"]')
                    .setValue('[name="password"]', 'Password1')
                    .end(done);
                         }
                     });

                 task.step('Register', function (done) {
                            task.ui
                            .click('.btn-m-success')
                            .end(done);
                 });

                 task.step('Check registration status', function (done) {
                             task.ui
                             .waitForElement('.cashier-add-card__title', 5000)
                             .end(done);
                 });


                /*task.ui
                    .click('[name="firstname"]')
                    .setValue('[name="firstname"]', 'Firstname')
                    .click('[name="lastname"]')
                    .setValue('[name="lastname"]', 'Lastname')
                    .setValue('#day', '01')
                    .setValue('#month', '01')
                    .setValue('#year', '1998')
                    .click('[name="email"]')
                    .setValue('[name="email"]', 'test@playtech.com')
                    */
                    //.click(buttonNextSelectorFirst)
                    /*
                    .setValue('[name="countrycode"]', 'AT')
                    .waitForElement('[name="state"]')
                    .click('[name="state"]')
                    .setValue('[name="state"]', 'State')
                    .click('[name="city"]')
                    .setValue('[name="city"]', 'City')
                    .click('[name="address"]')
                    .setValue('[name="address"]', 'Address 13')
                    .click('[name="zip"]')
                    .setValue('[name="zip"]', '10000')
                    .click(phoneSelector)

                    .setValue(phoneSelector, '1234567890')
                    .setValue('[name="cellphone"]', '1234567890')
                    //.click(buttonNextSelectorSecond)
                    .waitForElement('[name="userName"]')
                    .click('[name="userName"]')
                    .setRandomValue('[name="userName"]', '[a-zA-Z0-9]{6,10}')
                    .click('[name="password"]')
                    .setValue('[name="password"]', 'Password1')
                    /*
                    .click('[name="verificationQuestion"]')
                    .setValue('[name="verificationQuestion"]', 'question')
                    .click('[name="verificationAnswer"]')
                    .setValue('[name="verificationAnswer"]', 'answer')
                    .isElementPresent('#daydepositlimit', function(isPresent) {
                        if (isPresent) {
                            task.ui
                                .setValue('#daydepositlimit', '500')
                        }
                    })
                    .isElementPresent('#daydepositlimit', function(isPresent) {
                        if (isPresent) {
                            task.ui
                                .setValue('#weekdepositlimit', '500')
                        }
                    })
                    .isElementPresent('#daydepositlimit', function(isPresent) {
                        if (isPresent) {
                            task.ui
                                .setValue('#monthdepositlimit', '500')
                        }
                    })
                    .click('#terms-checkbox')

                    .end(done);
            });
            */
            // Does not work on iOS
            // task.step('Set login to local storage', function (done) {
            //     var userName = document.getElementsByName("userName")[0];
            //     localStorage['auto-userName'] = userName.value;
            //     done();
            // });


            /*
            task.step('Accept T&C', function (done) {
                task.ui
                   .waitForElement('.fn-accept', 3000, function(isPresent) {
                       if (isPresent) {
                           task.ui
                               .click('.fn-accept')
                       }
                   })
                    .end(done);
            });
            */
            /*
            task.step('Open home page', function (done) {
                task.ui
                    .click('.main-header__logo')
                    .end(done);
            });
            */

        });
    };
});
