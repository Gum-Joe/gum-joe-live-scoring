# gum-joe-live-scoring
Scoring & answering system used for The Big Gum Joe Quiz (2018), a livestreamed quiz I did with my friends on YouTube.

Functionality:
- Tracks scores for contestants in a JSON file
- Provide hosts the functionality to adjust scores
- Provides a system for contestants to enter answers to questions, with viewers shown this live as the answers are typed. Hosts can then award points for these answers directly from the answer-showing UI
- Contains Python code for a Raspberry Pi 2 that uses specific GPIO pins to listen for quiz buzzer activations. Then, sends a request to the main server to play a sound associated with the answering contestant, and blocks buzzes until it is reset by the hosts in the UI.

# How it works
On the react server, there is 3 routes:
- `/`: Index, contains edit and view routes (see below) and access points for these route
- `/edit`: Allows you to edit scores
- `/scores`: View the scores

You run the server and open up the edit route on the score keep's PC and the view route on the audience's viewing area
It is degines to run on a raspberry pi.

# Usage
- Run `npm install`
- Run `npm start`
- Open `http://localhost:3000`
