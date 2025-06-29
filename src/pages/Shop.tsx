
import { useState } from "react";
import { Search, Filter, Grid, List, MapPin, Heart, ShoppingBag } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  image: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  seller: string;
  location: string;
  occasion: string;
  trend: string;
  culture: string;
  event: string;
  religion: string;
  tags: string[];
  isLiked: boolean;
  inStock: boolean;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      image: "/lovable-uploads/c586921d-7c27-4b40-bc92-b3edd9b0a3ac.png",
      title: "Floral Embroidered Mini Dress",
      brand: "Boho Chic",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviews: 124,
      seller: "FashionHub Store",
      location: "Los Angeles, CA",
      occasion: "Casual",
      trend: "Floral",
      culture: "Western",
      event: "Brunch",
      religion: "Universal",
      tags: ["floral", "mini", "embroidered", "summer"],
      isLiked: false,
      inStock: true
    },
    {
      id: 2,
      image: "/lovable-uploads/2845e472-b8de-40de-8fbc-aa60ce676d92.png",
      title: "Rose Applique Slip Dress",
      brand: "Romantic Rose",
      price: 156.00,
      rating: 4.8,
      reviews: 89,
      seller: "Elegant Designs",
      location: "New York, NY",
      occasion: "Evening",
      trend: "Romantic",
      culture: "Western",
      event: "Date Night",
      religion: "Universal",
      tags: ["rose", "slip", "romantic", "evening"],
      isLiked: false,
      inStock: true
    },
    {
      id: 3,
      image: "/lovable-uploads/5f92f4f7-5095-4e72-9d80-623fdc82905e.png",
      title: "Tropical Print Two-Piece Set",
      brand: "Island Vibes",
      price: 124.50,
      originalPrice: 159.99,
      rating: 4.3,
      reviews: 67,
      seller: "Tropical Trends",
      location: "Miami, FL",
      occasion: "Vacation",
      trend: "Tropical",
      culture: "Caribbean",
      event: "Beach Party",
      religion: "Universal",
      tags: ["tropical", "two-piece", "vacation", "colorful"],
      isLiked: false,
      inStock: true
    },
    {
      id: 4,
      image: "/lovable-uploads/d8133fc7-60f5-4eb3-b666-ec4368d76ef5.png",
      title: "Bohemian Smocked Mini Dress",
      brand: "Free Spirit",
      price: 98.00,
      rating: 4.6,
      reviews: 156,
      seller: "Boho Boutique",
      location: "Austin, TX",
      occasion: "Festival",
      trend: "Bohemian",
      culture: "Western",
      event: "Music Festival",
      religion: "Universal",
      tags: ["bohemian", "smocked", "festival", "free-spirit"],
      isLiked: false,
      inStock: true
    },
    {
      id: 5,
      image: "/lovable-uploads/6118eec3-f694-4823-8138-93ab83074037.png",
      title: "Embroidered Peasant Top & Skirt",
      brand: "Folk Heritage",
      price: 142.99,
      rating: 4.7,
      reviews: 93,
      seller: "Cultural Couture",
      location: "San Francisco, CA",
      occasion: "Cultural Event",
      trend: "Folk",
      culture: "Mexican",
      event: "Cultural Festival",
      religion: "Universal",
      tags: ["embroidered", "peasant", "cultural", "traditional"],
      isLiked: false,
      inStock: true
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    occasion: '',
    trend: '',
    brand: '',
    location: '',
    culture: '',
    event: '',
    religion: '',
    priceRange: '',
    sortBy: 'newest'
  });

  const { toast } = useToast();

  const occasions = ['Casual', 'Evening', 'Vacation', 'Festival', 'Cultural Event', 'Work', 'Party'];
  const trends = ['Floral', 'Romantic', 'Tropical', 'Bohemian', 'Folk', 'Minimalist', 'Vintage'];
  const brands = ['Boho Chic', 'Romantic Rose', 'Island Vibes', 'Free Spirit', 'Folk Heritage'];
  const cultures = ['Western', 'Caribbean', 'Mexican', 'Asian', 'African', 'Middle Eastern'];
  const events = ['Brunch', 'Date Night', 'Beach Party', 'Music Festival', 'Cultural Festival', 'Wedding'];
  const religions = ['Universal', 'Christian', 'Muslim', 'Hindu', 'Jewish', 'Buddhist'];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProducts({ ...filters }, query);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    filterProducts(newFilters, searchQuery);
  };

  const filterProducts = (currentFilters: typeof filters, query: string) => {
    let filtered = products.filter(product => {
      const matchesSearch = query === '' || 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

      const matchesOccasion = !currentFilters.occasion || product.occasion === currentFilters.occasion;
      const matchesTrend = !currentFilters.trend || product.trend === currentFilters.trend;
      const matchesBrand = !currentFilters.brand || product.brand === currentFilters.brand;
      const matchesLocation = !currentFilters.location || product.location.includes(currentFilters.location);
      const matchesCulture = !currentFilters.culture || product.culture === currentFilters.culture;
      const matchesEvent = !currentFilters.event || product.event === currentFilters.event;
      const matchesReligion = !currentFilters.religion || product.religion === currentFilters.religion;

      return matchesSearch && matchesOccasion && matchesTrend && matchesBrand && 
             matchesLocation && matchesCulture && matchesEvent && matchesReligion;
    });

    // Sort products
    if (currentFilters.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentFilters.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (currentFilters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  };

  const handleLike = (id: number) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, isLiked: !product.isLiked } : product
    ));
    setFilteredProducts(prev => prev.map(product => 
      product.id === id ? { ...product, isLiked: !product.isLiked } : product
    ));
  };

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart`,
    });
  };

  const clearAllFilters = () => {
    setFilters({
      occasion: '',
      trend: '',
      brand: '',
      location: '',
      culture: '',
      event: '',
      religion: '',
      priceRange: '',
      sortBy: 'newest'
    });
    setSearchQuery('');
    setFilteredProducts(products);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 relative font-inter">
      {/* Fixed Pink Glow Background */}
      <div className="fixed bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-pink-200/30 via-pink-100/20 to-transparent pointer-events-none z-0" />
      
      {/* Main Content */}
      <div className="relative z-10 pb-20">
        <Header />
        
        {/* Shop Header */}
        <div className="px-4 pt-6 pb-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-playfair font-semibold text-gray-800 mb-2">
              Shop Collection
            </h1>
            <p className="text-gray-600 mb-6">
              Discover unique styles from sellers worldwide
            </p>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by style, brand, or occasion..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>

            {/* Filter Tabs */}
            <Tabs defaultValue="filters" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="filters">Filters</TabsTrigger>
                <TabsTrigger value="sort">Sort & View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="filters" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  <Select value={filters.occasion} onValueChange={(value) => handleFilterChange('occasion', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      {occasions.map(occasion => (
                        <SelectItem key={occasion} value={occasion}>{occasion}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filters.trend} onValueChange={(value) => handleFilterChange('trend', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Trend" />
                    </SelectTrigger>
                    <SelectContent>
                      {trends.map(trend => (
                        <SelectItem key={trend} value={trend}>{trend}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filters.brand} onValueChange={(value) => handleFilterChange('brand', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filters.culture} onValueChange={(value) => handleFilterChange('culture', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Culture" />
                    </SelectTrigger>
                    <SelectContent>
                      {cultures.map(culture => (
                        <SelectItem key={culture} value={culture}>{culture}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filters.event} onValueChange={(value) => handleFilterChange('event', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Event" />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map(event => (
                        <SelectItem key={event} value={event}>{event}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filters.religion} onValueChange={(value) => handleFilterChange('religion', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Religion" />
                    </SelectTrigger>
                    <SelectContent>
                      {religions.map(religion => (
                        <SelectItem key={religion} value={religion}>{religion}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button 
                    variant="outline" 
                    onClick={clearAllFilters}
                    className="text-pink-600 border-pink-200 hover:bg-pink-50"
                  >
                    Clear All
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="sort" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>

                    <span className="text-gray-600">
                      {filteredProducts.length} items found
                    </span>
                  </div>

                  <div className="flex bg-white rounded-lg p-1 shadow-sm">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-400'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-400'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Products Grid */}
        <main className="px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-6'
            }`}>
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in ${
                    viewMode === 'list' ? 'flex items-center p-4' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {viewMode === 'grid' ? (
                    <>
                      {/* Product Image */}
                      <div className="relative group">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          onClick={() => handleLike(product.id)}
                          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                        >
                          <Heart className={`h-4 w-4 ${product.isLiked ? 'text-pink-500 fill-pink-500' : 'text-gray-600'}`} />
                        </button>
                        {product.originalPrice && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            SALE
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded-full">
                            {product.occasion}
                          </span>
                          <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                            {product.trend}
                          </span>
                        </div>
                        
                        <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{product.location}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">
                              ${product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                          >
                            <ShoppingBag className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* List View */}
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-24 h-24 rounded-lg object-cover mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-800">{product.title}</h3>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleLike(product.id)}
                              className="p-1"
                            >
                              <Heart className={`h-4 w-4 ${product.isLiked ? 'text-pink-500 fill-pink-500' : 'text-gray-400'}`} />
                            </button>
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(product)}
                              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                            >
                              <ShoppingBag className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded-full">
                            {product.occasion}
                          </span>
                          <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                            {product.trend}
                          </span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{product.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>

      <BottomNav activeTab="Shop" />
    </div>
  );
};

export default Shop;
