(function(){
    var $ = function(id){
        return document.getElementById(id);
    }
    var Nav = function(id){
        this.init(id);
    }
    Nav.prototype = {
        child:[],
        init:function(id){
            this.dom = typeof id == "string" ?$(id) : id;
            this.childlist();
            this.bindli();
        },
        childlist:function(){
            for(var i= 0,li;li=this.dom.childNodes[i++];){
                if(li.nodeType==1&&/li/ig.test(li.tagName)){
                    this.child.push(li);
                    var tmpul = domUtils.getElementsByTagName(li,"ul");
                    if(tmpul.length>0){
                        li.childobj = new Nav(tmpul[0]);
                    }
                }
            }
        },
        bindli:function(){
            var me = this;
            for(var i= 0,li;li=this.child[i++];){
                (function(li){
                    li.onclick = function(evt){
                        evt = evt || event;
                        me.hidechild();
                        var tmp = this.getAttribute("tabcont");
                        if(tmp&&$(tmp)){
                            domUtils.addClass(this,"active");
                            $(tmp).style.display = "";
                        }else{
                            var tmpul = domUtils.getElementsByTagName(li,"ul");
                            if(tmpul.length>0){
                                tmpul[0].style.display = "";
                                var first = tmpul[0].firstChild;
                                while(first){
                                    if(first.nodeType==1&&/li/ig.test(first.tagName)){
                                        $(first.getAttribute("tabcont")).style.display = "";
                                        break;
                                    }
                                    first = first.nextSibling;
                                }
                            }
                            domUtils.addClass(this,"active");
                        }
                        if (window.event) {
                            event.cancelBubble = true;
                        }else if (evt){
                            evt.stopPropagation();
                        }
                    }
                })(li);
            }
        },
        hidechild:function(tabcont){
            for(var i= 0,li;li=this.child[i++];){
                var tmp = li.getAttribute("tabcont");
               if(tmp&&$(tmp)){
                    $(tmp).style.display = "none";
                    domUtils.removeClasses(li,"active");
                }
                if(tabcont){
                    if(typeof tabcont == "string" &&tabcont == tmp){
                       $(tmp).style.display = "";
                       domUtils.addClass(li,"active");
                   }else if(typeof tabcont=="object"){
                        $(tabcont.getAttribute("tabcont")).style.display = "";
                        domUtils.addClass(tabcont,"active");
                    }
                }
            }
        }
    }
    var href = location.href,
            model = href.indexOf("?")!=-1?href.substring(href.indexOf("?")+1,href.length):"";
    var nav = new Nav("leftnav");
    if(model){
        nav.hidechild(model);
    }else{
        nav.hidechild(nav.child[0])
    }
})();