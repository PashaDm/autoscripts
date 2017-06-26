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

        task.step('Log out if user is logged in', function(done){
          task.ui
          .isElementPresent('.val_type_user_balance', function(present){
            if(present){
              task.ui
              .click('.fn-open-menu')
              .waitForElement('.micon-logout')
              .click('.micon-logout')
              .pause(300)
              .waitForElement('.popup-modal__button_type_decline')
              .click('.popup-modal__button_type_decline')
              .waitForElement('.fn-popup-decline')
              .click('.fn-close')
              .pause(300)
            } else{
              done()
            }
          })
            .end(done)

        });

        task.step('Open game pop up', function(done){
          task.ui
               .click('[data-game-code="mcb"]')
               .isElementPresent('.popup-modal__type__demo', function(present){
                 if (present){
                   done();
                 }
                 else{
                   done('Necessary popup is not opened')
                 }
               })
        });

        task.step('Launch demo play', function(done){

          task.ui
              .click('.popup-modal__type__demo')
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

        task.step('Wait till game launched', function(done){
          task.ui
          .pause(7000)
          .waitForElement('canvas')
          .end(done)
        });


        task.step('Switch to real play button', function(done){
          gameFrame = document.getElementsByClassName("game-iframe")[0],
          gameDocument = gameFrame.contentWindow.document,
          gameMenuButton = gameDocument.getElementById("mainMenuButton"),
          realPlayButton = gameDocument.getElementById("playForReal");


          touchEvent("touchstart",gameMenuButton,150,50); //this event only hides 'sound' popup
          touchEvent("touchend",gameMenuButton,150,50); //this event only hides 'sound' popup
          touchEvent("touchstart",gameMenuButton,50,50); //start simulate touch on game menu icon
          touchEvent("touchend",gameMenuButton,50,50); //end simulate touch on game main menu

          setTimeout(function(){
            touchEvent("touchstart",realPlayButton,50,50); //start simulate touch on lobby item
            touchEvent("touchend",realPlayButton,50,50);
            task.ui
            .pause(1000)
            .isElementPresent('.popup-modal__title', function(present){
              if(!present){
                done('Login pop up is not visible')
              } else{
                done()
              }
            })
            .end(done)
          }.bind(this),1000)

        });

        task.step('Login for real play', function(done){
          task.ui
          .click('.fn-user-name')
          .setValue('.fn-user-name', 'Twice14')
          .click('input[name="password"]')
          .setValue('input[name="password"]', 'Password1')
          .click('.fn-login-btn')
          .pause(1000)
          .click('.fn-close')
          .pause(3000)
          .isElementPresent('.fn-close', function(present){
            if(present){
              task.ui
              .click('.fn-close')
              .pause(1000)
            }
          task.ui
          .isElementVisible(gameFrame, function(visible){
            if(visible){
              done()
            } else{
              done('Game is not visible. Player is not logged in.')
            }
          })
          })
          .pause(3000)
          .end(done)

        });

        // task.step('Wait. Just wait..', function(done){
        //   task.ui
        //   .pause(7000)
        //   .end(done)
        // });


        task.step('Check is mode changes to Real Play', function(done){
          realPlayInscription = gameDocument.getElementById("cp-gameMode")
          getTextVar = realPlayInscription.textContent

          // setTimeout(function(getTextVar){
            if (getTextVar == 'JOC PE BANI REALI' || getTextVar == 'PLAYING FOR FUN'){
            done()
          }else{
            done('Real play is not launched')
          }
        // }.bind(this),7000)

        });


      });
    }

})
