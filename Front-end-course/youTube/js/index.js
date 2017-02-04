import Render from './render.js';
import Slide from './slide.js';
import Request from './request.js';
import Resize from './resize.js';

class Main {
	constructor() {
		Main.render = new Render();
		Main.request = new Request();
		Main.slide = new Slide();
		Main.resize = new Resize();

		Main.render.renderPage();
		Main.slide.addListeners(Main.render);
	}

	addSearchListeners() {
		document.querySelector('#search').addEventListener('keypress', function(e) {
			if (e.keyCode === 13) {
				Slide.slidePos = [0];
				Main.request.chooseVideosCount();
				document.querySelector('.notFound').style.display = 'none';
				document.querySelector('.wrapper').innerHTML = '';
				document.querySelector('#pages').innerHTML = '';
				Main.render.renderFirstSlides();

				Main.request.initialization(Main.render, Slide.slidePos);
				Slide.currentPage = 0;
			}
		});
	}
}

let main = new Main();
main.addSearchListeners();