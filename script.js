
  // Intersection Observer to trigger animation on scroll
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const container = document.getElementById('cursive-container');
        const path = document.getElementById('cursive-path');
        
        // Show the container
        container.classList.remove('opacity-0', 'translate-y-4');
        container.classList.add('opacity-100', 'translate-y-0');
        
        // Trigger the "draw" animation for the SVG path
        path.style.transition = 'stroke-dashoffset 2s ease-in-out';
        path.style.strokeDashoffset = '0';
        
        // Stop observing once triggered
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Start watching the footer of the features grid
  observer.observe(document.getElementById('cursive-container'));
  


   // Currency data with conversion rates
  const currencyData = {
    GHS: { symbol: 'GH₵', starter: 450, pro: 950, flag: '🇬🇭' },
    USD: { symbol: '$', starter: 40, pro: 85, flag: '🇺🇸' },
    GBP: { symbol: '£', starter: 32, pro: 68, flag: '🇬🇧' },
    EUR: { symbol: '€', starter: 37, pro: 79, flag: '🇪🇺' },
  };
  
  // Fun cursor trail effect
  let trailEnabled = true;
  let lastTrail = 0;
  
  function createTrail(e) {
    if (!trailEnabled) return;
    
    const now = Date.now();
    if (now - lastTrail < 50) return;
    lastTrail = now;
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 800);
  }
  
  document.addEventListener('mousemove', createTrail);
  
  // Easter egg: Konami code
  let konamiCode = [];
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
      alert('🎉 You found the secret! Smart Wiki loves curious minds. DM us "KONAMI" for a special offer!');
    }
  });
  
  // Developer console message
  console.log('%c🚀 Smart Wiki', 'font-size: 24px; font-weight: bold; color: #8b5cf6;');
  console.log('%cHey developer! 👋', 'font-size: 16px; color: #d946ef;');
  console.log('%cWe see you inspecting our code. We like curious minds!', 'font-size: 14px; color: #a855f7;');
  console.log('%cWant to build knowledge systems? Join us: telvinvarfley@gmail.com', 'font-size: 14px; color: #9333ea;');

  // Detect visitor location and update pricing
  async function detectAndUpdatePricing() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      let currency = 'USD';
      
      if (data.country_code === 'GH') currency = 'GHS';
      else if (data.country_code === 'US') currency = 'USD';
      else if (data.country_code === 'GB') currency = 'GBP';
      else if (data.currency === 'EUR') currency = 'EUR';
      
      updatePricing(currency, data.country_name || 'Global');
    } catch (error) {
      console.log('Using default USD pricing');
      updatePricing('USD', 'Global');
    }
  }

  function updatePricing(currencyCode, country) {
    const curr = currencyData[currencyCode] || currencyData.USD;
    
    document.querySelectorAll('[data-price="starter"]').forEach(el => {
      el.innerHTML = `<span class="text-neutral-500 text-lg">${curr.symbol}</span>
                     <span class="text-5xl font-extrabold text-white">${curr.starter}</span>
                     <span class="text-neutral-500 text-lg">/month</span>`;
    });
    
    document.querySelectorAll('[data-price="pro"]').forEach(el => {
      el.innerHTML = `<span class="text-neutral-500 text-lg">${curr.symbol}</span>
                     <span class="text-5xl font-extrabold text-white">${curr.pro}</span>
                     <span class="text-neutral-500 text-lg">/month</span>`;
    });
    
    const indicator = document.getElementById('currency-indicator');
    if (indicator) {
      indicator.innerHTML = `${curr.flag} Pricing in ${currencyCode} for ${country}`;
      indicator.style.opacity = '1';
    }
  }
  
  // Animated counters with Intersection Observer
  const observerOptionsa = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const target = parseInt(entry.target.dataset.counter);
        const isCurrency = entry.target.textContent.includes('$');
        animateCounter(entry.target, target, isCurrency);
      }
    });
  }, observerOptionsa);
  
  document.querySelectorAll('[data-counter]').forEach(el => {
    counterObserver.observe(el);
  });
  
  function animateCounter(el, target, isCurrency = false) {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      if (isCurrency) {
        el.textContent = '$' + Math.round(current).toLocaleString();
      } else {
        el.textContent = Math.round(current).toLocaleString();
      }
    }, duration / steps);
  }

  // Interactive problem calculator
  const teamSlider = document.getElementById('team-slider');
  if (teamSlider) {
    teamSlider.addEventListener('input', (e) => {
      const teamSize = parseInt(e.target.value);
      document.getElementById('team-size-display').textContent = teamSize;
      
      const docsPerPerson = 12.7;
      const messagesPerPerson = 8.9;
      const hoursPerPerson = 2.3;
      const costPerHour = 50;
      
      const scatteredDocs = Math.round(teamSize * docsPerPerson);
      const slackMessages = Math.round(teamSize * messagesPerPerson);
      const hoursWasted = Math.round(teamSize * hoursPerPerson);
      const annualCost = Math.round(hoursWasted * costPerHour * 52);
      
      animateValue('scattered-docs', scatteredDocs);
      animateValue('slack-messages', slackMessages);
      animateValue('hours-wasted', hoursWasted);
      
      const costEl = document.getElementById('annual-cost');
      costEl.textContent = '$' + annualCost.toLocaleString();
    });
  }
  
  function animateValue(id, newValue) {
    const el = document.getElementById(id);
    const currentValue = parseInt(el.textContent);
    const step = (newValue - currentValue) / 20;
    let current = currentValue;
    
    const interval = setInterval(() => {
      current += step;
      if ((step > 0 && current >= newValue) || (step < 0 && current <= newValue)) {
        el.textContent = Math.round(newValue);
        clearInterval(interval);
      } else {
        el.textContent = Math.round(current);
      }
    }, 20);
  }

  // Run on page load
  detectAndUpdatePricing();
  document.getElementById("current-year").textContent = new Date().getFullYear();

   const floatingIcons = document.querySelectorAll('.float-icon');
        const unifyBox = document.getElementById('unify-box');
        const heroSection = document.getElementById('hero-section');
        
        let boxPosition = null;

        function getBoxPosition() {
            if (!boxPosition) {
                const rect = unifyBox.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                boxPosition = {
                    x: rect.left + rect.width / 2,
                    y: rect.top + scrollTop + rect.height / 2
                };
            }
            return boxPosition;
        }

        // Store initial positions
        const iconPositions = [];
        floatingIcons.forEach((icon, index) => {
            const startX = icon.dataset.startX;
            const startY = icon.dataset.startY;
            const startRotate = icon.dataset.startRotate;
            
            iconPositions.push({
                element: icon,
                startX: startX.includes('%') ? startX : parseFloat(startX),
                startY: startY.includes('%') || startY.includes('calc') ? startY : parseFloat(startY),
                startRotate: parseFloat(startRotate),
                isPercentX: startX.includes('%'),
                isCalcY: startY.includes('calc')
            });
        });

        function updateIconPositions() {
            const rect = heroSection.getBoundingClientRect();
            const scrollProgress = Math.max(0, Math.min(1, 1 - (rect.top / window.innerHeight)));
            
            const box = getBoxPosition();
            
            iconPositions.forEach((iconData) => {
                const { element, startX, startY, startRotate, isPercentX, isCalcY } = iconData;
                
                // Calculate starting position
                let actualStartX, actualStartY;
                if (isPercentX) {
                    actualStartX = (parseFloat(startX) / 100) * window.innerWidth;
                } else {
                    actualStartX = startX;
                }
                
                if (isCalcY) {
                    actualStartY = window.innerHeight - 300;
                } else if (typeof startY === 'string' && startY.includes('%')) {
                    actualStartY = (parseFloat(startY) / 100) * window.innerHeight;
                } else {
                    actualStartY = startY;
                }
                
                // Calculate target position (box center)
                const targetX = box.x;
                const targetY = box.y - heroSection.offsetTop;
                
                // Interpolate position
                const currentX = actualStartX + (targetX - actualStartX) * scrollProgress;
                const currentY = actualStartY + (targetY - actualStartY) * scrollProgress;
                
                // Interpolate rotation (rotate to 0)
                const currentRotate = startRotate * (1 - scrollProgress);
                
                // Interpolate scale (shrink as approaching box)
                const scale = 1 - (scrollProgress * 0.6);
                
                // Interpolate opacity (fade out near the end)
                const opacity = scrollProgress > 0.8 ? (1 - (scrollProgress - 0.8) * 5) : 1;
                
                // Apply transforms
                element.style.left = `${currentX}px`;
                element.style.top = `${currentY}px`;
                element.style.transform = `rotate(${currentRotate}deg) scale(${scale})`;
                element.style.opacity = opacity;
            });
            
            // Box pulse effect based on progress
            if (scrollProgress > 0.3 && scrollProgress < 0.9) {
                unifyBox.classList.add('active');
            } else {
                unifyBox.classList.remove('active');
            }
        }

        // Update on scroll
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateIconPositions();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial position
        window.addEventListener('load', () => {
            boxPosition = null; // Reset to recalculate
            updateIconPositions();
        });

        // Recalculate on resize
        window.addEventListener('resize', () => {
            boxPosition = null;
            updateIconPositions();
        });

        // Initial call
        updateIconPositions();