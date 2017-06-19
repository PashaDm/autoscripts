define([], function () {
    return {
        logout: function (task, done) {
            var logoutIsNeeded = false;
            task.ui
                .waitForElement('.main-header', 30000)
                .isElementPresent('button.fn-logout', function(isPresent) {
                   if (isPresent) {
                     logoutIsNeeded = true;
                    }
                })
                .chain(function () {
                    console.log('logoutIsNeeded', logoutIsNeeded);
                    if (logoutIsNeeded) {
                        task.ui
                            /*.isElementPresent('.fn-open-menu', function(isPresent){
                            	if(isPresent){
                            	 task.ui
                            	    .waitForElement('.fn-open-menu',1000)
                            	    .click('.fn-open-menu')
                            	 }
                            })*/
                            .click('button.fn-logout')
                            .waitForElement('.fn-popup-content', 2000)
                            .click('.popup-modal__buttons .fn-decline')
                            .pause(500)
                            .isElementPresent('.fn-popup-content', function (isPresent) {
                                if (isPresent) {
                                    done('Logout popup can\'t be declined');
                                }
                            })
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
                            //.click('.main-header__logo')
                        }
                })
                .end(done);
        }
    };
});