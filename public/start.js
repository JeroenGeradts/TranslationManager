window.onload = function(){//screen set-up
   document.body.appendChild($$('div','main','','','w3-display-container'));

   var a = ['header','div','div','div','footer'];
   var b = ['header','message','input','output','footer'];
   var c = ['w3-row-padding w3-theme w3-padding-16','w3-container w3-theme-l4 w3-padding','w3-container w3-padding','w3-container w3-padding','w3-container w3-theme-l3 w3-bottom w3-left w3-padding w3-col'];
   for (var d in a) $('main').appendChild($$(a[d],b[d],'','',c[d]));

	$('header').appendChild($$('div','title','','','w3-col m9 w3-padding-8 w3-xlarge','Transfer previous translations from Kaltura Media Space language file to new default.po'));
	$('message').innerHTML = "Start by inserting the old language file default.po with the translations you've edited before...";
	$('input').appendChild($text('Step 1: add old file: '));
	$('input').appendChild($$('input','oldFile','','file','','',fileListForImportOld,false));
	$('input').appendChild($$('br'));
	$('input').appendChild($$('br'));
	$('input').appendChild($text('Step 2: add new file: '));
	$('input').appendChild($$('input','newFile','','file','','',fileListForImportNew,false));
	
	var licence = $$('div','licence','','','w3-tooltip');
	var link = $$('licence');
	link.href = 'http://creativecommons.org/licenses/by-sa/4.0/';
	link.target = '_blank';
	link.appendChild($$('img','','https://i.creativecommons.org/l/by-sa/4.0/88x31.png'));
	link.appendChild($$('span','','','','w3-text w3-small w3-margin-left','TranslationManager developed by Jeroen Geradts is given in licence in accordance to the Creative Commons Attribution-ShareAlike 4.0 International-licence'));
	licence.appendChild(link);
	$('footer').appendChild(licence);
	
	lineOld = {};
	lineNew = {};
}