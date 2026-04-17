console.log('🌿 Jīvaka renderer.js loaded');
console.log('React:', typeof React);
console.log('ReactDOM:', typeof ReactDOM);

const { useState, useEffect } = React;

// アイコンコンポーネント
const Icons = {
    Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    Plus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    Edit2: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
    Trash2: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    Beaker: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>,
    Wind: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>,
    History: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/></svg>,
    ChevronDown: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
    ChevronUp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>,
    Check: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
    AlertCircle: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    X: ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    Download: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    Upload: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
    Database: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
    Leaf: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
    Droplet: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
    Scale: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18"/><path d="m15 18-3 3-3-3"/><path d="M3 9h3"/><path d="M18 9h3"/><circle cx="12" cy="12" r="3"/></svg>,
    MessageSquare: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    Save: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
    Cannabis: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2c-1 3-2 5-4 7 2 0 3 1 4 3 1-2 2-3 4-3-2-2-3-4-4-7z"/><path d="M12 12v10"/><path d="M8 9c-2 1-4 2-5 4 2-1 4-1 5-1"/><path d="M16 9c2 1 4 2 5 4-2-1-4-1-5-1"/></svg>,
    Settings: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m5.6-14.6l-4.2 4.2m-2.8 2.8l-4.2 4.2M23 12h-6m-6 0H1m14.6 5.6l-4.2-4.2m-2.8-2.8l-4.2-4.2"/></svg>,
    Key: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
    Clock: ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    BookOpen: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    List: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    CloudSync: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
    CloudOff: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
    RefreshCw: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
};

// === 共通AI APIヘルパー（Claude / Gemini 両対応） ===
const callAI = async ({ prompt, aiProvider, apiKey, geminiApiKey, maxTokens = 2000 }) => {
  const activeKey = aiProvider === 'gemini' ? geminiApiKey : apiKey;
  if (!activeKey || !activeKey.trim()) {
    throw new Error('APIキーが設定されていません。画面右上の「管理者」ボタンからAPIキーを設定してください。');
  }

  let jsonText;

  if (aiProvider === 'gemini') {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${activeKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: maxTokens,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Gemini response:', data);

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('Geminiからの応答がありません');
    }

    jsonText = data.candidates[0].content.parts[0].text.trim();
  } else {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": activeKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }],
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Claude API error:', response.status, errorData);
      const errMsg = errorData.error?.message || response.statusText;
      if (response.status === 401) {
        throw new Error('Claude APIキーが無効です。正しいキーを設定してください。');
      } else if (response.status === 429) {
        throw new Error('Claude APIのレート制限に達しました。しばらく待ってから再試行してください。');
      } else if (response.status === 529) {
        throw new Error('Claude APIが過負荷状態です。しばらく待ってから再試行してください。');
      }
      throw new Error(`Claude API error (${response.status}): ${errMsg}`);
    }

    const data = await response.json();
    const textContent = data.content?.find(item => item.type === 'text');

    if (!textContent) {
      throw new Error('Claudeからの応答がありません');
    }

    jsonText = textContent.text.trim();
  }

  // JSON抽出（マークダウンフェンス除去）
  jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  console.log('AI raw text:', jsonText);
  return JSON.parse(jsonText);
};

const INITIAL_HERBS = [
  {
    id: '1', name: 'カモミール', scientificName: 'Matricaria chamomilla',
    origin: 'ヨーロッパ、西アジア',
    usedParts: ['花'], effects: ['鎮静作用', '抗炎症作用', '消化促進', '不眠改善'],
    topicalEffects: ['皮膚炎緩和', '抗炎症', '創傷治癒促進', '保湿効果'],
    sideEffects: ['妊娠中は注意', 'キク科アレルギーの可能性'],
    comment: '',
    image: null,
    components: { 
      hydrophilic: ['アピゲニン', 'フラボノイド'], 
      lipophilic: ['α-ビサボロール', 'カマズレン'],
      phDependent: []
    },
    receptors: {
      hydrophilic: [],
      lipophilic: [],
      phDependent: []
    },
    bodyParts: ['頭部', '消化器系', '神経系']
  },
  {
    id: '2', name: 'ラベンダー', scientificName: 'Lavandula angustifolia',
    origin: '地中海沿岸',
    usedParts: ['花', '葉'], effects: ['鎮静作用', '抗不安作用', '抗菌作用', '鎮痛作用'],
    topicalEffects: ['軽度の火傷緩和', '虫刺され', '抗菌', 'ニキビケア'],
    sideEffects: ['高濃度使用時の皮膚刺激'],
    comment: '',
    image: null,
    components: { 
      hydrophilic: ['ロスマリン酸', 'フラボノイド'], 
      lipophilic: ['リナロール', '酢酸リナリル', 'テルペン類'],
      phDependent: []
    },
    receptors: {
      hydrophilic: [],
      lipophilic: [],
      phDependent: []
    },
    bodyParts: ['頭部', '神経系', '呼吸器系']
  },
  {
    id: '3', name: 'ペパーミント', scientificName: 'Mentha × piperita',
    origin: 'ヨーロッパ（交配種）',
    usedParts: ['葉'], effects: ['消化促進', '抗菌作用', '鎮痛作用', '疲労回復'],
    topicalEffects: ['冷却効果', '筋肉痛緩和', '頭痛緩和', 'かゆみ止め'],
    sideEffects: ['胃食道逆流症の悪化', '乳幼児への使用注意'],
    comment: '',
    image: null,
    components: { 
      hydrophilic: ['タンニン', 'フラボノイド'], 
      lipophilic: ['メントール', 'メントン', 'リモネン'],
      phDependent: []
    },
    receptors: {
      hydrophilic: [],
      lipophilic: [],
      phDependent: []
    },
    bodyParts: ['消化器系', '呼吸器系', '筋肉系']
  },
  {
    id: '4', name: 'エキナセア', scientificName: 'Echinacea purpurea',
    origin: '北アメリカ',
    usedParts: ['根', '花', '葉'], effects: ['免疫賦活作用', '抗炎症作用', '抗菌作用', '抗ウイルス作用'],
    topicalEffects: ['創傷治癒', '湿疹緩和', '抗菌', '皮膚再生'],
    sideEffects: ['自己免疫疾患患者は注意', 'キク科アレルギー'],
    comment: '',
    image: null,
    components: { 
      hydrophilic: ['カフェ酸誘導体', '多糖類'], 
      lipophilic: ['アルキルアミド', '精油成分'],
      phDependent: []
    },
    receptors: {
      hydrophilic: [],
      lipophilic: [],
      phDependent: []
    },
    bodyParts: ['免疫系', '呼吸器系']
  }
];

const INITIAL_TERPENES = [
  { id: '1', name: 'β-ミルセン', effects: ['鎮静', '筋弛緩', '抗炎症', '鎮痛'], aroma: 'スパイシー、土っぽい、ムスク', receptors: ['GABA-A', 'TRPV1'], memo: 'Abstrax: beta-Myrcene｜5g $20 / 50g $42 / 100g $71｜BBB（血液脳関門）通過性を高めカンナビノイド吸収を促進する可能性。カンナビスで最も高濃度に存在するテルペンの一つ。ホップ、レモングラス、マンゴーに含有。' },
  { id: '2', name: 'd-リモネン', effects: ['抗不安', '気分向上', '抗うつ', '免疫賦活', '消化促進'], aroma: '柑橘系、甘い、レモン', receptors: ['5-HT1A', 'A2A'], memo: 'Abstrax: d-Limonene｜5g $15 / 50g $25 / 100g $35｜セロトニンとドーパミンの放出を促進。柑橘類の皮に豊富。カンナビスのSativa系で高濃度。ストレス緩和のゴールドスタンダード的テルペン。' },
  { id: '3', name: 'β-カリオフィレン', effects: ['抗炎症', '鎮痛', '抗不安', '胃保護'], aroma: 'ウッディー、スパイシー、ペッパー', receptors: ['CB2'], memo: 'Abstrax: beta-Caryophyllene｜5g $15 / 50g $25 / 100g $39｜CB2受容体選択的アゴニスト — カンナビノイド様作用を持つ唯一のテルペン。ブラックペッパー、クローブ、シナモンに含有。経口バイオアベイラビリティが高い。' },
  { id: '4', name: 'リナロール', effects: ['鎮静', '抗不安', '抗炎症', '鎮痛', '抗けいれん'], aroma: 'フローラル、甘い、ラベンダー', receptors: ['GABA-A', '5-HT1A', 'NMDA'], memo: 'Abstrax: Linalool｜5g $18 / 50g $30 / 100g $52｜ラベンダーの主要成分。GABA-A受容体のグルタミン酸結合部位を調節。アロマセラピーで最も研究されたテルペンの一つ。局所麻酔作用も報告。' },
  { id: '5', name: 'α-ピネン', effects: ['集中力向上', '記憶力向上', '気管支拡張', '抗炎症', '抗菌'], aroma: 'パイン、森林、土っぽい', receptors: ['AChE阻害'], memo: 'Abstrax: alpha-Pinene｜5g $15 / 50g $21 / 100g $35｜自然界で最も豊富なテルペン。アセチルコリンエステラーゼ阻害作用でTHCによる短期記憶障害を軽減する可能性。松葉、ローズマリーに含有。' },
  { id: '6', name: 'α-カリオフィレン (フムレン)', effects: ['抗炎症', '食欲抑制', '抗腫瘍', '抗菌'], aroma: 'ウッディー、土っぽい、ホップ', receptors: ['PPARγ', 'TRPV1'], memo: 'Abstrax: alpha-Caryophyllene｜5g $18 / 50g $57 / 100g $98｜ホップの主要テルペン（=フムレン）。β-カリオフィレンとアントラージュ効果で相乗作用。食欲抑制効果が独特。ビールの苦味香にも寄与。' },
  { id: '7', name: 'テルピノレン', effects: ['鎮静', '抗酸化', '抗菌', '抗腫瘍'], aroma: '甘い、パイン、ハーブ、フローラル', receptors: ['GABA-A'], memo: 'Abstrax: Terpinolene｜5g $15 / 50g $23 / 100g $34｜カンナビスでは比較的稀なテルペンだがJack HererやDurban Poisonで高濃度。複合的な香りが特徴（パイン+フローラル+シトラス+ハーブ）。ティーツリーオイルに含有。' },
  { id: 'abx-08', name: 'α-ビサボロール', effects: ['抗炎症', '抗菌', '鎮痛', '皮膚修復', '抗刺激'], aroma: 'フルーティー、土っぽい、フローラル', receptors: ['TRPA1', 'TRPV1'], memo: 'Abstrax: alpha-Bisabolol｜5g $25 / 50g $118 / 100g $203｜カモミールの主要有効成分。経皮吸収促進作用があり、他の成分のバイオアベイラビリティを向上。化粧品・スキンケアで広く使用。抗真菌作用も。' },
  { id: 'abx-09', name: 'α-フェランドレン', effects: ['鎮痛', '抗炎症', '抗真菌', '消化促進'], aroma: 'ミント、土っぽい、ペパーミント', receptors: [], memo: 'Abstrax: alpha-Phellandrene｜5g $40 / 50g $104 / 100g $178｜ユーカリ、ディル、パセリに含有。伝統的中医学で消化器系の問題に使用された歴史。ミントとシトラスの中間的な香り。比較的高価格帯のテルペン。' },
  { id: 'abx-10', name: 'α-テルピネン', effects: ['抗酸化', '抗菌', '抗炎症'], aroma: 'シトラス、ウッディー、レモン', receptors: [], memo: 'Abstrax: alpha-Terpinene｜5g $18 / 50g $42 / 100g $72｜ティーツリーオイル、カルダモン、マジョラムに含有。強力な抗酸化活性を持つ。γ-テルピネンの構造異性体。' },
  { id: 'abx-11', name: 'α-テルピネオール', effects: ['鎮静', '抗菌', '抗酸化', '抗炎症', '抗寄生虫'], aroma: 'フローラル、シトラス、ライラック', receptors: ['GABA-A'], memo: 'Abstrax: alpha-Terpineol｜5g $15 / 50g $25 / 100g $35｜ライラック、ティーツリー、パインニードルオイルに含有。強い鎮静作用があり運動量を50%減少させたマウス実験あり。リナロールとの相乗効果が報告。' },
  { id: 'abx-12', name: 'β-フェランドレン', effects: ['抗炎症', '抗真菌', '消化促進', '鎮痛'], aroma: 'シトラス、パイン、ミント', receptors: [], memo: 'Abstrax: beta-Phellandrene｜5g $15 / 50g $25 / 100g $35｜ウォーターフェンネル、カナダバルサム、ラベンダーに含有。α-フェランドレンの異性体。グランドファーの精油に高濃度。シトラスとパインのフレッシュな香り。' },
  { id: 'abx-13', name: 'β-ピネン', effects: ['気管支拡張', '抗炎症', '記憶力向上', '抗菌'], aroma: 'パイン、ウッディー、ディル', receptors: ['AChE阻害'], memo: 'Abstrax: beta-Pinene｜5g $18 / 50g $23 / 100g $40｜α-ピネンの構造異性体。バジル、ディル、ローズマリーに含有。α-ピネンと同様のAChE阻害活性。やや甘くウッディーなニュアンスがα体と異なる。' },
  { id: 'abx-14', name: 'カンフェン', effects: ['抗酸化', '抗炎症', '鎮痛', '脂質低下', '心血管保護'], aroma: 'パイン、土っぽい、樟脳', receptors: [], memo: 'Abstrax: Camphene｜5g $25 / 50g $49 / 100g $85｜カンファーツリー、ナツメグ、ジンジャーに含有。コレステロール・トリグリセリド低下作用が動物実験で確認。心血管保護効果への期待が高まるテルペン。' },
  { id: 'abx-15', name: 'カリオフィレンオキシド', effects: ['抗真菌', '抗炎症', '鎮痛', '抗凝固'], aroma: 'スパイシー、ウッディー、ドライ', receptors: ['CB2(弱)'], memo: 'Abstrax: Caryophyllene-Oxide｜5g $25 / 50g $33 / 100g $56｜β-カリオフィレンの酸化物。麻薬探知犬が検出する主要化合物。レモンバーム、ユーカリに含有。β-カリオフィレンより穏やかなCB2親和性。抗真菌活性が特に強い。' },
  { id: 'abx-16', name: 'セドレン', effects: ['鎮静', '抗炎症', '防虫', '抗菌'], aroma: 'ウッディー、甘い、シダーウッド', receptors: [], memo: 'Abstrax: Cedrene｜5g $25 / 50g $65 / 100g $112｜シダーウッド（杉）精油の主要成分。ヒマラヤスギ、ジュニパーに含有。伝統的に防虫剤として使用。ウッディーで温かみのある持続性の高い香り。' },
  { id: 'abx-17', name: 'シトラール', effects: ['抗菌', '抗炎症', '抗真菌', '鎮痛', '抗ウイルス'], aroma: 'シトラス、フローラル、レモン', receptors: ['TRPM8', 'TRPV1'], memo: 'Abstrax: Citral｜5g $18 / 50g $23 / 100g $40｜ゲラニアール+ネラールの混合物。レモングラス、メリッサ（レモンバーム）の主要香気成分。強力な抗菌活性。レモン系フレーバーの重要な構成要素。' },
  { id: 'abx-18', name: 'シトロネロール', effects: ['抗菌', '防虫', '抗炎症', '鎮痙', 'リラクゼーション'], aroma: '甘い、フローラル、ローズ', receptors: [], memo: 'Abstrax: Citronellol｜5g $18 / 50g $32 / 100g $55｜ローズ、ゼラニウムの主要香気成分。天然蚊除け成分として知られる。ゲラニオールの還元体。ローズオイルの主成分で高級香料として使用。' },
  { id: 'abx-19', name: 'd-カンフル', effects: ['鎮痛', '抗炎症', '鬱血除去', '抗菌', '局所刺激'], aroma: '土っぽい、パイン、樟脳、メントール', receptors: ['TRPV1', 'TRPV3', 'TRPA1'], memo: 'Abstrax: d-Camphor｜5g $18 / 50g $29 / 100g $50｜クスノキ由来。タイガーバーム等の外用薬の主成分。TRPV1/V3/A1チャネルを活性化し温冷覚に作用。局所鎮痛・血行促進に広く使用。' },
  { id: 'abx-20', name: 'Δ3-カレン', effects: ['抗炎症', '骨修復促進', '乾燥作用', '記憶力向上'], aroma: '甘い、土っぽい、サイプレス', receptors: [], memo: 'Abstrax: Delta-3-Carene｜5g $25 / 50g $69 / 100g $118｜サイプレス、ジュニパー、パインに含有。骨成長を刺激するという研究報告あり。カンナビスの「ドライマウス」「ドライアイ」効果に関与する可能性が指摘されるテルペン。' },
  { id: 'abx-21', name: 'ファルネセン', effects: ['抗炎症', '抗酸化', '鎮静', '抗菌', '筋弛緩'], aroma: 'シトラス、甘い、グリーンアップル', receptors: [], memo: 'Abstrax: Farnesene｜5g $75 / 50g $218 / 100g $523｜最高価格帯のテルペン。グリーンアップル、カモミール、ジンジャーに含有。セスキテルペンで分子量が大きい。リンゴの表面ワックスの主要成分。GGシリーズの品種で高濃度。' },
  { id: 'abx-22', name: 'フェンキルアルコール', effects: ['抗菌', '抗酸化', '去痰', '鎮静'], aroma: 'スパイシー、土っぽい、カンファー、ボルネオール', receptors: [], memo: 'Abstrax: Fenchyl Alcohol｜5g $20 / 50g $52 / 100g $89｜フェンネル、バジルに含有。ボルネオールの異性体。カンファー系の清涼感のある香り。呼吸器系のサポートに伝統的に使用。' },
  { id: 'abx-23', name: 'γ-テルピネン', effects: ['抗酸化', '抗菌', '抗炎症', '防腐'], aroma: 'シトラス、土っぽい、レモン', receptors: [], memo: 'Abstrax: gamma-Terpinene｜5g $18 / 50g $32 / 100g $55｜ティーツリー、タイム、クミン、コリアンダーに含有。α-テルピネンと共にティーツリーオイルの主要活性成分。特に強い抗酸化活性を持つ。' },
  { id: 'abx-24', name: 'ゲラニオール', effects: ['抗炎症', '抗腫瘍', '抗菌', '神経保護', '抗酸化'], aroma: 'フローラル、甘い、ローズ、ゼラニウム', receptors: ['PPARγ'], memo: 'Abstrax: Geraniol｜5g $18 / 50g $42 / 100g $73｜ローズ、ゼラニウム、シトロネラに含有。天然防虫剤として優秀。PPARγアゴニスト活性で抗腫瘍効果の研究が進む。ネロールのトランス異性体。' },
  { id: 'abx-25', name: 'グアイエン', effects: ['抗炎症', '抗酸化', '抗菌', '鎮静'], aroma: 'ウッディー、スパイシー、バルサム', receptors: [], memo: 'Abstrax: Guaiene｜5g $18 / 50g $41 / 100g $70｜グアイアクウッド（ユソウボク）に含有。パチョリオイルにも存在。ウッディーでスパイシーなベースノート。カンナビスのGelato、GSC系統で検出される。' },
  { id: 'abx-26', name: 'イソボルネオール', effects: ['抗菌', '鎮痛', '抗炎症', '鎮静'], aroma: 'パイン、土っぽい、カンファー', receptors: ['GABA-A'], memo: 'Abstrax: Isoborneol｜5g $18 / 50g $28 / 100g $47｜ボルネオールの異性体。アルテミシア（ヨモギ属）に含有。伝統中医学で「氷片」として使用されたボルネオール系テルペン。抗ウイルス活性の報告もあり。' },
  { id: 'abx-27', name: 'L-メントール', effects: ['鎮痛', '抗炎症', '冷感', '鬱血除去', '制吐'], aroma: 'ミント、甘い、クール', receptors: ['TRPM8', 'κ-オピオイド'], memo: 'Abstrax: L-Menthol｜5g $18 / 50g $26 / 100g $44｜ペパーミントの主要成分。TRPM8冷感受容体のアゴニスト。κ-オピオイド受容体を介した鎮痛作用。経皮吸収促進効果もあり他の成分のデリバリーを助ける。' },
  { id: 'abx-28', name: 'ネロール', effects: ['抗菌', '抗炎症', '鎮静', '抗真菌'], aroma: 'フローラル、甘い、ローズ、シトラス', receptors: [], memo: 'Abstrax: Nerol｜5g $40 / 50g $119 / 100g $205｜ゲラニオールのシス異性体。ネロリ（ビターオレンジ花）油の主成分。レモングラス、ホップにも含有。ゲラニオールより繊細でやや甘い香り。高価格帯。' },
  { id: 'abx-29', name: 'サビネン', effects: ['抗炎症', '抗酸化', '抗菌', '消化促進'], aroma: 'スパイシー、ウッディー、ペッパー、ジュニパー', receptors: [], memo: 'Abstrax: Sabinene｜5g $18 / 50g $41 / 100g $70｜ブラックペッパー、ジュニパー、ナツメグの特徴的な香りの一因。カラヤエッセンシャルオイルに高濃度。スパイシーかつウッディーで複雑な香り。' },
  { id: 'abx-30', name: 'バレンセン', effects: ['抗炎症', '抗アレルギー', '気分向上', '抗菌'], aroma: 'シトラス、フローラル、オレンジ', receptors: [], memo: 'Abstrax: Valencene｜5g $40 / 50g $217 / 100g $371｜バレンシアオレンジから命名。オレンジ特有のフレッシュな香り。セスキテルペンで分子量が大きく持続性が高い。カンナビスのTangie系統で高濃度。ノートケトンの前駆体。高価格帯。' }
];

// カンナビス品種初期データ
const INITIAL_CANNABIS_STRAINS = [
  {
    id: 'pbb-001',
    name: 'Peanut Butter Breath',
    aliases: ['Peanut Butter', 'Peanut Breath', 'PBB'],
    type: 'hybrid',
    breeder: 'ThugPug Genetics',
    lineage: {
      parent1: 'Do-Si-Dos (GSC系統)',
      parent2: 'Mendo Breath (OGKB × Mendo Montage)'
    },
    description: 'Do-Si-DosとMendo Breathの交配による50/50バランスドハイブリッド。ローストピーナッツのようなクリーミーでナッティーなフレーバーが特徴的。バニラ、コーヒー、チョコレートの甘さにシナモンやナツメグのスパイスノートが重なり、アーシーでハーバルなフィニッシュへと移行する。2019年トロントKarma Cupインディカ部門1位。',
    terpenes: [
      { id: '3', name: 'カリオフィレン', effects: ['抗炎症', '鎮痛'], aroma: 'スパイシー、ペッパー', receptors: ['CB2'], ratio: 35, note: 'CB2受容体選択的アゴニスト — カンナビノイド様作用を持つ唯一のテルペン' },
      { id: '2', name: 'リモネン', effects: ['抗不安', '気分向上'], aroma: '柑橘系', receptors: ['5-HT1A', 'A2A'], ratio: 28, note: 'セロトニンとドーパミンの放出を促進' },
      { id: '1', name: 'ミルセン', effects: ['鎮静', '筋弛緩'], aroma: '土っぽい、ムスク', receptors: ['GABA-A', 'TRPV1'], ratio: 18, note: 'BBB通過性を高めカンナビノイド吸収を促進する可能性' },
      { id: '5', name: 'ピネン', effects: ['集中力向上', '記憶力向上'], aroma: '松、森林', receptors: ['AChE阻害'], ratio: 12, note: 'THCによる短期記憶障害を軽減する可能性' },
      { id: '6', name: 'フムレン', effects: ['抗炎症', '食欲抑制'], aroma: '木、土', receptors: ['PPARγ', 'TRPV1'], ratio: 7, note: 'カリオフィレンとアントラージュ効果で相乗作用' }
    ],
    effects: ['リラクゼーション', 'ユーフォリア', 'ボディティングル', '鎮静', '食欲増進', 'ハッピー', '筋弛緩'],
    medicalUses: ['慢性疼痛', 'ストレス', '不眠', 'うつ', '吐き気'],
    sideEffects: ['口渇', '目の乾燥', '高用量でパラノイアの可能性'],
    thcContent: '18-28%',
    cbdContent: '<1%',
    flavorProfile: {
      primary: ['ピーナッツバター', 'ローストナッツ', 'アーシー'],
      secondary: ['バニラ', 'コーヒー', 'チョコレート'],
      finish: ['ハーバル', 'ディーゼル', 'パイン'],
      spice: ['シナモン', 'ナツメグ', 'クローブ']
    },
    vapeFormulation: {
      profileType: 'リラクゼーション＋ムード向上',
      recommendedUse: '夕方〜夜間',
      note: 'Caryophyllene+Limoneneデュアルドミナントにより、ボディリラクゼーションと気分の底上げを両立'
    },
    awards: ['Toronto Karma Cup 2019 - Indica部門 1位'],
    createdAt: '2026/2/19 00:00:00'
  },
  {
    id: 'pm-002',
    name: 'Permanent Marker',
    aliases: ['PM'],
    type: 'hybrid',
    breeder: 'Seed Junky Genetics / Doja Exclusive',
    lineage: { parent1: 'Biscotti', parent2: 'Sherb BX × Jealousy' },
    description: 'Leafly 2023 & High Times 2022のStrain of the Year連続受賞。インディカドミナント(70/30)で、キャンディー・ガス・フローラルの独特なアロマプロファイルが特徴。マジックインキのような強烈でパンジェントな香りが名前の由来。',
    terpenes: [
      { id: '3', name: 'カリオフィレン', effects: ['抗炎症', '鎮痛'], aroma: 'スパイシー、ペッパー', receptors: ['CB2'], ratio: 32, note: 'ペッパリーなキックと抗炎症作用' },
      { id: '2', name: 'リモネン', effects: ['抗不安', '気分向上'], aroma: '柑橘系', receptors: ['5-HT1A'], ratio: 30, note: '気分の高揚とユーフォリアを増強' },
      { id: '1', name: 'ミルセン', effects: ['鎮静', '筋弛緩'], aroma: '土っぽい、ムスク', receptors: ['GABA-A'], ratio: 22, note: 'ボディリラクゼーションと鎮静の深み' },
      { id: '5', name: 'ピネン', effects: ['集中力向上', '記憶力向上'], aroma: '松、森林', receptors: ['AChE阻害'], ratio: 10, note: 'フレッシュなパインのアクセント' },
      { id: '4', name: 'リナロール', effects: ['鎮静', '抗不安'], aroma: 'フローラル、ラベンダー', receptors: ['GABA-A'], ratio: 6, note: 'ソーピーでフローラルなアクセント、一部バッチで顕著' }
    ],
    effects: ['ユーフォリア', 'クリエイティビティ', 'リラクゼーション', '感覚増強', 'ハッピー'],
    medicalUses: ['慢性疼痛', '不安', 'PTSD', '気分障害'],
    sideEffects: ['口渇', '目の乾燥', '初心者はパラノイアの可能性'],
    thcContent: '25-35%',
    cbdContent: '<1%',
    flavorProfile: { primary: ['キャンディー', 'バブルガム', 'ソーピースウィート'], secondary: ['ディーゼル', 'タバコ', 'シャーベット'], finish: ['アーシースパイス', 'フローラル'], spice: ['ペッパー', 'ミント'] },
    vapeFormulation: { profileType: 'クリエイティブ＋リラクゼーション', recommendedUse: '午後〜夜間', note: 'Caryophyllene+Limoneneの高濃度コンビで精神的高揚とボディリラクゼーションを両立。クリーパー型のため効果発現に10-15分' },
    awards: ['Leafly Strain of the Year 2023', 'High Times Strain of the Year 2022'],
    createdAt: '2026/2/19 00:00:00'
  },
  {
    id: 'gc-003',
    name: 'Garlic Cookies',
    aliases: ['GMO', 'GMO Cookies', 'Chem Cookies'],
    type: 'indica',
    breeder: 'Mamiko Seeds',
    lineage: { parent1: 'Chemdawg', parent2: 'Girl Scout Cookies (GSC)' },
    description: 'GMO = Garlic Mushroom Onionの略。ガーリック・マッシュルーム・オニオンの強烈なセイボリーアロマが特徴的なインディカドミナント(90/10)。非常に強力なボディハイとカウチロック効果で知られる夜間向けストレイン。',
    terpenes: [
      { id: '3', name: 'カリオフィレン', effects: ['抗炎症', '鎮痛'], aroma: 'スパイシー、ペッパー', receptors: ['CB2'], ratio: 35, note: 'セイボリーでスパイシーなアロマの主体' },
      { id: '1', name: 'ミルセン', effects: ['鎮静', '筋弛緩'], aroma: '土っぽい、ムスク', receptors: ['GABA-A', 'TRPV1'], ratio: 30, note: '強力なカウチロック効果の主因' },
      { id: '2', name: 'リモネン', effects: ['抗不安', '気分向上'], aroma: '柑橘系', receptors: ['5-HT1A'], ratio: 20, note: 'シトラスのタッチとストレス軽減' },
      { id: '6', name: 'フムレン', effects: ['抗炎症', '食欲抑制'], aroma: '木、土', receptors: ['PPARγ'], ratio: 10, note: 'ウッディーでアーシーなバックノート' },
      { id: '5', name: 'ピネン', effects: ['集中力向上', '記憶力向上'], aroma: '松、森林', receptors: ['AChE阻害'], ratio: 5, note: '微量だがアーシーさに貢献' }
    ],
    effects: ['深いリラクゼーション', 'ユーフォリア', 'カウチロック', '食欲増進', '鎮静'],
    medicalUses: ['慢性疼痛', 'うつ', '不眠', '炎症', '吐き気'],
    sideEffects: ['口渇', '目の乾燥', 'めまい', '強力すぎる鎮静'],
    thcContent: '22-30%',
    cbdContent: '<1%',
    flavorProfile: { primary: ['ガーリック', 'マッシュルーム', 'オニオン'], secondary: ['ディーゼル', 'コーヒー', 'アーシー'], finish: ['スパイシー', 'スカンク'], spice: ['ブラックペッパー', 'クローブ'] },
    vapeFormulation: { profileType: 'ヘビーリラクゼーション＋鎮静', recommendedUse: '夜間・就寝前', note: 'Caryophyllene+Myrceneの強力コンビで最大級のボディリラクゼーション。セイボリー系の独特なフレーバー' },
    awards: [],
    createdAt: '2026/2/19 00:00:00'
  },
  {
    id: 'wr-004',
    name: 'White Runtz',
    aliases: ['White RNTZ'],
    type: 'hybrid',
    breeder: 'Runtz Crew / Cookies Fam',
    lineage: { parent1: 'Gelato', parent2: 'Zkittlez' },
    description: 'Runtzのユニークフェノタイプで、雪のように白いトライコームが名前の由来。2019年Emerald Cup Sun-Grown Flower部門1位、Leafly 2020 Strain of the Year。スウィートキャンディーのフレーバーとバランスの取れたハイが特徴。',
    terpenes: [
      { id: '3', name: 'カリオフィレン', effects: ['抗炎症', '鎮痛'], aroma: 'スパイシー、ペッパー', receptors: ['CB2'], ratio: 30, note: 'スパイシーなアンダートーン' },
      { id: '2', name: 'リモネン', effects: ['抗不安', '気分向上'], aroma: '柑橘系', receptors: ['5-HT1A'], ratio: 28, note: 'ガッシーさとシトラスノート' },
      { id: '4', name: 'リナロール', effects: ['鎮静', '抗不安'], aroma: 'フローラル、ラベンダー', receptors: ['GABA-A'], ratio: 22, note: 'フローラルでラベンダー的、ストレス軽減' },
      { id: '5', name: 'ピネン', effects: ['集中力向上', '記憶力向上'], aroma: '松、森林', receptors: ['AChE阻害'], ratio: 12, note: 'セレブラルでクリエイティブな効果に寄与' },
      { id: '1', name: 'ミルセン', effects: ['鎮静', '筋弛緩'], aroma: '土っぽい、ムスク', receptors: ['GABA-A'], ratio: 8, note: 'アーシーなベースノート' }
    ],
    effects: ['ユーフォリア', 'リラクゼーション', 'ティングリング', 'クリエイティビティ', 'ハッピー'],
    medicalUses: ['慢性疼痛', '不安', 'ストレス', '筋痙攣'],
    sideEffects: ['口渇', '目の乾燥'],
    thcContent: '20-27%',
    cbdContent: '<1%',
    flavorProfile: { primary: ['スウィートキャンディー', 'トロピカルフルーツ', 'クリーミー'], secondary: ['バニラ', 'ベリー', 'シトラス'], finish: ['ディーゼル', 'アーシー'], spice: [] },
    vapeFormulation: { profileType: 'バランスドユーフォリア＋リラクゼーション', recommendedUse: '終日（用量次第）', note: 'Caryophyllene+Limonene+Linaloolのトリプルで甘くクリーミーなデザート系。中程度のTHCで初心者にも扱いやすい' },
    awards: ['Emerald Cup 2019 - Sun-Grown Flower 1位', 'Leafly Strain of the Year 2020'],
    createdAt: '2026/2/19 00:00:00'
  },
  {
    id: 'gp-005',
    name: 'Georgia Pie',
    aliases: ['Sticky Buns'],
    type: 'hybrid',
    breeder: 'Seed Junky Genetics / Cookies',
    lineage: { parent1: 'Gelatti (Biscotti × Gelato)', parent2: 'Kush Mints #11' },
    description: 'サウスジョージアのピーチコブラーにインスパイアされた品種。甘いピーチとベイクドグッズのアロマが特徴的で、マウスウォーターを誘うフレーバー。Cookiesとのコラボレーションで商業化。アフロディジアック効果も報告されている。',
    terpenes: [
      { id: '2', name: 'リモネン', effects: ['抗不安', '気分向上'], aroma: '柑橘系', receptors: ['5-HT1A'], ratio: 30, note: 'ピーチ・シトラスアロマの主体' },
      { id: '3', name: 'カリオフィレン', effects: ['抗炎症', '鎮痛'], aroma: 'スパイシー、ペッパー', receptors: ['CB2'], ratio: 25, note: '抗炎症効果とスパイスノート' },
      { id: '6', name: 'フムレン', effects: ['抗炎症', '食欲抑制'], aroma: '木、土', receptors: ['PPARγ'], ratio: 17, note: 'ウッディーでパイニーなアンダートーン' },
      { id: '4', name: 'リナロール', effects: ['鎮静', '抗不安'], aroma: 'フローラル、ラベンダー', receptors: ['GABA-A'], ratio: 15, note: 'カーミング効果の強化' },
      { id: '1', name: 'ミルセン', effects: ['鎮静', '筋弛緩'], aroma: '土っぽい、ムスク', receptors: ['GABA-A'], ratio: 8, note: 'アーシーなベースとリラクゼーション' },
      { id: '5', name: 'ピネン', effects: ['集中力向上', '記憶力向上'], aroma: '松、森林', receptors: ['AChE阻害'], ratio: 5, note: 'フレッシュパインのアクセント' }
    ],
    effects: ['ユーフォリア', 'リラクゼーション', 'クリエイティビティ', '集中力向上', 'アフロディジアック', '食欲増進'],
    medicalUses: ['ストレス', '不安', 'うつ', '慢性疼痛', '食欲不振'],
    sideEffects: ['口渇', '目の乾燥', 'まれにパラノイア'],
    thcContent: '20-27%',
    cbdContent: '1-3%',
    flavorProfile: { primary: ['ピーチコブラー', 'スウィートフルーツ', 'ベイクドグッズ'], secondary: ['ベリー', 'チェリー', 'パイン'], finish: ['ミント', 'OGクッシュ', 'アーシー'], spice: [] },
    vapeFormulation: { profileType: 'アップリフティング＋ムード向上', recommendedUse: '午後〜夕方', note: 'Limoneneドミナントでピーチ系デザートフレーバー。CBD含有量が比較的高くアントラージュ効果が期待できる' },
    awards: [],
    createdAt: '2026/2/19 00:00:00'
  },
  {
    id: 'gm-006',
    name: 'Grease Monkey',
    aliases: ['Grease Bucket'],
    type: 'hybrid',
    breeder: 'Exotic Genetix',
    lineage: { parent1: 'Gorilla Glue #4 (GG4)', parent2: 'Cookies and Cream' },
    description: 'GG4のスティッキーでヘビーヒッティングな性質とCookies and Creamのクリーミーな甘さを融合。2018 High Times Cannabis Cup Michigan Hybrid Flower部門優勝。ディーゼルとバニラが混ざり合うユニークなフレーバーで、"スニーキー"な効果の発現が特徴。',
    terpenes: [
      { id: '3', name: 'カリオフィレン', effects: ['抗炎症', '鎮痛'], aroma: 'スパイシー、ペッパー', receptors: ['CB2'], ratio: 30, note: '強力な抗炎症作用、スパイシーバックノート' },
      { id: '1', name: 'ミルセン', effects: ['鎮静', '筋弛緩'], aroma: '土っぽい、ムスク', receptors: ['GABA-A', 'TRPV1'], ratio: 28, note: 'カーミングとムードエンハンス' },
      { id: '2', name: 'リモネン', effects: ['抗不安', '気分向上'], aroma: '柑橘系', receptors: ['5-HT1A'], ratio: 18, note: 'シトラスゼストとムード向上' },
      { id: '6', name: 'フムレン', effects: ['抗炎症', '食欲抑制'], aroma: '木、土', receptors: ['PPARγ'], ratio: 14, note: 'ウッディー、パイニーなアンダートーン' },
      { id: '4', name: 'リナロール', effects: ['鎮静', '抗不安'], aroma: 'フローラル、ラベンダー', receptors: ['GABA-A'], ratio: 10, note: 'フローラル・ホッピーなアクセント' }
    ],
    effects: ['深いリラクゼーション', 'ユーフォリア', 'ドリーミー', '食欲増進', '睡眠促進'],
    medicalUses: ['慢性疼痛', '不眠', 'ストレス', '炎症', '頭痛'],
    sideEffects: ['口渇', '目の乾燥', 'パラノイア（過量時）'],
    thcContent: '16-30%',
    cbdContent: '<1%',
    flavorProfile: { primary: ['ディーゼル', 'スカンク', 'バニラクリーム'], secondary: ['スウィートアース', 'クッキー'], finish: ['ガス', 'フローラル'], spice: ['ペッパー'] },
    vapeFormulation: { profileType: 'ヘビーリラクゼーション＋ユーフォリア', recommendedUse: '夕方〜夜間', note: 'Caryophyllene+Myrceneのインディカ寄りプロファイル。GG4由来の強烈なレジン量でVAPEカート向きの高抽出ポテンシャル' },
    awards: ['High Times Cannabis Cup Michigan 2018 - Hybrid Flower'],
    createdAt: '2026/2/19 00:00:00'
  },
  {
    id: 'ld-007',
    name: 'Lemon Dosi',
    aliases: ['Lemon Dosidos'],
    type: 'indica',
    breeder: 'Elev8 Seeds',
    lineage: { parent1: 'Lemon Tree', parent2: 'Do-Si-Dos (Face Off OG × OGKB)' },
    description: 'サザンカリフォルニアのエリートストレインLemon Treeと、OGクッシュ系譜の人気品種Do-Si-Dosの交配。レモンテルペンの爆発的な香りとクッキー系の深みを融合した、テルペンヘビーなインディカドミナントハイブリッド。',
    terpenes: [
      { id: '2', name: 'リモネン', effects: ['抗不安', '気分向上'], aroma: '柑橘系', receptors: ['5-HT1A'], ratio: 35, note: 'Lemon Tree由来の極めて強いレモンテルペン' },
      { id: '3', name: 'カリオフィレン', effects: ['抗炎症', '鎮痛'], aroma: 'スパイシー、ペッパー', receptors: ['CB2'], ratio: 25, note: 'Do-Si-Dos由来のスパイシーノート' },
      { id: '4', name: 'リナロール', effects: ['鎮静', '抗不安'], aroma: 'フローラル、ラベンダー', receptors: ['GABA-A'], ratio: 18, note: 'Do-Si-Dos由来のフローラルアクセント' },
      { id: '1', name: 'ミルセン', effects: ['鎮静', '筋弛緩'], aroma: '土っぽい、ムスク', receptors: ['GABA-A'], ratio: 15, note: 'アーシーベースとカウチロック効果' },
      { id: '5', name: 'ピネン', effects: ['集中力向上', '記憶力向上'], aroma: '松、森林', receptors: ['AChE阻害'], ratio: 7, note: 'フレッシュなハーバルアクセント' }
    ],
    effects: ['リラクゼーション', 'ユーフォリア', 'ボディハイ', 'ハッピー', '鎮静（高用量）'],
    medicalUses: ['ストレス', '不安', 'うつ', '慢性疼痛', '不眠'],
    sideEffects: ['口渇', '目の乾燥'],
    thcContent: '20-28%',
    cbdContent: '<1%',
    flavorProfile: { primary: ['レモン', 'シトラス', 'サワー'], secondary: ['クッキー', 'アーシー', 'スウィート'], finish: ['OGクッシュ', 'ハーバル'], spice: ['ペッパー'] },
    vapeFormulation: { profileType: 'シトラスリフレッシュ＋リラクゼーション', recommendedUse: '午後〜夜間', note: 'Limoneneドミナントで最もレモン感の強いプロファイル。Do-Si-Dos由来のCaryophylleneとLinaloolがリラクゼーションの深みを追加' },
    awards: [],
    createdAt: '2026/2/19 00:00:00'
  },
  {
    id: 'lpc-008',
    name: 'London Pound Cake',
    aliases: ['Pound Cake', 'LPC', 'LPC #75'],
    type: 'indica',
    breeder: 'Cookies Fam',
    lineage: { parent1: 'Sunset Sherbet (GSC × Pink Panties)', parent2: '不明 (インディカドミナント、GSCフェノタイプの可能性)' },
    description: '英国の伝統的パウンドケーキにインスパイアされた品種名。バニラ、バター、レモンティーのデザートライクなフレーバーが特徴。インディカドミナント(70%)でありながらカウチロックは少なく、気分向上とクリエイティビティも報告される。#75フェノタイプが最も有名。',
    terpenes: [
      { id: '1', name: 'ミルセン', effects: ['鎮静', '筋弛緩'], aroma: '土っぽい、ムスク', receptors: ['GABA-A', 'TRPV1'], ratio: 30, note: 'リラクシングで鎮静的な効果の主体' },
      { id: '2', name: 'リモネン', effects: ['抗不安', '気分向上'], aroma: '柑橘系', receptors: ['5-HT1A'], ratio: 28, note: 'レモンシトラスのブライトノート' },
      { id: '3', name: 'カリオフィレン', effects: ['抗炎症', '鎮痛'], aroma: 'スパイシー、ペッパー', receptors: ['CB2'], ratio: 22, note: 'スパイシーなペッパーのデプス' },
      { id: '4', name: 'リナロール', effects: ['鎮静', '抗不安'], aroma: 'フローラル、ラベンダー', receptors: ['GABA-A'], ratio: 12, note: 'フローラルなスウィートネス' },
      { id: '6', name: 'フムレン', effects: ['抗炎症', '食欲抑制'], aroma: '木、土', receptors: ['PPARγ'], ratio: 8, note: 'アーシーでウッディーなフィニッシュ' }
    ],
    effects: ['リラクゼーション', '気分向上', 'スリーピー', 'ティングリング', '食欲増進', 'クリエイティビティ'],
    medicalUses: ['不安', 'うつ', 'PTSD', '慢性疼痛', '不眠', '炎症'],
    sideEffects: ['口渇', '目の乾燥', 'マンチー'],
    thcContent: '20-29%',
    cbdContent: '<1%',
    flavorProfile: { primary: ['バニラケーキ', 'バター', 'レモン'], secondary: ['グレープ', 'ベリー', 'ナッティー'], finish: ['パイン', 'アーシー', 'フューエル'], spice: ['ハーバルスパイス'] },
    vapeFormulation: { profileType: 'デザートリラクゼーション＋ムード向上', recommendedUse: '夕方〜夜間', note: 'Myrcene+Limonene+Caryophylleneのトリプルでデザートライクな甘さ。カウチロック少なめで気分向上もあるバランスドインディカ' },
    awards: [],
    createdAt: '2026/2/19 00:00:00'
  },
  {
    id: 'rb-009',
    name: 'Rainbow Belts',
    aliases: ['Rainbow Belt'],
    type: 'hybrid',
    breeder: 'Archive Seed Bank / Purple City Genetics',
    lineage: { parent1: 'Moonbow (Do-Si-Dos × Zkittlez)', parent2: 'Zkittlez (Grape Ape × Grapefruit)' },
    description: 'Zkittlez系統の直系子孫で、レインボーベルトキャンディーを思わせるスウィートでフルーティーなテルペンプロファイル。Rainbow Belts 2.0、3.0と進化を続けるアーカイブシードバンクのフラッグシップ。ソルベントレスハッシュメーカーに人気のレジン密度。',
    terpenes: [
      { id: '3', name: 'カリオフィレン', effects: ['抗炎症', '鎮痛'], aroma: 'スパイシー、ペッパー', receptors: ['CB2'], ratio: 28, note: 'アーシーなグラウンディング、スパイシーフィニッシュ' },
      { id: '2', name: 'リモネン', effects: ['抗不安', '気分向上'], aroma: '柑橘系', receptors: ['5-HT1A'], ratio: 27, note: 'ブライトなキャンディーシトラス、ライムゼストポップ' },
      { id: '4', name: 'リナロール', effects: ['鎮静', '抗不安'], aroma: 'フローラル、ラベンダー', receptors: ['GABA-A'], ratio: 20, note: 'フローラルでキャンディーライクなスウィートネス' },
      { id: '1', name: 'ミルセン', effects: ['鎮静', '筋弛緩'], aroma: '土っぽい、ムスク', receptors: ['GABA-A'], ratio: 15, note: 'リラクシングなアーシーベース' },
      { id: '5', name: 'ピネン', effects: ['集中力向上', '記憶力向上'], aroma: '松、森林', receptors: ['AChE阻害'], ratio: 10, note: 'フレッシュなハーバルアクセント' }
    ],
    effects: ['ユーフォリア', 'リラクゼーション', 'ハッピー', 'クリエイティビティ', '鎮静（後半）'],
    medicalUses: ['不眠', '慢性疼痛', 'ストレス', 'うつ', '食欲不振'],
    sideEffects: ['口渇', '目の乾燥', 'マンチー'],
    thcContent: '18-28%',
    cbdContent: '<0.5%',
    flavorProfile: { primary: ['スウィートキャンディー', 'トロピカルフルーツ', 'ライムスキトルズ'], secondary: ['サワーフルーツ', 'ベリー', 'グレープ'], finish: ['ダンク', 'クッシュ', 'ベイクドグッズ'], spice: [] },
    vapeFormulation: { profileType: 'キャンディーユーフォリア＋イブニングリラクゼーション', recommendedUse: '夕方〜夜間', note: 'Limonene+CaryophylleneのデュアルアンカーにフローラルなLinaloolが加わるキャンディー系。テルペン密度が高くフレーバーがラストまで持続' },
    awards: [],
    createdAt: '2026/2/19 00:00:00'
  }
];

// 成分インデックス初期データ
const INITIAL_COMPONENTS = [
  { id: '1', name: 'アルカロイド', type: 'phDependent', description: 'pH依存性の窒素含有化合物。多くの薬理活性を持つ。', examples: ['カフェイン', 'モルヒネ', 'ニコチン'] },
  { id: '2', name: 'アントシアニン', type: 'hydrophilic', description: '水溶性の色素。抗酸化作用が強い。', examples: ['シアニジン', 'デルフィニジン'] },
  { id: '3', name: 'カテキン', type: 'hydrophilic', description: 'ポリフェノールの一種。抗酸化、抗菌作用。', examples: ['エピガロカテキンガレート (EGCG)'] },
  { id: '4', name: 'サポニン', type: 'hydrophilic', description: '界面活性作用を持つ配糖体。免疫調節作用。', examples: ['ギンセノサイド', 'グリチルリチン'] },
  { id: '5', name: 'タンニン', type: 'hydrophilic', description: '収れん作用を持つポリフェノール。', examples: ['没食子酸', 'エラグ酸'] },
  { id: '6', name: 'テルペン', type: 'lipophilic', description: '疎水性の炭化水素。香り成分の主体。', examples: ['リモネン', 'ピネン', 'ミルセン'] },
  { id: '7', name: 'フラボノイド', type: 'hydrophilic', description: 'ポリフェノールの一種。抗酸化、抗炎症作用。', examples: ['ケルセチン', 'ルテオリン', 'アピゲニン'] },
  { id: '8', name: '有機酸', type: 'phDependent', description: 'pH依存性の酸性化合物。代謝調節作用。', examples: ['クエン酸', 'リンゴ酸', 'コハク酸'] }
];

// 妖精コンポーネント - 友達の顔が画面を飛び回る！
const Fairy = () => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [velocity, setVelocity] = useState({ x: 3, y: 2.5 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVelX = velocity.x;
        let newVelY = velocity.y;

        // 画面端で跳ね返る
        if (newX <= 0 || newX >= window.innerWidth - 100) {
          newVelX = -velocity.x;
          newX = newX <= 0 ? 0 : window.innerWidth - 100;
        }
        if (newY <= 0 || newY >= window.innerHeight - 100) {
          newVelY = -velocity.y;
          newY = newY <= 0 ? 0 : window.innerHeight - 100;
        }

        setVelocity({ x: newVelX, y: newVelY });
        return { x: newX, y: newY };
      });

      // ゆっくり回転
      setRotation(prev => (prev + 1) % 360);
    }, 16);

    return () => clearInterval(interval);
  }, [velocity]);

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="relative">
        {/* 外側の輝きエフェクト */}
        <div className="absolute -inset-8 animate-ping opacity-30">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300"></div>
        </div>
        
        {/* キラキラ星 */}
        <div className="absolute -top-8 -left-8 text-5xl animate-pulse" style={{ animationDelay: '0s' }}>✨</div>
        <div className="absolute -top-8 -right-8 text-4xl animate-pulse" style={{ animationDelay: '0.3s' }}>⭐</div>
        <div className="absolute -bottom-8 -left-8 text-4xl animate-pulse" style={{ animationDelay: '0.6s' }}>💫</div>
        <div className="absolute -bottom-8 -right-8 text-5xl animate-pulse" style={{ animationDelay: '0.9s' }}>✨</div>
        
        {/* 友達の顔 - 回転と浮遊アニメーション */}
        <div 
          className="relative"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.1s linear'
          }}
        >
          <img
            src="fairy.jpg"
            alt="妖精さん"
            className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-2xl animate-bounce"
            style={{
              filter: 'brightness(1.3) contrast(1.2) saturate(1.2)',
              boxShadow: '0 0 40px rgba(253, 224, 71, 0.9), 0 0 80px rgba(236, 72, 153, 0.5)'
            }}
          />
        </div>
        
        {/* 虹色の光の軌跡 */}
        <div className="absolute inset-0 -z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 opacity-60 blur-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// SettingsModal - APIキー設定（AI プロバイダー選択対応）
const SettingsModal = ({ apiKey, geminiApiKey, aiProvider, onClose, onSave, onSaveGemini, onSaveAiProvider }) => {
  const [inputKey, setInputKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(aiProvider || 'claude');

  // 初期化: モーダルを開いた時に現在のプロバイダーのキーを設定
  useEffect(() => {
    console.log('🔧 SettingsModal initialized');
    console.log('  aiProvider:', aiProvider);
    console.log('  selectedProvider:', selectedProvider);
    console.log('  apiKey:', apiKey ? `${apiKey.substring(0, 15)}...` : 'empty');
    console.log('  geminiApiKey:', geminiApiKey ? `${geminiApiKey.substring(0, 15)}...` : 'empty');
    
    if (selectedProvider === 'claude') {
      setInputKey(apiKey || '');
      console.log('  → Setting Claude key');
    } else {
      setInputKey(geminiApiKey || '');
      console.log('  → Setting Gemini key');
    }
  }, []); // 空の依存配列で初回のみ実行

  // プロバイダー変更時にキーを切り替え
  useEffect(() => {
    console.log('🔄 Provider changed to:', selectedProvider);
    if (selectedProvider === 'claude') {
      setInputKey(apiKey || '');
      console.log('  → Switched to Claude key:', apiKey ? `${apiKey.substring(0, 15)}...` : 'empty');
    } else {
      setInputKey(geminiApiKey || '');
      console.log('  → Switched to Gemini key:', geminiApiKey ? `${geminiApiKey.substring(0, 15)}...` : 'empty');
    }
  }, [selectedProvider]); // selectedProviderの変更時のみ実行

  const handleSave = async () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💾 handleSave called');
    console.log('  selectedProvider:', selectedProvider);
    console.log('  selectedProvider type:', typeof selectedProvider);
    console.log('  selectedProvider === "claude":', selectedProvider === 'claude');
    console.log('  selectedProvider === "gemini":', selectedProvider === 'gemini');
    console.log('  inputKey:', inputKey ? `${inputKey.substring(0, 15)}...` : 'empty');
    
    if (inputKey.trim()) {
      if (selectedProvider === 'claude') {
        console.log('  ✅ Condition TRUE: selectedProvider === "claude"');
        console.log('  → Calling onSave (Claude)');
        await onSave(inputKey.trim());
      } else if (selectedProvider === 'gemini') {
        console.log('  ✅ Condition TRUE: selectedProvider === "gemini"');
        console.log('  → Calling onSaveGemini (Gemini)');
        await onSaveGemini(inputKey.trim());
      } else {
        console.log('  ❌ Unknown provider:', selectedProvider);
      }
      
      console.log('  → Calling onSaveAiProvider');
      await onSaveAiProvider(selectedProvider);
      
      console.log('  → Closing modal in 100ms');
      // 通知が表示されるまで少し待つ
      setTimeout(() => {
        onClose();
      }, 100);
    } else {
      console.log('  ⚠️ Empty key, not saving');
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━');
  };

  const handleProviderChange = (provider) => {
    console.log('🔄 handleProviderChange called with:', provider);
    setSelectedProvider(provider);
    console.log('  → setSelectedProvider called');
  };

  const providerInfo = {
    claude: {
      name: 'Claude',
      icon: '🧠',
      url: 'https://console.anthropic.com/',
      keyPrefix: 'sk-ant-api03-'
    },
    gemini: {
      name: 'Gemini',
      icon: '✨',
      url: 'https://aistudio.google.com/apikey',
      keyPrefix: 'AIza'
    }
  };

  const currentProvider = providerInfo[selectedProvider];
  const currentApiKey = selectedProvider === 'claude' ? apiKey : geminiApiKey;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="glass-panel rounded-3xl max-w-2xl w-full neon-border">
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-5 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-3xl font-bold">⚙️ 設定</h2>
          <button onClick={onClose} className="text-white hover:text-yellow-300">
            <Icons.X size={28} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* AI プロバイダー選択 */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">🤖</span>
              <label className="text-xl font-bold text-yellow-300">AI プロバイダー選択</label>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => handleProviderChange('claude')}
                className={`flex-1 p-4 rounded-xl font-bold transition-all ${
                  selectedProvider === 'claude'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-yellow-300'
                    : 'glass-panel text-purple-300 border-2 border-purple-500'
                }`}
              >
                <div className="text-3xl mb-2">🧠</div>
                <div>Claude</div>
              </button>
              <button
                onClick={() => handleProviderChange('gemini')}
                className={`flex-1 p-4 rounded-xl font-bold transition-all ${
                  selectedProvider === 'gemini'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-2 border-yellow-300'
                    : 'glass-panel text-blue-300 border-2 border-blue-500'
                }`}
              >
                <div className="text-3xl mb-2">✨</div>
                <div>Gemini</div>
              </button>
            </div>
          </div>

          {/* APIキー設定 */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Icons.Key />
              <label className="text-xl font-bold text-yellow-300">
                {currentProvider.name} APIキー
              </label>
            </div>
            
            <div className="glass-panel rounded-xl p-4 mb-4 border border-cyan-500">
              <div className="flex items-start space-x-2 mb-2">
                <span className="text-2xl">💡</span>
                <div className="flex-1 text-sm text-cyan-300">
                  <p className="font-bold mb-2">{currentProvider.name} 相談機能を使用するにはAPIキーが必要です</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>
                      <a 
                        href={currentProvider.url}
                        target="_blank" 
                        className="text-yellow-300 hover:text-yellow-400 underline"
                      >
                        {currentProvider.name} API Console
                      </a>
                      {' '}でアカウント作成
                    </li>
                    <li>API Keysセクションで新しいキーを作成</li>
                    <li>キーをコピーして下記に貼り付け</li>
                    <li>保存すると、ローカルに安全に保存されます</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder={`${currentProvider.keyPrefix}...`}
                className="psychedelic-input w-full px-4 py-3 rounded-lg pr-24"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-purple-900 bg-opacity-50 text-purple-300 rounded text-sm font-bold hover:bg-opacity-70"
              >
                {showKey ? '隠す' : '表示'}
              </button>
            </div>

            {currentApiKey && (
              <p className="text-green-400 text-sm mt-2 flex items-center space-x-2">
                <Icons.Check />
                <span>{currentProvider.name} APIキーが設定されています ✓</span>
              </p>
            )}
          </div>

          {/* 使用料金の注意 */}
          <div className="glass-panel rounded-xl p-4 border border-yellow-500">
            <div className="flex items-start space-x-2">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1 text-sm text-yellow-300">
                <p className="font-bold mb-1">料金について</p>
                <p className="text-xs">
                  {selectedProvider === 'claude' ? (
                    <>
                      Claude API（Sonnet 4）の使用には料金がかかります。
                      1回の相談あたり約$0.015（約2円）程度です。
                    </>
                  ) : (
                    <>
                      Gemini API（Flash 1.5）には無料枠があります。
                      無料枠を超えると料金が発生します。
                    </>
                  )}
                  <a 
                    href={selectedProvider === 'claude' ? 'https://www.anthropic.com/pricing' : 'https://ai.google.dev/pricing'}
                    target="_blank" 
                    className="text-cyan-300 hover:text-cyan-400 underline ml-1"
                  >
                    料金詳細
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* 保存ボタン */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 glass-panel text-pink-300 rounded-xl border-2 border-pink-500 font-bold text-lg"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              disabled={!inputKey.trim()}
              className="flex-1 px-6 py-4 gradient-button rounded-xl font-bold text-white text-lg disabled:opacity-50"
            >
              💾 保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// メインアプリコンポーネント
const JivakaApp = () => {
  console.log('📱 JivakaApp component rendering...');
  const [herbs, setHerbs] = useState([]);
  const [activeTab, setActiveTab] = useState('database');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedHerbs, setSelectedHerbs] = useState([]);
  const [blendHistory, setBlendHistory] = useState([]);
  const [vapeHistory, setVapeHistory] = useState([]);
  const [terpenes, setTerpenes] = useState([]);
  const [terpeneProfiles, setTerpeneProfiles] = useState([]);
  const [cannabisStrains, setCannabisStrains] = useState([]);
  const [components, setComponents] = useState([]);
  const [standardEffects, setStandardEffects] = useState({ internal: [], topical: [] });
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHerb, setEditingHerb] = useState(null);
  const [showTerpeneManager, setShowTerpeneManager] = useState(false);
  const [showComponentManager, setShowComponentManager] = useState(false);
  const [showStandardEffectsManager, setShowStandardEffectsManager] = useState(false);
  const [showCannabisStrainManager, setShowCannabisStrainManager] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminSettings, setAdminSettings] = useState({
    showCannabisStrains: true,
    showStandardEffects: true,
    showAddHerb: true,
    herbEditLocked: false
  });
  const [showFairy, setShowFairy] = useState(false);
  const [aiProvider, setAiProvider] = useState('claude'); // 'claude' or 'gemini'
  const [syncStatus, setSyncStatus] = useState('checking'); // 'checking','synced','syncing','signed-out','local-only','error','offline'
  const [notification, setNotification] = useState(null);

  // 同期ステータスを定期的にチェック
  useEffect(() => {
    const updateSyncStatus = () => {
      if (window.jivakaSync?.isAvailable()) {
        setSyncStatus(window.jivakaSync.getStatus());
      } else {
        setSyncStatus('local-only');
      }
    };
    updateSyncStatus();
    const interval = setInterval(updateSyncStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  // 同期ボタンハンドラー
  const handleSyncButton = async () => {
    if (!window.jivakaSync) {
      showNotification('⚠️ Firebase同期が設定されていません', 'error');
      return;
    }
    if (!window.jivakaSync.isAvailable()) {
      showNotification('⚠️ firebase-config.js を設定してください', 'error');
      return;
    }
    if (!window.jivakaSync.isSignedIn()) {
      showNotification('🔑 Googleアカウントにログインします...', 'success');
      await window.jivakaSync.signIn();
      return;
    }

    // 同期実行
    setSyncStatus('syncing');
    showNotification('🔄 同期中...', 'success');
    const result = await window.jivakaSync.triggerSync();
    if (result.success) {
      setSyncStatus('synced');
      showNotification('✅ 同期完了！データをリロードします', 'success');
      // データリロード
      setTimeout(() => loadAllData(), 500);
    } else {
      setSyncStatus('error');
      showNotification(`❌ 同期失敗: ${result.reason}`, 'error');
    }
  };
  const [dataPath, setDataPath] = useState('');
  const [apiKey, setApiKey] = useState(''); // Claude API key
  const [geminiApiKey, setGeminiApiKey] = useState(''); // Gemini API key
  useEffect(() => {
    loadAllData();
    loadDataPath();
    loadApiKey();
    loadGeminiApiKey();
    loadAdminPassword();
    loadAiProvider();
    loadAdminSettings();
  }, []);

  const loadAdminSettings = async () => {
    try {
      const settings = await window.electronAPI.getAdminSettings();
      setAdminSettings(settings);
    } catch (error) {
      console.error('管理者設定読み込みエラー:', error);
    }
  };

  const saveAdminSettings = async (newSettings) => {
    try {
      await window.electronAPI.saveAdminSettings(newSettings);
      setAdminSettings(newSettings);
      showNotification('✅ 管理者設定を保存しました', 'success');
    } catch (error) {
      console.error('管理者設定保存エラー:', error);
      showNotification('管理者設定の保存に失敗しました', 'error');
    }
  };

  const loadApiKey = async () => {
    try {
      console.log('📥 Loading Claude API key...');
      const savedKey = await window.electronAPI.getApiKey();
      console.log('  Loaded:', savedKey ? `${savedKey.substring(0, 15)}...` : 'empty');
      if (savedKey) {
        setApiKey(savedKey);
      }
    } catch (error) {
      console.error('❌ APIキー読み込みエラー:', error);
    }
  };

  const saveApiKey = async (key) => {
    try {
      console.log('💾 Saving Claude API key:', key ? `${key.substring(0, 15)}...` : 'empty');
      await window.electronAPI.saveApiKey(key);
      setApiKey(key);
      showNotification('✅ Claude APIキーを保存しました', 'success');
      console.log('✅ Claude API key saved successfully');
    } catch (error) {
      console.error('❌ APIキー保存エラー:', error);
      showNotification('❌ APIキーの保存に失敗しました', 'error');
    }
  };

  const loadGeminiApiKey = async () => {
    try {
      console.log('📥 Loading Gemini API key...');
      const savedKey = await window.electronAPI.getGeminiApiKey();
      console.log('  Loaded:', savedKey ? `${savedKey.substring(0, 15)}...` : 'empty');
      if (savedKey) {
        setGeminiApiKey(savedKey);
      }
    } catch (error) {
      console.error('❌ Gemini APIキー読み込みエラー:', error);
    }
  };

  const saveGeminiApiKey = async (key) => {
    try {
      console.log('💾 Saving Gemini API key:', key ? `${key.substring(0, 15)}...` : 'empty');
      await window.electronAPI.saveGeminiApiKey(key);
      setGeminiApiKey(key);
      showNotification('✅ Gemini APIキーを保存しました', 'success');
      console.log('✅ Gemini API key saved successfully');
    } catch (error) {
      console.error('❌ Gemini APIキー保存エラー:', error);
      showNotification('❌ Gemini APIキーの保存に失敗しました', 'error');
    }
  };

  const loadAdminPassword = async () => {
    try {
      const savedPassword = await window.electronAPI.getAdminPassword();
      if (savedPassword) {
        setAdminPassword(savedPassword);
      }
    } catch (error) {
      console.error('管理者パスワード読み込みエラー:', error);
    }
  };

  const saveAdminPassword = async (password) => {
    try {
      await window.electronAPI.saveAdminPassword(password);
      setAdminPassword(password);
      showNotification('管理者パスワードを保存しました 🔐');
    } catch (error) {
      console.error('管理者パスワード保存エラー:', error);
      showNotification('管理者パスワードの保存に失敗しました', 'error');
    }
  };

  const loadAiProvider = async () => {
    try {
      const savedProvider = await window.electronAPI.getAiProvider();
      if (savedProvider) {
        setAiProvider(savedProvider);
      }
    } catch (error) {
      console.error('AIプロバイダー読み込みエラー:', error);
    }
  };

  const saveAiProvider = async (provider) => {
    try {
      console.log('🤖 Saving AI provider:', provider);
      await window.electronAPI.saveAiProvider(provider);
      setAiProvider(provider);
      console.log('✅ AI provider saved successfully');
      // 通知はAPIキー保存時に出すので、ここでは出さない
    } catch (error) {
      console.error('❌ AIプロバイダー保存エラー:', error);
      showNotification('AIプロバイダーの保存に失敗しました', 'error');
    }
  };

  const loadDataPath = async () => {
    const path = await window.electronAPI.getDataPath();
    setDataPath(path);
  };

  const loadAllData = async () => {
    console.log('📂 Loading all data...');
    try {
      console.log('Fetching herbs...');
      const loadedHerbs = await window.electronAPI.getHerbs();
      console.log('Loaded herbs:', loadedHerbs.length);
      const loadedBlendHistory = await window.electronAPI.getBlendHistory();
      const loadedVapeHistory = await window.electronAPI.getVapeHistory();
      const loadedTerpenes = await window.electronAPI.getTerpenes();
      const loadedTerpeneProfiles = await window.electronAPI.getTerpeneProfiles();
      const loadedCannabisStrains = await window.electronAPI.getCannabisStrains();
      const loadedComponents = await window.electronAPI.getComponents();
      const loadedStandardEffects = await window.electronAPI.getStandardEffects();
      
      if (loadedHerbs.length === 0) {
        console.log('No herbs found, initializing with INITIAL_HERBS');
        await window.electronAPI.saveHerbs(INITIAL_HERBS);
        setHerbs(INITIAL_HERBS);
        console.log('✅ Herbs initialized:', INITIAL_HERBS.length);
      } else {
        // 既存データを新しい構造に自動変換（phDependent、receptors、topicalEffects、comment、image、originフィールドを追加）
        const migratedHerbs = loadedHerbs.map(herb => ({
          ...herb,
          origin: herb.origin || '',
          image: herb.image || null,
          comment: herb.comment || '',
          topicalEffects: herb.topicalEffects || [],
          components: {
            hydrophilic: herb.components?.hydrophilic || [],
            lipophilic: herb.components?.lipophilic || [],
            phDependent: herb.components?.phDependent || []
          },
          receptors: {
            hydrophilic: herb.receptors?.hydrophilic || [],
            lipophilic: herb.receptors?.lipophilic || [],
            phDependent: herb.receptors?.phDependent || []
          }
        }));
        
        // 変換が必要だった場合のみ保存
        const needsMigration = loadedHerbs.some(herb => !herb.components?.phDependent || !herb.receptors || !herb.topicalEffects || herb.comment === undefined || herb.image === undefined || herb.origin === undefined);
        if (needsMigration) {
          await window.electronAPI.saveHerbs(migratedHerbs);
          console.log('データを新しい構造に自動変換しました（受容体情報・外用効果・コメント欄・画像・原産国を追加）');
        }
        
        setHerbs(migratedHerbs);
      }
      
      if (loadedTerpenes.length === 0) {
        await window.electronAPI.saveTerpenes(INITIAL_TERPENES);
        setTerpenes(INITIAL_TERPENES);
      } else {
        // 既存データにAbstraxテルペンをマージ（新規追加＋既存の情報リッチ化）
        const existingIds = loadedTerpenes.map(t => t.id);
        const newTerpenes = INITIAL_TERPENES.filter(t => !existingIds.includes(t.id));
        
        // 既存テルペンの情報を更新（memo/effects/receptorsが空の場合のみ上書き）
        const updatedExisting = loadedTerpenes.map(existing => {
          const initial = INITIAL_TERPENES.find(t => t.id === existing.id);
          if (initial) {
            return {
              ...existing,
              memo: existing.memo || initial.memo || '',
              effects: (existing.effects && existing.effects.length > 0) ? existing.effects : initial.effects,
              receptors: (existing.receptors && existing.receptors.length > 0) ? existing.receptors : initial.receptors,
              aroma: existing.aroma || initial.aroma || '',
              name: existing.name || initial.name
            };
          }
          return { ...existing, memo: existing.memo || '' };
        });
        
        if (newTerpenes.length > 0 || updatedExisting.some((t, i) => JSON.stringify(t) !== JSON.stringify(loadedTerpenes[i]))) {
          const mergedTerpenes = [...updatedExisting, ...newTerpenes];
          await window.electronAPI.saveTerpenes(mergedTerpenes);
          setTerpenes(mergedTerpenes);
          console.log(`✅ テルペンデータ更新: ${newTerpenes.length}件追加, 既存${updatedExisting.length}件更新確認`);
        } else {
          setTerpenes(loadedTerpenes);
        }
      }
      
      if (loadedComponents.length === 0) {
        await window.electronAPI.saveComponents(INITIAL_COMPONENTS);
        setComponents(INITIAL_COMPONENTS);
      } else {
        setComponents(loadedComponents);
      }
      
      // 標準効能リストの初期化
      if (!loadedStandardEffects.internal || loadedStandardEffects.internal.length === 0) {
        const initialStandardEffects = {
          internal: STANDARD_EFFECTS,
          topical: STANDARD_TOPICAL_EFFECTS
        };
        await window.electronAPI.saveStandardEffects(initialStandardEffects);
        setStandardEffects(initialStandardEffects);
      } else {
        setStandardEffects(loadedStandardEffects);
      }
      
      setBlendHistory(loadedBlendHistory);
      setVapeHistory(loadedVapeHistory);
      setTerpeneProfiles(loadedTerpeneProfiles);
      
      // カンナビス品種の初期化
      if (!loadedCannabisStrains || loadedCannabisStrains.length === 0) {
        await window.electronAPI.saveCannabisStrains(INITIAL_CANNABIS_STRAINS);
        setCannabisStrains(INITIAL_CANNABIS_STRAINS);
        console.log('✅ Cannabis strains initialized:', INITIAL_CANNABIS_STRAINS.length);
      } else {
        setCannabisStrains(loadedCannabisStrains);
      }
      console.log('✅ All data loaded successfully');
    } catch (error) {
      console.error('❌ データ読み込みエラー:', error);
      showNotification('データの読み込みに失敗しました', 'error');
    }
  };

  const saveHerbs = async (updatedHerbs) => {
    try {
      await window.electronAPI.saveHerbs(updatedHerbs);
      setHerbs(updatedHerbs);
    } catch (error) {
      console.error('データ保存エラー:', error);
      showNotification('データの保存に失敗しました', 'error');
    }
  };

  const saveTerpenes = async (updatedTerpenes) => {
    try {
      await window.electronAPI.saveTerpenes(updatedTerpenes);
      setTerpenes(updatedTerpenes);
    } catch (error) {
      console.error('テルペン保存エラー:', error);
      showNotification('テルペンの保存に失敗しました', 'error');
    }
  };

  const saveComponents = async (updatedComponents) => {
    try {
      await window.electronAPI.saveComponents(updatedComponents);
      setComponents(updatedComponents);
      showNotification('成分インデックスを保存しました 📚');
    } catch (error) {
      console.error('成分保存エラー:', error);
      showNotification('成分インデックスの保存に失敗しました', 'error');
    }
  };

  const saveStandardEffects = async (updatedEffects) => {
    try {
      await window.electronAPI.saveStandardEffects(updatedEffects);
      setStandardEffects(updatedEffects);
    } catch (error) {
      console.error('標準効能保存エラー:', error);
      showNotification('標準効能リストの保存に失敗しました', 'error');
    }
  };

  const saveCannabisStrains = async (updatedStrains) => {
    try {
      await window.electronAPI.saveCannabisStrains(updatedStrains);
      setCannabisStrains(updatedStrains);
    } catch (error) {
      console.error('カンナビス品種保存エラー:', error);
      showNotification('カンナビス品種の保存に失敗しました', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const addHerb = async (herbData) => {
    const duplicate = herbs.find(h => h.scientificName.toLowerCase() === herbData.scientificName.toLowerCase());
    if (duplicate) {
      showNotification(`学名 "${herbData.scientificName}" はすでに登録されています`, 'error');
      return false;
    }
    const newHerb = { ...herbData, id: Date.now().toString() };
    await saveHerbs([...herbs, newHerb]);
    showNotification('薬草を追加しました ✨');
    return true;
  };

  const updateHerb = async (herbId, herbData) => {
    await saveHerbs(herbs.map(h => h.id === herbId ? { ...herbData, id: herbId } : h));
    showNotification('薬草を更新しました 🌟');
  };

  const deleteHerb = async (herbId) => {
    if (confirm('この薬草を削除しますか?')) {
      await saveHerbs(herbs.filter(h => h.id !== herbId));
      showNotification('薬草を削除しました');
    }
  };

  const searchByEffect = () => {
    if (!searchKeyword.trim()) return herbs;
    return herbs.filter(herb => herb.effects.some(effect => effect.includes(searchKeyword)));
  };

  const saveBlend = async (blendData) => {
    if (selectedHerbs.length === 0) {
      showNotification('薬草を選択してください', 'error');
      return;
    }
    const blend = {
      id: Date.now().toString(),
      herbs: selectedHerbs,
      date: new Date().toLocaleString('ja-JP'),
      effects: [...new Set(selectedHerbs.flatMap(h => h.effects))],
      bodyParts: [...new Set(selectedHerbs.flatMap(h => h.bodyParts))],
      ...blendData
    };
    const updatedHistory = [blend, ...blendHistory];
    await window.electronAPI.saveBlendHistory(updatedHistory);
    setBlendHistory(updatedHistory);
    showNotification('調合を保存しました 🌿✨');
    setSelectedHerbs([]);
  };

  const saveVapeBlend = async (vapeData) => {
    if (selectedHerbs.length === 0 && (!vapeData.terpeneProfile || !vapeData.customTerpenes || vapeData.customTerpenes.length === 0)) {
      showNotification('薬草またはテルペンを選択してください', 'error');
      return;
    }
    const vapeBlend = {
      id: Date.now().toString(),
      herbs: selectedHerbs,
      date: new Date().toLocaleString('ja-JP'),
      lipophilicComponents: selectedHerbs.flatMap(h => h.components?.lipophilic || []),
      effects: [...new Set(selectedHerbs.flatMap(h => h.effects))],
      ...vapeData
    };
    const updatedHistory = [vapeBlend, ...vapeHistory];
    await window.electronAPI.saveVapeHistory(updatedHistory);
    setVapeHistory(updatedHistory);
    showNotification('VAPE調合を保存しました 💨✨');
    setSelectedHerbs([]);
  };

  const exportData = async () => {
    try {
      const result = await window.electronAPI.exportData();
      if (result.success) {
        showNotification(`データをバックアップしました 💾`);
      } else {
        showNotification('バックアップに失敗しました', 'error');
      }
    } catch (error) {
      showNotification('バックアップに失敗しました', 'error');
    }
  };

  return (
    <div className="min-h-screen mandala-bg lotus-pattern">
      <header className="glass-panel border-b-4 border-pink-500 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-6xl">🌿</div>
              <div>
                <h1 className="text-5xl font-bold psychedelic-text">Jīvaka</h1>
                <p className="mt-1 text-yellow-300 text-sm font-semibold tracking-wide">
                  ~ Ancient Wisdom × Psychedelic Vision ~
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFairy(!showFairy)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-lg transition-all font-bold ${
                  showFairy 
                    ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white animate-pulse' 
                    : 'gradient-button text-white'
                }`}
                title={showFairy ? '妖精を帰す' : '妖精を呼ぶ'}
              >
                <span className="text-2xl">{showFairy ? '🧚‍♂️' : '🌟'}</span>
                <span>{showFairy ? '帰ってもらう' : '来てもらう'}</span>
              </button>
              <button
                onClick={() => setShowAdminLogin(true)}
                className="gradient-button flex items-center space-x-2 px-5 py-3 rounded-lg transition-all text-white font-bold"
                title="管理者メニュー"
              >
                <Icons.Key />
                <span>管理者</span>
              </button>
              <button
                onClick={handleSyncButton}
                disabled={syncStatus === 'syncing'}
                className={`flex items-center space-x-2 px-5 py-3 rounded-lg transition-all font-bold ${
                  syncStatus === 'syncing'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-pulse cursor-wait'
                    : syncStatus === 'synced'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500'
                    : syncStatus === 'signed-out' || syncStatus === 'local-only'
                    ? 'gradient-button text-white'
                    : syncStatus === 'error'
                    ? 'bg-gradient-to-r from-red-500 to-red-700 text-white'
                    : 'gradient-button text-white'
                }`}
                title={
                  syncStatus === 'synced' ? `同期済み (${window.jivakaSync?.getUserName() || ''})` :
                  syncStatus === 'syncing' ? '同期中...' :
                  syncStatus === 'signed-out' ? 'ログインして同期を開始' :
                  syncStatus === 'local-only' ? 'Firebase未設定' :
                  syncStatus === 'error' ? '同期エラー - タップでリトライ' :
                  syncStatus === 'offline' ? 'オフライン' :
                  '同期'
                }
              >
                {syncStatus === 'syncing' ? (
                  <span className="animate-spin"><Icons.RefreshCw /></span>
                ) : syncStatus === 'local-only' || syncStatus === 'offline' ? (
                  <Icons.CloudOff />
                ) : (
                  <Icons.CloudSync />
                )}
                <span>{
                  syncStatus === 'syncing' ? '同期中' :
                  syncStatus === 'synced' ? '同期する' :
                  syncStatus === 'signed-out' ? 'ログイン' :
                  syncStatus === 'local-only' ? '未設定' :
                  syncStatus === 'error' ? 'リトライ' :
                  syncStatus === 'offline' ? 'オフライン' :
                  '同期する'
                }</span>
                {syncStatus === 'synced' && (
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '0',
                    background: '#2ed573', display: 'inline-block',
                    border: '1px solid rgba(255,255,255,0.5)',
                    boxShadow: '0 0 6px #2ed573'
                  }} />
                )}
              </button>
              <button
                onClick={exportData}
                className="gradient-button flex items-center space-x-2 px-5 py-3 rounded-lg transition-all text-white font-bold"
                title="データをバックアップ"
              >
                <Icons.Download />
                <span>バックアップ</span>
              </button>
              <button
                onClick={() => showNotification(`💾 ${dataPath}`, 'success')}
                className="gradient-button flex items-center space-x-2 px-5 py-3 rounded-lg transition-all text-white font-bold"
                title="データ保存先を表示"
              >
                <Icons.Database />
                <span>保存先</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="glass-panel border-b-2 border-pink-400 sticky top-[120px] z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-2">
            {[
              { id: 'database', label: 'データベース', icon: 'Database' },
              { id: 'blend', label: '調合モード', icon: 'Beaker' },
              { id: 'vape', label: 'VAPEモード', icon: 'Wind' },
              { id: 'history', label: '履歴', icon: 'History' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {setActiveTab(tab.id); setSelectedHerbs([]);}}
                className={`tab-button flex items-center space-x-2 py-4 px-6 font-bold transition-all ${
                  activeTab === tab.id ? 'active text-white' : 'text-yellow-300 hover:text-white'
                }`}
              >
                {Icons[tab.icon]()}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'database' && (
          <DatabaseView
            herbs={herbs}
            onAdd={() => setShowAddModal(true)}
            onEdit={setEditingHerb}
            onDelete={deleteHerb}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            searchByEffect={searchByEffect}
            onManageTerpenes={() => setShowTerpeneManager(true)}
            onManageComponents={() => setShowComponentManager(true)}
            onManageStandardEffects={() => setShowStandardEffectsManager(true)}
            adminSettings={adminSettings}
          />
        )}
        {activeTab === 'blend' && (
          <BlendMode 
            herbs={herbs} 
            selectedHerbs={selectedHerbs} 
            setSelectedHerbs={setSelectedHerbs} 
            onSaveBlend={saveBlend}
            apiKey={apiKey}
            geminiApiKey={geminiApiKey}
            aiProvider={aiProvider}
          />
        )}
        {activeTab === 'vape' && (
          <VapeMode 
            herbs={herbs} 
            selectedHerbs={selectedHerbs} 
            setSelectedHerbs={setSelectedHerbs} 
            onSaveVapeBlend={saveVapeBlend}
            terpenes={terpenes}
            terpeneProfiles={terpeneProfiles}
            setTerpeneProfiles={async (profiles) => {
              await window.electronAPI.saveTerpeneProfiles(profiles);
              setTerpeneProfiles(profiles);
            }}
            cannabisStrains={cannabisStrains}
            setCannabisStrains={saveCannabisStrains}
            apiKey={apiKey}
            geminiApiKey={geminiApiKey}
            aiProvider={aiProvider}
            onManageCannabisStrains={() => setShowCannabisStrainManager(true)}
            adminSettings={adminSettings}
          />
        )}
        {activeTab === 'history' && (
          <HistoryView 
            blendHistory={blendHistory} 
            vapeHistory={vapeHistory} 
            setBlendHistory={async (history) => {
              await window.electronAPI.saveBlendHistory(history);
              setBlendHistory(history);
            }}
            setVapeHistory={async (history) => {
              await window.electronAPI.saveVapeHistory(history);
              setVapeHistory(history);
            }}
            apiKey={apiKey}
            geminiApiKey={geminiApiKey}
            aiProvider={aiProvider}
          />
        )}
      </main>

      {(showAddModal || editingHerb) && (
        <HerbModal
          key={editingHerb ? `edit-${editingHerb.id}` : 'add-new'}
          herb={editingHerb}
          apiKey={apiKey}
          geminiApiKey={geminiApiKey}
          aiProvider={aiProvider}
          standardEffects={standardEffects}
          onSaveStandardEffects={saveStandardEffects}
          onClose={() => { 
            console.log('🚪 Closing HerbModal');
            setShowAddModal(false); 
            setEditingHerb(null); 
          }}
          onSave={async (herbData) => {
            console.log('💾 Saving herb:', herbData.name);
            if (editingHerb) {
              await updateHerb(editingHerb.id, herbData);
            } else {
              if (await addHerb(herbData)) setShowAddModal(false);
            }
            setEditingHerb(null);
          }}
        />
      )}

      {showTerpeneManager && (
        <TerpeneManager
          key="terpene-manager"
          terpenes={terpenes}
          onClose={() => {
            console.log('🚪 Closing TerpeneManager');
            setShowTerpeneManager(false);
          }}
          onSave={saveTerpenes}
          showNotification={showNotification}
        />
      )}

      {showComponentManager && (
        <ComponentManager
          key="component-manager"
          components={components}
          onClose={() => {
            console.log('🚪 Closing ComponentManager');
            setShowComponentManager(false);
          }}
          onSave={saveComponents}
          showNotification={showNotification}
        />
      )}

      {showStandardEffectsManager && (
        <StandardEffectsManager
          key="standard-effects-manager"
          standardEffects={standardEffects}
          onClose={() => {
            console.log('🚪 Closing StandardEffectsManager');
            setShowStandardEffectsManager(false);
          }}
          onSave={saveStandardEffects}
          showNotification={showNotification}
        />
      )}

      {showCannabisStrainManager && (
        <CannabisStrainManager
          key="cannabis-strain-manager"
          cannabisStrains={cannabisStrains}
          terpenes={terpenes}
          onClose={() => {
            console.log('🚪 Closing CannabisStrainManager');
            setShowCannabisStrainManager(false);
          }}
          onSave={saveCannabisStrains}
          showNotification={showNotification}
        />
      )}

      {/* 管理者ログインモーダル */}
      {showAdminLogin && !isAdminAuthenticated && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="glass-panel rounded-2xl p-8 max-w-md w-full neon-border">
            <h2 className="text-3xl font-bold psychedelic-text mb-6 text-center">🔐 管理者認証</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const input = e.target.password.value;
              if (!adminPassword) {
                // 初回設定
                saveAdminPassword(input);
                setIsAdminAuthenticated(true);
                setShowAdminLogin(false);
                setShowSettingsModal(true);
                showNotification('管理者パスワードを設定しました');
              } else if (input === adminPassword) {
                setIsAdminAuthenticated(true);
                setShowAdminLogin(false);
                setShowSettingsModal(true);
              } else {
                showNotification('パスワードが正しくありません', 'error');
              }
            }}>
              <div className="mb-6">
                <label className="block text-sm font-bold text-yellow-300 mb-2">
                  {adminPassword ? 'パスワードを入力' : '管理者パスワードを設定'}
                </label>
                <input
                  type="password"
                  name="password"
                  className="psychedelic-input w-full px-4 py-3 rounded-lg"
                  placeholder={adminPassword ? 'パスワード' : '新しいパスワード'}
                  required
                  autoFocus
                />
                {!adminPassword && (
                  <p className="text-xs text-cyan-300 mt-2">※ このパスワードは厳重に管理してください</p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 px-6 py-3 glass-panel text-pink-300 rounded-xl border-2 border-pink-500 font-bold"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 gradient-button rounded-xl font-bold text-white"
                >
                  {adminPassword ? '🔓 ログイン' : '✨ 設定'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSettingsModal && isAdminAuthenticated && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="glass-panel rounded-2xl p-8 max-w-2xl w-full neon-border max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold psychedelic-text">⚙️ 管理者設定</h2>
              <button 
                onClick={() => {
                  setShowSettingsModal(false);
                  setIsAdminAuthenticated(false);
                }}
                className="text-pink-300 hover:text-pink-400"
              >
                <Icons.X size={32} />
              </button>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              const newApiKey = e.target.apiKey.value;
              const newPassword = e.target.newPassword?.value;
              
              // プロバイダーに応じて正しいキーを保存
              if (aiProvider === 'claude') {
                if (newApiKey !== apiKey) {
                  await saveApiKey(newApiKey);
                }
              } else {
                if (newApiKey !== geminiApiKey) {
                  await saveGeminiApiKey(newApiKey);
                }
              }
              
              if (newPassword && newPassword.trim()) {
                saveAdminPassword(newPassword);
              }
              
              setShowSettingsModal(false);
              setIsAdminAuthenticated(false);
            }}>
              <div className="space-y-6">
                {/* AIプロバイダー選択 */}
                <div>
                  <label className="block text-sm font-bold text-purple-300 mb-3">
                    🤖 AI プロバイダー選択
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => saveAiProvider('claude')}
                      className={`p-4 rounded-xl font-bold transition-all ${
                        aiProvider === 'claude'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-2 border-yellow-400'
                          : 'glass-panel text-purple-300 border-2 border-purple-500 hover:border-yellow-400'
                      }`}
                    >
                      <div className="text-3xl mb-2">🧠</div>
                      <div>Claude</div>
                      <div className="text-xs mt-1 opacity-70">Anthropic</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => saveAiProvider('gemini')}
                      className={`p-4 rounded-xl font-bold transition-all ${
                        aiProvider === 'gemini'
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-2 border-yellow-400'
                          : 'glass-panel text-cyan-300 border-2 border-cyan-500 hover:border-yellow-400'
                      }`}
                    >
                      <div className="text-3xl mb-2">✨</div>
                      <div>Gemini</div>
                      <div className="text-xs mt-1 opacity-70">Google</div>
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    現在選択中: <span className="text-yellow-300 font-bold">{aiProvider === 'claude' ? 'Claude (Anthropic)' : 'Gemini (Google)'}</span>
                  </p>
                </div>

                {/* APIキー設定 */}
                <div>
                  <label className="block text-sm font-bold text-yellow-300 mb-2">
                    🔑 {aiProvider === 'claude' ? 'Anthropic APIキー' : 'Google AI APIキー'}
                  </label>
                  <input
                    type="password"
                    name="apiKey"
                    defaultValue={aiProvider === 'claude' ? apiKey : geminiApiKey}
                    className="psychedelic-input w-full px-4 py-3 rounded-lg font-mono text-sm"
                    placeholder={aiProvider === 'claude' ? 'sk-ant-api03-...' : 'AIzaSy...'}
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    {aiProvider === 'claude' 
                      ? 'Claude相談機能、安全性チェック、時間治療評価に必要です' 
                      : 'Gemini相談機能、安全性チェック、時間治療評価に必要です'}
                  </p>
                  <p className="text-xs text-cyan-300 mt-2">
                    {aiProvider === 'claude' 
                      ? '取得先: https://console.anthropic.com/' 
                      : '取得先: https://aistudio.google.com/apikey'}
                  </p>
                </div>

                {/* パスワード変更 */}
                <div>
                  <label className="block text-sm font-bold text-cyan-300 mb-2">
                    🔐 管理者パスワード変更（任意）
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    className="psychedelic-input w-full px-4 py-3 rounded-lg"
                    placeholder="新しいパスワード（変更する場合のみ入力）"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    空欄の場合は現在のパスワードが維持されます
                  </p>
                </div>

                {/* UI表示設定 */}
                <div className="border-t-2 border-purple-500 pt-6">
                  <h3 className="text-lg font-bold text-purple-300 mb-4">🎛️ UI表示設定</h3>
                  <div className="space-y-3">
                    {/* カンナビス品種データベース */}
                    <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                      <div>
                        <span className="font-bold text-white">🍃 カンナビス品種データベース</span>
                        <p className="text-xs text-gray-400">VAPE調合画面のカンナビス品種ボタン</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => saveAdminSettings({ ...adminSettings, showCannabisStrains: !adminSettings.showCannabisStrains })}
                        className={`w-16 h-8 rounded-full transition-all relative ${
                          adminSettings.showCannabisStrains ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-all ${
                          adminSettings.showCannabisStrains ? 'right-1' : 'left-1'
                        }`}></div>
                      </button>
                    </div>

                    {/* 標準効能編集 */}
                    <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                      <div>
                        <span className="font-bold text-white">📋 標準効能編集メニュー</span>
                        <p className="text-xs text-gray-400">データベース画面の標準効能ボタン</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => saveAdminSettings({ ...adminSettings, showStandardEffects: !adminSettings.showStandardEffects })}
                        className={`w-16 h-8 rounded-full transition-all relative ${
                          adminSettings.showStandardEffects ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-all ${
                          adminSettings.showStandardEffects ? 'right-1' : 'left-1'
                        }`}></div>
                      </button>
                    </div>

                    {/* 薬草追加 */}
                    <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                      <div>
                        <span className="font-bold text-white">➕ 薬草追加メニュー</span>
                        <p className="text-xs text-gray-400">データベース画面の薬草追加ボタン</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => saveAdminSettings({ ...adminSettings, showAddHerb: !adminSettings.showAddHerb })}
                        className={`w-16 h-8 rounded-full transition-all relative ${
                          adminSettings.showAddHerb ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-all ${
                          adminSettings.showAddHerb ? 'right-1' : 'left-1'
                        }`}></div>
                      </button>
                    </div>

                    {/* 薬草編集ロック */}
                    <div className="flex items-center justify-between p-3 glass-panel rounded-lg border-2 border-red-500">
                      <div>
                        <span className="font-bold text-white">🔒 薬草編集ロック</span>
                        <p className="text-xs text-gray-400">ONにすると薬草の編集・削除を禁止</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => saveAdminSettings({ ...adminSettings, herbEditLocked: !adminSettings.herbEditLocked })}
                        className={`w-16 h-8 rounded-full transition-all relative ${
                          adminSettings.herbEditLocked ? 'bg-red-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-all ${
                          adminSettings.herbEditLocked ? 'right-1' : 'left-1'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setShowSettingsModal(false);
                    setIsAdminAuthenticated(false);
                  }}
                  className="flex-1 px-6 py-4 glass-panel text-pink-300 rounded-xl border-2 border-pink-500 font-bold text-lg"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 gradient-button rounded-xl font-bold text-white text-lg"
                >
                  💾 保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSettingsModal && !isAdminAuthenticated && (
        <SettingsModal
          apiKey={apiKey}
          geminiApiKey={geminiApiKey}
          aiProvider={aiProvider}
          onClose={() => setShowSettingsModal(false)}
          onSave={saveApiKey}
          onSaveGemini={saveGeminiApiKey}
          onSaveAiProvider={saveAiProvider}
        />
      )}

      {notification && (
        <div className={`notification fixed top-32 right-4 z-50 px-8 py-5 rounded-2xl shadow-2xl flex items-center space-x-4 max-w-md border-2 ${
          notification.type === 'success' ? 'border-yellow-400' : 'border-red-400'
        }`}>
          {notification.type === 'success' ? <Icons.Check /> : <Icons.AlertCircle />}
          <span className="font-bold text-white text-lg">{notification.message}</span>
        </div>
      )}

      {/* 妖精さん登場！ */}
      {showFairy && <Fairy />}
    </div>
  );
};

// DatabaseView コンポーネント
const DatabaseView = ({ herbs, onAdd, onEdit, onDelete, searchKeyword, setSearchKeyword, searchByEffect, onManageTerpenes, onManageComponents, onManageStandardEffects, adminSettings }) => {
  const displayHerbs = searchKeyword ? searchByEffect() : herbs;
  
  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 neon-border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-bold text-yellow-300 mb-2">✨ 効能で検索</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-pink-400">{Icons.Search()}</div>
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="例: 抗炎症作用, 消化促進..."
                className="psychedelic-input w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white placeholder-pink-300"
              />
            </div>
          </div>
          <div className="flex items-end space-x-3 flex-wrap gap-2">
            <button
              onClick={onManageTerpenes}
              className="gradient-button px-6 py-3 rounded-lg transition-all flex items-center space-x-2 font-bold text-white"
            >
              <Icons.Leaf />
              <span>テルペン管理</span>
            </button>
            <button
              onClick={onManageComponents}
              className="gradient-button px-6 py-3 rounded-lg transition-all flex items-center space-x-2 font-bold text-white"
            >
              <Icons.BookOpen />
              <span>成分インデックス</span>
            </button>
            {adminSettings?.showStandardEffects !== false && (
              <button
                onClick={onManageStandardEffects}
                className="gradient-button px-6 py-3 rounded-lg transition-all flex items-center space-x-2 font-bold text-white"
              >
                <Icons.List />
                <span>標準効能</span>
              </button>
            )}
            {adminSettings?.showAddHerb !== false && (
              <button
                onClick={onAdd}
                className="gradient-button px-6 py-3 rounded-lg transition-all flex items-center space-x-2 font-bold text-white"
              >
                {Icons.Plus()}
                <span>薬草を追加</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayHerbs.map(herb => (
          <HerbCard 
            key={herb.id} 
            herb={herb} 
            onEdit={() => onEdit(herb)} 
            onDelete={() => onDelete(herb.id)}
            isLocked={adminSettings?.herbEditLocked}
          />
        ))}
      </div>
      
      {displayHerbs.length === 0 && (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-2xl text-yellow-300 font-bold">該当する薬草が見つかりませんでした</p>
        </div>
      )}
    </div>
  );
};

// HerbCard コンポーネント
const HerbCard = ({ herb, onEdit, onDelete, selectable, onSelect, selected, displayMode = 'name', isLocked = false }) => {
  const [expanded, setExpanded] = useState(false);
  
  const displayName = displayMode === 'scientific' ? herb.scientificName : herb.name;
  
  return (
    <div className={`herb-card rounded-2xl overflow-hidden ${selected ? 'ring-4 ring-yellow-400' : ''}`}>
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-4">
        <h3 className="text-2xl font-bold text-white">{displayName}</h3>
        <p className="text-pink-200 text-sm italic">
          {displayMode === 'scientific' ? herb.name : herb.scientificName}
        </p>
        {herb.origin && (
          <p className="text-pink-100 text-xs mt-1">🌍 {herb.origin}</p>
        )}
      </div>
      
      {/* 薬草画像 */}
      {herb.image && (
        <div className="relative w-full h-48 bg-black bg-opacity-30 overflow-hidden">
          <img 
            src={herb.image} 
            alt={herb.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6 space-y-4">
        <div>
          <p className="text-xs font-bold text-yellow-300 uppercase tracking-wide mb-2">使用部位</p>
          <div className="flex flex-wrap gap-2">
            {herb.usedParts.map((part, i) => (
              <span key={i} className="retro-badge text-sm">{part}</span>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-xs font-bold text-yellow-300 uppercase tracking-wide mb-2">主な効果</p>
          <div className="flex flex-wrap gap-2">
            {(expanded ? herb.effects : herb.effects.slice(0, 3)).map((effect, i) => (
              <span key={i} className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-sm font-bold">{effect}</span>
            ))}
            {!expanded && herb.effects.length > 3 && (
              <span className="px-3 py-1 bg-pink-600 text-white rounded-full text-sm font-bold">+{herb.effects.length - 3}</span>
            )}
          </div>
        </div>
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center space-x-2 text-yellow-300 hover:text-yellow-400 font-bold py-2 transition-colors"
        >
          <span>{expanded ? '詳細を閉じる' : '詳細を表示'}</span>
          {expanded ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
        </button>
        
        {expanded && (
          <div className="space-y-4 pt-4 border-t-2 border-pink-500">
            <div>
              <p className="text-xs font-bold text-yellow-300 uppercase tracking-wide mb-2">主成分</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-cyan-400 font-bold mb-1">💧 親水性</p>
                  <div className="flex flex-wrap gap-1">
                    {herb.components.hydrophilic.map((comp, i) => (
                      <span key={i} className="px-2 py-1 bg-cyan-900 bg-opacity-50 text-cyan-300 rounded text-xs border border-cyan-500">{comp}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-orange-400 font-bold mb-1">🔥 疎水性</p>
                  <div className="flex flex-wrap gap-1">
                    {herb.components.lipophilic.map((comp, i) => (
                      <span key={i} className="px-2 py-1 bg-orange-900 bg-opacity-50 text-orange-300 rounded text-xs border border-orange-500">{comp}</span>
                    ))}
                  </div>
                </div>
                {herb.components.phDependent && herb.components.phDependent.length > 0 && (
                  <div>
                    <p className="text-xs text-purple-400 font-bold mb-1">⚗️ pH依存性</p>
                    <div className="flex flex-wrap gap-1">
                      {herb.components.phDependent.map((comp, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-900 bg-opacity-50 text-purple-300 rounded text-xs border border-purple-500">{comp}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* 受容体情報 */}
            {(herb.receptors?.hydrophilic?.length > 0 || herb.receptors?.lipophilic?.length > 0 || herb.receptors?.phDependent?.length > 0) && (
              <div>
                <p className="text-xs font-bold text-yellow-300 uppercase tracking-wide mb-2">🧠 脳受容体への作用</p>
                <div className="space-y-2">
                  {herb.receptors.hydrophilic && herb.receptors.hydrophilic.length > 0 && (
                    <div>
                      <p className="text-xs text-cyan-400 font-bold mb-1">💧 親水性成分 → 受容体</p>
                      <div className="flex flex-wrap gap-1">
                        {herb.receptors.hydrophilic.map((rec, i) => (
                          <span key={i} className="px-2 py-1 bg-cyan-900 bg-opacity-70 text-cyan-200 rounded text-xs border border-cyan-400 font-bold">{rec}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {herb.receptors.lipophilic && herb.receptors.lipophilic.length > 0 && (
                    <div>
                      <p className="text-xs text-orange-400 font-bold mb-1">🔥 疎水性成分 → 受容体</p>
                      <div className="flex flex-wrap gap-1">
                        {herb.receptors.lipophilic.map((rec, i) => (
                          <span key={i} className="px-2 py-1 bg-orange-900 bg-opacity-70 text-orange-200 rounded text-xs border border-orange-400 font-bold">{rec}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {herb.receptors.phDependent && herb.receptors.phDependent.length > 0 && (
                    <div>
                      <p className="text-xs text-purple-400 font-bold mb-1">⚗️ pH依存性成分 → 受容体</p>
                      <div className="flex flex-wrap gap-1">
                        {herb.receptors.phDependent.map((rec, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-900 bg-opacity-70 text-purple-200 rounded text-xs border border-purple-400 font-bold">{rec}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 外用効果 */}
            {herb.topicalEffects && herb.topicalEffects.length > 0 && (
              <div>
                <p className="text-xs font-bold text-green-300 uppercase tracking-wide mb-2">🧴 外用（皮膚）効果</p>
                <div className="flex flex-wrap gap-2">
                  {herb.topicalEffects.map((effect, i) => (
                    <span key={i} className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-bold border-2 border-green-300">
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <p className="text-xs font-bold text-yellow-300 uppercase tracking-wide mb-2">⚠️ 副作用・注意</p>
              <ul className="text-sm text-pink-200 space-y-1">
                {herb.sideEffects.map((effect, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span>{effect}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* コメント */}
            {herb.comment && herb.comment.trim() && (
              <div className="glass-panel rounded-xl p-4 border-2 border-cyan-500">
                <p className="text-xs font-bold text-cyan-300 uppercase tracking-wide mb-2">💬 コメント・メモ</p>
                <p className="text-white text-sm whitespace-pre-wrap">{herb.comment}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs font-bold text-yellow-300 uppercase tracking-wide mb-2">効果部位</p>
              <BodyDiagram bodyParts={herb.bodyParts} />
            </div>
          </div>
        )}
        
        <div className="flex gap-2 pt-4 border-t-2 border-pink-500">
          {selectable ? (
            <button
              onClick={onSelect}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                selected 
                  ? 'bg-gradient-to-r from-yellow-400 to-pink-500 text-white' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
              }`}
            >
              {selected ? '✓ 選択中' : '選択'}
            </button>
          ) : (
            <>
              {isLocked ? (
                <div className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-600 text-gray-400 rounded-lg font-bold">
                  <span>🔒</span>
                  <span>編集ロック中</span>
                </div>
              ) : (
                <>
                  <button 
                    onClick={onEdit} 
                    className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all font-bold"
                  >
                    {Icons.Edit2()}
                    <span>編集</span>
                  </button>
                  <button 
                    onClick={onDelete} 
                    className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all font-bold"
                  >
                    {Icons.Trash2()}
                    <span>削除</span>
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// BodyDiagram コンポーネント
const BodyDiagram = ({ bodyParts }) => {
  const parts = {
    head: bodyParts.includes('頭部'),
    respiratory: bodyParts.includes('呼吸器系'),
    cardiovascular: bodyParts.includes('循環器系'),
    digestive: bodyParts.includes('消化器系'),
    nervous: bodyParts.includes('神経系'),
    immune: bodyParts.includes('免疫系'),
    muscular: bodyParts.includes('筋肉系'),
    urinary: bodyParts.includes('泌尿器系'),
    reproductive: bodyParts.includes('生殖器系'),
    skin: bodyParts.includes('皮膚')
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <svg viewBox="0 0 200 400" className="w-full">
        <ellipse cx="100" cy="40" rx="30" ry="35" fill={parts.head ? '#feca57' : '#4a4a4a'} opacity="0.8" stroke="#ff6b9d" strokeWidth="2" />
        <rect x="70" y="70" width="60" height="120" rx="20" fill={parts.respiratory || parts.cardiovascular || parts.digestive ? '#feca57' : '#4a4a4a'} opacity="0.8" stroke="#ff6b9d" strokeWidth="2" />
        <line x1="100" y1="75" x2="100" y2="270" stroke={parts.nervous ? '#48dbfb' : '#4a4a4a'} strokeWidth="8" opacity="0.8" />
        <rect x="30" y="80" width="35" height="100" rx="15" fill={parts.muscular ? '#feca57' : '#4a4a4a'} opacity="0.8" stroke="#ff6b9d" strokeWidth="2" />
        <rect x="135" y="80" width="35" height="100" rx="15" fill={parts.muscular ? '#feca57' : '#4a4a4a'} opacity="0.8" stroke="#ff6b9d" strokeWidth="2" />
        <rect x="75" y="190" width="20" height="130" rx="10" fill={parts.muscular ? '#feca57' : '#4a4a4a'} opacity="0.8" stroke="#ff6b9d" strokeWidth="2" />
        <rect x="105" y="190" width="20" height="130" rx="10" fill={parts.muscular ? '#feca57' : '#4a4a4a'} opacity="0.8" stroke="#ff6b9d" strokeWidth="2" />
        {parts.skin && <rect x="0" y="0" width="200" height="400" fill="none" stroke="#48dbfb" strokeWidth="6" opacity="0.6" />}
      </svg>
      <div className="mt-2 flex flex-wrap gap-1 text-xs justify-center">
        {bodyParts.map((part, i) => (
          <span key={i} className="retro-badge text-xs">{part}</span>
        ))}
      </div>
    </div>
  );
};

// BlendMode コンポーネント（重量・比率・用途・コメント機能付き）
const BlendMode = ({ herbs, selectedHerbs, setSelectedHerbs, onSaveBlend, apiKey, geminiApiKey, aiProvider }) => {
  const [groupedByEffect, setGroupedByEffect] = useState({});
  const [groupedByTopicalEffect, setGroupedByTopicalEffect] = useState({});
  const [showCombinedDiagram, setShowCombinedDiagram] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [isSafetyChecking, setIsSafetyChecking] = useState(false);
  const [safetyResult, setSafetyResult] = useState(null);
  const [displayMode, setDisplayMode] = useState('name'); // 'name' or 'scientific'
  const [effectMode, setEffectMode] = useState('internal'); // 'internal' or 'topical'

  // 日本語の50音順でソートする関数
  const sortJapanese = (a, b) => {
    return a.localeCompare(b, 'ja');
  };

  useEffect(() => {
    // 内服効果でグループ化
    const grouped = {};
    herbs.forEach(herb => {
      herb.effects.forEach(effect => {
        if (!grouped[effect]) grouped[effect] = [];
        grouped[effect].push(herb);
      });
    });
    setGroupedByEffect(grouped);

    // 外用効果でグループ化
    const topicalGrouped = {};
    herbs.forEach(herb => {
      if (herb.topicalEffects && herb.topicalEffects.length > 0) {
        herb.topicalEffects.forEach(effect => {
          if (!topicalGrouped[effect]) topicalGrouped[effect] = [];
          topicalGrouped[effect].push(herb);
        });
      }
    });
    setGroupedByTopicalEffect(topicalGrouped);
  }, [herbs]);

  const toggleHerbSelection = (herb) => {
    if (selectedHerbs.find(h => h.id === herb.id)) {
      setSelectedHerbs(selectedHerbs.filter(h => h.id !== herb.id));
    } else {
      setSelectedHerbs([...selectedHerbs, herb]);
    }
  };

  const combinedBodyParts = [...new Set(selectedHerbs.flatMap(h => h.bodyParts))];
  const combinedEffects = [...new Set(selectedHerbs.flatMap(h => h.effects))];

  const checkSafety = async () => {
    if (selectedHerbs.length === 0) {
      alert('薬草を選択してください');
      return;
    }

    setIsSafetyChecking(true);
    setSafetyResult(null);

    try {
      const herbsInfo = selectedHerbs.map(h => ({
        name: h.name,
        scientificName: h.scientificName,
        components: h.components,
        receptors: h.receptors,
        effects: h.effects,
        sideEffects: h.sideEffects
      }));

      const prompt = `以下の薬草の組み合わせについて、薬理学的な安全性を評価してください。

薬草リスト:
${herbsInfo.map(h => `
- ${h.name} (${h.scientificName})
  主成分:
    親水性: ${h.components.hydrophilic.join(', ')}
    疎水性: ${h.components.lipophilic.join(', ')}
    pH依存性: ${h.components.phDependent.join(', ')}
  受容体:
    親水性成分 → ${h.receptors?.hydrophilic?.join(', ') || 'なし'}
    疎水性成分 → ${h.receptors?.lipophilic?.join(', ') || 'なし'}
    pH依存性成分 → ${h.receptors?.phDependent?.join(', ') || 'なし'}
  効果: ${h.effects.join(', ')}
  副作用・注意: ${h.sideEffects.join(', ')}
`).join('\n')}

以下の形式のJSONで回答してください:

{
  "safetyLevel": "safe/caution/danger",
  "overallAssessment": "総合評価（1-2文）",
  "interactions": [
    {
      "type": "受容体の競合/相乗効果/代謝阻害/等",
      "herbs": ["薬草A", "薬草B"],
      "description": "相互作用の詳細説明",
      "severity": "low/medium/high"
    }
  ],
  "warnings": ["注意事項1", "注意事項2"],
  "recommendations": ["推奨事項1", "推奨事項2"]
}

safetyLevel:
- safe: 安全。一般的に問題なし
- caution: 注意。特定の条件下でリスクあり
- danger: 危険。重大な相互作用の可能性あり`;

      const result = await callAI({ prompt, aiProvider, apiKey, geminiApiKey, maxTokens: 2000 });
      setSafetyResult(result);

    } catch (error) {
      console.error('安全性チェックエラー:', error);
      alert('安全性チェックに失敗しました。APIキーを確認してください。');
    } finally {
      setIsSafetyChecking(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 neon-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold psychedelic-text">✨ 選択中の薬草</h2>
          <div className="flex gap-3">
            <button
              onClick={checkSafety}
              disabled={selectedHerbs.length === 0 || isSafetyChecking}
              className="gradient-button px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-white text-lg flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600"
            >
              {isSafetyChecking ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>チェック中...</span>
                </>
              ) : (
                <>
                  <span>🛡️</span>
                  <span>安全性チェック</span>
                </>
              )}
            </button>
            <button
              onClick={() => selectedHerbs.length > 0 && setShowConfigModal(true)}
              disabled={selectedHerbs.length === 0}
              className="gradient-button px-8 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-white text-lg flex items-center space-x-2"
            >
              <Icons.Save />
              <span>調合を保存</span>
            </button>
          </div>
        </div>
        
        {selectedHerbs.length > 0 ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {selectedHerbs.map(herb => (
                <div key={herb.id} className="flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-purple-600 px-5 py-3 rounded-xl border-2 border-yellow-400">
                  <span className="font-bold text-white text-lg">{herb.name}</span>
                  <button onClick={() => toggleHerbSelection(herb)} className="text-yellow-300 hover:text-yellow-400 transition-colors">
                    <Icons.X size={20} />
                  </button>
                </div>
              ))}
            </div>
            
            {/* 安全性チェック結果 */}
            {safetyResult && (
              <div className={`glass-panel rounded-2xl p-6 border-4 ${
                safetyResult.safetyLevel === 'safe' ? 'border-green-500' :
                safetyResult.safetyLevel === 'caution' ? 'border-yellow-500' :
                'border-red-500'
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-5xl">
                    {safetyResult.safetyLevel === 'safe' ? '✅' :
                     safetyResult.safetyLevel === 'caution' ? '⚠️' : '🚫'}
                  </span>
                  <div>
                    <h3 className={`text-2xl font-bold ${
                      safetyResult.safetyLevel === 'safe' ? 'text-green-400' :
                      safetyResult.safetyLevel === 'caution' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {safetyResult.safetyLevel === 'safe' ? '安全な組み合わせ' :
                       safetyResult.safetyLevel === 'caution' ? '注意が必要' :
                       '危険な組み合わせ'}
                    </h3>
                    <p className="text-white text-lg">{safetyResult.overallAssessment}</p>
                  </div>
                </div>

                {safetyResult.thermalChanges && safetyResult.thermalChanges.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-orange-300 mb-3">🔥 加熱時の成分変化</h4>
                    <div className="space-y-3">
                      {safetyResult.thermalChanges.map((change, i) => (
                        <div key={i} className={`glass-panel rounded-xl p-4 border-2 ${
                          change.toxicity === 'high' ? 'border-red-500' :
                          change.toxicity === 'medium' ? 'border-yellow-500' :
                          'border-green-500'
                        }`}>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <span className="font-bold text-orange-300 text-lg">{change.component}</span>
                              {change.temperature && (
                                <span className="ml-3 px-2 py-1 bg-orange-900 bg-opacity-50 text-orange-200 rounded text-xs font-bold">
                                  分解温度: {change.temperature}
                                </span>
                              )}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              change.toxicity === 'high' ? 'bg-red-900 text-red-200' :
                              change.toxicity === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                              'bg-green-900 text-green-200'
                            }`}>
                              {change.toxicity === 'high' ? '高毒性' :
                               change.toxicity === 'medium' ? '中毒性' : '低毒性'}
                            </span>
                          </div>
                          <p className="text-white text-sm mb-3">{change.description}</p>
                          {change.degradationProducts && change.degradationProducts.length > 0 && (
                            <div>
                              <p className="text-xs text-cyan-300 font-bold mb-2">⚗️ 分解生成物:</p>
                              <div className="flex flex-wrap gap-2">
                                {change.degradationProducts.map((product, j) => (
                                  <span key={j} className="px-2 py-1 bg-red-900 bg-opacity-50 text-red-300 rounded text-xs border border-red-500">
                                    {product}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {safetyResult.interactions && safetyResult.interactions.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-yellow-300 mb-3">🔬 検出された相互作用</h4>
                    <div className="space-y-3">
                      {safetyResult.interactions.map((interaction, i) => (
                        <div key={i} className={`glass-panel rounded-xl p-4 border-2 ${
                          interaction.severity === 'high' ? 'border-red-500' :
                          interaction.severity === 'medium' ? 'border-yellow-500' :
                          'border-blue-500'
                        }`}>
                          <div className="flex items-start justify-between mb-2">
                            <span className="font-bold text-cyan-300">{interaction.type}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              interaction.severity === 'high' ? 'bg-red-900 text-red-200' :
                              interaction.severity === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                              'bg-blue-900 text-blue-200'
                            }`}>
                              {interaction.severity === 'high' ? '高リスク' :
                               interaction.severity === 'medium' ? '中リスク' : '低リスク'}
                            </span>
                          </div>
                          <p className="text-white text-sm mb-2">{interaction.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {interaction.herbs.map((herb, j) => (
                              <span key={j} className="px-2 py-1 bg-purple-900 bg-opacity-50 text-purple-300 rounded text-xs">
                                {herb}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {safetyResult.warnings && safetyResult.warnings.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-yellow-300 mb-3">⚠️ 注意事項</h4>
                    <ul className="list-disc list-inside space-y-2 text-white">
                      {safetyResult.warnings.map((warning, i) => (
                        <li key={i} className="text-sm">{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {safetyResult.recommendations && safetyResult.recommendations.length > 0 && (
                  <div>
                    <h4 className="text-xl font-bold text-green-300 mb-3">💡 推奨事項</h4>
                    <ul className="list-disc list-inside space-y-2 text-white">
                      {safetyResult.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => setSafetyResult(null)}
                  className="mt-4 w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-bold"
                >
                  閉じる
                </button>
              </div>
            )}
            
            <button
              onClick={() => setShowCombinedDiagram(!showCombinedDiagram)}
              className="text-yellow-300 hover:text-yellow-400 font-bold flex items-center space-x-2 text-lg"
            >
              <span>{showCombinedDiagram ? '統合効果を閉じる' : '✨ 統合効果を表示'}</span>
              {showCombinedDiagram ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
            </button>
            
            {showCombinedDiagram && (
              <div className="grid md:grid-cols-2 gap-6 p-6 glass-panel rounded-2xl neon-border">
                <div>
                  <h3 className="font-bold text-2xl mb-4 text-yellow-300">🌟 期待できる効果</h3>
                  <div className="flex flex-wrap gap-2">
                    {combinedEffects.map((effect, i) => (
                      <span key={i} className="retro-badge text-sm">{effect}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-2xl mb-4 text-yellow-300">🎯 効果部位</h3>
                  <BodyDiagram bodyParts={combinedBodyParts} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-pink-300 text-center py-12 text-xl">下記から薬草を選択してください 👇</p>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold psychedelic-text">🌿 効能別薬草リスト</h2>
        
        {/* 表示切り替えコントロール */}
        <div className="glass-panel rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            {/* 名前表示切り替え */}
            <div className="flex items-center space-x-2">
              <span className="text-yellow-300 font-bold">表示:</span>
              <button
                onClick={() => setDisplayMode('name')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  displayMode === 'name'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'glass-panel text-purple-300 hover:text-white'
                }`}
              >
                🏷️ 和名
              </button>
              <button
                onClick={() => setDisplayMode('scientific')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  displayMode === 'scientific'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'glass-panel text-purple-300 hover:text-white'
                }`}
              >
                🔬 学名
              </button>
            </div>
            
            {/* 効能モード切り替え */}
            <div className="flex items-center space-x-2">
              <span className="text-cyan-300 font-bold">効能:</span>
              <button
                onClick={() => setEffectMode('internal')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  effectMode === 'internal'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                    : 'glass-panel text-cyan-300 hover:text-white'
                }`}
              >
                💊 内服効果
              </button>
              <button
                onClick={() => setEffectMode('topical')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  effectMode === 'topical'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                    : 'glass-panel text-green-300 hover:text-white'
                }`}
              >
                🧴 外用効果
              </button>
            </div>
          </div>
        </div>
        
        {Object.entries(effectMode === 'internal' ? groupedByEffect : groupedByTopicalEffect)
          .sort(([effectA], [effectB]) => sortJapanese(effectA, effectB))
          .map(([effect, effectHerbs]) => (
          <details key={effect} className="glass-panel rounded-2xl overflow-hidden neon-border">
            <summary className="cursor-pointer bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-5 font-bold text-xl hover:from-pink-700 hover:to-purple-700 transition-all">
              {effect} ({effectHerbs.length}種)
            </summary>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {effectHerbs.map(herb => (
                <HerbCard
                  key={herb.id}
                  herb={herb}
                  displayMode={displayMode}
                  selectable
                  selected={selectedHerbs.find(h => h.id === herb.id)}
                  onSelect={() => toggleHerbSelection(herb)}
                />
              ))}
            </div>
          </details>
        ))}
      </div>

      {showConfigModal && (
        <BlendConfigModal
          key={`blend-config-${Date.now()}`}
          selectedHerbs={selectedHerbs}
          onClose={() => {
            console.log('🚪 Closing BlendConfigModal');
            setShowConfigModal(false);
          }}
          onSave={(config) => {
            console.log('💾 Saving blend config');
            onSaveBlend(config);
            setShowConfigModal(false);
          }}
        />
      )}
    </div>
  );
};

// BlendConfigModal - 重量・比率・用途・コメント入力
const BlendConfigModal = ({ selectedHerbs, onClose, onSave }) => {
  const [herbWeights, setHerbWeights] = useState(
    Object.fromEntries(selectedHerbs.map(h => [h.id, '']))
  );
  const [usage, setUsage] = useState('beverage'); // beverage or topical
  const [comment, setComment] = useState('');
  const [blendName, setBlendName] = useState('');

  const totalWeight = Object.values(herbWeights).reduce((sum, w) => sum + (parseFloat(w) || 0), 0);
  const ratios = Object.fromEntries(
    Object.entries(herbWeights).map(([id, weight]) => [
      id,
      totalWeight > 0 ? ((parseFloat(weight) || 0) / totalWeight * 100).toFixed(1) : '0'
    ])
  );

  const handleSave = () => {
    const herbsWithWeights = selectedHerbs.map(herb => ({
      ...herb,
      weight: parseFloat(herbWeights[herb.id]) || 0,
      ratio: parseFloat(ratios[herb.id]) || 0
    }));

    onSave({
      blendName: blendName.trim() || `${selectedHerbs.map(h => h.name).join(' + ')}`,
      herbsWithWeights,
      totalWeight,
      usage,
      comment,
      waterBase: 100 // 水100g基準
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="glass-panel rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto neon-border">
        <div className="sticky top-0 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-5 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-3xl font-bold">⚗️ 調合設定</h2>
          <button onClick={onClose} className="text-white hover:text-yellow-300 transition-colors">
            <Icons.X size={28} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 調合名 */}
          <div>
            <label className="block text-xl font-bold text-cyan-300 mb-3">✨ 調合名（任意）</label>
            <input
              type="text"
              value={blendName}
              onChange={(e) => setBlendName(e.target.value)}
              className="psychedelic-input w-full px-4 py-3 rounded-xl text-lg"
              placeholder={`例: リラックスブレンド（未入力の場合: ${selectedHerbs.map(h => h.name).join(' + ')}）`}
            />
          </div>

          {/* 用途選択 */}
          <div>
            <label className="block text-xl font-bold text-yellow-300 mb-3">🎯 用途</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setUsage('beverage')}
                className={`p-4 rounded-xl font-bold transition-all ${
                  usage === 'beverage'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-2 border-yellow-400'
                    : 'glass-panel text-pink-300 border-2 border-pink-500 hover:border-yellow-400'
                }`}
              >
                <div className="text-3xl mb-2">🍵</div>
                <div>飲料用</div>
              </button>
              <button
                onClick={() => setUsage('topical')}
                className={`p-4 rounded-xl font-bold transition-all ${
                  usage === 'topical'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-2 border-yellow-400'
                    : 'glass-panel text-pink-300 border-2 border-pink-500 hover:border-yellow-400'
                }`}
              >
                <div className="text-3xl mb-2">💆</div>
                <div>外用（皮膚など）</div>
              </button>
            </div>
          </div>

          {/* 重量入力 */}
          <div>
            <label className="block text-xl font-bold text-yellow-300 mb-3">
              ⚖️ 重量配分（水100g基準）
            </label>
            <div className="space-y-3">
              {selectedHerbs.map(herb => (
                <div key={herb.id} className="glass-panel rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white text-lg">{herb.name}</span>
                    <span className="text-yellow-300 font-bold text-lg">
                      {ratios[herb.id]}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={herbWeights[herb.id]}
                      onChange={(e) => setHerbWeights({...herbWeights, [herb.id]: e.target.value})}
                      placeholder="重量 (g)"
                      className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                    />
                    <span className="text-pink-300 font-bold">g</span>
                  </div>
                </div>
              ))}
              <div className="glass-panel rounded-xl p-4 border-2 border-yellow-400">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-yellow-300">合計重量:</span>
                  <span className="text-2xl font-bold text-white">{totalWeight.toFixed(1)} g</span>
                </div>
              </div>
            </div>
          </div>

          {/* コメント */}
          <div>
            <label className="block text-xl font-bold text-yellow-300 mb-3">
              💭 コメント
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="この調合について記録したいことを書いてください..."
              rows={4}
              className="psychedelic-input w-full px-4 py-3 rounded-lg resize-none"
            />
          </div>

          {/* 保存ボタン */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 glass-panel text-pink-300 rounded-xl hover:border-pink-400 border-2 border-pink-500 font-bold text-lg transition-all"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-4 gradient-button rounded-xl font-bold text-white text-lg"
            >
              💾 保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// VapeMode コンポーネント（テルペン比率・カンナビス品種プロファイル対応）
const VapeMode = ({ herbs, selectedHerbs, setSelectedHerbs, onSaveVapeBlend, terpenes, terpeneProfiles, setTerpeneProfiles, cannabisStrains, setCannabisStrains, apiKey, geminiApiKey, aiProvider, onManageCannabisStrains, adminSettings }) => {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [isSafetyChecking, setIsSafetyChecking] = useState(false);
  const [safetyResult, setSafetyResult] = useState(null);

  const toggleHerbSelection = (herb) => {
    if (selectedHerbs.find(h => h.id === herb.id)) {
      setSelectedHerbs(selectedHerbs.filter(h => h.id !== herb.id));
    } else {
      setSelectedHerbs([...selectedHerbs, herb]);
    }
  };

  const allLipophilicComponents = [...new Set(selectedHerbs.flatMap(h => h.components?.lipophilic || []))];
  const allPhDependentComponents = [...new Set(selectedHerbs.flatMap(h => h.components?.phDependent || []))];
  const combinedEffects = [...new Set(selectedHerbs.flatMap(h => h.effects))];

  const checkSafety = async () => {
    if (selectedHerbs.length === 0) {
      alert('薬草を選択してください');
      return;
    }

    if (!apiKey || !apiKey.trim()) {
      alert('APIキーが設定されていません。画面右上の「設定」ボタンからAPIキーを設定してください。');
      return;
    }

    setIsSafetyChecking(true);
    setSafetyResult(null);

    try {
      const herbsInfo = selectedHerbs.map(h => ({
        name: h.name,
        scientificName: h.scientificName,
        components: h.components,
        receptors: h.receptors,
        effects: h.effects,
        sideEffects: h.sideEffects
      }));

      const prompt = `以下の薬草の組み合わせをVAPE（気化吸入）で使用する場合の安全性を評価してください。

**重要**: VAPEでは主に疎水性成分（テルペン、精油）が気化されますが、pH依存性成分（アルカロイド等）も一部気化される可能性があります。
**加熱による成分変化**: VAPE使用時の一般的な加熱温度（180-220°C）での化学変化を考慮してください。

薬草リスト:
${herbsInfo.map(h => `
- ${h.name} (${h.scientificName})
  疎水性成分: ${h.components.lipophilic.join(', ')}
  pH依存性成分: ${h.components.phDependent.join(', ') || 'なし'}
  受容体:
    疎水性成分 → ${h.receptors?.lipophilic?.join(', ') || 'なし'}
    pH依存性成分 → ${h.receptors?.phDependent?.join(', ') || 'なし'}
  効果: ${h.effects.join(', ')}
  副作用・注意: ${h.sideEffects.join(', ')}
`).join('\n')}

**評価項目**:
1. 加熱時の成分変化（熱分解、酸化、重合等）
2. pH依存性成分の熱安定性と気化特性
3. 生成される可能性のある有害物質
4. 受容体レベルでの相互作用
5. 呼吸器への影響

以下の形式のJSONで回答してください:

{
  "safetyLevel": "safe/caution/danger",
  "overallAssessment": "VAPE使用時の総合評価（2-3文、加熱による変化とpH依存性成分を含む）",
  "thermalChanges": [
    {
      "component": "成分名",
      "componentType": "lipophilic/phDependent",
      "temperature": "分解温度（°C）",
      "degradationProducts": ["分解生成物1", "分解生成物2"],
      "toxicity": "low/medium/high",
      "description": "加熱時の変化の詳細説明"
    }
  ],
  "interactions": [
    {
      "type": "受容体の競合/相乗効果/呼吸器への影響/熱分解生成物の毒性/等",
      "herbs": ["薬草A", "薬草B"],
      "description": "相互作用の詳細説明（加熱による変化を含む）",
      "severity": "low/medium/high"
    }
  ],
  "warnings": ["VAPE使用時の注意事項1（加熱温度・時間含む）", "注意事項2"],
  "recommendations": ["推奨温度範囲", "推奨使用時間", "その他推奨事項"]
}

**加熱による成分変化の例**:
疎水性成分:
- リモネン: 180°C以上で酸化され、刺激性化合物が生成される可能性
- リナロール: 高温で分解し、ホルムアルデヒドなどが生成される可能性
- カリオフィレン: 比較的安定だが、220°C以上で分解開始

pH依存性成分（アルカロイド等）:
- カフェイン: 178°C昇華点、238°C以上で分解、低温で比較的安定
- ニコチン: 247°C沸点、高温で有毒な分解生成物（ピリジン等）生成
- テオブロミン: 290-295°C融点、通常のVAPE温度では安定だが一部気化
- モルヒネ様アルカロイド: 高温で著しく分解、毒性増加の可能性`;

      const result = await callAI({ prompt, aiProvider, apiKey, geminiApiKey, maxTokens: 2500 });
      setSafetyResult(result);

    } catch (error) {
      console.error('安全性チェックエラー:', error);
      alert('安全性チェックに失敗しました。APIキーを確認してください。');
    } finally {
      setIsSafetyChecking(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 neon-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold psychedelic-text">💨 VAPE調合設定</h2>
          <div className="flex gap-3">
            {adminSettings?.showCannabisStrains !== false && (
              <button
                onClick={onManageCannabisStrains}
                className="gradient-button px-6 py-3 rounded-lg transition-all font-bold text-white text-lg flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600"
              >
                <Icons.Cannabis />
                <span>カンナビス品種</span>
              </button>
            )}
            <button
              onClick={checkSafety}
              disabled={selectedHerbs.length === 0 || isSafetyChecking}
              className="gradient-button px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-white text-lg flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600"
            >
              {isSafetyChecking ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>チェック中...</span>
                </>
              ) : (
                <>
                  <span>🛡️</span>
                  <span>安全性チェック</span>
                </>
              )}
            </button>
            <button
              onClick={() => setShowConfigModal(true)}
              className="gradient-button px-8 py-3 rounded-lg transition-all font-bold text-white text-lg flex items-center space-x-2"
            >
              <Icons.Save />
              <span>VAPE調合を保存</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {selectedHerbs.length > 0 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-bold text-yellow-300 mb-3">選択中の薬草</label>
                <div className="flex flex-wrap gap-3">
                  {selectedHerbs.map(herb => (
                    <div key={herb.id} className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-3 rounded-xl border-2 border-yellow-400">
                      <span className="font-bold text-white text-lg">{herb.name}</span>
                      <button onClick={() => toggleHerbSelection(herb)} className="text-yellow-300 hover:text-yellow-400">
                        <Icons.X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 安全性チェック結果 */}
              {safetyResult && (
                <div className={`glass-panel rounded-2xl p-6 border-4 ${
                  safetyResult.safetyLevel === 'safe' ? 'border-green-500' :
                  safetyResult.safetyLevel === 'caution' ? 'border-yellow-500' :
                  'border-red-500'
                }`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-5xl">
                      {safetyResult.safetyLevel === 'safe' ? '✅' :
                       safetyResult.safetyLevel === 'caution' ? '⚠️' : '🚫'}
                    </span>
                    <div>
                      <h3 className={`text-2xl font-bold ${
                        safetyResult.safetyLevel === 'safe' ? 'text-green-400' :
                        safetyResult.safetyLevel === 'caution' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {safetyResult.safetyLevel === 'safe' ? '安全な組み合わせ' :
                         safetyResult.safetyLevel === 'caution' ? '注意が必要' :
                         '危険な組み合わせ'}
                      </h3>
                      <p className="text-white text-lg">{safetyResult.overallAssessment}</p>
                    </div>
                  </div>

                  {safetyResult.interactions && safetyResult.interactions.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xl font-bold text-yellow-300 mb-3">🔬 検出された相互作用</h4>
                      <div className="space-y-3">
                        {safetyResult.interactions.map((interaction, i) => (
                          <div key={i} className={`glass-panel rounded-xl p-4 border-2 ${
                            interaction.severity === 'high' ? 'border-red-500' :
                            interaction.severity === 'medium' ? 'border-yellow-500' :
                            'border-blue-500'
                          }`}>
                            <div className="flex items-start justify-between mb-2">
                              <span className="font-bold text-cyan-300">{interaction.type}</span>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                interaction.severity === 'high' ? 'bg-red-900 text-red-200' :
                                interaction.severity === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                                'bg-blue-900 text-blue-200'
                              }`}>
                                {interaction.severity === 'high' ? '高リスク' :
                                 interaction.severity === 'medium' ? '中リスク' : '低リスク'}
                              </span>
                            </div>
                            <p className="text-white text-sm mb-2">{interaction.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {interaction.herbs.map((herb, j) => (
                                <span key={j} className="px-2 py-1 bg-purple-900 bg-opacity-50 text-purple-300 rounded text-xs">
                                  {herb}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {safetyResult.warnings && safetyResult.warnings.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xl font-bold text-yellow-300 mb-3">⚠️ 注意事項</h4>
                      <ul className="list-disc list-inside space-y-2 text-white">
                        {safetyResult.warnings.map((warning, i) => (
                          <li key={i} className="text-sm">{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {safetyResult.recommendations && safetyResult.recommendations.length > 0 && (
                    <div>
                      <h4 className="text-xl font-bold text-green-300 mb-3">💡 推奨事項</h4>
                      <ul className="list-disc list-inside space-y-2 text-white">
                        {safetyResult.recommendations.map((rec, i) => (
                          <li key={i} className="text-sm">{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={() => setSafetyResult(null)}
                    className="mt-4 w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-bold"
                  >
                    閉じる
                  </button>
                </div>
              )}

              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-2xl mb-3 text-yellow-300">🔥 抽出される疎水性成分</h3>
                  <div className="flex flex-wrap gap-2">
                    {allLipophilicComponents.map((comp, i) => (
                      <span key={i} className="px-3 py-1 bg-orange-900 bg-opacity-70 text-orange-300 rounded-full text-sm font-bold border-2 border-orange-500">{comp}</span>
                    ))}
                  </div>
                </div>

                {allPhDependentComponents.length > 0 && (
                  <div>
                    <h3 className="font-bold text-2xl mb-3 text-purple-300">⚗️ 一部気化されるpH依存性成分</h3>
                    <div className="flex flex-wrap gap-2">
                      {allPhDependentComponents.map((comp, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-900 bg-opacity-70 text-purple-300 rounded-full text-sm font-bold border-2 border-purple-500">{comp}</span>
                      ))}
                    </div>
                    <p className="text-xs text-purple-400 mt-2">
                      ※ アルカロイド等のpH依存性成分は疎水性成分より気化しにくいですが、高温では一部が気化します
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-2xl mb-3 text-yellow-300">✨ 期待できる効果</h3>
                  <div className="flex flex-wrap gap-2">
                    {combinedEffects.map((effect, i) => (
                      <span key={i} className="retro-badge text-sm">{effect}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-900 bg-opacity-30 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-sm text-yellow-200">
                    <strong>⚠️ 注意:</strong> VAPE使用時は必ず安全な成分のみを使用し、適切な温度管理を行ってください。pH依存性成分（アルカロイド等）を含む場合は特に注意が必要です。
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-pink-300 text-center py-12 text-xl">薬草を選択してください 👇</p>
          )}
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-6 neon-border">
        <h2 className="text-3xl font-bold psychedelic-text mb-4">🌿 利用可能な薬草</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {herbs.map(herb => (
            <HerbCard
              key={herb.id}
              herb={herb}
              selectable
              selected={selectedHerbs.find(h => h.id === herb.id)}
              onSelect={() => toggleHerbSelection(herb)}
            />
          ))}
        </div>
      </div>

      {showConfigModal && (
        <VapeConfigModal
          key={`vape-config-${Date.now()}`}
          selectedHerbs={selectedHerbs}
          terpenes={terpenes}
          cannabisStrains={cannabisStrains}
          onClose={() => {
            console.log('🚪 Closing VapeConfigModal');
            setShowConfigModal(false);
          }}
          onSave={(config) => {
            console.log('💾 Saving vape config');
            onSaveVapeBlend(config);
            setShowConfigModal(false);
          }}
        />
      )}
    </div>
  );
};

// VapeConfigModal - ベース比率・テルペン比率・カンナビス品種対応
const VapeConfigModal = ({ selectedHerbs, terpenes, cannabisStrains, onClose, onSave }) => {
  const [baseRatios, setBaseRatios] = useState({ terpene: 25, diluentTerpene: 25, pg: 25, vg: 25 });
  const [customTerpenes, setCustomTerpenes] = useState([]);
  const [selectedStrain, setSelectedStrain] = useState(null);
  const [comment, setComment] = useState('');
  const [vapeName, setVapeName] = useState('');
  const [strainSearchQuery, setStrainSearchQuery] = useState('');

  const totalBaseRatio = baseRatios.terpene + (baseRatios.diluentTerpene || 0) + baseRatios.pg + baseRatios.vg;
  const isBaseRatioValid = totalBaseRatio === 100;

  const totalTerpeneRatio = customTerpenes.reduce((sum, t) => sum + t.ratio, 0);
  const isTerpeneRatioValid = customTerpenes.length === 0 || totalTerpeneRatio === 100;

  // 品種検索フィルタ
  const filteredStrains = (cannabisStrains || []).filter(strain =>
    strain.name.toLowerCase().includes(strainSearchQuery.toLowerCase())
  );

  const addTerpene = (terpene) => {
    if (!customTerpenes.find(t => t.id === terpene.id)) {
      setCustomTerpenes([...customTerpenes, { ...terpene, ratio: 0 }]);
    }
  };

  const updateTerpeneRatio = (terpeneId, ratio) => {
    setCustomTerpenes(customTerpenes.map(t =>
      t.id === terpeneId ? { ...t, ratio: parseFloat(ratio) || 0 } : t
    ));
  };

  const removeTerpene = (terpeneId) => {
    setCustomTerpenes(customTerpenes.filter(t => t.id !== terpeneId));
  };

  // カンナビス品種を選択
  const selectStrain = (strain) => {
    setSelectedStrain(strain);
    setCustomTerpenes(strain.terpenes || []);
  };

  // 品種選択をクリア
  const clearStrainSelection = () => {
    setSelectedStrain(null);
    setCustomTerpenes([]);
  };

  const handleSave = () => {
    if (!isBaseRatioValid) {
      alert('ベース比率の合計は100%にしてください');
      return;
    }
    if (!isTerpeneRatioValid) {
      alert('テルペン比率の合計は100%にしてください');
      return;
    }

    const defaultName = selectedStrain 
      ? selectedStrain.name
      : selectedHerbs.length > 0 
        ? selectedHerbs.map(h => h.name).join(' + ')
        : 'カスタムテルペン調合';

    onSave({
      vapeName: vapeName.trim() || defaultName,
      baseRatios,
      customTerpenes,
      cannabisStrain: selectedStrain,
      comment
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="glass-panel rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto neon-border">
        <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-5 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-3xl font-bold">💨 VAPE調合設定</h2>
          <button onClick={onClose} className="text-white hover:text-yellow-300">
            <Icons.X size={28} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* VAPE調合名 */}
          <div>
            <label className="block text-xl font-bold text-cyan-300 mb-3">💨 VAPE調合名（任意）</label>
            <input
              type="text"
              value={vapeName}
              onChange={(e) => setVapeName(e.target.value)}
              className="psychedelic-input w-full px-4 py-3 rounded-xl text-lg"
              placeholder={`例: リラックスVAPE（未入力の場合: ${selectedStrain ? selectedStrain.name : selectedHerbs.length > 0 ? selectedHerbs.map(h => h.name).join(' + ') : 'カスタムテルペン調合'}）`}
            />
          </div>

          {/* ベース比率設定 */}
          <div>
            <label className="block text-xl font-bold text-yellow-300 mb-3">
              🧪 ベース比率 {!isBaseRatioValid && <span className="text-red-400">(合計: {totalBaseRatio}% - 100%にしてください)</span>}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries({
                terpene: { label: 'テルペン', icon: '🌿', description: '香り・効果' },
                diluentTerpene: { label: '希釈用テルペン', icon: '💎', description: '無香料希釈' },
                pg: { label: 'PG', icon: '💧', description: 'スロートヒット' },
                vg: { label: 'VG', icon: '🫧', description: '煙量' }
              }).map(([key, { label, icon, description }]) => (
                <div key={key} className="glass-panel rounded-xl p-4">
                  <div className="text-center mb-2">
                    <div className="text-3xl mb-1">{icon}</div>
                    <div className="font-bold text-white text-sm">{label}</div>
                    <div className="text-xs text-gray-400">{description}</div>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={baseRatios[key] || 0}
                    onChange={(e) => setBaseRatios({ ...baseRatios, [key]: parseFloat(e.target.value) || 0 })}
                    className="psychedelic-input w-full px-3 py-2 rounded-lg text-center text-lg font-bold"
                  />
                  <div className="text-center mt-2 text-yellow-300 font-bold">%</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-cyan-300 mt-3 text-center">
              💡 希釈用テルペンは無香料のテルペンで、全体の濃度を調整するために使用します
            </p>
          </div>

          {/* カンナビス品種選択 */}
          <div>
            <label className="text-xl font-bold text-yellow-300 mb-3 block">🍃 カンナビス品種を選択</label>
            <div className="glass-panel rounded-xl p-4">
              {/* 検索 */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute left-3 top-3 text-pink-400">{Icons.Search()}</div>
                  <input
                    type="text"
                    value={strainSearchQuery}
                    onChange={(e) => setStrainSearchQuery(e.target.value)}
                    placeholder="品種名で検索..."
                    className="psychedelic-input w-full pl-10 pr-4 py-2 rounded-lg"
                  />
                </div>
              </div>

              {/* 選択中の品種 */}
              {selectedStrain && (
                <div className="mb-4 p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white">{selectedStrain.name}</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${
                        selectedStrain.type === 'indica' ? 'bg-purple-900 text-purple-300' :
                        selectedStrain.type === 'sativa' ? 'bg-orange-900 text-orange-300' :
                        'bg-green-900 text-green-300'
                      }`}>
                        {selectedStrain.type === 'indica' ? 'Indica' : selectedStrain.type === 'sativa' ? 'Sativa' : 'Hybrid'}
                      </span>
                    </div>
                    <button
                      onClick={clearStrainSelection}
                      className="text-white hover:text-yellow-300"
                    >
                      <Icons.X size={20} />
                    </button>
                  </div>
                  {selectedStrain.description && (
                    <p className="text-sm text-green-100 mt-2">{selectedStrain.description}</p>
                  )}
                </div>
              )}

              {/* 品種リスト */}
              {(cannabisStrains || []).length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {filteredStrains.map(strain => (
                    <button
                      key={strain.id}
                      onClick={() => selectStrain(strain)}
                      className={`p-3 rounded-lg font-bold transition-all text-left ${
                        selectedStrain?.id === strain.id
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icons.Cannabis />
                        <div>
                          <div className="text-sm">{strain.name}</div>
                          <div className={`text-xs ${
                            strain.type === 'indica' ? 'text-purple-200' :
                            strain.type === 'sativa' ? 'text-orange-200' :
                            'text-green-200'
                          }`}>
                            {strain.type === 'indica' ? 'Indica' : strain.type === 'sativa' ? 'Sativa' : 'Hybrid'}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-pink-300 text-center py-4">
                  登録されている品種がありません<br />
                  <span className="text-xs">データベースタブの「カンナビス品種」から品種を登録してください</span>
                </p>
              )}
            </div>
          </div>

          {/* テルペン選択 */}
          <div>
            <label className="block text-xl font-bold text-yellow-300 mb-3">
              🌿 テルペン選択 {customTerpenes.length > 0 && !isTerpeneRatioValid && <span className="text-red-400">(合計: {totalTerpeneRatio.toFixed(1)}% - 100%にしてください)</span>}
            </label>
            <div className="glass-panel rounded-xl p-4 mb-4">
              <div className="flex flex-wrap gap-2">
                {terpenes.map(terpene => (
                  <button
                    key={terpene.id}
                    onClick={() => addTerpene(terpene)}
                    disabled={customTerpenes.find(t => t.id === terpene.id)}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm"
                  >
                    + {terpene.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 選択されたテルペンの比率調整 */}
            {customTerpenes.length > 0 && (
              <div className="space-y-3">
                {customTerpenes.map(terpene => (
                  <div key={terpene.id} className="glass-panel rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white text-lg">{terpene.name}</span>
                      <button onClick={() => removeTerpene(terpene.id)} className="text-red-400 hover:text-red-300">
                        <Icons.Trash2 />
                      </button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        value={terpene.ratio}
                        onChange={(e) => updateTerpeneRatio(terpene.id, e.target.value)}
                        className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                      />
                      <span className="text-yellow-300 font-bold text-lg">%</span>
                    </div>
                    <div className="mt-2 text-sm text-pink-300">
                      {terpene.effects?.join(', ')} • {terpene.aroma}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* コメント */}
          <div>
            <label className="block text-xl font-bold text-yellow-300 mb-3">💭 コメント</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="このVAPE調合について記録したいことを書いてください..."
              rows={4}
              className="psychedelic-input w-full px-4 py-3 rounded-lg resize-none"
            />
          </div>

          {/* 保存ボタン */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 glass-panel text-pink-300 rounded-xl hover:border-pink-400 border-2 border-pink-500 font-bold text-lg"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-4 gradient-button rounded-xl font-bold text-white text-lg"
            >
              💾 保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// TerpeneManager - テルペン追加・編集
const TerpeneManager = ({ terpenes, onClose, onSave, showNotification }) => {
  const [editingTerpenes, setEditingTerpenes] = useState([...terpenes]);
  const [newTerpene, setNewTerpene] = useState({ name: '', effects: [], aroma: '', receptors: [], memo: '' });
  const [newEffect, setNewEffect] = useState('');
  const [newReceptor, setNewReceptor] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editEffect, setEditEffect] = useState('');
  const [editReceptor, setEditReceptor] = useState('');

  const addTerpene = () => {
    if (!newTerpene.name.trim()) {
      alert('テルペン名を入力してください');
      return;
    }
    const terpene = {
      ...newTerpene,
      id: Date.now().toString()
    };
    setEditingTerpenes([...editingTerpenes, terpene]);
    setNewTerpene({ name: '', effects: [], aroma: '', receptors: [], memo: '' });
    setNewEffect('');
    setNewReceptor('');
  };

  const deleteTerpene = (id) => {
    setEditingTerpenes(editingTerpenes.filter(t => t.id !== id));
  };

  const addEffectToNew = () => {
    if (newEffect.trim()) {
      setNewTerpene({ ...newTerpene, effects: [...(newTerpene.effects || []), newEffect.trim()] });
      setNewEffect('');
    }
  };

  const removeEffectFromNew = (index) => {
    setNewTerpene({ ...newTerpene, effects: (newTerpene.effects || []).filter((_, i) => i !== index) });
  };

  const addReceptorToNew = () => {
    if (newReceptor.trim()) {
      setNewTerpene({ ...newTerpene, receptors: [...(newTerpene.receptors || []), newReceptor.trim()] });
      setNewReceptor('');
    }
  };

  const removeReceptorFromNew = (index) => {
    setNewTerpene({ ...newTerpene, receptors: (newTerpene.receptors || []).filter((_, i) => i !== index) });
  };

  // 既存テルペンの編集関数
  const updateTerpene = (id, field, value) => {
    setEditingTerpenes(editingTerpenes.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const addEffectToExisting = (id) => {
    if (editEffect.trim()) {
      setEditingTerpenes(editingTerpenes.map(t => 
        t.id === id ? { ...t, effects: [...(t.effects || []), editEffect.trim()] } : t
      ));
      setEditEffect('');
    }
  };

  const removeEffectFromExisting = (id, index) => {
    setEditingTerpenes(editingTerpenes.map(t => 
      t.id === id ? { ...t, effects: (t.effects || []).filter((_, i) => i !== index) } : t
    ));
  };

  const addReceptorToExisting = (id) => {
    if (editReceptor.trim()) {
      setEditingTerpenes(editingTerpenes.map(t => 
        t.id === id ? { ...t, receptors: [...(t.receptors || []), editReceptor.trim()] } : t
      ));
      setEditReceptor('');
    }
  };

  const removeReceptorFromExisting = (id, index) => {
    setEditingTerpenes(editingTerpenes.map(t => 
      t.id === id ? { ...t, receptors: (t.receptors || []).filter((_, i) => i !== index) } : t
    ));
  };

  const handleSave = async () => {
    await onSave(editingTerpenes);
    showNotification('テルペンを保存しました ✨');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="glass-panel rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto neon-border">
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-5 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-3xl font-bold">🌿 テルペン管理</h2>
          <button onClick={onClose} className="text-white hover:text-yellow-300">
            <Icons.X size={28} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 新規テルペン追加 */}
          <div className="glass-panel rounded-2xl p-6 neon-border">
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">➕ 新規テルペン追加</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-pink-300 mb-2">テルペン名</label>
                <input
                  type="text"
                  value={newTerpene.name}
                  onChange={(e) => setNewTerpene({ ...newTerpene, name: e.target.value })}
                  placeholder="例: リモネン, ミルセン..."
                  className="psychedelic-input w-full px-4 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-pink-300 mb-2">効果</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newEffect}
                    onChange={(e) => setNewEffect(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addEffectToNew(); } }}
                    placeholder="例: 鎮静, 抗不安..."
                    className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                  />
                  <button
                    onClick={addEffectToNew}
                    className="gradient-button px-4 py-2 rounded-lg font-bold"
                  >
                    <Icons.Plus />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newTerpene.effects.map((effect, i) => (
                    <span key={i} className="flex items-center space-x-1 retro-badge">
                      <span>{effect}</span>
                      <button onClick={() => removeEffectFromNew(i)} className="text-white hover:text-red-300">
                        <Icons.X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-pink-300 mb-2">香り</label>
                <input
                  type="text"
                  value={newTerpene.aroma}
                  onChange={(e) => setNewTerpene({ ...newTerpene, aroma: e.target.value })}
                  placeholder="例: 柑橘系, フローラル..."
                  className="psychedelic-input w-full px-4 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-pink-300 mb-2">🧠 作用する受容体</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newReceptor}
                    onChange={(e) => setNewReceptor(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addReceptorToNew(); } }}
                    placeholder="例: CB1受容体, CB2受容体..."
                    className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                  />
                  <button
                    onClick={addReceptorToNew}
                    className="gradient-button px-4 py-2 rounded-lg font-bold"
                  >
                    {Icons.Plus()}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newTerpene.receptors.map((receptor, i) => (
                    <span key={i} className="flex items-center space-x-1 retro-badge">
                      <span>{receptor}</span>
                      <button onClick={() => removeReceptorFromNew(i)} className="text-white hover:text-red-300">
                        <Icons.X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-pink-300 mb-2">📝 メモ</label>
                <textarea
                  value={newTerpene.memo}
                  onChange={(e) => setNewTerpene({ ...newTerpene, memo: e.target.value })}
                  placeholder="このテルペンに関するメモを自由に記入..."
                  className="psychedelic-input w-full px-4 py-2 rounded-lg resize-y"
                  rows={3}
                />
              </div>

              <button
                onClick={addTerpene}
                className="w-full gradient-button py-3 rounded-lg font-bold text-white text-lg"
              >
                ➕ テルペンを追加
              </button>
            </div>
          </div>

          {/* 既存テルペンリスト */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">📋 登録済みテルペン ({editingTerpenes.length})</h3>
            <div className="grid grid-cols-1 gap-4">
              {editingTerpenes.map(terpene => (
                <div key={terpene.id} className="glass-panel rounded-xl p-6 border-2 border-cyan-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <button
                        onClick={() => setEditingId(editingId === terpene.id ? null : terpene.id)}
                        className="text-cyan-300 hover:text-cyan-400 flex items-center space-x-2 mb-2"
                      >
                        <Icons.Edit2 size={18} />
                        <span className="text-sm font-bold">{editingId === terpene.id ? '編集を閉じる' : '編集する'}</span>
                      </button>
                    </div>
                    <button onClick={() => deleteTerpene(terpene.id)} className="text-red-400 hover:text-red-300">
                      <Icons.Trash2 />
                    </button>
                  </div>

                  {editingId === terpene.id ? (
                    /* 編集モード */
                    <div className="space-y-4">
                      {/* テルペン名 */}
                      <div>
                        <label className="block text-sm font-bold text-yellow-300 mb-2">🌿 テルペン名</label>
                        <input
                          type="text"
                          value={terpene.name}
                          onChange={(e) => updateTerpene(terpene.id, 'name', e.target.value)}
                          className="psychedelic-input w-full px-4 py-2 rounded-lg"
                        />
                      </div>

                      {/* 効果 */}
                      <div>
                        <label className="block text-sm font-bold text-pink-300 mb-2">💫 効果</label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={editEffect}
                            onChange={(e) => setEditEffect(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addEffectToExisting(terpene.id); } }}
                            className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                            placeholder="効果を入力してEnter"
                          />
                          <button
                            onClick={() => addEffectToExisting(terpene.id)}
                            className="gradient-button px-4 py-2 rounded-lg font-bold"
                          >
                            追加
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {terpene.effects?.map((effect, idx) => (
                            <div key={idx} className="flex items-center space-x-2 px-3 py-1 glass-panel rounded-full border border-pink-500">
                              <span className="text-white text-sm">{effect}</span>
                              <button onClick={() => removeEffectFromExisting(terpene.id, idx)} className="text-red-400 hover:text-red-300">
                                <Icons.X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 香り */}
                      <div>
                        <label className="block text-sm font-bold text-green-300 mb-2">👃 香りのプロファイル</label>
                        <input
                          type="text"
                          value={terpene.aroma}
                          onChange={(e) => updateTerpene(terpene.id, 'aroma', e.target.value)}
                          className="psychedelic-input w-full px-4 py-2 rounded-lg"
                          placeholder="例: 柑橘系、フローラル、ウッディ"
                        />
                      </div>

                      {/* 受容体 */}
                      <div>
                        <label className="block text-sm font-bold text-cyan-300 mb-2">🧠 脳受容体</label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={editReceptor}
                            onChange={(e) => setEditReceptor(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addReceptorToExisting(terpene.id); } }}
                            className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                            placeholder="受容体を入力してEnter"
                          />
                          <button
                            onClick={() => addReceptorToExisting(terpene.id)}
                            className="gradient-button px-4 py-2 rounded-lg font-bold"
                          >
                            追加
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {terpene.receptors?.map((receptor, idx) => (
                            <div key={idx} className="flex items-center space-x-2 px-3 py-1 glass-panel rounded-full border border-cyan-500">
                              <span className="text-cyan-300 text-sm">{receptor}</span>
                              <button onClick={() => removeReceptorFromExisting(terpene.id, idx)} className="text-red-400 hover:text-red-300">
                                <Icons.X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* メモ */}
                      <div>
                        <label className="block text-sm font-bold text-orange-300 mb-2">📝 メモ</label>
                        <textarea
                          value={terpene.memo || ''}
                          onChange={(e) => updateTerpene(terpene.id, 'memo', e.target.value)}
                          placeholder="このテルペンに関するメモを自由に記入..."
                          className="psychedelic-input w-full px-4 py-2 rounded-lg resize-y"
                          rows={3}
                        />
                      </div>
                    </div>
                  ) : (
                    /* 表示モード */
                    <div className="space-y-2">
                      <h4 className="font-bold text-white text-xl mb-3">{terpene.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-pink-300 font-bold">効果: </span>
                          <span className="text-white">{terpene.effects?.join(', ') || 'なし'}</span>
                        </div>
                        <div>
                          <span className="text-green-300 font-bold">香り: </span>
                          <span className="text-white">{terpene.aroma || 'なし'}</span>
                        </div>
                        {terpene.receptors && terpene.receptors.length > 0 && (
                          <div>
                            <span className="text-cyan-300 font-bold">🧠 受容体: </span>
                            <span className="text-cyan-200">{terpene.receptors.join(', ')}</span>
                          </div>
                        )}
                        {terpene.memo && (
                          <div className="mt-2 p-3 glass-panel rounded-lg border border-orange-500 border-opacity-40">
                            <span className="text-orange-300 font-bold">📝 メモ: </span>
                            <span className="text-gray-200 whitespace-pre-wrap">{terpene.memo}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 保存ボタン */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 glass-panel text-pink-300 rounded-xl border-2 border-pink-500 font-bold text-lg"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-4 gradient-button rounded-xl font-bold text-white text-lg"
            >
              💾 保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ComponentManager - 成分インデックス管理（あいうえお順）
const ComponentManager = ({ components, onClose, onSave, showNotification }) => {
  const [editingComponents, setEditingComponents] = useState([...components]);
  const [newComponent, setNewComponent] = useState({ name: '', type: 'hydrophilic', description: '', examples: [] });
  const [newExample, setNewExample] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editExample, setEditExample] = useState('');

  // あいうえお順にソート
  const sortedComponents = [...editingComponents].sort((a, b) => 
    a.name.localeCompare(b.name, 'ja')
  );

  const addComponent = () => {
    if (!newComponent.name.trim()) {
      alert('成分名を入力してください');
      return;
    }
    const component = {
      ...newComponent,
      id: Date.now().toString()
    };
    setEditingComponents([...editingComponents, component]);
    setNewComponent({ name: '', type: 'hydrophilic', description: '', examples: [] });
    setNewExample('');
  };

  const deleteComponent = (id) => {
    if (confirm('この成分を削除しますか？')) {
      setEditingComponents(editingComponents.filter(c => c.id !== id));
    }
  };

  const updateComponent = (id, field, value) => {
    setEditingComponents(editingComponents.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const addExampleToNew = () => {
    if (newExample.trim()) {
      setNewComponent({ ...newComponent, examples: [...newComponent.examples, newExample] });
      setNewExample('');
    }
  };

  const removeExampleFromNew = (index) => {
    setNewComponent({ ...newComponent, examples: newComponent.examples.filter((_, i) => i !== index) });
  };

  const addExampleToExisting = (id) => {
    if (editExample.trim()) {
      setEditingComponents(editingComponents.map(c => 
        c.id === id ? { ...c, examples: [...c.examples, editExample] } : c
      ));
      setEditExample('');
    }
  };

  const removeExampleFromExisting = (id, index) => {
    setEditingComponents(editingComponents.map(c => 
      c.id === id ? { ...c, examples: c.examples.filter((_, i) => i !== index) } : c
    ));
  };

  const handleSave = async () => {
    await onSave(editingComponents);
    onClose();
  };

  const typeLabels = {
    hydrophilic: '親水性',
    lipophilic: '疎水性',
    phDependent: 'pH依存性'
  };

  const typeColors = {
    hydrophilic: 'text-blue-300 border-blue-500',
    lipophilic: 'text-pink-300 border-pink-500',
    phDependent: 'text-purple-300 border-purple-500'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="glass-panel rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto neon-border">
        <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-5 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-3xl font-bold">📚 成分インデックス（あいうえお順）</h2>
          <button onClick={onClose} className="text-white hover:text-yellow-300">
            <Icons.X size={28} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* 新規成分追加 */}
          <div className="glass-panel rounded-xl p-6 border-2 border-green-500">
            <h3 className="text-2xl font-bold text-green-300 mb-4">➕ 新しい成分を追加</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-yellow-300 mb-2">成分名</label>
                  <input
                    type="text"
                    value={newComponent.name}
                    onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
                    className="psychedelic-input w-full px-4 py-2 rounded-lg"
                    placeholder="例: フラボノイド"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-cyan-300 mb-2">分類</label>
                  <select
                    value={newComponent.type}
                    onChange={(e) => setNewComponent({ ...newComponent, type: e.target.value })}
                    className="psychedelic-input w-full px-4 py-2 rounded-lg"
                  >
                    <option value="hydrophilic">親水性</option>
                    <option value="lipophilic">疎水性</option>
                    <option value="phDependent">pH依存性</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-pink-300 mb-2">説明・特徴</label>
                <textarea
                  value={newComponent.description}
                  onChange={(e) => setNewComponent({ ...newComponent, description: e.target.value })}
                  className="psychedelic-input w-full px-4 py-2 rounded-lg"
                  rows="3"
                  placeholder="この成分の特徴、効果、性質などを記入..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-purple-300 mb-2">具体例</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newExample}
                    onChange={(e) => setNewExample(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addExampleToNew(); } }}
                    className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                    placeholder="例を入力してEnter"
                  />
                  <button
                    onClick={addExampleToNew}
                    className="gradient-button px-4 py-2 rounded-lg font-bold"
                  >
                    追加
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newComponent.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center space-x-2 px-3 py-1 glass-panel rounded-full border border-purple-500">
                      <span className="text-white text-sm">{example}</span>
                      <button onClick={() => removeExampleFromNew(idx)} className="text-red-400 hover:text-red-300">
                        <Icons.X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={addComponent}
                className="w-full gradient-button py-3 rounded-xl font-bold text-white text-lg"
              >
                ✨ 成分を追加
              </button>
            </div>
          </div>

          {/* 登録済み成分リスト（あいうえお順） */}
          <div>
            <h3 className="text-2xl font-bold text-cyan-300 mb-4">
              📖 登録済み成分 ({sortedComponents.length}) - あいうえお順
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {sortedComponents.map(component => (
                <div key={component.id} className={`glass-panel rounded-xl p-6 border-2 ${typeColors[component.type]}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <button
                        onClick={() => setEditingId(editingId === component.id ? null : component.id)}
                        className="text-cyan-300 hover:text-cyan-400 flex items-center space-x-2 mb-2"
                      >
                        <Icons.Edit2 size={18} />
                        <span className="text-sm font-bold">{editingId === component.id ? '編集を閉じる' : '編集する'}</span>
                      </button>
                    </div>
                    <button onClick={() => deleteComponent(component.id)} className="text-red-400 hover:text-red-300">
                      <Icons.Trash2 />
                    </button>
                  </div>

                  {editingId === component.id ? (
                    /* 編集モード */
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-yellow-300 mb-2">成分名</label>
                          <input
                            type="text"
                            value={component.name}
                            onChange={(e) => updateComponent(component.id, 'name', e.target.value)}
                            className="psychedelic-input w-full px-4 py-2 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-cyan-300 mb-2">分類</label>
                          <select
                            value={component.type}
                            onChange={(e) => updateComponent(component.id, 'type', e.target.value)}
                            className="psychedelic-input w-full px-4 py-2 rounded-lg"
                          >
                            <option value="hydrophilic">親水性</option>
                            <option value="lipophilic">疎水性</option>
                            <option value="phDependent">pH依存性</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-pink-300 mb-2">説明・特徴</label>
                        <textarea
                          value={component.description}
                          onChange={(e) => updateComponent(component.id, 'description', e.target.value)}
                          className="psychedelic-input w-full px-4 py-2 rounded-lg"
                          rows="3"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-purple-300 mb-2">具体例</label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={editExample}
                            onChange={(e) => setEditExample(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addExampleToExisting(component.id); } }}
                            className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                            placeholder="例を入力してEnter"
                          />
                          <button
                            onClick={() => addExampleToExisting(component.id)}
                            className="gradient-button px-4 py-2 rounded-lg font-bold"
                          >
                            追加
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {component.examples?.map((example, idx) => (
                            <div key={idx} className="flex items-center space-x-2 px-3 py-1 glass-panel rounded-full border border-purple-500">
                              <span className="text-white text-sm">{example}</span>
                              <button onClick={() => removeExampleFromExisting(component.id, idx)} className="text-red-400 hover:text-red-300">
                                <Icons.X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* 表示モード */
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-white text-2xl">{component.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${typeColors[component.type]}`}>
                          {typeLabels[component.type]}
                        </span>
                      </div>
                      {component.description && (
                        <p className="text-white text-sm leading-relaxed">{component.description}</p>
                      )}
                      {component.examples && component.examples.length > 0 && (
                        <div>
                          <span className="text-purple-300 font-bold text-sm">具体例: </span>
                          <span className="text-purple-200 text-sm">{component.examples.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 保存ボタン */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 glass-panel text-pink-300 rounded-xl border-2 border-pink-500 font-bold text-lg"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-4 gradient-button rounded-xl font-bold text-white text-lg"
            >
              💾 保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// HistoryView - 重量・比率・コメント表示対応
const HistoryView = ({ blendHistory, vapeHistory, setBlendHistory, setVapeHistory, apiKey, geminiApiKey, aiProvider }) => {
  const [activeHistoryTab, setActiveHistoryTab] = useState('blend');
  const [expandedId, setExpandedId] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [selectedBlend, setSelectedBlend] = useState(null);

  const deleteBlendHistory = async (id) => {
    if (confirm('この履歴を削除しますか?')) {
      await setBlendHistory(blendHistory.filter(b => b.id !== id));
    }
  };

  const deleteVapeHistory = async (id) => {
    if (confirm('この履歴を削除しますか?')) {
      await setVapeHistory(vapeHistory.filter(v => v.id !== id));
    }
  };

  const evaluateChronotherapy = async (blend) => {
    setIsEvaluating(true);
    setEvaluationResult(null);
    setSelectedBlend(blend);

    try {
      const now = new Date();
      const blendDate = new Date(blend.timestamp);
      
      // 月齢計算（簡易版）
      const lunarCycle = 29.530588853;
      const knownNewMoon = new Date('2000-01-06');
      const daysSinceKnownNew = (now - knownNewMoon) / (1000 * 60 * 60 * 24);
      const lunarAge = daysSinceKnownNew % lunarCycle;
      const lunarPhase = lunarAge < 7.4 ? '新月期' :
                        lunarAge < 14.8 ? '上弦期' :
                        lunarAge < 22.1 ? '満月期' : '下弦期';
      
      // 季節判定
      const month = now.getMonth();
      const season = month >= 2 && month <= 4 ? '春' :
                    month >= 5 && month <= 7 ? '夏' :
                    month >= 8 && month <= 10 ? '秋' : '冬';
      
      // 時刻
      const hour = now.getHours();
      const timeOfDay = hour >= 5 && hour < 12 ? '朝' :
                       hour >= 12 && hour < 17 ? '午後' :
                       hour >= 17 && hour < 21 ? '夕方' : '夜';

      const prompt = `時間治療（クロノセラピー）の観点から、以下の薬草調合を評価してください。

**調合情報**:
タイプ: ${blend.type === 'blend' ? '通常調合' : 'VAPE調合'}
作成日時: ${blendDate.toLocaleString('ja-JP')}
使用部位: ${blend.usageType || 'VAPE'}
薬草: ${blend.herbs?.map(h => h.name).join(', ')}
${blend.comment ? `コメント: ${blend.comment}` : ''}

**現在の時間情報**:
日時: ${now.toLocaleString('ja-JP')}
季節: ${season}
時刻帯: ${timeOfDay}（${hour}時）
月齢: ${lunarAge.toFixed(1)}日（${lunarPhase}）

**薬草の成分と効果**:
${blend.herbs?.map(h => `
- ${h.name}
  親水性成分: ${h.components?.hydrophilic?.join(', ') || 'なし'}
  疎水性成分: ${h.components?.lipophilic?.join(', ') || 'なし'}
  pH依存性成分: ${h.components?.phDependent?.join(', ') || 'なし'}
  期待される効果: ${h.effects?.join(', ') || 'なし'}
`).join('\n')}

時間治療学の知見に基づき、以下の形式のJSONで評価してください:

{
  "overallScore": 1-10の評価点,
  "assessment": "総合評価（2-3文）",
  "circadianAlignment": {
    "score": 1-10,
    "description": "サーカディアンリズム（概日リズム）との適合性",
    "optimalTimes": ["推奨時間帯1", "推奨時間帯2"]
  },
  "seasonalAlignment": {
    "score": 1-10,
    "description": "季節との適合性",
    "optimalSeasons": ["推奨季節1", "推奨季節2"]
  },
  "lunarAlignment": {
    "score": 1-10,
    "description": "月齢周期との適合性",
    "optimalPhases": ["推奨月相1", "推奨月相2"]
  },
  "currentRecommendation": {
    "suitable": true/false,
    "reason": "現在使用すべきか否かの理由",
    "bestTime": "最適な摂取時刻（例: 朝食後、就寝前）",
    "dosageAdjustment": "時刻に応じた用量調整の提案"
  },
  "warnings": ["注意事項1", "注意事項2"],
  "references": ["参考文献・根拠1", "参考文献・根拠2"]
}

**時間治療学の主要な考慮事項**:
- サーカディアンリズム: コルチゾール（朝高）、メラトニン（夜高）、体温変動
- 臓器の時間依存性: 肝臓（夜間代謝活発）、腎臓（昼間排泄活発）
- 受容体感受性の日内変動
- 季節性: 春（肝・胆）、夏（心・小腸）、秋（肺・大腸）、冬（腎・膀胱）
- 月相: 新月（解毒）、満月（補充）
- 薬物動態の時刻依存性`;

      const result = await callAI({ prompt, aiProvider, apiKey, geminiApiKey, maxTokens: 3000 });
      setEvaluationResult(result);

    } catch (error) {
      console.error('時間治療評価エラー:', error);
      alert('評価に失敗しました。APIキーを確認してください。');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-2 flex gap-2 neon-border">
        <button
          onClick={() => setActiveHistoryTab('blend')}
          className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
            activeHistoryTab === 'blend'
              ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
              : 'text-pink-300 hover:bg-pink-900 hover:bg-opacity-30'
          }`}
        >
          🌿 調合履歴 ({blendHistory.length})
        </button>
        <button
          onClick={() => setActiveHistoryTab('vape')}
          className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
            activeHistoryTab === 'vape'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
              : 'text-cyan-300 hover:bg-cyan-900 hover:bg-opacity-30'
          }`}
        >
          💨 VAPE履歴 ({vapeHistory.length})
        </button>
      </div>

      {activeHistoryTab === 'blend' && (
        <div className="space-y-4">
          {blendHistory.length > 0 ? (
            blendHistory.map(blend => (
              <div key={blend.id} className="glass-panel rounded-2xl p-6 neon-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm text-pink-300 mb-1">{blend.date}</p>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {blend.blendName || (blend.herbsWithWeights 
                        ? blend.herbsWithWeights.map(h => `${h.name} (${h.weight}g)`).join(' + ')
                        : blend.herbs.map(h => h.name).join(' + '))}
                    </h3>
                    {blend.blendName && (
                      <p className="text-sm text-cyan-300 mb-2">
                        {blend.herbsWithWeights 
                          ? blend.herbsWithWeights.map(h => `${h.name} (${h.weight}g)`).join(' + ')
                          : blend.herbs.map(h => h.name).join(' + ')}
                      </p>
                    )}
                    <div className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-3">
                      {blend.usage === 'beverage' ? '🍵 飲料用' : '💆 外用'}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => evaluateChronotherapy({...blend, type: 'blend'})}
                      disabled={isEvaluating}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors disabled:opacity-50"
                      title="時間治療評価"
                    >
                      <Icons.Clock size={20} />
                    </button>
                    <button onClick={() => deleteBlendHistory(blend.id)} className="text-red-400 hover:text-red-300">
                      <Icons.Trash2 />
                    </button>
                  </div>
                </div>

                {blend.herbsWithWeights && (
                  <div className="glass-panel rounded-xl p-4 mb-4">
                    <h4 className="text-lg font-bold text-yellow-300 mb-3">⚖️ 配合 (水{blend.waterBase || 100}g基準)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {blend.herbsWithWeights.map((herb, i) => (
                        <div key={i} className="bg-purple-900 bg-opacity-30 rounded-lg p-3 border border-purple-500">
                          <div className="font-bold text-white">{herb.name}</div>
                          <div className="text-yellow-300 text-sm">{herb.weight}g ({herb.ratio.toFixed(1)}%)</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-pink-500">
                      <div className="flex justify-between text-lg">
                        <span className="text-pink-300 font-bold">合計:</span>
                        <span className="text-white font-bold">{blend.totalWeight?.toFixed(1) || 0}g</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-bold text-yellow-300 mb-2">✨ 効果</p>
                    <div className="flex flex-wrap gap-2">
                      {blend.effects.map((effect, i) => (
                        <span key={i} className="retro-badge text-xs">{effect}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-yellow-300 mb-2">🎯 効果部位</p>
                    <div className="flex flex-wrap gap-2">
                      {blend.bodyParts.map((part, i) => (
                        <span key={i} className="px-2 py-1 bg-teal-900 bg-opacity-50 text-teal-300 rounded text-xs border border-teal-500">{part}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {blend.comment && (
                  <div className="glass-panel rounded-xl p-4">
                    <p className="text-sm font-bold text-yellow-300 mb-2">💭 コメント</p>
                    <p className="text-white">{blend.comment}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">🌿</div>
              <p className="text-2xl text-yellow-300 font-bold">調合履歴がありません</p>
            </div>
          )}
        </div>
      )}

      {activeHistoryTab === 'vape' && (
        <div className="space-y-4">
          {vapeHistory.length > 0 ? (
            vapeHistory.map(vape => (
              <div key={vape.id} className="glass-panel rounded-2xl p-6 neon-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm text-cyan-300 mb-1">{vape.date}</p>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {vape.vapeName || (vape.herbs.length > 0 ? vape.herbs.map(h => h.name).join(' + ') : 'カスタムテルペン調合')}
                    </h3>
                    {vape.vapeName && (
                      <p className="text-sm text-green-300 mb-2">
                        {vape.herbs.length > 0 ? vape.herbs.map(h => h.name).join(' + ') : 'カスタムテルペン調合'}
                      </p>
                    )}
                    {vape.terpeneProfile && (
                      <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-900 bg-opacity-50 rounded-full text-sm font-bold text-green-300 border border-green-500 mb-3">
                        <Icons.Cannabis />
                        <span>{vape.terpeneProfile.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => evaluateChronotherapy({...vape, type: 'vape'})}
                      disabled={isEvaluating}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors disabled:opacity-50"
                      title="時間治療評価"
                    >
                      <Icons.Clock size={20} />
                    </button>
                    <button onClick={() => deleteVapeHistory(vape.id)} className="text-red-400 hover:text-red-300">
                      <Icons.Trash2 />
                    </button>
                  </div>
                </div>

                {vape.baseRatios && (
                  <div className="glass-panel rounded-xl p-4 mb-4">
                    <h4 className="text-lg font-bold text-yellow-300 mb-3">🧪 ベース比率</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="text-center">
                        <div className="text-2xl mb-1">🌿</div>
                        <div className="text-white font-bold">{vape.baseRatios.terpene || 0}%</div>
                        <div className="text-xs text-cyan-300">テルペン</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-1">💎</div>
                        <div className="text-white font-bold">{vape.baseRatios.diluentTerpene || 0}%</div>
                        <div className="text-xs text-cyan-300">希釈用</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-1">💧</div>
                        <div className="text-white font-bold">{vape.baseRatios.pg || 0}%</div>
                        <div className="text-xs text-cyan-300">PG</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-1">🫧</div>
                        <div className="text-white font-bold">{vape.baseRatios.vg || 0}%</div>
                        <div className="text-xs text-cyan-300">VG</div>
                      </div>
                    </div>
                  </div>
                )}

                {vape.customTerpenes && vape.customTerpenes.length > 0 && (
                  <div className="glass-panel rounded-xl p-4 mb-4">
                    <h4 className="text-lg font-bold text-yellow-300 mb-3">🌿 テルペン配合</h4>
                    <div className="space-y-2">
                      {vape.customTerpenes.map((terpene, i) => (
                        <div key={i} className="flex justify-between items-center bg-green-900 bg-opacity-30 rounded-lg p-2 border border-green-500">
                          <span className="text-white font-bold">{terpene.name}</span>
                          <span className="text-yellow-300 font-bold">{terpene.ratio}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-4">
                  {vape.lipophilicComponents && vape.lipophilicComponents.length > 0 && (
                    <div>
                      <p className="text-sm font-bold text-yellow-300 mb-2">🔥 疎水性成分</p>
                      <div className="flex flex-wrap gap-2">
                        {vape.lipophilicComponents.map((comp, i) => (
                          <span key={i} className="px-2 py-1 bg-orange-900 bg-opacity-50 text-orange-300 rounded text-xs border border-orange-500">{comp}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {vape.effects && vape.effects.length > 0 && (
                    <div>
                      <p className="text-sm font-bold text-yellow-300 mb-2">✨ 期待効果</p>
                      <div className="flex flex-wrap gap-2">
                        {vape.effects.map((effect, i) => (
                          <span key={i} className="retro-badge text-xs">{effect}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {vape.comment && (
                  <div className="glass-panel rounded-xl p-4">
                    <p className="text-sm font-bold text-yellow-300 mb-2">💭 コメント</p>
                    <p className="text-white">{vape.comment}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">💨</div>
              <p className="text-2xl text-yellow-300 font-bold">VAPE調合履歴がありません</p>
            </div>
          )}
        </div>
      )}

      {/* 時間治療評価結果モーダル */}
      {evaluationResult && selectedBlend && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50" onClick={() => setEvaluationResult(null)}>
          <div className="glass-panel rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto neon-border" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold psychedelic-text">⏰ 時間治療評価</h2>
              <button onClick={() => setEvaluationResult(null)} className="text-pink-300 hover:text-pink-400">
                <Icons.X size={32} />
              </button>
            </div>

            <div className="mb-6 glass-panel rounded-xl p-4">
              <h3 className="text-xl font-bold text-yellow-300 mb-2">調合情報</h3>
              <p className="text-white">{selectedBlend.herbs?.map(h => h.name).join(' + ')}</p>
              <p className="text-sm text-cyan-300 mt-1">{selectedBlend.date}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-5xl">
                  {evaluationResult.overallScore >= 8 ? '🌟' : 
                   evaluationResult.overallScore >= 6 ? '✨' : 
                   evaluationResult.overallScore >= 4 ? '⚠️' : '❌'}
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-300">総合スコア: {evaluationResult.overallScore}/10</div>
                  <p className="text-white">{evaluationResult.assessment}</p>
                </div>
              </div>
            </div>

            {/* サーカディアンリズム */}
            <div className="glass-panel rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-cyan-300">🌅 サーカディアンリズム（概日リズム）</h4>
                <span className="text-2xl font-bold text-cyan-300">{evaluationResult.circadianAlignment.score}/10</span>
              </div>
              <p className="text-white mb-3">{evaluationResult.circadianAlignment.description}</p>
              <div className="space-y-1">
                <p className="text-sm text-yellow-300 font-bold">推奨時間帯:</p>
                {evaluationResult.circadianAlignment.optimalTimes.map((time, i) => (
                  <div key={i} className="px-3 py-1 bg-cyan-900 bg-opacity-50 text-cyan-200 rounded inline-block mr-2 text-sm">
                    {time}
                  </div>
                ))}
              </div>
            </div>

            {/* 季節適合性 */}
            <div className="glass-panel rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-green-300">🍂 季節適合性</h4>
                <span className="text-2xl font-bold text-green-300">{evaluationResult.seasonalAlignment.score}/10</span>
              </div>
              <p className="text-white mb-3">{evaluationResult.seasonalAlignment.description}</p>
              <div className="space-y-1">
                <p className="text-sm text-yellow-300 font-bold">推奨季節:</p>
                {evaluationResult.seasonalAlignment.optimalSeasons.map((season, i) => (
                  <div key={i} className="px-3 py-1 bg-green-900 bg-opacity-50 text-green-200 rounded inline-block mr-2 text-sm">
                    {season}
                  </div>
                ))}
              </div>
            </div>

            {/* 月相適合性 */}
            <div className="glass-panel rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-purple-300">🌙 月相適合性</h4>
                <span className="text-2xl font-bold text-purple-300">{evaluationResult.lunarAlignment.score}/10</span>
              </div>
              <p className="text-white mb-3">{evaluationResult.lunarAlignment.description}</p>
              <div className="space-y-1">
                <p className="text-sm text-yellow-300 font-bold">推奨月相:</p>
                {evaluationResult.lunarAlignment.optimalPhases.map((phase, i) => (
                  <div key={i} className="px-3 py-1 bg-purple-900 bg-opacity-50 text-purple-200 rounded inline-block mr-2 text-sm">
                    {phase}
                  </div>
                ))}
              </div>
            </div>

            {/* 現在の推奨 */}
            <div className={`glass-panel rounded-xl p-4 mb-4 border-2 ${
              evaluationResult.currentRecommendation.suitable ? 'border-green-500' : 'border-yellow-500'
            }`}>
              <h4 className="text-lg font-bold text-yellow-300 mb-3">💡 現在の推奨</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{evaluationResult.currentRecommendation.suitable ? '✅' : '⚠️'}</span>
                  <span className="text-white font-bold">
                    {evaluationResult.currentRecommendation.suitable ? '現在使用に適しています' : '使用には注意が必要です'}
                  </span>
                </div>
                <p className="text-white text-sm">{evaluationResult.currentRecommendation.reason}</p>
                <div className="mt-3 space-y-1">
                  <p className="text-sm text-cyan-300"><strong>最適摂取時刻:</strong> {evaluationResult.currentRecommendation.bestTime}</p>
                  <p className="text-sm text-cyan-300"><strong>用量調整:</strong> {evaluationResult.currentRecommendation.dosageAdjustment}</p>
                </div>
              </div>
            </div>

            {/* 注意事項 */}
            {evaluationResult.warnings && evaluationResult.warnings.length > 0 && (
              <div className="glass-panel rounded-xl p-4 mb-4 border-2 border-yellow-500">
                <h4 className="text-lg font-bold text-yellow-300 mb-3">⚠️ 注意事項</h4>
                <ul className="list-disc list-inside space-y-2 text-white text-sm">
                  {evaluationResult.warnings.map((warning, i) => (
                    <li key={i}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 参考文献 */}
            {evaluationResult.references && evaluationResult.references.length > 0 && (
              <div className="glass-panel rounded-xl p-4">
                <h4 className="text-lg font-bold text-cyan-300 mb-3">📚 参考文献・根拠</h4>
                <ul className="list-disc list-inside space-y-1 text-white text-xs">
                  {evaluationResult.references.map((ref, i) => (
                    <li key={i}>{ref}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => setEvaluationResult(null)}
              className="mt-6 w-full gradient-button py-4 rounded-xl font-bold text-white text-lg"
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {isEvaluating && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="glass-panel rounded-2xl p-8 text-center">
            <div className="animate-spin h-16 w-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-2xl font-bold text-cyan-300">時間治療評価中...</p>
            <p className="text-sm text-white mt-2">月齢・季節・時刻を分析しています</p>
          </div>
        </div>
      )}
    </div>
  );
};

// HerbModal - 薬草追加・編集（AI相談機能付き）
// 標準効能リスト（統一表現）
const STANDARD_EFFECTS = [
  // 消化器系
  '消化促進', '整腸作用', '健胃作用', '食欲増進', '制酸作用', '駆風作用', '下痢改善', '便秘改善',
  // 神経系
  '鎮静作用', '鎮痛作用', '抗不安作用', '抗うつ作用', '安眠効果', '精神安定', '集中力向上', '記憶力向上',
  // 呼吸器系
  '去痰作用', '鎮咳作用', '気管支拡張', '抗喘息作用', '呼吸器保護',
  // 循環器系
  '血圧降下', '血圧上昇', '血流改善', '強心作用', '抗動脈硬化', '血管拡張', '血管収縮',
  // 免疫系
  '免疫賦活', '免疫調整', '抗ウイルス', '抗菌作用', '抗真菌作用', '抗炎症作用',
  // 代謝系
  '利尿作用', '発汗作用', '解熱作用', '抗酸化作用', '血糖降下', '脂質代謝改善', 'デトックス',
  // ホルモン系
  'エストロゲン様作用', 'プロゲステロン様作用', '月経調整', '更年期症状緩和', '催乳作用',
  // その他
  '抗痙攣作用', '筋弛緩作用', '抗アレルギー', '鎮痒作用', '収斂作用', '創傷治癒促進', '抗腫瘍作用'
];

const STANDARD_TOPICAL_EFFECTS = [
  // 皮膚基本
  '保湿効果', '皮膚保護', '皮膚軟化', '角質除去', '収斂作用',
  // 炎症・かゆみ
  '抗炎症', '鎮痒作用', '冷却効果', '温感効果',
  // 創傷・再生
  '創傷治癒促進', '組織再生', '瘢痕形成抑制', '皮膚再生',
  // 感染症
  '抗菌作用', '抗真菌作用', '抗ウイルス', '消毒作用',
  // 症状別
  'ニキビケア', '湿疹緩和', 'アトピー緩和', '乾癬緩和', '火傷緩和', '虫刺され緩和',
  // 美容
  '美白効果', 'シミ・くすみ改善', 'シワ改善', '弾力性向上', '血行促進',
  // 痛み・筋肉
  '筋肉痛緩和', '関節痛緩和', '打撲緩和', '捻挫緩和', '神経痛緩和'
];

// CannabisStrainManager - カンナビス品種データベース管理
const CannabisStrainManager = ({ cannabisStrains, terpenes, onClose, onSave, showNotification }) => {
  const [strains, setStrains] = useState([...(cannabisStrains || [])]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingStrain, setEditingStrain] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // 新規品種フォーム
  const [newStrain, setNewStrain] = useState({
    name: '',
    type: 'hybrid', // indica, sativa, hybrid
    description: '',
    terpenes: [],
    effects: [],
    thcContent: '',
    cbdContent: ''
  });
  const [newTerpeneId, setNewTerpeneId] = useState('');
  const [newTerpeneRatio, setNewTerpeneRatio] = useState(0);
  const [newEffect, setNewEffect] = useState('');

  // 検索フィルタ
  const filteredStrains = strains.filter(strain => {
    const q = searchQuery.toLowerCase();
    return strain.name.toLowerCase().includes(q) ||
    strain.type.toLowerCase().includes(q) ||
    (strain.aliases || []).some(a => a.toLowerCase().includes(q)) ||
    (strain.breeder || '').toLowerCase().includes(q);
  });

  // テルペン追加
  const addTerpeneToStrain = (strainData, setStrainData) => {
    if (!newTerpeneId || newTerpeneRatio <= 0) return;
    const terpene = terpenes.find(t => t.id === newTerpeneId);
    if (!terpene) return;
    if (strainData.terpenes.find(t => t.id === newTerpeneId)) {
      alert('このテルペンは既に追加されています');
      return;
    }
    setStrainData({
      ...strainData,
      terpenes: [...strainData.terpenes, { ...terpene, ratio: newTerpeneRatio }]
    });
    setNewTerpeneId('');
    setNewTerpeneRatio(0);
  };

  // テルペン削除
  const removeTerpeneFromStrain = (strainData, setStrainData, terpeneId) => {
    setStrainData({
      ...strainData,
      terpenes: strainData.terpenes.filter(t => t.id !== terpeneId)
    });
  };

  // テルペン比率更新
  const updateTerpeneRatio = (strainData, setStrainData, terpeneId, ratio) => {
    setStrainData({
      ...strainData,
      terpenes: strainData.terpenes.map(t => 
        t.id === terpeneId ? { ...t, ratio: parseFloat(ratio) || 0 } : t
      )
    });
  };

  // 効果追加
  const addEffectToStrain = (strainData, setStrainData) => {
    if (!newEffect.trim()) return;
    if (strainData.effects.includes(newEffect.trim())) {
      alert('この効果は既に追加されています');
      return;
    }
    setStrainData({
      ...strainData,
      effects: [...strainData.effects, newEffect.trim()]
    });
    setNewEffect('');
  };

  // 効果削除
  const removeEffectFromStrain = (strainData, setStrainData, effect) => {
    setStrainData({
      ...strainData,
      effects: strainData.effects.filter(e => e !== effect)
    });
  };

  // 品種追加
  const addStrain = () => {
    if (!newStrain.name.trim()) {
      alert('品種名を入力してください');
      return;
    }
    const strain = {
      ...newStrain,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleString('ja-JP')
    };
    setStrains([...strains, strain]);
    setNewStrain({
      name: '',
      type: 'hybrid',
      description: '',
      terpenes: [],
      effects: [],
      thcContent: '',
      cbdContent: ''
    });
    setShowAddForm(false);
  };

  // 品種更新
  const updateStrain = () => {
    if (!editingStrain.name.trim()) {
      alert('品種名を入力してください');
      return;
    }
    setStrains(strains.map(s => 
      s.id === editingStrain.id ? { ...editingStrain, updatedAt: new Date().toLocaleString('ja-JP') } : s
    ));
    setEditingStrain(null);
  };

  // 品種削除
  const deleteStrain = (strainId) => {
    if (confirm('この品種を削除しますか？')) {
      setStrains(strains.filter(s => s.id !== strainId));
    }
  };

  // 保存
  const handleSave = async () => {
    await onSave(strains);
    showNotification('✅ カンナビス品種データを保存しました', 'success');
    onClose();
  };

  // テルペン比率合計
  const getTerpeneTotal = (terpeneList) => {
    return terpeneList.reduce((sum, t) => sum + (t.ratio || 0), 0);
  };

  // フォームレンダリング
  const renderStrainForm = (strainData, setStrainData, isEditing = false) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-yellow-300 mb-2">🌿 品種名</label>
          <input
            type="text"
            value={strainData.name}
            onChange={(e) => setStrainData({ ...strainData, name: e.target.value })}
            className="psychedelic-input w-full px-4 py-2 rounded-lg"
            placeholder="例: OG Kush, Blue Dream..."
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-yellow-300 mb-2">🏷️ タイプ</label>
          <select
            value={strainData.type}
            onChange={(e) => setStrainData({ ...strainData, type: e.target.value })}
            className="psychedelic-input w-full px-4 py-2 rounded-lg"
          >
            <option value="indica">Indica（インディカ）</option>
            <option value="sativa">Sativa（サティバ）</option>
            <option value="hybrid">Hybrid（ハイブリッド）</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-yellow-300 mb-2">🔬 THC含有量</label>
          <input
            type="text"
            value={strainData.thcContent}
            onChange={(e) => setStrainData({ ...strainData, thcContent: e.target.value })}
            className="psychedelic-input w-full px-4 py-2 rounded-lg"
            placeholder="例: 18-24%"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-yellow-300 mb-2">💊 CBD含有量</label>
          <input
            type="text"
            value={strainData.cbdContent}
            onChange={(e) => setStrainData({ ...strainData, cbdContent: e.target.value })}
            className="psychedelic-input w-full px-4 py-2 rounded-lg"
            placeholder="例: <1%"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-yellow-300 mb-2">📝 説明</label>
        <textarea
          value={strainData.description}
          onChange={(e) => setStrainData({ ...strainData, description: e.target.value })}
          className="psychedelic-input w-full px-4 py-2 rounded-lg"
          rows={2}
          placeholder="品種の特徴や香りなど..."
        />
      </div>

      {/* テルペンプロファイル */}
      <div className="glass-panel rounded-xl p-4 border-2 border-green-500">
        <h4 className="text-lg font-bold text-green-300 mb-3">
          🌿 テルペンプロファイル 
          <span className={`ml-2 text-sm ${getTerpeneTotal(strainData.terpenes) === 100 ? 'text-green-400' : 'text-red-400'}`}>
            (合計: {getTerpeneTotal(strainData.terpenes)}%)
          </span>
        </h4>
        
        <div className="flex gap-2 mb-3">
          <select
            value={newTerpeneId}
            onChange={(e) => setNewTerpeneId(e.target.value)}
            className="psychedelic-input flex-1 px-3 py-2 rounded-lg"
          >
            <option value="">テルペンを選択...</option>
            {terpenes.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            max="100"
            value={newTerpeneRatio}
            onChange={(e) => setNewTerpeneRatio(parseFloat(e.target.value) || 0)}
            className="psychedelic-input w-20 px-3 py-2 rounded-lg text-center"
            placeholder="%"
          />
          <button
            onClick={() => addTerpeneToStrain(strainData, setStrainData)}
            className="gradient-button px-4 py-2 rounded-lg font-bold"
          >
            追加
          </button>
        </div>

        <div className="space-y-2">
          {strainData.terpenes.map(terpene => (
            <div key={terpene.id} className="flex items-center gap-2 bg-green-900 bg-opacity-30 rounded-lg p-2 border border-green-500">
              <span className="flex-1 text-white font-bold">{terpene.name}</span>
              <input
                type="number"
                min="0"
                max="100"
                value={terpene.ratio}
                onChange={(e) => updateTerpeneRatio(strainData, setStrainData, terpene.id, e.target.value)}
                className="psychedelic-input w-20 px-2 py-1 rounded text-center"
              />
              <span className="text-yellow-300">%</span>
              <button
                onClick={() => removeTerpeneFromStrain(strainData, setStrainData, terpene.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Icons.X size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 効果 */}
      <div className="glass-panel rounded-xl p-4 border-2 border-cyan-500">
        <h4 className="text-lg font-bold text-cyan-300 mb-3">✨ 効果</h4>
        
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newEffect}
            onChange={(e) => setNewEffect(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addEffectToStrain(strainData, setStrainData); } }}
            className="psychedelic-input flex-1 px-3 py-2 rounded-lg"
            placeholder="例: リラックス, 集中力向上..."
          />
          <button
            onClick={() => addEffectToStrain(strainData, setStrainData)}
            className="gradient-button px-4 py-2 rounded-lg font-bold"
          >
            追加
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {strainData.effects.map(effect => (
            <span key={effect} className="flex items-center gap-1 px-3 py-1 bg-cyan-900 bg-opacity-50 text-cyan-300 rounded-full border border-cyan-500">
              {effect}
              <button
                onClick={() => removeEffectFromStrain(strainData, setStrainData, effect)}
                className="text-red-400 hover:text-red-300"
              >
                <Icons.X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="glass-panel rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto neon-border">
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-5 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="text-3xl font-bold">🍃 カンナビス品種データベース</h2>
          <button onClick={onClose} className="text-white hover:text-yellow-300">
            <Icons.X size={28} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 検索・追加ボタン */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-3 text-pink-400">{Icons.Search()}</div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="品種名で検索..."
                className="psychedelic-input w-full pl-10 pr-4 py-3 rounded-lg"
              />
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="gradient-button px-6 py-3 rounded-lg font-bold flex items-center gap-2"
            >
              {Icons.Plus()} 新規品種
            </button>
          </div>

          {/* 新規追加フォーム */}
          {showAddForm && (
            <div className="glass-panel rounded-xl p-6 border-2 border-yellow-500">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">➕ 新規品種を追加</h3>
              {renderStrainForm(newStrain, setNewStrain)}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 glass-panel text-pink-300 rounded-lg border-2 border-pink-500 font-bold"
                >
                  キャンセル
                </button>
                <button
                  onClick={addStrain}
                  className="flex-1 px-4 py-2 gradient-button rounded-lg font-bold"
                >
                  追加
                </button>
              </div>
            </div>
          )}

          {/* 品種リスト */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-300">
              📋 登録済み品種 ({filteredStrains.length}/{strains.length})
            </h3>
            
            {filteredStrains.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStrains.map(strain => (
                  <div key={strain.id} className="glass-panel rounded-xl p-4 border-2 border-green-500">
                    {editingStrain?.id === strain.id ? (
                      <div>
                        {renderStrainForm(editingStrain, setEditingStrain, true)}
                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() => setEditingStrain(null)}
                            className="flex-1 px-4 py-2 glass-panel text-pink-300 rounded-lg border-2 border-pink-500 font-bold"
                          >
                            キャンセル
                          </button>
                          <button
                            onClick={updateStrain}
                            className="flex-1 px-4 py-2 gradient-button rounded-lg font-bold"
                          >
                            更新
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-xl font-bold text-white">{strain.name}</h4>
                            {strain.aliases && strain.aliases.length > 0 && (
                              <p className="text-xs text-gray-400 mt-0.5">別名: {strain.aliases.join(', ')}</p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                                strain.type === 'indica' ? 'bg-purple-900 text-purple-300' :
                                strain.type === 'sativa' ? 'bg-orange-900 text-orange-300' :
                                'bg-green-900 text-green-300'
                              }`}>
                                {strain.type === 'indica' ? 'Indica' : strain.type === 'sativa' ? 'Sativa' : 'Hybrid'}
                              </span>
                              {strain.breeder && (
                                <span className="text-xs text-gray-400">by {strain.breeder}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingStrain({ ...strain })}
                              className="text-yellow-300 hover:text-yellow-400"
                            >
                              <Icons.Edit2 />
                            </button>
                            <button
                              onClick={() => deleteStrain(strain.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Icons.Trash2 />
                            </button>
                          </div>
                        </div>

                        {/* 系譜 */}
                        {strain.lineage && (
                          <div className="mb-3 p-2 bg-indigo-900 bg-opacity-30 rounded-lg border border-indigo-500 border-opacity-30">
                            <p className="text-xs text-indigo-300 font-bold mb-1">🧬 系譜:</p>
                            <p className="text-xs text-gray-300">{strain.lineage.parent1} × {strain.lineage.parent2}</p>
                          </div>
                        )}

                        {strain.description && (
                          <p className="text-gray-300 text-sm mb-3">{strain.description}</p>
                        )}

                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          {strain.thcContent && (
                            <div><span className="text-yellow-300">THC:</span> <span className="text-white">{strain.thcContent}</span></div>
                          )}
                          {strain.cbdContent && (
                            <div><span className="text-cyan-300">CBD:</span> <span className="text-white">{strain.cbdContent}</span></div>
                          )}
                        </div>

                        {strain.terpenes && strain.terpenes.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs text-green-300 font-bold mb-1">🌿 テルペン:</p>
                            <div className="flex flex-wrap gap-1">
                              {strain.terpenes.map(t => (
                                <span key={t.id} className="px-2 py-1 bg-green-900 bg-opacity-50 text-green-300 rounded text-xs" title={t.note || ''}>
                                  {t.name} {t.ratio}%
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* フレーバープロファイル */}
                        {strain.flavorProfile && (
                          <div className="mb-3">
                            <p className="text-xs text-amber-300 font-bold mb-1">👅 フレーバー:</p>
                            <div className="flex flex-wrap gap-1">
                              {(strain.flavorProfile.primary || []).map(f => (
                                <span key={f} className="px-2 py-1 bg-amber-900 bg-opacity-50 text-amber-300 rounded text-xs">{f}</span>
                              ))}
                              {(strain.flavorProfile.secondary || []).map(f => (
                                <span key={f} className="px-2 py-1 bg-amber-900 bg-opacity-30 text-amber-200 rounded text-xs">{f}</span>
                              ))}
                              {(strain.flavorProfile.spice || []).map(f => (
                                <span key={f} className="px-2 py-1 bg-red-900 bg-opacity-30 text-red-300 rounded text-xs">🌶️{f}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {strain.effects && strain.effects.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs text-cyan-300 font-bold mb-1">✨ 効果:</p>
                            <div className="flex flex-wrap gap-1">
                              {strain.effects.map(e => (
                                <span key={e} className="px-2 py-1 bg-cyan-900 bg-opacity-50 text-cyan-300 rounded text-xs">
                                  {e}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 医療用途 */}
                        {strain.medicalUses && strain.medicalUses.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs text-pink-300 font-bold mb-1">💊 医療用途:</p>
                            <div className="flex flex-wrap gap-1">
                              {strain.medicalUses.map(m => (
                                <span key={m} className="px-2 py-1 bg-pink-900 bg-opacity-40 text-pink-300 rounded text-xs">{m}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* VAPE調合情報 */}
                        {strain.vapeFormulation && (
                          <div className="mb-3 p-2 bg-purple-900 bg-opacity-30 rounded-lg border border-purple-500 border-opacity-30">
                            <p className="text-xs text-purple-300 font-bold mb-1">💨 VAPE調合:</p>
                            <p className="text-xs text-gray-300">{strain.vapeFormulation.profileType} | {strain.vapeFormulation.recommendedUse}</p>
                            {strain.vapeFormulation.note && (
                              <p className="text-xs text-gray-400 mt-1">{strain.vapeFormulation.note}</p>
                            )}
                          </div>
                        )}

                        {/* 受賞歴 */}
                        {strain.awards && strain.awards.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {strain.awards.map(a => (
                              <span key={a} className="px-2 py-1 bg-yellow-900 bg-opacity-40 text-yellow-300 rounded text-xs">🏆 {a}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-pink-300 py-8">
                {searchQuery ? '検索結果が見つかりませんでした' : '品種が登録されていません'}
              </p>
            )}
          </div>

          {/* 保存・キャンセルボタン */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 glass-panel text-pink-300 rounded-lg border-2 border-pink-500 font-bold hover:text-white transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 gradient-button rounded-lg font-bold text-white"
            >
              💾 保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// StandardEffectsManager - 標準効能リスト管理
const StandardEffectsManager = ({ standardEffects, onClose, onSave, showNotification }) => {
  const [internalEffects, setInternalEffects] = useState([...standardEffects.internal]);
  const [topicalEffects, setTopicalEffects] = useState([...standardEffects.topical]);
  const [newInternalEffect, setNewInternalEffect] = useState('');
  const [newTopicalEffect, setNewTopicalEffect] = useState('');
  const [activeTab, setActiveTab] = useState('internal'); // 'internal' or 'topical'
  const [searchInternal, setSearchInternal] = useState('');
  const [searchTopical, setSearchTopical] = useState('');

  // 50音順にソート
  const sortedInternalEffects = [...internalEffects].sort((a, b) => a.localeCompare(b, 'ja'));
  const sortedTopicalEffects = [...topicalEffects].sort((a, b) => a.localeCompare(b, 'ja'));

  // 検索フィルター
  const filteredInternalEffects = sortedInternalEffects.filter(effect => 
    effect.toLowerCase().includes(searchInternal.toLowerCase())
  );
  const filteredTopicalEffects = sortedTopicalEffects.filter(effect => 
    effect.toLowerCase().includes(searchTopical.toLowerCase())
  );

  const addInternalEffect = () => {
    if (!newInternalEffect.trim()) {
      alert('効能を入力してください');
      return;
    }
    if (internalEffects.includes(newInternalEffect.trim())) {
      alert('この効能は既に登録されています');
      return;
    }
    setInternalEffects([...internalEffects, newInternalEffect.trim()]);
    setNewInternalEffect('');
  };

  const addTopicalEffect = () => {
    if (!newTopicalEffect.trim()) {
      alert('効能を入力してください');
      return;
    }
    if (topicalEffects.includes(newTopicalEffect.trim())) {
      alert('この効能は既に登録されています');
      return;
    }
    setTopicalEffects([...topicalEffects, newTopicalEffect.trim()]);
    setNewTopicalEffect('');
  };

  const deleteInternalEffect = (effect) => {
    if (confirm(`「${effect}」を削除しますか？`)) {
      setInternalEffects(internalEffects.filter(e => e !== effect));
    }
  };

  const deleteTopicalEffect = (effect) => {
    if (confirm(`「${effect}」を削除しますか？`)) {
      setTopicalEffects(topicalEffects.filter(e => e !== effect));
    }
  };

  const handleSave = async () => {
    await onSave({ internal: internalEffects, topical: topicalEffects });
    showNotification('✅ 標準効能リストを保存しました', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="glass-panel rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto neon-border">
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-5 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-3xl font-bold">📋 標準効能リスト管理</h2>
          <button onClick={onClose} className="text-white hover:text-yellow-300">
            <Icons.X size={28} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* タブ切り替え */}
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab('internal')}
              className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'internal'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                  : 'glass-panel text-cyan-300 hover:text-white'
              }`}
            >
              💊 内服効果 ({internalEffects.length})
            </button>
            <button
              onClick={() => setActiveTab('topical')}
              className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'topical'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                  : 'glass-panel text-green-300 hover:text-white'
              }`}
            >
              🧴 外用効果 ({topicalEffects.length})
            </button>
          </div>

          {/* 内服効果 */}
          {activeTab === 'internal' && (
            <div className="space-y-6">
              {/* 新規追加 */}
              <div className="glass-panel rounded-xl p-6 border-2 border-cyan-500">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">➕ 内服効果を追加</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newInternalEffect}
                    onChange={(e) => setNewInternalEffect(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addInternalEffect(); } }}
                    placeholder="例: 消化促進, 鎮静作用, 血流改善"
                    className="psychedelic-input flex-1 px-4 py-3 rounded-lg"
                  />
                  <button
                    onClick={addInternalEffect}
                    className="gradient-button px-6 py-3 rounded-lg font-bold"
                  >
                    追加
                  </button>
                </div>
              </div>

              {/* 検索ボックス */}
              <div className="glass-panel rounded-xl p-4 border-2 border-yellow-500">
                <div className="flex items-center gap-3">
                  <div className="text-yellow-300">{Icons.Search()}</div>
                  <input
                    type="text"
                    value={searchInternal}
                    onChange={(e) => setSearchInternal(e.target.value)}
                    placeholder="🔍 内服効果を検索..."
                    className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                  />
                  {searchInternal && (
                    <button
                      onClick={() => setSearchInternal('')}
                      className="text-yellow-300 hover:text-white"
                    >
                      <Icons.X size={20} />
                    </button>
                  )}
                </div>
                {searchInternal && (
                  <p className="text-sm text-yellow-200 mt-2">
                    {filteredInternalEffects.length} 件見つかりました
                  </p>
                )}
              </div>

              {/* 既存の効能リスト */}
              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-4">
                  📋 登録済み内服効果（50音順）- {filteredInternalEffects.length}/{internalEffects.length} 件
                </h3>
                <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto">
                  {filteredInternalEffects.length > 0 ? (
                    filteredInternalEffects.map(effect => (
                      <span key={effect} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full border-2 border-cyan-300">
                        <span className="font-bold">{effect}</span>
                        <button
                          onClick={() => deleteInternalEffect(effect)}
                          className="text-white hover:text-red-300 transition-colors"
                        >
                          <Icons.X size={16} />
                        </button>
                      </span>
                    ))
                  ) : (
                    <p className="text-pink-300 text-center w-full py-4">
                      {searchInternal ? '検索結果が見つかりませんでした' : '効能が登録されていません'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 外用効果 */}
          {activeTab === 'topical' && (
            <div className="space-y-6">
              {/* 新規追加 */}
              <div className="glass-panel rounded-xl p-6 border-2 border-green-500">
                <h3 className="text-2xl font-bold text-green-300 mb-4">➕ 外用効果を追加</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newTopicalEffect}
                    onChange={(e) => setNewTopicalEffect(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTopicalEffect(); } }}
                    placeholder="例: 保湿効果, 創傷治癒促進, 抗菌作用"
                    className="psychedelic-input flex-1 px-4 py-3 rounded-lg"
                  />
                  <button
                    onClick={addTopicalEffect}
                    className="gradient-button px-6 py-3 rounded-lg font-bold"
                  >
                    追加
                  </button>
                </div>
              </div>

              {/* 検索ボックス */}
              <div className="glass-panel rounded-xl p-4 border-2 border-yellow-500">
                <div className="flex items-center gap-3">
                  <div className="text-yellow-300">{Icons.Search()}</div>
                  <input
                    type="text"
                    value={searchTopical}
                    onChange={(e) => setSearchTopical(e.target.value)}
                    placeholder="🔍 外用効果を検索..."
                    className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                  />
                  {searchTopical && (
                    <button
                      onClick={() => setSearchTopical('')}
                      className="text-yellow-300 hover:text-white"
                    >
                      <Icons.X size={20} />
                    </button>
                  )}
                </div>
                {searchTopical && (
                  <p className="text-sm text-yellow-200 mt-2">
                    {filteredTopicalEffects.length} 件見つかりました
                  </p>
                )}
              </div>

              {/* 既存の効能リスト */}
              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-4">
                  📋 登録済み外用効果（50音順）- {filteredTopicalEffects.length}/{topicalEffects.length} 件
                </h3>
                <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto">
                  {filteredTopicalEffects.length > 0 ? (
                    filteredTopicalEffects.map(effect => (
                      <span key={effect} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full border-2 border-green-300">
                        <span className="font-bold">{effect}</span>
                        <button
                          onClick={() => deleteTopicalEffect(effect)}
                          className="text-white hover:text-red-300 transition-colors"
                        >
                          <Icons.X size={16} />
                        </button>
                      </span>
                    ))
                  ) : (
                    <p className="text-pink-300 text-center w-full py-4">
                      {searchTopical ? '検索結果が見つかりませんでした' : '効能が登録されていません'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 保存・キャンセルボタン */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 glass-panel text-pink-300 rounded-lg border-2 border-pink-500 font-bold hover:text-white transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 gradient-button rounded-lg font-bold text-white"
            >
              💾 保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HerbModal = ({ herb, apiKey, geminiApiKey, aiProvider, standardEffects, onClose, onSave, onSaveStandardEffects }) => {
  const [formData, setFormData] = useState(
    herb ? {
      ...herb,
      origin: herb.origin || '',
      image: herb.image || null,
      comment: herb.comment || '',
      topicalEffects: herb.topicalEffects || [],
      components: {
        hydrophilic: herb.components?.hydrophilic || [],
        lipophilic: herb.components?.lipophilic || [],
        phDependent: herb.components?.phDependent || []
      },
      receptors: {
        hydrophilic: herb.receptors?.hydrophilic || [],
        lipophilic: herb.receptors?.lipophilic || [],
        phDependent: herb.receptors?.phDependent || []
      }
    } : {
      name: '', scientificName: '', origin: '', image: null, comment: '', usedParts: [], effects: [], topicalEffects: [], sideEffects: [],
      components: { hydrophilic: [], lipophilic: [], phDependent: [] },
      receptors: { hydrophilic: [], lipophilic: [], phDependent: [] },
      bodyParts: []
    }
  );
  const [newItem, setNewItem] = useState({
    usedParts: '', effects: '', topicalEffects: '', sideEffects: '', hydrophilic: '', lipophilic: '', phDependent: '', bodyParts: '',
    receptorHydrophilic: '', receptorLipophilic: '', receptorPhDependent: ''
  });
  const [isConsulting, setIsConsulting] = useState(false);
  const [consultError, setConsultError] = useState(null);
  const [effectSearchQuery, setEffectSearchQuery] = useState('');
  const [topicalEffectSearchQuery, setTopicalEffectSearchQuery] = useState('');
  const [showAddEffectConfirm, setShowAddEffectConfirm] = useState(false);
  const [showAddTopicalEffectConfirm, setShowAddTopicalEffectConfirm] = useState(false);

  // クリーンアップ: モーダルが閉じられる時に状態をリセット
  React.useEffect(() => {
    console.log('🌿 HerbModal mounted');
    return () => {
      console.log('🌿 HerbModal unmounted - cleaning up');
      setIsConsulting(false);
      setConsultError(null);
    };
  }, []);

  const consultAI = async () => {
    if (!formData.scientificName.trim()) {
      alert('学名を入力してください');
      return;
    }

    setIsConsulting(true);
    setConsultError(null);

    const prompt = `学名が「${formData.scientificName}」の薬草について、以下の情報をJSON形式で教えてください。存在しない植物の場合は、errorフィールドに理由を含めてください。

回答は必ず以下のJSON形式のみで返してください（マークダウンや説明文は不要）:

{
  "name": "日本語の一般名（カタカナまたは漢字）",
  "origin": "原産国・原産地（例: ヨーロッパ, 地中海沿岸, 北アメリカ, 中国, インド等）",
  "usedParts": ["使用部位の配列（例: 花, 葉, 根, 茎, 種子）"],
  "effects": ["主な効果・効能の配列（5-8個、具体的に、内服時の効果）"],
  "topicalEffects": ["外用（皮膚）効果の配列（3-5個、例: 抗炎症, 創傷治癒, 保湿, 抗菌, かゆみ止め, 美白）"],
  "sideEffects": ["副作用や注意事項の配列（3-5個）"],
  "components": {
    "hydrophilic": ["親水性成分の配列（3-5個）"],
    "lipophilic": ["疎水性成分の配列（3-5個）"],
    "phDependent": ["pHで親水性と疎水性が変化する成分の配列（アルカロイド、有機酸など。ない場合は空配列）"]
  },
  "receptors": {
    "hydrophilic": ["親水性成分が作用する脳受容体の配列（例: GABA-A受容体, セロトニン受容体, ドーパミン受容体）"],
    "lipophilic": ["疎水性成分が作用する脳受容体の配列（例: CB1受容体, CB2受容体, TRPV1受容体）"],
    "phDependent": ["pH依存性成分が作用する脳受容体の配列"]
  },
  "bodyParts": ["効果がある身体部位の配列（例: 頭部, 消化器系, 神経系, 呼吸器系, 循環器系, 免疫系, 筋肉系, 泌尿器系, 生殖器系, 皮膚）"]
}

主な受容体の例:
- GABA-A受容体（抑制性神経伝達）
- セロトニン受容体（5-HT1A, 5-HT2A等）
- ドーパミン受容体（D1-D5）
- CB1/CB2受容体（カンナビノイド）
- TRPV1受容体（カプサイシン）
- アデノシン受容体
- グルタミン酸受容体（NMDA, AMPA）

存在しない植物の場合:
{
  "error": "この学名の植物は見つかりませんでした"
}`;

    try {
      const herbInfo = await callAI({ prompt, aiProvider, apiKey, geminiApiKey, maxTokens: 2048 });
      console.log('Parsed herb info:', herbInfo);

      if (herbInfo.error) {
        setConsultError(herbInfo.error);
        setIsConsulting(false);
        return;
      }

      // フォームに自動入力
      setFormData({
        ...formData,
        name: herbInfo.name || formData.name,
        origin: herbInfo.origin || '',
        usedParts: herbInfo.usedParts || [],
        effects: herbInfo.effects || [],
        topicalEffects: herbInfo.topicalEffects || [],
        sideEffects: herbInfo.sideEffects || [],
        components: {
          hydrophilic: herbInfo.components?.hydrophilic || [],
          lipophilic: herbInfo.components?.lipophilic || [],
          phDependent: herbInfo.components?.phDependent || []
        },
        receptors: {
          hydrophilic: herbInfo.receptors?.hydrophilic || [],
          lipophilic: herbInfo.receptors?.lipophilic || [],
          phDependent: herbInfo.receptors?.phDependent || []
        },
        bodyParts: herbInfo.bodyParts || []
      });

      setIsConsulting(false);
      const aiName = aiProvider === 'gemini' ? 'Gemini' : 'Claude';
      alert(`✨ ${aiName}から情報を取得しました！内容を確認して、必要に応じて編集してください。`);

    } catch (error) {
      console.error('AI相談エラー:', error);
      setConsultError('情報の取得に失敗しました。学名またはAPIキーを確認してください。');
      setIsConsulting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.scientificName) {
      alert('名称と学名は必須です');
      return;
    }
    onSave(formData);
    onClose();
  };

  const addArrayItem = (field, value) => {
    console.log('🔧 addArrayItem called:', { field, value });
    if (!value.trim()) {
      console.log('  ⚠️ Empty value, skipping');
      return;
    }
    
    if (field === 'hydrophilic' || field === 'lipophilic' || field === 'phDependent') {
      console.log('  → Adding to components:', field);
      setFormData({
        ...formData,
        components: { ...formData.components, [field]: [...formData.components[field], value.trim()] }
      });
    } else if (field === 'receptorHydrophilic' || field === 'receptorLipophilic' || field === 'receptorPhDependent') {
      // receptorHydrophilic -> hydrophilic
      // receptorLipophilic -> lipophilic
      // receptorPhDependent -> phDependent
      let receptorKey;
      if (field === 'receptorHydrophilic') {
        receptorKey = 'hydrophilic';
      } else if (field === 'receptorLipophilic') {
        receptorKey = 'lipophilic';
      } else if (field === 'receptorPhDependent') {
        receptorKey = 'phDependent';
      }
      console.log('  → Adding to receptors:', receptorKey);
      console.log('  → Current receptors:', formData.receptors);
      const updatedReceptors = { ...formData.receptors, [receptorKey]: [...formData.receptors[receptorKey], value.trim()] };
      console.log('  → Updated receptors:', updatedReceptors);
      setFormData({
        ...formData,
        receptors: updatedReceptors
      });
    } else {
      console.log('  → Adding to simple field:', field);
      setFormData({ ...formData, [field]: [...formData[field], value.trim()] });
    }
    setNewItem({ ...newItem, [field]: '' });
    console.log('  ✅ Item added');
  };

  const removeArrayItem = (field, index) => {
    if (field === 'hydrophilic' || field === 'lipophilic' || field === 'phDependent') {
      setFormData({
        ...formData,
        components: { ...formData.components, [field]: formData.components[field].filter((_, i) => i !== index) }
      });
    } else if (field === 'receptorHydrophilic' || field === 'receptorLipophilic' || field === 'receptorPhDependent') {
      // receptorHydrophilic -> hydrophilic
      // receptorLipophilic -> lipophilic
      // receptorPhDependent -> phDependent
      let receptorKey;
      if (field === 'receptorHydrophilic') {
        receptorKey = 'hydrophilic';
      } else if (field === 'receptorLipophilic') {
        receptorKey = 'lipophilic';
      } else if (field === 'receptorPhDependent') {
        receptorKey = 'phDependent';
      }
      setFormData({
        ...formData,
        receptors: { ...formData.receptors, [receptorKey]: formData.receptors[receptorKey].filter((_, i) => i !== index) }
      });
    } else {
      setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="glass-panel rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto neon-border">
        <div className="sticky top-0 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-5 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-3xl font-bold">{herb ? '🌿 薬草を編集' : '✨ 薬草を追加'}</h2>
          <button onClick={onClose} className="text-white hover:text-yellow-300">
            <Icons.X size={28} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-yellow-300 mb-2">名称 *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="psychedelic-input w-full px-4 py-2 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-yellow-300 mb-2">学名 *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.scientificName}
                  onChange={(e) => setFormData({ ...formData, scientificName: e.target.value })}
                  className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={consultAI}
                  disabled={isConsulting || !formData.scientificName.trim()}
                  className="gradient-button px-4 py-2 rounded-lg font-bold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  title={`${aiProvider === 'gemini' ? 'Gemini' : 'Claude'}に相談して情報を自動入力`}
                >
                  {isConsulting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span className="text-sm">相談中...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-lg">{aiProvider === 'gemini' ? '✨' : '🤖'}</span>
                      <span className="text-sm">{aiProvider === 'gemini' ? 'Gemini' : 'Claude'} に相談</span>
                    </>
                  )}
                </button>
              </div>
              {consultError && (
                <p className="text-red-400 text-xs mt-1">⚠️ {consultError}</p>
              )}
            </div>

            {/* 原産国 */}
            <div>
              <label className="block text-sm font-bold text-cyan-300 mb-2">🌍 原産国・原産地（任意）</label>
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                className="psychedelic-input w-full px-4 py-2 rounded-lg"
                placeholder="例: ヨーロッパ、地中海沿岸、北アメリカ"
              />
            </div>

            {/* 画像アップロード */}
            <div>
              <label className="block text-sm font-bold text-green-300 mb-2">📷 薬草の画像（任意）</label>
              <div className="space-y-3">
                {formData.image ? (
                  <div className="relative">
                    <img 
                      src={formData.image} 
                      alt="薬草プレビュー"
                      className="w-full h-64 object-cover rounded-lg border-2 border-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: null })}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors"
                      title="画像を削除"
                    >
                      <Icons.X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-green-500 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, image: reader.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="image-upload"
                    />
                    <label 
                      htmlFor="image-upload"
                      className="cursor-pointer block"
                    >
                      <div className="text-6xl mb-2">🌿</div>
                      <p className="text-green-300 font-bold mb-1">クリックして画像を選択</p>
                      <p className="text-xs text-gray-400">JPG, PNG, GIF など</p>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {[
            { field: 'usedParts', label: '使用部位', placeholder: '例: 花, 葉, 根' },
            { field: 'effects', label: '効果（内服）', placeholder: '例: 抗炎症作用, 鎮痛作用' },
            { field: 'topicalEffects', label: '🧴 外用（皮膚）効果', placeholder: '例: 創傷治癒, 保湿, 抗菌' },
            { field: 'sideEffects', label: '副作用・注意事項', placeholder: '例: 妊娠中は注意' },
            { field: 'bodyParts', label: '効果部位', placeholder: '例: 頭部, 消化器系, 神経系' }
          ].map(({ field, label, placeholder }) => (
            <div key={field}>
              <label className="block text-sm font-bold text-yellow-300 mb-2">{label}</label>
              
              {/* 効能の場合は標準リストから選択可能に */}
              {field === 'effects' && (
                <details className="glass-panel rounded-lg p-3 mb-2 border border-cyan-500">
                  <summary className="cursor-pointer text-cyan-300 font-bold text-sm">💡 標準効能から選択</summary>
                  <div className="mt-3">
                    {/* 検索バー */}
                    <div className="relative mb-3">
                      <div className="absolute left-3 top-2.5 text-cyan-400">{Icons.Search()}</div>
                      <input
                        type="text"
                        value={effectSearchQuery}
                        onChange={(e) => { setEffectSearchQuery(e.target.value); setShowAddEffectConfirm(false); }}
                        placeholder="効能を検索..."
                        className="psychedelic-input w-full pl-10 pr-10 py-2 rounded-lg text-sm"
                      />
                      {effectSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setEffectSearchQuery('')}
                          className="absolute right-3 top-2.5 text-pink-400 hover:text-pink-300"
                        >
                          <Icons.X size={16} />
                        </button>
                      )}
                    </div>
                    {/* 検索結果カウント */}
                    {effectSearchQuery && (
                      <p className="text-xs text-cyan-300 mb-2">
                        {(standardEffects?.internal || STANDARD_EFFECTS)
                          .filter(effect => !formData.effects.includes(effect))
                          .filter(effect => effect.toLowerCase().includes(effectSearchQuery.toLowerCase())).length}件見つかりました
                      </p>
                    )}
                    {/* 効能リスト */}
                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                      {(standardEffects?.internal || STANDARD_EFFECTS)
                        .filter(effect => !formData.effects.includes(effect))
                        .filter(effect => effectSearchQuery === '' || effect.toLowerCase().includes(effectSearchQuery.toLowerCase()))
                        .map(effect => (
                        <button
                          key={effect}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, effects: [...formData.effects, effect] });
                          }}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full text-xs font-bold hover:from-cyan-700 hover:to-blue-700 transition-all"
                        >
                          + {effect}
                        </button>
                      ))}
                      {effectSearchQuery && (standardEffects?.internal || STANDARD_EFFECTS)
                        .filter(effect => !formData.effects.includes(effect))
                        .filter(effect => effect.toLowerCase().includes(effectSearchQuery.toLowerCase())).length === 0 && (
                        <div className="w-full text-center py-2">
                          <p className="text-pink-300 text-sm mb-2">検索結果が見つかりませんでした</p>
                          {!showAddEffectConfirm ? (
                            <button
                              type="button"
                              onClick={() => setShowAddEffectConfirm(true)}
                              className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg text-xs font-bold hover:from-yellow-700 hover:to-orange-700 transition-all"
                            >
                              ＋ 「{effectSearchQuery}」を標準効能リストに追加
                            </button>
                          ) : (
                            <div className="glass-panel rounded-lg p-3 border border-yellow-500">
                              <p className="text-yellow-300 text-sm font-bold mb-3">
                                「{effectSearchQuery}」は標準効能にないためリスト追加しますか？
                              </p>
                              <div className="flex gap-3 justify-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newEffect = effectSearchQuery.trim();
                                    if (newEffect && onSaveStandardEffects) {
                                      const updatedEffects = {
                                        ...standardEffects,
                                        internal: [...(standardEffects?.internal || STANDARD_EFFECTS), newEffect].sort()
                                      };
                                      onSaveStandardEffects(updatedEffects);
                                      setFormData({ ...formData, effects: [...formData.effects, newEffect] });
                                      setEffectSearchQuery('');
                                      setShowAddEffectConfirm(false);
                                    }
                                  }}
                                  className="px-5 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm font-bold hover:from-green-700 hover:to-emerald-700 transition-all"
                                >
                                  ✅ はい
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setShowAddEffectConfirm(false)}
                                  className="px-5 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg text-sm font-bold hover:from-gray-700 hover:to-gray-800 transition-all"
                                >
                                  ❌ いいえ
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              )}
              
              {/* 外用効果の場合も標準リストから選択可能に */}
              {field === 'topicalEffects' && (
                <details className="glass-panel rounded-lg p-3 mb-2 border border-green-500">
                  <summary className="cursor-pointer text-green-300 font-bold text-sm">💡 標準外用効果から選択</summary>
                  <div className="mt-3">
                    {/* 検索バー */}
                    <div className="relative mb-3">
                      <div className="absolute left-3 top-2.5 text-green-400">{Icons.Search()}</div>
                      <input
                        type="text"
                        value={topicalEffectSearchQuery}
                        onChange={(e) => { setTopicalEffectSearchQuery(e.target.value); setShowAddTopicalEffectConfirm(false); }}
                        placeholder="外用効果を検索..."
                        className="psychedelic-input w-full pl-10 pr-10 py-2 rounded-lg text-sm"
                      />
                      {topicalEffectSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setTopicalEffectSearchQuery('')}
                          className="absolute right-3 top-2.5 text-pink-400 hover:text-pink-300"
                        >
                          <Icons.X size={16} />
                        </button>
                      )}
                    </div>
                    {/* 検索結果カウント */}
                    {topicalEffectSearchQuery && (
                      <p className="text-xs text-green-300 mb-2">
                        {(standardEffects?.topical || STANDARD_TOPICAL_EFFECTS)
                          .filter(effect => !formData.topicalEffects.includes(effect))
                          .filter(effect => effect.toLowerCase().includes(topicalEffectSearchQuery.toLowerCase())).length}件見つかりました
                      </p>
                    )}
                    {/* 効能リスト */}
                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                      {(standardEffects?.topical || STANDARD_TOPICAL_EFFECTS)
                        .filter(effect => !formData.topicalEffects.includes(effect))
                        .filter(effect => topicalEffectSearchQuery === '' || effect.toLowerCase().includes(topicalEffectSearchQuery.toLowerCase()))
                        .map(effect => (
                        <button
                          key={effect}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, topicalEffects: [...formData.topicalEffects, effect] });
                          }}
                          className="px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-xs font-bold hover:from-green-700 hover:to-emerald-700 transition-all"
                        >
                          + {effect}
                        </button>
                      ))}
                      {topicalEffectSearchQuery && (standardEffects?.topical || STANDARD_TOPICAL_EFFECTS)
                        .filter(effect => !formData.topicalEffects.includes(effect))
                        .filter(effect => effect.toLowerCase().includes(topicalEffectSearchQuery.toLowerCase())).length === 0 && (
                        <div className="w-full text-center py-2">
                          <p className="text-pink-300 text-sm mb-2">検索結果が見つかりませんでした</p>
                          {!showAddTopicalEffectConfirm ? (
                            <button
                              type="button"
                              onClick={() => setShowAddTopicalEffectConfirm(true)}
                              className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg text-xs font-bold hover:from-yellow-700 hover:to-orange-700 transition-all"
                            >
                              ＋ 「{topicalEffectSearchQuery}」を標準外用効果リストに追加
                            </button>
                          ) : (
                            <div className="glass-panel rounded-lg p-3 border border-yellow-500">
                              <p className="text-yellow-300 text-sm font-bold mb-3">
                                「{topicalEffectSearchQuery}」は標準外用効果にないためリスト追加しますか？
                              </p>
                              <div className="flex gap-3 justify-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newEffect = topicalEffectSearchQuery.trim();
                                    if (newEffect && onSaveStandardEffects) {
                                      const updatedEffects = {
                                        ...standardEffects,
                                        topical: [...(standardEffects?.topical || STANDARD_TOPICAL_EFFECTS), newEffect].sort()
                                      };
                                      onSaveStandardEffects(updatedEffects);
                                      setFormData({ ...formData, topicalEffects: [...formData.topicalEffects, newEffect] });
                                      setTopicalEffectSearchQuery('');
                                      setShowAddTopicalEffectConfirm(false);
                                    }
                                  }}
                                  className="px-5 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm font-bold hover:from-green-700 hover:to-emerald-700 transition-all"
                                >
                                  ✅ はい
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setShowAddTopicalEffectConfirm(false)}
                                  className="px-5 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg text-sm font-bold hover:from-gray-700 hover:to-gray-800 transition-all"
                                >
                                  ❌ いいえ
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              )}
              
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newItem[field]}
                  onChange={(e) => setNewItem({ ...newItem, [field]: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addArrayItem(field, newItem[field]); } }}
                  placeholder={placeholder}
                  className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => addArrayItem(field, newItem[field])}
                  className="gradient-button px-4 py-2 rounded-lg font-bold"
                >
                  {Icons.Plus()}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData[field].map((item, i) => (
                  <span key={i} className="flex items-center space-x-1 retro-badge">
                    <span className="text-sm">{item}</span>
                    <button type="button" onClick={() => removeArrayItem(field, i)} className="text-white hover:text-red-300">
                      <Icons.X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="space-y-4">
            <h3 className="font-bold text-yellow-300 text-xl">💊 主成分</h3>
            
            <div>
              <label className="block text-sm font-bold text-cyan-300 mb-2">💧 親水性成分</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newItem.hydrophilic}
                  onChange={(e) => setNewItem({ ...newItem, hydrophilic: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addArrayItem('hydrophilic', newItem.hydrophilic); } }}
                  placeholder="例: フラボノイド, タンニン"
                  className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => addArrayItem('hydrophilic', newItem.hydrophilic)}
                  className="gradient-button px-4 py-2 rounded-lg font-bold"
                >
                  {Icons.Plus()}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.components.hydrophilic.map((item, i) => (
                  <span key={i} className="flex items-center space-x-1 px-3 py-1 bg-cyan-900 bg-opacity-50 text-cyan-300 rounded-full border border-cyan-500">
                    <span className="text-sm">{item}</span>
                    <button type="button" onClick={() => removeArrayItem('hydrophilic', i)} className="text-cyan-300 hover:text-red-300">
                      <Icons.X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-orange-300 mb-2">🔥 疎水性成分</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newItem.lipophilic}
                  onChange={(e) => setNewItem({ ...newItem, lipophilic: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addArrayItem('lipophilic', newItem.lipophilic); } }}
                  placeholder="例: テルペン, 精油成分"
                  className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => addArrayItem('lipophilic', newItem.lipophilic)}
                  className="gradient-button px-4 py-2 rounded-lg font-bold"
                >
                  {Icons.Plus()}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.components.lipophilic.map((item, i) => (
                  <span key={i} className="flex items-center space-x-1 px-3 py-1 bg-orange-900 bg-opacity-50 text-orange-300 rounded-full border border-orange-500">
                    <span className="text-sm">{item}</span>
                    <button type="button" onClick={() => removeArrayItem('lipophilic', i)} className="text-orange-300 hover:text-red-300">
                      <Icons.X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2">⚗️ pH依存性成分（pHで親水性↔疎水性が変化）</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newItem.phDependent}
                  onChange={(e) => setNewItem({ ...newItem, phDependent: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addArrayItem('phDependent', newItem.phDependent); } }}
                  placeholder="例: カフェイン, アルカロイド, 有機酸"
                  className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => addArrayItem('phDependent', newItem.phDependent)}
                  className="gradient-button px-4 py-2 rounded-lg font-bold"
                >
                  {Icons.Plus()}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.components.phDependent.map((item, i) => (
                  <span key={i} className="flex items-center space-x-1 px-3 py-1 bg-purple-900 bg-opacity-50 text-purple-300 rounded-full border border-purple-500">
                    <span className="text-sm">{item}</span>
                    <button type="button" onClick={() => removeArrayItem('phDependent', i)} className="text-purple-300 hover:text-red-300">
                      <Icons.X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <p className="text-xs text-purple-200 mt-2 bg-purple-900 bg-opacity-20 p-2 rounded border border-purple-500">
                💡 アルカロイド（カフェイン、ニコチンなど）や有機酸など、pHによってイオン化し溶解性が変化する成分を入力してください。
              </p>
            </div>
          </div>

          {/* 脳受容体情報 */}
          <div className="space-y-4">
            <h3 className="font-bold text-yellow-300 text-xl">🧠 脳受容体への作用</h3>
            
            <div>
              <label className="block text-sm font-bold text-cyan-300 mb-2">💧 親水性成分が作用する受容体</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newItem.receptorHydrophilic}
                  onChange={(e) => setNewItem({ ...newItem, receptorHydrophilic: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addArrayItem('receptorHydrophilic', newItem.receptorHydrophilic); } }}
                  placeholder="例: GABA-A受容体, セロトニン5-HT1A受容体"
                  className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => addArrayItem('receptorHydrophilic', newItem.receptorHydrophilic)}
                  className="gradient-button px-4 py-2 rounded-lg font-bold"
                >
                  {Icons.Plus()}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.receptors.hydrophilic.map((item, i) => (
                  <span key={i} className="flex items-center space-x-1 px-3 py-1 bg-cyan-900 bg-opacity-70 text-cyan-200 rounded-full border border-cyan-400">
                    <span className="text-sm font-bold">{item}</span>
                    <button type="button" onClick={() => removeArrayItem('receptorHydrophilic', i)} className="text-cyan-200 hover:text-red-300">
                      <Icons.X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-orange-300 mb-2">🔥 疎水性成分が作用する受容体</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newItem.receptorLipophilic}
                  onChange={(e) => setNewItem({ ...newItem, receptorLipophilic: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addArrayItem('receptorLipophilic', newItem.receptorLipophilic); } }}
                  placeholder="例: CB1受容体, CB2受容体, TRPV1受容体"
                  className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => addArrayItem('receptorLipophilic', newItem.receptorLipophilic)}
                  className="gradient-button px-4 py-2 rounded-lg font-bold"
                >
                  {Icons.Plus()}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.receptors.lipophilic.map((item, i) => (
                  <span key={i} className="flex items-center space-x-1 px-3 py-1 bg-orange-900 bg-opacity-70 text-orange-200 rounded-full border border-orange-400">
                    <span className="text-sm font-bold">{item}</span>
                    <button type="button" onClick={() => removeArrayItem('receptorLipophilic', i)} className="text-orange-200 hover:text-red-300">
                      <Icons.X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2">⚗️ pH依存性成分が作用する受容体</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newItem.receptorPhDependent}
                  onChange={(e) => setNewItem({ ...newItem, receptorPhDependent: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addArrayItem('receptorPhDependent', newItem.receptorPhDependent); } }}
                  placeholder="例: アデノシン受容体, ドーパミンD2受容体"
                  className="psychedelic-input flex-1 px-4 py-2 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => addArrayItem('receptorPhDependent', newItem.receptorPhDependent)}
                  className="gradient-button px-4 py-2 rounded-lg font-bold"
                >
                  {Icons.Plus()}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.receptors.phDependent.map((item, i) => (
                  <span key={i} className="flex items-center space-x-1 px-3 py-1 bg-purple-900 bg-opacity-70 text-purple-200 rounded-full border border-purple-400">
                    <span className="text-sm font-bold">{item}</span>
                    <button type="button" onClick={() => removeArrayItem('receptorPhDependent', i)} className="text-purple-200 hover:text-red-300">
                      <Icons.X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* コメント・メモ欄 */}
            <div>
              <label className="block text-sm font-bold text-cyan-300 mb-2">💬 コメント・メモ</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="この薬草についてのメモ、入手先、使用経験、注意点など自由に記入できます"
                rows="4"
                className="psychedelic-input w-full px-4 py-3 rounded-lg resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">※ 自由記述欄です。栽培情報、保存方法、個人的な感想などを記録できます</p>
            </div>

            <div className="glass-panel rounded-xl p-4 border border-cyan-500">
              <div className="flex items-start space-x-2">
                <span className="text-2xl">🧠</span>
                <div className="flex-1 text-sm text-cyan-300">
                  <p className="font-bold mb-2">主な脳受容体の例</p>
                  <ul className="text-xs space-y-1">
                    <li>• <strong>GABA-A受容体</strong> - 抑制性神経伝達（鎮静、抗不安）</li>
                    <li>• <strong>セロトニン受容体</strong> (5-HT1A, 5-HT2A等) - 気分調節</li>
                    <li>• <strong>ドーパミン受容体</strong> (D1-D5) - 報酬系、運動制御</li>
                    <li>• <strong>CB1/CB2受容体</strong> - カンナビノイド受容体</li>
                    <li>• <strong>TRPV1受容体</strong> - カプサイシン受容体（痛み）</li>
                    <li>• <strong>アデノシン受容体</strong> - カフェインが拮抗</li>
                    <li>• <strong>NMDA受容体</strong> - 学習、記憶</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 glass-panel text-pink-300 rounded-xl border-2 border-pink-500 font-bold text-lg"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-4 gradient-button rounded-xl font-bold text-white text-lg"
            >
              {herb ? '💾 更新' : '✨ 追加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// アプリをレンダリング
console.log('🚀 Starting app render...');
console.log('Root element:', document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('Root created:', root);
root.render(<JivakaApp />);
console.log('✅ App rendered!');
