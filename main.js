var myNodelist = document.getElementsByTagName("LI");
var i;

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;

for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        console.log('Closing');
        var div = this.parentElement;
        div.style.display = "none";
    }
}

let completeWorkoutText = [];

// Create a new list item when clicking on the "Add" button
function newExercise() {

    var li = document.createElement("li");
    var inputExercise = document.getElementById("exerciseInput").value;
    var inputSets = document.getElementById("setsInput").value;
    var inputReps = document.getElementById("repsInput").value;
    var exerciseName = document.createTextNode(inputExercise + ' - ' + inputSets + ' Sets - ' + inputReps);
    var exerciseNameText = (inputExercise + ' - ' + inputSets + ' Sets - ' + inputReps);

    if (inputExercise === '') {
        Swal.fire({
            title: 'Warning!',
            text: 'You must write an exercise!',
            icon: 'warning',
            confirmButtonText: 'Close',
            confirmButtonColor: 'rgb(33, 37, 41)'
        })
    }

    else if (inputSets === '' || inputSets == 0) {
        Swal.fire({
            title: 'Warning!',
            text: 'You must write how many sets!',
            icon: 'warning',
            confirmButtonText: 'Close',
            confirmButtonColor: 'rgb(33, 37, 41)'
        })
    }

    else if (inputReps === '' || inputReps == 0) {
        Swal.fire({
            title: 'Warning!',
            text: 'You must write how many reps, minutes or seconds!',
            icon: 'warning',
            confirmButtonText: 'Close',
            confirmButtonColor: 'rgb(33, 37, 41)'
        })
    }

    else {
        document.getElementById("exerciseList").appendChild(li);
        completeWorkoutText.push(exerciseNameText);
        console.log(completeWorkoutText);

        li.appendChild(exerciseName);
        console.log(exerciseName);

        document.getElementById('workout1').innerHTML = completeWorkoutText[0];
    }

    function noExercise() {
        console.log('foco')
    }

    document.getElementById("exerciseInput").value = "";
    document.getElementById("setsInput").value = "";
    document.getElementById("repsInput").value = "";


    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            console.log('Closing');
            var div = this.parentElement;
            div.style.display = "none";
            completeWorkoutText.shift();
        }
    }
}

function startWorkout() {
    if (completeWorkoutText == '') {
        Swal.fire({
            title: 'Warning!',
            text: 'You must write an exercise, or upload your routine!',
            icon: 'warning',
            confirmButtonText: 'Close',
            confirmButtonColor: 'rgb(33, 37, 41)'
        })

    }
    else {
        document.getElementById('exerciseCard').remove();
        document.getElementById('workoutCard').remove();
        document.getElementById("TestsDiv").style.display = 'block';
    }
}

let n = 0

function nextWorkout() {

    if (n < completeWorkoutText.length - 1) {
        console.log(n);
        console.log(completeWorkoutText.length);
        console.log(completeWorkoutText[n + 1]);
        document.getElementById('workout1').innerHTML = completeWorkoutText[n + 1];
        count = 0;
        updateDisplay();
        reset();
        n++;
    }
    else {
        Swal.fire({
            title: 'You finished your workout!',
            text: 'Please click the finish button',
            icon: 'info',
            confirmButtonText: 'Close',
            confirmButtonColor: 'rgb(33, 37, 41)'
        })
    }
}

function finishWorkout() {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Yes, i'm done!",
        cancelButtonText: 'Not yet!',
        cancelButtonColor: 'rgb(33, 37, 41)',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("TestsDiv").remove();
    document.getElementById("TestsDiv2").style.display = 'block';
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
        
        }
    })

}

function saveWorkout(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function downloadContract() {
    console.log(completeWorkoutText)
    saveWorkout("RoutinizeWorkout.txt", completeWorkoutText);
}

function readFile(input) {
    let file = input.files[0];
    let reader = new FileReader();
    let result = "";
    reader.readAsText(file);
    reader.onload = function () {
        console.log(reader.result);
        result = reader.result;
    };
    reader.onerror = function () {
        console.log(reader.error);
    };

    let textByLine = result.split(",");
    console.log(textByLine);

}


function loadFile(input) {

    let file = input.files[0];
    let result = "";

    let data = new Promise((resolve, reject) => {

        let reader = new FileReader();
        reader.readAsText(file);

        reader.onload = async function () {
            result = reader.result;
            resolve(result)
        };

        reader.onerror = function () {
            reject(error);
        };
    });

    data.then(result => {
        console.table(result.split(','));
        completeWorkoutText = result.split(',')
        document.getElementById('workout1').innerHTML = completeWorkoutText[0];
        document.getElementById("showSuccess").style.display = 'block';
        document.getElementById('uploadSuccessful').innerHTML = "Upload succesful, you may start your workout now!"
    }).catch(error => {
        console.error(error);
    });

}

function showDiv(divId, divId2, element) {
    document.getElementById(divId).style.display = element.value == 1 ? 'block' : 'none';
    document.getElementById(divId2).style.display = element.value == 2 ? 'block' : 'none';
}

// Counter
let counterDisplayElem = document.querySelector('.counter-display');
let counterMinusElem = document.querySelector('.counter-minus');
let counterPlusElem = document.querySelector('.counter-plus');
let counterPlus5 = document.querySelector('.counter-plus-5');
let counterPlus10 = document.querySelector('.counter-plus-10');

let count = 0;

updateDisplay();

counterPlusElem.addEventListener("click", () => {
    count++;
    updateDisplay();
}

);

counterPlus5.addEventListener("click", () => {
    count = count + 5;
    updateDisplay();
}

);

counterPlus10.addEventListener("click", () => {
    count = count + 10;
    updateDisplay();
}

);

counterMinusElem.addEventListener("click", () => {
    count--;
    updateDisplay();
}

);

function updateDisplay() {
    counterDisplayElem.innerHTML = count;
}

// Stopwatch

// Convert time to a format of hours, minutes, seconds, and milliseconds

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Declare variables to use in our functions below

let startTime;
let elapsedTime = 0;
let timerInterval;

// Create function to modify innerHTML

function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

// Create "start", "pause" and "reset" functions

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton("PAUSE");
}

function pause() {
    clearInterval(timerInterval);
    showButton("PLAY");
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    showButton("PLAY");
}

// Create function to display buttons

function showButton(buttonKey) {
    const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
    const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
    buttonToShow.style.display = "block";
    buttonToHide.style.display = "none";
}
// Create event listeners

let playButton = document.getElementById("playButton");
let pauseButton = document.getElementById("pauseButton");
let resetButton = document.getElementById("resetButton");

playButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);