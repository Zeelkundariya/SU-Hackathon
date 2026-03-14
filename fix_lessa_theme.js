const fs = require('fs');

let css = fs.readFileSync('frontend/src/index.css', 'utf8');

css = css.replace(/:root \{([\s\S]*?)System Gray Scale/m, `:root {
  /* Lessa Exact Match Palette */
  --primary: #059669; /* Deep Emerald/Teal Green used in main cards */
  --primary-hover: #047857; 
  
  --bg-dark: #f0f4f4; /* Very light cool-gray background of the app */
  --bg-card: #ffffff; /* White cards */
  --text-main: #111827; /* Dark Gray Text */
  --text-muted: #828c94; /* Soft Gray for labels */
  
  --accent: #f97316; /* Orange button accent */
  --danger: #ef4444; 
  
  --border: #e2e8f0; 
  --glass: #ffffff;
  --glass-border: transparent;
  
  --card-gradient: #ffffff;
  --soft-shadow: 0 10px 40px -10px rgba(0,0,0,0.08); /* Specifically soft large shadow */

  /* System Gray Scale`);

css = css.replace(/\.sidebar \{[\s\S]*?\}/m, `.sidebar {
  width: 250px;
  background-color: #ffffff;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  border-right: none;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  z-index: 10;
  box-shadow: 5px 0 20px rgba(0,0,0,0.02);
}`);

css = css.replace(/\.nav-item \{[\s\S]*?\}/m, `.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-weight: 500;
  margin-bottom: 4px;
}`);

css = css.replace(/\.nav-item:hover \{[\s\S]*?\}/m, `.nav-item:hover {
  background: var(--bg-dark);
  color: var(--primary);
}`);

css = css.replace(/\.nav-item\.active \{[\s\S]*?\}/m, `.nav-item.active {
  background: var(--primary);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
}`);

css = css.replace(/\.stat-card \{[\s\S]*?\}/m, `.stat-card {
  background: var(--bg-card);
  border-radius: 20px;
  padding: 1.5rem;
  border: none;
  box-shadow: var(--soft-shadow);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}`);

css = css.replace(/\.stat-card:hover \{[\s\S]*?\}/m, `.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px -10px rgba(0,0,0,0.12);
}`);

css += "\n\n/* Lessa Exact Match Override Classes */\n";
css += ".dashboard-header-override { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }\n";
css += ".dashboard-title-override { font-size: 1.8rem; font-weight: 800; color: #111827; margin: 0; display:flex; align-items:center; gap:8px; }\n";
css += ".top-green-row .stat-card { background: #059669; color: white !important; }\n";
css += ".top-green-row .stat-card * { color: white !important; }\n";
css += ".top-green-row .stat-card .stat-label { opacity: 0.8 !important; }\n";
css += ".top-green-row .stat-card svg { stroke: white !important; fill: transparent; }\n";

fs.writeFileSync('frontend/src/index.css', css, 'utf8');

let js = fs.readFileSync('frontend/src/pages/Dashboard.js', 'utf8');

js = js.replace(/<header className="dashboard-header"[\s\S]*?<div className="user-profile"[\s\S]*?<\/div>\s*<\/header>/m,
    `<header className="dashboard-header-override">
  <div>
    <h1 className="dashboard-title-override">Good morning Liz 👋</h1>
    <p style={{ color: 'var(--text-muted)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>Time to rise up for today !!</p>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <div style={{ background: '#e0f2fe', color: '#0369a1', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize:'0.85rem', display: 'flex', alignItems: 'center', gap: '10px' }}><div>Your Balance <br/> <span style={{fontSize:'1.1rem'}}>$594.55</span></div></div>
    <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#ffedd5', overflow: 'hidden' }}>
      <img src="https://i.pravatar.cc/100?img=5" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  </div>
</header>`);

js = js.replace(/<div className="stats-grid">/, '<div className="stats-grid top-green-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", background: "#059669", padding: "1.5rem", borderRadius: "24px", marginBottom:"1.5rem", boxShadow: "0 15px 35px -5px rgba(5,150,105,0.4)" }}>');

js = js.replace(/<div className="stat-card" style={{ background: 'var\(--card-gradient\)' }}>/g, '<div className="stat-card" style={{ background: "transparent", boxShadow: "none", padding: "0.5rem", borderRight: "1px solid rgba(255,255,255,0.2)", borderRadius: "0" }}>');

fs.writeFileSync('frontend/src/pages/Dashboard.js', js, 'utf8');
console.log("Applied lessa styling.");
