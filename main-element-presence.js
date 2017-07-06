/*
 - Logo is present in header on all pages - DONE
 - Logo is present on preloader - Cannot be automated
 - Logo is present on login and registration (Done)
 - Chat and logout icons are present for logged in users (Done)

-Add precondition logout -
-Check on Mobile/Tablet -
 */


define(function () {
    return function (task) {

        task('Logo is displayed for GUEST', function (task) {


            task.step('Checking that Logo is displayed for GUEST on Casino', function (done) {
                task.ui
                    .waitForElement('a[href="/casino"]')
                    .click('a[href="/casino"]')
                    .waitForElement('.main-header__logo', 3000)
                    .isElementPresent('.main-header__logo', function (isPresent) {
                        if (!isPresent) {
                            done('No LOGO on Casino page');
                        } else {
                            var logoImageDisplayed = document.querySelector('.main-header__logo').style.backgroundImage === 'url("/library/winner-logo.png")';
                            if (!logoImageDisplayed) {
                                done('Logo image is not displayed on Casino');
                            }
                        }
                    })
                    .end(done);
            });
            task.step('Checking that Logo is displayed for GUEST on Slots', function (done) {
                task.ui
                    .waitForElement('a[href="/slots"]')
                    .click('a[href="/slots"]')
                    .waitForElement('.main-header__logo', 3000)
                    .isElementPresent('.main-header__logo', function (isPresent) {
                        if (!isPresent) {
                            done('No LOGO on Slots page');
                        } else {
                            var logoImageDisplayed = document.querySelector('.main-header__logo').style.backgroundImage === 'url("/library/winner-logo.png")';
                            if (!logoImageDisplayed) {
                                done('Logo image is not displayed on Slots');
                            }
                        }
                    })
                    .end(done);
            });
            task.step('Checking that Logo is displayed for GUEST on Livecasino', function (done) {
                task.ui
                    .waitForElement('a[href="/livecasino"]')
                    .click('a[href="/livecasino"]')
                    .waitForElement('.main-header__logo', 3000)
                    .isElementPresent('.main-header__logo', function (isPresent) {
                        if (!isPresent) {
                            done('No LOGO on Livecasino page');
                        } else {
                            var logoImageDisplayed = document.querySelector('.main-header__logo').style.backgroundImage === 'url("/library/winner-logo.png")';
                            if (!logoImageDisplayed) {
                                done('Logo image is not displayed on Slots');
                            }
                        }
                    })
                    .end(done);
            });
            task.step('Checking that Logo is displayed for GUEST on Games', function (done) {
                task.ui
                    .waitForElement('a[href="/games"]')
                    .click('a[href="/games"]')
                    .waitForElement('.main-header__logo', 3000)
                    .isElementPresent('.main-header__logo', function (isPresent) {
                        if (!isPresent) {
                            done('No LOGO on Games page');
                        } else {
                            var logoImageDisplayed = document.querySelector('.main-header__logo').style.backgroundImage === 'url("/library/winner-logo.png")';
                            if (!logoImageDisplayed) {
                                done('Logo image is not displayed on Games');
                            }
                        }
                    })
                    .end(done);
            });
            task.step('Checking that Logo is displayed for GUEST on Vegas', function (done) {
                task.ui
                    .waitForElement('a[href="/vegas"]')
                    .click('a[href="/vegas"]')
                    .waitForElement('.main-header__logo', 3000)
                    .isElementPresent('.main-header__logo', function (isPresent) {
                        if (!isPresent) {
                            done('No LOGO on Vegas page');
                        } else {
                            var logoImageDisplayed = document.querySelector('.main-header__logo').style.backgroundImage === 'url("/library/winner-logo.png")';
                            if (!logoImageDisplayed) {
                                done('Logo image is not displayed on Vegas');
                            }
                        }
                    })
                    .end(done);
            });
            task.step('Checking that Logo is displayed for GUEST on Poker', function (done) {
                task.ui
                    .waitForElement('a[href="/poker"]')
                    .click('a[href="/poker"]')
                    .waitForElement('.main-header__logo', 3000)
                    .isElementPresent('.main-header__logo', function (isPresent) {
                        if (!isPresent) {
                            done('No LOGO on Poker page');
                        } else {
                            var logoImageDisplayed = document.querySelector('.main-header__logo').style.backgroundImage === 'url("/library/winner-logo.png")';
                            if (!logoImageDisplayed) {
                                done('Logo image is not displayed on Poker');
                            }
                        }
                    })
                    .end(done);
            });

            task.step('Logo is present on Registration forms', function (done) {
                task.ui
                    .click('a[href="/register"]')
                    .waitForElement('.aff-banner-wrap', 1000)
                    .isElementPresent('img[src="/library/winner-logo.png"]', function (isPresent) {
                        if (!isPresent) {
                            done('No LOGO on Registration page');
                        }
                    })
                    .click('.fn-close')
                    .end(done);
            });

            task.step('Logo is present on Login', function (done) {
                task.ui
                    .click('.fn-login')
                    .waitForElement('.login-form', 5000)
                    .isElementPresent('img[src="/library/winner-logo.png"]', function (isPresent) {
                        if (!isPresent) {
                            done('No LOGO on Login');

                        }
                    })
                    .end(done);
            });


            task.step('Submit form', function(done) {
                var userName = 'partizan8';
                var password = 'Password1';
                    task.ui
                    .click('.fn-user-name')
                    .setValue('.fn-user-name', userName)
                    .click('input[name="password"]')
                    .setValue('input[name="password"]', password)
                    .click('.fn-login-btn')
                    .pause(2000)
                    .isElementPresent('.fn-form-messages p.error', function(result) {
                        if (result) {
                            done(document.querySelector('.fn-form-messages p.error').innerHTML);
                        }
                    })
                    .end(done);
            });

            /*task.step('Accept T&C', function (done) {
                var acceptTC = false;
                task.ui
                    .waitForElement('.fn-accept', 3000, function(isPresent) {
                        if(isPresent) {
                            acceptTC = true;
                        }
                    })
                    .chain(function(){
                        if (acceptTC) {
                            task.ui
                                .click('.fn-accept');
                        }
                    })
                    .end(done);
            });*/


            task.step('Check login status in header', function(done) {
                task.ui
                    .waitForElement('.fn-main-header-user-balance', 3000)
                    .end(done);
            });


            task.step('Check Chat in header', function(done) {
                task.ui
                    .waitForElement('.fn-chat-icon', 3000)
                    .isElementPresent('.fn-chat-icon', function (isPresent) {
                        if (!isPresent) {
                            done('No Chat in header');

                        }
                    })

                    .end(done);
            });

            task.step('Check LOGOUT in header', function(done) {
                task.ui
                    .waitForElement('.fn-logout', 3000)
                    .isElementPresent('.fn-logout', function (isPresent) {
                        if (!isPresent) {
                            done('No Logout in header');

                        }
                    })

                    .end(done);
            });


        });
    };
});


