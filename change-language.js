define(['./utils/ui/logout/logout'], function (logoutHelper) {
    var isLocationDefault = false;
    var defaultLanguageText;
    var changedLanguageText;
    var startLocation;
    var endLocation;
    var isMobileOrTablet;
    var isDesktop;
    var acceptButton;
    var closeButton;
    var defaultLanguageTranslation;
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
        var languageSelector = '.fn-change-language[data-lang="' + config.languageCode +'"]';
        task('Change language', function(task){

            task.beforeAll(function (done) {
                task.ui
                    .waitForElement('.main-header', 30000)
                    .isElementPresent('.fn-popup-content', function(isPresent) {
                        if (isPresent) {
                            closePopup(task);
                        }
                    })
                    logoutHelper.logout(task, done);
            });

            task.afterAll(function (done) {
                  task.ui
                  .isElementPresent('.fn-open-menu', function(isPresent){
                       if(isPresent) {
                         task.ui
                         .click('.fn-open-menu')
                         .waitForElement('li[data-url="/home"] a')
                         .click('li[data-url="/home"] a');
                       } else {
                          task.ui
                          .click('.main-header__logo')
                       }
                  })
                  .end(done);
            });

            task.step('Check if location is default', function(done) {
                isMobileOrTablet = (document.querySelector('html.tablet') || document.querySelector('html.mobile'));
                isDesktop = document.querySelector('html.desktop');
                var mobileLocation = (location.pathname === '/');
                var desktopLocation = (location.pathname === '/');
                task.ui
                    .isElementPresent('.btn.fn-login', function(isPresent){
                        if (!isPresent) {
                            done('This test checks text on login popup. Please logout before launch this test.')
                        }
                    })
                    .waitForElement('.main-header')
                    .isElementPresent('fn-popup', function(isPresent){
                        if (isPresent) {
                            closePopup(task);
                        }
                    })
                    .chain(function(){
                        if ((isMobileOrTablet && mobileLocation) || (isDesktop && desktopLocation)) {
                            isLocationDefault = true;
                        }
                        if (!isLocationDefault)
                            done('Add "Change language to default" before (and after) this test')
                    })
                    .end(done);
            });

            task.step('Remember location with default language', function(done) {
                startLocation = location.href;
                done();
            });

            task.step('Remember text on default language', function(done) {
                task.ui
                    /*.getText('.gamesinfo__nav-wrapper li:nth-child(1) span', function(text) {
                        defaultLanguageTranslation = text;
                    })*/
                    .waitForElement('.btn.fn-login', 5000)
                    .click('.btn.fn-login')
                    .waitForElement('.login-form', 2000)
                    .getText(config.elementSelector, function(text){
                        defaultLanguageText = text;
                    })
                    .click('.fn-close')
                    .end(done);
            });

            task.step('Change language', function(done) {
                if (isMobileOrTablet) {
                    task.ui
                        .waitForElement('.fn-open-menu', 5000)
                        .click('.fn-open-menu')
                        .waitForElement('.micon-language', 5000)
                        .click('.micon-language')
                        .waitForElement(languageSelector, 5000)
                        .click(languageSelector)
                        .pause(500)
                        .end(done)
                } else {
                    // desktop
                    task.ui
                        .waitForElement('.fn-language-selector', 5000)
                        .click('.fn-language-selector')
                        .waitForElement(languageSelector, 5000)
                        .click(languageSelector)
                        .pause(500)
                        .end(done)
                }
            });

            task.step('Check if language was changed', function(done) {
                task.ui
                    //.click('.main-header__logo')
                    .pause(2000)
                    .chain(function(){
                        endLocation = location.href;
                        if (startLocation === endLocation) {
                            done('Language was not changes')
                        }
                    })
                    /*.getText('.gamesinfo__nav-wrapper li:nth-child(1) span', function(text) {
                        if (text === defaultLanguageTranslation) {
                            done('Translation text is the same');
                        }
                    })*/
                     .waitForElement('.btn.fn-login', 5000)
                     .click('.btn.fn-login')
                     .waitForElement('.login-form', 2000)
                     .getText(config.elementSelector, function(text){
                         changedLanguageText = text;
                         if (changedLanguageText === defaultLanguageText){
                            done('Language was changed but text is the same. Check translations')
                        }
                     })
                     .click('.fn-close')
                    .end(done);
            });

        });
    };
});
