function bg(name) {
    $("body").css("background-image", "url(assets/" + name + ")");
}

function randomInt(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function wordsCycle(words, skipContemplation) {
    let iteration = window.opener.clicks;
    let limit = 1;
    if (typeof skipContemplation === 'undefined') {
        let c = 0.05 * iteration;
        let contemplation = c > limit ? limit : c;
        let g = Math.random();
        if (g < contemplation) {
            words = ["I feel", "like", "I'm", "thinking", "in", "circles", "..."];
        }
    }

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

let skipContemplation = true;
circles = [
    {
        run: () => {
            fortune = ["moving", "connecting", "we are", "always", "seeing", "life's", "threads", "weave", "together"];
            bg("wheel-of-fortune.jpeg");
            wordsCycle(fortune, skipContemplation);
        }
    }, {
        run: () => {
            life = ['to be', 'born', 'to live', 'to love', 'to', 'experience', 'the', 'vicissitudes', 'of life', '...', 'to suffer', 'to die', 'to start', 'all over', 'again'];
            bg("wheel-of-life.jpeg");
            wordsCycle(life, skipContemplation);
        }
    }, {
        run: () => {
            let weather = ["smoke", "mist", "mirrors", "what", "you see", "as sun—a", "fantasy", "indulged in", "aluminium"];
            bg("weather-project.jpeg");
            wordsCycle(weather);
        }
    }, {
        run: () => {
            let moon = ["a song of", "lullaby", "a wave of", "somnolence", "let me", "drift off", "in your", "embrace"];
            bg("moon.jpeg");
            wordsCycle(moon);
        }
    }, {
        run: () => {
            let sky = ["is there", "a world", "where", "i can sit", "next to", "all the people", "i love", "and just", "watch the", "sky at dawn", "and dusk", "all the time"];
            bg("sky.jpeg");
            wordsCycle(sky);
        }
    }, {
        run: () => {
            let noon = ["the", "first", "light", "of the", "day", "illuminating", "the", "first", "awakening", "of your", "interiority"];
            bg("sun-at-noon.jpeg");
            wordsCycle(noon);
        }
    }, {
        run: () => {
            let tunnel = ["and", "through", "this", "tunnel", "we'll", "emerge", "from", "the other", "end—", "forever", "changed"];
            bg("sun.jpeg");
            wordsCycle(tunnel);
        }
    }, {
        run: () => {
            let midnight = ["even the", "sun needs", "to rest", "and hide", "sometimes"];
            bg("sun-at-midnight.jpeg");
            wordsCycle(midnight);
        }
    }, {
        run: () => {
            let snow = ["cutting ice", "packing snow", "the wisdom", "of the", "indigenous", "soul—", "rings,", "in choreo", "nature sure", "is cyclical—", "creation", "change", "decay", "all so", "ephemeral"];
            bg("touching-north.jpeg");
            wordsCycle(snow);
        }
    }, {
        run: () => {
            let train = ["the lips", "that—", "sipped,", "guzzled,", "grasped", "at the", "open to—", "satiate", "their", "thirst", "the dirt", "and grit", "an inadequacy", "of voice"];
            bg("night-train.jpeg");
            wordsCycle(train);
        }
    }, {
        run: () => {
            let spiral = ["black basalt", "rocks", "black sand", "coil of", "earth", "they say", "don't", "trample the", "vegetation", "don't", "leave", "a trace", "but", "all I want", "is to", "make a", "campfire"];
            bg("sand.jpeg");
            wordsCycle(spiral);
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