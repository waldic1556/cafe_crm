import { useState } from "react";
import { Plus, Search, X, Tag, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

interface Dish {
  id: string;
  name: string;
  description: string;
  grams: number;
  price: number;
  photo: string;
  tags: string[];
}

export function MenuManagement() {
  const [dishes, setDishes] = useState<Dish[]>([
    {
      id: "1",
      name: "Канапе з лососем",
      description: "Свіжий лосось на хрусткому хлібці з вершковим сиром та каперсами",
      grams: 50,
      price: 45,
      photo: "https://images.unsplash.com/photo-1559058922-4c2ae3dd0e8f",
      tags: ["Закуски", "Преміум", "Риба"],
    },
    {
      id: "2",
      name: "Брускетта з томатами",
      description: "Італійські томати, базилік, оливкова олія на грільованому хлібі",
      grams: 70,
      price: 35,
      photo: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f",
      tags: ["Закуски", "Вегетаріанське"],
    },
    {
      id: "3",
      name: "Мінестроне",
      description: "Класичний італійський овочевий суп з пастою",
      grams: 300,
      price: 65,
      photo: "https://images.unsplash.com/photo-1547592166-23ac45744acd",
      tags: ["Супи", "Вегетаріанське"],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [newTag, setNewTag] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    grams: "",
    price: "",
    photo: "",
    tags: [] as string[],
  });

  // Get all unique tags from all dishes
  const allTags = Array.from(new Set(dishes.flatMap((dish) => dish.tags)));

  // Filter dishes by search query and selected tags
  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => dish.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeFormTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.grams || !formData.price) {
      toast.error("Будь ласка, заповніть всі обов'язкові поля");
      return;
    }

    const dishData: Dish = {
      id: editingDish?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      grams: Number(formData.grams),
      price: Number(formData.price),
      photo: formData.photo || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      tags: formData.tags,
    };

    if (editingDish) {
      setDishes((prev) => prev.map((d) => (d.id === editingDish.id ? dishData : d)));
      toast.success("Страву оновлено");
    } else {
      setDishes((prev) => [...prev, dishData]);
      toast.success("Страву додано до меню");
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      grams: "",
      price: "",
      photo: "",
      tags: [],
    });
    setEditingDish(null);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (dish: Dish) => {
    setEditingDish(dish);
    setFormData({
      name: dish.name,
      description: dish.description,
      grams: dish.grams.toString(),
      price: dish.price.toString(),
      photo: dish.photo,
      tags: dish.tags,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDishes((prev) => prev.filter((d) => d.id !== id));
    toast.success("Страву видалено");
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl text-gray-900 mb-2">Меню / Страви</h1>
          <p className="text-sm md:text-base text-gray-600">Управління меню та стравами для комерційних пропозицій</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FF5A00] hover:bg-[#FF5A00]/90 w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Додати страву
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingDish ? "Редагувати страву" : "Додати страву до меню"}</DialogTitle>
              <DialogDescription>
                {editingDish ? "Змініть інформацію про страву" : "Заповніть інформацію для додавання нової страви до меню"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Назва страви <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Наприклад: Канапе з лососем"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Опис</Label>
                <Textarea
                  id="description"
                  placeholder="Детальний опис страви, інгредієнти..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grams">
                    Вага (грами) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="grams"
                    type="number"
                    placeholder="50"
                    value={formData.grams}
                    onChange={(e) => setFormData((prev) => ({ ...prev, grams: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">
                    Ціна (грн) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="45"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">URL фото</Label>
                <Input
                  id="photo"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={formData.photo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, photo: e.target.value }))}
                />
                {formData.photo && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                    <ImageWithFallback
                      src={formData.photo}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Теги / Категорії</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Додати тег (Закуски, Супи, Вегетаріанське...)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline">
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button
                          onClick={() => removeFormTag(tag)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-[#FF5A00] hover:bg-[#FF5A00]/90"
                >
                  {editingDish ? "Зберегти зміни" : "Додати страву"}
                </Button>
                <Button onClick={resetForm} variant="outline" className="flex-1">
                  Скасувати
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Пошук страв за назвою або описом..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Tag filters */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 py-1">Фільтр за категоріями:</span>
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedTags.includes(tag)
                        ? "bg-[#FF5A00] hover:bg-[#FF5A00]/90"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
                {selectedTags.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTags([])}
                    className="h-6"
                  >
                    Очистити фільтр
                  </Button>
                )}
              </div>
            )}

            {/* Dishes Table */}
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] md:w-[100px]">Фото</TableHead>
                    <TableHead className="min-w-[150px]">Назва</TableHead>
                    <TableHead className="min-w-[200px] hidden lg:table-cell">Опис</TableHead>
                    <TableHead className="min-w-[80px]">Вага</TableHead>
                    <TableHead className="min-w-[100px]">Ціна</TableHead>
                    <TableHead className="min-w-[150px] hidden md:table-cell">Категорії</TableHead>
                    <TableHead className="text-right min-w-[100px]">Дії</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDishes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        Страви не знайдено
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDishes.map((dish) => (
                      <TableRow key={dish.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border border-gray-200">
                            <ImageWithFallback
                              src={dish.photo}
                              alt={dish.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-900 text-sm md:text-base">{dish.name}</div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="text-gray-600 max-w-[300px] truncate text-sm">
                            {dish.description}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600 text-sm">{dish.grams}г</TableCell>
                        <TableCell className="text-gray-900 text-sm md:text-base">{dish.price} грн</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {dish.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(dish)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(dish.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="text-sm text-gray-600">
              Показано {filteredDishes.length} з {dishes.length} страв
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
