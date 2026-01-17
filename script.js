// script.js - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 70 },
            color: { value: '#00f5ff' },
            shape: { type: 'circle' },
            opacity: { value: 0.3 },
            size: { value: 3 },
            move: { speed: 1.1 }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' } }
        }
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    gsap.timeline()
        .from('.hero h1', { duration: 1.1, y: 80, opacity: 0, ease: 'back.out(1.6)' })
        .from('.hero-tagline', { duration: 0.8, y: 40, opacity: 0, ease: 'power3.out' }, '-=0.6')
        .from('.hero p', { duration: 1, y: 40, opacity: 0, stagger: 0.15, ease: 'power3.out' }, '-=0.6')
        .from('.hero-cta-wrapper .cta', { duration: 0.8, scale: 0.85, opacity: 0, stagger: 0.18, ease: 'back.out(1.6)' }, '-=0.4');

    // Feature cards animation
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { 
                trigger: card, 
                start: 'top 90%', 
                toggleActions: 'play none none reverse' 
            },
            duration: 0.9,
            y: 60,
            scale: 0.96,
            opacity: 0,
            ease: 'back.out(1.5)',
            delay: i * 0.08
        });
    });

    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        gsap.to(stat, {
            scrollTrigger: { 
                trigger: '#stats', 
                start: 'top 80%',
                once: true 
            },
            innerHTML: target,
            duration: 2.2,
            snap: { innerHTML: 1 },
            ease: 'power2.out',
            onUpdate: function() {
                const raw = stat.innerHTML;
                if (String(stat.getAttribute('data-target')).includes('.')) {
                    stat.innerHTML = parseFloat(raw).toFixed(1);
                } else {
                    stat.innerHTML = Math.ceil(raw);
                }
            }
        });
    });

    // Testimonial cards animation
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { 
                trigger: card, 
                start: 'top 85%' 
            },
            duration: 0.8,
            y: 40,
            opacity: 0,
            ease: 'power3.out',
            delay: i * 0.1
        });
    });

    // Feature tabs functionality
    const featureContent = {
        gap: {
            tag: 'Mode: Precision Thought-Gap Detector',
            title: 'Expose The Invisible Step Where Logic Breaks',
            body: 'The engine overlays student reasoning with an ideal chain and lights up the exact transition where thinking silently snaps. Teachers see concrete fracture locations—never vague "you are wrong".',
            pills: ['Transition fracture map', 'Gap severity scoring', 'Confidence vs evidence']
        },
        micro: {
            tag: 'Mode: Micro-Diagnostic Question',
            title: 'One Tiny Question, Maximum Cognitive Signal',
            body: 'Instead of long quizzes, the system crafts a single surgical prompt that reveals whether the core mental model is sound. If they can answer this, they truly understand.',
            pills: ['One-shot probes', 'Adaptive depth', 'No quiz fatigue']
        },
        mis: {
            tag: 'Mode: Misconception Radar',
            title: 'Name The Exact Misconception Like An Expert',
            body: 'The radar classifies errors into known misconception families: "velocity vs acceleration confusion", "sign convention flip", "unit blindness", and more—making the AI feel like a human tutor.',
            pills: ['Labeled error patterns', 'Domain-aware tags', 'Misconception heatmap ready']
        },
        next: {
            tag: 'Mode: Next Best Action Engine',
            title: 'Coach The Very Next Move, Not A Menu',
            body: 'Given the fracture pattern, the engine chooses a single next action: reframe, simulate, analogize, or practice. One clear instruction is far more coach-like than a list of options.',
            pills: ['Action prioritization', 'Pedagogy-aware choices', 'Micro-coaching scripts']
        }
    };

    document.querySelectorAll('.feature-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-feature');
            const panel = document.getElementById('feature-panel');

            document.querySelectorAll('.feature-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            gsap.to(panel, {
                duration: 0.25,
                opacity: 0,
                y: 10,
                onComplete: () => {
                    panel.querySelector('.feature-tag').textContent = featureContent[key].tag;
                    panel.querySelector('.feature-detail-title').textContent = featureContent[key].title;
                    panel.querySelector('.feature-detail-body').textContent = featureContent[key].body;

                    const pillsContainer = panel.querySelector('.feature-pills');
                    pillsContainer.innerHTML = '';
                    featureContent[key].pills.forEach(p => {
                        const span = document.createElement('span');
                        span.className = 'feature-pill';
                        span.textContent = p;
                        pillsContainer.appendChild(span);
                    });

                    gsap.fromTo(panel, 
                        { opacity: 0, y: 10 }, 
                        { duration: 0.35, opacity: 1, y: 0, ease: 'power3.out' }
                    );
                }
            });
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            if (mobileMenuBtn.querySelector('i')) {
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        }
    });

    // Scroll indicator click
    document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
        document.querySelector('#stats').scrollIntoView({ behavior: 'smooth' });
    });
});

// Global functions
function scrollToId(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

let analysisTimeout;
let hasShownEmailModal = false;

function analyzeGap() {
    const input = document.getElementById('student-input');
    const output = document.getElementById('ai-output');
    const btn = document.getElementById('analyze-btn');

    if (!input.value.trim()) {
        input.focus();
        return;
    }

    btn.classList.add('analyzing');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Illuminating fractures...';

    clearTimeout(analysisTimeout);
    analysisTimeout = setTimeout(() => {
        const text = input.value.toLowerCase();
        let response = '';

        if (text.includes('step') || text.match(/\d/)) {
            response =
`🧠 THOUGHT-GAP SNAPSHOT (Precision ≈ 94%)

• Step 1: Formula selection ✔
• Step 2: Substitution ✔
• Step 3: Units / justification ✖

Insight: You reached the right number, but the reasoning **fractures** where you jump from calculation to conclusion without checking units or assumptions.

🔬 MICRO-DIAGNOSTIC
Before we move on: What units must acceleration carry in this context?

Expected anchor: m/s²

🧭 NEXT BEST ACTION
Re-explain the same solution, but narrate aloud why each step is valid. The engine will re-scan your updated reasoning.`;
        } else if (text.includes('velocity') || text.includes('acceleration')) {
            response =
`🎯 MISCONCEPTION PATTERN #23 · Velocity vs Acceleration

Detected fracture: You are treating "velocity" (how fast position changes) and "acceleration" (how fast velocity changes) as the same quantity.

Quick reset:
• Velocity → change in position / time
• Acceleration → change in velocity / time

🔬 MICRO-DIAGNOSTIC
A car goes from 0 to 100 km/h in 10 s.
What is the acceleration in m/s²?

🧭 NEXT BEST ACTION
Sketch a speed–time graph and shade the region that represents acceleration. Then retry your explanation using that mental picture.`;
        } else {
            response =
`✨ GENERAL ILLUMINATION

Your explanation is close, but the fracture is in the hidden links between statements—not the statements themselves.

AI Reading:
• Concepts: present
• Connections: under-specified
• Confidence: medium without evidence

🔬 MICRO-DIAGNOSTIC
Add one sentence starting with: "This step logically follows because..."

🧭 NEXT BEST ACTION
Rewrite your explanation in 3 short steps. The engine will highlight where the logic still feels like a jump instead of a bridge.`;
        }

        output.value = response;
        gsap.fromTo(output, 
            { opacity: 0, scale: 0.98 }, 
            { duration: 0.6, opacity: 1, scale: 1, ease: 'power3.out' }
        );
        
        btn.classList.remove('analyzing');
        btn.innerHTML = '<i class="fas fa-bolt"></i> Illuminate Next Fracture';

        // Show email modal after first analysis (if not shown before)
        if (!hasShownEmailModal) {
            setTimeout(() => {
                showEmailModal();
                hasShownEmailModal = true;
            }, 1500);
        }
    }, Math.random() * 1100 + 700);
}

function showEmailModal() {
    const modal = document.getElementById('email-modal');
    modal.classList.add('active');
    
    // Add overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        z-index: 1000;
    `;
    overlay.onclick = closeEmailModal;
    document.body.appendChild(overlay);
}

function closeEmailModal() {
    const modal = document.getElementById('email-modal');
    modal.classList.remove('active');
    
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.remove();
    }
}

function submitEmail() {
    const emailInput = document.getElementById('modal-email');
    const email = emailInput.value.trim();
    
    if (!email || !email.includes('@')) {
        emailInput.style.borderColor = '#ff6b6b';
        emailInput.focus();
        return;
    }
    
    // In a real app, you would send this to your backend
    console.log('Email captured:', email);
    
    // Show success message
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: #00ff88; margin-bottom: 20px;"></i>
            <h3>Welcome to Insight Illuminators!</h3>
            <p>Your free Pro trial has been activated. Check your email for login details.</p>
            <p class="modal-note">You now have access to class dashboard and PDF exports.</p>
            <button onclick="closeEmailModal()" class="cta" style="margin-top: 20px;">
                <i class="fas fa-rocket"></i>
                Start Exploring
            </button>
        </div>
    `;
    
    setTimeout(closeEmailModal, 3000);
}

// Form submission
document.querySelector('form')?.addEventListener('submit', e => {
    e.preventDefault();
    gsap.to('form', { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 });
    alert('Your judge-ready demo request has been logged. The team will respond shortly.');
});

// Enter key for demo input
document.getElementById('student-input')?.addEventListener('keypress', e => {
    if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        analyzeGap();
    }
});

// Initialize on page load
window.onload = function() {
    // Add loading animation
    gsap.from('body', { duration: 0.5, opacity: 0 });
};