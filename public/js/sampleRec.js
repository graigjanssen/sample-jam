var WavReader = {
  read: function(file, callback){
    var reader = new FileReader();

    var fileInfo = {
      name: file.name,
      type: file.type,
      size: file.size,
      file: null
    };

    reader.onload = function(){
      fileInfo.file = reader.result;
      callback(null, fileInfo);
    };

    reader.onerror = function(){
      callback(reader.error);
    };

    reader.readAsDataURL(file);
  }
};
function sendToSampler(){
  var samplerModule = $('#mod-menu').val();
  audioRecorder.exportWAV(function(blob){
    blob.name = samplerModule;
    WavReader.read(blob, function(err, fileInfo){
      console.log('fileInfo from WavReader', fileInfo);
    });
    var url = URL.createObjectURL(blob);
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
