const cur = document.getElementById('cur');
const curr = document.getElementById('curr');

let mx = 0;
let my = 0;
let rx = 0;
let ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = `${mx}px`;
  cur.style.top = `${my}px`;
});

(function loop() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  curr.style.left = `${rx}px`;
  curr.style.top = `${ry}px`;
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a,button,.srv,.caso,.dep,.plan').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cur.style.transform = 'translate(-50%,-50%) scale(2)';
    curr.style.width = '60px';
    curr.style.height = '60px';
  });

  el.addEventListener('mouseleave', () => {
    cur.style.transform = 'translate(-50%,-50%) scale(1)';
    curr.style.width = '34px';
    curr.style.height = '34px';
  });
});

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('vis');
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.rv,.rv2,.rv3').forEach((el) => obs.observe(el));

const processSteps = Array.from(document.querySelectorAll('.pstep'));
let cp = Math.max(
  processSteps.findIndex((step) => step.classList.contains('on')),
  0
);

function setP(i) {
  processSteps.forEach((step, index) => {
    step.classList.toggle('on', index === i);
  });
  cp = i;
}

window.setP = setP;
if (processSteps.length) {
  // Keep manual click and auto-rotation in sync.
  processSteps.forEach((step, index) => {
    step.addEventListener('click', () => setP(index));
  });
  setP(cp);

  let processIntervalId = null;
  const startAutoSteps = () => {
    if (processIntervalId) return;
    processIntervalId = setInterval(() => {
      setP((cp + 1) % processSteps.length);
    }, 3800);
  };

  const stopAutoSteps = () => {
    if (!processIntervalId) return;
    clearInterval(processIntervalId);
    processIntervalId = null;
  };

  const processSection = document.getElementById('processo');
  if (processSection) {
    const processObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startAutoSteps();
          else stopAutoSteps();
        });
      },
      { threshold: 0.35 }
    );
    processObserver.observe(processSection);
  } else {
    startAutoSteps();
  }
}
