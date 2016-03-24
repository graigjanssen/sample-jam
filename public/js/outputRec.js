
function appendPlaybackElement(){
  samplerRecorder.exportWAV(function(blob){
    var url = URL.createObjectURL(blob);
    var $li = $('<li>').addClass('playlist-item');
    // Create and append audio element //
    var $au = $('<audio>').attr({
      src: url,
      controls: true,
      class: 'playlist-audio'
    });
    $li.append($au);

    // Create and append download link //
    var $link = $('<a>').attr({
      href: url,
      download: 'myJam'
    });
    $link.html("<button class='btn download-btn'>Download</button>");
    $li.append($link);
    $('#playlist').append($li);
  });
}

function toggleSamplerRecording(){
  var $recBtn = $('#output-rec');
  $recBtn.toggleClass('rec-inactive rec-active');
  if ($recBtn.hasClass('rec-active')){
    samplerRecorder.clear();
    samplerRecorder.record();
  } else {
    samplerRecorder.stop();
    appendPlaybackElement();
  }
}

function setOutputRecListener(){
  $('#output-rec').click(function(){
    toggleSamplerRecording();
  });
}

$(function(){
  setOutputRecListener();
});
