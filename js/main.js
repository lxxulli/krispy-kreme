$(document).ready(function(){
    var winWidth = $(window).width();

    $(".nav-btn").on("click", function(){
        $(this).toggleClass("active");   
        $("nav").toggleClass("on");     
    });

    
    $(".menu_more").on("click",function(){
        $(this).css({
            "display" : "none"
        })
        $(".menu .hidden_box").css({
            "display" : "none"
        })
        $(".menu .doughnut").css({
            "overflow" : "unset",
            "height" : "100%",
            "paddingBottom" : "50px"
        });
        $(".menu").addClass("expand")
    })

    $("html").on("click",function(e){
        e.preventDefault();
    })

    function setMenuHeight() {
        var doughnutSize = $(".menu .doughnut .item").width();
        console.log(doughnutSize)
        $(".menu .doughnut").css({
            "overflow" : "hidden",
            "height" : doughnutSize * 3
        })
    }

    function flip() {
        setMenuHeight()
        $(".menu .hidden_box").show();
        $(".menu .hidden_box button").show();
        $(".item .txt").removeClass("on")
        $(".menu").removeClass("expand")
    }

    $(window).on("scroll",function(){
        var scr = $(window).scrollTop();
        var downEnd = $(".poster").offset().top; 
        var menuHeight = $(".menu").offset().top;
        var winHeight = $(window).height();
        var upEnd = menuHeight - winHeight;

        if(scr > downEnd && $(".menu").hasClass("expand")){
            flip();
            $(window).scrollTop($(".poster").offset().top);
        } else if(scr < upEnd){
            flip();
        }
    });

    $(".inner .item").on("click",function(){
        var i = $(this).index();
        
        $(".item").eq(i).find(".txt").addClass("on")
        $(".item").eq(i).siblings().find(".txt").removeClass("on");
        $(this).css("zIndex",10).siblings().css("zIndex","auto")
    });

    var startPos;
    $(".poster").on("touchstart", function(e) {
        $(this).find(".choice").stop().fadeOut();
        startPos = e.touches[0].pageX;
    });
    $(".poster").on("touchmove", function(e) {
        $(".video")
        var videoplay = $(".poster").scrollLeft();
        var vdo = $(".poster").find("video");
        if(videoplay >= $(window).width() / 2){
            alert("aaa")
            vdo.get(0).currentTime = 0;
            vdo.get(0).play();
        } else if(videoplay < $(window).width()){
            vdo.get(0).pause();
        }
    });

    $(".poster .poster_wrap > div > div").width(winWidth);
    $(".poster .poster_wrap > div").on("mouseenter", function() {
        $(this).addClass("on").removeClass("off")
        $(this).siblings().addClass("off").removeClass("on");

        var vdo = $(this).find("video");
        if(vdo){
            vdo.get(0).currentTime = 0
            vdo.get(0).play();
        } else {
            vdo.get(0).pause();
        }

    })
    $(".poster").on("mouseleave", function() {
        $(".poster .poster_wrap > div").removeClass("on").removeClass("off");
        $(".poster").find("video").get(0).pause();
    })

    function resizing() {
        winWidth = $(window).width();
        $(".poster .poster_wrap > div > div").width(winWidth);
        setMenuHeight()
    }

    $(window).resize(resizing);
    setMenuHeight()
    AOS.init();
})