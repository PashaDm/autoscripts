define(function () {
    return function (task) {

        task('Banner is displayed for GUEST', function (task) {
    task.step('Checking that banner is displayed for GUEST on Casino', function (done) {
                task.ui
				        .waitForElement('a[href="/casino"]')
                        .click('a[href="/casino"]')
						.waitForElement('.portlet-banners', 3000)
						.isElementPresent('.portlet-banners', function (isPresent) {
							if(!isPresent){
                             done('No banner on Casino page');
						}
                    })
                    .end(done);
            });

    task.step('Checking that banner is displayed for GUEST on Poker', function (done) {
                task.ui
				        .waitForElement('a[href="/poker"]')
                        .click('a[href="/poker"]')
						.waitForElement('.portlet-banners', 3000)
						.isElementPresent('.portlet-banners', function (isPresent) {
							if(!isPresent){
                             done('No banner on Poker page');
						}
                    })
                    .end(done);
            });
						
           task.step('Checking that navigation arrows are displayed for GUEST on Livecasino', function (done) {
                task.ui		
                        .waitForElement('a[href="/livecasino"]')
                        .click('a[href="/livecasino"]')
                        .waitForElement('.fn-goto-next', 3000)
						.isElementPresent('.fn-goto-next', function (isPresent) {
                           if(!isPresent){
                             done('No pagination on Livecasino page');
						  }
                    })
                    .end(done);
            });
           task.step('Checking that banners are changing after click on arrow', function (done) {
		   
			   function checkActiveBanner() {
				   return $('.portlet-banners .fn-paging-pages').css('transform');
			   };
			    window.indexPrev = checkActiveBanner();
                task.ui		
                        .waitForElement('.fn-goto-next', 1000)
                        .click('.fn-goto-next')
						.pause(1000)
						.isElementPresent('.portlet-banners', function (isPresent) {
							var indexNext = checkActiveBanner();
                           if (indexPrev === indexNext){
                             done('No pagination on page');
						  }
                    })
                    .end(done);
            });
        });
    };
});




