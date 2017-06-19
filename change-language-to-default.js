define(function() {
    var startLocation;
    var endLocation;
    var defaultLocaleItemSelector;
    var isLocationDefault = false;
    var isMobileOrTablet;
    var isDesktop;
    var acceptButton;
    var closeButton;
    var closePopup = function (task) {
        acceptButton = document.querySelector('.fn-accept');
        closeButton = document.querySelector('.fn-close');
        if (acceptButton) {
            task.ui
                .click('.fn-accept')
        } else if (closeButton) {
            task.ui
                .click('.fn-close')
        }
    };
    return function(task) {
        task('Change language to default', function(task){

            task.beforeAll(function(done) {
                task.ui
                    .waitForElement('.main-header', 30000)
                    .isElementPresent('.fn-popup-content', function(isPresent) {
                        if (isPresent) {
                            closePopup(task);
                        }
                    })
                    .end(done);
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
                isMobileOrTablet = !!((document.querySelector('html.tablet') || document.querySelector('html.mobile')));
                isDesktop = !!(document.querySelector('html.desktop'));
                var mobileLocation = (location.pathname === '/');
                var desktopLocation = (location.pathname === '/');
                task.ui
                    .waitForElement('.main-header', 5000)
                    .chain(function(){
                        if ((isMobileOrTablet && mobileLocation) || (isDesktop && desktopLocation)) {
                            isLocationDefault = true;
                        }
                        startLocation = location.href;
                        defaultLocaleItemSelector = '.fn-change-language[data-lang="' + Playtech.Variables.defaultLocale + '"]';
                        console.log('defaultLocaleItemSelector', defaultLocaleItemSelector);
                        //defaultLocaleItemSelector = '[data-lang="' + Playtech.Variables.defaultLocale;
                    })
                    .end(done);
            });

            task.step('Change language', function(done) {
                if (!isLocationDefault){
                    if (isMobileOrTablet) {
                        task.ui
                            .waitForElement('.fn-open-menu', 5000)
                            .click('.fn-open-menu')
                            // .waitForElement('.fn-menu-list a[href="/change-language"]', 5000)
                            // .click('.fn-menu-list a[href="/change-language"]')
                            .waitForElement('.micon-language', 5000)
                            .click('.micon-language')
                            .waitForElement(defaultLocaleItemSelector, 10000)
                            .click(defaultLocaleItemSelector)
                            .pause(1000)
                            .end(done)
                    } else {
                        task.ui
                            .waitForElement('.fn-language-selector', 5000)
                            .click('.fn-language-selector')
                            .waitForElement(defaultLocaleItemSelector, 7000)
                            .click(defaultLocaleItemSelector)
                            .pause(1000)
                            .end(done)
                    }
                } else {
                    done()
                }
            });
            /*task.step('Open home page', function(done) {
                task.ui
                    .click('.main-header__logo')
                    .pause(200)
                    .end(done);
            });*/

            task.step('Check if Language was changes', function(done) {
                 if (!isLocationDefault){
                   task.ui
                     endLocation = location.href;
                     console.log('endLocation', endLocation);
                    if (endLocation !== startLocation)
                        done();
                    else
                        done("Locale was not changed")
                 } else {
                    done();
                 }
            });

        });
    };
});
