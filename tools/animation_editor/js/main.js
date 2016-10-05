Chicken.inject(
["ChickenVis.UpdateLoop", "ChickenVis.Draw", "ChickenVis.AnimatedSprite"],
function (UpdateLoop, Draw, AnimatedSprite) {
    "use strict";

    var assetRoot = "../../";
    var draw;
    var spec;
    var spriteImage;
    var animatedSprite;
    var currentTab;
    var currentPanel;

    var updater = new UpdateLoop(function (dt) {
        animatedSprite.update(dt);
        draw.rect(0, 0, spec.renderWidth, spec.renderHeight, backgroundColour.value);
        animatedSprite.render(draw);
    });

    function openPanel(id) {
        if (currentTab) {
            currentTab.classList.remove("highlighted");
            currentPanel.classList.remove("open");
            currentPanel.classList.add("closed");
        }

        currentTab = document.getElementById(id + "Tab");
        currentPanel = document.getElementById(id + "Panel");

        currentTab.classList.add("highlighted");
        currentPanel.classList.add("open");
        currentPanel.classList.remove("closed");
    }

    function addTab(id, title) {
        var a = document.createElement("a");
        a.href = "#";
        a.id = id + "Tab";
        a.innerText = title;
        a.onclick = function () {
            openPanel(id);
            return false;
        }

        tabs.appendChild(a);
    }

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

    function refrshSpecPanel() {
        imageFile.value = spec.image;
        numFrames.value = spec.numFrames;
        frameTime.value = spec.frameTime * 1000;
        frameWidth.value = spec.frameWidth;
        frameHeight.value = spec.frameHeight;
        drawWidth.value = spec.renderWidth;
        drawHeight.value = spec.renderHeight;
    }

    window.updateSprite = function updateSprite() {
        updater.paused = true;

        if (currentPanel === specPanel)
            spec = buildSpec();
        else
            spec = JSON.parse(jsonSpec.value);

        spriteImage && spriteSheetContainers.removeChild(spriteImage);
        spriteImage = document.createElement("img");
        spriteImage.onload = function () {
            draw = new Draw(animationViewer, spec.renderWidth, spec.renderHeight);
            animatedSprite = new AnimatedSprite(spriteImage, spec);
            updater.paused = false;

            jsonSpec.innerText = JSON.stringify(spec);
            refrshSpecPanel();
        }

        spriteImage.src = assetRoot + spec.image;
        spriteSheetContainers.appendChild(spriteImage);
    }

    window.onload = function main() {
        addTab("spec", "Spec");
        addTab("json", "JSON");
        openPanel("spec");
        updateSprite();
    }
});
