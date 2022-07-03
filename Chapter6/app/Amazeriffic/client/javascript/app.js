let main = function (toDoObjects) {
    "use strict";
    let toDos = toDoObjects.map(function (toDo) { // we'll just return the description // of this toDoObject
        return toDo.description;
    });

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
            else if ($element.parent().is(":nth-child(3)")) { // THIS IS THE TAGS TAB CODE
                console.log("the tags tab was clicked!");

                let organizedByTag = organizeByTags(toDoObjects);
                organizedByTag.forEach(function (tag) {
                    let $tagName = $("<h3>").text(tag.name),
                    $content = $("<ul>");

                    tag.toDos.forEach(function (description) {
                        let $li = $("<li>").text(description);
                        $content.append($li);
                    });

                    $("main .content").append($tagName);
                    $("main .content").append($content);
                });
            }
            // Add tab
            else if ($element.parent().is(":nth-child(4)")) {
                let $input =
                    $("<input>").addClass("description"),
                    $inputLabel = $("<p style='background: #eee;'>").text("Description: "),
                    $tagInput = $("<input>").addClass("tags"),
                    $tagLabel = $("<p style='background: #eee;'>").text("Tags: "),
                    $button = $("<button>").text("+");

                $button.on("click", function () {
                    var description = $input.val(),

                    // split on the comma
                    tags = $tagInput.val().split(",");

                    toDoObjects.push({"description":description, "tags":tags});

                    // update toDos
                    toDos = toDoObjects.map(function (toDo) {
                        return toDo.description;
                    });

                    $input.val("");
                    $tagInput.val("");
                });

                $content = $("<div>").append($inputLabel)
                                     .append($input)
                                     .append($tagLabel)
                                     .append($tagInput)
                                     .append($button);
            }

            $("main .content").append($content);
            return false;
        });
    });
    // When the page loads, the first tab (Newest) will be displayed
    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        // call main with the to-dos as an argument
        main(toDoObjects);
    });
});


let organizeByTags = function (toDoObjects) { /* the first part from above */
    // create an empty tags array
    var tags = [];

    // iterate over all toDos
    toDoObjects.forEach(function (toDo) {
        // iterate over each tag in this toDos
        toDo.tags.forEach(function (tag) {
            // make sure the tag is not already in the tag array
            if (tags.indexOf(tag) === -1) {
                tags.push(tag);
            }
        });
    });
    console.log(tags);

    let tagObjects = tags.map(function (tag) {
        // here we find all the to-do objects that contain that tag
        let toDosWithTag = [];
        toDoObjects.forEach(function (toDo) {
            // check to make sure the result
            // of indexOf is *not* equal to -1
            if (toDo.tags.indexOf(tag) !== -1) {
                toDosWithTag.push(toDo.description);
            }
        });
        // we map each tag to an object that contains the name of the tag and an array
        return { "name": tag, "toDos": toDosWithTag };
    });
    console.log(tagObjects);
    return tagObjects;
};
