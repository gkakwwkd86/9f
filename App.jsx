import { useState } from "react";

const RECIPES = [
  {
    id: 1,
    name: "김치찌개",
    category: "찌개",
    emoji: "🍲",
    image: "https://images.unsplash.com/photo-1583224964978-2257b8a672ff?w=600&q=80",
    time: "30분",
    servings: "2인분",
    difficulty: "쉬움",
    description: "깊고 진한 국물의 한국 대표 찌개. 잘 익은 묵은지를 사용하면 더욱 맛있습니다.",
    ingredients: ["묵은 김치 300g", "돼지고기 삼겹살 200g", "두부 1/2모", "대파 1대", "고춧가루 1큰술", "다진 마늘 1큰술", "국간장 1큰술", "참기름 약간", "물 2컵"],
    steps: ["돼지고기를 먹기 좋은 크기로 썰고 김치도 적당히 자른다.", "냄비에 참기름을 두르고 돼지고기와 김치를 함께 볶는다.", "물 2컵을 붓고 센 불에서 끓인다.", "두부를 넣고 고춧가루, 다진 마늘, 국간장으로 간을 맞춘다.", "대파를 넣고 5분 더 끓이면 완성."],
    tags: ["한식", "찌개", "매운맛"]
  },
  {
    id: 2,
    name: "파스타 까르보나라",
    category: "파스타",
    emoji: "🍝",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80",
    time: "25분",
    servings: "2인분",
    difficulty: "보통",
    description: "크리미하고 부드러운 로마 전통 파스타. 계란 노른자와 파르메산 치즈의 황금 조합.",
    ingredients: ["스파게티 200g", "판체타(베이컨) 100g", "계란 노른자 3개", "파르메산 치즈 50g", "마늘 2쪽", "올리브오일 2큰술", "소금 적당량", "후추 넉넉히"],
    steps: ["파스타를 소금물에 알덴테로 삶는다.", "계란 노른자와 파르메산 치즈를 잘 섞어 소스를 만든다.", "팬에 올리브오일을 두르고 마늘과 판체타를 바삭하게 볶는다.", "불을 끄고 삶은 파스타와 면수 2큰술을 넣어 섞는다.", "계란 소스를 넣고 잔열로 부드럽게 버무린 후 후추를 뿌려 완성."],
    tags: ["양식", "파스타", "크리미"]
  },
  {
    id: 3,
    name: "된장찌개",
    category: "찌개",
    emoji: "🥘",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    time: "20분",
    servings: "2인분",
    difficulty: "쉬움",
    description: "구수하고 따뜻한 한국의 소울푸드. 신선한 채소와 두부가 어우러진 건강 찌개.",
    ingredients: ["된장 2큰술", "두부 1/2모", "애호박 1/2개", "버섯 50g", "감자 1개", "대파 1/2대", "마늘 2쪽", "멸치다시 2컵", "청양고추 1개"],
    steps: ["멸치다시로 육수를 준비한다.", "감자와 애호박을 먹기 좋은 크기로 썬다.", "육수에 된장을 풀고 감자를 먼저 넣어 끓인다.", "두부, 버섯, 애호박을 넣고 중불에서 익힌다.", "대파와 청양고추를 넣고 한 소끔 더 끓이면 완성."],
    tags: ["한식", "찌개", "건강식"]
  },
  {
    id: 4,
    name: "마르게리타 피자",
    category: "피자",
    emoji: "🍕",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&q=80",
    time: "40분",
    servings: "2인분",
    difficulty: "보통",
    description: "심플하지만 완벽한 나폴리 전통 피자. 신선한 토마토와 모짜렐라, 바질의 삼위일체.",
    ingredients: ["피자 도우 1장", "토마토소스 4큰술", "생모짜렐라 150g", "방울토마토 8개", "바질잎 한 줌", "올리브오일 2큰술", "소금 약간", "후추 약간"],
    steps: ["오븐을 250°C로 예열한다.", "도우에 토마토소스를 얇게 펴 바른다.", "모짜렐라를 손으로 뜯어 올리고 방울토마토를 반으로 잘라 올린다.", "올리브오일을 뿌리고 소금, 후추로 간을 한다.", "오븐에서 10~12분 굽고 신선한 바질잎을 올려 완성."],
    tags: ["양식", "피자", "이탈리안"]
  },
  {
    id: 5,
    name: "비빔밥",
    category: "밥",
    emoji: "🍚",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=80",
    time: "35분",
    servings: "1인분",
    difficulty: "쉬움",
    description: "다채로운 나물과 고추장이 어우러진 영양 만점 한국 전통 비빔밥.",
    ingredients: ["따뜻한 밥 1공기", "시금치 나물 50g", "콩나물 50g", "당근 1/4개", "계란 1개", "고추장 1.5큰술", "참기름 1큰술", "참깨 약간", "식용유 약간"],
    steps: ["시금치와 콩나물을 데쳐 각각 나물로 무친다.", "당근을 채 썰어 기름에 살짝 볶는다.", "계란 프라이를 반숙으로 만든다.", "따뜻한 밥 위에 나물들을 색깔별로 예쁘게 얹는다.", "계란 프라이, 고추장, 참기름을 넣고 맛있게 비비면 완성."],
    tags: ["한식", "밥", "건강식", "채식"]
  },
  {
    id: 6,
    name: "초코 브라우니",
    category: "디저트",
    emoji: "🍫",
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80",
    time: "45분",
    servings: "8조각",
    difficulty: "쉬움",
    description: "겉은 바삭, 속은 촉촉한 진한 초콜릿 브라우니. 초코 러버를 위한 완벽한 레시피.",
    ingredients: ["다크초콜릿 150g", "버터 100g", "설탕 150g", "계란 2개", "박력분 80g", "코코아파우더 2큰술", "바닐라에센스 1작은술", "소금 한 꼬집", "호두 50g(선택)"],
    steps: ["오븐을 180°C로 예열하고 틀에 버터를 바른다.", "초콜릿과 버터를 중탕으로 녹인다.", "설탕을 넣어 섞고 계란을 하나씩 넣으며 잘 혼합한다.", "박력분, 코코아파우더, 소금을 체 쳐서 접듯이 섞는다.", "틀에 부어 25~30분 굽고 식혀서 잘라 완성."],
    tags: ["디저트", "베이킹", "초콜릿"]
  },
  {
    id: 7,
    name: "제육볶음",
    category: "볶음",
    emoji: "🥩",
    image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=600&q=80",
    time: "25분",
    servings: "2인분",
    difficulty: "쉬움",
    description: "매콤달콤한 양념이 듬뿍 밴 돼지고기 볶음. 밥 한 그릇 뚝딱 비우는 국민 반찬.",
    ingredients: ["돼지고기 앞다리살 300g", "양파 1/2개", "대파 1/2대", "고추장 2큰술", "고춧가루 1큰술", "간장 1큰술", "설탕 1큰술", "다진 마늘 1큰술", "참기름 1큰술", "생강즙 약간", "깨소금 약간"],
    steps: ["돼지고기를 얇게 썰어 양념 재료와 30분 이상 재운다.", "양파와 대파를 적당한 크기로 썬다.", "달군 팬에 기름 없이 고기를 먼저 볶는다.", "고기가 반쯤 익으면 양파와 대파를 넣고 함께 볶는다.", "참기름과 깨소금을 뿌려 마무리하면 완성."],
    tags: ["한식", "볶음", "매운맛", "돼지고기"]
  },
  {
    id: 8,
    name: "그린 샐러드",
    category: "샐러드",
    emoji: "🥗",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    time: "15분",
    servings: "2인분",
    difficulty: "쉬움",
    description: "신선한 채소와 홈메이드 드레싱으로 만드는 건강하고 상큼한 그린 샐러드.",
    ingredients: ["혼합 채소 150g", "방울토마토 10개", "오이 1/2개", "아보카도 1개", "파마산 치즈 30g", "올리브오일 3큰술", "레몬즙 1.5큰술", "꿀 1작은술", "소금, 후추 적당량"],
    steps: ["채소를 깨끗이 씻어 물기를 제거한다.", "방울토마토는 반으로 자르고 오이는 반달 모양으로 썬다.", "아보카도는 껍질을 벗겨 적당히 썬다.", "드레싱 재료를 잘 섞어 유화시킨다.", "채소와 재료를 그릇에 담고 드레싱을 뿌려 완성."],
    tags: ["양식", "샐러드", "건강식", "채식"]
  }
];

const CATEGORIES = ["전체", ...Array.from(new Set(RECIPES.map(r => r.category)))];

const DIFFICULTY_COLOR = {
  "쉬움": { bg: "#E8F5E9", text: "#2E7D32" },
  "보통": { bg: "#FFF3E0", text: "#E65100" },
  "어려움": { bg: "#FCE4EC", text: "#C62828" }
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = RECIPES.filter(r => {
    const matchCat = selectedCategory === "전체" || r.category === selectedCategory;
    const matchSearch = r.name.includes(search) || r.tags.some(t => t.includes(search));
    return matchCat && matchSearch;
  });

  return (
    <div style={{ fontFamily: "'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", background: "#FAFAFA", minHeight: "100vh", color: "#1A1A2E" }}>
      <div style={{ background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)", padding: "20px 24px 24px", color: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 28 }}>📖</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.5px" }}>나만의 레시피 북</div>
              <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>My Recipe Book — {RECIPES.length}가지 요리</div>
            </div>
          </div>
          <div style={{ marginTop: 14, position: "relative" }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="메뉴명 또는 태그로 검색..." style={{ width: "100%", boxSizing: "border-box", padding: "11px 14px 11px 40px", borderRadius: 12, border: "none", fontSize: 14, background: "rgba(255,255,255,0.95)", outline: "none", fontFamily: "inherit" }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 60px" }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "16px 0 8px", scrollbarWidth: "none" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ flexShrink: 0, padding: "7px 16px", borderRadius: 20, border: `1.5px solid ${selectedCategory === cat ? "#FF6B35" : "#E0E0E0"}`, background: selectedCategory === cat ? "#FF6B35" : "#fff", color: selectedCategory === cat ? "#fff" : "#555", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit" }}>{cat}</button>
          ))}
        </div>
        <div style={{ fontSize: 13, color: "#999", marginBottom: 16, paddingTop: 4 }}>{filtered.length}가지 레시피</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
          {filtered.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />)}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🍽️</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>검색 결과가 없어요</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>다른 키워드로 검색해보세요</div>
          </div>
        )}
      </div>
      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
    </div>
  );
}

function RecipeCard({ recipe, onClick }) {
  const diffStyle = DIFFICULTY_COLOR[recipe.difficulty] || {};
  return (
    <div onClick={onClick} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.14)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)"; }}>
      <div style={{ position: "relative", height: 180, background: "#f5f5f5" }}>
        <img src={recipe.image} alt={recipe.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
        <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.45)", borderRadius: 8, padding: "3px 8px" }}><span style={{ color: "#fff", fontSize: 11, fontWeight: 600 }}>{recipe.category}</span></div>
        <div style={{ position: "absolute", bottom: 10, left: 10, fontSize: 28 }}>{recipe.emoji}</div>
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{recipe.name}</div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 10, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{recipe.description}</div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <InfoChip icon="⏱" text={recipe.time} />
          <InfoChip icon="👥" text={recipe.servings} />
          <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 6, background: diffStyle.bg, color: diffStyle.text }}>{recipe.difficulty}</span>
        </div>
      </div>
    </div>
  );
}

function InfoChip({ icon, text }) {
  return <span style={{ fontSize: 11, background: "#F5F5F5", borderRadius: 6, padding: "3px 8px", color: "#555", display: "flex", alignItems: "center", gap: 3 }}><span>{icon}</span><span>{text}</span></span>;
}

function RecipeModal({ recipe, onClose }) {
  const [activeTab, setActiveTab] = useState("ingredients");
  const diffStyle = DIFFICULTY_COLOR[recipe.difficulty] || {};
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 200 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 600, maxHeight: "92vh", overflowY: "auto", paddingBottom: 32 }} onClick={e => e.stopPropagation()}>
        <div style={{ position: "relative", height: 240, background: "#f5f5f5", flexShrink: 0 }}>
          <img src={recipe.image} alt={recipe.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.4)", border: "none", cursor: "pointer", color: "#fff", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          <div style={{ position: "absolute", top: 14, left: 14, background: "#FF6B35", borderRadius: 8, padding: "3px 10px" }}><span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{recipe.category}</span></div>
          <div style={{ position: "absolute", bottom: 14, left: 16 }}><div style={{ fontSize: 26, fontWeight: 800, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>{recipe.emoji} {recipe.name}</div></div>
        </div>
        <div style={{ padding: "16px 20px 0" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
            <MetaBadge icon="⏱" label="조리시간" value={recipe.time} />
            <MetaBadge icon="👥" label="분량" value={recipe.servings} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: diffStyle.bg, borderRadius: 10, padding: "6px 14px", minWidth: 64 }}>
              <span style={{ fontSize: 10, color: diffStyle.text, opacity: 0.8 }}>난이도</span>
              <span style={{ fontWeight: 700, fontSize: 13, color: diffStyle.text }}>{recipe.difficulty}</span>
            </div>
          </div>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.65, margin: "0 0 16px" }}>{recipe.description}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
            {recipe.tags.map(tag => <span key={tag} style={{ fontSize: 12, background: "#FFF0E8", color: "#FF6B35", borderRadius: 20, padding: "3px 10px", fontWeight: 600 }}>#{tag}</span>)}
          </div>
          <div style={{ display: "flex", borderBottom: "2px solid #F0F0F0", marginBottom: 20 }}>
            {[{ key: "ingredients", label: "🥕 재료" }, { key: "steps", label: "👨‍🍳 조리법" }].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ flex: 1, padding: "10px 0", background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, fontFamily: "inherit", color: activeTab === tab.key ? "#FF6B35" : "#999", borderBottom: `2px solid ${activeTab === tab.key ? "#FF6B35" : "transparent"}`, marginBottom: -2, transition: "color 0.15s" }}>{tab.label}</button>
            ))}
          </div>
          {activeTab === "ingredients" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {recipe.ingredients.map((ing, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "#FAFAFA", borderRadius: 10, padding: "10px 14px" }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#FF6B35", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: 14, color: "#333" }}>{ing}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "steps" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {recipe.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                  <div style={{ background: "#FAFAFA", borderRadius: 12, padding: "12px 14px", flex: 1, fontSize: 14, lineHeight: 1.6, color: "#333" }}>{step}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetaBadge({ icon, label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "#F5F5F5", borderRadius: 10, padding: "6px 14px", minWidth: 64 }}>
      <span style={{ fontSize: 10, color: "#999" }}>{label}</span>
      <span style={{ fontWeight: 700, fontSize: 13, color: "#333", marginTop: 1 }}>{icon} {value}</span>
    </div>
  );
}
