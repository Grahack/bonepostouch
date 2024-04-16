var partial = 1;

var notes = [
    // partial 1
    ["Bb/A#", "A", "Ab/G#", "G", "F#/Gb", "F", "E"],
    // partial 2
    ["F", "E", "Eb/D#", "D", "C#/Db", "C", "B"],
    // partial 3
    ["Bb/A#", "A", "Ab/G#", "G", "F#/Gb", "F", "E"],
    // partial 4
    ["D", "C#/Db", "C", "B", "Bb/A#", "A", "Ab/G#"],
    // partial 5
    ["F", "E", "Eb/D#", "D", "C#/Db", "C", "B"],
    // partial 6
    ["Ab/G#", "G", "F#/Gb", "F", "E", "Eb/D#", "D"],
    // partial 7
    ["Bb/A#", "A", "Ab/G#", "G", "F#/Gb", "F", "E"],
    // partial 8
    ["C", "B", "Bb/A#", "A", "Ab/G#", "G", "Gb/F#"],
    // partial 9
    ["D", "C#/Db", "C", "B", "Bb/A#", "A", "Ab/G#"],
    // partial 10
    ["E", "Eb/D#", "D", "C#/Db", "C", "B", "Bb/A#"]];

function action(name) {
    const lastIndex = name.lastIndexOf('_');
    const type = name.slice(0, lastIndex);
    const number = name.slice(lastIndex + 1);
    switch (type) {
        case 'rect_pos':
            return function () {
                SVGs['note'].firstChild.textContent = notes[partial-1][number-1];
            };
        case 'rect_partial':
            return function () {
                // partial navigation buttons:
                // #1  up  #2
                // #3 down #4
                if (number <= 2 && partial < 10) partial = partial + 1;
                if (number >= 3 && partial > 1)  partial = partial - 1;
                console.log("Partial num:", partial);
                SVGs['partial_num'].firstChild.textContent = partial;
                SVGs['note'].firstChild.textContent = "";
            };
    }
}

// SVG elements
const NS = 'http://www.w3.org/2000/svg';
var main_frame = document.createElementNS(NS, 'svg');
var SVGs = {
    main_line : document.createElementNS(NS, 'line'),
    partial_num : document.createElementNS(NS, 'text'),
    note : document.createElementNS(NS, 'text'),
    main_rect : document.createElementNS(NS, 'rect')
};

for (let i = 1; i <= 2; i++) {
    var name = 'line_pos_' + i;
    SVGs[name] = document.createElementNS(NS, 'line');
} 
for (let i = 1; i <= 7; i++) {
    var name = 'rect_pos_' + i;
    SVGs[name] = document.createElementNS(NS, 'rect');
    SVGs[name].addEventListener("mouseup", action(name));
} 
for (let i = 1; i <= 4; i++) {
    var name = 'rect_partial_' + i;
    SVGs[name] = document.createElementNS(NS, 'rect');
    SVGs[name].addEventListener("mouseup", action(name));
} 
// list of coeffs
// 0 0.12 0.26 0.42 0.59 0.78 1

function adjust_size() {
    var screen_W  = window.innerWidth ||
        document.documentElement.clientWidth || 
        document.body.clientWidth;
    var screen_H = window.innerHeight ||
        document.documentElement.clientHeight || 
        document.body.clientHeight;
    console.log("Screen size:", screen_W, screen_H);
    const margin = 5;
    // set up the 16:9 shape (U for unified)
    const U_W = screen_W / 9;
    const U_H = screen_H / 16;
    const small_side = (U_W < U_H)? 'w' : 'h';
    console.log("Small side is:", small_side);
    var W = 0;
    var H = 0;
    if (small_side == 'h') {
        W = Math.floor(screen_H / 16 * 9);
        H = screen_H;
    } else {
        W = screen_W;
        H = Math.floor(screen_W / 9 * 16);
    }
    console.log("Main frame size:", W, H);
    main_frame.setAttribute('viewBox', '0 0 ' + screen_W + ' ' + screen_H);
    
    // configure the elements
    SVGs['main_rect'].setAttribute('fill', 'none');
    SVGs['main_rect'].setAttribute('stroke', 'black');
    SVGs['main_rect'].setAttribute('x', screen_W / 2 - W / 2 + margin);
    SVGs['main_rect'].setAttribute('y', screen_H / 2 - H / 2 + margin);
    SVGs['main_rect'].setAttribute('width', W-2*margin);
    SVGs['main_rect'].setAttribute('height', H-2*margin);

    SVGs['main_line'].setAttribute('stroke', 'black');
    SVGs['main_line'].setAttribute('stroke-width', 8);
    SVGs['main_line'].setAttribute('stroke-linecap', 'round');
    SVGs['main_line'].setAttribute('x1', screen_W / 2);
    SVGs['main_line'].setAttribute('y1', screen_H / 2 - H/2 + H/14);
    SVGs['main_line'].setAttribute('x2', screen_W / 2);
    SVGs['main_line'].setAttribute('y2', screen_H - H/14);

    SVGs['partial_num'].setAttribute('stroke', 'black');
    SVGs['partial_num'].setAttribute('stroke-width', 1);
    SVGs['partial_num'].setAttribute('stroke-linecap', 'round');
    SVGs['partial_num'].setAttribute('x', screen_W / 2 - W/2 + W/6);
    SVGs['partial_num'].setAttribute('y', screen_H / 2 - H/2 + 3*H/7);
    SVGs['partial_num'].setAttribute('font-size', W / 15);
    SVGs['partial_num'].setAttribute('text-anchor', 'middle');
    var textNode = document.createTextNode(partial);
    SVGs['partial_num'].appendChild(textNode);

    SVGs['note'].setAttribute('stroke', 'black');
    SVGs['note'].setAttribute('stroke-width', 1);
    SVGs['note'].setAttribute('stroke-linecap', 'round');
    SVGs['note'].setAttribute('x', screen_W / 2 + W/3);
    SVGs['note'].setAttribute('y', screen_H / 2 - H/2 + 3*H/7);
    SVGs['note'].setAttribute('font-size', W / 15);
    SVGs['note'].setAttribute('text-anchor', 'middle');
    var textNode = document.createTextNode("");
    SVGs['note'].appendChild(textNode);

    for (let i = 1; i <= 2; i++) {
        var name = 'line_pos_' + i;
        var y = (i-1) * 2 * H/7 + H/3 + 4*margin;
        SVGs[name].setAttribute('x1', screen_W / 2 - W / 6);
        SVGs[name].setAttribute('y1', y);
        SVGs[name].setAttribute('x2', screen_W / 2 + W / 6);
        SVGs[name].setAttribute('y2', y);
        SVGs[name].setAttribute('stroke', 'black');
        SVGs[name].setAttribute('stroke-width', 8);
        SVGs[name].setAttribute('stroke-linecap', 'round');
    } 

    for (let i = 1; i <= 7; i++) {
        var name = 'rect_pos_' + (8-i);
        SVGs[name].setAttribute('fill', 'red');
        SVGs[name].setAttribute('fill-opacity', 0);
        SVGs[name].setAttribute('stroke', 'none');
        SVGs[name].setAttribute('stroke-width', 1);
        SVGs[name].setAttribute('stroke-dasharray', '5, 15');
        SVGs[name].setAttribute('stroke-linecap', 'round');
        SVGs[name].setAttribute('x', screen_W / 2 - W / 6);
        SVGs[name].setAttribute('y', (i-1) * H/7 + margin);
        SVGs[name].setAttribute('width', W / 3);
        SVGs[name].setAttribute('height', (H-2*margin)/7);
    } 

    var x1 = screen_W / 2 - W / 2 + margin;
    var x2 = x1 + 2 * (W-margin) / 3;
    var y1 = 4 * H/7 + margin;
    var y2 = 6 * H/7 + margin;
    for (let i = 1; i <= 4; i++) {
        var name = 'rect_partial_' + i;
        SVGs[name].setAttribute('fill', 'red');
        SVGs[name].setAttribute('fill-opacity', 0);
        SVGs[name].setAttribute('stroke', 'none');
        SVGs[name].setAttribute('stroke-width', 1);
        SVGs[name].setAttribute('stroke-dasharray', '5,15');
        SVGs[name].setAttribute('stroke-linecap', 'round');
        switch (i) {
            case 1:
                SVGs[name].setAttribute('x', x1);
                SVGs[name].setAttribute('y', y1);
                break;
            case 2:
                SVGs[name].setAttribute('x', x2);
                SVGs[name].setAttribute('y', y1);
                break;
            case 3:
                SVGs[name].setAttribute('x', x1);
                SVGs[name].setAttribute('y', y2);
                break;
            case 4:
                SVGs[name].setAttribute('x', x2);
                SVGs[name].setAttribute('y', y2);
                break;
        }
        SVGs[name].setAttribute('width', W / 3);
        SVGs[name].setAttribute('height', (H-2*margin)/7);
    } 
}

// add all the elements to the main frame
for (const [key, value] of Object.entries(SVGs)) {
    main_frame.appendChild(value);
}

document.body.appendChild(main_frame);
window.addEventListener('resize', adjust_size, true);
adjust_size();
console.log(SVGs);
