// Initial Audio Setup //

window.AudioContext = window.AudioContext || window.webkitAudioContext;

window.URL = window.URL || window.webkitURL;

var audioContext = new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null,
    recIndex = 0,
    samplerRecorder = null;

// Enable User's Mic //
function initAudio() {
  if (!navigator.getUserMedia) {
      navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  }
    navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });
}
// Set up audio recorder once mic is enabled //
function gotStream(stream) {
  inputPoint = audioContext.createGain();

  // Create an AudioNode from the stream.
  realAudioInput = audioContext.createMediaStreamSource(stream);
  audioInput = realAudioInput;
  audioInput.connect(inputPoint);
  // New recorder object with input node (audio input connected to createGain)
  audioRecorder = new Recorder( inputPoint );
  // Prevent feedback //
  zeroGain = audioContext.createGain();
  zeroGain.gain.value = 0.0;
  inputPoint.connect( zeroGain );
  zeroGain.connect( audioContext.destination );
}

// ~~~ SAMPLER OUTPUT RECORDING SETUP ~~~ //

function initSamplerOutput(){
  var htmlAudioElements = $('.mod-audio');
  var merger = audioContext.createChannelMerger(8);
  for (var i = 0; i < htmlAudioElements.length; i++) {
    audioContext.createMediaElementSource(htmlAudioElements[i]).connect(merger, 0, i);
  }
  samplerRecorder = new Recorder( merger );
}

$(function(){
  initAudio();
  initSamplerOutput();
});
