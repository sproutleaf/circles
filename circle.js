function bg(name) {
    $("body").css("background-image", "url(assets/" + name + ")");
}

function wordsCycle(words) {
    let i = 0, l = words.length;
    $("#words").html(words[0]);
    $("body").css("cursor", "crosshair");

    $("#words").click(() => {
        if (i === 0) i++;
        if (i < l) {
            $("#words").html(words[i]);
        } else {
            $("#words").html(words[i - 1]);
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
            // fortune = ["moving", "connecting", "we are", "always", "seeing", "life's", "threads", "weave", "together"];
            // fortune.map(f => { return f.toUpperCase(); });
            bg("wheel-of-fortune.jpeg");
            // wordsCycle(fortune);
        }
    }, {
        run: () => {
            bg("wheel-of-life.jpeg");
        }
    }, {
        run: () => {
            bg("touching-north.jpeg");
        }
    }, {
        run: () => {
            bg("life-death.png");
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