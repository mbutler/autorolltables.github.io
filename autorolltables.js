// autorolltable
// developed by dangeratio
// content by OrkishBlade
// originally posted to: reddit.com/r/DnD/comments/452r6r/a_massive_and_growing_resource_of_random_tables/
//
//

var current;

/*
loadScript("json/dungeons.js", null);
loadScript("json/factions.js", null);
loadScript("json/monsters.js", null);
loadScript("json/objects.js", null);
loadScript("json/npcs.js", null);
loadScript("json/plots.js", null);
loadScript("json/settlements.js", null);
loadScript("json/wilderness.js", null);
*/

function debug(obj) {
  var output = document.getElementById("output");
  output.innerHTML = output.innerHTML + obj + '\n';
  return 0;
}

function out(obj) {
  var output = document.getElementById("output");
  output.innerHTML = output.innerHTML + obj + '\n';
  return 0;
}

function side(obj) {
  var side = document.getElementById("rightview");
  side.innerHTML = side.innerHTML + obj + '\n';
  return 0;
}

function sideClear() {
  var side = document.getElementById("rightview");
  side.innerHTML = "";
  return 0;
}

function clearSelect() {
  var select = document.getElementById("selectlist");
  var length = select.options.length;
  for (i = select.options.length; i > -1; i--) {
    select.options[i] = null;
  }
}


// return table variable from table name
function getTable(table_name) {
  switch(table_name) {
    case "dungeons":
      return top.dungeons;
      break;
    case "factions":
      return top.factions;
      break;
    case "monsters":
      return top.monsters;
      break;
    case "npcs":
      return top.npcs;
      break;
    case "objects":
      return top.objects;
      break;
    case "plots":
      return top.plots;
      break;
    case "settlements":
      return top.settlements;
      break;
    case "wilderness":
      return top.wilderness;
      break;
    default:
      return top.dungeons;
      break;
  }
}


// fill select table helper function
function loadSelect(curr_table) {
  clearSelect();

  var selectlist = document.getElementById("selectlist");
  var rollbutton = document.getElementById("roll");

  current = getTable(curr_table.toLowerCase());

  //alert(current[0].title);

  for (var i = 0; i < current.length; i++) {
    selectlist.options[selectlist.options.length] = new Option(current[i].title, current[i].title);
  }

}


// handle new selections
document.getElementById("selectlist").onchange = document.getElementById("selectlist").onclick = function selected() {
  var sel = document.getElementById("selectlist");
  var index = sel.selectedIndex;
  var seltext = sel.options;
  roll_table = current;

  sideClear();
  side("Title: " + roll_table[index].title);
  side(" ");
  side("Suggested Use: " + roll_table[index].use);
  side(" ");
  side("Rolls: " + roll_table[index].rolls.length);
  side(" ");
  for (var i = 0; i < roll_table[index].rolls.length; i++) {
    side(roll_table[index].rolls[i].title);
    for (var z = 0; z < roll_table[index].rolls[i].roll.length; z++) {
      side(" " + (z+1) + " - " + roll_table[index].rolls[i].roll[z]);
    }
    side(" ");
  }

}

// initial load of select list
function init() {
  // default to dungeons
  current = top.dungeons;

  // fill select
  var selectlist = document.getElementById("selectlist");
  var rollbutton = document.getElementById("roll");

  for (var i = 0; i < current.length; i++) {
    var obj = current[i];
    selectlist.options[selectlist.options.length] = new Option(current[i].title, current[i].title);
  }

}


// roll button
document.getElementById("roll").onclick = function jsRoll() {
  var sel = document.getElementById("selectlist");
  var index = sel.selectedIndex;
  var seltext = sel.options;

  sideClear();
  side("Title: " + roll_table[index].title);
  side(" ");
  side("Suggested Use: " + roll_table[index].use);
  side(" ");
  side("Rolls: " + roll_table[index].rolls.length);
  side(" ");

  for (var i = 0; i < roll_table[index].rolls.length; i++) {
    var rand = roll_table[index].rolls[i].roll[Math.floor(Math.random() * roll_table[index].rolls[i].roll.length)];
    side(roll_table[index].rolls[i].title + ": " + rand);
    //side(" ");
  }
  document.getElementById("selectlist").focus();
}


// copy to clipboard
var copyTextareaBtn = document.querySelector('.js-textareacopybtn');
copyTextareaBtn.addEventListener('click', function(event) {
  var copyTextarea = document.querySelector('.js-copytextarea');
  copyTextarea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
    copyTextarea.innerHTML = "";
    document.getElementById("selectlist").focus();
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});


// menu
//
$(function() {
  $(".menuitem").click(function() {
    loadSelect($(this).html());
  });
});

$(function() {
  $(".menuitem").mouseover(function() {
    loadSelect($(this).html());
  });
});

$(document).ready(function() {
  init();
});
