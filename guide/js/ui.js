$(function() {
   
   // GNB
   $('.js-menuTrigger').click(function() {
      $(this).toggleClass('on');
      $('.js-pubSnb').toggleClass('on');
      return false;
   });
   // MENU TRIGGER
   function menuTrigger() {
      if($(window).width() <= 1700){
         $('.js-pubSnb').removeClass('on');
         $('.js-menuTrigger').removeClass('on');
      } else {
         $('.js-pubSnb').addClass('on');
         $('.js-menuTrigger').addClass('on');
      };
   }
   menuTrigger();
   $(window).resize(function(){
      menuTrigger();
   });

   // 목차
   $('.pub_section').each(function(i) {
      var conH2 = $(this).children('h2').text();
      var rightMenuCon = '<li><a href="#">' + conH2 + '</a></li>';
      $('.pub_index').append(rightMenuCon);
      $('.pub_index li:first-child').addClass('on');
      $('.pub_section').eq(i).attr('data-navNum', i);
   });

   $(window).on('scroll resize', function() {
      $('.pub_section').each(function() {
         var viewTop = $(window).scrollTop() + ($(window).height() * 0.4);
         var elTop = $(this).offset().top;
         var elBot = elTop + $(this).height();
         var elNum = $(this).attr('data-navNUm');
         var target = $('.pub_index li');
         if ((elTop <= viewTop) && (elBot >= viewTop)) {
            target.removeClass('on');
            target.eq(elNum).addClass('on');
         }
      })
   });
   $('.pub_index li a').on('click focus', function() {
      var goTo = $(this).parent().index();
      var goPos = $('.pub_section[data-navNum=' + goTo + ']').offset().top - ($(window).height() * 0.1);
      $('html, body').stop().animate({
         scrollTop: goPos
      }, 100);
      return false;
   });

   // SNB 목록
   var snbs = [
      {name : '기본정책/HTML',
         filepath : 'guide.html'
      },
      {name : 'CSS 작성',
         filepath : 'css.html'
      },
      {name : '컬러',
         filepath : 'color.html'
      },
      {name : '폰트',
         filepath : 'font.html'
      },
      {name : '제스처',
         filepath : 'touch.html'
      },
      {name : 'INPUT',
         filepath : 'input.html'
      },
      {name : 'FORM',
         filepath : 'form.html'
      },
      {name : 'BUTTON',
         filepath : 'button.html'
      },
      {name : 'ALERT',
         filepath : 'alert.html'
      },
      {name : 'MODAL',
         filepath : 'modal.html'
      },
      {name : 'TOAST',
         filepath : 'toast.html'
      },
      {name : '빈 페이지/섹션',
         filepath : 'empty.html'
      },
      {name : '댓글',
      filepath : 'comment.html'
      },
      {name : 'Lottie 애니메이션',
         filepath : 'lottie.html'
      },
   ];

   // SNB 입력  
   snbs.map(function(i){
      $('.js-pubSnb ul').append(
            '<li><a href="'+ i.filepath +'">'+ i.name + '</a></li>'
      )
   });

   // SNB 랜덤 이모지 출력
   function prependRandomEmoji(addEmojiTarget){
      var emojis = [
         '😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👅','👄','👍','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','🙆','🙅','💁','🙋','💆','💇','👰','🙎','🙍','🙇','🎩','👑','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','💬','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝'
      ];
      var getRandomEmoji;
      var randomEmoji;
      addEmojiTarget.each(function(i){
         if(i >= 1){
            emojis.splice(randomEmoji,1)
         };
         randomEmoji = Math.random() * emojis.length;
         getRandomEmoji =  emojis[Math.floor(randomEmoji)];
         $(this).prepend(
            '<span class="addedEmoji">' + getRandomEmoji + '</span>'
         );
      });
   };
   prependRandomEmoji($('.js-pubSnb ul li a'));

   // 현재 파일 이름과 일치하는 snb만 on
   var CurrentFileName = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.lastIndexOf("/") + 30);
   $('.js-pubSnb li').each(function(){
      if($(this).children('a').attr('href') == CurrentFileName){
         $(this).addClass('on')
      };
   });

   // SNB 링크 존재하는 a만 transition, 나머지는 off
   $('.js-pubSnb a').each(function(){
      if($(this).attr('href') == '#'){
         $(this).parent().addClass('off');
         $(this).attr('tabindex', '-1')
      } else{
         $(this).addClass('transition')
      }
   });

   hljs.highlightAll();

});