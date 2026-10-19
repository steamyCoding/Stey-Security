// Runs before first paint to avoid a flash of the wrong theme.
const script = `(function(){try{var p=localStorage.getItem('stey-theme');if(p!=='light'&&p!=='dark'){p='system';}var r=p==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;var d=document.documentElement;d.setAttribute('data-theme',r);d.setAttribute('data-theme-preference',p);}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
