function calculate() {
    var hours = document.getElementById("hours").value;
    var minutes = document.getElementById("minutes").value;
    var seconds = document.getElementById("seconds").value;
    
    var distance = document.getElementById("distance").value;
    var distanceUnits = document.getElementById("distance-units").value;
    var predictionDistance = document.getElementById("prediction-distance").value;
    var predictionDistanceUnits = document.getElementById("prediction-distance-units").value;

    var time = toSeconds(hours, minutes, seconds);

    document.getElementById("cameron-time").innerHTML = 
    toOutput(cameron(time, toKM(distance, distanceUnits) * 1000, toKM(predictionDistance, predictionDistanceUnits) * 1000));
    document.getElementById("riegel-time").innerHTML = 
    toOutput(riegel(time, toKM(distance, distanceUnits), toKM(predictionDistance, predictionDistanceUnits)));
}

function toKM(distance, units) {
    if (units.normalize() === "km") {
        return distance;
    }
    else if (units.normalize() === "m") {
        return distance / 1000;
    }
    else {
        return distance * 1.609;
    }
} 

function toSeconds(hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds * 1;
}
function toOutput(seconds) {
    if (seconds < 3600) {
        return new Date(seconds * 1000).toISOString().substr(14, 5);
    }
    else {
        return new Date(seconds * 1000).toISOString.substr(11,8);
    }
}

function riegel(time, distance, predictionDistance) {
    return time * Math.pow(predictionDistance / distance, 1.06);
}
function cameron(time, distance, predictionDistance) {
    return (time / distance) * predictionDistance * 
    (f(distance) / f(predictionDistance));
}
function f(distance) {
    return 13.49681 - (0.000030363 * distance) + 
    (835.7114 / Math.pow(distance, 0.7905));
}