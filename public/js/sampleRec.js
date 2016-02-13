function sendToSampler(){
  audioRecorder.exportWAV(function(blob){
    var url = URL.createObjectURL(blob);
    var samplerModule = $('#mod-menu').val();
    $(samplerModule).attr('src', url);
  });
}

function newRecording(){
  $('#sample-rec').removeClass('rec-inactive').addClass('rec-active');
  audioRecorder.clear();
  audioRecorder.record();
  setTimeout(function(){
    $('#sample-rec').removeClass('rec-active').addClass('rec-inactive');
    audioRecorder.stop();
    sendToSampler();
  }, 1000);
}

function setRecListener(){
  $('#sample-rec').click(function(){
    setTimeout(function(){
      newRecording();
    }, 200);
  });
}

$(function(){
  setRecListener();
});
