export interface Food {
  id: number;
  name: string;
  emoji: string;
  cal: number;
  p: number; // protein
  c: number; // carbs
  f: number; // fats
  per: string;
}

// Meal has the same structure as Food
export type Meal = Food;

export const FOODS: Food[] = [
  {id:1, name:'Grilled Chicken Breast', emoji:'🍗', cal:165, p:31, c:0, f:3.6, per:'100g'},
  {id:2, name:'Brown Rice', emoji:'🍚', cal:216, p:5, c:45, f:1.8, per:'1 cup cooked'},
  {id:3, name:'Eggs (2 whole)', emoji:'🥚', cal:143, p:13, c:1, f:10, per:'2 eggs'},
  {id:4, name:'Banana', emoji:'🍌', cal:105, p:1.3, c:27, f:0.4, per:'1 medium'},
  {id:5, name:'Oatmeal', emoji:'🥣', cal:150, p:5, c:27, f:3, per:'40g dry'},
  {id:6, name:'Tuna (canned)', emoji:'🐟', cal:132, p:29, c:0, f:1, per:'100g'},
  {id:7, name:'Sweet Potato', emoji:'🍠', cal:103, p:2.3, c:24, f:0.1, per:'1 medium'},
  {id:8, name:'Greek Yogurt', emoji:'🥛', cal:130, p:12, c:9, f:4, per:'170g'},
  {id:9, name:'Almonds', emoji:'🌰', cal:164, p:6, c:6, f:14, per:'28g (1oz)'},
  {id:10, name:'Salmon', emoji:'🐠', cal:208, p:20, c:0, f:13, per:'100g'},
  {id:11, name:'Quinoa', emoji:'🌾', cal:222, p:8, c:39, f:4, per:'1 cup cooked'},
  {id:12, name:'Protein Shake', emoji:'🥤', cal:120, p:24, c:5, f:2, per:'1 scoop'},
];

export const MEALS: Food[] = [
  {id:1, name:'Kabsa (Chicken)', emoji:'🍚', cal:620, p:35, c:75, f:15, per:'1 plate'},
  {id:2, name:'Shawarma (Chicken)', emoji:'🌯', cal:450, p:28, c:42, f:18, per:'1 wrap'},
  {id:3, name:'Mandi (Lamb)', emoji:'🍖', cal:780, p:42, c:65, f:28, per:'1 plate'},
  {id:4, name:'Falafel Sandwich', emoji:'🥙', cal:380, p:14, c:45, f:16, per:'1 sandwich'},
  {id:5, name:'Hummus + Bread', emoji:'🫓', cal:290, p:10, c:38, f:10, per:'1 portion'},
  {id:6, name:'Grilled Kofta', emoji:'🍢', cal:320, p:26, c:8, f:20, per:'4 pieces'},
  {id:7, name:'Jareesh', emoji:'🥣', cal:350, p:12, c:58, f:6, per:'1 bowl'},
  {id:8, name:'Harees', emoji:'🍲', cal:410, p:22, c:52, f:12, per:'1 bowl'},
  {id:9, name:'Samboosa (3 pcs)', emoji:'🥟', cal:280, p:8, c:32, f:14, per:'3 pieces'},
  {id:10, name:'Date + Milk', emoji:'🥛', cal:220, p:7, c:38, f:4, per:'5 dates + 200ml'},
  {id:11, name:'Madfoon (Lamb)', emoji:'🍖', cal:850, p:48, c:72, f:32, per:'1 plate'},
  {id:12, name:'Mutabbaq', emoji:'🫓', cal:480, p:14, c:52, f:24, per:'1 piece'},
];
