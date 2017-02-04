import Request from './request.js';
import Render from './render.js';
import Slide from './slide.js';

export default class Resize {
	constructor() {
		Resize.render = new Render();
		window.onresize = function() {
			if (document.querySelector('.wrapper').innerHTML !== '') {
			    let videosCount = Request.videosCount;

			    if (window.innerWidth > 1250) {
			    	if (Request.videosCount !== 3) {
						Request.videosCount = 3;
						Resize.rerendering(3, videosCount);
			    	}
				} else if (window.innerWidth > 930) {
					if (Request.videosCount !== 2) {
						Request.videosCount = 2;
						Resize.rerendering(2, videosCount);
					}
				} else if (window.innerWidth < 930){
					if (Request.videosCount !== 1) {
						Request.videosCount = 1;
						Resize.rerendering(1, videosCount);
					}
				}

				Resize.changeSlidesPosition();
			}
		};
	}

	static changeSlidesPosition() {
		let width = window.innerWidth;
		let leftPos = (-1) * Slide.currentPage * width;
		let slides = document.querySelectorAll('.slide');
		Slide.slidePos = [];

		for (let i = 0; i < slides.length; i++) {
			Slide.slidePos.push(leftPos);
			slides[i].style.left = leftPos + 'px';
			leftPos += width;
		}
	}

	static rerendering(count, previousCount) {
		let components = Array.from(document.querySelectorAll('.component'));
		let docFragment = document.createDocumentFragment();
		let offset = 0;
		let length = components.length/count; 

		components.reverse();
		document.querySelector('.wrapper').innerHTML = '';
		document.querySelector('#pages').innerHTML = ''; 
		Slide.slidePos = [];
		Request.pageNumber = -1;

		for (var i = 0; i < Math.floor(length); i++) {
			let sectionSlide = document.createElement('section'); 
			let page = document.createElement('li');

			Request.pageNumber++;
			sectionSlide.className = 'slide';
	    	sectionSlide.setAttribute('style', 'left:' + offset + 'px');
	    	Slide.slidePos.push(offset);
	    	for (let j = 0; j< count; j++) {
	    		if (components.length) {
		    		sectionSlide.appendChild(components[components.length - 1]);
		    		components.pop();
	    		}
	    	}
	    	offset += window.innerWidth;
	    	docFragment.appendChild(sectionSlide);
	    	
			page.innerHTML = i + 1;
	    	document.querySelector('#pages').appendChild(page);
		}

    	document.querySelector('.wrapper').appendChild(docFragment);

    	let targetIndex = Math.floor(previousCount * Slide.currentPage / count);
    	document.querySelectorAll('#pages li')[targetIndex].click();
    	if (!targetIndex) {
    		setTimeout(function(){ 
    			document.querySelectorAll('#pages li')[targetIndex].click(); 
    		}, 0);
    		document.querySelector('#pages li').className = 'active';
    	}
	}
}