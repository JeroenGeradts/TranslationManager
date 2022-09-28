//Capture the new- and old language file

function fileListForImportOld(evt){
   file = evt.target.files[0];
	fileLoadForImportOld(file);
}

function fileLoadForImportOld(file){
	var a = new FileReader();
	a.onload = function(evt){translateConvertOld(evt.target.result,lineOld)};
	a.readAsText(file);
}

function translateConvertOld(file,array){
	var lines = file.split(/\r\n|\n/);
	var a = -1;
	for (var b = 0; b < lines.length; b++){
		if (lines[b] == '' || /#:|#,|#\|/.test(lines[b]) == true) continue
		if (/msgid_plural/.test(lines[b]) == true){
			array[c][0].push(lines[b]);
			continue;
		}
		if (/msgid/.test(lines[b]) == true){
			a = 0;
			var c = b;
			array[c] = [[],[]];
		}
		if (/msgstr/.test(lines[b]) == true) a = 1;
		if (a > -1) array[c][a].push(lines[b]);
	}
	$('message').innerHTML = 'Then insert the new language file default.po...';
}

function fileListForImportNew(evt){
	$('message').innerHTML = 'Compare both language files... (this may take some time)';
   file = evt.target.files[0];
	fileLoadForImportNew(file);
}

function fileLoadForImportNew(file){
	var a = new FileReader();
	a.onload = function(evt){translateConvertNew(evt.target.result,lineNew)};
	a.readAsText(file);
}

function translateConvertNew(file,array){
	var lines = file.split(/\r\n|\n/);
	var a = -1;
	for (var b = 0; b < lines.length; b++){
		if (lines[b] == '') a = -1;
		if (/msgid_plural/.test(lines[b]) == true){
			array[c][0].push(lines[b]);
			continue;
		}
		if (/msgid/.test(lines[b]) == true){
			a = 0;
			var c = b;
			array[c] = [[],[]];
		}
		else if (/msgstr/.test(lines[b]) == true) a = 1;
		else if (a == -1){
			array[b] = [[]];
			array[b][0].push(lines[b]);
		}
		if (a > -1) array[c][a].push(lines[b]);
	}
	compareTranslations(file)
}

function compareTranslations(file){
	var countEdited = 0;
	var countUnedited = 0;
	for (var a in lineNew){
		var msgid = lineNew[a][0].toString();
		var found = 'no';
		for (var b in lineOld) if (msgid == lineOld[b][0].toString()){
			lineNew[a][1] = lineOld[b][1];
			countEdited++;
			found = 'yes';
			break;
		}
		if (found == 'no' && lineNew[a].length > 1){
			lineNew[a][1].push(["@@@ new translation"]);
			countUnedited++;
		}
	}
	$('message').innerHTML = 'New language file generated: ' + countEdited + ' lines edited automatically, only ' + countUnedited + ' more lines to check!<br>The new and unedited lines are marked with "@@@ new translation". Remove these markings while editing the new language file.';
	//translateSaveArray(file);	
	translateSaveNewFile(file);
}

function translateSaveArray(file){//only use for bugfixing (activate line 88)
	var string = 'function declareTranslation(){\r\n\r\nlineOld = {};';
	for (var a in lineOld) string += $write(lineOld[a],'lineOld',a,'\r\n');
	string += '\r\n\r\nlineNew = {};';
	for (var b in lineNew) string += $write(lineNew[b],'lineNew',b,'\r\n');
	$('output').appendChild($save(string + '\r\n}','translation.js'));
	$('output').appendChild($$('br'));
	$('output').appendChild($$('br'));
	translateSaveNewFile(file);
}

function translateSaveNewFile(file){
	var string = '';
	for (var a in lineNew){
		for (var b in lineNew[a][0]) string += lineNew[a][0][b] + '\r\n'; 
		if (lineNew[a][1]) for (var c in lineNew[a][1]) string += lineNew[a][1][c] + '\r\n';		
	}
	$('output').appendChild($text('Step 3: download the generated language file and continue editing: '));
	$('output').appendChild($save(string,'default.po'));
}