// create a variable to store the calendar info
var savedCalInfo = [
    {time: "9am",
    text: ""},
    {time: "10am",
    text: ""},
    {time: "11am",
    text: ""},
    {time: "12pm",
    text: ""},
    {time: "1pm",
    text: ""},
    {time: "2pm",
    text: ""},
    {time: "3pm",
    text: ""},
    {time: "4pm",
    text: ""},
    {time: "5pm",
    text: ""},
];

// use moment to generate the current date and display in the currentDay p element
$("#currentDay").text(moment().format("MMMM Do, YYYY"))

// change p to textarea when clicked in
$(".description").on("click", function(){   
    //console.log($(this).attr("id"))
    // create textarea element
    var textInput = $("<textarea>").attr("rows", 2).attr("cols", 50);
    textInput.val($(this).find("p").text());
    // replace p tag with textarea
    ($(this).find("p")).replaceWith(textInput);
    textInput.trigger("focus");
})

// save tasks when save button clicked
$(".saveBtn").on("click", function(){
    // get parent row
    var parent = $(this).closest(".calendar-row");
    // get value from textarea
    var textInput = parent.find("textarea").val();
    // create p with the same text 
    var textElement = $("<p>").text(textInput);
    // replace textarea with p
    parent.find("textarea").replaceWith(textElement);
    // get index from parent id
    var rowIndex = parent.attr("data-list-id");
    // save time and text information to array
    savedCalInfo[rowIndex].text = textInput;
    // console.log(savedCalInfo);
})