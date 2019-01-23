$(function(){
    // $.ajax({
    //     type: "get",
    //     url: "../data.json",
    //     dataType: "json",
    //     success: function (response) {
    //     if(response.code==1){
    //         var name = response.data["name"];
    //         $(".user_login_link").hide();
    //         $(".user_welcome").show().children("em").html(name);
    //     } 
    //     else{
    //         $(".user_login_link").show();
    //         $(".user_welcome").hide();


    //     }
    //     }
    // });

    var slide_index=0;
    $slide=$(".slide");
    $width=$(".slide_con").outerWidth();
    $points=$(".points");
    var timer=null;

    $slide.children().eq(slide_index).stop().css({
        left:"0px",
    });

    function slide_auto_animate(){
        $slide.children().eq(slide_index).siblings().css({
            left:"760px",
        })
        slide_index++;
        slide_index %= $slide.children().length;

        $slide.children().eq(slide_index).prev().stop().animate({
            left:"-760px",
        },300,"swing",function(){
            $slide.children().eq(slide_index).prev().css({
                left:"760px",
            })
        })

        $slide.children().eq(slide_index).stop().animate({
            left:0,
        },300,"swing")

        if(slide_index==0){
            $slide.children().last().stop().animate({
                left:"-760px",
            },300,"swing",function(){
                $slide.children().eq(slide_index).nextAll().css({
                    left:"760px",
                })
            });
        }
        $points.children().removeClass("active");
        $points.children().eq(slide_index).addClass("active");
    }  

    timer=setInterval(function(){
        slide_auto_animate();
    },5000);

    $('.slide_con').hover(function () {
            // over
            clearInterval(timer);
        }, function () {
            // out
            timer=setInterval(function(){
                slide_auto_animate();
            },3000);
        }
    );

    function change_status(){
        $slide.children().eq(slide_index).prevAll().stop().animate({
            left:"-760px",
        },300,"swing",function(){
        })

        $slide.children().eq(slide_index).stop().animate({
            left:0,
        },300,"swing")

        $slide.children().eq(slide_index).nextAll().stop().animate({
            left:"760px",
        },300,"swing",function(){
        });

        $points.children().removeClass("active");
        $points.children().eq(slide_index).addClass("active");
    }

    $(".points").delegate("li","click",function(){
        slide_index=$(this).index();
        change_status();
    });

    $(".prev").click(function(){
        slide_index--;
        if(slide_index<0){
            slide_index=0;
        }
        change_status();
    });
    $(".next").click(function(){
        slide_index++;
        if(slide_index>$slide.children().length-1){
            slide_index=$slide.children().length-1;
        }
        change_status();
    })
    

});


