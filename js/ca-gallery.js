(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse the navbar when page is scrolled
  $(window).scroll(function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });

})(jQuery); // End of use strict

var gPortfolioArr=[
  {
   id: "1",
   name: "MosheGram",
   "title": "Instagram clone in React",
   "desc": "Include : React,Redux,Hooks, MongoDB, NodeJS and CSS3.",
   "code":"https://github.com/Moshmel/MosheGram",
   "url": "img/portfolio/moshegram.jpg",
   "publishedAt": Date.now(),
   "link":"https://moshegram.herokuapp.com/#/",
   "labels": ["react", "redux","mongodb","css3","nodejs"],
  },
  {
    "id": "2",
    "name": "ShaniMela",
    "title": "Freelance website in React",
    "desc": "Include : react,reux,mongoDb and nodeJs",
    "url": "img/portfolio/shanimela.jpg",
    "code":"https://github.com/Moshmel/React-ShaniMela",
    "publishedAt": Date.now(),
    "link":"https://shanimela.herokuapp.com/#/",
    "labels": ["Matrixes", "keyboard events"],
   },
   {
    "id": "3",
    "name": "Explority",
    "title": "Vue Final project",
    "desc": "include: Vue,Vuex,nodeJs,MongoDB. This app will help you  to find point of interests between 2 cities. Due api google restrictions, This app is not avalible on-line",
    "url": "img/portfolio/explority.jpg",
    "code":"#",
    "publishedAt": Date.now(),
    "link":"",
    "labels": ["GoogleApi", "Vue","Vuex","MongoDB","NodeJS","CSS","HTML"],
   },
   {
    "id": "4",
    "name": "Meme-generator",
    "title": "VanillaJs project",
    "desc": "This app was made during Codeing-academy bootcamp",
    "url": "img/portfolio/memeGenerator.jpg",
    "code":"https://github.com/Moshmel/meme-generator",
    "publishedAt": Date.now(),
    "link":"https://moshmel.github.io/meme-generator/",
    "labels": ["VanillaJs", "Html","Css"],
   }
  
  ]
  function init()
  {
    renderPortfolio()
    renderPortfolioModal()
  }


 
  function renderPortfolio()
  {
    var portfolioHtml='';
    portfolioHtml=gPortfolioArr.map(function(port,index)
    {
      return`<div class="col-md-4 col-sm-6 portfolio-item">
      <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${port.id}">
        <div class="portfolio-hover">
          <div class="portfolio-hover-content">
            <i class="fa fa-plus fa-3x"></i>
          </div>
        </div>
        <img class="img-fluid" src="${port.url}" alt="">
      </a>
      <div class="portfolio-caption">
        <h4>${port.name}</h4>
        <p class="text-muted">${port.title}</p>
      </div>
    </div>`
  
    })
    portfolioHtml=portfolioHtml.join('');
    $('#portfolio-container').html(portfolioHtml);
    
  }
  function renderPortfolioModal()
  {
    var modalHtml=gPortfolioArr.map(function(port,index){
      var date = new Date(gPortfolioArr[0].publishedAt);
      date=date.toLocaleDateString();
      return` <div class="portfolio-modal modal fade" id="portfolioModal${(port.id)}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                
                <h2>${port.name}</h2>
                <p id="title-protfolio"class="item-intro text-muted">${port.title}</p>
                <img class="img-fluid d-block mx-auto" src="${port.url}" alt="">
                <p>${port.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${date}</li>
                  <li>Category: Web app</li>
                </ul>
                <div><a href="${port.link}" target="_blank"><h3>To app</h3></a></div>
                <div><a href="${port.code}" target="_blank"><h3>To code</h3></a></div>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project</button>
                    
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
    })
    modalHtml=modalHtml.join('');
    console.log(modalHtml);
    $('#modal-container').html(modalHtml);
  }

  
  
