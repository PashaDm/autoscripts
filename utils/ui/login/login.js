define([], function() {
    // TODO: Export to JSON
    var username = 'krakentest';
    var password = 'Password1';
    return {
        login: function(task, done) {
            var acceptTC = false;
            var loginIsNeeded = false;
            task.ui
                .waitForElement('.main-header', 30000)
                .isElementPresent('.btn.fn-login', function(isPresent) {
                    if (isPresent) {
                        loginIsNeeded = true;
                    }
                })
                .chain(function () {
                    if (loginIsNeeded) {
                        task.ui
                            .click('.btn.fn-login')
                            .waitForElement('.login-form',1000)
                            .click('.fn-user-name')
                            .setValue('.fn-user-name', username)
                            .click('input[name="password"]')
                            .setValue('input[name="password"]', password)
                            .click('.fn-login-btn')
                            .pause(1000)
                            .isElementPresent('.fn-form-messages p.error', function(result) {
                                if (result) {
                                    done(document.querySelector('.fn-form-messages p.error').innerHTML);
                                }
                            })
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
                            //.click('.main-header__logo')
                    }
                })
                .end(done);
        }
    };
});