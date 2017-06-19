define(function () {
    var jackpotCanvasEl;
    var jackportStartImg;
    var jackportEndImg;
    var casinoMenuItem;
    var isJackpotsCategoryPresent;
    var isJackpotCategoryPresent;
    return function (task) {
        task('Jackpot tickers', function (task) {

            /*task.beforeAll(function (done) {
                task.ui
                    .waitForElement('.main-header', 25000)
                    .click('.main-header__logo')
                    .end(done);
            });*/

            task.step('Open games portlet', function (done) {
                casinoMenuItem = !!(document.querySelector('[href="/casino"]'));
                if (casinoMenuItem) {
                    task.ui
                        .click('[href="/casino"]')
                        .waitForElement('.fn-games')
                        .end(done);
                }
                done();
            });

            task.step('Open Jackpots category if present', function (done) {
                isJackpotsCategoryPresent = !!(document.querySelector('[data-category="JACKPOT"]'));
                if (isJackpotsCategoryPresent) {
                    task.ui
                        .click('[data-category="JACKPOT"]')
                        .end(done);
                }
                isJackpotCategoryPresent = !!(document.querySelector('[data-category="Jackpots"]'));
                if (isJackpotsCategoryPresent) {
                    task.ui
                        .click('[data-category="Jackpots"]')
                        .end(done);
                }
                done();
            });

            task.step('Check if JP tickers are present', function (done) {
                task.ui
                    .waitForElement('.fn-game-jackpot canvas', 5000)
                    .end(done);
            });

            task.step('Ticking of jackpots', function (done) {
                jackpotCanvasEl = document.querySelector('.fn-game-jackpot canvas');
                task.ui
                    .chain(function () {
                        jackportStartImg = jackpotCanvasEl.toDataURL();
                    })
                    .pause(1000)
                    .chain(function () {
                        jackportEndImg = jackpotCanvasEl.toDataURL();
                        if (jackportEndImg == jackportStartImg) {
                            done("JP amount is not changing")
                        }
                    })
                    .end(done);
            });

        });
    };
});
