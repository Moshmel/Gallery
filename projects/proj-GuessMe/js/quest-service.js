'use strict;'

const TREE_NAME = 'question-tree';
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    //var storageTree = loadFromStorage(TREE_NAME); 
   if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        gCurrQuest = gQuestsTree;
    }
    else {gCurrQuest = gQuestsTree};

    gPrevQuest = null;

}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the prev, curr global vars

    gPrevQuest = gCurrQuest;
    gCurrQuest = (res === 'yes') ? gCurrQuest.yes : gCurrQuest.no;

}

function addGuess(newGuessTxt, newQuestTxt) {

    var newQuest = createQuest(newQuestTxt);
    var newGuess = createQuest(newGuessTxt);
    if (gPrevQuest.yes === gCurrQuest) {
        gPrevQuest.yes = newQuest;
    }
    else gPrevQuest.no = newQuest;
    newQuest.yes = newGuess;
    newQuest.no = gCurrQuest;

    // saveToStorage(TREE_NAME,gQuestsTree);

}


