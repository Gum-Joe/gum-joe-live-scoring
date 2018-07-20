/**
 * @overview Entry of music sever
 */
const express = require("express");
const { join } = require("path");
const { exec } = require("child_process");

const app = express();
const ENDING = "mp3";

app.get(`/api/get/music/0`, (req, res, next) => {
  exec(`"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe" -I dummy --dummy-quiet "${join(__dirname, "SFX", `0.${ENDING}`)}" vlc://quit`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});

app.get(`/api/get/music/1`, (req, res, next) => {
  exec(`"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe" -I dummy --dummy-quiet "${join(__dirname, "SFX", `1.${ENDING}`)}" vlc://quit`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});

app.get(`/api/get/music/2`, (req, res, next) => {
  exec(`"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe" -I dummy --dummy-quiet "${join(__dirname, "SFX", `2.${ENDING}`)}" vlc://quit`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});


app.get(`/api/get/music/3`, (req, res, next) => {
  exec(`"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe" -I dummy --dummy-quiet "${join(__dirname, "SFX", `3.${ENDING}`)}" vlc://quit`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});

app.listen(4040, () => console.log("[INFO] Listening on port 4040"));