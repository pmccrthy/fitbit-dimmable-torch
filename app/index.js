/*
 * Simple torch app
 * Uses the 'Up' and 'Down' buttons to control the brightness
 * Can also tap the screen to toggle between brighter and dimmer
 */
import { display } from "display";
import { vibration } from "haptics";
import document from "document";
import { me } from "appbit";
import * as messaging from "messaging";
import * as fs from "fs";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

const MIN_SCREEN_BRIGHTNESS = undefined;
const MAX_SCREEN_BRIGHTNESS = 1.0;
const LAMP_BRIGHTNESS_LEVELS = ["#333333", "#666666", "#999999", "#cccccc", "#ffffff"];
const MIN_LAMP_BRIGHTNESS = 0;
const MAX_LAMP_BRIGHTNESS = LAMP_BRIGHTNESS_LEVELS.length - 1;

let currentLampBrightness;
let maxBrightnessOn;

let settings = loadSettings();

function loadSettings() {
  console.log("loadSettings");
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  }
  catch (ex) {
    return {
      maxBrightnessOn: 'false',
      currentLampBrightness: 0
    }
  }
}

function applySettings() {
  currentLampBrightness = settings.currentLampBrightness;
  maxBrightnessOn = settings.maxBrightnessOn;
}

me.addEventListener("unload", saveSettings);

function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

messaging.peerSocket.onmessage = evt => {
  if (evt.data.key === "maxBrightnessOn" && evt.data.newValue) {
    settings.maxBrightnessOn = JSON.parse(evt.data.newValue);
  }

  if (evt.data.key === "currentLampBrightness" && evt.data.newValue) {
    settings.currentLampBrightness = JSON.parse(evt.data.newValue).selected;
  }
  applySettings();
}

function lampBrighter() {
  currentLampBrightness++;
  if (currentLampBrightness >= MAX_LAMP_BRIGHTNESS) {
    currentLampBrightness = MAX_LAMP_BRIGHTNESS;
    vibration.start("bump");
  }
  setLampBrightness();
}

function lampDarker() {
  currentLampBrightness--;
  if (currentLampBrightness <= MIN_LAMP_BRIGHTNESS) {
    currentLampBrightness = MIN_LAMP_BRIGHTNESS;
    vibration.start("bump");
  }
  setLampBrightness();
}

function toggleMaxBrightnessOn() {
  maxBrightnessOn = !maxBrightnessOn;
  setLampBrightness();
}

function setLampBrightness() {
  lamp.style.fill = LAMP_BRIGHTNESS_LEVELS[currentLampBrightness];
  if (maxBrightnessOn) {
    display.brightnessOverride = MAX_SCREEN_BRIGHTNESS;
  }
  else {
    display.brightnessOverride = MIN_SCREEN_BRIGHTNESS;
  }
}

// Physical buttons event handler
document.onkeypress = function(e) {
  switch (e.key) {
    case "up":
      lampBrighter();
      break;
    case "down":
      lampDarker();
      break;
    case "back":
      break;
  }
}

// GUI Elements & event handlers
let lamp = document.getElementById("lamp");
lamp.onclick = function(e) {
  toggleMaxBrightnessOn();
}

display.autoOff = false;
display.on = true;
applySettings();
setLampBrightness();
