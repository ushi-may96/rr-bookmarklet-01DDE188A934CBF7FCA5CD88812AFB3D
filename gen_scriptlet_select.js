javascript:void((function(f,urls,i,s){
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
	const myAge = getMyAge().toString();
	s='';
	t=top;
	d=document;
	
	/*
	ToDo
	ラジオの全チェックが入らないぞ
	
	*/
	/*
	let rdi=d.getElementsByTagName('INPUT');
	for(let n=0; n<rdi.length; n++){
		let t=rdi[n].getAttribute('type').toUpperCase();
		if('CHECKBOX'==t||'RADIO'==t){
			if(s!=rdi[n].name){
				s=rdi[n].name;
				rdi[n].click();
			}
		}
	}
	*/
	let history = []; 
	const historyLength = 3;

	// 処理済みのグループ名（name属性）を記録するセット
	const processedNames = new Set();

	const rc = d.querySelectorAll('input[type="radio"], input[type="checkbox"]');

	for (const element of rc) {
		// name属性がない場合は、単一の要素として扱うため一意のIDや空文字を使用
		const groupName = element.name || element.id; 

		// まだ処理していないグループの場合のみ実行
		if (!processedNames.has(groupName)) {
			processedNames.add(groupName);

			element.checked = !element.checked;
			// 実際に状態が変わったときのみイベントを発生させる（負荷軽減）
			element.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
		}
	}


	
	
	if($){
		const local_label		= $("label");
		const local_div		= $("div");
		const local_span		= $("span");
		const local_select	= $("select");
		const local_radio		= $("input[type='radio']");
		
		/************** 優先度 低　→　高 の順序に記述すること ************** */
		
		selectOption(local_select);
		selectOptionByText($("option"), /50代男性|システム|開発|IT|エンジニア|技術|情報|鹿児島県?|九州|ホンダ|フィット|1975|10|日本$/);
		allSelectRadio(local_radio);
		selectRadio(   local_radio);
		inputAge(       $("input[type='text'],input[type='tel']") );
		ignoreAge();
		
		/* 楽天のアンケートで、46番目の都道府県を選択する方法 */
		$("div.esb-item[data-value='46']").click();
		selectLabel(   local_label, /イギリス|東京/);					/* 品質管理用 */
		selectLabel(   local_label, /男性/);							/* 性別選択を想定 */
		selectLabel(   local_label, /50[代|歳]?[-|~|～]?歳?/);			/* 年齢選択を想定 */
		selectLabel(   local_div,   /50[代|歳]?[-|~|～]?歳?/);			/* 年齢選択を想定 */
		selectLabel(   local_label, /男性.50[代|歳]?[-|~|～]?歳?/);	/* 年齢選択を想定 */
		selectLabel(   local_div,   /男性.*50[代|歳]?[-|~|～]?歳?/);	/* 年齢選択を想定 */
		selectLabel(   local_label, /50代男性/);						/* 年齢選択を想定 */

		selectLabel( local_div,     /結婚している/);					/* 婚姻状況を想定 */
		selectLabel( local_label,   /結婚している/);					/* 婚姻状況を想定 */
		selectLabel( local_label,   /既婚|男性.*既婚/);					/* 婚姻状況を想定 */
		selectLabel( local_label,   /既婚$|既婚（?配偶者あり|既婚\(?配偶者あり/);			/* 婚姻状況を想定 */
		selectLabel( local_label,   /既婚.+子どもあり/);				/* 婚姻状況を想定 */
		/* 楽天のアンケートで、46番目の都道府県を選択する方法 */
		$("div.esb-item[data-value='46']").click();

		selectLabel(   $("span.radio-button-label-text"), /会社/);		/* 会社員を想定 */
		selectLabel(   local_label, /(中学生|高等学校|高校|高卒)/);		/* 学歴 */
		selectLabel(   local_label, /中学2年(生男子)?$/);				/* 子供の～ */
		//selectLabel(   local_label, /会社/);							/* 会社員を想定 */
		selectLabel(   local_label, 
			/(ソフトウェア|システムエンジニア|情報サービス|IT|システム開発|保守|運用関連職)/);	/* 業種 */
		selectLabel(   local_label, /^(?!.*(契約|派遣))社員.*$/);		/* 会社員を想定 */
		selectLabel(   local_label, /^正社員(?!.*管理職).*$/);			/* 会社員を想定 */
		selectLabel(   local_label, /会社勤務\S+管理職/);				/* 会社員を想定 */
		selectLabel(   local_label, /会社員/);							/* 会社?　＜ 会社員 を優先 */
		selectLabel(   local_label, /正社員/);							/* 会社?　＜ 正社員 を優先 */
		selectLabel(   local_label, /^正社員$/);						/* 会社?　＜ 正社員 を優先 */
		selectLabel(   local_label, /((情報|通信)技術.*|技術[職|系]?)/);/* 会社?　＜ 正社員 を優先 */
		selectLabel(   local_label, /^いない$/);
		//selectLabel(   local_label, /500/);								/* 従業員数 */
		selectLabel(   local_label, /[^,0-9]499\b/);					/* 従業員数(499が優先) */
		selectLabel(   local_label, /(父親はいない|母親はいない|配偶者はいない|結婚していない|すべて正しい)/);	/* 電子機器のやーつ */
		selectLabel(   local_label, /日本/);							/* 日本を想定 */
		selectLabel(   local_label, /^日本$/);							/* 日本を想定 */
		selectLabel(   local_label, /鹿児島/);							/* 鹿児島県を想定 */
		selectLabel(   local_label, /九州/);							/* 九州を想定 */
		selectLabel(   local_span	, /鹿児島/);							/* 都道府県 */
		selectLabel(   local_label, /^200\b|^201\b/)					/* 従業員201～ */
		selectLabel(   local_label, /[^,0-9]30{2}\b|[^,0-9]301\b/)		/* 従業員300～ */
		selectLabel(   local_label, /^300\b|^301\b/)					/* 従業員300～ */
		selectLabel(   local_label, /[^,0-9]400\b/);					/* 年収 1400や1,400回避 */
		selectLabel(   local_label, /^400\b/);							/* 年収 */
		selectLabel(   local_label, /ホンダ|ハイブリッド|HEV|フィット|honda|fit|コンパクト/i);
																	/* 車関連 */
		selectLabel(   local_label, 									/* その他・ひっかけ対策 */
			/auひかり|1\+1=2|参加したことはない|異性愛|45～54歳$|3人$|^Z$|^1台$|以外は屋内|フルタイム|正規の職員|りんご|きいろ|参加したくない|非上場|ゴールド会員|課長|情報|情シ|赤と白|チンパンジー|チョコレート|水は液体|プラチナ会員|ハンバーグ|フランス|上場していない|未上場/);
		
		// ToDo 支社・支店・支所 の追加
		//	ToDo	30億円と300億円を同一視する対策
		
		
		/* D Style 住所入力用 */
		if(/dstyle/.test(location.href)){
			/**
			 * TIN		都道府県
			 * TIN_GYO	業種
			 * TIN_SYO	職種
			 */
			const tin = document.querySelector('INPUT.TIN');
			if(tin){
				tin.value = '鹿児島';
			}
			
			const tin_gyo = document.querySelector('input.TIN[type="text"][placeholder="業種"]');
			if(tin_gyo){
				tin_gyo.value = 'IT';
			}

			const tin_syo = document.querySelector('input.TIN[type="text"][placeholder="職種"]');
			if(tin_syo){
				tin_syo.value = 'SE';
			}
		}
		
		/**
		 * なるほどMC用の郵便番号
		 */
		const postcodes = document.querySelectorAll('input[type="number"]');
		if(postcodes?.length >=2 ){
			postcodes[0].value='891';
			postcodes[1].value='0404';
		}
		
		/* Numers DX用 簡易修正 */
		if($("input[type='tel'][name='number1']").length>0){
			$("input[type='tel'][name='number1']").val(getRandomNumber_his());
			$("input[type='tel'][name='number2']").val(getRandomNumber_his());
			$("input[type='tel'][name='number3']").val(getRandomNumber_his());
			$("input[type='tel'][name='number4']").val(getRandomNumber_his());
			$("input[type='tel'][name='number5']").val(getRandomNumber_his());
			$("input[type='tel'][name='number6']").val(getRandomNumber_his());
		}
		/* research.net 関連での例外処理(テキスト関連) */
		//const $rn_label = $("span[class*='smqr-richTextContent']");
		/*
		if($rn_label.length){
			$rn_label.each(function(){
				const labelText = $(this).text();
				if(/男|50/.test(labelText)){
					$(this).trigger("click");
				}
			});
		}
		*/
		// クラス名に 'user-generated' を含む span、または元のセレクタで指定
		/*
		const rnLabels = Array.from(
		  document.querySelectorAll("label[data-sm-radio-button-label] span.user-generated")
		).reverse();

		rnLabels.forEach(span => {
		  const labelText = span.textContent.trim();
		  
		  if (/男性|50|会社員|課長/.test(labelText)) {
			const label = span.closest("label");
			if (!label) return;

			// 1. ラベルに関連付けられている input 要素（ラジオボタン本体）を探す
			const inputId = label.getAttribute('for');
			const input = inputId ? document.getElementById(inputId) : label.querySelector('input[type="radio"]');

			if (input) {
			  // 2. 二重クリックを防ぐため、直接 input の状態を書き換える
			  input.checked = true;

			  // 3. SurveyMonkey の見た目を更新するために、ラベル要素を「1回だけ」クリック
			  label.click();

			  // 4. SurveyMonkey のシステムに変更を強制通知する（最重要）
			  const event = new Event('change', { bubbles: true });
			  input.dispatchEvent(event);
			}
		  }
		});
		*/

		// クラス名に 'user-generated' を含む span、または元のセレクタで指定
		const rnLabels = Array.from(
		  document.querySelectorAll("label[data-sm-radio-button-label] span.user-generated")
		).reverse();

		rnLabels.forEach(span => {
		  const labelText = span.textContent.trim();
		  
		  if (/男性|50|会社員|課長/.test(labelText)) {
			const label = span.closest("label");
			if (!label) return;

			// 1. ラベルに関連付けられている input 要素（ラジオボタン本体）を探す
			const inputId = label.getAttribute('for');
			const input = inputId ? document.getElementById(inputId) : label.querySelector('input[type="radio"]');

			if (input) {
			  // 2. すでにチェックされている場合は何もしない（誤作動防止）
			  if (!input.checked) {
				// 3. input を直接クリックする
				// これにより：
				// ① ラジオボタンにチェックが入る
				// ② SurveyMonkeyの見た目（ラベルのスタイル）が変わる
				// ③ changeイベントが自動でバブリング発生し、システムに保存される
				input.click();
			  }
			}
		  }
		});


		
		/* research.net 関連での例外処理(option関連) */
		// const $rn_option = $("option[class*='smqr-selectOption']");
		/*
		if($rn_option.length){
			$rn_option.each(function(){
				const optionText = $(this).text();
				if(/鹿児島/.test(optionText)){
					// $(this).trigger("click");
					// $(this).focus();
					// $(this).change();
					$(this).click();
					$(this).prop("seledted",true);
				}
			});
			// $rn_option.focus();
			// $rn_option.change();
		}
		*/
		// 1. 神奈川県の option 要素を探索
		const targetOption = Array.from(document.querySelectorAll("select[data-sm-select] option")).find(option => {
			return option.textContent.trim() === "鹿児島県";
		});

		if (targetOption) {
			const select = targetOption.closest('select');
			
			// 2. select 要素の値を神奈川県の value に変更
			select.value = targetOption.value;

			// 3. SurveyMonkey 側に変更を通知するネイティブイベントを発火(input,change両方あると完璧らしい)
			select.dispatchEvent(new Event('input', { bubbles: true }));
			select.dispatchEvent(new Event('change', { bubbles: true }));
			//const event = new Event('change', { bubbles: true });
			//select.dispatchEvent(event);
		}


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
	function selectOptionByText(s,reg){
		s.each(function(){
			const txt = $(this).text();
			if(reg.test(txt)){
				$(this).prop("selected",true);
				$(this).trigger("click");
			}
		});
	}
	function _selectTodofukuken(s,t){
		t = t || "鹿児島";
		return _selSelectBox(s,t);	
	}
	function _selectNenrei(s,t){
		t = t || myAge;
		return _selSelectBox(s,t);
	}
	function _selSelectBox(s,t){
		let i=0;
		const v = $("option",s).filter(function(){
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
			const text = $(this).next().text();
			
			if(/男/.test(text)){
				$(this).prop("checked",true);
			}
			if(text.includes(myAge)){
				$(this).prop("checked",true);
			}
			if(/会社員/.test(text)){
				$(this).prop("checked",true);
			}		
			if(/50代男性/.test(text)){
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
		l	：	LABELオブジェクト(jQuery)
		r	：	正規表現
	*********************************************** */
	function selectLabel(l,r){
		l.each(function(){
			const text = $(this).text();
			if(r.test(text)){
				$(this).click();
				// console.log("hit",$this.text(),r)
			}
		});
	}
	/*
	testcode
		console.time("A");
		$("div").filter(function(){
			return /ポンタ/.test($(this).text());
		})
		.each(function(){
			console.log($(this).text());
		});
		console.timeEnd("A");
		
		console.time("B");
		$("div").each(function(){
			const text = $(this).text();
			if(/ポンタ/.test(text)){
				console.log(text);
			}
		});
		console.timeEnd("B");
	*/
	
	/* ***********************************************
		テキストボックス入力
		対象→41 年齢
	*********************************************** */	
	function inputAge(s,v){
		v = v || myAge;
		$(s).each(function(){
			$(this).val(v);
		});
	}

	/* ***********************************************
		本日の年齢生成
		
	*********************************************** */	
	function calcAge(birthdate, targetdate) {
		var age = targetdate.getFullYear() - birthdate.getFullYear();
		var birthday = new Date(targetdate.getFullYear(), birthdate.getMonth(), birthdate.getDate());
		if (targetdate < birthday) {
			age--;
		}
		return age;
	}

	function getMyAge(){
		birthdate	= new Date("1975/10/01");
		targetdate	= new Date();	/* 本日 */
		return calcAge(birthdate, targetdate);
	}
	

	function getRandomNumber_his() {
	  let newNum;
	  do {
		newNum = Math.floor(Math.random() * 9) + 1;
	  } while (history.includes(newNum) && Math.random() < 0.5);

	  history.push(newNum);
	  if (history.length > historyLength) {
		history.shift();
	  }

	  return newNum;
	}
	function ignoreAge(){
		if(/dstyleweb/.test(location.href)){
			const $sonotaText = $("input.CIN[type='text']");
			if($sonotaText.length){
				$("label").each(function(){
					if(/その他/.test($(this).text())){
						$sonotaText.val("");
						return false;
					}
				});
			}
		}
	}
	// 全角半角・空白の揺らぎを吸収する正規化関数
	function normalizeText(str) {
		if (!str) return "";
		return str
		.replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
		.replace(/\s+/g, "");
	}	
}));