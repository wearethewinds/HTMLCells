var Animations = {
    shake: function(repeat) {
        var t = this;
        TweenMax.to(t, 0.1,
            {
                repeat: repeat - 1,
                y: (1 + Math.random() * 5),
                x: (1 + Math.random() * 5),
                delay: 0.1,
                ease: 'Expo.easeInOut',
                onComplete: function() {
                    t.css('transform', '');
                }
            });
    }
};