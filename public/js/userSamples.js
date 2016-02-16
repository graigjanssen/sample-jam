function setSaveHandler(){
  $('#save-samples').click(function(){
    var samplerModules = $('.mod-audio');
    var samplesToSave = [];

    for (var i = 0; i < samplerModules.length; i++) {
      if (samplerModules[i].childElementCount > 0) {
        var $form = $(samplerModules[i].firstChild);
        var $name = $form.find('input[name=name]').val();
        var $file = $form.find('input[name=file]').val();
        var fileObject = {name: $name, file: $file};
        samplesToSave.push(fileObject);
      }
    }
    console.log('Sampies to Savesky: ', samplesToSave);
  });
}

$(function(){
  setSaveHandler();
});
