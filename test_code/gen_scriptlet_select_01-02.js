javascript:
void((function(f,urls,i,s){
	/* jQueryの存在チェックとバージョンチェック */
	if((undefined !== window.jQuery
		&& "jquery" in (window.jQuery() || {})
		&& jQuery().jquery >= '2.2.0'
	)){
		f(window.jQuery);
	}else{
		urls=[
			"https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js",
		];
		for(i=0;i<urls.length;i++){
			s=document.createElement("script");
			s.src=urls[i];
			s.id="tmkz_tnk";
			if(i==urls.length-1){s.onload=function(){f(jQuery.noConflict(true))}};
			document.body.appendChild(s);
		}
	}
})(function($,t,d,s){
	s='';
	t=top;
	d=document;
	
	/*
	ToDo
	
	
	*/
	var rdi=d.getElementsByTagName('INPUT');
	for(var n=0; n<rdi.length; n++){
		var t=rdi[n].getAttribute('type').toUpperCase();
		if('CHECKBOX'==t||'RADIO'==t){
			if(s!=rdi[n].name){
				s=rdi[n].name;
				rdi[n].click();
			}
		}
	}
	if($){
		selectOption(  $("select")             );
		allSelectRadio($("input[type='radio']"));
		selectRadio(   $("input[type='radio']"));
		inputAge(      $("input[type='text'],input[type='tel']") );
		/* 楽天のアンケートで、46番目の都道府県を選択する方法 */
		$("div.esb-item[data-value='46']").click();
		selectLabel(   $("label"), /40[代]?[-|~|～]?歳?/);			/* 年齢選択を想定 */
		selectLabel(   $("label"), /会社/);							/* 会社員を想定 */
		selectLabel(   $("label"), /^いない$/);
		selectLabel(   $("label"), /(父親はいない|母親はいない|配偶者はいない|すべて正しい)/);	/* 電子機器のやーつ */
	}
	
	/* ***********************************************
		セレクトボックスから、特定の値を選択する
	*********************************************** */
	function selectOption(s,t){
		var v,a=[ _selectTodofukuken,
			   _selectNenrei,
			];
		$(s).each(function(){
			$(this).val($("option",$(this)).eq(1).val()); /* 2番目要素を事前選択 */
			v = 0;
			for(var i=0;i<a.length;i++){
				v = v || a[i]($(this),t); /* 該当項目選択処理 */
				if(v) break;
			}
		});
	}
	function _selectTodofukuken(s,t){
		t = t || "鹿児島";
		return _selSelectBox(s,t);	
	}
	function _selectNenrei(s,t){
		t = t || "43";
		return _selSelectBox(s,t);
	}
	function _selSelectBox(s,t){
		var i=0;
		var v = $("option",s).filter(function(){
				if($(this).text().indexOf(t)>-1){
					$(this).click();
					i++;
					return true;
				}
			}).first().val();
		if(i==0){
		}else{
			s.val(v);
		}
		return v;
	}
	/* ***********************************************
		ラジオから、特定の値を選択する
	*********************************************** */
	/* 一意なname毎に、1つを選択状態にする */
	function allSelectRadio(s,n){
		n="";
		$(s).each(function(i){
			var j=$(this).attr("name");
			if(n!==j){
				$(this).prop("checked", true);
				n=j;
			}
		});
	}
	function selectRadio(s,t){
		$(s).each(function(i){
			if(0===i){
				$(this).prop("checked",true);
			}
			if($(this).next().text().indexOf("男")>-1){
				$(this).prop("checked",true);
			}
			if($(this).next().text().indexOf("43")>-1){
				$(this).prop("checked",true);
			}
			if($(this).next().text().indexOf("会社員")>-1){
				$(this).prop("checked",true);
			}
		});
	}
	/* ***********************************************
		チェックボックスから、特定の値を選択する
		対象→40、会社員
	*********************************************** */	
	/* ***********************************************
		ラジオボタンクリック
	*********************************************** */
	function selectLabel(l,r){
		l.each(function(){
			var $this = $(this);
			if($this.text().match(r)){
				$this.click();
			}
		});
	}
	/* ***********************************************
		テキストボックス入力
		対象→41 年齢
	*********************************************** */	
	function inputAge(s,v){
		v = v || 43;
		$(s).each(function(){
			$(this).val(v);
		});
	}
}));