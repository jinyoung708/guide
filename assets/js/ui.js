var app = {
    init: function(){
        this._controlDrawer();
        this._subMenuToggle();
        this._controlHeader();
        this._passwordToggle();
        this._checkedAll();
        this._limitLine();
        this._toggleComment();
        this._toggleChildComment();
        this._setCommentColor();
        this._initPinchZoom();
        this._matchTextareaHeight();
        this._eraseInput();
        this._erasePwInput();
        this._uncheckRadio();
    },

    /**
     * @ drawer 메뉴 열기 닫기 이벤트 등록
     */
    _controlDrawer: function(){
        if($('.drawer').length > 0){
            function openDrawer(){
                $('.drawer').addClass('active');
            };
            function closeDrawer(){
                $('.drawer').removeClass('active');
            };
        
            $('.js-swipeOpenDrawer').swipe({
                swipeLeft:function() {
                    openDrawer();
                },
                excludedElements: "button, input, select, textarea, a, .noSwipe"
            });
            $('.js-swipeCloseDrawer').swipe({
                swipeRight:function(){
                    closeDrawer();
                },
                excludedElements: "button, input, select, textarea, a, .noSwipe"
            });
            $('.js-openMenu').on('click', function(){
                openDrawer();
            });
            $('.js-closeMenu').on('click', function(){
                closeDrawer();
            });
        };
    },

    /**
     * 서비스안내 하위메뉴 toggle
     */
    _subMenuToggle: function(){
        $('.js-subMenuToggle .subMenu__btn').on('click', function(){
            let state = $(this).attr('aria-expanded');
            let target = $(this).next('.subMenu__list');

            if (state == 'false'){
                $(this).attr('aria-expanded', 'true');
                target.slideDown(200);
            } else if (state == 'true') {
                $(this).attr('aria-expanded', 'false');
                target.slideUp(200);
            }
        });
    },

    /**
     * @ 스크롤에 따른 header 상태 setting
     * @ 스크롤 최상단 시 - data-is-scroll-top : true
     * @ 스크롤 down 시 - data-is-scroll-down : true
     * @ 스크롤 up 시 - data-is-scroll-down : false
     */
    _controlHeader: function(){
        var body = $('body');
        var currentScroll = 0;
        var lastScroll = 0;
        var scrollDirection;
        function getScrollDirection(){
            currentScroll = $(window).scrollTop();
            var direction;
            if(currentScroll > lastScroll && currentScroll > 0){
                direction = 'down';
            }else{
                direction = 'up';
            }
            lastScroll = currentScroll;
            return direction;
        };
        function changeScrollState(scroll, scrollDirection){
            if(scroll > 0){
                body.attr('data-is-scroll-top', false);
            }else{
                body.attr('data-is-scroll-top', true);
            };
            if(scrollDirection == 'down'){
                body.attr('data-is-scroll-down', true);
            }else{
                body.attr('data-is-scroll-down', false);
            }
        };
    
        currentScroll = $(this).scrollTop();
        scrollDirection = getScrollDirection();
        changeScrollState(currentScroll, scrollDirection);
        $(window).on('scroll', function(){
            currentScroll = $(this).scrollTop();
            scrollDirection = getScrollDirection();
            changeScrollState(currentScroll, scrollDirection);
        });
    },

    /**
     * @ 비밀번호 입력란 비밀번호보기 toggle
     */
    _passwordToggle: function(){
        $(document).on('click', '.js-togglePw', function(){
            let btn = $(this);
            let wrap = btn.closest('.inp');
            let input = wrap.find('.inp__input');
            if (wrap.hasClass('active')){
                wrap.removeClass('active');
                input.attr('type', 'password');
                btn.removeClass('active').find('span').text('비밀번호 보기');
            } else {
                wrap.addClass('active');
                input.attr('type', 'text');
                btn.addClass('active').find('span').text('비밀번호 숨기기');
            }
        });
    },

    /**
     * @ checkbox all checked toggle
     */
    _checkedAll: function(){
        let target = '.js-checkedAll';
        let all = '.js-checkAll';

        $(document).on('change', `${target} ${all}`, function(){
            let wrap = $(this).closest(target);
            let name = $(this).attr('name');
            let inputs = wrap.find(`input[name="${name}"]`);

            if ($(this).prop('checked')){
                inputs.prop('checked', true);
            } else {
                inputs.prop('checked', false);
            }
        });

        $(document).on('change', `${target} input[type="checkbox"]:not(${all})`, function(){
            let wrap = $(this).closest(target);
            let name = $(this).attr('name');
            let total = wrap.find(`input[name="${name}"]`).length;
            let checked = wrap.find(`input[name="${name}"]:checked`).not(`${all}`).length + 1;
            let allInput = wrap.find(`${all}`);

            if (checked == total){
                allInput.prop('checked', true);
            } else {
                allInput.prop('checked', false);
            }
        });
    },
        
    /**
     * @ 댓글 줄수제한 컨트롤/토글
     * @ 기본 제한 5줄, 토글 기능 지원
     * @ data-limit-line="숫자" 속성으로 제한 줄 수 변경 가능
     * @ data-no-toggle-limit="true" 속성으로 토글 제한 가능
     */
    _limitLine: function(){
        var limit = 5;
        var target = $('.js-limitLine');
        var toggleTarget = target.not($('.js-limitLine[data-no-toggle-limit="true"]'));
        if(target.attr('data-limit-line')){
            limit = target.attr('data-limit-line');
        };
        function countLines(el){
            var elHeight = el.innerHeight();
            var lineHeight = parseInt(el.css('lineHeight'));
            var lines = Math.round(elHeight / lineHeight);
            return lines;
        };
        target.each(function(){
            var lines = countLines($(this));
            if(lines > limit){
                $(this).addClass('active');
            };
        });
        toggleTarget.on('click', function(){
            $(this).removeClass('active');
        });
    },

    /**
     * @ 블라인드 댓글 토글
     */
    _toggleComment: function(){
        var controller = $('.js-toggleComment');
        controller.on('click', function(){
            $(this).toggleClass('active').parent().toggleClass('blinded');
        });
    },

    /**
     * @ 자식 댓글 토글
     */
    _toggleChildComment: function(){
        $('.js-toggleChildComment').on('click', function(){
            var child = $(this).closest('.comment__body').siblings('.comment__child');
            if(child.length > 0){
                child.toggle();
            };
        });
        $('.js-closeChildComment').on('click', function(){
            var child = $(this).closest('.comment__child');
            child.hide();
        });
    },
    
    /**
     * @ 부모 댓글 닉네임 컬러 설정
     */
    _setCommentColor: function(){
        var colorClass = ['comment__name--colorA','comment__name--colorB','comment__name--colorC'];
        var comment = $('.js-setCommentColor > .commentList__item > .comment > .comment__body > .comment__info > .comment__name');
        var i = 0;
        comment.each(function(){
            if(i > 2){
                i = 0;
            }
            $(this).addClass(colorClass[i]);
            i++;
        });
    },

    /**
     * @ 이미지 줌
     * @ https://vmorneau.me/new-pinch-and-zoom/
     */
    _initPinchZoom: function(){
        const pinchZoom = (imageElement) => {
            let imageElementScale = 1;
            let start = {};

            // Calculate distance between two fingers
            const distance = (event) => {
                return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
            };

            imageElement.addEventListener('touchstart', (event) => {
                console.log('touchstart', event);
                imageElement.style.transition = '';
                if (event.touches.length === 2) {
                event.preventDefault(); // Prevent page scroll

                // Calculate where the fingers have started on the X and Y axis
                start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                start.distance = distance(event);
                }
            });

            imageElement.addEventListener('touchmove', (event) => {
                if (event.touches.length === 2) {
                event.preventDefault(); // Prevent page scroll
                let scale;

                // Safari provides event.scale as two fingers move on the screen
                // For other browsers just calculate the scale manually
                if (event.scale) {
                    scale = event.scale;
                } else {
                    const deltaDistance = distance(event);
                    scale = deltaDistance / start.distance;
                }

                imageElementScale = Math.min(Math.max(1, scale), 4);

                // Calculate how much the fingers have moved on the X and Y axis
                const deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - start.x) * 2; // x2 for accelarated movement
                const deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - start.y) * 2; // x2 for accelarated movement

                // Transform the image to make it grow and move with fingers
                const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale})`;
                imageElement.style.transform = transform;
                imageElement.style.WebkitTransform = transform;
                let imageRect = imageElement.getBoundingClientRect();
                let containerRect = imageElement.parentElement.getBoundingClientRect();
                let correctedCords = {x: deltaX, y: deltaY};
                if(imageRect.left > containerRect.left) correctedCords.x -= imageRect.left - containerRect.left;
                if(imageRect.right < containerRect.right) correctedCords.x -= imageRect.right - containerRect.right;
                if(imageRect.top > containerRect.top) correctedCords.y -= imageRect.top - containerRect.top;
                if(imageRect.bottom < containerRect.bottom) correctedCords.y -= imageRect.bottom - containerRect.bottom;
                imageElement.style.transform = `translate3d(${correctedCords.x}px, ${correctedCords.y}px, 0) scale(${imageElementScale})`;
                imageElement.style.zIndex = "9999";
                }
            });

            imageElement.addEventListener('touchend', (event) => {
                // Reset image to it's original format
                imageElement.style.transform = "";
                imageElement.style.WebkitTransform = "";
                imageElement.style.zIndex = "";
                imageElement.style.transition = 'all .3s';
            });
        };
        el = document.querySelectorAll('.zoomImg');
        for(i = 0; i < el.length; i++){
            pinchZoom(el[i]);
        }
    },

    /**
     * @ auto height textarea
     */
    _matchTextareaHeight: function(){
        var value;
        $(document).on('keydown keyup', '.js-autoTextarea', function(){
            value = this.value;
            let hiddenTextarea = $(this).next('.js-hiddenAutoTextarea')
            hiddenTextarea.val(value);
            this.style.height = hiddenTextarea.prop('scrollHeight') + 'px';
        })
    },

    /**
     * @ input 내용 지우기 버튼 노출 / 지우기 동작
     */
    _eraseInput: function(){
        // 노출
        let erasers = $('.js-eraseInput');
        erasers.each(function(){
            let input = $(this).closest('.inp').find('.inp__input')
            if(input.val()){
                $(this).addClass('active')
            }
        })    
        
        $(document).on('keyup keydown', function(e){
            let eraser = $(e.target).parent('.inp').find('.js-eraseInput');
            if(!eraser) return;
            let input = $(e.target);
            if(input.val()){
                eraser.addClass('active');
            }else{
                eraser.removeClass('active');
            }
        })

        // 지우기 동작
        $(document).on('click', '.js-eraseInput', function(){
            let eraser = $(this);
            let wrap = eraser.closest('.inp');
            let input = wrap.find('.inp__input');
            input.val('');
            if(input.val()){
                eraser.addClass('active');
            }else{
                eraser.removeClass('active');
            }
        });
    },

    /**
     * @ password input 내용 지우기 버튼 노출 / 지우기 동작
     */
    _erasePwInput: function(){
        // 노출
        let erasers = $('.js-erasePwInput');
        erasers.each(function(){
            let input = $(this).closest('.phonenumber__inputWrap').find('.inp__input');
            let value = input.val();
            if(value){
                $(this).addClass('active')
            }
        })    
        
        $(document).on('keyup keydown', function(e){
            let wrap = $(e.target).closest('.phonenumber__inputWrap');
            let eraser = wrap.find('.js-erasePwInput');
            if(!eraser) return;
            let wholeInput = wrap.find('.inp__input');
            let input = $(e.target);
            if(wholeInput.val()){
                eraser.addClass('active');
            }else{
                eraser.removeClass('active');
            }
        })

        // 지우기 동작
        $(document).on('click', '.js-erasePwInput', function(){
            let eraser = $(this);
            let wrap = eraser.closest('.phonenumber__inputWrap');
            let input = wrap.find('.inp__input');
            input.val('');
            if(input.val()){
                eraser.addClass('active');
            }else{
                eraser.removeClass('active');
            }
        });
    },

    /**
     * @ 선택 해제 가능한 radio
     */
    _uncheckRadio: function(){
        let radio = $('input[type=radio][data-uncheck-radio=true]');
        let group = [];//name이 몇 가지인지 저장
        radio.each(function(){
            let name = $(this).attr('name');
            if(group.indexOf(name) == -1){
                group.push(name);
            };
        });

        // name의 가짓수 및 각각의 갯수로 2차원 배열 생성
        let row = group.length;
        let arr = new Array(row);
        for(let i = 0; i < row; i++){
            let groupName = group[i];
            let col = $('input[type=radio][data-uncheck-radio=true][name=' + groupName + ']').length;
            arr[i] = new Array(col);
        };

        // checked 된 radio 확인
        radio.each(function(){
            if($(this).prop('checked')){
                let name = $(this).attr('name');
                let row = group.indexOf(name);
                let col = $('input[type=radio][data-uncheck-radio=true][name=' + name + ']').index($(this));
                arr[row][col] = true;
            };
        });

        // 클릭한 radio의 name 및 그 순번으로 2차원 배열과 비교해 동작
        $(document).on("click", "input[type=radio][data-uncheck-radio=true]", function() {
            let name = $(this).attr('name');
            let row = group.indexOf(name);
            let col = $('input[type=radio][data-uncheck-radio=true][name=' + name + ']').index($(this));
            if(arr[row][col] == true){
                $(this).prop('checked', false);
                arr[row][col] = false;
            }else{
                for(let i = 0; i < arr[row].length; i++){
                    arr[row][i] = false;
                };
                arr[row][col] = true;
            };
         });
    },
};

var tester = {
    init: function(){
        this._testFsMode();
        this._testShowPops();
    },
    
    /**
     * @ 테스트 : 폰트 사이즈 모드 변경
     */
    _testFsMode: function(){
        $('body').append('<div class="fs-test"><button type="button" class="fs-md">fs:md</button><button type="button" class="fs-lg">fs:lg</button></div>');
        if($('body').attr('data-fs-mode') == 'md'){
            $('.fs-md').addClass('active');
        }else{
            $('.fs-lg').addClass('active')
        };
        $('.fs-md').on('click', function(){
            $('body').attr('data-fs-mode', 'md')
            $(this).addClass('active')
            $('.fs-lg').removeClass('active')
        });
        $('.fs-lg').on('click', function(){
            $('body').attr('data-fs-mode', 'lg')
            $(this).addClass('active')
            $('.fs-md').removeClass('active')
        });
    },

    /**
     * @ 테스트 : 페이지내 팝업 카운트, 하나씩 노출
     */
    _testShowPops: function(){
        // 팝업 종류 추가 시 수정 필요
        var modal = $('.modal');
        var fullModal = $('.fullModal');
        var alert = $('.alert');
        var notice = $('.noticeModal');
        var toast = $('.toast');
        var allType = [fullModal, modal, alert, toast, notice];
        var all = [];
        $(allType).each(function(){
            this.each(function(){
                all.push(this);
            });
        });

        $('body').append('<div class="pop-test"><span class="pop-count">현재 페이지 팝업 : ' + all.length +  '개</span><button type="button" class="pop-toggle">하나씩 열기</button>');

        var count = 0;
        $('.pop-toggle').on('click', function(){
            $(all[count]).show();
            count++;
        });
    },
}

// document ready function
$(document).ready(function(){
    app.init();
    tester.init();
});