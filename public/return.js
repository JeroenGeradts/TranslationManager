//Library with functions that process 1 or more variables and return a value

function $(a){
	return document.getElementById(a);
}

function $$(a,id,src,type,clas,txt,change,multiple){//create a DOM-element type a with id and thumb src
   var b = document.createElement(a);
   if (!id == false) b.id = id;
   if (!src == false) b.src = src;
   if (!type == false) b.type = type;
   if (!clas == false) $class(b,clas);
   if (!change == false) $change(b,change);
   if (!multiple == false) b.multiple = multiple;
   if (!txt == false) b.appendChild($text(txt));
   return b;
}

function $change(a,b){
	return a.addEventListener('change',b);
}

function $class(a,b){
	return a.setAttribute('class',b);
}

function $object(a){
	var b = (typeof(a) == 'object')? '[' : '';
	for (var c in a){
		b += $typeof(a[c]);
		if (c<a.length-1) b += ',';
	}
	b += (typeof(a) == 'object')? ']' : '';
	return b;
}

function $save(string,file){//https://github.com/mholt/papaparse/issues/175
	var mimetype = ['text/plain;charset=utf-8;','application/javascript','text/plain;charset=utf-8;','text/xml;charset=utf-8;','text/plain;charset=utf-8;'];
	var suffix = ['csv','js','txt','xml','po'];
	var a = suffix.indexOf(file.split('.')[1]);
	var blob = new Blob([string],{type: mimetype[a]});
	if (navigator.msSaveBlob){
		navigator.msSaveBlob(blob,file);//IE11 & Edge
		return $text(file);
	}
	else{
		var link = $$('a');//In FF link must be added to DOM to be clicked
		link.href = window.URL.createObjectURL(blob);
		link.setAttribute('download',file);
		link.innerHTML = file;
		return link;
	}
}

function $text(a){return document.createTextNode(a)}

function $typeof(a){
	a = (isNaN(a) == false)? Number(a) : a;
   if (typeof(a) == 'number') return a;
   if (typeof(a) == 'string') return a;
   if (typeof(a) == 'object') return $object(a);
}

function $write(array,label,id,newLine){
	switch(!id){
		case true:
			var a = newLine + label + '[' + $typeof(array[0]) + '] = [';
			for (var b = 1; b < array.length; b++) a += $typeof(array[b]) + ',';
			return a.substring(a,a.length - 1) + '];' ;
			break;
		case false:
			var a = newLine + label + '[' + $typeof(id) + '] = [';
			for (var b = 0; b < array.length; b++) a += $typeof(array[b]) + ',';
			return a.substring(a,a.length - 1) + '];' ;			
			break;
	}
}