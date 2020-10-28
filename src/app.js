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

const accordion = (data) => {
    if (!data || (typeof data) === 'string') {
        return data;
    }
    let accordion = '<div class="accordion" id="' + newId('accordion') + '">';
    for (let entry in data) {
        accordion += card(data[entry]);
    }
    accordion += '</div>'
    return accordion;
}
const card = (entry, ) => {
    let cardElement =  '<div class="card" id="#card_id"><div class="card-header" id="#card_heading_id">' +
        '<h2 class="mb-0"><button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" ' +
        'data-target="##collapseId" aria-expanded="false" aria-controls="#collapseId">#card_heading</button></h2></div>' +
        '<div id="#collapseId" class="collapse" aria-labelledby="#card_heading_id" ><div class="card-body">#card_body</div></div></div>';
    return cardElement
        .replaceAll('#card_id', newId('card'))
        .replaceAll('#collapseId', newId('collapse'))
        .replaceAll('#card_heading_id', newId('cardHeading'))
        .replaceAll('#card_body', accordion(entry.body))
        .replaceAll('#card_heading', entry.heading);
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