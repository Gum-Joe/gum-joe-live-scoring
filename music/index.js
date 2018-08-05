/**
 * @overview Entry of music sever
 */
const express = require("express");
const { join } = require("path");
const { exec } = require("child_process");

const app = express();
const ENDING = "mp3";
let buzzed = false;

app.get(`/api/get/music/0`, (req, res, next) => {
  if (!buzzed) {
    exec(`"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe" -I dummy --dummy-quiet "${join(__dirname, "SFX", `0.${ENDING}`)}" vlc://quit`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      buzzed = true;
      console.log("Someone Buzzed");
      res.statusCode = 200;
      res.send("OK");
    });
  } else {
    res.statusCode = 403;
    res.send("Please wait for the current buzz to complete.");
  }
});

app.get(`/api/get/music/1`, (req, res, next) => {
  if (!buzzed) {
    exec(`"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe" -I dummy --dummy-quiet "${join(__dirname, "SFX", `1.${ENDING}`)}" vlc://quit`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      buzzed = true;
      console.log("Someone Buzzed");
      res.statusCode = 200;
      res.send("OK");
    });
  } else {
    res.statusCode = 403;
    res.send("Please wait for the current buzz to complete.");
  }
});

app.get(`/api/get/music/2`, (req, res, next) => {
  if (!buzzed) {
    exec(`"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe" -I dummy --dummy-quiet "${join(__dirname, "SFX", `2.${ENDING}`)}" vlc://quit`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      buzzed = true;
      console.log("Someone Buzzed");
      res.statusCode = 200;
      res.send("OK");
    });
  } else {
    res.statusCode = 403;
    res.send("Please wait for the current buzz to complete.");
  }
});


app.get(`/api/get/music/3`, (req, res, next) => {
  if (!buzzed) {
    exec(`"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe" -I dummy --dummy-quiet "${join(__dirname, "SFX", `3.${ENDING}`)}" vlc://quit`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      buzzed = true;
      console.log("Someone Buzzed");
      res.statusCode = 200;
      res.send("OK");
    });
  } else {
    res.statusCode = 403;
    res.send("Please wait for the current buzz to complete.");
  }
});

app.get("/api/get/right", (req, res, next) => {
  exec(`"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe" -I dummy --dummy-quiet "${join(__dirname, "SFX", `right.${ENDING}`)}" vlc://quit`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      buzzed = false;
      console.log("Marked right");
      res.statusCode = 200;
      res.send("OK");
  });
});

app.get("/api/get/wrong", (req, res, next) => {
  exec(`"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe" -I dummy --dummy-quiet "${join(__dirname, "SFX", `wrong.${ENDING}`)}" vlc://quit`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    buzzed = false;
    console.log("Marked wrong");
    res.statusCode = 200;
    res.send("OK");
  });
});

app.listen(4040, () => console.log("[INFO] Listening on port 4040"));