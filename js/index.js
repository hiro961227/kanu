$(function(){
    
    var $article = $('main article');
    var idx = 0;
    var articleAre = [];

    $article.each(function(a){
      articleAre.push($article.eq(a).offset().top);
    });


    //메뉴 클릭 이벤트
    //menu-trigger active
    //nav animation
    $('.menu-trigger').click(function(){
        $('.menu-trigger').toggleClass('active');
        if($('.menu-trigger').hasClass('active')){
            $('nav').css({
                transform:"translate(0,0)"
            });
        }else{
            $('nav').css({
                transform:"translate(0,-120%)"
            });
        }
    });
    $('nav a').click(function(e){
        e.preventDefault();
        idx = $(this).index();      

        $('html,body').animate({
            scrollTop : articleAre[idx]
        },100);

        setTimeout(closemenu,150);

        function closemenu(){
            $('.menu-trigger').removeClass('active');
            $('nav').css({
                transform:"translate(0,-120%)"
            });
        }
    });
    
    //화면 스크롤 이벤트

    var bln = false;
    $(window).on('mousewheel',function wheelchange(e){

      if(bln) return;

      if(e.originalEvent.deltaY < 0){
        //up
        if(idx > 0){
          idx--;
        }
      }else{
        //down
        if(idx < $article.length-1){
          idx++;
        }        
      }

      $('html,body').animate({
        scrollTop : articleAre[idx]
      },500);
      
      bln = true;
      setTimeout(function(){bln=false;},200);
    });


    //제품 이벤트
    //data.xml
$(function(){ 
  //s
  $.ajax({
      url:'data.xml',
      type:'GET',
      success:function(data){

          var coffe, type, imgSrc, name, story, ingredint;
          function funList(code){
              var amestory='', lattestory='', detailimg, detailstoryH3, detailstoryP, darkormedium, ingredient
              $(data).find('item').each(function(i){

                imgSrc = $(this).find('imgSrc').text();
                  name = $(this).find('name').text();
                  story = $(this).find('story').text();
                  ingredint = $(this).find('ingredint').text();
                  type = $(this).find('type').text();
                  coffe = $(this).find('coffe').text();

                  if(coffe == 'americano'){
                    amestory += "<li data-num='"+i+"'><img src='"+imgSrc+"' alt=''></li>";
                  }
                  if(coffe == 'latte'){
                    lattestory += "<li data-num='"+i+"'><img src='"+imgSrc+"' alt=''></li>";
                  }

                  if(Number(code) == i){
                    if(type == 'MEDIUM'){
                      detailimg = "<img src='"+imgSrc+"' alt=''>";
                      detailstoryH3 = "<h3>"+name+"</h3>";
                      detailstoryP = "<p>"+story+"</p>";
                      darkormedium = "<h4>로스팅</h4> <span>DARK</span><span class='likethis'>MEDIUM</span>"
                      ingredient = "<h4>성분</h4> <p>"+ingredint+"</p>";
                    }
                    if(type == 'DARK'){                    
                      detailimg = "<img src='"+imgSrc+"' alt=''>";
                      detailstoryH3 = "<h3>"+name+"</h3>";
                      detailstoryP = "<p>"+story+"</p>";
                      darkormedium = "<h4>로스팅</h4> <span class='likethis'>DARK</span><span>MEDIUM</span>"
                      ingredient = "<h4>성분</h4> <p>"+ingredint+"</p>";
                    }
                    $('#product .detail .detailimg').html(detailimg);
                    $('#product .detail .detailstory h3').html(detailstoryH3);
                    $('#product .detail .detailstory p').html(detailstoryP);
                    $('#product .detail .detailstory .roasting .darkormedium').html(darkormedium);
                    $('#product .detail .detailstory .ingredient').html(ingredient);
                  }
                  
                  if(code=='all'){
                    $('#product .americano .ameimg ul').html(amestory);
                    $('#product .latte .latteimg ul').html(lattestory);
                  }

                
                      
              });
                

               //클릭 이벤트
              $('#product .americano .ameimg ul li, #product .latte .latteimg ul li').click(function(){
                funList($(this).attr('data-num'));
                $('#product .detail').css({display:"block",opacity:"0"}).animate({'opacity': 1}, 250);
              });
              $('#product .detail .close').click(function(){
                $('#product .detail').css({display:"none",opacity:"0"});
              });

              //앞뒤추가

              var firstame = $('#product .americano .ameimg ul li:first');
              var firstlatte = $('#product .latte .latteimg ul li:first');
              var lastam = $('#product .americano .ameimg ul li:last');
              var lastlatte = $('#product .latte .latteimg ul li:last');

              $('.ameimg .prevbtn, .ameimg .nextbtn').on('click',function(){
                var idx = $(this).index();
                firstame = $('#product .americano .ameimg ul li:first');
                lastam = $('#product .americano .ameimg ul li:last');
                
                  if(idx == 0){
                    firstame.before(lastam); 
                  }else{
                    lastam.stop().after(firstame);
                  }                
              });
              $('.latte .prevbtn, .latte .nextbtn').on('click',function(){
                var idx = $(this).index();
                firstlatte = $('#product .latte .latteimg ul li:first');
                lastlatte = $('#product .latte .latteimg ul li:last');
                
                  if(idx == 0){
                    firstlatte.stop().before(lastlatte); 
                  }else{
                    lastlatte.stop().after(firstlatte);
                  }                
              });


          //
          }
          funList('all');    
                   
      //
      }
  });
  //e
})


    //브랜드 페이지
    //스토리 클릭
    $('#brand .brandright .brandmain span').click(function(){
      $('#brand .brandright .slideup').slideDown(200);
    });
    $('#brand .brandright .slideup .close').click(function(){
      $('#brand .brandright .slideup').slideUp(200);
    });
    $(window).on('mousewheel',function(){
      $('#brand .brandright .slideup').slideUp(200);
    });
    //dot 이벤트
    var listNo = $('#brand .brandright .slideup ul li');
    var dotEle = $('#brand .brandright .slideup .dot a');
    function dotEvent(){
      dotEle.eq(0).addClass('on');
      listNo.eq(0).addClass('online');
      dotEle.click(function(){
        var num = $(this).index();
        
        dotEle.removeClass('on');
        $(this).addClass('on');

        listNo.removeClass('online');
        listNo.eq(num).addClass('online');
      });
    }
    dotEvent();
});