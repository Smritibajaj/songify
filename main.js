var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0; // will use this soon
//welcome screen click event
$( '.welcome-screen button' )
	.on( 'click', function() {
		var name = $( '#name-input' )
			.val();
		if ( name.length > 2 ) {
			var message = "Welcome, " + name;
			$( '.main .user-name' )
				.text( message );
			$( '.welcome-screen' )
				.addClass( 'hidden' );
			$( '.main' )
				.removeClass( 'hidden' );
		} else {
			$( '#name-input' )
				.addClass( 'error' );
		}
	} );

// for showing time
function fancyTimeFormat( time ) {
	// Hours, minutes and seconds
	var hrs = ~~( time / 3600 );
	var mins = ~~( ( time % 3600 ) / 60 );
	var secs = time % 60;

	// Output like "1:01" or "4:03:59" or "123:03:59"
	var ret = "";

	if ( hrs > 0 ) {
		ret += "" + hrs + ":" + ( mins < 10 ? "0" : "" );
	}

	ret += "" + mins + ":" + ( secs < 10 ? "0" : "" );
	ret += "" + secs;
	return ret;
}

//play/pause
function toggleSong() {
	var song = document.querySelector( 'audio' );
	if ( song.paused == true ) {
		console.log( 'playing' );
		$( '.play-icon' )
			.removeClass( 'fa-play' )
			.addClass( 'fa-pause' );
		song.play();
	} else {
		console.log( 'pausing' );
		$( '.play-icon' )
			.removeClass( 'fa-pause' )
			.addClass( 'fa-play' );
		song.pause();
	}
}

//called function

$( '.play-icon' )
	.on( 'click', function() {

		toggleSong();
		//called function
	} );

// keypress event 
$( 'body' )
	.on( 'keypress', function( event ) {
		if ( event.keyCode == 32 ) {
            var target = event.target;
			if (event.keyCode == 32 && target.tagName !='INPUT')
    {
			toggleSong();
        }
        }
    } );

  $('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if (willShuffle == 1) {
        var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < 4) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})

function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}
var nextSongNumber = randomExcluded(1,4,currentSongNumber);  

// time function
function updateCurrentTime() {
	var song = document.querySelector( 'audio' ); //time add
	//console.log(song.duration);
	//console.log(song.currentTime);
	var currentTime = Math.floor( song.currentTime );
	currentTime = fancyTimeFormat( currentTime );
	var duration = Math.floor( song.duration ); //add fancyTimeFormat.
	duration = fancyTimeFormat( duration );
	$( '.time-elapsed' )
		.text( currentTime );
	$( '.song-duration' )
		.text( duration );
}

//song object
var songs = [ {
		'name': 'Badri Ki Dulhania (Title Track)'
		, 'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi'
		, 'album': 'Badrinath ki Dulhania'
		, 'duration': '2:56'
		, 'fileName': 'song1.mp3'
		, 'image': 'song1.jpg'
    }
	, {
		'name': 'Humma Song'
		, 'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati'
		, 'album': 'Ok Jaanu'
		, 'duration': '3:15'
		, 'fileName': 'song2.mp3'
		, 'image': 'song2.jpg'
    }
	, {
		'name': 'Nashe Si Chadh Gayi'
		, 'artist': 'Arijit Singh'
		, 'album': 'Befikre'
		, 'duration': '2:34'
		, 'fileName': 'song3.mp3'
		, 'image': 'song3.jpg'
    }
	, {
		'name': 'The Breakup Song'
		, 'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi'
		, 'album': 'Ae Dil Hai Mushkil'
		, 'duration': '2:29'
		, 'fileName': 'song4.mp3'
		, 'image': 'song4.jpg'
    } ]

// change details of song 
function changeCurrentSongDetails( songObj ) {
	$( '.current-song-image' )
		.attr( 'src', 'img/' + songObj.image )
	$( '.current-song-name' )
		.text( songObj.name )
	$( '.current-song-album' )
		.text( songObj.album )
}

//song details update click event 

var i = 0 ;
var songNumber = 1;

function addSongNameClickEvent( songObj, position ) {
	var id = '#song' + position;
	var songName = songObj.fileName;
	$( id )
		.click( function() {
			var audio = document.querySelector( 'audio' );
			var currentSong = audio.src;
			if ( songNumber != position ) {
				audio.src = songName;
				songNumber = position;
				changeCurrentSongDetails( songObj );
			}
			toggleSong();
		} );
}



window.onload = function() {


	changeCurrentSongDetails( songs[ 0 ] );
	updateCurrentTime();
	setInterval( function() {
		updateCurrentTime()
	}, 1000 );

	for ( var i = 0; i < songs.length; i++ ) {
		var obj = songs[ i ];
		var name = '#song' + ( i + 1 );
		var song = $( name );
		song.find( '.song-name' )
			.text( obj.name );
		song.find( '.song-artist' )
			.text( obj.artist );
		song.find( '.song-album' )
			.text( obj.album );
		song.find( '.song-length' )
			.text( obj.duration );
		addSongNameClickEvent( obj, i + 1 );

	}
	$( '#songs' )
		.DataTable( {
			paging: false
		} );
}