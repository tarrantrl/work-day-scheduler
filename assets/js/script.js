// create a variable to store the calendar info
var savedCalInfo = [
    {time: "9am",
    text: "",
    mtime: "9:00",},
    {time: "10am",
    text: "",
    mtime: "10:00",},
    {time: "11am",
    text: "",
    mtime: "11:00",},
    {time: "12pm",
    text: "",
    mtime: "12:00",},
    {time: "1pm",
    text: "",
    mtime: "13:00",},
    {time: "2pm",
    text: "",
    mtime: "14:00",},
    {time: "3pm",
    text: "",
    mtime: "15:00",},
    {time: "4pm",
    text: "",
    mtime: "16:00",},
    {time: "5pm",
    text: "",
    mtime: "17:00",}
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
    // save the changes
    saveCalInfo();
})

// save the calendar info to local storage
var saveCalInfo = function(){
    localStorage.setItem("calInfo", JSON.stringify(savedCalInfo));
}

var loadCalInfo = function(){
    savedCalInfo = JSON.parse(localStorage.getItem("calInfo"));
    if (!savedCalInfo){
        savedCalInfo = [
            {time: "9am",
            text: "",
            mtime: "9:00",},
            {time: "10am",
            text: "",
            mtime: "10:00",},
            {time: "11am",
            text: "",
            mtime: "11:00",},
            {time: "12pm",
            text: "",
            mtime: "12:00",},
            {time: "1pm",
            text: "",
            mtime: "13:00",},
            {time: "2pm",
            text: "",
            mtime: "14:00",},
            {time: "3pm",
            text: "",
            mtime: "15:00",},
            {time: "4pm",
            text: "",
            mtime: "16:00",},
            {time: "5pm",
            text: "",
            mtime: "17:00",},
        ]; 
    }
    // loop over each item in the array
    $.each(savedCalInfo, function(index){
        // get the time
        var time = savedCalInfo[index].time;
        // create a selector for the description div
        var selector = "#" + time + "-text";
        // set the text at that selector
        $(selector).find("p").text(savedCalInfo[index].text);
    })
}

var colorCodeCals = function(){
    // get the current time
    var currentTime = moment();
    // go through each time in the array
    $.each(savedCalInfo, function(index){
        // get the time of div
        var time = savedCalInfo[index].mtime;
        // get current moment
        var current = moment();
        // get the current date
        var calDate = moment().format("YYYY-MM-DD")
        // add the current time
        var calDateTime = moment(calDate + " " + time);
        // for testing, set current to 12pm
        //current = moment(calDate + " 12:00");
        // get time for select
        var selectTime = savedCalInfo[index].time;
        // create a selector for the description div
        var selector = "#" + selectTime + "-text";
        // remove old classes
        $(selector).removeClass("past");
        $(selector).removeClass("present");
        $(selector).removeClass("future");
        // console.log(selector);
        // console.log($(selector));
        // determine time difference in hours
        var timeDiff = calDateTime.diff(current, "hours");
        // if time diff is 0, set class to present 
        if (timeDiff === 0){
            $(selector).addClass("present");
        }
        // else if time diff is negative, set class to past
        else if (timeDiff < 0){
            $(selector).addClass("past");
        }
        // else set to future
        else {
            $(selector).addClass("future");
        }
    })
}

loadCalInfo();
// load initial colors
colorCodeCals();
// reload colors every 10 minutes
setInterval(function(){
    colorCodeCals();
    console.log("load");
}, (1000*60)*10)