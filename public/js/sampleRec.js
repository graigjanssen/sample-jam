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
    var url = URL.createObjectURL(blob);
    $(samplerModule).empty();
    $(samplerModule).attr('src', url);

    // Get object with file info including base64 string of audio data, append as hidden fields //
    WavReader.read(blob, function(err, fileInfo){
      $(samplerModule).append(createHiddenFields(fileInfo));
    });
  });
}

function createHiddenFields(fileInfo){
  var $form = $('<form>');

  var $name = $('<input>').attr({
    type: 'hidden',
    name: 'name'
  }).val(fileInfo.name);
  var $type = $('<input>').attr({
    type: 'hidden',
    name: 'type'
  }).val(fileInfo.type);
  var $size = $('<input>').attr({
    type: 'hidden',
    name: 'size'
  }).val(fileInfo.size);
  var $file = $('<input>').attr({
    type: 'hidden',
    name: 'file'
  }).val(fileInfo.file);

  return $form.append([$name, $type, $size, $file]);
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
