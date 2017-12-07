window.onload = function () {
    var model = new Model(), view = new View(model), controller = new Controller(model, view);

    function resizeNav() {
        // Set the nav height to fill the window
        $("#nav-fullscreen").css({ "height": screen.availHeight });

        // Set the circle radius to the length of the window diagonal,
        // this way we're only making the circle as big as it needs to be.
        var radius = Math.sqrt(Math.pow(screen.availHeight, 2) + Math.pow(screen.availWidth, 2));
        // console.log("radius : " + radius);
        var diameter = radius * 2;
        $("#nav-overlay").width(diameter);
        $("#nav-overlay").height(diameter);
        $("#nav-overlay").css({ "margin-top": -radius, "margin-left": -radius*.95 });
    }

    // Set up click and window resize callbacks, then init the nav.
    $("#nav-toggle").click(function () {
        $("#nav-toggle, #nav-overlay, #nav-fullscreen").toggleClass("open");
    });

    $(window).resize(resizeNav);

    resizeNav();

    window.setTimeout(function () {
        $("#nav-toggle").click();
    }, 1000)
}