<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ app()->getLocale() == 'ur' ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'Andaza Pakistan - Buy & Sell Cars, Mobiles, Real Estate')</title>
    <meta name="description" content="@yield('meta_description', 'Pakistan\'s largest online classifieds marketplace.')">

    <!-- Fonts: Plus Jakarta Sans for English & Noto Sans Arabic for Urdu -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Tailwind CSS (Instant CDN) & Fonts -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#002f34',
                        accent: '#23e5db',
                        highlight: '#ffce32',
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-[#f7f8f9] text-[#002f34] antialiased min-h-screen flex flex-col font-sans">
    
    <!-- Top Header -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <a href="{{ route('home') }}" class="flex items-center gap-1.5 shrink-0">
                <div class="text-2xl font-black tracking-tight select-none">
                    <span class="text-[#002f34]">And</span><span class="text-[#23e5db]">aza</span>
                </div>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pakistan</span>
            </a>

            <form action="{{ route('listings.index') }}" method="GET" class="flex-1 max-w-xl flex border-2 border-[#002f34] rounded overflow-hidden">
                <input type="text" name="q" placeholder="Find Cars, Mobile Phones, Real Estate..." value="{{ request('q') }}" class="w-full px-4 py-2 text-sm focus:outline-none">
                <button type="submit" class="bg-[#002f34] text-white px-5 py-2">🔍</button>
            </form>

            <div class="flex items-center gap-3">
                <a href="{{ route('merchant.dashboard') }}" class="text-xs font-semibold text-slate-700 hover:text-black">
                    Company Portal
                </a>
                <a href="{{ route('admin.moderation.index') }}" class="text-xs font-semibold text-teal-700 hover:underline">
                    Admin
                </a>
                <a href="{{ route('listings.create') }}" class="px-6 py-2 bg-[#ffce32] text-[#002f34] font-extrabold text-sm rounded-full hover:bg-amber-400">
                    + SELL
                </a>
            </div>
        </div>
    </header>

    @if(session('success'))
        <div class="max-w-7xl mx-auto px-4 mt-4 w-full">
            <div class="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg flex items-center justify-between">
                <span>{{ session('success') }}</span>
                <button type="button" class="text-emerald-600 hover:text-emerald-900" onclick="this.parentElement.remove()">✕</button>
            </div>
        </div>
    @endif

    <main class="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="bg-[#002f34] text-white text-xs py-6 px-4 mt-16 text-center">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Free Classifieds in Pakistan. © 2006-2026 Andaza Pakistan</span>
            <span class="text-slate-400">Monolithic Architecture in Laravel 13 & MySQL 8.4</span>
        </div>
    </footer>
    @stack('scripts')
</body>
</html>
