define(['./utils/ui/login/login'], function (loginHelper) {
    var isDailyWeeklyMonthlyLimitsPresent = [Boolean(0), Boolean(0), Boolean(0)];
    var depositLimitsDropdownSelectors = ['#daylosslimit', '#weekdepositlimit', '#monthdepositlimit'];
    var beforeDepositBalance;
    var parseBalanceToNumber = function (balanceAsText) {
        return parseFloat(balanceAsText.substring(balanceAsText.indexOf(' ') + 1).replace(',',''));
    };
    function openDepositLimitsPage(task, done) {
        task.ui
            .pause(4000)
            .isElementPresent('.fn-open-menu', function(isPresent){
                if(isPresent) {
                   console.log('isPresent', isPresent);
                   //debugger;
                   task.ui
                        //.waitForElement('.fn-open-menu', 5000)
                        .click('.fn-open-menu')
                        .waitForElement('li[data-url="/payment/deposit"] a')
                        .click('li[data-url="/payment/deposit"] a')
                        .waitForElement('.cashier-pages-navigation .arrow-previous')
                        .click('.cashier-pages-navigation .arrow-previous')
                        .waitForElement('.fn-loss-limits', 5000);
                } else {
                    task.ui
                        .waitForElement('li[data-url="/responsible-gaming"] a')
                        .click('li[data-url="/responsible-gaming"] a')
                        .waitForElement('.fn-loss-limits', 5000);
                }
            })
           .end(done);
    }

    return function (task, config) {
        task('Loss limits', function (task) {


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


            task.step('Open deposit limits page', function (done) {
               console.log('openDepositLimitsPage');
               console.log('.fn-open-menu', $('.fn-open-menu').length);
               openDepositLimitsPage(task, done);
            });

            task.step('Set loss limits values', function (done) {
                 task.ui
                   .click('[name="daylosslimit"]')
                   .setValue('[name="daylosslimit"]', 50)
                   .click('[name="weeklosslimit"]')
                   .setValue('[name="weeklosslimit"]', 100)
                   .click('[name="monthlosslimit"]')
                   .setValue('[name="monthlosslimit"]', 200)
                   .end(done);
                /*
                var depositLimitsDocumentQuerySelectors = [];2
                var localConfig = [config.daily, config.weekly, config.monthly];
                depositLimitsDropdownSelectors.forEach(function(item){
                    depositLimitsDocumentQuerySelectors.push(document.querySelector(item));
                });
                depositLimitsDocumentQuerySelectors.forEach(function(depositLimit, index){
                    if (depositLimit) {
                        isDailyWeeklyMonthlyLimitsPresent[index] = Boolean(1);
                        task.ui
                            .setValue(depositLimitsDropdownSelectors[index], localConfig[index])
                            .chain(function () {
                                $(depositLimit).trigger('change');
                            })

                    }

                });*/
            });

            task.step('Check message', function (done) {
                task.ui
                    .click('.fn-loss-limits [type="submit"]')
                    .pause(1000)
                    /*
                    .isElementPresent('.fn-popup-content', function (isPresent) {
                        if (isPresent) {
                            closePopup();
                        }
                    })
                    */
                    .waitForElement('div.info__content', 5000)
                    .chain(function () {
                        var message = document.querySelector('div.info__content').textContent;
                        if (message === 'Successfully changed') {
                            done();
                        } else if (message === 'Please select the limits you would like to be applied.') {
                            done('The same limits were set before. Try to set other values.');
                        } else {
                            done(message);
                        }
                    })
                    .end(done);
            });

            task.step('Open home page', function (done) {
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

            task.step('Back to deposit limits page', function (done) {
                openDepositLimitsPage(task, done);
            });

            task.step('Check new values', function (done) {
                var dailyLimitValueAfterChange;
                var weeklyLimitValueAfterChange;
                var monthlyLimitValueAfterChange;
                task.ui
                    .getValue(depositLimitsDropdownSelectors[0], function (limitValue) {
                        dailyLimitValueAfterChange = parseFloat(limitValue);
                    })
                    .getValue(depositLimitsDropdownSelectors[1], function (limitValue) {
                        weeklyLimitValueAfterChange = parseFloat(limitValue);
                    })
                    .getValue(depositLimitsDropdownSelectors[2], function (limitValue) {
                        monthlyLimitValueAfterChange = parseFloat(limitValue);
                    })
                    .chain(function () {
                        if (isDailyWeeklyMonthlyLimitsPresent[0] && (dailyLimitValueAfterChange !== parseFloat(config.daily))) {
                            done('Daily limit is: ' + dailyLimitValueAfterChange + ', but should be: ' + config.daily);
                        }
                        if (isDailyWeeklyMonthlyLimitsPresent[1] && (weeklyLimitValueAfterChange !== parseFloat(config.weekly))) {
                            done('Weekly limit is:' + weeklyLimitValueAfterChange + ', but should be: ' + config.weekly);
                        }
                        if (isDailyWeeklyMonthlyLimitsPresent[2] && (monthlyLimitValueAfterChange !== parseFloat(config.monthly))) {
                            done('Monthly limit is:' + monthlyLimitValueAfterChange + ', but should be: ' + config.monthly);
                        }
                    })
                    .end(done);
            });

            /*
            task.step('Open deposit page', function (done) {
                task.ui
                    .isElementPresent('.fn-open-menu', function(isPresent){
                        if(isPresent) {
                            task.ui
                                .click('.fn-open-menu')
                                .waitForElement('li[data-url="/deposit"] a')
                                .click('li[data-url="/deposit"] a');
                        } else {
                            task.ui
                                .waitForElement('li[data-url="/cashier"] a')
                                .click('li[data-url="/cashier"] a');
                        }
                    })
                    .waitForElement('[data-portlet-type="mobile-cashier"]', 5000)
                    .end(done);
            });
            */
            /*
            task.step('Try to make deposit and check if error present', function (done) {
                task.ui
                    .getText('.val_type_user_balance', function(userBalance){
                        beforeDepositBalance = parseBalanceToNumber(userBalance);
                    })
                    .waitForElement('.deposit__VISA')
                    .click('.micon-payment-VISA')
                    .waitForElement('.deposit__VISA .field_name_amount input[name="amount"]', 1000)
                    .setValue('.deposit__VISA .field_name_amount input[name="amount"]', parseInt(config.daily, 10) + 1)
                    .setValue('.deposit__VISA .field_name_cvv input[name="cvv2"]', 111)
                    .click('.deposit__VISA .form__actions button[type="submit"]')
                    .waitForElement('.error-tooltip', 10000)
                    .end(done);
            });
            */
            /*  // To check the exact error text
             .getText('.error-tooltip', function (errorText) {
                var expectedErrorText = "Amount should be between 0.01 and " + config.daily + " inclusively";
                if (errorText !== expectedErrorText) {
                    done(errorText);
                }
             });*/
            /*
            task.step('Compare balance', function (done) {
                task.ui
                    .getText('.val_type_user_balance', function(userBalance){
                        var afterDepositBalance = parseBalanceToNumber(userBalance);
                        if (afterDepositBalance !== beforeDepositBalance) {
                            done('Balance is: ' + afterDepositBalance + 'm but should be: ' + beforeDepositBalance);
                        }
                    })
                    .end(done);
            });
            */

        });
    };
});
