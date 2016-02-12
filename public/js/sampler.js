var keyMap = {
  97: '#mod1',
  115: '#mod2',
  100: '#mod3',
  102: '#mod4',
  106: '#mod5',
  107: '#mod6',
  108: '#mod7',
  59:  '#mod8'
};
function triggerSampler(samplerModule){
  var audio = $(samplerModule).get(0);
  audio.load();
  audio.play();
}

function setKeyboardListener(){
  $(window).on('keypress', function(e){
    var keyCode = e.keyCode;
    if (keyMap[keyCode]){
      triggerSampler(keyMap[keyCode]);
    }
  });
}
function setClearListener(){
  $('.mod-clr').click(function(e){
    var $moduleAudio = $(e.currentTarget.previousElementSibling.firstElementChild);
    $moduleAudio.attr('src', '');
  });
}

$(function(){
  setKeyboardListener();
  setClearListener();
});
