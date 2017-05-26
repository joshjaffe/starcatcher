// StarCatcher Scripts for the game made by Soft Dev 2017
    // when the web page window loads up, the game scripts will be read
    window.onload = function() {

     var star = {
        _x: null,
        _y: null,
        _xSpeed: null,
        _ySpeed: null,

         // add this to the variable list at the top of the star class
         _visible: true,

    //Create new star object with given starting position and speed
    //class functions exist to set other private variables
    //All inputs are double and function returns a new star
    create: function (x, y, xSpeed, ySpeed) {
        var obj = Object.create(this);
        obj._x = x;
        obj._y = y;
        obj._xSpeed = xSpeed;
        obj._ySpeed = ySpeed;
        obj._width = 30;
        obj._height = 15;
        obj._img = new Image();
        obj._img.src = "images/dogetreat.png";
        return obj;
    },

    setSize: function(width, height){
        this._width += 5;
        this._height +=5;
    },
    setImage: function(img){
        this._img.src=img;
    },

    //Update the new x and y of the star based on the speed.
    //drawing functionality is left for calling class
    //no input or return
    update: function () {
        this._x+=this._xSpeed;
        this._y+=this._ySpeed;
    },

    // and this just below the other functions in the star class
    visible: function() {
        return this._visible;
    },

};


    //load canvas
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d"),
    w = canvas.width = 800,
    h = canvas.height = 500;

    //load images
    var whichShip = new Image();
    var ship1 = new Image();
    ship1.src="images/starship.png";
    var ship1r = new Image();
    ship1r.src="images/starshipr.png";
    var ship1l = new Image();
    ship1l.src="images/starshipl.png";
    var ship1d = new Image();
    ship1d.src="images/starshipd.png";
    whichShip = ship1;

    var whichShip2 = new Image();
    var ship2 = new Image();
    ship2.src="images/starship2.png";
    var ship2r = new Image();
    ship2r.src="images/starship2r.png";
    var ship2l = new Image();
    ship2l.src="images/starship2l.png";
    var ship2d = new Image();
    ship2d.src="images/starship2d.png";
    whichShip2 = ship2;

    var background = new Image();
    background.src="images/bg.jpg";


    // load variables that are global
    var gameOn=true;
    var bones=0;
    var p1Score = 0, p2Score = 0;
    var level = 1;

// our stars are created using a single array with a class of information
    function initArrays(count) {

        starCount=count;
        starArray=[];

        // Create an array of stars
        for (var i = 0; i < starCount; i++) {
            // this assigns each element in the array all the information for the star by 
            // using the 'star' class, pass the starting x,y locations 
            //  and speeds into the array.
            starArray.push(star.create(10+Math.random()*w-20,10+Math.random()*h-20,3-Math.random()*8,4-Math.random()*8));
        }
    } //close initArrays
    initArrays(20);

    // moving stars + sounds + timer around the screen 
    var p1x=w/2+100, p1y=h/2, p2x=w/2-100, p2y=h/2;
    var bone = new Audio('audio/chomp.mp3');
    var s = new Date();
    var milliStart = s.getTime();
    var timer, rTime, counter = 30;


    function timerUpdate() {
        d = new Date();
        milli = d.getTime();
        timer = (milli-milliStart)/1000.0;
        document.getElementById("counter").innerHTML = Math.round(counter - timer);
        if (counter-timer<0) {
            {window.location.href= 'index.html#'+p1Score+'#'+p2Score;}
        }
    } // close timerUpdate

    // moving stars around the screen and update the players movement
    function starsUpdate () {

    // keep star on the screen (use our tricks from last week to make if statements here)
        ctx.drawImage(background,0,0,w,h);

    //  draw star on screen only if visible
        for (var i = 0; i < starCount; i++) {
            starArray[i].update();
            if (starArray[i].visible()) {
                ctx.drawImage(starArray[i]._img, starArray[i]._x-starArray[i]._width/2, starArray[i]._y-starArray[i]._height/2, starArray[i]._width, starArray[i]._height);
            }
            if (starArray[i]._x>w || starArray[i]._x < 0) {starArray[i]._xSpeed = -starArray[i]._xSpeed}
            if (starArray[i]._y>h || starArray[i]._y<0) {starArray[i]._ySpeed = -starArray[i]._ySpeed}

            var d1=Math.sqrt(Math.pow(p1x-starArray[i]._x,2)+Math.pow(p1y-starArray[i]._y,2));
            var d2=Math.sqrt(Math.pow(p2x-starArray[i]._x,2)+Math.pow(p2y-starArray[i]._y,2));
            if (d1<20) {scoring(i,1)}
            if (d2<20) {scoring(i,2)}

        }//endFor

    } //close of starsUpdate

 //  scoring functions to place and score stars
 function scoring(k,wp) {
    starArray[k]._visible=false;
    if (wp==1) {
            // need to place a small star next to player 1 score
        p1Score++;
        $("#p1ScoreDisp").text(p1Score);
        starArray[k]._x = w +200;
        starArray[k]._xSpeed = 0;
        bone.play();
        bones++;
    }
    else if (wp==2) {
        p2Score++;
        $("#p2ScoreDisp").text(p2Score);
        starArray[k]._x = w +200;
        starArray[k]._xSpeed = 0;
        bone.play();
        bones++;
    }
    if (bones==starCount) {
            level ++;
            d = new Date();
            milliStart = d.getTime();
            initArrays(20*level);
            bones = 0;
        }
}  // close scoring

    //Listens to app for keyboard actions
    addEventListener("keydown", function (e) {

        keysDown[e.keyCode] = true;
        if (e.keyCode == 38) { //  (key: up arrow)
            whichShip = ship1;
        }
        if (e.keyCode == 40) { //  (key: down arrow)
            whichShip = ship1d;
        }
        if (e.keyCode == 37) { //  (key: left arrow)
            whichShip = ship1l;
        }
        if (e.keyCode == 39) { //  (key: right arrow)
            whichShip = ship1r;
        }
        if (e.keyCode == 87) { //  (key: w)
            whichShip2 = ship2;
        }
        if (e.keyCode == 83) { //  (key: s)
            whichShip2 = ship2d;
        }
        if (e.keyCode == 65) { //  (key: a)
            whichShip2 = ship2l;
        }
        if (e.keyCode == 68) { //  (key: d)
            whichShip2 = ship2r;
        }
    }, false);



    
    //Our main function which clears the screens 
    //  and redraws it all again through function updates,
    //  then calls itself out again

     // a new array is made to keep track of a button being held down
     var keysDown = [];

    // if the key is held down, the keycode is placed in array
    // then it is deleted upon keyup command.  
    // playerUpdate will now control player movements and use the keysDown array


    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;

         // start the game with keyboard command
         if (e.keyCode == 32) {
            if (gameOn == true) {
                gameOn = false;
                rTime = timer;
            }
            else {
                d = new Date();
                milliStart = d.getTime()-rTime*1000.0;
                gameOn = true;
                main();// (key: space bar to start game)
            }

        }//end if

    }, false);

    //  player 2 movement keyboard commands
    addEventListener("keyup", function (e) {

        if (e.keyCode == 87) { //  (key: w )
            p2y-=10;
        }
        else if (e.keyCode == 83) { //  (key: s)
            p2y+=10;
        }
        else if (e.keyCode == 65) { //  (key: a)
            p2x-=10;
        }
        else if (e.keyCode == 68) { //  (key: d)
            p2x+=10;
        }
        //take keycode out of array (not being held down anymore)
        delete keysDown[e.keyCode];
    }, false); 
    {
        if (p1x>w) {p1x = 0}
            if (p1x<0) {p1x = w}
                if (p1y>h) {p1x = 0}
                    if (p1y<0) {p1x = h}
                        if (p2x>w) {p2x = 0}
                            if (p2x<0) {p2x = w}
                                if (p2y>h) {p2x = 0}
                                    if (p2y<0) {p2x = h}
                                }





     //player movement
     function playerUpdate() {
        //player two hodling down a key using the array keysDown
        if (87 in keysDown) {// P2 holding down the w key
            p2y -= 5;
        }
        if (83 in keysDown) { // P2 holding down (key: s)
            p2y += 5;
        }
        if (65 in keysDown) { // P2 holding down (key: a)
            p2x -= 5;
        }
        if (68 in keysDown) { // P2 holding down (key: d)
            p2x += 5;
        }

        // player one hodling key down
        if (37 in keysDown) { // P2 holding down (key: left arrow)
            p1x -= 5;
        }
        if (38 in keysDown) { // P2 holding down (key: up arrow)
            p1y -= 5;
        }
        if (39 in keysDown) { // P2 holding down (key: right arrow)
            p1x += 5;
        }
        if (40 in keysDown) { // P2 holding down (key: down arrow)
            p1y += 5;
        }
        //draw images of ships
        if (p1x>w) {p1x = w-10}
            if (p1x<0) {p1x = 10}
                if (p1y>h) {p1y = h-10}
                    if (p1y<0) {p1y = 10}
                        if (p2x>w) {p2x = w-10}
                            if (p2x<0) {p2x = 10}
                                if (p2y>h) {p2y = h-10}
                                    if (p2y<0) {p2y = 10}
                                        ctx.drawImage(whichShip, p1x-20, p1y-20, 40, 40);
                                    ctx.drawImage(whichShip2, p2x-20, p2y-20, 40, 40);
                                }

                                function main(){
                                    ctx.clearRect(0,0,w,h);
                                    ctx.globalAlpha = .3;
                                    ctx.drawImage(background,0,0,w,h);
                                    ctx.globalAlpha = 1;
                                    starsUpdate();
                                    playerUpdate();
                                    timerUpdate();
                                    if (gameOn) {requestAnimationFrame(main);}
                                }
                                main();
                            }              
//close window on load   