define(['./utils/ui/login/login'], function (loginHelper) {
    var balance;
    var totalSumPendingWithString;
    var totalSumPendingWith;
    var listOfPendingWith;
    var totalNumberPendingWith;
    var newTotalSumPendingWith;
    var newTotalNumberPendingWith;
    var last4Digits;
    var balanceSum;
    var withdrawSum;
    var lastPendingAmount;
    var current4Digits;
    var methodName;
    var prevBalance;
    var currentBalance;
    var isTablet = document.querySelector('html.tablet');
    var isMobile = document.querySelector('html.mobile');
    var prevBalanceString;
    var currentBalanceString;
    return function (task, config) {
        task('Pending withdrawals new', function (task) {

            task.beforeAll(function (done) {
                loginHelper.login(task, done);
            });

            task.beforeAll(function (done) {
                task.ui
                    .waitForElement('.main-header', 30000)
                    .chain(function () {

                    })
                    .end(done);
            });
            task.step('Open deposit page', function (done) {
                prevBalanceString = document.querySelector('.val_type_user_balance').textContent;
                prevBalanceString = parseFloat(prevBalanceString.substring(prevBalanceString.indexOf(' ') + 1).replace(',', ''));
                prevBalance = parseInt(prevBalanceString, 10);
                if (prevBalance < config.amount) {
                    done('Insufficient funds. Make a deposit.');
                } else {
                    if (isTablet || isMobile) {
                        task.ui
                            .waitForElement('.fn-open-menu', 20000)
                            .click('.fn-open-menu')
                            .waitForElement('.fn-menu-list a[href="/payment/deposit"]')
                            .click('.fn-menu-list a[href="/payment/deposit"]')
                            .end(done);
                    } else {
                        task.ui
                            .waitForElement('a[href="/payment/deposit"].menu__nav-link')
                            .click('a[href="/payment/deposit"].menu__nav-link')
                            .waitForElement('.portlet-title-text')
                            .isElementPresent('.portlet-title-text', function (isElementPresent) {
                                if (!isElementPresent) {
                                    done('No deposit portlet.');
                                }
                            })
                            .end(done);
                    }
                }
            });
            task.step('Open pending withdrawals', function (done) {
                if (isTablet || isMobile) {
                    task.ui
                        .waitForElement('.fn-open-menu', 5000)
                        .click('.fn-open-menu')
                        .waitForElement('.fn-menu-list a[href="/pending-withdraw"]')
                        .click('.fn-menu-list a[href="/pending-withdraw"]')
                        .end(done);
                } else {
                    task.ui
                        .waitForElement('a[href="/pending-withdraw"].menu__secondlevel-link', 30000)
                        .click('a[href="/pending-withdraw"].menu__secondlevel-link')
                        .isElementPresent('.portlet-title-text', function (isElementPresent) {
                            if (!isElementPresent) {
                                done('No deposit portlet');
                            }
                        })
                        .end(done);
                }
            });

            task.step('Remember total sum of pending withdrawals', function (done) {
                task.ui
                    .waitForElement('.fn-pending-withdraw-sum')
                    .chain(function () {
                        totalSumPendingWithString = document.querySelector('.fn-pending-withdraw-sum')
                            .textContent;
                        totalSumPendingWith = parseFloat(totalSumPendingWithString.substring(totalSumPendingWithString.indexOf(' ') + 1).replace(',', ''));
                        if (totalSumPendingWith >= 0) {
                            done();
                        } else {
                            done('Something went wrong. Sum of pending withdraw is less than 0');
                        }
                    })
                    .end(done);
            });

            task.step('Remember total number of pending withdrawals ', function (done) {
                task.ui
                    .waitForElement('.pending-withdraw-total__label')
                    .isElementPresent('li.info-list__row span.fn-accordion-target', function (isElementPresent) {
                        if (!isElementPresent) {
                            totalNumberPendingWith = 0;
                        } else {
                            totalNumberPendingWith = document.querySelectorAll('li.info-list__row span.fn-accordion-target').length;
                        }
                    })
                    .end(done);
            });

            task.step('Open withdraw page', function (done) {
                if (isMobile || isTablet) {
                    task.ui
                        .waitForElement('.fn-open-menu', 5000)
                        .click('.fn-open-menu')
                        .waitForElement('.fn-menu-list a[href="/payment/withdraw"]', 5000)
                        .click('.fn-menu-list a[href="/payment/withdraw"]')
                        .end(done);
                } else {
                    task.ui
                        .waitForElement('.btn_action_deposit', 5000)
                        .click('.btn_action_deposit')
                        .waitForElement('a[href="/payment/withdraw"]', 5000)
                        .click('a[href="/payment/withdraw"]')
                        .isElementPresent('.portlet-title-text', function (present) {
                            if (!present) {
                                done('No deposit portlet');
                            }
                        })
                        .end(done);
                }
            });

            task.step('Withdraw form', function (done) {
                task.ui
                    .waitForElement('.withdraw__VISA')
                    .chain(function () {
                        document.getElementsByClassName('withdraw__VISA')[0].previousSibling.click();
                    })
                    .setValue('.withdraw__VISA .field_name_amount input[name="amount"]', config.amount)
                    .click('.withdraw__VISA .form__actions button[type="submit"]')
                    .waitForElement('.popup-modal__button_type_accept')
                    .click('.popup-modal__button_type_accept')
                    /*.waitForElement('.popup-modal__button fn-close')
                    .click('.popup-modal__button fn-close')
                    .isElementPresent('.popup-modal__button_type_accept', function (present) {
                        if (present) {
                            document.querySelector('.popup-modal__button_type_accept').click();
                        }
                    })*/
                    .waitForElement('.fn-popup-content')
                    .click('.fn-close')
                    .end(done);
            });

            task.step('Check balance', function (done) {
                task.ui
                    .waitForElement('.val_type_user_balance', 5000)
                    .chain(function () {
                        var currentBalanceString;
                        currentBalanceString = document.querySelector('.val_type_user_balance').textContent;
                        currentBalanceString = parseFloat(currentBalanceString.substring(currentBalanceString.indexOf(' ') + 1).replace(',', ''));
                        currentBalance = parseInt(currentBalanceString, 10);
                        if (currentBalance >= prevBalance) {
                            done('Balance was not updated');
                        }
                    })
                    .end(done);
            });

            task.step('Remember account last 4 digits', function (done) {
                task.ui
                    .waitForElement('.fn-change-account')
                    .chain(function () {
                        last4Digits = document.querySelector('.fn-change-account option[selected="selected"]').textContent.substring(1, 5);
                        if (last4Digits.length === 4) {
                            done();
                        } else {
                            done('Can not remember last 4 digits');
                        }
                    })
                    .end(done);
            });

            task.step('Open pending withdrawals', function (done) {
                if (isTablet || isMobile) {
                    task.ui
                        .waitForElement('.fn-open-menu', 5000)
                        .click('.fn-open-menu')
                        .waitForElement('.fn-menu-list a[href="/pending-withdraw"]')
                        .click('.fn-menu-list a[href="/pending-withdraw"]')
                        .end(done);
                } else {
                    task.ui
                        .waitForElement('a[href="/pending-withdraw"].menu__secondlevel-link', 30000)
                        .click('a[href="/pending-withdraw"].menu__secondlevel-link')
                        .isElementPresent('.portlet-title-text', function (isElementPresent) {
                            if (!isElementPresent) {
                                done('No deposit portlet');
                            }
                        })
                        .end(done);
                }
            });

            task.step('Check total sum of pending withdrawal', function (done) {
                task.ui
                    .waitForElement('.fn-pending-withdraw-sum')
                    .chain(function () {
                        var newTotalSumPendingWithString = document.querySelector('.fn-pending-withdraw-sum')
                            .textContent
                        newTotalSumPendingWith = parseFloat(newTotalSumPendingWithString.substring(newTotalSumPendingWithString.indexOf(' ') + 1).replace(',', ''));
                        if (totalSumPendingWith + parseInt(config.amount, 10) != newTotalSumPendingWith)
                            done('Total sum  was not updated right', newTotalSumPendingWith);
                    })
                    .end(done);
            });

            task.step('Check total number of Pending withdrawal', function (done) {
                task.ui
                    .waitForElement('li.info-list__row span.fn-accordion-target')
                    .chain(function () {
                        newTotalNumberPendingWith = document.querySelectorAll('li.info-list__row span.fn-accordion-target').length;
                        if (newTotalNumberPendingWith != totalNumberPendingWith + 1)
                            done('Total number was not updated right');
                    })
                    .end(done);
            });

            task.step('Check currency sign', function (done) {
                task.ui
                    .waitForElement('.fn-main-header-user-balance')
                    .chain(function () {
                        withdrawSum = document.querySelector('.fn-pending-withdraw-sum')
                            .textContent.substring(0, 1);
                        balanceSum = document.querySelector('.fn-pending-withdraw-sum')
                            .textContent.substring(0, 1);
                        if (balanceSum != withdrawSum) done('Currency sign is not the same');
                    })
                    .end(done);
            });

            task.step('Check the amount of the withdraw', function (done) {
                task.ui
                    .waitForElement('.fn-pending-withdraw-sum')
                    .chain(function () {
                        lastPendingAmountString = document.querySelector('.val_type_amount')
                            .textContent.substring(2);
                        lastPendingAmount = parseInt(lastPendingAmountString, 10);
                        var configInt = parseInt(config.amount, 10)
                        if (lastPendingAmount != config.amount) {
                            done('Amount in s not right');
                        }
                    })
                    .end(done);
            });

            task.step('Expand newest withdrawal entry', function (done) {
                task.ui
                    .waitForElement('.fn-pending-withdraw-sum')
                    .click('.info-list__field ')
                    .end(done);
            });

            task.step('Check Success button presence', function (done) {
                task.ui
                    .isElementVisible('.btn_type_success', function (isElementVisible) {
                        if (!isElementVisible) done('The newest withdrawal entry is not expanded');
                    })
                    .end(done);
            });

            task.step('Check code', function (done) {
                task.ui
                    .chain(function () {
                        var code;
                        code = parseInt(document.querySelector('.info-list__row > ul li:nth-child(3)')
                            .textContent.substring(4, 11))
                        if (code <= 0) {
                            done('Code is not right');
                        }
                    })
                    .end(done);
            });

            task.step('Check 4 digits', function (done) {
                task.ui
                    .chain(function () {
                        current4Digits = document.querySelector('.info-list__row > ul li:nth-child(1)').textContent.substring(8, 12)
                        if (last4Digits != current4Digits) {
                            done('4 digits is not right');
                        }
                    })
                    .end(done);
            });

            task.step('Check method', function (done) {
                task.ui
                    .chain(function () {
                        methodName = document.querySelector('.info-list__row > ul li:nth-child(2)')
                            .textContent.substring(6, 10);
                        if (methodName != "VISA") done('Method is not right');
                    })
                    .end(done);
            });
            task.step('Close newest withdrawal entry', function (done) {
                task.ui
                    .waitForElement('.fn-pending-withdraw-sum')
                    .click('.info-list__field ')
                    .end(done);
            });

            task.step('Check Success button is not visible', function (done) {
                task.ui
                    .isElementVisible('.btn_type_success', function (isElementVisible) {
                        if (isElementVisible) done('The newest withdrawal entry is not closed');
                    }).end(done);
            });

        });
    };
});
