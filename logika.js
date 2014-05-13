var zielone = new Array();
var pomaranczowe = new Array();
var czerwone = new Array();
window.onload = function() {var glownyel = document.getElementById('glowny');
console.log('dupa')
glownyel.addEventListener('click', actiondel, false);}


function actiondel(e) {
	var elem = document.getElementById(e.target.id);  
   elem.parentNode.removeChild(elem);
}
	

function memo(priorytet,xpos,ypos,idnum,tit,tre) {
this.priorytet = priorytet;
this.xpos = xpos;
this.ypos = ypos;
this.idnum = idnum;	
this.tit = tit;
this.tre = tre;
}


function crememo(id) {
var zielonel = zielone.length;
var pomaranczowel = pomaranczowe.length;
var czerwonel = czerwone.length;
var xpos;
var ypos;
var formtit = document.getElementById('tit');
var formtre = document.getElementById('tre');
if (id==="red") {
	xpos = (czerwonel % 6)*250;
	ypos = Math.floor(czerwonel/6)*180;
	czerwone.push(new memo("red",xpos,ypos,czerwonel,formtit.value,formtre.value));
	czerwone[czerwonel].addMemo();
}

if (id==="orange") {
	xpos = ((czerwonel+pomaranczowel) % 6)*250;
	ypos = Math.floor((czerwonel+pomaranczowel)/6)*180;
	pomaranczowe.push(new memo("orange",xpos,ypos,pomaranczowel,formtit.value,formtre.value));
	pomaranczowe[pomaranczowel].addMemo();
}

if (id==="green") {
	xpos = ((czerwonel+pomaranczowel+zielonel) % 6)*250;
	ypos = Math.floor((czerwonel+pomaranczowel+zielonel)/6)*180;
	zielone.push(new memo("green",xpos,ypos,zielonel,formtit.value,formtre.value));
	zielone[zielonel].addMemo();
}
	formtit.value='';
	formtre.value='';
}

memo.prototype.addMemo = function() {
elem = document.createElement("div");
elem.setAttribute("class", "dupaclass");
var xpose = this.xpos + "px";
var ypose = this.ypos + "px";
elem.style.left = xpose;
elem.style.top = ypose;
elem.style.backgroundColor = this.priorytet;
elem.setAttribute("id",this.priorytet + this.idnum);
parelem = document.getElementById('glowny');
parelem.appendChild(elem);

var parag = document.createElement("p");
parag.setAttribute("class", "parag");
parag.innerHTML = this.tre;
elem.appendChild(parag);   
};


function fadeOut(el,number){
var elem = document.getElementById(el);
var numer = number;   
elem.style.transition = "left 2s ease-out 0s";
elem.style.left = numer +"px";
console.log(numer + "px");
}

