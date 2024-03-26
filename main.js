/* -------------------------------------------------------------------------- */
/*                              common functions                              */
/* -------------------------------------------------------------------------- */

function randomInt(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getLeft() {
    let windowW = window.screen.width;
    return randomInt(windowW * 0.2, windowW * 0.8);
}

function getTop() {
    let windowH = window.screen.height;
    return randomInt(windowH * 0.2, windowH * 0.6);
}

let limit = 300;
function getResizedDimensions(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        let resizedWidth, resizedHeight;
        img.onload = () => {
            let width = img.width;
            let height = img.height;
            rh = height > width ? limit : Math.ceil(limit / width * height);
            rw = height > width ? Math.ceil(limit / height * width) : limit;
            resolve({ width: rw, height: rh });
        };
        img.onerror = () => {
            reject(new Error('Failed to load the image!'));
        }
        img.src = "assets/" + url;
    });
}


/* -------------------------------------------------------------------------- */
/*                               reveal artworks                              */
/* -------------------------------------------------------------------------- */

bg = [
    "weather-project.jpeg",
    "moon.jpeg",
    "sky.jpeg",
    "sun-at-noon.jpeg",
    "sun.jpeg",
    "sun-at-midnight.jpeg",
    "touching-north.jpeg",
    "night-train.jpeg",
    "sand.jpeg"
];

clicks = 0;
function reveal(i) {
    try {
        clicks++;
        getResizedDimensions(bg[i]).then((dimensions) => {
            // Opens pop up window
            let l = getLeft();
            let t = getTop();
            i += 2;
            window.open(`circle.html?=${i}`, '_blank', `popup,location,status,scrollbars,resizable,alwaysRaised,width=${dimensions.width},height=${dimensions.height},top=${t},left=${l},clicks=${clicks}`);
        })
            .catch((e) => {
                console.error("Error: ", e);
            })
    } catch (e) {
        console.error("error occurred, ", e);
    }
}

/* -------------------------------------------------------------------------- */
/*                              make word circle                              */
/* -------------------------------------------------------------------------- */

let elements = [
    '<span onclick="reveal(0)" class="p">SUN</span><br>',
    '<span onclick="reveal(1)" class="p">MOON</span><br>',
    '<span onclick="reveal(2)" class="p">SKY</span><br>',
    '<span onclick="reveal(3)" class="p">DAWN</span><br>',
    '<span onclick="reveal(4)" class="p">DUSK</span><br>',
    '<span onclick="reveal(5)" class="p">MIDNIGHT</span><br>',
    '<span onclick="reveal(6)" class="p">SNOW</span><br>',
    '<span onclick="reveal(7)" class="p">STONE</span><br>',
    '<span onclick="reveal(8)" class="p">SAND</span><br>',
];

function addElements() {
    // Add word wheel
    let d = $('<div>', {
        id: 'gather',
        text: 'SUN MOON SKY DAWN DUSK MIDNIGHT SNOW STONE SAND '
    });
    $('body').append(d);

    let e = $('<div>', {
        id: 'menu'
    });
    $('body').append(e);
    for (const line of elements) {
        $("#menu").append(line);
    }

    let l = randomInt($(window).width() * 0.1, $(window).width() * 0.8);
    let t = randomInt($(window).height() * 0.1, $(window).height() * 0.6);
    $('#gather').css({
        'position': 'absolute',
        'left': l + 'px',
        'top': t + 'px'
    });
    let ml = l + 30;
    let mt = t + 50;
    $('#menu').css({
        'color': 'green',
        'background-color': 'white',
        'position': 'absolute',
        'left': ml + 'px',
        'top': mt + 'px'
    });
    const circle = new CircleType(document.getElementById('gather'));
}

/* -------------------------------------------------------------------------- */
/*                     prepare letters to become bubbles                      */
/* -------------------------------------------------------------------------- */

function makeLetterBubbles() {
    let text = $("#first").text();
    let newText = '';
    for (let i = 0; i < text.length; i++) {
        newText += '<b>' + text[i] + '</b>';
    }
    $("#first").html(newText);
}

function endParagraph() {
    addElements();
    makeLetterBubbles();
}

/* -------------------------------------------------------------------------- */
/*                              wheels as circles                             */
/* -------------------------------------------------------------------------- */

let wheels = [
    "wheel-of-fortune.jpeg",
    "wheel-of-life.jpeg",
];

let unfoldings = [
    'and it immediately reminded me of the <span class="p" onclick="showWheel(1)">Wheel of Life</span> we saw at the Rubin;',
    " both representing chance, destiny, seasons, and the laws of nature<span class='p' onclick='endParagraph()'>... ⚘</span></p>"
];

function showWheel(i) {
    try {
        getResizedDimensions(wheels[i]).then((dimensions) => {
            // Opens pop up window
            let l = getLeft();
            let t = getTop();
            window.open(`circle.html?=${i}`, '_blank', `popup,location,status,scrollbars,resizable,alwaysRaised,width=${dimensions.width},height=${dimensions.height},top=${t},left=${l}`);

            // Appends text
            $("#first").append(unfoldings[i]);
        }).catch((e) => {
            console.error("Error: ", e);
        })
    } catch (e) {
        console.error("error occurred, ", e);
    }
}

let circles = [
    '¤', '°', 'º', 'ο', 'ₒ', '∘', '⍉', '⍥', '◌', '◎', '☉', '☯'
];

function switchLetter() {
    let i = randomInt(0, circles.length - 1);
    return circles[i];
}

/* -------------------------------------------------------------------------- */
/*                               document ready                               */
/* -------------------------------------------------------------------------- */

$(document).ready(() => {
    alert(" 🎐 please be sure to enable popup windows 🎐 ");

    $("#first").on('mouseenter', 'b', function () {
        let $b = $(this);
        if (!$b.hasClass('changed')) {
            $b.addClass('changed');
            $b.text(switchLetter());
            $b.css('position', 'absolute');
            roam($b, 10000);
        }
    });

    function roam($e, duration) {
        let w = $(window).width();
        let h = $(window).height();
        let x = Math.random() * (w - $e.width());
        let y = Math.random() * (h - $e.height());
        let opacity = Math.random();

        $e.animate({ left: x, top: y, opacity: opacity }, duration, function () {
            roam($e, duration + 500);
        });
    }
})