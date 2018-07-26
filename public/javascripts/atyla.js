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
var atylaButton = document.getElementById('atylaDiv');
atylaButton.appendChild(btn);
atylaButton.onclick = function() {
  var userId = localStorage.getItem('userId');
  var token = localStorage.getItem('token');
  var merchant = '71ece4c1-f7e0-4b8e-9055-ed1eaec35fec';
  var ico = '6fe53ecb-e091-40c4-99a8-124aecfa3f9f';
  var userAgent = navigator.userAgent;

  var iframe = document.createElement('iframe');
  iframe.id = "atylaIframe";
  iframe.style.border="none";
  iframe.frameborder="0";
  iframe.style.top="0px";
  iframe.style.left="0px";
  iframe.style.overflow="hidden";
  iframe.style.margin="0px";
  iframe.style.padding="0px";
  iframe.style.position="absolute";
  iframe.style.zIndex="100";
  iframe.width="100%";
  iframe.height="100%";
  iframe.src = `https://enigmatic-crag-91905.herokuapp.com/calculator/${merchant}?user=${userId}&token=${token}&ico=${ico}&userAgent=${userAgent}`;
  document.body.appendChild(iframe);
}