define(['./utils/ui/login/login'], function (loginHelper) {
	var acceptButton;
	var closeButton;
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
	return function(task) {
		task('Logout', function(task) {

			task.beforeAll(function (done) {
				loginHelper.login(task, done);
			});

	        task.step('Check logout button', function(done) {
	        	task.ui
					.isElementPresent('button.fn-logout', function(isPresent) {
	        		if (!isPresent) {
	        			done('No logout button');
	        		}
	        	})
					.end(done);
	        });

	        task.step('Logout popup', function(done) {
	        	 task.ui
	        	      .isElementPresent('.fn-open-menu', function(isPresent){
	        	         if(isPresent){
	        	           task.ui
	        	           .waitForElement('.fn-open-menu',1000)
	        	          .click('.fn-open-menu')
	        	        }
	        	      })
				   .click('button.fn-logout')
	        		.waitForElement('.fn-popup-content',1000)
	        		.isElementPresent('.popup-modal__buttons .fn-decline', function(isPresent) {
						if (!isPresent) {
							done('No Cancel button on logout popup');
						}
	        	})
					.click('.popup-modal__buttons .fn-decline')
					.pause(500)
					.isElementPresent('.fn-popup-content', function(isPresent) {
						if (isPresent) {
							done('Logout popup cant be declined');
						}
					})
					.click('button.fn-logout')
					.waitForElement('.fn-popup-content',1000)
					.isElementPresent('.popup-modal__buttons .fn-accept', function(isPresent) {
						if (!isPresent) {
							done('No Ok button on logout popup');
						}
					})
					.click('.popup-modal__buttons .fn-accept')
					.pause(1000)
					.end(done);
	        });

	        task.step('Logout action', function(done) {
	        	task.ui
					.isElementPresent('.fn-popup-content', function(present) {
						if (!present) {
							done('No logout confirm message');
						}
					})
					.isElementPresent('.popup-modal__buttons .fn-close', function(present) {
						if (!present) {
							done('Logout confirm message has no OK button');
						}
					})
					.click('.popup-modal__buttons .fn-close')
					.isElementPresent('.fn-main-header-user-balance', function(present) {
						if (present) {
							done('User is not logged out');
						}
					})
					.end(done);
	        });

	    });
	};
});