(function(win,doc){var defaultSettings={el:''};function EnlargeInit(options){var self=this;if(!options){throw new Error("请传入配置参数");}
self=Object.assign(self,defaultSettings,options);self.clickFlag=true;self.urlArr=[];$(self.el).each(function(){self.urlArr.push($(this).data('url'))})
self.listenPopStateHandle=self.listenPopState()
self.bindAll();}
EnlargeInit.prototype={bindAll:function(){var self=this;$(document.body).on("click","#enlargeEl",function(){if(self.clickFlag==false){return};self.clickFlag=false;self.saveStatelen=0;self.currentId=0;self.currentUrl=self.urlArr[0];self.replaceState();self.getEnlargeImginfo()
window.removeEventListener('popstate',self.fnReload);window.addEventListener('popstate',self.listenPopStateHandle);})
$(document.body).on("click",".enlarge-pop a.prev-btn",function(){if(self.clickFlag==false){return};self.clickFlag=false;self.prev()})
$(document.body).on("keyup",function(e){if($(".enlarge-pop").is(":visible")&&e.keyCode==37){if(self.clickFlag==false){return};self.clickFlag=false;self.prev()}})
$(document.body).on("click",".enlarge-pop a.next-btn",function(){if(self.clickFlag==false){return};self.clickFlag=false;self.next()})
$(document.body).on("keyup",function(e){if($(".enlarge-pop").is(":visible")&&e.keyCode==39){if(self.clickFlag==false){return};self.clickFlag=false;self.next()}})
$(document.body).on("click",".enlarge-pop .cls-btn",function(){self.close()})
$(document.body).on("keyup",function(e){if($(".enlarge-pop").is(":visible")&&e.keyCode==27){self.close()}})
window.addEventListener('popstate',self.fnReload);},getEnlargeImginfo:function(){var self=this;var arr=self.currentUrl.split('.html')[0].split('_')
self.currentId=arr[arr.length-1]
if(!self.currentId)return;$('html').css({'overflow':'hidden'})
$('.enlarge-pop').show();$('.enlarge-pop .inner .head').empty();$('.enlarge-pop .img-enlarge').empty();$.ajax({url:'/?m=ProductDetail&a=ajaxPop',data:{'id':self.currentId},success:function(res){console.log('当前 '+self.currentId)
if(res.status===200){self.tplRend(res.current)}}})},tplRend:function(obj){var self=this;var tagName=$('.banner-title h1 span').text()
$('.enlarge-pop .inner .head').append('<p class="title"><span class="name">'+obj.title+'</span><span class="tag">'+tagName+'</span></p>'+
'<div class="info">'+
'<img src="'+obj.head_src+'">'+
'<span class="txt">'+obj.name+'</span>'+
'<span class="line"></span>'+
'<span class="txt">'+obj.time+'</span>'+
'</div>'+
'<div class="btn-group">'+
'<a class="block-gradient graHover dlbtn" onclick="gaDetailDownload(\''+obj.cate+'\', '+obj.id+')"><i class="icontfont icon-xiazai-copy1"></i>'+obj.format+'</a>'+
'<a class="collect'+(obj.favorite_status?' active':'')+'" data-id="'+obj.id+'" data-status="'+obj.favorite_status+'"><i class="icontfont icon-love-b"></i></a>'+
'</div>')
$('.enlarge-pop .img-enlarge').append('<img src="'+obj.src+'">')
self.isFirst()?$('.enlarge-pop .prev-btn').hide():$('.enlarge-pop .prev-btn').show()
self.isLast()?$('.enlarge-pop .next-btn').hide():$('.enlarge-pop .next-btn').show()
self.clickFlag=true;},pushState:function(){history.pushState({stateLen:this.saveStatelen},null,this.currentUrl)},replaceState:function(){history.pushState({stateLen:this.saveStatelen},null,this.currentUrl)},close:function(){$('.enlarge-pop').hide();$('html').css({'overflow':'auto'})
if(history.state){var num=this.stepsToListPage()
if(num){history.go(-num)
this.saveStatelen=0;}}
window.removeEventListener('popstate',self.listenPopStateHandle);},prev:function(){if(this.isFirst()){alert('没有上一个了。');return;}else{var index=this.urlArr.indexOf(location.pathname);this.saveStatelen++
this.currentUrl=$(this.el).eq(index-1).data('url')
this.pushState();this.getEnlargeImginfo();}},next:function(){if(this.isLast()){alert('没有下一个了。');return}else{var index=this.urlArr.indexOf(location.pathname);this.saveStatelen++
this.currentUrl=$(this.el).eq(index+1).data('url');this.pushState();this.getEnlargeImginfo();}},stepsToListPage:function(){return history.state.stateLen||0},isFirst:function(){return this.urlArr.indexOf(location.pathname)===0?true:false},isLast:function(){return this.urlArr.indexOf(location.pathname)===this.urlArr.length-1?true:false},fnReload:function(){window.location.reload()},listenPopState:function(){var self=this;return function(){if(history.state==null||history.state.stateLen==0){$(".enlarge-pop").hide()
$('html').css({'overflow':'auto'})
return}
self.currentUrl=location.pathname;self.saveStatelen=history.state.stateLen;self.getEnlargeImginfo();}}}
win.EnlargeInit=EnlargeInit;})(window,document)