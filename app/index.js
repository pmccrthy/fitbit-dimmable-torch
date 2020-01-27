/*
 * Simple torch app using '+' and '-' buttons to control the brightness
 */
import { display } from "display";
import { vibration } from "haptics";
import document from "document";
import { me } from "appbit";
import * as messaging from "messaging";
import * as fs from "fs";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";
const LAMP_BRIGHTNESS_LEVELS = ["#333333", "#666666", "#999999", "#cccccc", "#ffffff"];
const MIN_LAMP_BRIGHTNESS = 0;
const MAX_LAMP_BRIGHTNESS = LAMP_BRIGHTNESS_LEVELS.length - 1;

let currentLampBrightness;

let settings = loadSettings();

function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  }
  catch (ex) {
    return {
      currentLampBrightness: 0
    }
  }
}

function applySettings() {
  currentLampBrightness = settings.currentLampBrightness;
}

me.addEventListener("unload", saveSettings);

function saveSettings() {
  display.brightnessOverride = undefined;
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

messaging.peerSocket.onmessage = evt => {
  if (evt.data.key === "currentLampBrightness" && evt.data.newValue) {
    settings.currentLampBrightness = JSON.parse(evt.data.newValue).selected;
  }
  applySettings();
}

function setLampBrightness(curLampBright) {
  lamp.style.fill = LAMP_BRIGHTNESS_LEVELS[curLampBright];
}

// GUI Elements & event handlers
let btnBrighter = document.getElementById("btnBrighter");
btnBrighter.onactivate = function(e) {
  if (++currentLampBrightness >= MAX_LAMP_BRIGHTNESS) {
    currentLampBrightness = MAX_LAMP_BRIGHTNESS;
    vibration.start("bump");
  }
  setLampBrightness(currentLampBrightness);
}

let btnDarker = document.getElementById("btnDarker");
btnDarker.onactivate = function(e) {
  if (--currentLampBrightness <= MIN_LAMP_BRIGHTNESS) {
    currentLampBrightness = MIN_LAMP_BRIGHTNESS;
    vibration.start("bump");
  }
  setLampBrightness(currentLampBrightness);
}

let lamp = document.getElementById("lamp");
lamp.onclick = function(e) {
}

display.autoOff = false;
display.on = true;
display.brightnessOverride = 1.0;
applySettings();
setLampBrightness(currentLampBrightness);
