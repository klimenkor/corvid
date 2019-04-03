var moment = require('moment');
// var Jimp = require('jimp');

// function getAlarmLabels(enabled, detected) {
//     let labels = []
//     detected.forEach( dl => {
//         let found = enabled.find(el => { return el.Name == dl.Name; });
//         if(found) {
//             labels.push(found.Name);
//         }
//     });
//     return labels;
// }

// function dateToString(date) {
//     var year = date.getFullYear().toString();
//     var month = date.getMonth().toString();
//     var day = date.getDate().toString();
//     var hour = date.getHour().toString();
//     var minutes = date.getMinutes().toString();
//     var seconds = date.getSeconds().toString();

//     if (parseInt(month) < 10) month = "0" + month;
//     if (parseInt(day) < 10) day = "0" + day;

//     return ('0' + date.month).slice(-2) + '/' + ('0' + date.day).slice(-2) + '/' + year  + ' ' + date.hour + ':' + date.minutes + ':' + date.seconds;
// }

// function formatAlarmMessage(cameraName, labels) {
//     let labelsString = labels.join(',');
//     return cameraName + ': ' + labelsString + ' recorded on ' + dateToString(new Date()) + ' (ikncu)';
// }

// enabled = [];
// detected = null;

// console.log(formatAlarmMessage('test',['1','2','3']))
//let d = new Date()
//console.log(d.toLocaleDateString(), d.toLocaleTimeString())

// let Width=  0.024836357682943344;
// let Height= 0.058885764330625534;
// let Left= 0.6026195883750916;
// let Top= 0.14392173290252686;

// var image = new Jimp("E:\\dev\\corvid\\test2.jpg", function (err, image) {
//     var w = image.bitmap.width; // the width of the image
//     var h = image.bitmap.height; // the height of the image
//     var cx = Left * w;
//     var cy = Top * h;
//     var cw = Width * w;
//     var ch = Height * w;
//     console.log(image.bitmap.data);
//     image.crop( cx, cy, cw, ch );
//     image.getBuffer(Jimp.MIME_JPEG, (err,res)=> {
//        console.log(res)     
//     });
//     //image.write("E:\\dev\\corvid\\test2-face.jpg")
// });

// const nDate = new Date().toLocaleString('en-US', {
//     timeZone: 'America/Los_Angeles'
//   });
  
// const d = new Date();
// console.log(moment().utcOffset());
console.log(moment().format("YYYYMMDDHHmmss"));

//console.log(Math.round(parseFloat('12121.1212111212')))