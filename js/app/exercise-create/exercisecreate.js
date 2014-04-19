define([
	'jquery',
	'text!app/instructor/instructor.htm',
	'text!app/exercise-create/exercise_create.htm',
	'stringutil',
	'app/instructor/instructor',
	'mocks',
], function ($, markup, ex_markup, stringutil) {
	var $element = $(markup);
		
	var $exercise = $element.find('#exercise-create'),
        $savedlist = $element.find('#ex-saved-pane');
		
	var api = {
		/** Shows the exercise create interface **/
		show : function () {
			var $content = $('#content-inner');
			$content.empty().append($element);
			$('#exercise-create').append(ex_markup);
			$('#ex-saved-pane').show();
			$('#word-banke,#status-lights,#chat-box').hide();
			$('#student-list').css('visibility','hidden');
			EXERCISE_CREATE.loadSavedExercises();
		},
	};
	
	var EXERCISE_CREATE = {
		/** Removes a word from list **/
		removeWord : function (button) {
			//Never delete last word bank in list
			if( $('#wordlist-pane li').length == 1) {
				$('#wordlist-pane input').val('');
				return;
			}
			//Remove the word bank
			$(button).closest('li').detach();
			//Remove add-button and append to last entry
			$('#wordlist-pane li').find('.add-button').detach();
			$('#wordlist-pane li:last').append( EXERCISE_CREATE.get_add_button );
		},
		
		/** Removes an exercise from the list **/
		removeExercise : function (button) {
			console.log("removing exercise");
			var $div = $(button).closest('div'),
				key = $div.find('.saved-exercise-name').html();
			delete EXERCISE_CREATE.savedExercises[key];
			$div.detach();
		},
	
		/** Adds a word bank to the word list **/
		add_word : function () {
			console.log("adding word");
			var li = $('#wordlist-pane ol').find('li:last').clone();
			$('#wordlist-pane li').find('.add-button').detach();
			$('#wordlist-pane ol').append(li);
		},
			
		/** This loads the current list of saved exercises into the data structure **/
		loadSavedExercises : function () {
			var se = EXERCISE_CREATE.savedExercises;
			
			for(var key in se) {
				var div = savedExerciseMarkup;
				var formatted = stringutil.format(div, key);
				$('.saved-list').append(formatted);
			}
		},
			
		/** Saves current exercise **/
		saveExercise : function () {
			console.log("saving exercise");
			var data = {
				name : $('#ex-name').val(),
				description : $('#ex-description').val(),
			};
			
			var newExercise = (EXERCISE_CREATE.savedExercises[data.name] == undefined);
			
			var words = [];
			$('.word-list li input').each(function () {
				words.push(this.value);
			});
			
			data.words = words;
			EXERCISE_CREATE.savedExercises[data.name] = data;
			//Don't append a new listing if the exercise already exists
			if(newExercise) {
				
				$('.saved-list').append(savedExerciseMarkup);
			}
		},
			
		/** Loads a saved exercise and populates the edit fields **/
		loadExercise : function (button) {
			//Pull key out of div to locate data
			var key = $(button).closest('div').find('.saved-exercise-name').html();
			var loaded = EXERCISE_CREATE.savedExercises[key];
			
			/** Populate editable fields with loaded exercise data **/
			$('#ex-name').val(loaded.name);
			$('#ex-description').val(loaded.description);
			$('#rndm-order')[0].checked = loaded.random;
			
			//Clear current list
			$('.word-list li:not(:last)').detach();
					
			//Populate word list
			$('.word-list input:last').val(loaded.words[0]);
			for(var x = 1; x < loaded.words.length; x++) {
				EXERCISE_CREATE.add_word();
				$('.word-list input:last').val(loaded.words[x]);
			}
		},
		
		/** Initial Data **/
		savedExercises : {
			'Ex. 1' : {
				name : 'Ex. 1',
				random : true,
				description : 'First exercise',
				words : ['paddle', 'a fruit', 'a number', 'boat', 'a famous actor', 'an animal', 'desk']
			},
			'Nouns!' : {
				name : 'Nouns!',
				random : false,
				description : 'Nouns FTW!',
				words : ['garden gnome', 'pretzel', 'Philadelphia', 'house', 'Margaret Thatcher']
			},
			'Verbs!' : {
				name : 'Verbs!',
				random : true,
				description : 'Verbs are radical',
				words : ['bring', 'relax', 'remember', 'forget', 'punch']
			}
		},
	};
	
	var addWordMarkup =
		'<button type="button" class="btn btn-success add-button" onclick="EXERCISE_CREATE.add_word(this)"><i class="glyphicon glyphicon-plus"/></button>';
		
	var savedExerciseMarkup =
		'<div class="row-fluid">'
			+'<span class="saved-exercise-name">{0}</span>'
			+'<button type="button" class="btn btn-success" onclick="EXERCISE_CREATE.loadExercise(this)">'
				+'<i class="glyphicon glyphicon-pencil" />'
			+'</button>'
			+'<button type="button" class="btn btn-warning" onclick="EXERCISE_CREATE.launchExercise(this)">'
				+'<i class="glyphicon glyphicon-plane"/>'
			+'</button>'
			+'<button type="button" class="btn btn-danger" onclick="EXERCISE_CREATE.removeExercise(this)">'
				+'<i class="glyphicon glyphicon-trash" />'
			+'</button>'
		+'</div>'
	    ;
	
	return api;
});
