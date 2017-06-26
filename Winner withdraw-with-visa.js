define(['./utils/ui/login/login'], function (loginHelper) {
    var isMobileOrTablet;
    var startBalance;
    var acceptButton;
    var closeButton;
    var loginIsNeeded;
    function closePopup(task) {
        acceptButton = document.querySelector('.fn-accept');
        //closeButton = document.querySelector('.fn-close');
        if (acceptButton) {
          task.ui
           .click('.fn-accept')
        } else {
           task.ui
            .click('.fn-close')
        }
    }
    return function(task, config) {

        task('Withdraw with VISA', function(task){

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

            task.step('Open withdraw page', function (done) {
                isMobileOrTablet = !!(document.querySelector('html.tablet') || document.querySelector('html.mobile'));
                if (isMobileOrTablet) {
                task.ui
                    .waitForElement('.fn-open-menu', 5000)
                    .click('.fn-open-menu')
                    .waitForElement('.fn-menu-list a[href="/payment/withdraw"]', 10000)
                    .click('.fn-menu-list a[href="/payment/withdraw"]')
                    .end(done);
                } else {
                   task.ui
                       .waitForElement('.btn_action_deposit', 5000)
                       .click('.btn_action_deposit')
                       .waitForElement('a[href="/payment/withdraw"]', 10000)
                       .click('a[href="/payment/withdraw"]')
                       .end(done);
                   }
            });


            task.step('Withdraw form', function(done) {
                var acceptWithdrawTerms = false;
                task.ui
                    .getText('.val_type_user_balance', function(text){
                        startBalance = text;
                    })
                    .waitForElement('.withdraw__VISA')
                    .click('.micon-payment-VISA')
                    .setValue('.withdraw__VISA .field_name_amount input[name="amount"]', 30)
                    .click('.withdraw__VISA .form__actions button[type="submit"]')
                    .waitForElement('.fn-popup-content')
                    .click('.popup-modal__button_type_accept')

//                    accept additional popup for licensee12
                     .pause(3000)
                     .isElementPresent('.fn-accept', function(isPresent){
                       if(isPresent){
                          acceptWithdrawTerms = true;
                       }
                     })

                     .chain(function () {
                         if (acceptWithdrawTerms) {
                           task.ui
                             .click('.fn-accept')
                          }
                     })

                    .waitForElement('.fn-popup-content')
                    .click('.fn-close')
                    .end(done);

                      /*.chain(function(){
                         if (document.querySelector('.fn-popup-content')) {
                            closePopup(task);
                          }
                       })*/
            });

            task.step('Check balance', function(done) {
                console.log('Start balance is', startBalance);
                task.ui
                    .getText('.val_type_user_balance', function(text){
                        if (startBalance === text) done('Balance was not updated');
                    })
                    .end(done);
            });


        });
    };
});
