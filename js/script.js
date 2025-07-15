// 主要JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 滚动时导航栏透明度变化
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 图片懒加载
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // 数字计数动画
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2秒
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => counterObserver.observe(counter));

    // 搜索功能
    const searchForm = document.querySelector('.search-section form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 这里可以添加实际的搜索逻辑
            alert('搜索功能正在开发中...');
        });
    }

    // 图库模态框
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // 创建模态框显示大图
            const modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.innerHTML = `
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">图片预览</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-center">
                            <img src="${this.src}" class="img-fluid" alt="${this.alt}">
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
            
            modal.addEventListener('hidden.bs.modal', function() {
                document.body.removeChild(modal);
            });
        });
    });

    // 表单验证
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // 预订表单处理
    const bookingForm = document.querySelector('#bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 收集表单数据
            const formData = new FormData(this);
            const bookingData = Object.fromEntries(formData);
            
            // 显示确认信息
            alert('预订信息已提交，我们将尽快与您联系！');
            console.log('预订数据:', bookingData);
        });
    }

    // 返回顶部按钮
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'btn btn-primary position-fixed';
    backToTop.style.cssText = `
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: none;
    `;
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 工具提示初始化
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // 弹出框初始化
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

// 天气API示例（可选功能）
async function getWeatherInfo(city) {
    try {
        // 这里应该使用真实的天气API
        const mockWeather = {
            city: city,
            temperature: Math.floor(Math.random() * 30) + 5,
            condition: ['晴朗', '多云', '小雨', '阴天'][Math.floor(Math.random() * 4)],
            humidity: Math.floor(Math.random() * 40) + 40
        };
        return mockWeather;
    } catch (error) {
        console.error('获取天气信息失败:', error);
        return null;
    }
}

// 地图集成示例（可选功能）
function initMap() {
    // 这里可以集成百度地图或高德地图
    console.log('地图初始化...');
}

// 社交分享功能
function shareToSocial(platform, url, title) {
    const shareUrls = {
        weibo: `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        wechat: `javascript:void(0)`, // 微信分享需要特殊处理
        qq: `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    };

    if (shareUrls[platform]) {
        if (platform === 'wechat') {
            // 显示微信二维码
            alert('请使用微信扫描二维码分享');
        } else {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    }
}

// 本地存储功能
const Storage = {
    set: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: function(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    remove: function(key) {
        localStorage.removeItem(key);
    }
};

// 收藏功能
function toggleFavorite(id, type) {
    const favorites = Storage.get('favorites') || [];
    const index = favorites.findIndex(item => item.id === id && item.type === type);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push({ id, type, timestamp: Date.now() });
    }
    
    Storage.set('favorites', favorites);
    updateFavoriteButton(id, type);
}

function updateFavoriteButton(id, type) {
    const favorites = Storage.get('favorites') || [];
    const isFavorite = favorites.some(item => item.id === id && item.type === type);
    const button = document.querySelector(`[data-id="${id}"][data-type="${type}"]`);
    
    if (button) {
        if (isFavorite) {
            button.innerHTML = '<i class="fas fa-heart text-danger"></i>';
            button.title = '取消收藏';
        } else {
            button.innerHTML = '<i class="far fa-heart"></i>';
            button.title = '添加收藏';
        }
    }
}

// 货币转换功能（模拟）
const CurrencyConverter = {
    rates: {
        'CNY': 1,
        'USD': 0.14,
        'EUR': 0.13,
        'JPY': 20.1
    },
    convert: function(amount, from, to) {
        const fromRate = this.rates[from] || 1;
        const toRate = this.rates[to] || 1;
        return (amount / fromRate * toRate).toFixed(2);
    }
};

// 动画效果
const AnimationUtils = {
    fadeIn: function(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = null;
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.min(progress / duration, 1);
            element.style.opacity = opacity;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);
    },
    
    slideUp: function(element, duration = 300) {
        element.style.maxHeight = '0';
        element.style.overflow = 'hidden';
        element.style.transition = `max-height ${duration}ms ease-out`;
        element.style.maxHeight = element.scrollHeight + 'px';
        
        setTimeout(() => {
            element.style.maxHeight = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, duration);
    }
};
