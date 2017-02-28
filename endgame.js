function EndGame(game){
    Entity.call(this, game);
    this.isGameOver = false;
    this.playerWin = false;
    this.font = "100px Arial";

    this.enableSound = true;

    this.winCondition = function() {};
    this.lostCondition = function() {};
}

EndGame.prototype = Object.create(Entity.prototype);
EndGame.prototype.constructor = EndGame;

//--- Draw and update
EndGame.prototype.draw = function(){
    if(this.isGameOver){
        var gradient = this.game.ctx.createLinearGradient(0, 0, 800, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "red");
        gradient.addColorStop("1.0", "blue");
        var tempGradient = this.game.ctx.fillStyle;
        var tempFont = this.game.ctx.font;
        this.game.ctx.fillStyle = gradient;
        this.game.ctx.font = this.font;

        if(this.playerWin){
            this.game.ctx.fillText("YOU WIN!", 400, 350);
        } else {
            this.game.ctx.fillText("GAME OVER!", 325, 350);
        }
        this.game.ctx.fillStyle = tempGradient;
        this.game.ctx.font = tempFont;
    }
}
EndGame.prototype.update = function(){
    if(this.winCondition()) {
        this.gameOver(true);
        if(this.enableSound){
            this.game.soundPlayer.removeAllSound();
            this.game.soundPlayer.randomTrackInQueue = false;
            this.game.soundPlayer.addToQueue("./sound/music/gameover/YGO-duel-won.mp3", undefined, undefined, 0.5);
            this.game.soundPlayer.addToQueue("./sound/music/gameover/mappedstoryUpbeat.mp3", true, undefined, 0.4);
            this.enableSound = false;
        }
    } else if (this.lostCondition()) {
        this.gameOver(false);
        if(this.enableSound){
            this.game.soundPlayer.removeAllSound();
            this.game.soundPlayer.randomTrackInQueue = false;
            this.game.soundPlayer.addToQueue("./sound/music/gameover/YGO-duel-lost.mp3", undefined, undefined, 0.5);
            this.game.soundPlayer.addToQueue("./sound/music/gameover/KH-end-of-the-world.mp3", true, undefined, 0.4);
            this.enableSound = false;
        }
    }
}
//--- end draw and update

//--- clean entities by calling die
EndGame.prototype.killEntities = function(units){
    for(var i = units.length - 1; i >= 0; i--){
        // units[i].changeAction("die"); // BUGGED
        units[i].health = 0;
    }
}
//--- end killEntities

//--- You win and You lose
EndGame.prototype.youWin = function(){
    this.playerWin = true;
    this.killEntities(this.game.enemyList);
}
EndGame.prototype.youLose = function(){
    this.playerWin = false;
    this.killEntities(this.game.playerList);
}
//--- end you win and you lose

//--- game over 
EndGame.prototype.gameOver = function(didPlayerWin){
    this.isGameOver = true;
    if(didPlayerWin){
        this.youWin();
    } else {
        this.youLose();
    }
}
//--- end game over
