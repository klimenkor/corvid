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

enabled = [];
detected = null;

console.log(getAlarmLabels(enabled,detected))