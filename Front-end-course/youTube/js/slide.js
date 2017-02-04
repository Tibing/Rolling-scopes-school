export default class Slide {
	constructor() {
		Slide.slidePos = [0];
		Slide.currentPage = 0;
		this.addNew = true;
	}
	
	addListeners(render) {
		//slides listeners
		document.querySelector('.videos').addEventListener('touchstart', e => {
			this.slideStart(e, true);
			e.preventDefault();
		});
		document.querySelector('.videos').addEventListener('mousedown', e => {
			this.slideStart(e);
		});

		
		document.querySelector('.videos').addEventListener('mousemove', e => {
			this.slideMove(e, false, render);
		});
		document.querySelector('.videos').addEventListener('touchmove', e => {
			this.slideMove(e, true, render);
			e.preventDefault();
		});

		document.querySelector('.videos').addEventListener('mouseup', e => {
			this.slideEnd(e);
		});
		document.querySelector('.videos').addEventListener('touchend', e => {
			this.slideEnd(e);
			e.preventDefault();
		});

		// paging listeners
		document.querySelector('#pages').addEventListener('mouseover', e => {
			this.activateHoverPage(e, 'active');
		});

		document.querySelector('#pages').addEventListener('mouseout', e => {
			this.activateHoverPage(e, '');
		});

		document.querySelector('#pages').addEventListener('click', e => {
			let index = this.getTargetIndex(e);
			let isFirstClicked = (index === 0) && (e.target === document.querySelector('#pages li'));
			if (index !== 0 || isFirstClicked) {
				let allSlides = document.querySelectorAll('.slide');
				let currentLeft = parseInt(allSlides[index].style.left);
				if (currentLeft !== 0) {
					this.activatePage(index)
					for (let i = 0; i < allSlides.length; i++) {
						let offset = parseInt(allSlides[i].style.left) - currentLeft;
						Slide.slidePos[i] = offset;
						allSlides[i].style.left = offset + 'px';
					}
				} 
				if (index === Slide.slidePos.length - 1) {
					render.addNewSlide();
				}
			}
		});

		//listeners for iframes
		document.querySelector('.wrapper').addEventListener('click', e => {
			if (e.target.className === 'coverPreview' || e.target.className === 'fa fa-youtube-play') {
				let parent = e.target.parentNode;
				let iframe = document.createElement('iframe');
				let videoID;
				e.target.style.display = 'none';
				iframe.setAttribute('width', '300');
				iframe.setAttribute('height', '185');
				iframe.setAttribute('frameborder', '0');
				if (e.target.className === 'fa fa-youtube-play') {
					videoID = parent.dataset['id'];
				} else {
					videoID = e.target.dataset['id'];
				}
				iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoID + '?autoplay=1');
				iframe.setAttribute('allowfullscreen', '');
				parent.insertBefore(iframe, parent.childNodes[2]);
			}
		});

		document.querySelector('body').addEventListener('click', e => {
			if (e.target.className !== 'coverPreview' && e.target.className !== 'fa fa-youtube-play') {
				let iframes = document.querySelectorAll('iframe');
				for (var i = 0; i < iframes.length; i++) {
					iframes[i].parentNode.childNodes[1].style.display = 'block';
					iframes[i].parentNode.removeChild(iframes[i]);
				}
			}
		});
	}

	slideStart(e, isTouchEvent) {
		if (this.isTouch) {
			let allSlides = document.querySelectorAll('.slide');
			for (let i = 0; i < allSlides.length; i++) {
				allSlides[i].style.left = Slide.slidePos[i] + 'px';
			}
		}
		Slide.slidePos = [];
		this.isTouch = true;
		if (isTouchEvent) {
			this.pointX = e.changedTouches[0].clientX;
		} else {
			this.pointX = e.pageX;
		}
		this.startX = this.pointX;

		let allSlides = document.querySelectorAll('.slide');
		for (let i = 0; i < allSlides.length; i++) {
			Slide.slidePos.push(parseInt(allSlides[i].style.left));
		}
	}

	slideMove(e, isTouchEvent, render) {
		if (isTouchEvent) {
			this.deltaX = (e.changedTouches[0].clientX - this.pointX);
			this.pointX = e.changedTouches[0].clientX;
		} else {
			this.deltaX = (e.pageX - this.pointX);
			this.pointX = e.pageX;
		}
		if (this.isTouch) {
			if (this.addNew) {
				render.addNewSlide(Slide.slidePos);
				this.addNew = false;
			}
			let allSlides = document.querySelectorAll('.slide');
			let offset;
			this.next = false;
			for (let i = 0; i < allSlides.length; i++) {
				offset = parseInt(allSlides[i].style.left) + this.deltaX;
				if (this.deltaX < 0) {
					this.next = true
				}
				let x;
				if (isTouchEvent) {
					x = Math.abs(e.changedTouches[0].clientX - this.startX);
				} else {
					x = Math.abs(e.pageX - this.startX);
				}
				if (x > window.innerWidth / 3) {
					this.isTouch = false;
					let isMoveFirstSlide = false;
					if (parseInt(allSlides[i].style.left) > Slide.slidePos[i]) {
						isMoveFirstSlide = true;
						offset = Slide.slidePos[i] + window.innerWidth;
					} else {
						offset = Slide.slidePos[i] - window.innerWidth;
					}
					if (isMoveFirstSlide && Slide.slidePos[0] === 0) {
						offset -= window.innerWidth;
					}
				}
				allSlides[i].style.left = offset + 'px';
				if (parseInt(allSlides[i].style.left) === 0) {
					this.activatePage(i)
				}
			}
			this.addNewCheck();
		}
	}

	slideEnd(e) {
		this.addNewCheck();
		if (this.isTouch) {
			let allSlides = document.querySelectorAll('.slide');
			for (let i = 0; i < allSlides.length; i++) {
				allSlides[i].style.left = Slide.slidePos[i] + 'px';
			}
		}
		this.isTouch = false;	
	}
	
	addNewCheck() {
		if (Slide.slidePos[Slide.slidePos.length - 2] === 0 && this.next) {
			this.addNew = true;
		}
	}

	activatePage(ind) {
		let activeLi = document.querySelectorAll('.active');
		if (activeLi) {
			for (let i = 0; i < activeLi.length; i++) {
				activeLi[i].classList.remove('active');
			}
		}
		document.querySelectorAll('#pages li')[ind].className = 'active';
		Slide.currentPage = ind;
	}

	activateHoverPage(e, className) {
		let index = this.getTargetIndex(e);
		let isFirstHovered, isIndex0 = true;
		if (className) {
			isIndex0 = (index !== 0);
			isFirstHovered = (index === 0) && (e.target === document.querySelector('#pages li'));
		}
		if ((index !== Slide.currentPage && isIndex0) || (index !== Slide.currentPage && isFirstHovered)) {
			document.querySelectorAll('#pages li')[index].className = className;
		}
	}

	getTargetIndex(e){
		let target = e.target;
		return Array.prototype.indexOf.call(target.parentNode.childNodes,target);
	}
}