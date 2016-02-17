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
    updateSamplerStyle();
  });
}

function updateSamplerStyle(){
  var modBtns = $('.mod-btn');
  for (var i = 0; i < modBtns.length; i++) {
    var $modAudio = $(modBtns[i].firstElementChild);
    var src = $modAudio.attr('src');
    if (src){
      $(modBtns[i]).removeClass('no-audio').addClass('has-audio');
    } else {
      $(modBtns[i]).removeClass('has-audio').addClass('no-audio');
    }
  }
}

$(function(){
  setKeyboardListener();
  setClearListener();
  updateSamplerStyle();
});
