define(function(){
  //These variables will be inicialized after game launch (in 'Spin via swipe event' test):
    var gameFrame,
    gameDocument,
    gameMenuButton,
    gameCanvas,
    gameCanvasDocument,
    canvasElement;

  //This Function is a simulator of touch event:
    function touchEvent(event, element, x, y){
    var ratio = window.devicePixelRatio||1;
    var evt = new TouchEvent(event,{
      type:event,
      altKey:false,
      bubbles:true,
      cancelBubble:false,
      cancelable:true,
      ctrlKey:false,
      currentTarget:null,
      sourceCapabilities:new InputDeviceCapabilities(),
      defaultPrevented:true,
      detail:0,
      eventPhase:0,
      isTrusted:false,
      isTrusted:false,
      metaKey:false,
      returnValue:false,
      shiftKey:false,
      srcElement:element,
      target:element,
      view:window,
      which:0,
      changedTouches:[new Touch({
       clientX:x,
       clientY:y,
       force:1,
       identifier:0,
       pageX:x,
       pageY:y,
       radiusX:31.046119689941406,
       radiusY:31.046119689941406,
       rotationAngle:0,
       screenX:x/ratio,
       screenY:y/ratio,
       target:element
      })],
      touches:[new Touch({
       clientX:x,
       clientY:y,
       force:1,
       identifier:0,
       pageX:x,
       pageY:y,
       radiusX:31.046119689941406,
       radiusY:31.046119689941406,
       rotationAngle:0,
       screenX:x/ratio,
       screenY:y/ratio,
       target:element
      })],
      targetTouches:[new Touch({
       clientX:x,
       clientY:y,
       force:1,
       identifier:0,
       pageX:x,
       pageY:y,
       radiusX:31.046119689941406,
       radiusY:31.046119689941406,
       rotationAngle:0,
       screenX:x/ratio,
       screenY:y/ratio,
       target:element
      })]

     });
    element.dispatchEvent(evt);

    }

    return function(task, config){

      task ('Demo play -> Real play', function(task){
        task.beforeAll (function (done){
          task.ui
                .waitForElement('.main-header__logo') //wait when portal will be opened
                .end(done)
        });

      task.step('Log in if user is already not logged in', function(done){
        task.ui
        .isElementPresent('.fn-main-header-user-balance', function(present){
          if(!present){
            task.ui
            .click('.fn-login')
            .waitForElement('.fn-user-name')
            .setValue('.fn-user-name', 'userme1')
            .click('input[name="password"]')
            .setValue('input[name="password"]', 'Password2')
            .click('.fn-login-btn')
            .waitForElement('.popup-modal__button')
            .click('.popup-modal__button')
            .pause(300)
            .waitForElement('.popup-modal__button')
            .click('.fn-close')
            .pause(300)
          }
        })
          .end(done)
      });

      task.step('Check login status in header', function(done) {
          task.ui
              // .waitForElement('.fn-main-header-user-balance', 5000)
              .isElementPresent('.fn-main-header-user-balance', function(present){
                if(present){
                  done()
                }else{
                  done('User is not logged in')
                }
              })
              .end(done);
      });

      task.step('Open game pop up.', function(done){
        task.ui
             .click('[data-game-code="whk"]')
             .isElementPresent('.fn-launch-game', function(present){
               if (present){
                 done();
               }
               else{
                 done('Necessary popup is not opened')
               }
             })
      });

      task.step('Launch Real play', function(done){

        task.ui
            .click('.fn-launch-game')
            .waitForElement('.game-iframe')
            .isElementPresent('.game-iframe', function(present){
              if (!present){
                done('Demo game is not launched');
              }
              else{
                done();
              }
            })
      });

      task.step('Get balance', function(done) {
          task.ui
              .pause(4000)
              .waitForElement('.fn-game-iframe')
              .frame('.fn-game-iframe')
              .waitForElement('.playerBalanceGood')
              .getText('.playerBalanceGood', function(text) {
                  balance = text;
                  console.log(balance);
              })

              .backToParent()
              .end(done);
      });

       task.step('Spin via swipe event', function(done){
         //we initialize all necessary global variables here due to they can be initialized only after game is launched:
         gameFrame = document.getElementsByClassName("game-iframe")[0], //===>Get game Iframe element by class
         gameDocument = gameFrame.contentWindow.document,               //===>Get document object of iframe element
         gameMenuButton = gameDocument.getElementById("mainMenuButton"),//===>Using iframe document object, via selectors, finding main menu button
         lobbyButton = gameDocument.getElementById("lobby"),            //===>Using iframe document object, via selectors, finding "go to lobby" button
         gameCanvas = gameDocument.getElementById("gameFrame"),         //===>In game document, finding iframe with game canvas
         gameCanvasDocument = gameCanvas.contentWindow.document,        //===>Getting document object of iframe
         canvasElement = gameCanvasDocument.getElementsByTagName("canvas")[0], //===>Using found document object, getting game canvas
         canvasWidth = canvasElement.getAttribute('width')              //canvas width
         canvasHeight = canvasElement.getAttribute('height')            //canvas height
         depositButton = gameDocument.getElementById('deposit');


         //Simulating swipe gesture from top to bottm(over game canvas):
         if(canvasWidth == '1024' && canvasHeight == '768'){
           touchEvent("touchstart",canvasElement,526,357);//finger press
           touchEvent("touchmove",canvasElement,483,449);//finger move
           touchEvent("touchend",canvasElement,511,462);//finger release
         } else {
         touchEvent("touchstart",canvasElement,500,150); //finger press
         touchEvent("touchmove",canvasElement,500,175); //finger move
         touchEvent("touchmove",canvasElement,520,238); //finger move
         touchEvent("touchend",canvasElement,500,200); //finger release
         }
         task.ui
         .pause(3000)
         .end(done)

       });

       task.step('Second swipe event', function(done){
         //Simulating swipe gesture from top to bottm(over game canvas):
         if(canvasWidth == '1024' && canvasHeight == '768'){
           touchEvent("touchstart",canvasElement,526,357);
           touchEvent("touchmove",canvasElement,483,449);
           touchEvent("touchend",canvasElement,511,462);
         } else {
         touchEvent("touchstart",canvasElement,500,150); //finger press
         touchEvent("touchmove",canvasElement,500,175); //finger move
         touchEvent("touchmove",canvasElement,520,238); //finger move
         touchEvent("touchend",canvasElement,500,200); //finger release
         }
         task.ui
         .pause(3000)
         .end(done)
       });


       task.step('Get new balance', function(done) {
           task.ui
               .waitForElement('.fn-game-iframe')
               .frame('.fn-game-iframe')
               .waitForElement('.playerBalanceGood')
               .getText('.playerBalanceGood', function(text) {
                   newBalance = text;
                   console.log(newBalance);
               })
               .backToParent()
               .end(done);
       });

       task.step('Compare balances', function(done){
         if (newBalance === balance){
           done('Balance is not updated')
         } else{
           done();
         }
       });

       task.step('Open deposit page', function(done){
         touchEvent("touchstart",gameMenuButton,150,50); //this event only hides 'sound' popup
         touchEvent("touchend",gameMenuButton,150,50); //this event only hides 'sound' popup
         touchEvent("touchstart",gameMenuButton,50,50); //start simulate touch on game menu icon
         touchEvent("touchend",gameMenuButton,50,50); //end simulate touch on game main menu
         setTimeout(function(){
           depositButton = gameDocument.getElementById('deposit');
           touchEvent("touchstart",depositButton,50,50); //start simulate touch on lobby item
           touchEvent("touchend",depositButton,50,50); //end simulate touch on lobby item
           task.ui
           .pause(1000)
           .isElementVisible('.fn-back-button', function(present){
             if(!present){
               done('User is not redirected to deposit page')
             }
           })
           .end(done);
         }.bind(this),1000);
       });

       task.step('Return to the game', function(done){
         task.ui
         .waitForElement('.fn-back-button', 3000)
         .click('.fn-back-button')
         .pause(1000)
         .frame('.fn-game-iframe')
         .isElementPresent('#mainMenuButton', function(present){
           if(!present){
             done('User is not returned to the game.')
           }else{
             done()
           }
          // console.log('')
         })
         .end(done)
       });


       task.step('Open game menu - go to lobby', function(done){

         touchEvent("touchstart",gameMenuButton,150,50); //this event only hides 'sound' popup
         touchEvent("touchend",gameMenuButton,150,50); //this event only hides 'sound' popup
         touchEvent("touchstart",gameMenuButton,50,50); //start simulate touch on game menu icon
         touchEvent("touchend",gameMenuButton,50,50); //end simulate touch on game main menu
         setTimeout(function(){
           var lobbyButton = gameDocument.getElementById("lobby");
           touchEvent("touchstart",lobbyButton,50,50); //start simulate touch on lossbby item
           touchEvent("touchend",lobbyButton,50,50); //end simulate touch on lobby item
           task.ui
           .pause(1000)
           .click('.main-header__user')
           .pause(1000)
           .isElementPresent('.fn-open-menu', function(present){
             if(!present){
               done('User is not redirected to home page')
             }
           })
           .end(done);
         }.bind(this),1000);

       });


});
}
});
