define([
    'jquery',
    'text!app/login/login.htm',
    'app/instructor/instructor'
], function ($, markup, instructorView) {
    var $element = $(markup);

    var $username = $element.find('input[type=text]'),
        $password = $element.find('input[type=password]');

    var $loginBtn = $element.find('#login-submit');
    $loginBtn.on('click', function (event) {
        // TODO more strict validation on login parameters
        // (username exists, password correct, etc.)
        //if ($username.val().length && $password.val().length)
            // going right to instructor view and using dummy assignment ID
            instructorView.show("0");
			EXERCISE_CREATE.loadSavedExercises();
    });

    // each view should empty and build '#content-inner'
    var $content = $('#content-inner');
    $content.empty()
    $content.append($element);
});
