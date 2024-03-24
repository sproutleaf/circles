function showCircle() {
    console.log("showing circle");
    try {
        window.open('circle.html', '_blank', 'popup,location,status,scrollbars,resizable,width=200,height=300,top=500,left=200');
    } catch (e) {
        console.error("error occurred, ", e);
    }
    // open("wheel-of-fortune.jpeg");
    // $("#first").append(letter[0]);
}