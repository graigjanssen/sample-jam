// UPDATE VIEW //

function updateView(){
  if ($.cookie('token')){
    getCurrentUser(function(userData){
      var username = userData.user.username;
      $('.user-status-msg').text('Signed in as ' + username);
    });
    $('.logged-out').hide();
    $('.logged-in').show();
  } else {
    $('.logged-in').hide();
    $('.logged-out').show();
  }
}

function getCurrentUser(callback){
  $.ajax({
    method: 'get',
    url: '/users/current',
    success: function(data){
      callback(data);
    }
  });
}

// MODAL HANDLING //

function setUserModalHandler(){
  $('.to-modal').click(function(e){
    // Will return 'signup-btn' or 'login-btn'
    var btnClass = e.currentTarget.classList[1];
    $('.modal').css('display', 'block');
    if (btnClass === "signup-btn"){
      $('#signup-success').hide();
      $('#signup').show();
    } else if (btnClass === "login-btn"){
      $('#signup-success').hide();
      $('#login').show();
    } else if (btnClass === "to-login"){
      $('#signup-success').hide();
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
      $('#signup-success').hide();
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
    e.preventDefault();

    var usernameField = $(this).find('input[name=username]');
    var usernameText = usernameField.val();
    usernameField.val('');

    var passwordField = $(this).find('input[name=password]');
    var passwordText = passwordField.val();
    passwordField.val('');

    var userData = {username: usernameText, password: passwordText};

    createUser(userData, function(response){
      renderSignupMessage(response);
    });
  });
}

function renderSignupMessage(response){
  var username = response.username;
  if (response.description === 'invalid'){
    $('.signup-error').show();
  } else {
    $('.signup-error').hide();
    $('#signup').hide();
    $('#signup-success').show();
    $('#signup-success-msg').text('Welcome, ' + username + '!');
  }
}

// USER LOGIN //

function login(userData, callback){
  $.ajax({
    method: 'post',
    url: '/users/authenticate',
    data: userData,
    success: function(data){
      callback(data);
    }
  });
}

function setLoginFormHandler() {
  $('#login').on('submit', function(e){
    e.preventDefault();

    var usernameField = $(this).find('input[name=username]');
    var usernameText = usernameField.val();
    usernameField.val('');

    var passwordField = $(this).find('input[name=password]');
    var passwordText = passwordField.val();
    passwordField.val('');

    var userData = {username: usernameText, password: passwordText};
    login(userData, function(response){
      handleLogin(response);
    });
  });
}

function handleLogin(response){
  if (response.description === "invalid") {
    $('.login-error').show();
  } else {
    $.cookie('token', response.token);
    $('.login-error').hide();
    $('.modal').hide();
    updateView();
  }
}

// LOGOUT //

function setLogoutHandler(){
  $('.logout-btn').click(function(){
    $.removeCookie('token');
    updateView();
  });
}
// ON PAGE LOAD //
$(function(){
  updateView();
  setUserModalHandler();
  setModalCloseListener();
  setSignupFormHandler();
  setLoginFormHandler();
  setLogoutHandler();
});
