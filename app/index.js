/*
 * Simple torch app
 * Uses the 'Up' and 'Down' buttons to control the brightness
 * Can also tap the screen to toggle between brighter and dimmer
 */
import { display } from "display";
import { vibration } from "haptics";
import document from "document";

// Global variables
const min_screen_brightness = 0.1;
const max_screen_brightness = 1.0;
const lamp_brightness_levels = ["#444444", "#888888", "#bbbbbb", "#ffffff"];
const min_lamp_brightness = 0;
const max_lamp_brightness = lamp_brightness_levels.length - 1;
let current_lamp_brightness = min_lamp_brightness;

function lamp_brighter() {
  current_lamp_brightness++;
  if (current_lamp_brightness >= max_lamp_brightness) {
    current_lamp_brightness = max_lamp_brightness;
    vibration.start("bump");
  }
  set_lamp_brightness();
}

function lamp_darker() {
  current_lamp_brightness--;
  if (current_lamp_brightness <= min_lamp_brightness) {
    current_lamp_brightness = min_lamp_brightness;
    vibration.start("bump");
  }
  set_lamp_brightness();
}

function set_lamp_brightness() {
  lamp.style.fill = lamp_brightness_levels[current_lamp_brightness];
}

function toggle_screen_brightness() {
  if (display.brightnessOverride == max_screen_brightness) {
    display.brightnessOverride = min_screen_brightness;
  }
  else {
    display.brightnessOverride = max_screen_brightness;
  }
}

// Physical buttons event handler
document.onkeypress = function(e) {
  switch (e.key) {
    case "up":
      lamp_brighter();
      break;
    case "down":
      lamp_darker();
      break;
    case "back":
      break;
  }
}

// GUI Elements & event handlers
let lamp = document.getElementById("lamp");
lamp.onclick = function(e) {
  toggle_screen_brightness();
}

function main() {
  display.autoOff = false;
  display.on = true;
  display.brightnessOverride = max_screen_brightness;
  set_lamp_brightness();
}

main();
