/*""
Created on Wed Aug 26 19:05:59 2015

@author: matthias
*/

var convert_dom = function() {
	var audio_tags = document.getElementsByClassName('audio_button');

	for (var i = 0; i < audio_tags.length; i++) {
		// current audio button player id
		cur_player_id = 'player_' + i;
		cur_button_id = 'button_' + i;

		// setup html content
		var html_string = '<audio id="' + cur_player_id + '" src="' + audio_tags[i].getAttribute('audio_url') + '" data-status="stopped" onended="onEnded(' + cur_button_id + ')" onpause="onEnded(' + cur_button_id + ')"></audio>';
		html_string += '<button id="' + cur_button_id + '" data-player="' + cur_player_id + '" class="btn btn-default" onclick="play(this);"><i class="glyphicon glyphicon-play"></button>';
		audio_tags[i].innerHTML = html_string;
		console.log(audio_tags[i]);
	}
};

var stop_all_players = function() {
	var audio_tags = document.getElementsByTagName('audio');

	for (var i = 0; i < audio_tags.length; i++) {
		audio_tags[i].pause();
		audio_tags[i].setAttribute('data-status', 'stopped');
	}
};

var play = function(element) {
	player_id = element.getAttribute('data-player');
	//console.log(player_id);
	target_player = document.getElementById(player_id);
	//console.log(target_player);

	//is_paused = target_player.paused;
	//console.log(is_paused); always true, whatever... -> ??

	cur_status = target_player.getAttribute('data-status');

	is_paused = cur_status == 'stopped';

	if (is_paused) {
		element.innerHTML = '<i class="glyphicon glyphicon-stop">';

		stop_all_players();
		target_player.load();
		target_player.play();
		target_player.setAttribute('data-status', 'playing');
	} else {
		target_player.pause();
		element.innerHTML = '<i class="glyphicon glyphicon-play">';
		target_player.setAttribute('data-status', 'stopped');
	}
};

var onEnded = function(button_id) {
	target_button = document.getElementById(button_id);

	button_id.innerHTML = '<i class="glyphicon glyphicon-play">';
	};
