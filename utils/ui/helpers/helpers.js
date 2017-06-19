define([], function () {
    // TODO: Export to JSON
    var username = 'alexptest40';
    var password = 'Password1';
    return {

        login: function (task, done) {
            var acceptTC = false;
            var loginIsNeeded = false;
            task.ui
                .waitForElement('.main-header', 30000)
                .isElementPresent('.btn.fn-login', function (isPresent) {
                    if (isPresent) {
                        loginIsNeeded = true;
                    }
                })
                .chain(function () {
                    if (loginIsNeeded) {
                        task.ui
                            .click('.btn.fn-login')
                            .waitForElement('.login-form', 1000)
                            .click('.fn-user-name')
                            .setValue('.fn-user-name', username)
                            .click('input[name="password"]')
                            .setValue('input[name="password"]', password)
                            .click('.fn-login-btn')
                            .pause(1000)
                            .isElementPresent('.fn-form-messages p.error', function (result) {
                                if (result) {
                                    done(document.querySelector('.fn-form-messages p.error').innerHTML);
                                }
                            })
                            .waitForElement('.fn-accept', 3000, function (isPresent) {
                                if (isPresent) {
                                    acceptTC = true;
                                }
                            })
                            .chain(function () {
                                if (acceptTC) {
                                    task.ui
                                        .click('.fn-accept')
                                }
                            })
                            .click('.main-header__logo')
                    }
                })
                .end(done);
        },

        logout: function (task, done) {
            var logoutIsNeeded = false;
            task.ui
                .waitForElement('.main-header', 30000)
                .isElementPresent('button.fn-logout', function (isPresent) {
                    if (isPresent) {
                        logoutIsNeeded = true;
                    }
                })
                .chain(function () {
                    if (logoutIsNeeded) {
                        task.ui
                            .click('.main-header__logo')
                            .click('button.fn-logout')
                            .waitForElement('.fn-popup-content', 2000)
                            .click('button.fn-logout')
                            .waitForElement('.fn-popup-content', 2000)
                            .click('.popup-modal__buttons .fn-accept')
                            .pause(1000)
                            .isElementPresent('.fn-popup-content', function (present) {
                                if (!present) {
                                    done('No logout confirm message');
                                }
                            })
                            .isElementPresent('.popup-modal__buttons .fn-close', function (present) {
                                if (!present) {
                                    done('Logout confirm message has no OK button');
                                }
                            })
                            .click('.popup-modal__buttons .fn-close')
                            .isElementPresent('.fn-main-header-user-balance', function (present) {
                                if (present) {
                                    done('User is not logged out');
                                }
                            })
                            .click('.main-header__logo')
                    }
                })
                .end(done);
        },

        register: function (task, done) {
            var registrationIsNeeded = false;
            task.ui
                .click('.main-header__logo')
                .waitForElement('.btn_action_login', 1000, function (isPresent) {
                    if (isPresent) {
                        registrationIsNeeded = true;
                    }
                })
                .chain(function() {
                    if (registrationIsNeeded) {
                        task.ui
                            .click('.btn_action_login')
                            .waitForElement('.fn-login', 5000)
                            .click('.join-now a')
                            .waitForElement('[data-portlet-type="registration"]', 5000)
                            .setValue('[name="title"]', 'Mr')
                            .click('[name="firstname"]')
                            .setValue('[name="firstname"]', 'Firstname')
                            .click('[name="lastname"]')
                            .setValue('[name="lastname"]', 'Lastname')
                            .setValue('#day', '01')
                            .setValue('#month', '01')
                            .setValue('#year', '1998')
                            .setValue('[name="sex"]', 'M')
                            .click('[name="email"]')
                            .setValue('[name="email"]', 'test@playtech.com')
                            // .click(confirmEmailSelector)
                            .setValue('[name="emailVerify"]', 'test@playtech.com')
                            .isElementPresent('.fn-next', function(isPresent) {
                                if (isPresent) {
                                    task.ui
                                        .click('.fn-next')
                                }
                            })
                            .setValue('[name="countrycode"]', 'AT')
                            .waitForElement('[name="state"]')
                            .click('[name="state"]')
                            .setValue("[name='state']", 'State')
                            .click('[name="city"]')
                            .setValue('[name="city"]', 'City')
                            .click('[name="address"]')
                            .setValue('[name="address"]', 'Address 13')
                            .click('[name="zip"]')
                            .setValue('[name="zip"]', '10000')
                            .setValue('[name="cellphone"]', '1234567890')
                            .isElementPresent('.fn-next', function(isPresent) {
                                if (isPresent) {
                                    task.ui
                                        .click('.fn-next')
                                }
                            })
                            .waitForElement('[name="userName"]')
                            .click('[name="userName"]')
                            .setRandomValue('[name="userName"]', '[a-zA-Z0-9]{6,10}')
                            .click('[name="password"]')
                            .setValue('[name="password"]', 'Password1')
                            .click('[name="passwordVerify"]')
                            .setValue('[name="passwordVerify"]', 'Password1')
                            .click('[name="verificationQuestion"]')
                            .setValue('[name="verificationQuestion"]', 'question')
                            .click('[name="verificationAnswer"]')
                            .setValue('[name="verificationAnswer"]', 'answer')
                            .isElementPresent('#daydepositlimit', function (isPresent) {
                                if (isPresent) {
                                    task.ui
                                        .setValue('#daydepositlimit', '500')
                                }
                            })
                            .isElementPresent('#daydepositlimit', function (isPresent) {
                                if (isPresent) {
                                    task.ui
                                        .setValue('#weekdepositlimit', '500')
                                }
                            })
                            .isElementPresent('#daydepositlimit', function (isPresent) {
                                if (isPresent) {
                                    task.ui
                                        .setValue('#monthdepositlimit', '500')
                                }
                            })
                            .click('#terms-checkbox')
                            .click('.btn_type_success')
                            .waitForElement('.fn-accept', 3000, function (isPresent) {
                                if (isPresent) {
                                    task.ui
                                        .click('.fn-accept')
                                }
                            })
                            .click('.main-header__logo')
                            .waitForElement('.micon-header-user-balance', 5000)
                    }
                })
                .end(done);
        }

    };
});