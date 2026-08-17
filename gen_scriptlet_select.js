javascript:void(
(function(){
	const scriptVersion = '2026081601'
	
	console.clear();
	console.log('rr.js start',`ver=${scriptVersion}`);

	const myAge = getMyAge().toString();
	let history = []; 
	const historyLength = 3;

	const cachedLabel		= document.querySelectorAll('LABEL');
	const cachedDiv			= document.querySelectorAll('DIV');
	const cachedSpan		= document.querySelectorAll('SPAN');
	const cachedRadio		= document.querySelectorAll('input[type="radio"],input[type="checkbox"]')
	/************** 優先度 低　→　高 の順序に記述すること ************** */
	
	//allSelectRadio(local_radio);
	selectRadioByText(   cachedRadio);

	/** fast-askで「その他」の取り扱い
	 * テキストボックスに余計な値が入力されないように調整する
	 */
	let isOther = false;
	if(/fast-ask\.com/.test(location.href)){
		// 1. まずはピンポイントでテキストボックスを探す（高速）
		const txtItem = document.querySelector('input[type="text"]');

		// 2. テキストボックスが存在する場合のみ、"その他" のLABELを探す
		// ※ txtItem が null なら、右側の some() は実行すらされずスキップされます（短絡評価）
		isOther = txtItem && [...document.querySelectorAll('label')].some(el => el.textContent.trim() === 'その他');

		// 3. 両方揃っていればクリアする
		//if (isOther) {
		//	txtItem.value = '';
		//}		
	}
	if(isOther){
		// fast-askで「その他」あり→noop
	}else{
		// 通常ページで年齢記入
		inputAge(       document.querySelector('input[type="text"],input[type="tel"],input[type="number"]'));
	}
	// 年齢記入のイレギュラー調整
	ignoreAge();
	
	selectLabelByText(   cachedLabel, /イギリス|東京/);					/* 品質管理用 */
	selectLabelByText(   cachedLabel, /男性/);							/* 性別選択を想定 */
	selectLabelByText(   cachedLabel, /50[代|歳]?[-|~|～]?歳?/);			/* 年齢選択を想定 */
	selectLabelByText(   cachedDiv,   /50[代|歳]?[-|~|～]?歳?/);			/* 年齢選択を想定 */
	selectLabelByText(   cachedLabel, /男性.50[代|歳]?[-|~|～]?歳?/);	/* 年齢選択を想定 */
	selectLabelByText(   cachedDiv,   /男性.*50[代|歳]?[-|~|～]?歳?/);	/* 年齢選択を想定 */
	selectLabelByText(   cachedLabel, /50代男性/);						/* 年齢選択を想定 */

	selectLabelByText( cachedDiv,     /結婚している/);					/* 婚姻状況を想定 */
	selectLabelByText( cachedLabel,   /結婚している/);					/* 婚姻状況を想定 */
	selectLabelByText( cachedLabel,   /既婚|男性.*既婚/);					/* 婚姻状況を想定 */
	selectLabelByText( cachedLabel,   /既婚$|既婚（?配偶者あり|既婚\(?配偶者あり/);			/* 婚姻状況を想定 */
	selectLabelByText( cachedLabel,   /既婚.+子どもあり/);				/* 婚姻状況を想定 */

	/** 
	 * 楽天のアンケート
	 * https://enq.internet-research.jp/specific/enq/
	 *	46番目の都道府県を選択する方法
	 * https://enq.member.insight.rakuten.co.jp/enq/
	 * 	[きいろ][みどり]のひっかけ対策
	 * 	document.querySelectorAll('div.inline-block div') のtextContent */
	if(/internet-research\.jp|insight\.rakuten\.co\.jp/.test(location.href)){
		// 都道府県
		document.querySelector('div.esb-item[data-value="46"]')?.click();
		// つけまちがいの対策
		const targetTexts = new Set(['きいろ', 'みどり']);
		for (const item of document.querySelectorAll('div.inline-block div')) {
			const textItem = item.textContent.trim();
			
			if (targetTexts.has(textItem)) {
				item.click();
				//item.dispatchEvent(new Event('change', { bubbles: true }));
				//clickでイベント伝達されるためdispatchは不要
				//複数アイテムのヒットがあるため、break不要
			}
		}
	}

	selectLabelByText(   document.querySelectorAll('span.radio-button-label-text'), /会社/);		/* 会社員を想定 */
	selectLabelByText(   cachedLabel, /(中学生|高等学校|高校|高卒)/);		/* 学歴 */
	selectLabelByText(   cachedLabel, /中学2年(生男子)?$/);				/* 子供の～ */

	selectLabelByText(   cachedLabel, 
		/(ソフトウェア|システムエンジニア|情報サービス|IT|システム開発|保守|運用関連職)/);	/* 業種 */
	selectLabelByText(   cachedLabel, /^(?!.*(契約|派遣))社員.*$/);		/* 会社員を想定 */
	selectLabelByText(   cachedLabel, /^正社員(?!.*管理職).*$/);			/* 会社員を想定 */
	selectLabelByText(   cachedLabel, /会社勤務\S+管理職/);				/* 会社員を想定 */
	selectLabelByText(   cachedLabel, /会社員($|\W?管理|\W?課長)/);				/* 会社?　＜ 会社員 または 会社員（管理職） を優先 */
	selectLabelByText(   cachedLabel, /正社員/);								/* 会社?　＜ 正社員 を優先 */
	selectLabelByText(   cachedLabel, /^正社員$/);						/* 会社?　＜ 正社員 を優先 */
	selectLabelByText(   cachedLabel, /((情報|通信)技術.*|技術[職|系]?)/);/* 会社?　＜ 正社員 を優先 */
	selectLabelByText(   cachedLabel, /^いない$/);

	selectLabelByText(   cachedLabel, /[^,0-9]499\b/);					/* 従業員数(499が優先) */
	selectLabelByText(   cachedLabel, /(父親はいない|母親はいない|配偶者はいない|結婚していない|すべて正しい)/);	/* 電子機器のやーつ */
	selectLabelByText(   cachedLabel, /日本/);							/* 日本を想定 */
	selectLabelByText(   cachedLabel, /^日本$/);							/* 日本を想定 */
	selectLabelByText(   cachedLabel, /鹿児島/);							/* 鹿児島県を想定 */
	selectLabelByText(   cachedLabel, /九州/);							/* 九州を想定 */
	selectLabelByText(   cachedSpan	, /鹿児島/);							/* 都道府県 */
	selectLabelByText(   cachedLabel, /^200\b|^201\b/)					/* 従業員201～ */
	selectLabelByText(   cachedLabel, /[^,0-9]30{2}\b|[^,0-9]301\b/)		/* 従業員300～ */
	selectLabelByText(   cachedLabel, /^30(0*(?!億円|万円)\b|\b)|^301(?!億|万円)\b/)	/* 従業員300～ */
	selectLabelByText(   cachedLabel, /[^,0-9]400(?!億)\b/);				/* 年収 1400や1,400回避 */
	selectLabelByText(   cachedLabel, /^400\b/);							/* 年収 */
	selectLabelByText(   cachedLabel, /ホンダ|ハイブリッド|HEV|フィット|honda|fit|コンパクト/i);
																	/* 車関連 */
	selectLabelByText(   cachedLabel,								/* その他・ひっかけ対策 */
		/りんご|きいろ|ビーグル|メビウス|ゆうちょ|auひかり|20年以上|参加したことはない|異性愛|45～54歳$|3人$|^1台$|以外は屋内|フルタイム|正規の職員|参加したくない|非上場|ゴールド会員|課長|情報|情シ|赤と白|プラチナ会員|上場していない|未上場/);
	
	/** 特定のアンケートサイトによるひっかけ対策
	 * ①pathnameが/ans/pc/processAnswer.php
	 * ②完全一致する単語があれば該当とする
	 * ③1つのページ内に複数の当該単語があるケースがあり、それをすべてクリックする
	 * */
	if(location.pathname.startsWith('/ans/pc/processAnswer.php')){
		// 1. 検索を高速化（Setオブジェクト化）
		const targetLabelSet = new Set([
			'Z', 'りんご', 'きいろ', '1+1=2', 'チンパンジー', 'チョコレート', 
			'水は液体', 'ハンバーグ', 'フランス', '赤', '青', '黄', '緑', '野球', '東京'
		]);

		for (const el of cachedLabel) {
			const text = el.textContent.trim();
			
			// 計算量 O(1) で一瞬で判定
			if (targetLabelSet.has(text)) {
			  el.click();
			}
		 }
	}
	/* D Style 住所入力用 */
	if(/^https?:\/\/\w+\.dstyleweb\.com/.test(location.href)){
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
	 * 枠は2つある
	 */
	 if(/enq\.web-mc\.net/.test(location.href)){
		const postcodes = document.querySelectorAll('input[type="number"]');
		if(postcodes.length >=2 ){
			postcodes[0].value='891';
			postcodes[1].value='0404';
		}
	}
	
	/**
	 * uniリサーチ用
	 * 可能な限りチェックボックスをクリックする
	 */
	if(/^https?:\/\/unii-research\.com\//.test(location.href)){
		const clickedNames = new Set();

		for (const el of document.querySelectorAll('input[type="radio"]')) {
			if (!clickedNames.has(el.name)) {
				el.click();
				clickedNames.add(el.name);
			}
		}		
	}

	/**
	 * Numers DX用 ランダム値設定
	 * 枠は6つある
	 */
	const rnumbers = document.querySelectorAll('input[type="tel"][name*="number"]');

	if (rnumbers.length >= 6) {
		rnumbers.forEach((el) => {
			el.value = getRandomNumber_his();
		});
	}

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

	function selectByText() {
		// 探したいキーワードのリスト
		const age = getMyAge();
		const items = ['1975', /10/,
				'50代男性','システム','開発','IT','エンジニア',
				'技術','情報','九州','ホンダ','フィット',
				'課長', '300～', '400～', /400(?:万円)?～'/, '～500','日本',
				age,
				/鹿児島県?/,/^(?:犬|イヌ)$/,/^会社員?/,/課長/

				];
	
		// 画面内のすべてのセレクトボックスをループ
		document.querySelectorAll('select').forEach(sel => {
			const options = sel.querySelectorAll('option');
			const total = options.length; // 総数を取得

			// option要素を1つずつチェック
			for (const [index, opt] of options.entries()) {
				const text = opt.textContent.trim();
	
				// キーワードのどれかにマッチするかチェック
				const isMatch = items.some(item => {
					if (item instanceof RegExp) {
						// 正規表現オブジェクトの場合は test() で判定
						return item.test(text);
					} else {
						// 通常の文字列の場合は、元の仕様通り前方一致（startsWith）で判定
						return text.startsWith(item);
					}
				});	

				if (isMatch) {
					console.log(`見つかった: ${text}`);
					
					sel.value = opt.value; // 値を変更
					sel.dispatchEvent(new Event('change', { bubbles: true })); // イベント発生
					
					break; // 💡 このセレクトボックスは設定完了なので、次のセレクトボックスへ！
				} else{
					// 最終的に見つからなかった場合、最初のoptionを選択状態とする
					// 最後のインデックス（総数 - 1）であるか判定
					if (index === total - 1) {
						sel.value = sel.querySelector('option').value;
					}
				}
			}
		});
	}
	
	selectByText();
	

	/**
	 * 条件に一致する項目をすべてクリックする（途中でbreakしない）
	 * 
	*/
	//いったん休止
	//selectLabelByColor( cachedLabel, /^[赤青黄緑]$/);			/** 見つかったラベルをすべてクリックする */

	/** チェックボックス、ラジオボタンしめの処理
	 * いずれもチェックが入らなかったときに1つはチェックをれます
	 */
	const rc = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
	const processedNames = new Set();

	for (const element of rc) {
		// name属性がない場合はid、それもなければ処理スキップ（または一意の識別子）
		const groupName = element.name || element.id;
		if (!groupName) continue; 

		// まだ未処理のグループの場合のみチェックを行う
		if (!processedNames.has(groupName)) {
			processedNames.add(groupName);

			// 1. 同一グループの要素をすべて取得
			// name属性がある場合はセレクタでグループ全体を取得、ない場合は自身のみ
			const groupElements = element.name 
				? document.querySelectorAll(`input[name="${CSS.escape(groupName)}"]`)
				: [element];

			// 2. グループ内に1つでもチェック済み(checked)の要素があるか判定
			const hasChecked = Array.from(groupElements).some(el => el.checked);

			// 3. 1つもチェックが入っていない場合のみ、現在の要素にチェックを入れる
			if (!hasChecked) {
				const grpEl = groupElements[0];
				grpEl.checked = true; // 強制的にtrueにする
				
				// イベントの変更通知
				grpEl.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
			}
		}
	}

	// ここまで ----------------------------------------------------------------------------------------------------
	// ここまで ----------------------------------------------------------------------------------------------------
	// ここまで ----------------------------------------------------------------------------------------------------
	// ************************************************************************************************************
	// 以下、ヘルパー関数
	// ************************************************************************************************************

	/* ***********************************************
		セレクトボックスから、特定の値を選択する
	*********************************************** */
	/* ***********************************************
		ラジオから、特定の値を選択する
	*********************************************** */
	/* 一意なname毎に、1つを選択状態にする */
	function selectRadioByText(el){
		const idx = 0;
		for(const r of el){
			if(idx===0){
				r.checked = true;
				++idx;
			}
			const text = r.textContent.trim();
			if(/男|会社員|50代男性|50/.test(text)){
				r.checked = true;
				r.dispatchEvent(new Event('change', { bubbles: true }));
				break;
			}
		}
	}

	/** LABEL項目が見つかればクリックする（1件のみクリック）
	 * lbl	LABEL
	 * reg  正規表現
	 */
	function selectLabelByText(lbl, reg){
		for(const el of lbl){
			const text = el.textContent.trim();
			const isMatch = reg.test(text);
			if(isMatch){
				el.click();
				//見つかったのでブレーク
				break;
			}
		}
	}
	/**
	 * 指定した正規表現にマッチするLABEL項目を選択し、それ以外をクリアする
	 * @param {NodeList|Array<HTMLElement>} labels - 対象とするLABEL要素のリスト
	 * @param {RegExp} colorRegex - マッチさせる色の正規表現
	 */
	function selectLabelByColor(labels, colorRegex){
		// 1. ページ内に指定の色が「1つ以上あるか」を事前にチェック
		const hasColorLabel = Array.from(labels).some(label => 
			colorRegex.test(label.textContent.trim())
		);

		// 2. 色のLABELが存在する場合のみ、以下の処理を実行する
		if (hasColorLabel) {
			console.log("対象の色が見つかったため、選択状態の調整を開始します。");

			// 【ステップA】先に「色以外」の選択をすべてクリアする
			labels.forEach(label => {
				const isColor = colorRegex.test(label.textContent.trim());
				
				if (!isColor) {
					// label.htmlFor がある場合は、documentだけでなく、labelの所属するroot（ShadowDOM等考慮）や
					// 最悪documentから探すが、念のためinputの存在をチェック
					const input = label.querySelector('input') || (label.htmlFor ? document.getElementById(label.htmlFor) : null);
					if (input && input.checked) {
						input.checked = false; // チェックを外す
						input.dispatchEvent(new Event('change', { bubbles: true }));
					}
				}
			});

			// 【ステップB】次に「指定の色」だけを選択状態にする
			labels.forEach(label => {
				const isColor = colorRegex.test(label.textContent.trim());
				
				if (isColor) {
					const input = label.querySelector('input') || (label.htmlFor ? document.getElementById(label.htmlFor) : null);
					if (input && !input.checked) {
						input.checked = true; // チェックを入れる
						input.dispatchEvent(new Event('change', { bubbles: true }));
					} else if (!input) {
						label.click(); // inputがない場合はクリック
					}
					console.log(`選択しました: ${label.textContent.trim()}`);
				}
			});
		} else {
			// 色がない場合は何もせず終了
			console.log("対象の条件に一致する色が存在しないため、処理をスキップしました。");
		}    
	}

	/* ***********************************************
		テキストボックス入力
		年齢
	*********************************************** */	
	function inputAge(s){
		if(s){
			s.value = myAge;
		}
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

	/** DStyle用等の「その他」処理
	 * LABELにその他がある時に、テキストボックスは強制的に空にする
	 */
	function ignoreAge(){
		const ignoreText = ['その他','上記以外'];
		if(/dstyleweb/.test(location.hostname)){
			const sonotaText = document.querySelector('input.CIN[type="text"]');
			if(sonotaText){
				const isOtherLabel = [...document.querySelectorAll('label')]
					.some(el=>el.textContent.trim().startsWith('その他'));
				if(isOtherLabel){
					sonotaText.value = '';
				}
			}
		}
		if(/enq\.web-mc\.net/.test(location.hostname)){
			const sonotaText = document.querySelector('input[type="text"]');
			if(sonotaText){
				for(el of document.querySelectorAll('span.label-text')){
					if(ignoreText.some(text=>el.textContent.trim().includes(text))){
						sonotaText.value = '';
						break;
					}
				}
			}
		}
		/** 無条件に「その他」を判定するケース
		 * macromill.com等
		 * */		
		const sonotaText = document.querySelector('input[type="text"]');
		if(sonotaText){
			for(el of document.querySelectorAll('label,div.side_v_text')){
				if(ignoreText.some(text=>el.textContent.trim().includes(text))){
					sonotaText.value = '';
					break;
				}
			}
		}
	}
})()// 即時関数の終了
);// voidの終了