/**
 * 返回顶端
 */
function ToTop(btnId,opts) {
    this.backTopId = 0;
    this.btn = document.getElementById(btnId);
    this.init(opts);
}
ToTop.prototype = {
    init:function (opts) {
        var _this = this,
            version = 0;
        if (!!window.ActiveXObject) {
            version = parseFloat(navigator.userAgent.toLowerCase().match(/msie (\d+)/)[1]);
        }
        domUtils.on(this.btn, "click",function () {
            if(opts.click){
                opts.click.call(this);
            }else{
                _this.backTopId = setInterval(function () {
                    _this.backTop()
                }, 30);
            }
        });
        domUtils.on(window, "scroll", function () {
            var doc = document,
                scrTop = doc.documentElement.scrollTop || doc.body.scrollTop;

            _this.btn.style.display = scrTop >= 100 ? "block" : "none";
            //ie6下返回顶端位置
            if (version == 6)  _this.btn.style.top = 600 + scrTop + "px";
        });
    },
    backTop:function () {
        var doc = document,
            scrTop = doc.documentElement.scrollTop || doc.body.scrollTop,
            speed = Math.ceil(scrTop / 4);
        if (scrTop == 0)
            clearInterval(this.backTopId);
        else
            doc.documentElement.scrollTop = doc.body.scrollTop = scrTop - speed;
    }
};