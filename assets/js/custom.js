
jQuery(document).ready(function(){
    jQuery(window).scroll(function(){
        if (jQuery(window).scrollTop() > 0) {
            jQuery('.header_container').addClass('pstn_header_fix');
        }
        else {
            jQuery('.header_container').removeClass('pstn_header_fix');
        }

        var scrollTop = jQuery(this).scrollTop();

        var header_HT = jQuery('.header_container').height();
        var banner_form_bg_offs = jQuery('.banner_form_bg').offset().top - header_HT;
        var banner_form_bg_H = jQuery('.banner_form_bg').innerHeight();


        var total_H = banner_form_bg_offs + banner_form_bg_H;
        if ( scrollTop > total_H ){
            jQuery('.header_container').addClass('fixed_btn');
        }else {
            jQuery('.header_container').removeClass('fixed_btn');
        }
    });


    if(matchMedia('only screen and (max-width: 991px)').matches) {
        jQuery('.floating_btn').click(function () {
            var Lochref = jQuery(this).attr('href');
            jQuery("body, html").stop().animate({
            scrollTop: jQuery(Lochref).offset().top
            }, 1500);
            return false;
        });
    }
    if(matchMedia('only screen and (max-width: 1024px)').matches) {
        var $mwo = $('.marquee-with-options');
        jQuery('.marquee').marquee();
        jQuery('.marquee-with-options').marquee({
            speed: 30,
            gap: 0,
            delayBeforeStart: 0,
            direction: 'left',
            duplicated: true,
            startVisible: true,
            pauseOnHover: true
        });

        //pause and resume links
        jQuery('.pause').click(function(e){
            e.preventDefault();
            $mwo.trigger('pause');
        });

        jQuery('.resume').click(function(e){
            e.preventDefault();
            $mwo.trigger('resume');
        });

        //toggle
        jQuery('.toggle').hover(function(e){
            $mwo.trigger('pause');
            },function(){
            $mwo.trigger('resume');
        })
        .click(function(e){
            e.preventDefault();
        });
    }
    
    jQuery(".privacy-pop-link").click(function() {
        jQuery('.privacy-popup-area').fadeIn(200);
    });
    jQuery(".privacy-popup-close").click(function() {
        jQuery('.privacy-popup-area').fadeOut(200);
    });


    jQuery( ".toggle_view_bg" ).click(function(e) {
        if(jQuery(this).parent('.toggle_view_item').hasClass('active')) {
        } else {
            $( ".toggle_view_bg" ).each(function() {
                if(jQuery(this).parent('.toggle_view_item').hasClass('active')) {
                    jQuery(this).parent('.toggle_view_item').toggleClass('active');
                    jQuery(this).next('.show_details').slideToggle('hide');
                }
            });
        }
        jQuery(this).parent('.toggle_view_item').toggleClass('active');
        jQuery(this).next('.show_details').slideToggle('slow');
        e.preventDefault();
    });
});