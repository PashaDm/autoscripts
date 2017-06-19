define(['./utils/ui/login/login'], function (loginHelper) {

    return function (task, config) {
        task('Bonus history', function (task) {

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

            task.step('Check bonus history page', function (done) {
                 isMobileOrTablet = (document.querySelector('html.tablet') || document.querySelector('html.mobile'));
                 if (isMobileOrTablet) {
                    task.ui
                    .waitForElement('.fn-open-menu', 10000)
                    .click('.fn-open-menu')
                    .waitForElement('a[href="/bonus-history"]')
                    .click('a[href="/bonus-history"]')
                    .waitForElement('.bonus-history-form', 5000)
                    .end(done);
                 } else {
                    task.ui
                    .waitForElement('.btn_action_deposit', 10000)
                    .click('.btn_action_deposit')
                    .waitForElement('a[href="/bonus-history"]', 10000)
                    .click('a[href="/bonus-history"]')
                    .waitForElement('.bonus-history-form', 5000)
                    .end(done);
                     }
                 });

            task.step('Check bonus item', function (done) {
                task.ui
                    .waitForElement('.fn-bonus-history li',5000)
                    .isElementPresent('.fn-bonus-history .fn-bonus-item', function (isPresent) {
                        if (!isPresent) {
                            done('No bonuses')
                        }
                    })
                    .end(done)
            });

        });
    };
});
