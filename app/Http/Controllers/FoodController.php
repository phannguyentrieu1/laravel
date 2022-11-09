<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Food;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // dd(Food::latest()->filter(request(['category_id'])));
        return view('food.index', [
            'foods' => Food::latest()->filter(request(['category_id']))->get(),
            'categories' => Category::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('food.create', ['categories' => Category::all()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attributes = request()->validate(
            [
                'name' => 'required|max:100',
                'price' => 'required|min:10000|integer',
                'sale_price' => 'integer|lt:price',
                'category_id' => 'required|exists:categories,id',
                'description' => 'required',
                'origin' => 'required',
                'standard' => 'required',
                'image' => 'required|image'
            ]
        );

        $name = '';
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $name = time() . '_' . $file->getClientOriginalName();
            $destinationPath = public_path('images');
            // dd($destinationPath);
            $file->move($destinationPath, $name);
        }
        $attributes['image'] = $name;
        Food::create($attributes);
        return redirect('foods')->with('success', 'Bạn đã thêm thành công');
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $food = Food::where('id', 'like', '%' . $id)->first();
        $relatedFoods = Food::where('category_id', $food->category_id)->get();
        // dd($food);
        return view('food.show', ['food' => $food, 'relatedFoods' => $relatedFoods]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
