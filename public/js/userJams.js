function saveJam(fileInfo){
  $.ajax({
    method: 'post',
    url: '/users/jams',
    data: fileInfo,
    success: function(data){
      console.log(data);
    }
  });
}

$(function(){

});
