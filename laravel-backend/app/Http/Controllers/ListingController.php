<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Listing;
use App\Models\ListingImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ListingController extends Controller
{
    public function index(Request $request)
    {
        $query = Listing::with(['category', 'images', 'seller'])
            ->where('status', 'active');

        if ($request->filled('q')) {
            $searchTerm = $request->q;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        if ($request->filled('city')) {
            $query->where('city', $request->city);
        }

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        $listings = $query->orderByDesc('is_featured')
            ->orderByDesc('bumped_at')
            ->orderByDesc('created_at')
            ->paginate(16);

        $categories = Category::whereNull('parent_id')->with('children')->get();

        return view('home', compact('listings', 'categories'));
    }

    public function show(string $slug)
    {
        $listing = Listing::with(['seller.merchantProfile', 'category', 'images', 'attributes'])
            ->where('slug', $slug)
            ->where('status', 'active')
            ->firstOrFail();

        $listing->increment('views_count');

        return view('listings.show', compact('listing'));
    }

    public function create()
    {
        $categories = Category::all();
        return view('listings.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:120',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string|min:20',
            'condition' => 'required|in:New,Used,Refurbished',
            'city' => 'required|string',
            'area' => 'required|string',
        ]);

        $listing = Listing::create([
            'uuid' => (string) Str::uuid(),
            'user_id' => auth()->id() ?? 1,
            'category_id' => $validated['category_id'],
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . Str::random(6),
            'description' => $validated['description'],
            'price' => $validated['price'],
            'condition' => $validated['condition'],
            'city' => $validated['city'],
            'area' => $validated['area'],
            'province' => 'Punjab',
            'status' => 'pending', // Requires admin moderation
            'bumped_at' => now(),
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $idx => $file) {
                $path = $file->store('listings', 'public');
                ListingImage::create([
                    'listing_id' => $listing->id,
                    'image_path' => '/storage/' . $path,
                    'is_primary' => $idx === 0,
                    'order_index' => $idx,
                ]);
            }
        }

        return redirect()->route('home')->with('success', 'Ad submitted! It will appear live once safety review is completed.');
    }
}
