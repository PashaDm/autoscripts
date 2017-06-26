define(['./utils/ui/login/login'], function (loginHelper) {


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
          task('Chat window', function (task) {

          task.beforeAll(function (done) {
                          loginHelper.login(task, done);
          });

          task.step('Open Chat window', function(done) {
                task.ui
                 .waitForElement('.fn-chat-icon')
                 .click('.fn-chat-icon')
                 .end(done);
           });

            task.step('Check that chat window is opened', function(done) {
                    task.ui
                        .isElementPresent('.fn-close-chat', function(isPresent){
                           if(!isPresent){
                             done('Chat window icon is not present')
                           }
                        })
                        .isElementPresent('.chat-messages-wrapper', function(isPresent){
                           if(!isPresent){
                               done('Chat window icon is not present')
                           }
                        })
                         .end(done);
                });


            task.step('Chat message is sent', function(done) {
              var chatText = 'Hello';
              var sentChatText;
              task.ui
                .waitForElement('#chat-input-message')
                .setValue('#chat-input-message', chatText)
                .click('button[type="submit"]')
                .pause(2000)
                .chain(function() {
                  sentChatText = document.querySelector('.chat-u-mess-cont').innerHTML;
                  console.log('Sent text is', sentChatText);
                  if(sentChatText === chatText){
                     task.ui
                       .end(done);
                   } else {
                     task.ui
                       done('Chat message was not sent');
                   }
               })
              .end(done);
            });

            task.step('Close chat window', function(done) {
                    function checkChatStatus() {
                    	return $('.chat-window').css('display');
                    };
                    var startStatus = checkChatStatus();
                    var finishStatus;
                    task.ui
                            .click('.fn-close-chat')
                            .pause(3000)
                            .isElementPresent('.chat-messages-wrapper', function(isPresent){
                                      finishStatus = checkChatStatus();
                                      if(startStatus != finishStatus) {
                                          done();
                                      } else {
                                         done('Windown is present');
                                      }
                             })
                            .end(done);
                       });

     });
   };
});


