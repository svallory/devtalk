import '@awesome.me/webawesome/dist/styles/themes/default.css';
import './components/threads-app.ts';

function init(): void {
  if (document.querySelector('threads-app')) return;
  const app = document.createElement('threads-app');
  document.body.appendChild(app);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
