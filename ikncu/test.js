function getAlarmLabels(enabled, detected) {
    let labels = []
    detected.forEach( dl => {
        let found = enabled.find(el => { return el.Name == dl.Name; });
        if(found) {
            labels.push(found.Name);
        }
    });
    return labels;
}

function dateToString(date) {
    var year = date.getFullYear().toString();
    var month = date.getMonth().toString();
    var day = date.getDate().toString();
    var hour = date.getHour().toString();
    var minutes = date.getMinutes().toString();
    var seconds = date.getSeconds().toString();

    if (parseInt(month) < 10) month = "0" + month;
    if (parseInt(day) < 10) day = "0" + day;

    return ('0' + date.month).slice(-2) + '/' + ('0' + date.day).slice(-2) + '/' + year  + ' ' + date.hour + ':' + date.minutes + ':' + date.seconds;
}

function formatAlarmMessage(cameraName, labels) {
    let labelsString = labels.join(',');
    return cameraName + ': ' + labelsString + ' recorded on ' + dateToString(new Date()) + ' (ikncu)';
}

enabled = [];
detected = null;

// console.log(formatAlarmMessage('test',['1','2','3']))
let d = new Date()
 console.log(d.toLocaleDateString(), d.toLocaleTimeString())