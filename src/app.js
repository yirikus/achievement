const version = '28.10.2020, 12:51 (v1 - drawing achievements)';
const main = () => {
    writeElement('version', version);
    writeElement('main', accordion(ACHIEVEMENTS));
}

let counter = 0;

const newId = (id) => {
    counter++;
    return '' + id + counter;
}

const dataSet = (id) => {
    $('.nav-link').removeClass('active');
    if (id) {
        $('#'+id).addClass('active');
        writeElement('main', accordion(ACHIEVEMENTS, DATA[id.toUpperCase()].achievements));
    } else {
        $('#all').addClass('active');
        writeElement('main', accordion(ACHIEVEMENTS));
    }
}

const accordion = (achievements, data) => {
    if (!achievements || (typeof achievements) === 'string') {
        return achievements;
    }
    let accordion = '<div class="accordion" id="' + newId('accordion') + '">';
    for (let entry in achievements) {
        if (!data) {
            accordion += card(achievements[entry]);
        } else if (data && data[entry]) {
            accordion += card(achievements[entry], data[entry]);
        }
    }
    accordion += '</div>'
    return accordion;
}
const card = (entry, data) => {
    let cardElement =  '<div class="card" id="#card_id"><div class="card-header" id="#card_heading_id">' +
        '<h2 class="mb-0"><button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" ' +
        'data-target="##collapseId" aria-expanded="false" aria-controls="#collapseId">#card_heading</button></h2></div>' +
        '<div id="#collapseId" class="collapse" aria-labelledby="#card_heading_id" ><div class="card-body">#card_body</div><div class="card-progess">#card_progress</div></div></div>';
    return cardElement
        .replaceAll('#card_id', newId('card'))
        .replaceAll('#collapseId', newId('collapse'))
        .replaceAll('#card_heading_id', newId('cardHeading'))
        .replaceAll('#card_body', accordion(entry.body, data))
        .replaceAll('#card_progress', progressBar(entry.target, data && data.done))
        .replaceAll('#card_heading', entry.heading);
}

const progressBar = (target, done) => {
    if (!target) {
        return "";
    }
    return '<div class="progress"><div class="progress-bar" style="width: ' + Math.round((done/target) * 100) + '%" role="progressbar" aria-valuenow="'
        + done + '" aria-valuemin="0" aria-valuemax="'
        + target +'">' + done + '/' + target + '</div></div>';
}

const addPreferencesToContext = () => {
    let elements = $('.preference');
    for(let i = 0; i < elements.length; i++) {
        let val = $(elements[i]).val();
        if (val) {
            addToContext(elements[i].id, val);
        }
    }
}

const writeElement = (elementId, value) => {
    document.getElementById(elementId).innerHTML = value;
}

const writeList = (grammar, count) => {
    let innerHtml = '<ul class="list-group">';
    for (let i = 0; i < count; i++) {
        innerHtml += '<li class="list-item">';  
        innerHtml += generateWord(grammar);         
        innerHtml += '</li>'; 
    }
    innerHtml += '</ul>'; 
    return innerHtml;
}

main();