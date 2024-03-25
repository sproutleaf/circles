function bg(name) {
    $("body").css("background-image", "url(assets/" + name + ")");
}

function randomInt(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function wordsCycle(words) {
    let i = 0, l = words.length;
    $("#words").text(words[0]);
    $("body").css("cursor", "crosshair");

    $("#words").click(() => {
        if (i === 0) i++;
        if (i < l) {
            let t = randomInt(window.innerHeight * 0.2, window.innerHeight * 0.8);
            let l = randomInt(window.innerWidth * 0.2, window.innerWidth * 0.7);
            $("#words").text(words[i]);
            $("#words").css({
                'position': 'absolute',
                'top': t + 'px',
                'left': l + 'px'
            });
        } else {
            $("#words").text(words[i - 1]);
        }

        if (i >= l) {
            window.close();
        }
        i++;
    })
}


circles = [
    {
        run: () => {
            fortune = ["moving", "connecting", "we are", "always", "seeing", "life's", "threads", "weave", "together"];
            bg("wheel-of-fortune.jpeg");
            wordsCycle(fortune);
        }
    }, {
        run: () => {
            life = ['to be', 'born', 'to live', 'to love', 'to', 'experience', 'the', 'vicissitudes', 'of life', '...', 'to suffer', 'to die', 'to start', 'all over', 'again'];
            bg("wheel-of-life.jpeg");
            wordsCycle(life);
        }
    }, {
        run: () => {
            bg("sun.jpeg");
        }
    }, {
        run: () => {
            bg("moon.jpeg");
        }
    }, {
        run: () => {
            bg("sky.jpeg");
        }
    }, {
        run: () => {
            bg("sun-at-noon.jpeg");
        }
    }, {
        run: () => {
            bg("sun.jpeg");
        }
    }, {
        run: () => {
            bg("sun-at-midnight.jpeg");
        }
    }, {
        run: () => {
            bg("touching-north.jpeg");
        }
    }, {
        run: () => {
            bg("night-train.jpeg");
        }
    }, {
        run: () => {
            bg("sand.jpeg");
        }
    }
];

$(document).ready(function () {
    function parseURL() {
        let n = Number($(location).attr("href").split("=")[1]);
        if (Number.isInteger(n) && n >= 0) {
            return n;
        }
    }

    let r;
    if (window.location.href.indexOf("?=" > -1)) {
        r = parseURL();
        circles[r].run();
    }
});