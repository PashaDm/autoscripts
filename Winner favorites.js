define(function () {
    return function(task) {
        task('Check that favorite games are received', function(task) {
            task.step('Go to page with games portlet', function(done) {
                task.ui
                    //.click('.fn-menu-nav-item a[href="/get-favorite-games"]')
                    .waitForElement('[data-portlet-type="games-info"]')
                    .end(done);
            });
            task.step('Add game to favorites', function(done) {
                task.ui
                    .click('.fn-favorites:nth-of-type(1)')
                    .waitForElement('.fn-favorites.active')
                    .end(done);
            });
            task.step('Reload page', function(done) {
                task.ui
                    //.click('.fn-menu-nav-item a[href="/page_reload"]')
                    //.waitForElement('[data-portlet-type="56"]')
                    //.click('.fn-menu-nav-item a[href="/get-favorite-games"]')
                    .waitForElement('[data-portlet-type="games-info"]')
                    .end(done);
            });

            task.step('Check that favorite game is received from backend and shown', function(done) {
                            task.ui
                                .click('[data-category="favorites"]')
                                .isElementPresent('.fn-favorites.active', function(isPresent) {
                                    if (!isPresent) {
                                        done('No favorites came from server');
                                    }
                                    else {
                                        done();
                                    }
                                })
                            .end(done);
                        });
                    });
                };
            });