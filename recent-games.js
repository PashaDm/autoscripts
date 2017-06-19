define(function () {
    return function(task) {
        task('Check that recent games are received', function(task) {
            task.step('Go to page with games portlet', function(done) {
                task.ui
                    //.click('.fn-menu-nav-item a[href="/get-recent-games"]')
                    .waitForElement('[data-portlet-type="games-info"]')
                    .end(done);
            });
            task.step('Launch game', function(done) {
                task.ui
                    .click('.fn-game-item:nth-of-type(1)')
                    .waitForElement('.fn-popup-container .fn-popup-content')
                    .click('.popup-modal__type__play.fn-launch-game')
                    .pause(500)
                    .chain(function() {
                        window.history.back();
                    })
                    .waitForElement('.fn-menu-nav-item')
                    .end(done);
            });
            task.step('Reload page', function(done) {
                task.ui
                    .click('.fn-menu-nav-item a[href="/reload_page"]')
                    .waitForElement('[data-portlet-type="56"]')
                    .click('.fn-menu-nav-item a[href="/get-recent-games"]')
                    .waitForElement('[data-portlet-type="games-info"]')
                    .end(done);
            });
            task.step('Check that recent games are received and shown', function(done) {
                task.ui
                    .waitForElement('[data-portlet-type="games-info"]')
                    .click('[data-category="recentlyplayed"]')
                    .waitForElement('.fn-game-item')
                    .getAttribute('.fn-game-item:nth-of-type(1)', 'data-game-code', function(gameCode) {
                        if (gameCode === 'ba') {
                            done();
                        } else {
                            done('Wrong recently played game');
                        }
                    });
            });
        });
    };
});