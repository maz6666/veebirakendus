function select_radio_button(group_p) {
	document.getElementById(group_p).style.color = 'white';
}

function is_selected(rb_group, lbl_info) {
	var radio_group = document.getElementsByName(rb_group);
	for ( var x = 0; x < radio_group.length; x++) {
		if (radio_group[x].checked) {
			// alert ("Valige kandidaat!");
			return 0;
		}
	}
	document.getElementById(lbl_info).style.color = 'red';
	return 1;
}
function voteValidation() {
	var error = 0;
	error += is_selected("radiohaaletamine", "ringkond_info");
	if (error > 0) {
		alert("Valige kandidaat!");
		return false;
	} else {

		return true;
	}
}

function vote() {
	if (voteValidation()) {
		var candidate_radio_group = document.getElementsByName("radiohaaletamine");
		var candidate_id_button = getCheckedRadio(candidate_radio_group);
		var cand_id = candidate_id_button.value;
//		alert(username);
		var result = jQuery.post("/statcandidate",
				{user_name : username,
				candidate_id : cand_id},
				function(data){
					alert("Hääl edukalt antud!");
				})
				.error(function() {
					alert("Olete juba hääletanud! Hääle tühistamiseks vajutage 'Tühista hääl'.");
				})
	}
}


function removevote() {
//	alert(username)
	var result = jQuery.post("/uuususus", {
		user_name : username},
		function(data){
			alert("Hääl tühistatud!");
		})
		.error(function(){
			alert("Te pole veel häält andnud, et seda tühistada.");
		})
}