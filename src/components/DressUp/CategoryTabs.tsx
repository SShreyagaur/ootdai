
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClothingPanel from "./ClothingPanel";
import { ClothingItem, ClothingCategory } from "../../types/dressup";

interface CategoryTabsProps {
  selectedCategory: ClothingCategory;
  onCategoryChange: (category: ClothingCategory) => void;
  categories: { id: ClothingCategory; name: string; icon: string }[];
  clothingItems: ClothingItem[];
  selectedGender: 'barbie' | 'ken';
  onItemSelect: (item: ClothingItem) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

const CategoryTabs = ({ 
  selectedCategory, 
  onCategoryChange, 
  categories, 
  clothingItems, 
  selectedGender, 
  onItemSelect, 
  onDragStart, 
  onDragEnd 
}: CategoryTabsProps) => {
  const getFilteredItems = (category: ClothingCategory) => {
    return clothingItems.filter(item => 
      item.category === category && item.gender === selectedGender
    );
  };

  return (
    <Tabs value={selectedCategory} onValueChange={(value) => onCategoryChange(value as ClothingCategory)} className="w-full">
      <TabsList className="grid w-full grid-cols-6 bg-gradient-to-r from-pink-100 to-purple-100 p-1 rounded-2xl mb-6">
        {categories.map(category => (
          <TabsTrigger 
            key={category.id} 
            value={category.id}
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">{category.icon}</span>
              <span className="text-xs font-medium hidden sm:block">{category.name}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
      
      {categories.map(category => (
        <TabsContent key={category.id} value={category.id}>
          <ClothingPanel
            items={getFilteredItems(category.id)}
            onItemSelect={onItemSelect}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            category={category}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CategoryTabs;
