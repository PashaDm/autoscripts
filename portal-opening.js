define(function () {
var startPathname;
var isMobileOrTablet;
var isDesktop;
var isIconPresent;
var firstLevelFirstPageContent;
var firstLevelSecondPageContent;
var secondLevelFirstPageContent;
var secondLevelSecondPageContent;
    return function (task) {
        task('Portal opening', function (task) {

            task.beforeAll(function(done) {
                task.ui
                    .waitForElement('.main-header', 30000)
                    //.click('.main-header__logo')
                    .end(done);
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

            task.step('Check header and page content', function (done) {
                task.ui
                    .waitForElement('.fn-header-container', 5000)
                    .waitForElement('.fn-page-content', 5000)
                    .end(done);
            });

            task.step('Check logo icon', function (done) {
                task.ui
                    .waitForElement('.common-logo', 5000)
                    .chain(function(){
                        isIconPresent = document.querySelector('.common-logo').naturalWidth !== 0;
                        if (!isIconPresent) {
                            done('Logo is not loaded')
                        }
                    })
                    .end(done);
            });

            task.step('Navigation: 1st level menu', function (done) {
                startPathname = location.pathname;
                isMobileOrTablet = !!(document.querySelector('html.tablet') || document.querySelector('html.mobile'));
                if (isMobileOrTablet) {
                    task.ui
                        .waitForElement('.fn-open-menu', 5000)
                        .click('.fn-open-menu')
                        .waitForElement('a[href="/responsible-gambling"]:not(.footer-link)')
                        .click('a[href="/responsible-gambling"]:not(.footer-link)')
                        .pause(1000)
                        .chain(function(){
                            firstLevelFirstPageContent = document.querySelector('#main-content');
                        })
                        .waitForElement('.fn-menu-list > ul >  li:not(.fn-accordion) + li a')
                        .click('.fn-menu-list > ul >  li:not(.fn-accordion) + li a')
                }
                else {
                    task.ui
                        .click('.menu__nav li+li+li+li a')
                        .pause(1000)
                        .chain(function(){
                            firstLevelFirstPageContent = document.querySelector('#main-content');
                        })
                        .click('.menu__nav li+li+li+li+li a');
                }

                task.ui
                    .pause(1000)
                    .chain(function(){
                        firstLevelSecondPageContent = document.querySelector('#main-content');
                        if (firstLevelFirstPageContent === firstLevelSecondPageContent) {
                            done ('Page content is not changed');
                        }/*
                        if (location.pathname == startPathname) {
                            done('URL was not changed');
                        }*/
                    })
                    .end(done)
            });

            task.step('Navigation 2nd level menu', function (done) {
                task.ui
                //    .click('.main-header__logo')
                //    .pause(200);
                startPathname = location.pathname;
                isDesktop = !!(document.querySelector('html.desktop'));
                secondLevelFirstPageContent = document.querySelector('#main-content');
                if (isDesktop) {
                    task.ui
                        .click('.fn-secondlevel-wrapper ul:nth-child(5) li:nth-child(3) a')
                        .pause(500)
                        .chain(function() {
                            if (location.pathname === startPathname) {
                                done('Page was not opened')
                            }
                            if (location.pathname == startPathname) {
                                done('URL was not changed');
                            }
                        })
                }
                else {
                    task.ui
                        .waitForElement('.fn-open-menu', 5000)
                        .click('.fn-open-menu')
                        .waitForElement('a[href="/casino/promotions"]:not(.footer-link)', 1000)
                        .click('a[href="/casino/promotions"]:not(.footer-link)')
                  }
                task.ui
                    .pause(500)
                    .chain(function(){
                        secondLevelFirstPageContent = document.querySelector('#main-content');
                        if (firstLevelFirstPageContent === secondLevelSecondPageContent) {
                            done ('Page content is not changed');
                        }
                        if (location.pathname == startPathname) {
                            done('URL was not changed');
                        }
                    })
                    .end(done)
            });

        });
    };
});
