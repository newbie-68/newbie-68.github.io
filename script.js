document.addEventListener("DOMContentLoaded", function () {
    // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // if (isMobile) {
    //     document.querySelector(".facebook").addEventListener("click", function() {
    //         window.open("fb://page/110600357296339", "_blank");
    //     });
    // }
    // else {
    //         document.querySelector(".facebook").addEventListener("click", function() {
    // window.open("https://facebook.com", "_blank");
    // });
    // }

    
    
    const msg = "This is a test msg.";
    const fb_link = 'https://www.facebook.com/SQLEstream/';
    msg_field.value = msg;

    // Define the links
    const links = {
        'Facebook Page': fb_link,
        'Facebook': 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(fb_link) + '%26quote=' + encodeURIComponent(msg),
        'Instagram': 'https://www.instagram.com/sqlestream/?hl=ms',
        'Google review': 'https://search.google.com/local/writereview?placeid=ChIJd904jxpTzDER2KhXom8b_zI',
        'Red note': 'Red note'
    };

    // Add active state for touch devices
    document.querySelectorAll('.action-button').forEach(button => {
        // Touch start - add active class
        button.addEventListener('touchstart', function () {
            this.classList.add('button-active');
        }, { passive: true });

        // Touch end - remove active class
        button.addEventListener('touchend', function () {
            this.classList.remove('button-active');
        }, { passive: true });

        // Click event
        button.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent triggering parent card click
            const platform = this.parentElement.querySelector('h3').textContent.trim();

            // Check if we have a dedicated link for this platform
            if (links[platform]) {
                if(links[platform] == 'Red note'){
                    //Check if the device have Rednote installed or not before redirecting
                    var fallbackToStore = function() {
                      window.location = 'https://www.xiaohongshu.com/user/profile/65164c2e000000002302441a';
                    };
                    var openApp = function() {
                      window.location = 'xhsdiscover://user/65164c2e000000002302441a';
                    };

                    openApp();
                    setTimeout(fallbackToStore, 700);
                }
                else if (links[platform] == 'Facebook') {
                    var msg_field = document.getElementById('hid1');
                    msg_field.select();
                    msg_field.setSelectionRange(0, 99999); 
                    await navigator.clipboard.writeText(msg);
                    alert("Copied the text: " + msg_field.value);
                    window.open(links[platform], '_blank');
                }

                else{
                   window.open(links[platform], '_blank');
                }
            } else {
                const actionType = this.textContent;
                alert(`You are about to ${actionType.toLowerCase()} on ${platform}!`);
                // Here you would implement the functionality for other platforms
            }
        });
    });

    // Also add direct click functionality to the card for Facebook and Instagram
    // document.querySelectorAll('.card').forEach(card => {
    //     const platform = card.querySelector('h3').textContent.trim();

    //     if (links[platform]) {
    //         card.style.cursor = 'pointer';

    //         // Add tap/click functionality
    //         card.addEventListener('click', function (e) {
    //             // Only trigger if they didn't click the button directly
    //             if (!e.target.classList.contains('action-button')) {
    //                 window.open(links[platform], '_blank');
    //             }
    //         });

    //         // Add active state for touch
    //         card.addEventListener('touchstart', function () {
    //             if (!this.querySelector('.action-button:active')) {
    //                 this.classList.add('card-active');
    //             }
    //         }, { passive: true });

    //         card.addEventListener('touchend', function () {
    //             this.classList.remove('card-active');
    //         }, { passive: true });
    //     }
    // });

    // Prevent zoom on double tap for iOS
    document.addEventListener('touchend', function (event) {
        const now = Date.now();
        const DOUBLE_TAP_THRESHOLD = 300;

        if (this.lastTouchEndTime && now - this.lastTouchEndTime < DOUBLE_TAP_THRESHOLD) {
            event.preventDefault();
        }

        this.lastTouchEndTime = now;
    }, { passive: false });
});