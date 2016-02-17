// SAVE SAMPLES //

function setSaveHandler(){
  $('#save-samples').click(function(){
    // Get all 8 module audio elements //
    var samplerModules = $('.mod-audio');
    var samplesToSave = [];
    // If an element has a child (hidden form), add object to samples array //
    for (var i = 0; i < samplerModules.length; i++) {
      if (samplerModules[i].childElementCount > 0) {
        var $form = $(samplerModules[i].firstChild);
        var $name = $form.find('input[name=name]').val();
        var $file = $form.find('input[name=file]').val();
        var fileObject = {name: $name, file: $file};
        samplesToSave.push(fileObject);
      }
    }
    // Save samples array //
    saveSamples(samplesToSave);
  });
}

function saveSamples(samplesToSave){
  $.ajax({
    method: 'post',
    url: '/users/samples',
    data: {samples: samplesToSave},
    success: function(data){
      console.log(data);
    }
  });
}

  // LOAD SAMPLES //

function setLoadHandler(){
  $('#load-samples').click(function(){
    getUserSamples(function(userSamples){
      loadSamples(userSamples);
      updateSamplerStyle();
    });
  });
}

function loadSamples(userSamples){
  for (var i = 0; i < userSamples.length; i++) {
    var $mod = $(userSamples[i].name);
    $mod.attr('src', userSamples[i].file);
  }
}

function getUserSamples(callback){
  $.ajax({
    method: 'get',
    url: '/users/samples',
    success: function(data){
      callback(data);
    }
  });
}

$(function(){
  setSaveHandler();
  setLoadHandler();
});
