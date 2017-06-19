define([], function () {
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
    var visaGenerator = function () {
        function revertString(str) {
            if (!str) return '';
            var revstr = '';
            for (i = str.length - 1; i >= 0; i--)
                revstr += str.charAt(i)
            return revstr;
        }

        function completed_number() {
            var ccnumber = '4556';
            while (ccnumber.length < (15)) {
                ccnumber += Math.floor(Math.random() * 10);
            }
            var reversedCCnumberString = revertString(ccnumber);
            var reversedCCnumber = new Array();
            for (var i = 0; i < reversedCCnumberString.length; i++) {
                reversedCCnumber[i] = parseInt(reversedCCnumberString.charAt(i));
            }
            var sum = 0;
            var pos = 0;
            while (pos < 15) {
                odd = reversedCCnumber[pos] * 2;
                if (odd > 9) {
                    odd -= 9;
                }
                sum += odd;
                if (pos != (14)) {
                    sum += reversedCCnumber[pos + 1];
                }
                pos += 2;
            }
            var checkdigit = (( Math.floor(sum / 10) + 1) * 10 - sum) % 10;
            ccnumber += checkdigit;
            return ccnumber;
        }

        return completed_number();
    };
    return function (task) {
        var config = task.getConfig('meta-data/login');

        task('Add card', function (task) {

            task.beforeAll(function (done) {
                loginHelper.login(task, done);
            });

            task.afterAll(function (done) {
                task.ui
                    .click('.main-header__logo')
                    .end(done);
            });

            /*task.step('Open deposit page', function (done) {
                task.ui
                    .isElementPresent('.fn-open-menu', function (isPresent) {
                        if (isPresent) {
                            task.ui
                                .click('.fn-open-menu')
                                .waitForElement('li[data-url="/payment/deposit"] a')
                                .click('li[data-url="/payment/deposit"] a');
                        } else {
                            task.ui
                                .waitForElement('li[data-url="/payment/cashier"] a')
                                .click('li[data-url="/payment/cashier"] a');
                        }
                    })
                    .waitForElement('[data-portlet-type="mobile-cashier"]', 5000)
                    .end(done);
            }); */

            task.step('Open deposit page', function(done) {
               task.ui
                 .waitForElement('a[href="/payment/deposit"].menu__nav-link')
                 .click('a[href="/payment/deposit"].menu__nav-link')
                 .waitForElement('.portlet-title-text')
                 .isElementPresent('.portlet-title-text', function(isElementPresent) {
                    if (!isElementPresent) {
                           done('No deposit portlet.');
                    }
                       })
                       .end(done);
            });

            task.step('Open add card menu', function (done) {
                task.ui
                    .click('.fn-card-add')
                    .waitForElement('.form_name_cashier-add-card', 4000)
                    .end(done);
            });

            task.step('Filling add card form', function (done) {
                task.ui
                    .click('[name="cardNumber"]')
                    .setValue('[name="cardNumber"]', visaGenerator())
                    .setValue('[name="cvv2"]', 111)
                    .chain(function () {
                        var cardMonth = document.getElementsByName('month')[0];
                        cardMonth.options[1].selected = true;
                        $(cardMonth).trigger('change');

                        var cardYear = document.getElementsByName('expirationYear')[0];
                        cardYear.options[1].selected = true;
                        $(cardYear).trigger('change');
                    })
                    .click('[name="fillUserData"]')
                    .click('.fn-submit')
                    .end(done);
            });

            task.step('Check if card was added', function (done) {
                var popupText;
                task.ui
                    .waitForElement('.info__content', 5000)
                    .chain(function () {
                        popupText = document.querySelector('.info__content').textContent;
                        if (popupText !== "Card is added")
                            done(popupText)
                    })
                    .end(done);
            });

            task.step('AcceptSD', function (done) {
                   var acceptSD = false;
                   task.ui
                     .waitForElement('.fn-accept', 3000, function (isPresent) {
                         if (isPresent) {
                             acceptSD = true;
                         }
                         })
                         .chain(function () {
                           if (acceptSD) {
                                 task.ui
                                  .click('.fn-accept')
                            }

                           })
                           .end(done);
                        });

        });
    };
});
