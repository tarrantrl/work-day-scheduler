// create a variable to store the calendar info
var savedCalInfo = [];

// use moment to generate the current date and display in the currentDay p element
$("#currentDay").text(moment().format("MMMM Do, YYYY"))

// change p to textarea when clicked in
$(".description").on("click", function(){   
    //console.log($(this).attr("id"))
    // create textarea element
    var textInput = $("<textarea>").attr("rows", 2).attr("cols", 50);
    // replace p tag with textarea
    ($(this).find("p")).replaceWith(textInput);
})

// save tasks when save button clicked
$(".saveBtn").on("click", function(){
    // get value from textarea
    var parent = $(this).closest(".calendar-row");
    var textInput = parent.find("textarea").val();
    // create p with the same text 
    var textElement = $("<p>").text(textInput);
    parent.find("textarea").replaceWith(textElement);
})