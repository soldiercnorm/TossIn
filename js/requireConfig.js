require.config({
    baseUrl: 'js',
    paths: {
        // 3rd party libraries
        jquery: 'vendor/jquery-1.10.2.min',
        jqueryui: 'vendor/jquery-ui-1.10.4.custom',
        underscore: 'vendor/underscore',
        moment: 'vendor/moment.min',
        hotkeys: 'vendor/jquery.hotkeys',
        
        // jquery plugins
        mockjax: 'plugins/mockjax',
        bootstrap: 'plugins/bootstrap',
        editor: 'plugins/bootstrap-wysiwyg',

        // requirejs plugins
        text: 'plugins/text',

        // widgets
        studentlist: 'widgets/student-list/student-list',
        texteditor: 'widgets/text-editor/text-editor',
		wordbank: 'widgets/word-bank/word-bank',
		exercisecreate: 'widgets/exercise-create/exercise_create',
        timer: 'widgets/timer/timer',
        chatbox: 'widgets/chatbox/chatbox',

        // utils
        stringutil: 'util/stringutil',
        localizer: 'util/localizer/localizer',
        hash: 'util/hash',
        mocks: 'mock/mocks'
    }
});
