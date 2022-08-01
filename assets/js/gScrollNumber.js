/**
 * Created by GYFlasher on 2017-12-08.
 */
function gScrollNumber(el,option) {
    this.win = jQuery(window);
    this.container = el;
    this.option = option;
    this.container.css({
        position: "relative",
        padding: "0",
        overflow: "hidden"
    });
    var height = this.container.height();
    this.subWidth = option.width;
    this.subHeight = height;
        this.options = option;
    this.autoSizeContainerWidth = option.autoSizeContainerWidth;
    this.col = '<span class="g-num-item" style="top: 0;">' +
        '<i>9</i>' +
        '<i>0</i>' +
        '<i>1</i>' +
        '<i>2</i>' +
        '<i>3</i>' +
        '<i>4</i>' +
        '<i>5</i>' +
        '<i>6</i>' +
        '<i>7</i>' +
        '<i>8</i>' +
        '<i>9</i>' +
        '<i class="last">0</i>' +
        '<i class="last">1</i>' +
        '</span>';
}
gScrollNumber.prototype.run = function (value) {
    height = this.container.height();
    this.subWidth = (this.win.width() < 992) ? this.options.width.tablet : this.options.width.desktop ;
    this.subHeight = height;
   // console.log("old = " + this.currentValue + "\nnew = " + value);
    this.currentValue = value;
    var self = this;
    var valueString = value.toString();
    if (self.autoSizeContainerWidth) {
        self.container.css({
            "width": valueString.length * self.subWidth + "px"
        });
    }
    var oldLength = self.container.children(".g-num-item").length;

    if (valueString.length > oldLength) {
        for (var i = 0; i <= valueString.length - oldLength; i++) {
            self.container.append(self.col);
            self.container.children(".g-num-item").eq(oldLength + i).css({
                right: self.subWidth * (oldLength + i) + "px"
            });
        }
    }else if (valueString.length < oldLength) {
        for (var i = 0; i < oldLength - valueString.length; i++) {
            //self.container.children(".g-num-item:last").remove();
        }
    }

    var itemHeight = self.subHeight / 3;

    this.container.find(".g-num-item").css({
        position: "absolute",
        width: self.subWidth + "px",
        height: 12 * itemHeight + "px"
    });

    this.container.find(".g-num-item").each(function(i){
        var el = jQuery(this);
        el.css({
            right: self.subWidth * (i) + "px"
        });
    }) 

    this.container.find(".g-num-item i").css({
        width: self.subWidth + "px",
        height: itemHeight + "px",
        lineHeight: self.itemHeight + "px",
        textAlign: "center",
        fontSize: self.option.fontSize + "px",
        color: self.option.color,
        display: "block",
        fontStyle: "normal"
    });
    setTimeout(function () {
        var topPosition, oldValueString = (parseInt(valueString, 10) - 1).toString();

        for (var i = 0; i < valueString.length; i++) {
            var y = 0;

            if (valueString[i] === '0') {
                y = - (10 * itemHeight);
                    self.container.find(".g-num-item").eq(valueString.length - i - 1).css({
                    top: y + "px",
                    transition: "top 1.0s"
                });
                // oldValue =  valueString[i];
            } else if (valueString[i] === '1') {
                if (valueString[i] !== oldValueString[i]) {
                    self.container.find(".g-num-item").eq(valueString.length - i - 1).css({
                        top: 0 + "px",
                        transition: "none"
                    });
                    (function(ind) {
                        setTimeout(function(){
                            self.container.find(".g-num-item").eq(valueString.length - ind - 1).css({
                                top: -(itemHeight) + "px",
                               transition: "top 0.9s"
                            });
                        }, 100)
                    })(i);
                } else {
                    self.container.find(".g-num-item").eq(valueString.length - i - 1).css({
                        top: -(itemHeight) + "px",
                       transition: "top 0.9s"
                    });
                }
            }
            else {
                y = - (parseInt(valueString[i]) * itemHeight);


                self.container.find(".g-num-item").eq(valueString.length - i - 1).css({
                    top: y + "px",
                    transition: "top 1.0s"
                });
            }
            //oldValueString = valueString;

            setTimeout(function(){
                var containerOffset = self.container.offset().top;
                var containerHeight = self.container.height();
                self.container.find(".g-num-item").each(function(y){
                    var block = jQuery(this);
                    var items = block.find('i');
                    items.removeClass('center');
                    items.each(function(){
                        var item = jQuery(this);
                        var itemPosition = Math.ceil(item.offset().top  - self.container.offset().top , 10);
                        if ( item.offset().top > containerOffset + item.height()*0.75 && item.offset().top + item.height() < containerOffset + containerHeight ) {
                            item.addClass('center');
                        }
                        /*if ( itemPosition === Math.round(item.height(), 10) ) {
                            item.addClass('center');
                        }*/
                    });
                });
            }, 1000)
        }
    }, 0);
};
gScrollNumber.prototype.getCurrentValue = function () {
    return this.currentValue;
};