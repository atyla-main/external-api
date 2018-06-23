var btn = document.createElement('BUTTON');

btn.style.height = '50px';
btn.style.width = '300px';
btn.style.color = '#fff';
btn.style.border = 'none';
btn.style.outline = 'none';
btn.style.backgroundColor = '#CD5542';
btn.style.borderRadius = '12px';

var spanRight = document.createElement('SPAN');
var spanRightText = document.createTextNode("Achetez Maintenant");
spanRight.style.borderLeft = '2px solid #fff';
spanRight.style.paddingLeft = '15px';
spanRight.style.fontSize = '20px';
spanRight.appendChild(spanRightText);

var spanLeft = document.createElement('SPAN');
var spanLeftText = document.createTextNode("atyla");
spanLeft.style.marginRight = '15px';
spanLeft.style.fontSize = '20px';
spanLeft.style.marginLeft = '15px';
spanLeft.style.fontWeight = '600';
spanLeft.appendChild(spanLeftText);

var spanGlobal = document.createElement("SPAN");
spanGlobal.style.display = 'flex';
spanGlobal.style.alignItems = 'center';
spanGlobal.appendChild(spanLeft);
spanGlobal.appendChild(spanRight);
btn.appendChild(spanGlobal);
document.getElementById('atylaDiv').appendChild(btn);