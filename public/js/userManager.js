// MODAL HANDLING //

function setUserModalHandler(){
  $('.circle-btn').click(function(e){
    // Will return 'signup-btn' or 'login-btn'
    var btnClass = e.currentTarget.classList[1];
    $('.modal').css('display', 'block');
    if (btnClass === "signup-btn"){
      $('#signup').show();
    } else if (btnClass === "login-btn"){
      $('#login').show();
    }
  });
}

function setModalCloseListener(){
    $('.close-modal').click(function(){
      // Hide Modal //
      $('.modal').hide();
      // Reset User Forms //
      $('#signup').hide();
      $('#login').hide();
    });
}

// USER SIGN UP //

function createUser(userData, callback){
  $.ajax({
    method: 'post',
    url: '/users',
    data: {user: userData},
    success: function(data){
      callback(data);
    }
  });
}

function setSignupFormHandler(){
  $('#signup-form').on('submit', function(e){
    console.log('sign up form beeeyotch!');
    e.preventDefault();

    var usernameField = $(this).find('input[name=username]');
    var usernameText = usernameField.val();
    usernameField.val('');

    var passwordField = $(this).find('input[name=password]');
    var passwordText = passwordField.val();
    passwordField.val('');

    var userData = {username: usernameText, password: passwordText};

    createUser(userData, function(response){
      console.log(response);
    });
  });
}

$(function(){
  setUserModalHandler();
  setModalCloseListener();
  setSignupFormHandler();
});
