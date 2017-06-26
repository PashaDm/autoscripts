define(['./utils/ui/login/login'], function (loginHelper) {
    var previousBalance;
    var isMobileOrTablet;
    var acceptButton;
    var closeButton;
    var Accept;


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
    return function(task, config) {
        task('Deposit with VISA', function (task) {

            task.beforeAll(function (done) {
                loginHelper.login(task, done);
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

            task.step('Open deposit page', function(done) {
              var isTablet = document.querySelector('html.tablet');
              var isMobile = document.querySelector('html.mobile');
                if (isTablet || isMobile) {
                    task.ui
                        .pause(5000)
                        .waitForElement('.fn-open-menu', 5000)
                        .click('.fn-open-menu')
                        .waitForElement('.fn-menu-list a[href="/payment/deposit"]')
                        .click('.fn-menu-list a[href="/payment/deposit"]')
                        .end(done);
                } else {
                    task.ui
                        .waitForElement('a[href="/payment/deposit"].menu__nav-link')
                        .click('a[href="/payment/deposit"].menu__nav-link')
                        .waitForElement('.portlet-title-text')
                        .isElementPresent('.portlet-title-text', function(isElementPresent) {
                            if (!isElementPresent) {
                                done('No deposit portlet.');
                            }
                        })
                        .end(done);
                }
            });

            task.step('Deposit form', function (done) {
                task.ui
                    .getText('.val_type_user_balance', function (text) {
                        previousBalance = text;
                    })
                    .waitForElement('.deposit__VISA')
                    .click('.micon-payment-VISA')
                    .waitForElement('.deposit__VISA .field_name_amount input[name="amount"]', 1000)
                    .setValue('.deposit__VISA .field_name_amount input[name="amount"]', 250)
                    .setValue('.deposit__VISA .field_name_cvv input[name="cvv2"]', 111)
                    .click('.deposit__VISA .form__actions button[type="submit"]')
                    .waitForElement('.fn-popup-content', 10000)
                    .click('.fn-close')
                    .end(done);
            });

            task.step('AcceptSD', function (done) {
                var acceptSD = false;
                task.ui
                    .waitForElement('.fn-accept', 3000, function (isPresent) {
                        if (isPresent) {
                            acceptSD = true;
                        }
                    })
                    .chain(function () {
                        if (acceptSD) {
                            task.ui
                                .click('.fn-accept')
                        }

                    })
                    .end(done);
            });

                task.step('Check balance', function (done) {
                    task.ui
                        .getText('.val_type_user_balance', function (currentBalance) {
                            if (previousBalance === currentBalance) {
                                done('Balance was not updated');
                            }
                        })
                        .end(done);
                });

            });
        };
    });




