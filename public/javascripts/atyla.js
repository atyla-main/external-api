var btn = document.createElement('BUTTON');

btn.style.height = '100%';
btn.style.width = '100%';
btn.style.color = '#fff';
btn.style.border = 'none';
btn.style.outline = 'none';
btn.style.backgroundColor = '#00AA5B';
btn.style.borderRadius = '12px';

var spanRight = document.createElement('SPAN');
var spanRightText = document.createTextNode("Achetez Maintenant");
spanRight.appendChild(spanRightText);

var spanCenter = document.createElement('SPAN');
spanCenter.style.height = '80%';
spanCenter.style.border = '1px solid #fff';

var spanLeft = document.createElement('SPAN');
var spanLeftText = document.createTextNode("atyla");
spanLeft.style.fontWeight = '600';
spanLeft.appendChild(spanLeftText);

var spanGlobal = document.createElement("SPAN");
spanGlobal.style.margin = '0 5px 0 5px';
spanGlobal.style.height = '100%'
spanGlobal.style.display = 'flex';
spanGlobal.style.alignItems = 'center';
spanGlobal.style.justifyContent = 'space-between';
spanGlobal.appendChild(spanLeft);
spanGlobal.appendChild(spanCenter);
spanGlobal.appendChild(spanRight);
btn.appendChild(spanGlobal);
document.getElementById('atylaDiv').appendChild(btn);