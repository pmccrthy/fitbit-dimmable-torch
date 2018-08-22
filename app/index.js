/*
 * Simple torch app
 * Uses the 'Up' and 'Down' buttons to control the brightness
 * Can also tap the screen to toggle between brighter and dimmer
 */

import { display } from "display";
import document from "document";

// Global variables
let min_brightness = 0.1;
let max_brightness = 1.0;

// Functions
function toggle_brightness() {
  if (display.brightnessOverride == max_brightness) {
    darker();
  }
  else {
    brighter();
  }
}

function brighter() {
  display.brightnessOverride = max_brightness;
}

function darker() {
  display.brightnessOverride = min_brightness;
}

function initalise() {
  display.autoOff = false;
  display.on = true;
  darker();
}

// Physical buttons event handler
document.onkeypress = function(e) {
  if (e.key == "up") {
    brighter();
  }
  
  if (e.key == "down") {
    darker();
  }
  
  if (e.key == "back") {
  }
}

// GUI Elements event handlers
let lamp = document.getElementById("lamp");
lamp.onclick = function(e) {
  toggle_brightness();
}

function main() {
  initalise();
}

main();