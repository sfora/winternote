Notka.prototype.constructor = Notka;
Przypominacz.prototype.constructor = Przypominacz;
Kolor.prototype.constructor = Kolor;

//var memor = new Przypominacz();
//var x = setInterval(memor.updateall,2000); //tworzenie nowej instancji przypominacza i ustawienie funckcji do updatu

function Notka(priorytet,prioryt,czaskreacji,czasdeadlinu,tytul,tresc,idnad,posx,posy,kolor,waga) {
this.waga=waga; //waga, najwazniejsze okreslenie waznosci notki
this.prioryt=prioryt; // 0,1 ale chyba dam 0,01 green, 0,5 yellow i 1 red, po to aby w kolko nie robic sprawdzania czy red czy green, trzeba sie zastanowic czy wogole potrzebne
this.priorytet=priorytet;//red,green,yellow
this.czaskreacji=czaskreacji; 
this.czasdeadlinu=czasdeadlinu;
var nowyid;
//this.czaspoodjeciu=czaspoodjeciu;// ile do deadlinu
this.tytul=tytul;
this.tresc=tresc;
this.idnad=idnad;
this.posx=posx;
this.posy=posy;
this.kolor=kolor;
//console.log("notkadone");
//this.deadline=deadline;
//this.tel=tel;
//this.email=email;
}

function Przypominacz(){
this.notatki = new Array();
this.notatkisort = new Array();
}

function Kolor(r,g,b,a){
this.r = r;
this.g = g;
this.b = b;
this.a = a;
}


Przypominacz.prototype.addMemo = function(priorytet){
    var wagatemp;
    var kolortemp;
    var tytul = document.getElementById("tit").value;
    var tresc = document.getElementById("tre").value;
    var datadeadline = document.getElementById('data').value;
    var data = new Date();
    var czaskreacji = data.getTime()/1000;
    var czasdeadlinu;
    var prioryt;
    var kolor = new Kolor();
    var datadead = new Date();
    if (datadeadline=='')
        {if(priorytet=='green')
            {czasdeadlinu=czaskreacji+2000;
            prioryt=0.01;}
        if(priorytet=='orange')
            {czasdeadlinu=czaskreacji+1800;
            prioryt=0.49;}
        if(priorytet=='red')
            {czasdeadlinu=czaskreacji+900;
            prioryt=1}
        }
    else
        {   
            
            var sd = datadeadline.substring(0,2);
            datadead.setDate(datadeadline.substring(0,2));
            console.log(sd);
            var md = datadeadline.substring(3,5);
            console.log(md);
            datadead.setMonth(datadeadline.substring(3,5)-1);
            czasdeadlinu = datadead.getTime()/1000;
            if(priorytet=='green')
            {prioryt=0.01;}
        if(priorytet=='orange')
            {prioryt=0.49;}
        if(priorytet=='red')
            {prioryt=1;}
            
        }
    var czaspoodjeciu = czasdeadlinu-czaskreacji;
    var waga = prioryt*0.3 + ((-1*(czaspoodjeciu/czaspoodjeciu)+1)*0.7);
    //console.log(waga);
    
    if(waga<=0.5)
    {
        wagatemp = waga/0.5;
        kolortemp = Math.floor(wagatemp*255);
        kolor.r = kolortemp;
        kolor.g = 255;
        kolor.b = 0;
        kolor.a = 1;
    }
    else
    {
        wagatemp = (waga-0.5)/0.5;
        kolortemp = Math.floor(wagatemp*255);
        kolor.r = 255;
        kolor.g = 255-kolortemp;
        kolor.b = 0;
        kolor.a = 1;
    }
 
    var idnad = this.notatki.length;
    var posx = (idnad % 6)*250;
    var posy = Math.floor(idnad/6)*180;
    this.notatki.push(new Notka(priorytet,prioryt,czaskreacji,czasdeadlinu,tytul,tresc,idnad,posx,posy,kolor,waga));
    //console.log(this.notatki[idnad].priorytet+","+this.notatki[idnad].prioryt+","+this.notatki[idnad].posx+","+this.notatki[idnad].waga);
    this.wyswietlMemo(this.notatki[idnad]);
};

Przypominacz.prototype.updateall=function(){
  for (var x=0;x<this.notatki.length;x++)
  {
      this.notatki[x].calculatecol();
      
  }
    this.calculateidy();
      
};

Przypominacz.prototype.changepos = function()
{
  for (var counter = 0; counter < this.notatki.length;counter++)  
  {
       this.notatki[counter].posx = (this.notatki[counter].nowyid % 6)*250;
        this.notatki[counter].posy = Math.floor(this.notatki[counter].nowyid/6)*180;
  var elem = document.getElementById(this.notatki[counter].idnad+"notka");
  elem.style.left = this.notatki[counter].posx + "px";
  elem.style.top = this.notatki[counter].posy + "px";
  }
  
};

Przypominacz.prototype.calculateidy = function()
{
            var counter = 0;
            var cos = new Object();
            for(var x=0; x<this.notatki.length; x++)
        {
          if(!cos.hasOwnProperty([this.notatki[x].waga]))
                {   
                    cos[this.notatki[x].waga]=0;}
            else    
                {cos[this.notatki[x].waga]=cos[this.notatki[x].waga]+1;}
                
            for (var y=0; y<this.notatki.length;y++)
            {
                if(x==y)
                {continue;}
                
            if (this.notatki[x].waga < this.notatki[y].waga)
            {counter=counter+1;}
            }
                
                this.notatki[x].nowyid=counter+cos[this.notatki[x].waga];
               
                counter=0;
        }
        
        
        };   


// to jest chwilowy hack
Przypominacz.prototype.wyswietlMemo = function(notka) {
var elem = document.createElement("div");
elem.setAttribute("class", "dupaclass");
elem.setAttribute("id",notka.idnad+"notka");
var xpose = notka.posx + "px";
var ypose = notka.posy + "px";
elem.style.left = xpose;
elem.style.top = ypose;
elem.style.backgroundColor='rgba('+notka.kolor.r+','+notka.kolor.g+','+notka.kolor.b+','+notka.kolor.a+')';
var parelem = document.getElementById('glowny');
parelem.appendChild(elem);
var parag = document.createElement("p");
parag.setAttribute("class", "parag");
parag.innerHTML = notka.tytul;
elem.appendChild(parag);   
};

Notka.prototype.calculatecol = function(){
    var wagatemp;
    var kolortemp;
    var czasteraz=new Date();
    var teraz=czasteraz.getTime()/1000;
    var czasdowagi=this.czasdeadlinu-teraz;
    this.waga=this.prioryt*0.3+(-1*(czasdowagi/(this.czasdeadlinu-this.czaskreacji))+1)*0.7;
    if (this.waga >=1)
    {this.waga = 1;}
    
    if(this.waga<=0.5)
    {
        wagatemp = this.waga/0.5;
        kolortemp = Math.floor(wagatemp*255);
        this.kolor.r = kolortemp;
        this.kolor.g = 255;
        this.kolor.b = 0;
    }
    else
    {
        wagatemp = (this.waga-0.5)/0.5;
        kolortemp = Math.floor(wagatemp*255);
        this.kolor.r = 255;
        this.kolor.g = 255-kolortemp;
        this.kolor.b = 0;
    }
    // console.log(this.waga + " " + this.idnad);
    var eleme = document.getElementById(this.idnad+'notka');
    eleme.style.backgroundColor='rgba('+this.kolor.r+','+this.kolor.g+','+this.kolor.b+','+this.kolor.a+')';
};



Notka.prototype.calculatepos = function(){
 
};

Notka.prototype.killmemo = function(){
    
};

Przypominacz.prototype.maintainMemo = function(){
    
};
