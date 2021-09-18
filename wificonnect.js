exports.action = function(data){

var exec = require('child_process').exec;

var réponse=data.réponse
var ip=data.ip
var non=data.non
var oui=data.oui
var surveillance=data.surveillance
var timersortie=data.timersortie
var timerfrequence=data.timerfrequence
var conteur=-data.timerfrequence

try{
var datasequence=data.sequence.split(';')
}
catch(err){datasequence=""}
console.log('les actions à venir '+datasequence)

JarvisIASpeech(réponse)



if(surveillance=="on"){

var attente = setInterval(function(){
	conteur=conteur+60 
	exec('ping '+ ip, function(error, stdout, stderr) {
	if(error){console.log(error);
		return false}
	    
	    if(stdout.search('Impossible')>-1){}
	    
	    else {
	    	if(conteur>timersortie){
			    	var date = new Date();
		 		    var text = 'il est ' + date.getHours() + ' heure ';
		  			if (date.getMinutes() > 0){ 
		    		text += date.getMinutes();
		  			}

			    	JarvisIASpeech(text+" : "+ oui);
			    	console.log(text+" : "+ oui);

var compteur=0
var actionemulate=""
			
function actif(actionemulate,compteur,datasequence){
			
if(compteur==datasequence.length){console.log('FIN des actions receive sms');return false}

var actionemulate='"'+datasequence[compteur].trim()+'"';

console.log("EN COURS DE TRAITEMENT, TEMPO 20 Secondes entre les actions par sécurité !!!!!")		
var actionemulate=actionemulate.replace(/"/ig,'')
var url1 = 'http://127.0.0.1:8888/?emulate='+actionemulate;
console.log("on émule ceci : "+url1)

setTimeout(function(){
compteur=compteur+1;
console.log(compteur+"    "+datasequence.length)						
if(compteur==datasequence.length){return false}
else{	 actif(actionemulate,compteur,datasequence)}}, 20000);							 
}

			actif(actionemulate,compteur,datasequence )
			clearInterval(attente);
			    	return false
			}}
	})
}, timerfrequence*1000);
}

else{
exec('ping '+ ip, function(error, stdout, stderr) {
	if(error){console.log(error);
	return false}
    if(stdout.search('Impossible')>-1){JarvisIASpeech(non)}
    else {JarvisIASpeech(oui)}
})
}
return false
}