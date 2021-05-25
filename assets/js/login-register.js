
/*
 *
 * login-register modal
 * Autor: Creative Tim
 * Web-autor: creative.tim
 * Web script: http://creative-tim.com
 * 
 */
function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register with');
    }); 
    $('.error').removeClass('alert alert-danger').html('');
       
}
function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        
        $('.modal-title').html('Login with');
    });       
     $('.error').removeClass('alert alert-danger').html(''); 
}

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}
function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}

function loginAjax(){
    /*   Remove this comments when moving to server
    $.post( "/login", function( data ) {
            if(data == 1){
                window.location.replace("/home");            
            } else {
                 shakeModal(); 
            }
        });
    */

/*   Simulate error message from the server   */
     shakeModal();
}

function shakeModal(){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
             $('input[type="password"]').val('');
             setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
}

var flag1 = 0
var flag2 = 0
function check(){
    $(".fa").css("bottom","200px")
    if($('#password_reg').val() == $('#password_confirmation').val()){
        $('#message1').text("Passwords are Matching")
        $('#message1').css('color','green')
        // console.log('Match')
        flag1 = 1
    }
    else{
        $('#message1').text("Passwords are not Matching")
        $('#message1').css('color','red')
        // console.log('No Match')
        flag1 = 0
    }

    if($("#password_reg").val().length < 8){
        $('#message2').text("Password Length should be more than 8 characters")
        $('#message2').css('color','red')
        flag2 = 0
    }
    else{
        $('#message2').text("Password Length valid")
        $('#message2').css('color','green')
        flag2 = 1
    }

    if(flag1 == 1 && flag2 == 1){
        $('.btn-register').attr("disabled",false)
    } else {
        $('.btn-register').attr("disabled",true)
    }
}


$(".fa").click(function(){
    if($('#password_reg').attr('type')=="text"){
        $('#password_reg').attr("type","password")
        $('#password_confirmation').attr("type","password")
    } else {
        $('#password_reg').attr("type","text")
        $('#password_confirmation').attr("type","text")
    }
    $(this).toggleClass("fa-eye-slash")
    $(this).toggleClass("fa-eye")
})   