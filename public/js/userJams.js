function saveJam(file){
  console.log(file);
  $.ajax({
    method: 'post',
    url: '/users/jams',
    data: file,
    success: function(data){
      var exampleJam = data.jams[4];
      appendDbJam(exampleJam);
    }
  });
}

function appendDbJam(jam){
  var $au = $('<audio>').attr({
    src: jam.file[0],
    controls: true
  });
  var $li = $('<li>');
  $li.append($au);
  $('#jam-list').append($li);
}
$(function(){

});
