Chicken.inject(
["ChickenVis.UpdateLoop", "ChickenVis.Draw", "ChickenVis.AnimatedSprite"],
function (UpdateLoop, Draw, AnimatedSprite) {
    "use strict";

    var draw;
    var spriteImage;
    var animatedSprite;

    var updater = new UpdateLoop(function (dt) {
        animatedSprite.update(dt);

        draw.clear();
        animatedSprite.render(draw);
    });

    window.updateSprite = function updateSprite() {
        updater.paused = true;

        spriteImage && spriteSheetContainers.removeChild(spriteImage);
        spriteImage = document.createElement("img");
        spriteImage.onload = function () {
            draw = new Draw(animationViewer, Number(drawWidth.value), Number(drawHeight.value));
            animatedSprite = new AnimatedSprite(spriteImage, {
                numFrames: Number(numFrames.value),
                frameTime: Number(frameTime.value) / 1000,
                frameWidth: Number(frameWidth.value),
                frameHeight: Number(frameHeight.value),
                renderWidth: Number(drawWidth.value),
                renderHeight: Number(drawHeight.value),
            });

            updater.paused = false;
        }
        
        spriteImage.src = imageFile.value;
        spriteSheetContainers.appendChild(spriteImage);
    }

    window.onload = function main() {
        updateSprite();
    }
});
