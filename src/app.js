const version = '28.10.2020, 12:51 (v1 - drawing achievements)';
const main = () => {
    writeElement('version', version);
    writeElement('main', accordion(LESSONS));
    writeElement('data', navItems(LESSONS));
}

let counter = 0;

const newId = (id) => {
    counter++;
    return '' + id + counter;
}

const navItems = () => {
    let html = '<li class="nav-item"><a class="nav-link active" id="all" href="#" onclick="dataSet()">Home</a></li>';

    for (let entry in DATA) {
        html += '<li class="nav-item"><a class="nav-link" id="' + entry + '" href="#" onclick="dataSet(\''+entry+'\')">' +
            '<span class="name">' + DATA[entry].name + '</span>' +
            '<span class="badge badge-pill badge-primary">' + points(DATA[entry]) + '</span></a></li>'
    }

    return html;
}

const points = (userData) => {
    let totalPoints = 0;
    for (let group in userData.achievements) {
        for (let task in userData.achievements[group]) {
            let done = userData.achievements[group][task].done;
            if (done) {
                totalPoints += (LESSONS[group].body[task].value || 10) * done;
            }
        }
    }
    return totalPoints;
}

const dataSet = (id) => {
    $('.nav-link').removeClass('active');
    if (id) {
        $('#'+id).addClass('active');
        writeElement('main', achievements(LESSONS, DATA[id.toUpperCase()].achievements));

    } else {
        $('#all').addClass('active');
        writeElement('main', accordion(LESSONS));
    }
}

const accordion = (lessons, data) => {
    if (!lessons || (typeof lessons) === 'string') {
        return lessons;
    }
    let accordion = '<div class="accordion" id="' + newId('accordion') + '">';
    for (let entry in lessons) {
        if (!data) {
            accordion += card(lessons[entry]);
        } else if (data && data[entry]) {
            accordion += card(lessons[entry], data[entry]);
        }
    }
    accordion += '</div>'
    return accordion;
}
const card = (entry, data) => {
    let cardElement =  '<div class="card" id="#card_id"><div class="card-header" id="#card_heading_id">' +
        '<h2 class="mb-0"><button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" ' +
        'data-target="##collapseId" aria-expanded="false" aria-controls="#collapseId">#card_heading</button></h2></div>' +
        '<div id="#collapseId" class="collapse" aria-labelledby="#card_heading_id" ><div class="card-body">#card_body</div></div></div>';
    return cardElement
        .replaceAll('#card_id', newId('card'))
        .replaceAll('#collapseId', newId('collapse'))
        .replaceAll('#card_heading_id', newId('cardHeading'))
        .replaceAll('#card_body', accordion(entry.body, data))
        .replaceAll('#card_heading', entry.heading);
}

const achievements = (lessons, data) => {

    let html = '';
    for (let entry in lessons) {
        if (lessons[entry].target) {
          html+=achievement(lessons[entry], data && data[entry]);
        } else {
          html += '<h2>' + lessons[entry].heading + '</h2>';
          html += achievements(lessons[entry].body, data && data[entry]);
        }
    }
    return html;
}

const achievement = (lesson, data) => {
    let statusClass = 'navbar-none';
     if (data && data.done >= lesson.target) {
        statusClass = '';
    } else if (data && data.done > 0) {
         statusClass = 'navbar-light';
     }
    return '<nav class="navbar ' + statusClass + '">' + lesson. heading + progressBar(lesson.target, (data && data.done) || 0) + '</nav>'
}

const progressBar = (target, done) => {
    if (!target) {
        return "";
    }
    let progressClass = (done >= target) ? 'bg-success': '';
    return '<div class="progress"><div class="progress-bar ' + progressClass + '" style="width: ' + Math.round((done/target) * 100) + '%" role="progressbar" aria-valuenow="'
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