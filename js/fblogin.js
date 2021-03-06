﻿var button;
var userInfo;

window.fbAsyncInit = function() {
	FB.init({
		appId : '511806515522770', // change the appId to your appId
		status : true,
		cookie : true,
		xfbml : true,
		oauth : true
	});

	function updateButton(response) {
		button = document.getElementById('loginbutton');
		userInfo = document.getElementById('user-info');

		if (response.authResponse) {
			// user is already logged in and connected
			hidelogin();
			FB.api('/me', function(info) {
				login(response, info);
			});

			button.onclick = function() {
				FB.logout(function(response) {
					logout(response);
				});
			};
		} else {
			// user is not connected to your app or logged out
			hidelogout();
			button.innerHTML = 'Login';
			button.onclick = function() {
				FB.login(function(response) {
					if (response.authResponse) {
						FB.api('/me', function(info) {
							login(response, info);
						});
					} else {
						// user cancelled login or did not grant authorization
					}
				}, {
					scope : 'email,user_birthday'
				});
			}
		}
	}

	// run once with current status and whenever the status changes
	window.onunload = function(){
		FB.logout(function(response) {
            logout(response);
        });
	}
	FB.getLoginStatus(updateButton);
	FB.Event.subscribe('auth.statusChange', updateButton);
};
(function() {
	var e = document.createElement('script');
	e.async = true;
	e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
	// document.getElementById('fb-root').appendChild(e);
}());

function login(response, info) {
	if (response.authResponse) {
//		alert(username);
		username = info.name;

//		alert(username);
		var accessToken = response.authResponse.accessToken;

		userInfo.innerHTML = '<img src="https://graph.facebook.com/' + info.id
				+ '/picture">' + info.name;
		button.innerHTML = 'Logout';
		var result = jQuery.post("/user", {user_name : username});
		// document.getElementById('other').style.display = "block";
	}
}

function logout(response) {
	userInfo.innerHTML = "";
	// document.getElementById('debug').innerHTML = "";
	// document.getElementById('other').style.display = "none";
}
