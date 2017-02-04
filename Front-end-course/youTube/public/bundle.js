/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _render = __webpack_require__(1);
	
	var _render2 = _interopRequireDefault(_render);
	
	var _slide = __webpack_require__(3);
	
	var _slide2 = _interopRequireDefault(_slide);
	
	var _request = __webpack_require__(2);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _resize = __webpack_require__(4);
	
	var _resize2 = _interopRequireDefault(_resize);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Main = function () {
		function Main() {
			_classCallCheck(this, Main);
	
			Main.render = new _render2.default();
			Main.request = new _request2.default();
			Main.slide = new _slide2.default();
			Main.resize = new _resize2.default();
	
			Main.render.renderPage();
			Main.slide.addListeners(Main.render);
		}
	
		_createClass(Main, [{
			key: 'addSearchListeners',
			value: function addSearchListeners() {
				document.querySelector('#search').addEventListener('keypress', function (e) {
					if (e.keyCode === 13) {
						_slide2.default.slidePos = [0];
						Main.request.chooseVideosCount();
						document.querySelector('.notFound').style.display = 'none';
						document.querySelector('.wrapper').innerHTML = '';
						document.querySelector('#pages').innerHTML = '';
						Main.render.renderFirstSlides();
	
						Main.request.initialization(Main.render, _slide2.default.slidePos);
						_slide2.default.currentPage = 0;
					}
				});
			}
		}]);
	
		return Main;
	}();
	
	var main = new Main();
	main.addSearchListeners();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _request = __webpack_require__(2);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _slide = __webpack_require__(3);
	
	var _slide2 = _interopRequireDefault(_slide);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Render = function () {
	  function Render() {
	    _classCallCheck(this, Render);
	
	    this.request = new _request2.default();
	    var body = document.querySelector('body');
	    body.style.height = window.innerHeight + 'px';
	    body.style.background = 'url("picture.jpg") no-repeat';
	    body.style.backgroundSize = '100% 100%';
	  }
	
	  _createClass(Render, [{
	    key: 'renderPage',
	    value: function renderPage() {
	      var searchSection = document.createElement('section');
	      var label = document.createElement('label');
	      var i = document.createElement('i');
	      var input = document.createElement('input');
	      var videosSection = document.createElement('section');
	      var divWrapper = document.createElement('div');
	      var notFound = document.createElement('div');
	      var sectionPaging = document.createElement('section');
	      var ul = document.createElement('ul');
	
	      searchSection.className = 'search-section';
	      label.setAttribute('for', 'search');
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
	  }, {
	    key: 'renderFirstSlides',
	    value: function renderFirstSlides() {
	      Render.height = true;
	      this.renderSlide(0);
	      document.querySelector('#pages li').className = 'active';
	    }
	  }, {
	    key: 'renderSlide',
	    value: function renderSlide(index) {
	      var sectionSlide = document.createElement('section');
	      var divComponent = document.createElement('div');
	      var h3 = document.createElement('h3');
	      var a = document.createElement('a');
	      var img = document.createElement('img');
	      var ul = document.createElement('ul');
	      var li = document.createElement('li');
	      var p = document.createElement('p');
	      var i = document.createElement('i');
	      var pDescription = document.createElement('p');
	      var page = document.createElement('li');
	      var coverPreview = document.createElement('div');
	
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
	
	      for (var _i = 0; _i < _request2.default.videosCount; _i++) {
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
	  }, {
	    key: 'addNewSlide',
	    value: function addNewSlide() {
	      if (_request2.default.isSearchText()) {
	        this.renderSlide(_slide2.default.slidePos.length);
	        var slides = document.querySelectorAll('.slide');
	        var left = _slide2.default.slidePos[_slide2.default.slidePos.length - 1] + window.innerWidth;
	        slides[slides.length - 1].style.left = left + 'px';
	        _slide2.default.slidePos.push(parseInt(slides[slides.length - 1].style.left));
	        this.request.newRequest();
	      }
	    }
	  }]);
	
	  return Render;
	}();
	
	exports.default = Render;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var apiKey = 'AIzaSyADw5fcEOryqqeuXHafGoTZg9o5n_6E0zY';
	
	var Request = function () {
		function Request() {
			_classCallCheck(this, Request);
		}
	
		_createClass(Request, [{
			key: 'chooseVideosCount',
			value: function chooseVideosCount() {
				if (window.innerWidth > 1250) {
					Request.videosCount = 3;
				} else if (window.innerWidth > 930) {
					Request.videosCount = 2;
				} else {
					Request.videosCount = 1;
				}
			}
		}, {
			key: 'initialization',
			value: function initialization(render, slidePos) {
				Request.counter = 1;
				Request.searchResult = true;
				Request.pageNumber = 0;
				Request.searchText = document.querySelector('#search').value;
				document.querySelector('#search').value = '';
				document.querySelector('#search').setAttribute('placeholder', Request.searchText);
				var url = 'https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&type=video&part=snippet&maxResults=' + Request.videosCount + '&q=' + Request.searchText;
				Request.openXHRRequest(url, false, false, render, slidePos);
			}
		}, {
			key: 'newRequest',
			value: function newRequest() {
				if (Request.searchText && Request.nextPageToken) {
					Request.pageNumber++;
					var url = 'https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&type=video&part=snippet&maxResults=' + Request.videosCount + '&pageToken=' + Request.nextPageToken + '&q=' + Request.searchText;
					Request.openXHRRequest(url);
				}
			}
		}], [{
			key: 'isSearchText',
			value: function isSearchText() {
				return Request.searchResult;
			}
		}, {
			key: 'openXHRRequest',
			value: function openXHRRequest(url, isStatistics, index, render, slidePos) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', url, true);
				xhr.send();
	
				xhr.onreadystatechange = function () {
					if (xhr.readyState == XMLHttpRequest.DONE) {
	
						var response = JSON.parse(xhr.responseText);
						if (isStatistics) {
							for (var i = 0; i < response.items.length; i++) {
								document.querySelectorAll('#viewers')[index + i].innerHTML = response.items[i].statistics.viewCount;
							}
						} else {
							Request.onSearchResponse(response);
						}
						if (render) {
							render.addNewSlide();
						}
					}
				};
			}
		}, {
			key: 'onSearchResponse',
			value: function onSearchResponse(response) {
				// if search result not found show nothing
				if (Request.pageNumber === 0) {
					if (response.items.length !== 0) {
						Request.searchResult = true;
					} else {
						Request.searchResult = false;
						document.querySelector('.wrapper').innerHTML = '';
						document.querySelector('.notFound').style.display = 'block';
					}
				}
	
				var videoIDs = '';
				for (var i = 0; i < response.items.length; i++) {
					var title = response.items[i].snippet.title;
					var description = response.items[i].snippet.description;
					var date = response.items[i].snippet.publishedAt.slice(0, 10);
					var videoID = response.items[i].id.videoId;
					var author = response.items[i].snippet.channelTitle;
					var previewUrl = response.items[i].snippet.thumbnails.medium.url;
					videoIDs += videoID;
					if (i !== response.items.length - 1) {
						videoIDs += ',';
					}
					var index = response.items.length * Request.pageNumber + i;
					document.querySelectorAll('#title')[index].innerHTML = title;
					document.querySelectorAll('#title')[index].setAttribute('href', 'http://www.youtube.com/watch?v=' + videoID);
					document.querySelectorAll('#description')[index].innerHTML = description;
					document.querySelectorAll('#date')[index].innerHTML = date;
					document.querySelectorAll('#author')[index].innerHTML = author;
					document.querySelectorAll('#preview')[index].setAttribute('src', previewUrl);
					document.querySelectorAll('.coverPreview')[index].dataset['id'] = videoID;
				}
				var url = 'https://www.googleapis.com/youtube/v3/videos?key=' + apiKey + '&id=' + videoIDs + '&part=snippet,statistics';
	
				//if render first slides send 1 request for video ID's
				if (Request.pageNumber === 0) {
					Request.firstTwoSlidesID = videoIDs;
				} else if (Request.pageNumber === 1) {
					Request.firstTwoSlidesID += ',' + videoIDs;
					url = 'https://www.googleapis.com/youtube/v3/videos?key=' + apiKey + '&id=' + Request.firstTwoSlidesID + '&part=snippet,statistics';
					Request.openXHRRequest(url, true, 0);
				} else {
					Request.openXHRRequest(url, true, response.items.length * Request.pageNumber);
				}
	
				Request.nextPageToken = response.nextPageToken;
			}
		}]);
	
		return Request;
	}();
	
	exports.default = Request;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Slide = function () {
		function Slide() {
			_classCallCheck(this, Slide);
	
			Slide.slidePos = [0];
			Slide.currentPage = 0;
			this.addNew = true;
		}
	
		_createClass(Slide, [{
			key: 'addListeners',
			value: function addListeners(render) {
				var _this = this;
	
				//slides listeners
				document.querySelector('.videos').addEventListener('touchstart', function (e) {
					_this.slideStart(e, true);
					e.preventDefault();
				});
				document.querySelector('.videos').addEventListener('mousedown', function (e) {
					_this.slideStart(e);
				});
	
				document.querySelector('.videos').addEventListener('mousemove', function (e) {
					_this.slideMove(e, false, render);
				});
				document.querySelector('.videos').addEventListener('touchmove', function (e) {
					_this.slideMove(e, true, render);
					e.preventDefault();
				});
	
				document.querySelector('.videos').addEventListener('mouseup', function (e) {
					_this.slideEnd(e);
				});
				document.querySelector('.videos').addEventListener('touchend', function (e) {
					_this.slideEnd(e);
					e.preventDefault();
				});
	
				// paging listeners
				document.querySelector('#pages').addEventListener('mouseover', function (e) {
					_this.activateHoverPage(e, 'active');
				});
	
				document.querySelector('#pages').addEventListener('mouseout', function (e) {
					_this.activateHoverPage(e, '');
				});
	
				document.querySelector('#pages').addEventListener('click', function (e) {
					var index = _this.getTargetIndex(e);
					var isFirstClicked = index === 0 && e.target === document.querySelector('#pages li');
					if (index !== 0 || isFirstClicked) {
						var allSlides = document.querySelectorAll('.slide');
						var currentLeft = parseInt(allSlides[index].style.left);
						if (currentLeft !== 0) {
							_this.activatePage(index);
							for (var i = 0; i < allSlides.length; i++) {
								var offset = parseInt(allSlides[i].style.left) - currentLeft;
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
				document.querySelector('.wrapper').addEventListener('click', function (e) {
					if (e.target.className === 'coverPreview' || e.target.className === 'fa fa-youtube-play') {
						var parent = e.target.parentNode;
						var iframe = document.createElement('iframe');
						var videoID = void 0;
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
	
				document.querySelector('body').addEventListener('click', function (e) {
					if (e.target.className !== 'coverPreview' && e.target.className !== 'fa fa-youtube-play') {
						var iframes = document.querySelectorAll('iframe');
						for (var i = 0; i < iframes.length; i++) {
							iframes[i].parentNode.childNodes[1].style.display = 'block';
							iframes[i].parentNode.removeChild(iframes[i]);
						}
					}
				});
			}
		}, {
			key: 'slideStart',
			value: function slideStart(e, isTouchEvent) {
				if (this.isTouch) {
					var _allSlides = document.querySelectorAll('.slide');
					for (var i = 0; i < _allSlides.length; i++) {
						_allSlides[i].style.left = Slide.slidePos[i] + 'px';
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
	
				var allSlides = document.querySelectorAll('.slide');
				for (var _i = 0; _i < allSlides.length; _i++) {
					Slide.slidePos.push(parseInt(allSlides[_i].style.left));
				}
			}
		}, {
			key: 'slideMove',
			value: function slideMove(e, isTouchEvent, render) {
				if (isTouchEvent) {
					this.deltaX = e.changedTouches[0].clientX - this.pointX;
					this.pointX = e.changedTouches[0].clientX;
				} else {
					this.deltaX = e.pageX - this.pointX;
					this.pointX = e.pageX;
				}
				if (this.isTouch) {
					if (this.addNew) {
						render.addNewSlide(Slide.slidePos);
						this.addNew = false;
					}
					var allSlides = document.querySelectorAll('.slide');
					var offset = void 0;
					this.next = false;
					for (var i = 0; i < allSlides.length; i++) {
						offset = parseInt(allSlides[i].style.left) + this.deltaX;
						if (this.deltaX < 0) {
							this.next = true;
						}
						var x = void 0;
						if (isTouchEvent) {
							x = Math.abs(e.changedTouches[0].clientX - this.startX);
						} else {
							x = Math.abs(e.pageX - this.startX);
						}
						if (x > window.innerWidth / 3) {
							this.isTouch = false;
							var isMoveFirstSlide = false;
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
							this.activatePage(i);
						}
					}
					this.addNewCheck();
				}
			}
		}, {
			key: 'slideEnd',
			value: function slideEnd(e) {
				this.addNewCheck();
				if (this.isTouch) {
					var allSlides = document.querySelectorAll('.slide');
					for (var i = 0; i < allSlides.length; i++) {
						allSlides[i].style.left = Slide.slidePos[i] + 'px';
					}
				}
				this.isTouch = false;
			}
		}, {
			key: 'addNewCheck',
			value: function addNewCheck() {
				if (Slide.slidePos[Slide.slidePos.length - 2] === 0 && this.next) {
					this.addNew = true;
				}
			}
		}, {
			key: 'activatePage',
			value: function activatePage(ind) {
				var activeLi = document.querySelectorAll('.active');
				if (activeLi) {
					for (var i = 0; i < activeLi.length; i++) {
						activeLi[i].classList.remove('active');
					}
				}
				document.querySelectorAll('#pages li')[ind].className = 'active';
				Slide.currentPage = ind;
			}
		}, {
			key: 'activateHoverPage',
			value: function activateHoverPage(e, className) {
				var index = this.getTargetIndex(e);
				var isFirstHovered = void 0,
				    isIndex0 = true;
				if (className) {
					isIndex0 = index !== 0;
					isFirstHovered = index === 0 && e.target === document.querySelector('#pages li');
				}
				if (index !== Slide.currentPage && isIndex0 || index !== Slide.currentPage && isFirstHovered) {
					document.querySelectorAll('#pages li')[index].className = className;
				}
			}
		}, {
			key: 'getTargetIndex',
			value: function getTargetIndex(e) {
				var target = e.target;
				return Array.prototype.indexOf.call(target.parentNode.childNodes, target);
			}
		}]);
	
		return Slide;
	}();
	
	exports.default = Slide;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _request = __webpack_require__(2);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _render = __webpack_require__(1);
	
	var _render2 = _interopRequireDefault(_render);
	
	var _slide = __webpack_require__(3);
	
	var _slide2 = _interopRequireDefault(_slide);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Resize = function () {
		function Resize() {
			_classCallCheck(this, Resize);
	
			Resize.render = new _render2.default();
			window.onresize = function () {
				if (document.querySelector('.wrapper').innerHTML !== '') {
					var videosCount = _request2.default.videosCount;
	
					if (window.innerWidth > 1250) {
						if (_request2.default.videosCount !== 3) {
							_request2.default.videosCount = 3;
							Resize.rerendering(3, videosCount);
						}
					} else if (window.innerWidth > 930) {
						if (_request2.default.videosCount !== 2) {
							_request2.default.videosCount = 2;
							Resize.rerendering(2, videosCount);
						}
					} else if (window.innerWidth < 930) {
						if (_request2.default.videosCount !== 1) {
							_request2.default.videosCount = 1;
							Resize.rerendering(1, videosCount);
						}
					}
	
					Resize.changeSlidesPosition();
				}
			};
		}
	
		_createClass(Resize, null, [{
			key: 'changeSlidesPosition',
			value: function changeSlidesPosition() {
				var width = window.innerWidth;
				var leftPos = -1 * _slide2.default.currentPage * width;
				var slides = document.querySelectorAll('.slide');
				_slide2.default.slidePos = [];
	
				for (var i = 0; i < slides.length; i++) {
					_slide2.default.slidePos.push(leftPos);
					slides[i].style.left = leftPos + 'px';
					leftPos += width;
				}
			}
		}, {
			key: 'rerendering',
			value: function rerendering(count, previousCount) {
				var components = Array.from(document.querySelectorAll('.component'));
				var docFragment = document.createDocumentFragment();
				var offset = 0;
				var length = components.length / count;
	
				components.reverse();
				document.querySelector('.wrapper').innerHTML = '';
				document.querySelector('#pages').innerHTML = '';
				_slide2.default.slidePos = [];
				_request2.default.pageNumber = -1;
	
				for (var i = 0; i < Math.floor(length); i++) {
					var sectionSlide = document.createElement('section');
					var page = document.createElement('li');
	
					_request2.default.pageNumber++;
					sectionSlide.className = 'slide';
					sectionSlide.setAttribute('style', 'left:' + offset + 'px');
					_slide2.default.slidePos.push(offset);
					for (var j = 0; j < count; j++) {
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
	
				var targetIndex = Math.floor(previousCount * _slide2.default.currentPage / count);
				document.querySelectorAll('#pages li')[targetIndex].click();
				if (!targetIndex) {
					setTimeout(function () {
						document.querySelectorAll('#pages li')[targetIndex].click();
					}, 0);
					document.querySelector('#pages li').className = 'active';
				}
			}
		}]);
	
		return Resize;
	}();
	
	exports.default = Resize;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map