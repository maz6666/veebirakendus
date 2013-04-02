function Stattable(form) {
	hidelogout();
	
	var table= jQuery('#tablestat');
	var piirkond = document.getElementById("statpiirkond").value;
	var partei = document.getElementById("statpartei").value;
	var link="statpartei?statpiirkond=" + piirkond + "&statpartei=" + partei
	var link2="statcandidate?statpiirkond=" + piirkond + "&statpartei=" + partei
	
	
	jQuery(table).empty()
	table.append(jQuery("<thead><th>Erakond</th><th>% häältest</th><th>hääli</th></thead><tbody>"));
		jQuery.getJSON("statpartei?statpiirkond=0&statpartei=100", function(data){
		jQuery.each(data, function(index, item){
			table.append(jQuery("<tr><td>" + item.name + "</td><td>" + item.pc + "</td><td>" + item.votes + "</td></tr>"));
		});
		table.append(jQuery("</tr></tbody>"));
	});	
		

	
	var table2= jQuery('#tablestat2')
	
	jQuery(table2).empty()
	table2.append(jQuery("<thead><th>Erakond</th><th>% häältest</th><th>hääli</th></thead><tbody>"));
	jQuery.getJSON(link, function(data){
		jQuery.each(data, function(index, item){
				table2.append(jQuery("<tr><td>" + item.name + "</td><td>" + item.pc + "</td><td>" + item.votes + "</td></tr>"));
		});
		table2.append(jQuery("</tr></tbody>"));
	});
		
		
			
	var table3= jQuery('#tablestat3')
	jQuery(table3).empty()		
	table3.append(jQuery("<thead><th>Kandidaat</th><th>% häältest</th><th>hääli</th></thead><tbody>"));
	jQuery.getJSON(link2, function(data){
		jQuery.each(data, function(index, item){
			table3.append(jQuery("<tr><td>" + item.name + "</td><td>" + item.pc + "</td><td>" + item.votes + "</td></tr>"));
		});
	table3.append(jQuery("</tr></tbody>"));
	});
	
	
}

