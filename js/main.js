var canvas = document.getElementById('stage-container');
var lineColorPicker = document.getElementById('line-color');
var lineThicknessSelect = document.getElementById('line-thickness');

var mouseIsDown = false;
var mouseDownX = 0;
var mouseDownY = 0;
const lsLineThickness = 'lineThickness';
const lsLineColor = 'selectedLineColor';
var selectedLineColor = window.localStorage.getItem(lsLineColor) ?? '#000000';
var lineThickness = window.localStorage.getItem(lsLineThickness);
initConfigFields();

stage = acgraph.create('stage-container');

renderField();

window.onresize = renderField;
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mouseup', mouseUp);

lineColorPicker.addEventListener('change', changeLineColor);
lineThicknessSelect.addEventListener('change', changeLineThickness);

function renderField() {
var canvas = document.getElementById('stage-container');
    var length = canvas.clientHeight;
    var width = canvas.clientWidth;
    var courtwidth = width;
    var courtlength = length;
    var courtInnerWidth = courtwidth - 40;
    var courtInnerlength = courtlength - 30;
    var fieldWidth = courtInnerWidth + 20;
    var fieldLength = courtlength - 15;
    let lineThickness = 4;

    stage.rect(0, 0, width, length).fill('#00cc66').stroke('#FFFFFF', lineThickness);
    stage.rect(20, 15, courtInnerWidth, courtInnerlength).fill('#00cc66').stroke('#FFFFFF', lineThickness);

    const tramRailsPercent = 0.1;
    stage.path().moveTo(courtInnerWidth * tramRailsPercent + 20, 15).lineTo(courtInnerWidth * tramRailsPercent +20, fieldLength).stroke('#FFFFFF', lineThickness); //left vertical line
    stage.path().moveTo(courtInnerWidth * 0.5 + 20, 15).lineTo(courtInnerWidth * 0.5 + 20, fieldLength).stroke('#FFFFFF', lineThickness); //middle vertical line
    stage.path().moveTo(courtInnerWidth - (courtInnerWidth * tramRailsPercent) + 20, 15).lineTo(courtInnerWidth - (courtInnerWidth * tramRailsPercent) + 20, fieldLength).stroke('#FFFFFF', lineThickness); //right vertical line

    stage.path().moveTo(20, courtInnerlength * 0.08).lineTo(fieldWidth, courtInnerlength * 0.08).stroke('#FFFFFF', lineThickness); //Back line

    stage.path().moveTo(20, courtInnerlength * 0.35).lineTo(fieldWidth, courtInnerlength * 0.35).stroke('#FFFFFF', lineThickness); //service line top

    stage.path().moveTo(20, courtInnerlength * 0.50).lineTo(fieldWidth, courtInnerlength * 0.5).stroke('#FFFFFF', 3, "10 12"); //middle line

    stage.path().moveTo(20, courtInnerlength * 0.65).lineTo(fieldWidth, courtInnerlength * 0.65).stroke('#FFFFFF', lineThickness); //service line bottom

    stage.path().moveTo(20, courtInnerlength * 0.94).lineTo(fieldWidth, courtInnerlength * 0.94).stroke('#FFFFFF', lineThickness); //bottom second
}

function mouseDown(event)
{
    mouseIsDown = true;
    mouseDownX = event.offsetX;
    mouseDownY = event.offsetY;
}

function mouseUp(event)
{
    if(mouseIsDown) {
        stage.path().moveTo(mouseDownX, mouseDownY).lineTo(event.offsetX, event.offsetY).stroke(selectedLineColor, lineThickness);
    }
    mouseIsDown = false;
}

function changeLineColor(event)
{
    selectedLineColor = event.target.value;
    window.localStorage.setItem(lsLineColor, event.target.value);
}

function changeLineThickness(event)
{
    lineThickness = event.target.value;
    window.localStorage.setItem(lsLineThickness, event.target.value);
}

function initConfigFields()
{
    lineColorPicker.value = window.localStorage.getItem(lsLineColor) ?? '#000000';
    lineThicknessSelect.value = window.localStorage.getItem(lsLineThickness) ?? 2;
}