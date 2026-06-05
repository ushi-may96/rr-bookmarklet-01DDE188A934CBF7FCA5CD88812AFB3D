// 全角半角・空白の揺らぎを吸収する正規化関数
function normalizeText(str) {
    if (!str) return "";
    return str
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
      .replace(/\s+/g, "");
  }
  
  // 属性ごとの優先順位マスタ
  const attributeMaster = {
    occupation: [
      { target: '社員', score: 1 },
      { target: '会社員', score: 2 },
      { target: '会社員・管理職', score: 3 },
      { target: '課長', score: 4 }
    ],
    age: [
      { target: '20代', score: 1 },
      { target: '30代', score: 2 },
      { target: '40代', score: 3 }
    ]
  };
  
  function autoCheckForwardText() {
    const bestMatches = {};
    for (const key of Object.keys(attributeMaster)) {
      bestMatches[key] = { element: null, maxScore: -1, type: null };
    }
  
    // 1. チェックボックス、ラジオボタン、および疑似チェックボックス用のSPAN（またはLABEL）を取得
    // ※ 疑似チェックボックスのSPANに特定のクラス名（例: .custom-checkbox）があれば、'span.custom-checkbox' に変更してください
    const targetElements = document.querySelectorAll(
      'input[type="checkbox"], input[type="radio"], label, span'
    );
  
    targetElements.forEach(element => {
      // 疑似チェックボックス（SPANやLABEL）の場合、中に本物のINPUTが含まれていたら二重処理になるためスキップ
      if ((element.tagName === 'SPAN' || element.tagName === 'LABEL') && element.querySelector('input')) {
        return;
      }
  
      // 2. 「要素の直後」にあるテキストを取得（テキストノード、または隣の要素のテキスト）
      let nextText = "";
      
      // パターンA: 要素の直後に直接テキストが書かれている場合（例: <input> 会社員）
      if (element.nextSibling && element.nextSibling.nodeType === Node.TEXT_NODE) {
        nextText = element.nextSibling.textContent;
      }
      
      // パターンB: 要素の直後にテキスト入りのタグがある場合（例: <input><span>会社員</span>）
      // パターンAでテキストが取れなかった、または空白だけだった場合に実行
      if (!nextText.trim() && element.nextElementSibling) {
        nextText = element.nextElementSibling.textContent;
      }
  
      // テキストが全く取得できなかった場合はこの要素をスキップ
      if (!nextText.trim()) return;
  
      // 揺らぎを正規化
      const cleanText = normalizeText(nextText);
  
      // 3. マスタデータと照合（部分一致）
      for (const [attrKey, items] of Object.entries(attributeMaster)) {
        for (const item of items) {
          const normalizedTarget = normalizeText(item.target);
          
          if (cleanText.includes(normalizedTarget)) {
            if (item.score > bestMatches[attrKey].maxScore) {
              bestMatches[attrKey].maxScore = item.score;
              bestMatches[attrKey].element = element;
              // 本物のフォーム要素か、疑似（SPANなど）かを判別して記憶
              bestMatches[attrKey].type = (element.tagName === 'INPUT') ? 'native' : 'custom';
            }
          }
        }
      }
    });
  
    // 4. 各属性で最優先の要素にチェックを入れる
    for (const [attrKey, match] of Object.entries(bestMatches)) {
      if (match.element) {
        if (match.type === 'native') {
          // 本物のinput要素の場合
          match.element.checked = true;
          match.element.dispatchEvent(new Event('change', { bubbles: true }));
          match.element.dispatchEvent(new Event('click', { bubbles: true }));
        } else {
          // SPANなどの疑似チェックボックスの場合（クリックイベントを発火させてチェック状態にする）
          // 既にチェックが入っているかどうかをクラス名などで判定できる場合は、ここに「未チェックならクリックする」というガード条件を入れます
          match.element.click();
        }
        
        console.log(`【${attrKey}】優先スコア [${match.maxScore}] の要素（${match.element.tagName}）を処理しました。`);
      }
    }
  }
  
  // 実行
  autoCheckForwardText();
  