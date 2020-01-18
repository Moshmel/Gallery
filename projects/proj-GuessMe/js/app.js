'use strict';

var gLastRes = null;

$(document).ready(init)

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    $('.game-start').hide();
    renderQuest();
    $('.quest').show();
}

function renderQuest() {
    // TODO: select the <h2> inside quest and update its text by the currQuest text
    $('.quest h2').html(gCurrQuest.txt);
}

function onUserResponse(res) {
    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            onRestartGame();
            $('.quest').hide();
    
        } else {
            alert('I dont know...teach me!')
            // TODO: hide and show new-quest section
            $('.new-quest').show();
            $('.quest').hide();
            
        }
    } else {
        gLastRes=res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    // TODO: Get the inputs' values
    // TODO: Call the service addGuess
    var newGuessTxt=$('#newGuess').val();
    var newQuestTxt=$('#newQuest').val();
    addGuess(newGuessTxt,newQuestTxt);
    $('.new-quest').hide();
    $('.quest').hide();
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    gCurrQuest=gQuestsTree;

}

