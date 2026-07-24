const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// 60-30-10 Color Rule + Background Fixes
css = css.replace(/\.dsh-root {[\s\S]*?display: flex;/m, `.dsh-root {\n  background: #ffffff;\n  color: #111827;\n  height: 100vh;\n  max-height: 100vh;\n  width: 100vw;\n  max-width: 100vw;\n  overflow: hidden;\n  display: flex;`);
css = css.replace(/\.dsh-produce-card-top \{[\s\S]*?background: linear-gradient.*?;\n}/m, `.dsh-produce-card-top {\n  padding: 16px 16px 8px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background: #ffffff;\n}`);
css = css.replace(/\.dsh-nav-item--active {[\s\S]*?font-weight: 700;\n}/m, `.dsh-nav-item--active {\n  background: #16a34a !important;\n  color: #ffffff !important;\n  font-weight: 700;\n}`);
css = css.replace(/\.dsh-nav-item--active \.dsh-nav-icon \{ color: #16a34a; \}/g, `.dsh-nav-item--active .dsh-nav-icon { color: #ffffff; }`);

// 8px Padding, Margins, Radius, and Shadows
css = css.replace(/\.dsh-card-header \{[\s\S]*?border-bottom: 1px solid #e5e7eb;/m, `.dsh-card-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 24px;\n  border-bottom: 1px solid #e5e7eb;`);
css = css.replace(/\.dsh-card \{[\s\S]*?box-shadow: 0 1px 3px rgba\(0,0,0,0\.04\);/m, `.dsh-card {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 16px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03);\n  transition: all 0.2s ease;`);

css = css.replace(/\.dsh-produce-card \{[\s\S]*?cursor: pointer;\n}/m, `.dsh-produce-card {\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  border-radius: 16px;\n  overflow: hidden;\n  transition: all 0.2s cubic-bezier(0.16,1,0.3,1);\n  cursor: pointer;\n}`);
css = css.replace(/\.dsh-produce-card-body \{ padding: 14px 16px 16px; \}/g, `.dsh-produce-card-body { padding: 16px; }`);

css = css.replace(/\.dsh-cta-btn \{[\s\S]*?white-space: nowrap;\n\}/m, `.dsh-cta-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: #16a34a;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: inherit;\n  box-shadow: 0 1px 2px rgba(22, 163, 74, 0.2);\n  transition: all 0.2s ease;\n  white-space: nowrap;\n}`);
css = css.replace(/\.dsh-cta-btn:hover \{[\s\S]*?box-shadow: 0 6px 24px rgba\(21,128,61,0\.35\);\n\}/m, `.dsh-cta-btn:hover {\n  background: #15803d;\n  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);\n}`);

css = css.replace(/\.dsh-ghost-btn \{[\s\S]*?transition: all 0\.15s;\n\}/m, `.dsh-ghost-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: none;\n  border: none;\n  color: #6b7280;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: inherit;\n  padding: 8px 16px;\n  border-radius: 8px;\n  transition: all 0.2s ease;\n}`);
css = css.replace(/\.dsh-ghost-btn:hover \{ background: #f0fdf4; color: #16a34a; \}/m, `.dsh-ghost-btn:hover { background: #f3f4f6; color: #111827; }`);

css = css.replace(/\.dsh-stats-grid \{\n  display: grid;\n  grid-template-columns: repeat\(4, 1fr\);\n  gap: 16px;\n\}/m, `.dsh-stats-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 24px;\n}`);

css = css.replace(/\.dsh-stat-card \{[\s\S]*?transition: box-shadow 0\.2s, transform 0\.2s;\n\}/m, `.dsh-stat-card {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 16px;\n  padding: 24px;\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03);\n  transition: all 0.2s ease;\n}`);

css = css.replace(/\.dsh-pill \{[\s\S]*?transition: all 0\.18s;\n\}/m, `.dsh-pill {\n  padding: 8px 16px;\n  border-radius: 20px;\n  border: 1px solid #e5e7eb;\n  background: #ffffff;\n  font-size: 13px;\n  font-weight: 600;\n  color: #6b7280;\n  cursor: pointer;\n  font-family: inherit;\n  transition: all 0.2s ease;\n}`);
css = css.replace(/\.dsh-pill:hover \{ border-color: #86efac; color: #16a34a; \}/m, `.dsh-pill:hover { border-color: #16a34a; color: #16a34a; }`);
css = css.replace(/\.dsh-pill--active \{ background: #dcfce7; border-color: #16a34a; color: #15803d; \}/m, `.dsh-pill--active { background: #16a34a; border-color: #16a34a; color: #ffffff; }`);

// Typography Fixes
css = css.replace(/\.dsh-page-title \{[\s\S]*?letter-spacing: -0\.8px;\n  margin: 0 0 4px;\n\}/m, `.dsh-page-title {\n  font-family: 'Inter', 'Plus Jakarta Sans', sans-serif;\n  font-size: 24px;\n  font-weight: 700;\n  color: #111827;\n  letter-spacing: -0.02em;\n  margin: 0 0 8px;\n}`);
css = css.replace(/\.dsh-page-sub \{[\s\S]*?margin: 0;\n\}/m, `.dsh-page-sub {\n  font-size: 14px;\n  color: #6b7280;\n  margin: 0 0 24px;\n}`);
css = css.replace(/\.dsh-card-title \{[\s\S]*?letter-spacing: -0\.2px;\n\}/m, `.dsh-card-title {\n  font-size: 16px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}`);

fs.writeFileSync('src/index.css', css);
console.log('CSS Replaced successfully');
