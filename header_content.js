/* header_content.js */

// Global Sidebar HTML Structure
const sidebarHTML = `
    <button id="main-nav-toggle" class="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 shadow-lg text-white hover:bg-blue-700 transition fixed top-5 left-5 z-[100]">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </button>

    <nav id="main-nav-sidebar" class="sidebar-panel hidden lg:block">
        <div class="px-6 pb-6 pt-4">
            <a href="index.html" class="text-3xl font-extrabold tracking-tight block mb-8">
                <span class="logo-job-text text-gray-800">Job</span><span class="text-blue-600">Search</span>
            </a>
            
            <div id="nav-links-container" class="flex flex-col space-y-4 text-lg font-medium">
                <a href="index.html" class="nav-link-item text-gray-700 dark:text-gray-300 hover:text-blue-600 transition p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">🏠 Home</a>
                <a href="index.html#analytics" class="nav-link-item text-gray-700 dark:text-gray-300 hover:text-blue-600 transition p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">📊 Dashboard</a>
                <a href="resources.html" class="nav-link-item text-gray-700 dark:text-gray-300 hover:text-blue-600 transition p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">📚 Resources</a> 
                <a href="index.html#footer" class="nav-link-item text-gray-700 dark:text-gray-300 hover:text-blue-600 transition p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">🙋 About Us</a>
                <a href="index.html#footer" class="nav-link-item text-gray-700 dark:text-gray-300 hover:text-blue-600 transition p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">📞 Contact</a>
                <a href="#" class="nav-link-item text-gray-700 dark:text-gray-300 hover:text-blue-600 transition p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">⚙️ Settings</a>
            </div>
            
            <button id="close-desktop-sidebar" class="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                &times;
            </button>
        </div>
    </nav>
    
    <div id="mobile-nav-sidebar" class="fixed top-0 left-0 h-full w-64 sidebar-panel lg:hidden">
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <a href="index.html" class="text-2xl font-extrabold">
                    <span class="logo-job-text">Job</span><span class="text-blue-600">Search</span>
                </a>
                <button id="close-mobile-sidebar" class="text-2xl text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                    &times;
                </button>
            </div>
            <nav class="flex flex-col space-y-4 text-lg font-medium">
                <a href="index.html" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">Home</a>
                <a href="index.html#analytics" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">Dashboard</a>
                <a href="resources.html" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">Resources</a>
                <a href="index.html#footer" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">About Us</a>
                <a href="index.html#footer" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">Contact</a>
                <a href="#" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">Settings</a>
            </nav>
        </div>
    </div>
    <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-50 hidden transition-opacity opacity-0 lg:hidden"></div>
`;

// Function to inject the HTML structure and attach listeners
function initializeNavigationSidebar() {
    // Inject HTML immediately after the body opens
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // --- DESKTOP SIDEBAR LOGIC ---
    const desktopSidebar = document.getElementById('main-nav-sidebar');
    const desktopSidebarToggle = document.getElementById('main-nav-toggle');
    const desktopSidebarClose = document.getElementById('close-desktop-sidebar');
    const contentWrapper = document.getElementById('content-wrapper');

    const sidebarWidth = 250; 

    const openDesktopSidebar = () => {
        desktopSidebar.classList.add('open');
        desktopSidebarToggle.classList.add('hidden-when-open');
        document.documentElement.style.setProperty('--sidebar-margin-left', `${sidebarWidth}px`);
        
        // Animate links in sequentially
        const links = desktopSidebar.querySelectorAll('.nav-link-item');
        links.forEach((link, index) => {
            setTimeout(() => {
                link.classList.add('animate-in');
            }, index * 75); 
        });
    };

    const closeDesktopSidebar = () => {
        desktopSidebar.classList.remove('open');
        desktopSidebarToggle.classList.remove('hidden-when-open');
        document.documentElement.style.setProperty('--sidebar-margin-left', '0px');
        desktopSidebar.querySelectorAll('.nav-link-item').forEach(link => link.classList.remove('animate-in'));
    };

    if (desktopSidebarToggle) desktopSidebarToggle.addEventListener('click', openDesktopSidebar);
    if (desktopSidebarClose) desktopSidebarClose.addEventListener('click', closeDesktopSidebar);
    
    // --- MOBILE SIDEBAR LOGIC (Hamburger) ---
    const mobileNavSidebar = document.getElementById('mobile-nav-sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    const closeMobileSidebarBtn = document.getElementById('close-mobile-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    const toggleMobileSidebar = () => {
        const isOpen = mobileNavSidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('hidden', !isOpen);
        sidebarOverlay.classList.toggle('opacity-0', !isOpen);
        sidebarOverlay.classList.toggle('opacity-100', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };

    if (menuToggle) menuToggle.addEventListener('click', toggleMobileSidebar);
    if (closeMobileSidebarBtn) closeMobileSidebarBtn.addEventListener('click', toggleMobileSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleMobileSidebar); 
}

// Run initialization once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeNavigationSidebar);