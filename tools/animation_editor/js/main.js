Chicken.inject(
["ChickenVis.UpdateLoop", "ChickenVis.Draw", "ChickenVis.AnimatedSprite"],
function (UpdateLoop, Draw, AnimatedSprite) {
    "use strict";

    var draw;
    var animatedSprite;

    var updater = new UpdateLoop(function (dt) {
        animatedSprite.update(dt);

        draw.clear();
        animatedSprite.render(draw);
    });

    function main() {

        draw = new Draw(animationViewer, 32, 32);
        animatedSprite = new AnimatedSprite(spriteSheet, {
            numFrames: 4,
            frameTime: 0.1,
            frameWidth: 32,
            frameHeight: 32,
        });

        updater.paused = false;
    }

    window.onload = main;
});
