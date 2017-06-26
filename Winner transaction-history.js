define(['./utils/ui/login/login'], function (loginHelper) {
    var isMobileOrTablet;
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
    return function(task) {
        task('Transaction History', function(task){

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

            task.step('Navigate to Transaction History page', function(done) {
                isMobileOrTablet = (document.querySelector('html.tablet') || document.querySelector('html.mobile'));
                if (isMobileOrTablet) {
                    task.ui
                        .waitForElement('.fn-open-menu', 10000)
                        .click('.fn-open-menu')
                        .waitForElement('a[href="/transaction-history"]')
                        .click('a[href="/transaction-history"]')
                        .waitForElement('.fn-transaction-history', 5000)
                        .end(done);
                } else {
                   task.ui
                       .waitForElement('.btn_action_deposit', 10000)
                       .click('.btn_action_deposit')
                       .waitForElement('a[href="/transaction-history"]', 10000)
                       .click('a[href="/transaction-history"]')
                       .waitForElement('.fn-transaction-history', 5000)
                       .end(done);
                }
            });

            task.step('Check bonus history page', function (done) {
                task.ui
                    .waitForElement('.fn-transaction-history li', 10000)
                    .isElementPresent('.fn-transaction-history .transactions__item', function (isPresent) {
                        if (!isPresent) {
                            done('No transactions')
                        }
                    })
                    .end(done)
            });

        });
    };
});