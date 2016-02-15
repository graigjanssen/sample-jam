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
      fileInfo.file = new Uint8Array(reader.result);
      callback(null, fileInfo);
    };

    reader.onerror = function(){
      callback(reader.error);
    };

    reader.readAsArrayBuffer(file);
  }
};

function appendPlaybackElement(){
  samplerRecorder.exportWAV(function(blob){
    WavReader.read(blob, function(err, fileInfo){
      saveJam(fileInfo);
    });

    var url = URL.createObjectURL(blob);
    var $li = $('<li>');
    var $au = $('<audio>').attr({
      src: url,
      controls: true
    });
    $li.append($au);
    // Add a save button to each element //
    var $btn = $('<button>').attr({
      class: 'btn save-btn',
    });
    $btn.text('Save');
    $li.append($btn);
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
  }, 2500);
}

function setOutputRecListener(){
  $('#output-rec').click(function(){
    newSamplerRecording();
  });
}

$(function(){
  setOutputRecListener();
});
