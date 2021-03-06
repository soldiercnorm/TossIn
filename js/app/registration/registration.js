define([
    'jquery',
    'localizer',
    'text!app/registration/registration.htm',
    'app/exercise-create/exercisecreate',
    'hash',
    'app/student/student',
], function ($, localizer, markup, exerciseView, hash, studentView) {
    var $element = $(_.template(markup)(localizer));

    var $username = $element.find('#username'),
        $password1 = $element.find('#pass1'),
        $password2 = $element.find('#pass2'),
        $ID = $element.find('#id'),
        $email = $element.find('#email'),
        $firstName = $element.find('#firstname'),
        $lastName = $element.find('#lastname');


    var $regBtn = $element.find('#register-submit');
    var $cancelBtn = $element.find('#cancel-submit');

    var loginView;

    var api = {
        show : function (login) {
            $cancelBtn.on('click', function (event) {
                loginView.show();
            });

            $regBtn.on('click', function (event) {

                $userType = $("#userType option:selected").text();
                console.log($userType);
                    
                if(   !$username.val() || !$email.val()     || !$firstName.val() 
                   || !$lastName.val() || !$password1.val() || !$password2.val()){
                        window.alert('All fields required');
                        return;
                }

                if ($password1.val() != $password2.val() ) {
                    window.alert('Passwords must be equal');
                    return;
                }
                else{
                    var newUser = {
                        type : $userType.toUpperCase(),
                        name : $firstName.val() + " " + $lastName.val(),
                        password : hash.hex_sha1($password2.val()),
                        username : $username.val(),
                        email : $email.val(),
                    }

                    console.log(newUser);

                    $.post('/users/create', newUser, function( data ) {
                        if(data != ''){
                            if($userType.toUpperCase() === 'STUDENT'){
                                studentView.show();
                            }else if($userType.toUpperCase() === 'INSTRUCTOR'){
                                exerciseView.show();

                            }

                        }

                    });
                }
            });

            loginView = login;
            var $content = $('#content-inner');
            $content.empty().append($element);
        },
    };

    return api;
});
