Chicken.inject(
["ChickenVis.UpdateLoop", "ChickenVis.Draw", "ChickenVis.AnimatedSprite"],
function (UpdateLoop, Draw, AnimatedSprite) {
    "use strict";

    var draw;
    var spec;
    var spriteImage;
    var animatedSprite;

    var updater = new UpdateLoop(function (dt) {
        animatedSprite.update(dt);

        draw.rect(0, 0, spec.renderWidth, spec.renderHeight, backgroundColour.value);
        animatedSprite.render(draw);
    });

    function buildSpec() {
        return {
            image: imageFile.value,
            numFrames: Number(numFrames.value),
            frameTime: Number(frameTime.value) / 1000,
            frameWidth: Number(frameWidth.value),
            frameHeight: Number(frameHeight.value),
            renderWidth: Number(drawWidth.value),
            renderHeight: Number(drawHeight.value),
        };
    }

    window.updateSprite = function updateSprite() {
        updater.paused = true;

        spec = buildSpec();

        spriteImage && spriteSheetContainers.removeChild(spriteImage);
        spriteImage = document.createElement("img");
        spriteImage.onload = function () {
            draw = new Draw(animationViewer, spec.renderWidth, spec.renderHeight);
            animatedSprite = new AnimatedSprite(spriteImage, spec);
            updater.paused = false;

            jsonSpec.innerText = JSON.stringify(spec);
        }

        spriteImage.src = spec.image;
        spriteSheetContainers.appendChild(spriteImage);
    }

    window.onload = function main() {
        updateSprite();
    }
});
