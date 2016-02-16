  // TO DO: Add download link to each element, improve appearance //
function appendPlaybackElement(){
  samplerRecorder.exportWAV(function(blob){
    var url = URL.createObjectURL(blob);
    var $li = $('<li>');
    var $au = $('<audio>').attr({
      src: url,
      controls: true
    });
    $li.append($au);
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
