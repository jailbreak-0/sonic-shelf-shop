import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SearchSuggestion {
  id: string;
  name: string;
  category: string | null;
  type: 'product' | 'category' | 'recent';
}

interface SearchWithSuggestionsProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onProductSelect?: (productId: string) => void;
  className?: string;
}

export function SearchWithSuggestions({ 
  placeholder = "Search for products...", 
  onSearch,
  onProductSelect,
  className 
}: SearchWithSuggestionsProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Search for suggestions
  useEffect(() => {
    const searchSuggestions = async () => {
      if (query.length < 2) {
        // Show recent searches and popular categories when no query
        const popularCategories = [
          { id: 'laptops', name: 'Laptops', category: 'Electronics', type: 'category' as const },
          { id: 'smartphones', name: 'Smartphones', category: 'Electronics', type: 'category' as const },
          { id: 'audio', name: 'Audio & Headphones', category: 'Electronics', type: 'category' as const },
          { id: 'gaming', name: 'Gaming', category: 'Electronics', type: 'category' as const }
        ];
        
        const recentSuggestions = recentSearches.slice(0, 3).map(search => ({
          id: search,
          name: search,
          category: null,
          type: 'recent' as const
        }));

        setSuggestions([...recentSuggestions, ...popularCategories]);
        return;
      }

      try {
        const { data: products, error } = await supabase
          .from('products')
          .select('id, name, category')
          .ilike('name', `%${query}%`)
          .eq('is_active', true)
          .limit(5);

        if (error) {
          console.error('Error searching products:', error);
          return;
        }

        const productSuggestions: SearchSuggestion[] = products?.map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          type: 'product' as const
        })) || [];

        setSuggestions(productSuggestions);
      } catch (error) {
        console.error('Search error:', error);
      }
    };

    const debounceTimer = setTimeout(searchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, recentSearches]);

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Add to recent searches
    const newRecentSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

    setIsOpen(false);
    setQuery(searchQuery);
    onSearch?.(searchQuery);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'product') {
      onProductSelect?.(suggestion.id);
    } else {
      handleSearch(suggestion.name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          className="pl-10 pr-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-2">
            {query.length < 2 && recentSearches.length > 0 && (
              <div className="mb-2">
                <p className="text-xs text-muted-foreground px-2 py-1 font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Recent Searches
                </p>
              </div>
            )}
            
            {query.length < 2 && recentSearches.length === 0 && (
              <div className="mb-2">
                <p className="text-xs text-muted-foreground px-2 py-1 font-medium flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Popular Categories
                </p>
              </div>
            )}

            {suggestions.map((suggestion) => (
              <div
                key={`${suggestion.type}-${suggestion.id}`}
                className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center gap-3">
                  {suggestion.type === 'recent' ? (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  ) : suggestion.type === 'category' ? (
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Search className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{suggestion.name}</p>
                    {suggestion.category && (
                      <p className="text-xs text-muted-foreground">{suggestion.category}</p>
                    )}
                  </div>
                </div>
                {suggestion.type === 'category' && (
                  <Badge variant="secondary" className="text-xs">Category</Badge>
                )}
                {suggestion.type === 'product' && (
                  <Badge variant="outline" className="text-xs">Product</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}