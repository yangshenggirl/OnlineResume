/*jslint browser:true */
$(document).ready(function () {
    var $body = $('body');
    var $navbar = $('.navbar-default');
    var $offsetY = $navbar.offset().top + 10;
    var $menuButton = $('button.navbar-toggle');
    var $menuIcon = $('.navbar-toggle .glyphicon');
    var $collapsedMenuItem = $('.navbar-collapse.collapse li');
    var $modalBackdropDiv = $('<div class="modal-backdrop fade in"></div>');
    var $scrollButton = $('.scroll');
    var $socialIcon = $('.social');
    var $concatBtn = $('#cantactMe')
    var $projectExperience = $('.experience .experience-hidden')
    var $progressBar = $(".progress-bar")
    var bottom_of_progressBar = $progressBar.offset().top + $progressBar.outerHeight();

    // Fixed Nav after scroll
    function scroll() {
        // 菜单滑动监听
        if ($(window).scrollTop() >= $offsetY) {
            $navbar.addClass('menu-fixed').css('background-color', 'rgba(255,254,253,0.97)');
        } else {
            $navbar.removeClass('menu-fixed').css('background-color', 'transparent');
        }

        // 项目经历滑动监听
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        // Check the location of each element hidden */
        $projectExperience.each(function (i) {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();

            /* If the object is completely visible in the window, fadeIn it */
            if (bottom_of_window > bottom_of_object) {

                $(this).animate({
                    'opacity': '1',
                    'margin-left': '0'
                }, 600);
            }
        });
        console.log(bottom_of_window, bottom_of_progressBar)

        // skill loading animation
        if (bottom_of_window > bottom_of_progressBar) {
            $progressBar.each(function (i) {
                /* If the object is completely visible in the window, fadeIn it */
                var ariaValueNow = $(this).prop('ariaValueNow') + "%"
                var progressBarWidth = $(this).width() / $(window).width()
                if (!$(this).data('animated')) {
                    $(this).data('animated', true)
                    $(this).animate({
                        width: ariaValueNow
                    }, 1000);
                }

            });
        }
    }

    document.onscroll = scroll, 100;

    // Mobile Menu functions
    function openMenu() {
        $menuIcon.removeClass('glyphicon-menu-hamburger').addClass('glyphicon-remove active');
        $modalBackdropDiv.css('z-index', 900);
        $body.append($modalBackdropDiv);
        if (!$navbar.hasClass('menu-fixed')) {
            $navbar.css('background-color', 'rgba(255,254,253,0.97)');
        }
        // Close menu after clicking modal-backdrop
        $modalBackdropDiv.on('click', function () {
            $('.navbar-toggle').click();
            closeMenu();
        });
    }
    function closeMenu() {
        $menuIcon.removeClass('glyphicon-remove active').addClass('glyphicon-menu-hamburger');
        $modalBackdropDiv.css('z-index', 1025).remove();
        if (!$navbar.hasClass('menu-fixed')) {
            $navbar.css('background-color', 'transparent');
        }
    }
    // Mobile Menu Icon Toggle
    $menuButton.on('click', function () {
        if ($menuIcon.hasClass('glyphicon-menu-hamburger')) {
            openMenu();
            // Close menu after clicking a link
            $collapsedMenuItem.on('click', function () {
                $('.navbar-toggle').click(); // Trigger collapse animation
                closeMenu();
            });
        } else {
            closeMenu();
        }
    });
    // Collapse menu on resize
    $(window).resize(closeMenu());

    // Smooth scroll to content
    $scrollButton.on('click', function (e) {
        e.preventDefault();
        var $link = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $($link).offset().top - 60
        }, 900);
    });

    // Social icons hover effect
    $socialIcon.on({
        'focus mouseenter': function () {
            var $iconImg = $(this).children();
            var $href = $iconImg.attr('src').slice(0, -18) + 'color.png?raw=true'; // Remove 'black.svg' from end and add 'color.svg'
            $iconImg.attr('src', $href);
        },
        'blur mouseleave': function () {
            var $iconImg = $(this).children();
            var $href = $iconImg.attr('src').slice(0, -18) + 'black.png?raw=true';
            $iconImg.attr('src', $href);
        }
    });

    // contcat me
    $concatBtn.on('click', function (e) {
        window.open('https://yangshenggirl.github.io/OnlineResume/assets/docs/web前端.pdf', '_blank');
    })



    // Center modals vertically
    function centerModal() {
        $(this).css('display', 'block');
        var $dialog = $(this).find('.modal-dialog');
        var $offset = ($(window).height() - $dialog.height()) / 2;
        var $bottomMargin = parseInt($dialog.css('margin-bottom'), 10);

        // If modal is taller than screen height, top margin = bottom margin
        if ($offset < $bottomMargin) {
            $offset = $bottomMargin;
        }
        $dialog.css('margin-top', $offset);
    }



    $(document).on('show.bs.modal', '.modal', centerModal);
    $(window).on('resize', function () {
        $('.modal:visible').each(centerModal);
    });
});