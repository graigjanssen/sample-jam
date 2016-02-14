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

function newSamplerRecording(){
  $('#output-rec').removeClass('rec-inactive').addClass('rec-active');
  samplerRecorder.clear();
  samplerRecorder.record();
  setTimeout(function(){
    $('#output-rec').removeClass('rec-active').addClass('rec-inactive');
    samplerRecorder.stop();
    appendPlaybackElement();
  }, 10000);
}

function setOutputRecListener(){
  $('#output-rec').click(function(){
    newSamplerRecording();
  });
}

$(function(){
  setOutputRecListener();
});
