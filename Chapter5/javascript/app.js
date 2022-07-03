let main = function () {
    let toDos = ["Get groceries",
                 "Make up some new ToDos",
                 "Prep for Monday's class",
                 "Answer emails",
                 "Take Gracie to the park",
                 "Finish writing this book"];

    $(".tabs a span").toArray().forEach(function (element) {
        let $element = $(element);
        $element.on("click", function () {
            let $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            // Newest Tab
            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                // Since a new item is appended to the end of the array, we want to iterate
                // from the last item to the first.
                for (i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            }
            // Oldest tab
            else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
            }
            // Add tab
            else if ($element.parent().is(":nth-child(3)")) {
                $input = $("<input>"),
                $button = $("<button>").text("+");
                // when the add button is clicked and there input isn't empty we will append
                // or push that value into the toDos array
                $button.on("click", function () {
                    if ($input.val() !== "") {
                        toDos.push($input.val());
                        $input.val(""); // We want to clear out the input
                    }
                });
                // now we will bind or append the input and button elements onto the Add tab
                $content = $("<div>").append($input).append($button);
            }

            $("main .content").append($content);
            return false;
        });
    });
    // When the page loads, the first tab (Newest) will be displayed
    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);
