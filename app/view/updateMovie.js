mm.view.updateMovie = {
	setupUserInterface : function(){
		var formEl = document.forms['movie'],
			saveButton = formEl.commit,
			selectMovieEl = formEl.selectMovie;
		var key = '', keys = [], movie = null, optionEl = null;
		Movie.loadAll();	
		keys = Object.keys(Movie.instances);
		for(var i = 0; i < keys.length; i++){
			key = keys[i];
			movie = Movie.instances[key];
			optionEl = document.createElement('option');
			optionEl.text = movie.title;
			optionEl.text = movie.movieTime;
			optionEl.value = movie.movieId;
			selectMovieEl.add(optionEl, null);	
		}
		
		selectMovieEl.addEventListener('change', function(){			
			var movie = null, key = selectMovieEl.value;
			var movie = Movie.instances[key];			
			if(key){
				formEl.movieId.value = movie.movieId;
				formEl.movieTitle.value = movie.title;
				formEl.movieRelease.value = movie.releaseDate; 	
				formEl.movieTime.value = movie.movieTime;
			}
		});
		
		saveButton.addEventListener('click', mm.view.updateMovie.handleUpdateEvent);
		window.addEventListener('beforeunload', function(){
			Movie.saveAll();	
		});
	},
	handleUpdateEvent : function(){
		var formEl = document.forms['movie'],
		slots = {
			movieId: formEl.movieId.value,
			title: formEl.movieTitle.value,
			releaseDate: formEl.movieRelease.value,
			movieTime: formEl.movieTime.value
		}
		
		Movie.update(slots);
		formEl.reset();
	}	
	
};