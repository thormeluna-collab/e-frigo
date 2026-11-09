import React, { useState, useMemo } from 'react'

// ===================== MOCK DATA =====================
const APP_NAME = 'e-Frigo';
const SLOGAN = 'Come lo que compras';

const MOCK_RECIPES = [
  { id:1, name:'Pasta Carbonara', category:'Italiana', time:25, servings:2, difficulty:'Media', rating:4.8, image:'🍝', ingredients:['pasta','huevos','bacon','queso parmesano','pimienta'], calories:650, tags:['alta proteína'], diets:['sin gluten? no'], priority:3 },
  { id:2, name:'Ensalada César', category:'Ensaladas', time:15, servings:2, difficulty:'Fácil', rating:4.5, image:'🥗', ingredients:['lechuga','pollo','croutons','parmesano','salsa césar'], calories:320, tags:['baja caloría'], diets:['sin gluten'], priority:2 },
  { id:3, name:'Tacos de Pollo', category:'Mexicana', time:30, servings:4, difficulty:'Fácil', rating:4.7, image:'🌮', ingredients:['tortillas','pollo','cebolla','cilantro','lima','salsa'], calories:480, tags:['picante'], diets:['sin lactosa'], priority:1 },
  { id:4, name:'Sopa de Tomate', category:'Sopas', time:40, servings:4, difficulty:'Fácil', rating:4.3, image:'🥣', ingredients:['tomate','cebolla','ajo','caldo','albahaca'], calories:180, tags:['vegano','baja caloría'], diets:['vegano','vegetariano','sin gluten','sin lactosa'], priority:2 },
  { id:5, name:'Risotto de Setas', category:'Italiana', time:45, servings:3, difficulty:'Difícil', rating:4.6, image:'🍄', ingredients:['arroz arborio','setas','caldo','queso','vino blanco'], calories:520, tags:['vegetariano'], diets:['vegetariano','sin gluten'], priority:3 },
  { id:6, name:'Curry de Garbanzos', category:'India', time:35, servings:4, difficulty:'Media', rating:4.4, image:'🍛', ingredients:['garbanzos','tomate','cebolla','curry','coco','espinacas'], calories:410, tags:['vegano','alta fibra'], diets:['vegano','vegetariano','sin gluten','sin lactosa'], priority:1 },
  { id:7, name:'Tortilla Española', category:'Española', time:30, servings:4, difficulty:'Media', rating:4.9, image:'🍳', ingredients:['patatas','huevos','cebolla','aceite de oliva','sal'], calories:380, tags:['vegetariano'], diets:['vegetariano','sin gluten'], priority:2 },
  { id:8, name:'Smoothie Verde', category:'Bebidas', time:5, servings:1, difficulty:'Fácil', rating:4.2, image:'🥤', ingredients:['espinacas','plátano','manzana','jengibre','agua'], calories:150, tags:['vegano','detox'], diets:['vegano','vegetariano','sin gluten','sin lactosa'], priority:1 },
  { id:9, name:'Bowl de Quinoa', category:'Saludable', time:20, servings:2, difficulty:'Fácil', rating:4.6, image:'🥙', ingredients:['quinoa','aguacate','tomate cherry','pepino','limón'], calories:380, tags:['vegano','alta proteína'], diets:['vegano','vegetariano','sin gluten','sin lactosa'], priority:2 },
  { id:10, name:'Lasaña de Verduras', category:'Italiana', time:60, servings:6, difficulty:'Difícil', rating:4.7, image:'🫕', ingredients:['láminas pasta','berenjena','calabacín','tomate','queso','bechamel'], calories:520, tags:['vegetariano'], diets:['vegetariano'], priority:3 },
];

const MOCK_PANTRY = [
  { id:1, name:'Leche entera', qty:2, unit:'L', expiry:'2026-11-12', category:'Lácteos', barcode:'8410000001', price:1.20, diet:['sin gluten'] },
  { id:2, name:'Huevos (docena)', qty:1, unit:'paq', expiry:'2026-11-20', category:'Huevos', barcode:'8410000002', price:2.50, diet:['sin gluten','sin lactosa'] },
  { id:3, name:'Pollo (pechuga)', qty:0.5, unit:'kg', expiry:'2026-11-10', category:'Carnes', barcode:'8410000003', price:4.80, diet:['sin gluten','sin lactosa'] },
  { id:4, name:'Tomates', qty:6, unit:'uds', expiry:'2026-11-14', category:'Verduras', barcode:'8410000004', price:1.80, diet:['vegano','vegetariano','sin gluten','sin lactosa'] },
  { id:5, name:'Pasta espagueti', qty:2, unit:'paq', expiry:'2027-03-01', category:'Pasta', barcode:'8410000005', price:0.90, diet:['vegano','vegetariano'] },
  { id:6, name:'Queso parmesano', qty:1, unit:'uds', expiry:'2026-12-01', category:'Lácteos', barcode:'8410000006', price:3.50, diet:['sin gluten'] },
  { id:7, name:'Lechuga', qty:1, unit:'uds', expiry:'2026-11-09', category:'Verduras', barcode:'8410000007', price:1.10, diet:['vegano','vegetariano','sin gluten','sin lactosa'] },
  { id:8, name:'Bacon', qty:1, unit:'paq', expiry:'2026-11-11', category:'Carnes', barcode:'8410000008', price:2.20, diet:['sin gluten','sin lactosa'] },
  { id:9, name:'Pan sin gluten', qty:1, unit:'uds', expiry:'2026-11-13', category:'Panadería', barcode:'8410000009', price:2.80, diet:['vegano','vegetariano','sin gluten','sin lactosa'] },
  { id:10, name:'Yogur sin lactosa', qty:4, unit:'uds', expiry:'2026-11-16', category:'Lácteos', barcode:'8410000010', price:1.90, diet:['sin gluten','sin lactosa'] },
];

const MOCK_OFFERS = [
  { id:1, store:'Mercadona', product:'Leche entera 1L', original:1.20, offer:0.99, discount:17, cashback:5, coupon:'MERC5', distance:'0.3 km', lat:40.4, lng:-3.7 },
  { id:2, store:'Carrefour', product:'Pollo pechuga 1kg', original:6.50, offer:5.20, discount:20, cashback:8, coupon:'CARREFOUR8', distance:'0.8 km', lat:40.41, lng:-3.71 },
  { id:3, store:'Lidl', product:'Tomates (kg)', original:2.10, offer:1.69, discount:19, cashback:3, coupon:'LIDL3', distance:'1.2 km', lat:40.42, lng:-3.69 },
  { id:4, store:'Aldi', product:'Pasta espagueti 500g', original:0.90, offer:0.69, discount:23, cashback:4, coupon:'ALDI4', distance:'1.5 km', lat:40.39, lng:-3.72 },
  { id:5, store:'Mercadona', product:'Huevos docena', original:2.50, offer:2.10, discount:16, cashback:6, coupon:'MERC6', distance:'0.3 km', lat:40.4, lng:-3.7 },
  { id:6, store:'Dia', product:'Yogur sin lactosa 4uds', original:1.90, offer:1.49, discount:22, cashback:7, coupon:'DIA7', distance:'0.6 km', lat:40.405, lng:-3.705 },
];

const CATEGORIES = ['Todas','Italiana','Ensaladas','Mexicana','Sopas','India','Española','Bebidas','Saludable'];
const DIET_GOALS = ['Sin restricción','Vegetariano','Vegano','Sin gluten','Sin lactosa','Keto','Alta proteína','Baja caloría'];
const APPLIANCES = ['Ninguno','Samsung Family Hub','LG ThinQ','Bosch Home Connect','Siemens Home Connect'];

function daysUntil(dateStr) {
  const today = new Date('2026-11-09');
  const d = new Date(dateStr);
  return Math.ceil((d - today) / (1000*60*60*24));
}

function trafficLight(days) {
  if (days <= 2) return { color:'bg-red-500', text:'text-red-700', bg:'bg-red-50', label:'Rojo - Caduca pronto', emoji:'🔴' };
  if (days <= 5) return { color:'bg-amber-500', text:'text-amber-700', bg:'bg-amber-50', label:'Amarillo - Consumir pronto', emoji:'🟡' };
  return { color:'bg-green-500', text:'text-green-700', bg:'bg-green-50', label:'Verde - En buen estado', emoji:'🟢' };
}

function Header({ tab, setTab }) {
  const tabs = [
    { id:'home', label:'Inicio', icon:'🏠' },
    { id:'recipes', label:'Recetas', icon:'📖' },
    { id:'pantry', label:'Despensa', icon:'🧊' },
    { id:'shopping', label:'Compras', icon:'🛒' },
    { id:'scanner', label:'Escanear', icon:'📷' },
    { id:'plan', label:'Plan', icon:'📅' },
    { id:'history', label:'Historial', icon:'📊' },
    { id:'profile', label:'Perfil', icon:'👤' },
  ];
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="e-Frigo" className="h-12 w-auto object-contain" />
          <div>
            <h1 className="text-2xl font-bold text-emerald-600">{APP_NAME}</h1>
            <p className="text-xs text-gray-500 italic">{SLOGAN}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">🟢 Online</span>
          <nav className="flex gap-1 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${tab===t.id ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </nav>
        </div>
      </div>
    </header>
  );
}

function HomeView({ pantry, recipes, diet }) {
  const expiring = pantry.filter(p => daysUntil(p.expiry) <= 3).sort((a,b)=>daysUntil(a.expiry)-daysUntil(b.expiry));
  const dietRecipes = recipes.filter(r => r.diets.includes(diet) || diet==='Sin restricción').slice(0,4);
  const dietScore = 82;
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-1">¡Hola! 👋</h2>
        <p className="opacity-90 text-lg italic">"{SLOGAN}"</p>
        <p className="opacity-80 mt-2 text-sm">Tienes {pantry.length} productos en tu frigorífico. {expiring.length} caducan pronto.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:'Recetas', value: recipes.length, icon:'📖', color:'bg-blue-50 text-blue-600' },
          { label:'Productos', value: pantry.length, icon:'🧊', color:'bg-green-50 text-green-600' },
          { label:'Caducan pronto', value: expiring.length, icon:'⚠️', color:'bg-red-50 text-red-600' },
          { label:'Dieta', value: diet, icon:'🥗', color:'bg-amber-50 text-amber-600' },
        ].map((s,i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-2 ${s.color}`}>{s.icon}</div>
            <div className="text-xl font-bold">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
      {expiring.length > 0 && (
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <h3 className="font-bold text-lg mb-3">⚠️ Productos a punto de caducar — ¡Úsalos primero!</h3>
          <div className="space-y-2">
            {expiring.map(p => {
              const tl = trafficLight(daysUntil(p.expiry));
              return (
                <div key={p.id} className={`flex items-center justify-between p-3 rounded-lg ${tl.bg}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-4 h-4 rounded-full ${tl.color}`}></span>
                    <div>
                      <span className="font-medium">{p.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({p.qty} {p.unit})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`${tl.text} font-bold text-sm`}>{daysUntil(p.expiry)} día(s)</span>
                    <div className="text-xs text-gray-500">💡 Receta sugerida: {recipes.find(r=>r.ingredients.includes(p.name.toLowerCase().split(' ')[0]))?.name || 'Ensalada'}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">🥗 Análisis de dieta — {diet}</h3>
        <div className="flex items-center gap-4 mb-3">
          <div className="w-20 h-20 rounded-full border-8 border-emerald-600 flex items-center justify-center font-bold text-xl">{dietScore}</div>
          <div><p className="font-medium">Dieta {diet === 'Sin restricción' ? 'equilibrada' : diet.toLowerCase()}</p><p className="text-sm text-gray-500">Estás siguiendo una dieta decente. Sigue así.</p></div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div className="bg-green-50 rounded-lg p-2"><div className="font-bold text-green-700">Proteínas</div><div>OK ✓</div></div>
          <div className="bg-amber-50 rounded-lg p-2"><div className="font-bold text-amber-700">Fibra</div><div>Buena ✓</div></div>
          <div className="bg-green-50 rounded-lg p-2"><div className="font-bold text-green-700">Vitaminas</div><div>OK ✓</div></div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">🔥 Recetas que priorizan lo que caduca antes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dietRecipes.map(r => (
            <div key={r.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border">
              <span className="text-3xl">{r.image}</span>
              <div className="flex-1">
                <div className="font-medium">{r.name}</div>
                <div className="text-xs text-gray-500">{r.time} min · {r.servings} comensales · {r.calories} kcal</div>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {r.diets.slice(0,3).map(d => <span key={d} className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs">{d}</span>)}
                </div>
              </div>
              <span className="text-amber-500">★ {r.rating}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecipesView({ recipes, setRecipes, servings, setServings, diet }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ name:'', category:'Italiana', time:30, servings:2, ingredients:'', calories:400, diets:[] });

  const filtered = useMemo(() => recipes.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.ingredients.some(i=>i.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category==='Todas' || r.category===category;
    const matchDiet = diet==='Sin restricción' || r.diets.includes(diet);
    const matchFav = !showFavOnly || favorites.includes(r.id);
    return matchSearch && matchCat && matchDiet && matchFav;
  }), [recipes, search, category, diet, showFavOnly, favorites]);

  const handleUpload = () => {
    if (!newRecipe.name) return;
    setRecipes(prev => [...prev, { ...newRecipe, id: Date.now(), difficulty:'Media', rating:4.0, image:'🍽️', ingredients: newRecipe.ingredients.split(',').map(s=>s.trim()), tags:['propia'], diets: newRecipe.diets.length ? newRecipe.diets : ['sin restricción'] }]);
    setShowUpload(false);
    setNewRecipe({ name:'', category:'Italiana', time:30, servings:2, ingredients:'', calories:400, diets:[] });
  };

  if (selectedRecipe) {
    const r = selectedRecipe;
    const factor = servings / r.servings;
    return (
      <div className="space-y-4">
        <button onClick={() => setSelectedRecipe(null)} className="text-emerald-600 font-medium">← Volver</button>
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-6xl">{r.image}</span>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{r.name}</h2>
              <p className="text-gray-500">{r.category} · {r.difficulty} · ★ {r.rating}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {r.diets.map(t => <span key={t} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">{t}</span>)}
              </div>
              <button onClick={()=>{navigator.clipboard.writeText('https://e-frigo.app/receta/'+r.id); alert('¡Link copiado! Comparte con tus amigos.');}} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">📤 Compartir receta</button>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
            <label className="font-medium">Comensales:</label>
            <input type="number" min="1" max="12" value={servings} onChange={e=>setServings(+e.target.value)} className="w-16 border rounded px-2 py-1" />
            <span className="text-sm text-gray-500">({r.servings} base → x{factor.toFixed(1)})</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">Ingredientes (escalados)</h3>
              <ul className="space-y-1">
                {r.ingredients.map((ing,i) => (
                  <li key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span>•</span> <span>{ing}</span> <span className="ml-auto text-sm text-gray-500">x{factor.toFixed(1)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Información nutricional</h3>
              <div className="space-y-2">
                <div className="flex justify-between p-2 bg-gray-50 rounded"><span>Calorías</span><span className="font-bold">{Math.round(r.calories*factor)} kcal</span></div>
                <div className="flex justify-between p-2 bg-gray-50 rounded"><span>Tiempo</span><span className="font-bold">{r.time} min</span></div>
                <div className="flex justify-between p-2 bg-gray-50 rounded"><span>Dificultad</span><span className="font-bold">{r.difficulty}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Buscar receta o ingrediente..." className="flex-1 border rounded-lg px-4 py-2" />
        <select value={category} onChange={e=>setCategory(e.target.value)} className="border rounded-lg px-4 py-2">
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <button onClick={()=>setShowFavOnly(!showFavOnly)} className={`px-4 py-2 rounded-lg font-medium ${showFavOnly?'bg-red-500 text-white':'bg-gray-100'}`}>❤️ Favoritos</button>
        <button onClick={()=>setShowUpload(!showUpload)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium">+ Subir receta</button>
      </div>
      {showUpload && (
        <div className="bg-white rounded-xl p-5 shadow-sm border space-y-3">
          <h3 className="font-bold">Nueva receta</h3>
          <input value={newRecipe.name} onChange={e=>setNewRecipe({...newRecipe,name:e.target.value})} placeholder="Nombre" className="w-full border rounded px-3 py-2" />
          <div className="grid grid-cols-2 gap-3">
            <select value={newRecipe.category} onChange={e=>setNewRecipe({...newRecipe,category:e.target.value})} className="border rounded px-3 py-2">
              {CATEGORIES.filter(c=>c!=='Todas').map(c=><option key={c}>{c}</option>)}
            </select>
            <input type="number" value={newRecipe.time} onChange={e=>setNewRecipe({...newRecipe,time:+e.target.value})} placeholder="Minutos" className="border rounded px-3 py-2" />
          </div>
          <input value={newRecipe.ingredients} onChange={e=>setNewRecipe({...newRecipe,ingredients:e.target.value})} placeholder="Ingredientes (separados por coma)" className="w-full border rounded px-3 py-2" />
          <div className="flex gap-2 flex-wrap">
            {DIET_GOALS.filter(d=>d!=='Sin restricción').map(d => (
              <label key={d} className="flex items-center gap-1 text-sm">
                <input type="checkbox" checked={newRecipe.diets.includes(d)} onChange={e => {
                  if (e.target.checked) setNewRecipe({...newRecipe, diets:[...newRecipe.diets,d]});
                  else setNewRecipe({...newRecipe, diets:newRecipe.diets.filter(x=>x!==d)});
                }} /> {d}
              </label>
            ))}
          </div>
          <button onClick={handleUpload} className="bg-emerald-600 text-white px-4 py-2 rounded-lg">Guardar</button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => (
          <div key={r.id} className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition relative">
            <button onClick={(e)=>{e.stopPropagation();toggleFavorite(r.id);}} className="absolute top-3 right-3 text-xl">
              {favorites.includes(r.id) ? '❤️' : '🤍'}
            </button>
            <div onClick={()=>setSelectedRecipe(r)} className="cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{r.image}</span>
              <div><h3 className="font-bold">{r.name}</h3><p className="text-xs text-gray-500">{r.category}</p></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>⏱ {r.time} min</span><span>👥 {r.servings}</span><span>🔥 {r.calories} kcal</span><span className="text-amber-500">★ {r.rating}</span>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PantryView({ pantry, setPantry }) {
  const [filter, setFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ name:'', qty:1, unit:'uds', expiry:'', category:'Verduras', price:0, diet:[] });

  const filtered = filter==='all' ? pantry : (filter==='expiring' ? pantry.filter(p => daysUntil(p.expiry) <= 3) : pantry.filter(p => trafficLight(daysUntil(p.expiry)).label.includes(filter)));
  const expiring = pantry.filter(p => daysUntil(p.expiry) <= 3);

  const handleAdd = () => {
    if (!newItem.name || !newItem.expiry) return;
    setPantry(prev => [...prev, { ...newItem, id: Date.now(), barcode:'841'+Date.now(), diet: newItem.diet.length ? newItem.diet : ['sin restricción'] }]);
    setShowAdd(false);
    setNewItem({ name:'', qty:1, unit:'uds', expiry:'', category:'Verduras', price:0, diet:[] });
  };

  const removeItem = (id) => setPantry(prev => prev.filter(p=>p.id!==id));

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <select value={filter} onChange={e=>setFilter(e.target.value)} className="border rounded-lg px-4 py-2">
          <option value="all">Todos los productos</option>
          <option value="expiring">Caducan pronto (≤3 días)</option>
          <option value="Rojo">🔴 Rojo (≤2 días)</option>
          <option value="Amarillo">🟡 Amarillo (≤5 días)</option>
          <option value="Verde">🟢 Verde (&gt;5 días)</option>
        </select>
        <button onClick={()=>setShowAdd(!showAdd)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium">+ Añadir producto</button>
      </div>
      {showAdd && (
        <div className="bg-white rounded-xl p-5 shadow-sm border space-y-3">
          <h3 className="font-bold">Nuevo producto</h3>
          <input value={newItem.name} onChange={e=>setNewItem({...newItem,name:e.target.value})} placeholder="Nombre" className="w-full border rounded px-3 py-2" />
          <div className="grid grid-cols-3 gap-3">
            <input type="number" value={newItem.qty} onChange={e=>setNewItem({...newItem,qty:+e.target.value})} placeholder="Cantidad" className="border rounded px-3 py-2" />
            <select value={newItem.unit} onChange={e=>setNewItem({...newItem,unit:e.target.value})} className="border rounded px-3 py-2">
              {['uds','kg','L','paq','g'].map(u=><option key={u}>{u}</option>)}
            </select>
            <input type="date" value={newItem.expiry} onChange={e=>setNewItem({...newItem,expiry:e.target.value})} className="border rounded px-3 py-2" />
          </div>
          <button onClick={handleAdd} className="bg-emerald-600 text-white px-4 py-2 rounded-lg">Guardar</button>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Semáforo</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Producto</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Cantidad</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Categoría</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Caducidad</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Días</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.sort((a,b)=>daysUntil(a.expiry)-daysUntil(b.expiry)).map(p => {
              const days = daysUntil(p.expiry);
              const tl = trafficLight(days);
              return (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3"><span className={`w-5 h-5 rounded-full inline-block ${tl.color}`} title={tl.label}></span></td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">{p.qty} {p.unit}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{p.category}</td>
                  <td className="px-4 py-3 text-sm">{p.expiry}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${tl.bg} ${tl.text}`}>{days <= 0 ? 'Caducado' : `${days} día(s)`}</span></td>
                  <td className="px-4 py-3"><button onClick={()=>removeItem(p.id)} className="text-red-500 hover:text-red-700 text-sm">Eliminar</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {expiring.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h4 className="font-bold text-amber-800 mb-2">💡 Recomendación — ¡Úsalos primero!</h4>
          <p className="text-sm text-amber-700">Usa <strong>{expiring.map(e=>e.name).join(', ')}</strong> hoy en una receta para evitar desperdicio. e-Frigo prioriza automáticamente recetas con estos ingredientes.</p>
        </div>
      )}
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">🤖 Predicción de consumo (IA)</h3>
        <p className="text-sm text-gray-500 mb-3">e-Frigo estima cuándo se acabará cada producto y sugiere reponerlo.</p>
        <div className="space-y-2">
          {pantry.slice(0,4).map(p => {
            const daysLeft = Math.max(1, Math.round(p.qty * 3));
            return (
              <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{p.name}</span>
                <div className="text-right">
                  <span className="text-sm text-blue-600 font-bold">Se acaba en ~{daysLeft} días</span>
                  <div className="text-xs text-gray-500">Reponer pronto</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ShoppingView() {
  const [cashback, setCashback] = useState(0);
  const [showGeo, setShowGeo] = useState(true);
  const totalCashback = MOCK_OFFERS.reduce((s,o)=>s+o.cashback,0);

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-amber-500 to-orange-400 text-white rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-1">🛒 Ofertas y Cupones cercanos</h2>
        <p className="opacity-90">📍 Geolocalización activa · Cashback: €{cashback.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <button onClick={()=>setShowGeo(!showGeo)} className={`px-3 py-1 rounded-full text-sm ${showGeo?'bg-emerald-600 text-white':'bg-gray-200'}`}>📍 Cerca de mí</button>
        <span className="text-sm text-gray-500">Ordenado por distancia</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_OFFERS.sort((a,b)=>parseFloat(a.distance)-parseFloat(b.distance)).map(o => (
          <div key={o.id} className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold">{o.product}</h3>
                <p className="text-sm text-gray-500">{o.store} · 📍 {o.distance}</p>
              </div>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">-{o.discount}%</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-gray-400 line-through">€{o.original.toFixed(2)}</span>
              <span className="text-2xl font-bold text-emerald-600">€{o.offer.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Cashback {o.cashback}%</span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">Cupón: {o.coupon}</span>
            </div>
            <button onClick={()=>setCashback(c=>c+o.offer*o.cashback/100)} className="mt-3 w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition">
              🛒 Comprar y ganar cashback
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">⚖️ Comparador de precios</h3>
        <p className="text-sm text-gray-500 mb-3">Compara el mismo producto en varias tiendas.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2">Producto</th>
                <th className="text-left px-3 py-2">Mercadona</th>
                <th className="text-left px-3 py-2">Carrefour</th>
                <th className="text-left px-3 py-2">Lidl</th>
                <th className="text-left px-3 py-2">Aldi</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name:'Leche 1L', prices:[1.20,1.35,1.15,1.10] },
                { name:'Huevos docena', prices:[2.50,2.65,2.30,2.40] },
                { name:'Tomates (kg)', prices:[2.10,2.30,1.90,2.00] },
                { name:'Pasta 500g', prices:[0.90,0.95,0.79,0.69] },
              ].map((r,i) => {
                const min = Math.min(...r.prices);
                return (
                  <tr key={i} className="border-t">
                    <td className="px-3 py-2 font-medium">{r.name}</td>
                    {r.prices.map((p,j) => (
                      <td key={j} className={`px-3 py-2 ${p===min?'text-emerald-600 font-bold':''}`}>€{p.toFixed(2)} {p===min?'🏆':''}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">🏪 Supermercados disponibles</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Mercadona','Carrefour','Lidl','Aldi','Dia','Eroski','Alcampo','Consum'].map(s => (
            <div key={s} className="p-3 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
              <div className="text-2xl mb-1">🏪</div>
              <div className="text-sm font-medium">{s}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">📋 Lista de la compra automática</h3>
        <p className="text-sm text-gray-500 mb-3">e-Frigo genera tu lista de la compra basándose en lo que falta y lo que caduca.</p>
        <div className="space-y-2">
          {['Leche entera (2L)','Huevos (1 docena)','Tomates (6)','Pan sin gluten'].map((item,i) => (
            <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
              <input type="checkbox" className="w-4 h-4" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Exportar lista</button>
      </div>
    </div>
  );
}

function ScannerView({ pantry, setPantry }) {
  const [mode, setMode] = useState('barcode');
  const [scanned, setScanned] = useState(null);
  const [receiptItems, setReceiptItems] = useState([]);
  const [ocrAccuracy] = useState(92);

  const simulateBarcode = () => {
    const products = [
      { name:'Leche desnatada', qty:1, unit:'L', expiry:'2026-11-15', category:'Lácteos', price:1.05, barcode:'8410000099', diet:['sin gluten'] },
      { name:'Yogur natural', qty:4, unit:'uds', expiry:'2026-11-18', category:'Lácteos', price:1.80, barcode:'8410000100', diet:['sin gluten','sin lactosa'] },
    ];
    const p = products[Math.floor(Math.random()*products.length)];
    setScanned(p);
  };

  const addToPantry = (p) => {
    setPantry(prev => [...prev, { ...p, id: Date.now() }]);
    setScanned(null);
  };

  const simulateReceipt = () => {
    setReceiptItems([
      { name:'Pan de molde', qty:1, price:1.35 },
      { name:'Jamón cocido', qty:1, price:2.10 },
      { name:'Queso en lonchas', qty:1, price:1.90 },
      { name:'Manzanas (kg)', qty:1, price:2.40 },
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={()=>setMode('barcode')} className={`flex-1 py-2 rounded-lg font-medium ${mode==='barcode'?'bg-emerald-600 text-white':'bg-gray-100'}`}>📷 Código de barras</button>
        <button onClick={()=>setMode('receipt')} className={`flex-1 py-2 rounded-lg font-medium ${mode==='receipt'?'bg-emerald-600 text-white':'bg-gray-100'}`}>🧾 Ticket (OCR)</button>
      </div>
      {mode==='barcode' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border text-center space-y-4">
          <div className="w-64 h-64 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center text-6xl border-2 border-dashed border-gray-300">📷</div>
          <p className="text-gray-500">Apunta la cámara al código de barras del producto</p>
          <button onClick={simulateBarcode} className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium">Simular escaneo</button>
          {scanned && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left">
              <h3 className="font-bold text-green-800 mb-2">✅ Producto detectado</h3>
              <p><strong>{scanned.name}</strong></p>
              <p className="text-sm text-gray-600">{scanned.qty} {scanned.unit} · Caduca: {scanned.expiry} · €{scanned.price}</p>
              <p className="text-xs text-gray-500 mt-1">Acierto OCR: {ocrAccuracy}%</p>
              <div className="flex gap-2 mt-3">
                <button onClick={()=>addToPantry(scanned)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm">Añadir a despensa</button>
                <button onClick={()=>setScanned(null)} className="bg-gray-200 px-4 py-2 rounded-lg text-sm">Cancelar</button>
              </div>
            </div>
          )}
        </div>
      )}
      {mode==='receipt' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
          <div className="w-full h-48 bg-gray-100 rounded-2xl flex items-center justify-center text-6xl border-2 border-dashed border-gray-300">🧾</div>
          <p className="text-gray-500 text-center">Escanea o sube una foto del ticket de compra. Acierto OCR: {ocrAccuracy}%</p>
          <button onClick={simulateReceipt} className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium">Simular escaneo de ticket (OCR)</button>
          {receiptItems.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-bold">Productos detectados por OCR:</h3>
              {receiptItems.map((it,i) => (
                <div key={i} className="flex justify-between p-3 bg-gray-50 rounded-lg"><span>{it.name}</span><span className="font-bold">€{it.price.toFixed(2)}</span></div>
              ))}
              <div className="flex justify-between p-3 bg-green-50 rounded-lg font-bold"><span>Total</span><span>€{receiptItems.reduce((s,i)=>s+i.price,0).toFixed(2)}</span></div>
              <button onClick={()=>{ setReceiptItems([]); alert('Productos añadidos a la despensa'); }} className="w-full bg-emerald-600 text-white py-2 rounded-lg">Añadir todos a despensa</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProfileView({ darkMode, setDarkMode }) {
  const [diet, setDiet] = useState('Sin restricción');
  const [cashbackTotal] = useState(12.45);
  const [appliance, setAppliance] = useState('Ninguno');
  const [premium, setPremium] = useState(true);

  const badges = [
    { icon:'🏆', name:'Cero desperdicio', desc:'7 días sin tirar comida', earned:true },
    { icon:'🥗', name:'Dieta perfecta', desc:'1 semana siguiendo dieta', earned:true },
    { icon:'💰', name:'Ahorrador', desc:'Ahorrado +€50', earned:true },
    { icon:'🔥', name:'Chef experto', desc:'10 recetas cocinadas', earned:false },
    { icon:'📱', name:'Embajador', desc:'Invita 3 amigos', earned:false },
    { icon:'🌍', name:'Eco-warrior', desc:'Reducido 5kg CO2', earned:false },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">A</div>
          <div>
            <h2 className="text-xl font-bold">Usuario {premium ? 'Premium' : 'Básico'}</h2>
            <p className="text-sm text-gray-500">{premium ? 'Plan: Premium · €3.99/mes o €29.99/año' : 'Plan: Básico · Gratis'}</p>
            {premium && <p className="text-xs text-emerald-600">🎉 30 días de prueba · Baja cuando quieras</p>}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border space-y-3">
        <h3 className="font-bold text-lg">🥗 Objetivo de dieta</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {DIET_GOALS.map(g => (
            <button key={g} onClick={()=>setDiet(g)} className={`p-3 rounded-lg border text-sm font-medium transition ${diet===g?'bg-emerald-600 text-white border-emerald-600':'hover:bg-gray-50'}`}>{g}</button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">Dieta seleccionada: <strong>{diet}</strong></p>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">🔌 Conexión con electrodomésticos</h3>
        <select value={appliance} onChange={e=>setAppliance(e.target.value)} className="w-full border rounded-lg px-4 py-2">
          {APPLIANCES.map(a => <option key={a}>{a}</option>)}
        </select>
        <p className="text-sm text-gray-500 mt-2">e-Frigo se conecta con tu frigorífico inteligente para sincronizar el inventario automáticamente.</p>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">💰 Cashback</h3>
        <div className="text-3xl font-bold text-emerald-600 mb-2">€{cashbackTotal.toFixed(2)}</div>
        <p className="text-sm text-gray-500">Acumulado este mes. Se transfiere a tu cuenta al superar €20.</p>
        <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Retirar fondos</button>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">📊 Informe mensual de ahorro</h3>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-green-50 rounded-lg p-3"><div className="text-2xl font-bold text-green-700">€45.20</div><div className="text-sm text-gray-500">Ahorrado este mes</div></div>
          <div className="bg-blue-50 rounded-lg p-3"><div className="text-2xl font-bold text-blue-700">3.2 kg</div><div className="text-sm text-gray-500">Comida no desperdiciada</div></div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">🏆 Gamificación — Retos y badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {badges.map((b,i) => (
            <div key={i} className={`p-3 rounded-lg border text-center ${b.earned ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200 opacity-50'}`}>
              <div className="text-3xl mb-1">{b.icon}</div>
              <div className="font-bold text-sm">{b.name}</div>
              <div className="text-xs text-gray-500">{b.desc}</div>
              {b.earned && <div className="text-xs text-emerald-600 mt-1 font-bold">✓ Conseguido</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">⚙️ Preferencias</h3>
        <div className="space-y-3">
          {[
            { label:'Notificaciones push de caducidad', value:true },
            { label:'Alertas de ofertas cercanas', value:true },
            { label:'Recomendaciones de recetas', value:true },
            { label:'Modo oscuro', value:darkMode, toggle:()=>setDarkMode(!darkMode) },
          ].map((p,i) => (
            <div key={i} className="flex items-center justify-between p-2">
              <span>{p.label}</span>
              <div onClick={p.toggle} className={`w-10 h-6 rounded-full ${p.value?'bg-emerald-600':'bg-gray-300'} relative cursor-pointer`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition ${p.value?'right-1':'left-1'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">👥 Invitar amigos</h3>
        <p className="text-sm text-gray-500 mb-3">Invita a un amigo y ambos ganáis 1 mes gratis de Premium.</p>
        <div className="flex gap-2">
          <input value="https://e-frigo.app/invite/ABC123" readOnly className="flex-1 border rounded-lg px-3 py-2 text-sm bg-gray-50" />
          <button onClick={()=>{navigator.clipboard.writeText('https://e-frigo.app/invite/ABC123'); alert('¡Link copiado!');}} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm">Copiar</button>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-center text-sm">
          <div className="bg-blue-50 rounded-lg p-2"><div className="font-bold text-blue-700">3</div><div className="text-gray-500">Invitados</div></div>
          <div className="bg-green-50 rounded-lg p-2"><div className="font-bold text-green-700">2</div><div className="text-gray-500">Convertidos</div></div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">💬 Soporte</h3>
        <p className="text-sm text-gray-500 mb-3">Chat y correo en menos de 24h · Centro de ayuda</p>
        <button className="bg-gray-200 px-4 py-2 rounded-lg text-sm">Contactar soporte</button>
      </div>
    </div>
  );
}

function MealPlanView({ recipes, mealPlan, addToMealPlan, removeFromMealPlan }) {
  const days = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
  const [selectedDay, setSelectedDay] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = recipes.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-1">📅 Planificador semanal de comidas</h2>
        <p className="opacity-90">Planifica tus menús de la semana. e-Frigo prioriza recetas con ingredientes que caducan pronto.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {days.map(day => (
          <div key={day} className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-bold text-sm mb-2 text-emerald-600">{day}</h3>
            {mealPlan[day] ? (
              <div className="bg-emerald-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{mealPlan[day].image}</span>
                  <span className="font-medium text-sm">{mealPlan[day].name}</span>
                </div>
                <div className="text-xs text-gray-500">{mealPlan[day].time} min · {mealPlan[day].calories} kcal</div>
                <button onClick={()=>removeFromMealPlan(day)} className="mt-2 text-xs text-red-500 hover:text-red-700">Quitar</button>
              </div>
            ) : (
              <button onClick={()=>setSelectedDay(day)} className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-emerald-400 hover:text-emerald-600 transition text-sm">
                + Añadir receta
              </button>
            )}
          </div>
        ))}
      </div>
      {selectedDay && (
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">Selecciona receta para {selectedDay}</h3>
            <button onClick={()=>setSelectedDay(null)} className="text-gray-500">✕</button>
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Buscar..." className="w-full border rounded-lg px-4 py-2 mb-3" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {filtered.map(r => (
              <div key={r.id} onClick={()=>{ addToMealPlan(selectedDay, r); setSelectedDay(null); setSearch(''); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border cursor-pointer">
                <span className="text-2xl">{r.image}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.time} min · {r.calories} kcal</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">📊 Resumen nutricional semanal</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-emerald-50 rounded-lg p-3"><div className="text-2xl font-bold text-emerald-700">{Object.values(mealPlan).reduce((s,r)=>s+r.calories,0)}</div><div className="text-sm text-gray-500">Calorías totales</div></div>
          <div className="bg-blue-50 rounded-lg p-3"><div className="text-2xl font-bold text-blue-700">{Object.keys(mealPlan).length}/7</div><div className="text-sm text-gray-500">Días planificados</div></div>
          <div className="bg-amber-50 rounded-lg p-3"><div className="text-2xl font-bold text-amber-700">{Object.values(mealPlan).reduce((s,r)=>s+r.time,0)}</div><div className="text-sm text-gray-500">Minutos cocina</div></div>
        </div>
      </div>
    </div>
  );
}

function HistoryView({ pantry }) {
  const history = [
    { date:'2026-11-08', item:'Pasta Carbonara', type:'receta', calories:650, saved:0.80 },
    { date:'2026-11-07', item:'Ensalada César', type:'receta', calories:320, saved:1.20 },
    { date:'2026-11-06', item:'Tomates (6 uds)', type:'compra', calories:0, saved:0 },
    { date:'2026-11-05', item:'Tacos de Pollo', type:'receta', calories:480, saved:0.50 },
    { date:'2026-11-04', item:'Smoothie Verde', type:'receta', calories:150, saved:0.30 },
    { date:'2026-11-03', item:'Leche entera (2L)', type:'compra', calories:0, saved:0 },
    { date:'2026-11-02', item:'Tortilla Española', type:'receta', calories:380, saved:0.60 },
    { date:'2026-11-01', item:'Curry de Garbanzos', type:'receta', calories:410, saved:0.90 },
  ];
  const totalSaved = history.reduce((s,h)=>s+h.saved,0);
  const totalCalories = history.filter(h=>h.type==='receta').reduce((s,h)=>s+h.calories,0);
  const recipesCooked = history.filter(h=>h.type==='receta').length;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-1">📊 Historial de consumo</h2>
        <p className="opacity-90">Tu registro de comidas, compras y ahorro acumulado.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:'Recetas cocinadas', value: recipesCooked, icon:'🍳', color:'bg-blue-50 text-blue-600' },
          { label:'Calorías totales', value: totalCalories, icon:'🔥', color:'bg-orange-50 text-orange-600' },
          { label:'Ahorrado', value: '€'+totalSaved.toFixed(2), icon:'💰', color:'bg-green-50 text-green-600' },
          { label:'Comida no desperdiciada', value: '4.3 kg', icon:'🌍', color:'bg-emerald-50 text-emerald-600' },
        ].map((s,i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-2 ${s.color}`}>{s.icon}</div>
            <div className="text-xl font-bold">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">📈 Gráfico de ahorro mensual</h3>
        <div className="flex items-end gap-2 h-40">
          {[3.2, 4.5, 2.8, 5.1, 4.0, 3.7, 4.3, 5.5].map((v,i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-emerald-500 rounded-t" style={{height: (v/5.5*100)+'%'}}></div>
              <span className="text-xs text-gray-500">{['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago'][i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Fecha</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Actividad</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Tipo</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Calorías</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Ahorrado</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h,i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{h.date}</td>
                <td className="px-4 py-3 font-medium">{h.item}</td>
                <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs ${h.type==='receta'?'bg-blue-100 text-blue-700':'bg-green-100 text-green-700'}`}>{h.type==='receta'?'Receta':'Compra'}</span></td>
                <td className="px-4 py-3 text-sm">{h.calories > 0 ? h.calories+' kcal' : '-'}</td>
                <td className="px-4 py-3 text-sm text-emerald-600 font-bold">{h.saved > 0 ? '€'+h.saved.toFixed(2) : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="font-bold text-lg mb-3">🏆 Retos semanales</h3>
        <div className="space-y-3">
          {[
            { name:'Cero desperdicio', desc:'No tirar ningún alimento esta semana', progress:85, reward:'Badge Eco-warrior' },
            { name:'Come 5 verduras', desc:'Incluye 5 verduras diferentes en tus recetas', progress:60, reward:'Badge Saludable' },
            { name:'Ahorra €10', desc:'Ahorra al menos €10 en ofertas y cupones', progress:45, reward:'Badge Ahorrador Pro' },
          ].map((c,i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between mb-2">
                <div><div className="font-bold">{c.name}</div><div className="text-sm text-gray-500">{c.desc}</div></div>
                <div className="text-sm text-emerald-600 font-bold">{c.progress}%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{width: c.progress+'%'}}></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">Recompensa: {c.reward}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState('home');
  const [recipes, setRecipes] = useState(MOCK_RECIPES);
  const [pantry, setPantry] = useState(MOCK_PANTRY);
  const [servings, setServings] = useState(2);
  const [diet, setDiet] = useState('Sin restricción');
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [mealPlan, setMealPlan] = useState({});

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f=>f!==id) : [...prev, id]);
  };

  const addToMealPlan = (day, recipe) => {
    setMealPlan(prev => ({ ...prev, [day]: recipe }));
  };

  const removeFromMealPlan = (day) => {
    setMealPlan(prev => { const n = {...prev}; delete n[day]; return n; });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <Header tab={tab} setTab={setTab} />
      <main className="max-w-6xl mx-auto px-4 py-6">
        {tab==='home' && <HomeView pantry={pantry} recipes={recipes} diet={diet} favorites={favorites} toggleFavorite={toggleFavorite} />}
        {tab==='recipes' && <RecipesView recipes={recipes} setRecipes={setRecipes} servings={servings} setServings={setServings} diet={diet} favorites={favorites} toggleFavorite={toggleFavorite} />}
        {tab==='pantry' && <PantryView pantry={pantry} setPantry={setPantry} />}
        {tab==='shopping' && <ShoppingView />}
        {tab==='scanner' && <ScannerView pantry={pantry} setPantry={setPantry} />}
        {tab==='plan' && <MealPlanView recipes={recipes} mealPlan={mealPlan} addToMealPlan={addToMealPlan} removeFromMealPlan={removeFromMealPlan} />}
        {tab==='history' && <HistoryView pantry={pantry} />}
        {tab==='profile' && <ProfileView darkMode={darkMode} setDarkMode={setDarkMode} />}
      </main>
    </div>
  );
}