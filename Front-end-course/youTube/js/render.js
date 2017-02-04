import Request from './request.js';
import Slide from './slide.js';

export default class Render{
    constructor() {
		this.request = new Request();
    	let body = document.querySelector('body');
    	body.style.height = window.innerHeight + 'px';
    	body.style.background = 'url("picture.jpg") no-repeat';
    	body.style.backgroundSize = '100% 100%';
    }

    renderPage() {
    	let searchSection = document.createElement('section');
    	let label = document.createElement('label');
    	let i = document.createElement('i');
    	let input = document.createElement('input');
    	let videosSection = document.createElement('section');
    	let divWrapper = document.createElement('div');
    	let notFound = document.createElement('div');
    	let sectionPaging = document.createElement('section');
    	let ul = document.createElement('ul');

    	searchSection.className = 'search-section';
    	label.setAttribute('for', 'search')
    	i.classList.add('fa', 'fa-search');
    	label.appendChild(i);
    	input.setAttribute('type', 'text');
    	input.setAttribute('id', 'search');
    	input.setAttribute('autofocus', '');
    	searchSection.appendChild(label);
    	searchSection.appendChild(input);

    	videosSection.className = 'videos';

    	divWrapper.className = 'wrapper';
    	videosSection.appendChild(divWrapper);

    	document.querySelector('body').appendChild(searchSection);

    	notFound.className = 'notFound';
    	notFound.innerHTML = 'Search result is not found!';
    	notFound.style.display = 'none';
    	document.querySelector('body').appendChild(notFound);
    	
    	sectionPaging.className = 'paging';
    	ul.setAttribute('id', 'pages');
    	sectionPaging.appendChild(ul);
    	document.querySelector('body').appendChild(sectionPaging);

    	document.querySelector('body').appendChild(videosSection);
    }

    renderFirstSlides() {
    	Render.height = true;
    	this.renderSlide(0);
		document.querySelector('#pages li').className = 'active';
    }

    renderSlide(index) {
    	let sectionSlide = document.createElement('section'); 
    	let divComponent = document.createElement('div');
    	let h3 = document.createElement('h3');
    	let a = document.createElement('a');
    	let img = document.createElement('img');
    	let ul = document.createElement('ul');
    	let li = document.createElement('li');
    	let p = document.createElement('p');
    	let i = document.createElement('i');
    	let pDescription = document.createElement('p');
    	let page = document.createElement('li');
    	let coverPreview = document.createElement('div');

    	sectionSlide.className = 'slide';
    	sectionSlide.setAttribute('style', 'left: 0px');
    	divComponent.className = 'component';
    	a.setAttribute('id', 'title');
    	a.className = 'title';
    	h3.appendChild(a);
    	divComponent.appendChild(h3);

    	coverPreview.className = 'coverPreview';
    	img.setAttribute('id', 'preview');
    	i.classList.add('fa', 'fa-youtube-play');
    	coverPreview.appendChild(img);
    	coverPreview.appendChild(i);
    	divComponent.appendChild(coverPreview);

    	ul.setAttribute('id', 'info');
    	i = document.createElement('i');
    	i.classList.add('fa', 'fa-user');
    	p.setAttribute('id', 'author');
    	li.appendChild(i);
    	li.appendChild(p);
    	ul.appendChild(li);

    	li = document.createElement('li');
    	i = document.createElement('i');
    	i.classList.add('fa', 'fa-calendar');
    	p = document.createElement('p');
    	p.setAttribute('id', 'date');
    	li.appendChild(i);
    	li.appendChild(p);
    	ul.appendChild(li);

    	li = document.createElement('li');
    	i = document.createElement('i');
    	i.classList.add('fa', 'fa-eye');
    	p = document.createElement('p');
    	p.setAttribute('id', 'viewers');
    	li.appendChild(i);
    	li.appendChild(p);
    	ul.appendChild(li);
    	divComponent.appendChild(ul);

    	pDescription.setAttribute('id', 'description');
    	divComponent.appendChild(pDescription);

    	for (let i = 0; i < Request.videosCount; i++) {
	    	sectionSlide.appendChild(divComponent.cloneNode(true));
    	}

    	document.querySelector('.wrapper').appendChild(sectionSlide);
    	page.innerHTML = index + 1;
    	document.querySelector('#pages').appendChild(page);
    	if (Render.height) {
	    	document.querySelector('.videos').style.height = document.querySelector('.component').offsetHeight + 60 + 'px';
    		Render.height = false;
    	}
    }

	addNewSlide() {
		if (Request.isSearchText()) {
			this.renderSlide(Slide.slidePos.length);
			let slides = document.querySelectorAll('.slide');
			let left = Slide.slidePos[Slide.slidePos.length - 1] + window.innerWidth ;
			slides[slides.length - 1].style.left =  left + 'px';
			Slide.slidePos.push(parseInt(slides[slides.length - 1].style.left));
			this.request.newRequest();
		}
	}
}